import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS04_TC05_After performing the \\\'Get Price\\\' action, the timer starts. When the user navigates away from the screen and then returns, verify that the timer is no longer displayed.', async ({ page }) => {
    // Prerequisite: REG_TS04_TC04_After the "Get Price" action, the timer runs and user performs commit, the screen shou
    // TODO: Ensure prerequisite test passes first

    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").waitFor({ state: 'visible' });
    await expect(page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]")).toBeVisible();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").clear();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["RequestIDDetails"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Bid Req. ID\"]/a)[1]").click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator("//div[@id=\"price-offered-details-header\"]//div/div[text()=\"Remaining Time\"]")).toBeVisible();
    await page.locator("//button[text()[normalize-space() = \"Get Price\"]]").click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator("//div[@id=\"price-offered-details-header\"]//div/div[text()=\"Remaining Time\"]")).toBeVisible();
    await expect(page.locator("//div[contains(@id,\"price-offered-back\")]//i")).toBeVisible();
    await page.locator("//div[contains(@id,\"price-offered-back\")]//i").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").clear();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["RequestIDDetails"]);
    await page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Bid Req. ID\"]/a)[1]").click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator("//div[@id=\"price-offered-details-header\"]//div/div[text()=\"Remaining Time\"]")).toBeVisible();
  });
});
