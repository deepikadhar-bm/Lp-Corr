import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS01_TC11_Select Required Company Scenario', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["count"] = "1";
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[@href=\"#/admin/general-settings/customer-restrictions\"]").click();
    vars["CompanyNames"] = String(await page.locator("//td[@data-title=\"Company Name\"]").count());
    for (let dataIdx = -1; dataIdx <= parseInt(vars["CompanyNames"]); dataIdx++) {
      vars["All_Company_Name"] = await page.locator("(//div[@class='d-flex align-items-end'][contains(.,'Company Name')]/../../../..//td[@data-title=\"Company Name\"])[$|count|]").textContent() || '';
      // Write to test data profile: "All Company Name" = vars["All_Company_Name"]
      // TODO: Test data profile writes need custom implementation
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    await page.waitForLoadState('networkidle');
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"Bid Maps\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText("Mappings")).toBeVisible();
    await page.locator("//button[text()[normalize-space() = \"Add New Mapping\"]]").click();
    vars["Create New Map"] = new Date().toLocaleDateString('en-US') /* format: dd/MM/yyyy/HH:mm:ss */;
    vars["Create New Map"] = "Testsigma_" + vars["Create New Map"];
    await page.locator("mapName").fill(vars["Create New Map"]);
    await page.locator("//button[@aria-label=\"Create\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//div//div[@id=\"companySelect\"]//div//button[@id=\"multiSelectDropDown\"]").click();
    for (let dataIdx = -1; dataIdx <= parseInt(vars["CompanyNames"]); dataIdx++) {
      vars["Companyname"] = String(testData["All Company Name"]).split("-")["1"] || '';
      vars["Companyname"] = String(vars["Companyname"]).trim();
      await expect(page.locator("//span[contains(text(),\"$|Companyname|\")]")).toContainText(vars["Companyname"]);
    }
    await expect(page.locator("(//div[@class=\"mb-0 overflow-hidden\"])[1]/../..//input[@placeholder=\"Search\"]")).toBeVisible();
    vars["Companyname"] = await page.locator("(//div[contains(@class,\"cursor-pointer\")]/../..//span)[2]").inputValue() || '';
    await page.locator("(//div[@class=\"mb-0 overflow-hidden\"])[1]/../..//input[@placeholder=\"Search\"]").fill(vars["Companyname"]);
    await expect(page.locator("//div[contains(@class,\"cursor-pointer py\")]/../../..//span[text()=\"$|Companyname|\"]")).toBeVisible();
    vars["After entering company name_count"] = String(await page.locator("//div[contains(@class,\"cursor-pointer py\")]/../../..//span").count());
    await page.locator("//i[contains(@class, 'fa-times')]").click();
    await expect(page.locator("(//div[@class=\"mb-0 overflow-hidden\"])[1]/../..//input[@placeholder=\"Search\"]")).toHaveValue('');
    vars["After Clearing company name_count"] = String(await page.locator("//div[contains(@class,\"cursor-pointer py\")]/../../..//span").count());
    expect(String(vars["After entering company name_count"])).toBe(vars["After Clearing company name_count"]);
    vars["Number"] = String(Math.floor(Math.random() * (20 - 1 + 1)) + 1);
    for (let dataIdx = parseInt(vars["Number"]); dataIdx <= parseInt(vars["Number"]); dataIdx++) {
      vars["Companyname"] = String(testData["All Company Name"]).trim();
      await page.locator("(//div[@class=\"mb-0 overflow-hidden\"])[1]/../..//input[@placeholder=\"Search\"]").fill(vars["Companyname"]);
      await page.locator("//span[contains(text(),\"$|Companyname|\")]/../..//input[@type=\"checkbox\"]").check();
      await page.locator("//button[contains(text(),\" Apply Selected \")]").click();
      await expect(page.locator("//div[contains(text(),\"Selected (1)\")]")).toBeVisible();
      await expect(page.locator("//span[contains(text(),\"$|Companyname|\")]")).toBeVisible();
    }
  });
});
