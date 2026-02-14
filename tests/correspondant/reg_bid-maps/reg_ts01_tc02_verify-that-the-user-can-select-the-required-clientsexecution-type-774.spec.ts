import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS01_TC02_Verify that the user can select the required clients/execution type and upload a file with the necessary headers for map creation.', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//h3[text()[normalize-space() = \"Dashboard\"]]")).toBeVisible();
    // [DISABLED] Navigation to Customer Permission For Chase Direct
    // await stepGroups.stepGroup_Navigation_to_Customer_Permission_For_Chase_Direct(page, vars);
    await stepGroups.stepGroup_Navigating_to_Customer_Permission_For_the_Chase_Direct_Compa(page, vars);
    await stepGroups.stepGroup_EditActions_In_CustomerPermission(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"Bid Maps\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//h1[text()=\"Mappings\"]")).toBeVisible();
    await page.locator("//button[text()[normalize-space() = \"Add New Mapping\"]]").click();
    await expect(page.locator("//h5[text()[normalize-space() = \"Create New Map\"]]")).toBeVisible();
    vars["Create New Map"] = new Date().toLocaleDateString('en-US') /* format: dd/MM/yyyy/HH:mm:ss */;
    vars["Create New Map"] = "Testsigma_" + vars["Create New Map"];
    await page.locator("mapName").fill(vars["Create New Map"]);
    await page.locator("//button[@aria-label=\"Create\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//span[contains(.,' $|Create New Map|')]")).toContainText(vars["Create New Map"]);
    await page.locator("//div//div[@id=\"companySelect\"]//div//button[@id=\"multiSelectDropDown\"]").click();
    // [DISABLED] Enter Company name 1 in the SearchBox_In_NewMapScreen field
    // await page.locator("//input[@id='searchBox']").fill(testData["Company name 1"]);
    await page.locator("//span[@class='pl-2'][contains(.,'@|Company name 1|')]").click();
    await page.locator("//button[contains(text(),\" Apply Selected \")]").click();
    await page.locator("//select[@aria-label=\"Dropdown selection\"]").selectOption({ label: testData["Execution Type"] });
    await expect(page.locator("(//input[@type=\"file\"])[1]")).toHaveValue('');
    await expect(page.getByText(testData["Upload File Text Verification"])).toBeVisible();
    await page.locator("(//input[@type=\"file\"])[1]").setInputFiles(path.resolve(__dirname, 'test-data', "Bid Maps File,Bid Maps File.xlsx"));
    await page.locator("//span[text()[normalize-space() = \"Map Headers\"]]").click();
    await page.locator("//h5[text()[normalize-space() = \"Save and Move to Next Page\"]]").waitFor({ state: 'visible' });
    await expect(page.locator("//*[contains(text(),\"This action will save the changes and Move to Next Page\")]")).toBeVisible();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText(vars["Create New Map"])).toBeVisible();
    await page.locator("//a[text()[normalize-space() = \"Header Mapping\"]]").waitFor({ state: 'visible' });
  });
});
