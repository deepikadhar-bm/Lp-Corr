import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Commitment List - TS_1', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS23_TC02_Closed List : Perform search action by inputting any keyword and verify the export action', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//div[normalize-space()=\"Closed List\"]").waitFor({ state: 'visible' });
    await page.locator("//div[normalize-space()=\"Closed List\"]").click();
    await page.locator("//td[@data-title=\"Bid Request ID\"]").waitFor({ state: 'visible' });
    vars["FirstBidReqId"] = await page.locator("//td[@data-title=\"Bid Request ID\"]").textContent() || '';
    vars["FirstBidReqId"] = String(vars["FirstBidReqId"]).trim();
    await page.locator("//input[@id='searchTagInput']").click();
    await page.locator("//input[@id='searchTagInput']").fill(vars["FirstBidReqId"]);
    await page.locator("//span[normalize-space(text())=\"Bid Request ID\"]").click();
    await page.keyboard.press('Enter');
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//input[normalize-space(@aria-label)=\"Select all for\" and @type=\"checkbox\"]").check();
    await expect(page.locator("//input[normalize-space(@aria-label)=\"Select all for\" and @type=\"checkbox\"]")).toBeVisible();
    vars["TotalRowsCountUI"] = String(await page.locator("//tr[contains(@class,'row')]").count());
    await page.locator("//span[text()[normalize-space() = \"Export Selected\"]]").waitFor({ state: 'visible' });
    await page.locator("//span[text()[normalize-space() = \"Export Selected\"]]").click();
    // Wait for download - handled by Playwright download events
    await page.waitForTimeout(2000);
    await stepGroups.stepGroup_Headers_Verification_in_Closed_List(page, vars);
    await stepGroups.stepGroup_Verification_of_Data_from_Excel_to_UIClosed_List(page, vars);
  });
});
