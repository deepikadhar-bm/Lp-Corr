import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_General Settings', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS09_TC06_Bid Request - Disable both the pricing Modes, (OFF) and verify the Upload Bid request Button is get Visible in the Bid request screen.', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[@href=\"#/admin/general-settings/bid-request\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//input[@id=\"pricingMode-0-off\"]").check();
    await page.locator("//input[@id=\"pricingMode-1-off\"]").check();
    await page.locator("//button[text()=\"Save Changes\"]").waitFor({ state: 'visible' });
    await page.locator("//button[text()=\"Save Changes\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[@href=\"#/bid-requests\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//button[text()[normalize-space() = \"Upload New Bid Request\"]]")).toBeVisible();
    await stepGroups.stepGroup_Navigating_To_Bid_Request_Config(page, vars);
    await page.locator("//input[@id=\"pricingMode-0-on\"]").check();
    await page.locator("//input[@id=\"pricingMode-1-on\"]").check();
    await page.locator("//button[text()=\"Save Changes\"]").waitFor({ state: 'visible' });
    await page.locator("//button[text()=\"Save Changes\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
  });
});
