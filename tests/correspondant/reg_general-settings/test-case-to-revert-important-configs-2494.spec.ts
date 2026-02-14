import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_General Settings', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('Test Case To Revert Important Configs', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Navigating_To_Bid_Request_Config(page, vars);
    await page.locator("//input[@id=\"pricingMode-0-off\"]").check();
    await page.locator("//input[@id=\"pricingMode-1-on\"]").check();
    if (true) /* Element Newly Added Dropdown Input(POS) is visible */ {
      await expect(page.locator("(//select[@aria-label=\"Dropdown selection\"])[5]")).toBeVisible();
      await page.locator("//div[contains(@class, 'scrollable-page')]/div[1]/app-general-settings-container[1]/div[2]/div[1]/div[2]/app-bid-request-config-container[1]/app-bid-request-config[1]/div[1]/form[2]/div[1]/div[5]/button[1]/i[1]").click();
    }
    if (true) /* Element Save Changes Button is enabled */ {
      await page.locator("//button[text()=\"Save Changes\"]").click();
    }
    await page.locator("//a[@href=\"#/admin/general-settings/market-thresholds\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    while (await page.locator("//td[@data-title=\"Security Product\"]//div[not(contains(text(),\"FN30\"))]").isVisible()) {
      await page.locator("//td[@data-title=\"Security Product\"]//div[not(contains(text(),\"FN30\"))]/../..//button[2]").click();
      await page.locator("//i[contains(@class,\"trash-alt\")]/ancestor::button").click();
      await page.waitForTimeout(5000);
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    }
    await expect(page.locator("//td[@data-title=\"Security Product\"]//div[not(contains(text(),\"FN30\"))]")).toBeVisible();
    await page.locator("//a[@href=\"#/admin/general-settings/company-config\"]").click();
    await page.locator("//input[@aria-label=\"Company Name\"]").waitFor({ state: 'visible' });
    vars["ConfigCompanyName"] = await page.locator("//input[@aria-label=\"Company Name\"]").inputValue() || '';
    if (String(vars["ConfigCompanyName"]) !== String("Chase")) {
      await page.locator("//input[@aria-label=\"Company Name\"]").fill(String("Chase"));
      await page.locator("//div[contains(@class, 'scrollable-page')]/div[1]/app-general-settings-container[1]/div[2]/div[1]/div[2]/app-company-config-container[1]/app-company-config[1]/div[2]//button").waitFor({ state: 'visible' });
      await page.locator("//div[contains(@class, 'scrollable-page')]/div[1]/app-general-settings-container[1]/div[2]/div[1]/div[2]/app-company-config-container[1]/app-company-config[1]/div[2]//button").click();
      await page.locator("//span[text()[normalize-space() = \"Ok\"]]").click();
    }
  });
});
