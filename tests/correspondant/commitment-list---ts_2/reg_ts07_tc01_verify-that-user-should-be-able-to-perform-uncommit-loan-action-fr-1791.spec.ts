import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Commitment List - TS_2', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS07_TC01_Verify that user should be able to perform uncommit loan action from one commitment id and should be restricted to perform uncommit actions from multiple commitment id\\\'s', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    vars["BidReqId"] = testData["RequestIdFrom5-5"];
    await page.locator("//input[@id='searchTagInput']").click();
    await page.locator("//input[@id='searchTagInput']").fill(vars["BidReqId"]);
    await page.locator("//span[normalize-space(text())=\"Bid Request ID\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())=\"$|BidReqId|\"]//ancestor::tr//td[@data-title=\"Comm. ID\"]").click();
    await page.locator("//span[contains(text(),\" Total Committed Loans\")]").waitFor({ state: 'visible' });
    await page.locator("//span[contains(text(),\" Total Committed Loans\")]").click();
    await page.locator("//input[contains(@aria-label,\"Select all for\") and @type=\"checkbox\"]").check();
    for (let i = 0; i < await page.locator("//*[@disabled]//input[normalize-space(@aria-label)=\"Select all for\"]").count(); i++) {
      await expect(page.locator("//*[@disabled]//input[normalize-space(@aria-label)=\"Select all for\"]").nth(i)).toBeDisabled();
    }
  });
});
