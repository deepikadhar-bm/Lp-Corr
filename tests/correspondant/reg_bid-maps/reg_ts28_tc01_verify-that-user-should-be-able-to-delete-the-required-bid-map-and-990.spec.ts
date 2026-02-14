import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS28_TC01_Verify that user should be able to delete the required bid map, and should be allowed to create a new one using the same name that is deleted.', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Smart_Mapper_from_Off_to_On(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"Bid Maps\"]]").click();
    await stepGroups.stepGroup_Creation_Of_Bid_Map_Upto_Header_Mapping(page, vars);
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await expect(page.getByText(testData["Save and Move to Next Page"])).toBeVisible();
    await expect(page.getByText(testData["Unidentified fields Message"])).toBeVisible();
    await page.locator("//button[@aria-label=\"Yes, Proceed\"]").click();
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    await expect(page.getByText(testData["Save and Move to Next Page"])).toBeVisible();
    await expect(page.getByText(testData["Unidentified fields Message"])).toBeVisible();
    await page.locator("//button[@aria-label=\"Yes, Proceed\"]").click();
    await stepGroups.stepGroup_Import_Rule_In_Rules_and_Actions(page, vars);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Save and Publish\"]]").click();
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.locator("//input[@placeholder=\"Search/Filter\"]").click();
    await page.waitForLoadState('networkidle');
    await page.locator("//input[@placeholder=\"Search/Filter\"]").fill(vars["Create New Map"]);
    if (true) /* Element Highlighted Map Name is visible */ {
    }
    await page.locator("//h6[text()='BidMap']").hover();
    await page.locator("//a[text()='Show All']").click();
    await page.waitForLoadState('networkidle');
    await page.locator("//span[@class=\"fas fa-trash-alt text-danger\"]").click();
    await page.locator("(//button[@type=\"button\"])[last()]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText("No result")).toBeVisible();
    await page.locator("//button[text()[normalize-space() = \"Add New Mapping\"]]").click();
    await page.locator("//input[@placeholder=\"Map Name\"]").fill(vars["Create New Map"]);
    await page.waitForLoadState('networkidle');
    vars["BidMap"] = await page.locator("//input[@placeholder=\"Map Name\"]").inputValue() || '';
    await page.locator("//button[@aria-label=\"Create\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//input[@id='mappingName']")).toHaveValue(vars["BidMap"]);
    await page.locator("//div//div[@id=\"companySelect\"]//div//button[@id=\"multiSelectDropDown\"]").click();
    await page.locator("(//input[@class=\"mr-2 cursor-pointer\"])[2]").click();
    await page.locator("//button[contains(text(),\" Apply Selected \")]").click();
    await expect(page.locator("(//input[@type=\"file\"])[1]")).toHaveValue('');
    await page.locator("(//input[@type=\"file\"])[1]").setInputFiles(path.resolve(__dirname, 'test-data', "Bid Maps File,Bid Maps File.xlsx"));
    await page.locator("//span[text()[normalize-space() = \"Map Headers\"]]").click();
    await expect(page.locator("//*[contains(text(),\"This action will save the changes and Move to Next Page\")]")).toBeVisible();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
  });
});
