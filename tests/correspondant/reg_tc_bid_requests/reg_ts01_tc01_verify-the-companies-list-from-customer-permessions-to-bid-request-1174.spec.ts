import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS01_TC01_Verify the Companies list from customer permessions to Bid request screen', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["count"] = "1";
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[@href=\"#/admin/general-settings/customer-restrictions\"]").click();
    vars["TotalCompaniesCount(CustomerPermission)"] = String(await page.locator("//td[@data-title=\"Company Name\"]").count());
    for (let dataIdx = -1; dataIdx <= parseInt(vars["TotalCompaniesCount(CustomerPermission)"]); dataIdx++) {
      vars["IndividualCompanyInPermissions"] = await page.locator("(//div[@class='d-flex align-items-end'][contains(.,'Company Name')]/../../../..//td[@data-title=\"Company Name\"])[$|count|]").textContent() || '';
      // Write to test data profile: "All Company Name" = vars["IndividualCompanyInPermissions"]
      // TODO: Test data profile writes need custom implementation
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    await page.waitForLoadState('networkidle');
    await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//button[text()[normalize-space() = \"Upload New Bid Request\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//div[text()[normalize-space() = \"Select\"]]").click();
    for (let dataIdx = -1; dataIdx <= parseInt(vars["TotalCompaniesCount(CustomerPermission)"]); dataIdx++) {
      vars["IndividualCompanyname"] = String(testData["All Company Name"]).split("-")["1"] || '';
      vars["IndividualCompanyname"] = String(vars["IndividualCompanyname"]).trim();
      await expect(page.locator("//span[contains(text(),\"$|IndividualCompanyname|\")]")).toContainText(vars["IndividualCompanyname"]);
    }
    await expect(page.locator("(//div[@class=\"mb-0 overflow-hidden\"])[1]/../..//input[@placeholder=\"Search\"]")).toBeVisible();
    vars["AllCompaniesCountInDropdown"] = String(await page.locator("//div[contains(@class,\"cursor-pointer py\")]/../../..//span").count());
    vars["FirstCompanyname"] = await page.locator("(//div[contains(@class,\"cursor-pointer\")]/../..//span)[1]").inputValue() || '';
    // TODO: Regex extraction with empty pattern
    // Action: Extract data matching regex and store to a variable, Regex: .{3,4} , Input String: FirstCompanyname 
    await page.locator("(//div[@class=\"mb-0 overflow-hidden\"])[1]/../..//input[@placeholder=\"Search\"]").fill(vars["FirstCompany_name"]);
    await expect(page.locator("//div[contains(@class,\"cursor-pointer py\")]/../../..//span[text()=\"$|FirstCompanyname|\"]")).toBeVisible();
    vars["CompanyCountAfterSearch"] = String(await page.locator("//div[contains(@class,\"cursor-pointer py\")]/../../..//span").count());
    await page.locator("//i[contains(@class, 'fa-times')]").click();
    await expect(page.locator("(//div[@class=\"mb-0 overflow-hidden\"])[1]/../..//input[@placeholder=\"Search\"]")).toHaveValue('');
    vars["DefaultCompanyCount"] = String(await page.locator("//div[contains(@class,\"cursor-pointer py\")]/../../..//span").count());
    expect(String(vars["AllCompaniesCountInDropdown"])).toBe(vars["DefaultCompanyCount"]);
    for (let dataIdx = 1; dataIdx <= 1; dataIdx++) {
      vars["FirstCompanyname"] = String(testData["All Company Name"]).trim();
      await page.locator("(//div[@class=\"mb-0 overflow-hidden\"])[1]/../..//input[@placeholder=\"Search\"]").fill(vars["FirstCompanyname"]);
      await expect(page.locator("//span[contains(text(),\"$|FirstCompanyname|\")]")).toBeVisible();
    }
  });
});
