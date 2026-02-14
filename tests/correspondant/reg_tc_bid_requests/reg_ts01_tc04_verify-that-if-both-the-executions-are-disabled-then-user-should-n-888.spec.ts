import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS01_TC04_Verify that if both the executions are disabled, then user should not be able to select both the exe type values.', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Navigation_and_Verification_of_Customer_Permission_in_Bid_Re(page, vars);
    await page.locator("//div[@class=\"custom-input\"]//input").fill(testData["CompanyName(CustomerPermissions)"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Company Name\" and text()=\" @|CompanyName(CustomerPermissions)| \"]/..//button").click();
    await expect(page.getByText("Edit Permissions")).toBeVisible();
    await expect(page.locator("//i[contains(@class, 'fa-lg') and contains(@class, 'color-primary') and contains(@class, 'fa-times')]")).toBeVisible();
    await page.locator("(//input[@type=\"radio\"])[2]").check();
    await page.locator("(//input[@type=\"radio\"])[4]").check();
    if (true) /* Element UpdatePermissions_Button is enabled */ {
      await page.locator("//span[text()=\"Update Permissions\"]/ancestor::button").click();
    } else {
      await page.locator("//button[@data-dismiss=\"modal\"]").click();
    }
    await expect(page.locator("//td[@data-title=\"Company Name\" and text()=\" @|CompanyName(CustomerPermissions)| \"]/ancestor::tr//td[@data-title=\"Standard\"]//div[@class=\"text-danger\"]")).toContainText("Disabled");
    await expect(page.locator("//td[@data-title=\"Company Name\" and text()=\" @|CompanyName(CustomerPermissions)| \"]/ancestor::tr//td[@data-title=\"Chase Direct\"]//div[@class=\"text-danger\"]")).toContainText("Disabled");
    await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText("Bid Requests")).toBeVisible();
    await page.locator("//button[text()[normalize-space() = \"Upload New Bid Request\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//div[text()[normalize-space() = \"Select\"]]").click();
    await expect(page.locator("(//div[@class=\"mb-0 overflow-hidden\"])[1]/../..//input[@placeholder=\"Search\"]")).toBeVisible();
    await page.locator("(//div[@class=\"mb-0 overflow-hidden\"])[1]/../..//input[@placeholder=\"Search\"]").fill(testData["CompanyName(CustomerPermissions)"]);
    await page.locator("(//span[contains(@class,'pl-2')])[1]").click();
    await expect(page.locator("//*[@id=\"selectCompanyDropdown\"]//div[@class=\"flex-grow-1 text-start text-truncate\" and not(contains(text(),\"Select\"))]")).toBeVisible();
    await expect(page.locator("//label[text()=\"Standard\"]/..//input[@type=\"checkbox\"]")).toBeVisible();
    await expect(page.locator("//label[text()[normalize-space() = \"Chase Direct\"]]/..//input")).toBeVisible();
    await expect(page.locator("(//select[contains(normalize-space(),\"Select 3 7 15\")])[2]")).toBeVisible();
    await expect(page.locator("(//select[contains(normalize-space(),\"Select 3 7 15\")])[1]")).toBeVisible();
  });
});
