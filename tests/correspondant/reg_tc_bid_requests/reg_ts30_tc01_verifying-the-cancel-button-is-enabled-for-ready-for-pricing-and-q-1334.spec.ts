import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS30_TC01_Verifying the Cancel Button is enabled for Ready For Pricing and Qued for next bussiness day statuses', async ({ page }) => {
    // Prerequisite: REG_TS24_TC01_Verify that if a bid is created with having atleast one success loan, but not submitte
    // TODO: Ensure prerequisite test passes first

    await expect(page.locator("//button[contains(text(),\"$|RequestIDDetails|\")]/../..//button[@aria-label=\"Cancel Bid Request\"]")).toBeVisible();
    await page.locator("//button[contains(text(),\"$|RequestIDDetails|\")]/../..//td[@data-title=\"Bid Req. ID\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//button/span[text()=\"Submit For Pricing\"]/..").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//button[@aria-label=\"Yes Submit\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//button[contains(text(),\"$|RequestIDDetails|\")]/../..//button[@aria-label=\"Cancel Bid Request\"]")).toBeVisible();
  });
});
