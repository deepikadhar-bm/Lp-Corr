import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS03_TC02_Verify that when the smart map option is turned Off, uploading a bid file and navigating to the header screen will automatically select the corresponding Chase field name based on the bi', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Smart_Mapper_from_On_to_Off(page, vars);
    await expect(page.locator("//h1[text()=\"Mappings\"]")).toBeVisible();
    await page.locator("//button[text()[normalize-space() = \"Add New Mapping\"]]").click();
    await expect(page.locator("//h5[text()[normalize-space() = \"Create New Map\"]]")).toBeVisible();
    vars["Create New Map"] = new Date().toLocaleDateString('en-US') /* format: dd/MM/yyyy/HH:mm:ss */;
    vars["Create New Map"] = "TestSigma_" + vars["Create New Map"];
    await page.locator("mapName").fill(vars["Create New Map"]);
    await page.locator("//button[@aria-label=\"Create\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//span[contains(.,' $|Create New Map|')]")).toContainText(vars["Create New Map"]);
    await page.locator("//div//div[@id=\"companySelect\"]//div//button[@id=\"multiSelectDropDown\"]").click();
    await page.locator("((//input[@type=\"checkbox\" and not(contains(@aria-label,\"Home Sweet Mortgage\"))])[position() > 1 and position() < last()])[1]").click();
    await page.locator("//button[contains(text(),\" Apply Selected \")]").click();
    await expect(page.locator("(//input[@type=\"file\"])[1]")).toHaveValue('');
    await expect(page.getByText(testData["Upload File Text Verification"])).toBeVisible();
    await page.locator("(//input[@type=\"file\"])[1]").setInputFiles(path.resolve(__dirname, 'test-data', "Bid Maps File,Bid Maps File.xlsx"));
    await page.locator("//span[text()[normalize-space() = \"Map Headers\"]]").click();
    await page.locator("//h5[text()[normalize-space() = \"Save and Move to Next Page\"]]").waitFor({ state: 'visible' });
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText(vars["Create New Map"])).toBeVisible();
    await page.locator("//a[text()[normalize-space() = \"Header Mapping\"]]").waitFor({ state: 'visible' });
    expect(await page.locator("//div[contains(@class,\"gap-2 header-grid-layout\")]/..//select[@title=\"\"]").textContent() || '').toContain(String("Select"));
    vars["UnidentifiedHeadersCount"] = String(await page.locator("//div[contains(@class,\"unidentified-header\")]//select").count());
    await page.locator("(//select[contains(@class, 'form-select')])[3]").selectOption({ label: testData["Chase Field Name"] });
    await expect(page.locator("(//select[contains(@class, 'form-select')])[3]")).toHaveValue(testData["Chase Field Name"]);
    await page.locator("//span[text()='Enumeration Mapping']").click();
    // [DISABLED] Verify that the current page displays text You have unidentified fields do you want to proceed further
    // await expect(page.getByText("You have unidentified fields do you want to proceed further")).toBeVisible();
    await expect(page.locator("//*[contains(text(),\"You have unidentified fields.\")]/../..//*[text()=\" This action will save the changes and Move to Next Page. \"]")).toBeVisible();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//select[contains(normalize-space(),\"Select Fixed rate Variable rate\")]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    await expect(page.locator("//p[text()[normalize-space() = \"You have unidentified fields do you want to proceed further.\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Yes, Proceed\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//div[text()[normalize-space() = \"Click on Add Rule Or Import Rule...\"]]")).toBeVisible();
    await stepGroups.stepGroup_Smart_Mapper_from_Off_to_On(page, vars);
  });
});
