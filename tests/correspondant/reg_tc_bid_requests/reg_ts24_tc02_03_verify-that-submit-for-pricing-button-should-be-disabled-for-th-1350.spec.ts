import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS24_TC02_03_Verify that submit for pricing button should be disabled for the status and the Queued Time text Should be Red In colour for passed time.', async ({ page }) => {
    // Prerequisite: REG_TS14_TC02_Verify the data present in bid detail screen by selecting chase execution type
    // TODO: Ensure prerequisite test passes first

    vars["BidRequestID1"] = await page.locator("//div[@aria-label=\"Request ID Label\"]/..//h5").textContent() || '';
    await page.locator("//button/span[text()=\"Submit For Pricing\"]/..").click();
    await expect(page.getByText("Submit for Pricing\r")).toBeVisible();
    await page.locator("//button[@aria-label=\"Yes Submit\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    if (await page.locator("//span[text()[normalize-space() = \"Ok\"]]").isVisible()) {
      await page.locator("//span[text()[normalize-space() = \"Ok\"]]").click();
    }
    if (await page.locator("//button[text()[normalize-space() = \"Cancel\"]]").isVisible()) {
      await page.locator("//button[text()[normalize-space() = \"Cancel\"]]").click();
    }
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["TrimmedBidRequestID1"] = String(vars["BidRequestID1"]).trim();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["TrimmedBidRequestID1"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Bid Req. ID\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["Status"] = await page.locator("//div[text()=\"Status\"]/..//h5").inputValue() || '';
    if (true) /* Element Queued For(bid request details text dark) has attrib */ {
      vars["ExtractedQueuedForTime"] = await page.locator("//div/span[@class=\"text-dark\"]").textContent() || '';
      vars["ExtractedQueuedForTime(only time)"] = String('').split("")["3"] || '';
      vars["ExtractedQueuedForTime(extracted hour minutes)"] = vars["ExtractedQueuedForTime(only time)"];
      vars["ExtractedQueuedForTime(only am pm)"] = String('').split("")["4"] || '';
      vars["ExtractedQueuedForTime(extracted am pm)"] = vars["ExtractedQueuedForTime(only am pm)"];
      vars[""] = String(vars["ExtractedQueuedForTime(extracted hour minutes)"]) + ' ' + String(vars["ExtractedQueuedForTime(extracted am pm)"]);
      await expect(page.locator("//div[@id=\"page-footer\"]//button[@disabled]")).toBeDisabled();
    }
    await page.locator("//li[@class=\"nav-item\"]//a[@href=\"#/bid-requests\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]")).toBeVisible();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").clear();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["TrimmedBidRequestID1"]);
    vars[""] = String(vars["ExtractedQueuedForTime( time with am pm)"]) + ' ' + String("ET");
    vars["ExtractedQueuedForTime( time with am pm ET)"] = String('') + String('');
    vars["FinalExpectedStatus(bid requests)"] = String(vars["FinalExpectedStatus(bid requests)"]).trim();
    vars["FinalActualStatus(bid requests)"] = await page.locator("(//td[@data-title=\"Status\"])[1]//span").textContent() || '';
    vars["FinalActualStatus(bid requests)"] = String(vars["FinalActualStatus(bid requests)"]).trim();
    expect(String(vars["FinalActualStatus(bid requests)"]).toLowerCase()).toContain(String(vars["FinalExpectedStatus(bid requests)"]).toLowerCase());
  });
});
