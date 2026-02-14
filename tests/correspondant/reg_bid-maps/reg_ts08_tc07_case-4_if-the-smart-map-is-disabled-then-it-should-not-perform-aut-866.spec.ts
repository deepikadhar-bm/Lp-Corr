import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS08_TC07_CASE-4_If the smart map is disabled then it should not perform auto map acton.', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Smart_Mapper_from_On_to_Off(page, vars);
    await page.waitForLoadState('networkidle');
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//button[text()[normalize-space() = \"Add New Mapping\"]]").click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator("//h5[text()[normalize-space() = \"Create New Map\"]]")).toBeVisible();
    vars["Create New Map"] = new Date().toLocaleDateString('en-US') /* format: dd/MM/yyyy/HH:mm:ss */;
    vars["Create New Map"] = "Testsigma_" + vars["Create New Map"];
    await page.locator("mapName").fill(vars["Create New Map"]);
    await page.locator("//button[@aria-label=\"Create\"]").click();
    await page.waitForLoadState('networkidle');
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText(vars["Create New Map"])).toBeVisible();
    await page.locator("//a[text()[normalize-space() = \"New Map\"]]").click();
    await page.locator("//div//div[@id=\"companySelect\"]//div//button[@id=\"multiSelectDropDown\"]").click();
    await page.locator("//input[@id='chkItemallIdundefined']").check();
    vars["AllDropdownCompaniesCount"] = String(await page.locator("//div[@class=\"dropdown-overflow\"]/label").count());
    await expect(page.locator("//span[@class=\"counter bg-white text-primary mx-2 text-center fw-semibold small\"]")).toContainText(vars["AllDropdownCompaniesCount"]);
    await page.locator("//button[contains(text(),\" Apply Selected \")]").click();
    await expect(page.locator("//select[@aria-label=\"Dropdown selection\"]")).toHaveValue('');
    await page.locator("(//input[@type=\"file\"])[1]").setInputFiles(path.resolve(__dirname, 'test-data', "Bid Maps File,Bid Maps File.xlsx"));
    await page.locator("//span[text()[normalize-space() = \"Map Headers\"]]").click();
    await expect(page.locator("//*[contains(text(),\"This action will save the changes and Move to Next Page\")]")).toBeVisible();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["HeaderCount"] = String(await page.locator("//div[@class='parent']//fieldset").count());
    await stepGroups.stepGroup_Verification_Header_Mapping_Smart_Mapper_On_to_Off(page, vars);
    await page.locator("(//select[contains(@class, 'form-select')])[3]").selectOption({ label: testData["Chase Field Name"] });
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await expect(page.locator("//*[contains(text(),\"You have unidentified fields.\")]/../..//*[text()=\" This action will save the changes and Move to Next Page. \"]")).toBeVisible();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//select[contains(normalize-space(),\"Select Fixed rate Variable rate\")]")).toBeVisible();
  });
});
