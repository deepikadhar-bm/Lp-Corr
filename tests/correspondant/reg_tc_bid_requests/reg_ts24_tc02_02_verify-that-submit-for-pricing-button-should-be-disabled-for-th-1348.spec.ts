import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS24_TC02_02_Verify that submit for pricing button should be disabled for the status and the Queued For Time text Should be Red In colour for passed time.', async ({ page }) => {
    // Prerequisite: REG_TS14_TC01_Verify the data present in bid detail screen by selecting standard execution type
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
    // [DISABLED] Enter TrimmedBidRequestID1 in the Search by Bid Request ID Field field
    // await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["TrimmedBidRequestID1"]);
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(String(vars["TrimmedBidRequestID1"]));
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Bid Req. ID\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["Status"] = await page.locator("//div[text()=\"Status\"]/..//h5").inputValue() || '';
    // [DISABLED] Verify that the element Bid Status From Details displays text Queued for Next Batch and With Scrollable FALSE
    // await expect(page.locator("//div[text()=\"Status\"]/..//h5")).toContainText("Queued for Next Batch\r");
    vars["ExtractedQueuedForTime"] = await page.locator("//div/span[@class=\"text-dark\"]").textContent() || '';
    vars["ExtractedQueuedForTime(only time)"] = String('').split("")["3"] || '';
    vars["ExtractedQueuedForTime(extracted hour minutes)"] = vars["ExtractedQueuedForTime(only time)"];
    vars["ExtractedQueuedForTime(only am pm)"] = String('').split("")["4"] || '';
    vars["ExtractedQueuedForTime(extracted am pm)"] = vars["ExtractedQueuedForTime(only am pm)"];
    vars[""] = String(vars["ExtractedQueuedForTime(extracted hour minutes)"]) + ' ' + String(vars["ExtractedQueuedForTime(extracted am pm)"]);
    vars["CurrentDateExtracted(EST)"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC-05:00" };
      const fmt = "hh:mm a ";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    vars["WaitTime"] = Math.abs(new Date('2000-01-01 ' + String(vars["CurrentDateExtracted(EST)"])).getTime() - new Date('2000-01-01 ' + String(vars["ExtractedQueuedForTime( time with am pm)"])).getTime()) / 60000 + '';
    if (true) /* Element Queued For(bid request details text dark) has attrib */ {
      if (String(vars["WaitTime"]) > String("4")) {
        await page.waitForTimeout(240000);
        await page.reload();
        vars["WaitTime"] = (parseFloat(String(vars["WaitTime"])) - parseFloat(String("4"))).toFixed(0);
        vars["WaitTime"] = (parseFloat(String("60")) * parseFloat(String(vars["WaitTime"]))).toFixed(0);
      } else {
        vars["WaitTime"] = (parseFloat(String(vars["WaitTime"])) * parseFloat(String("60"))).toFixed(0);
      }
      await page.waitForTimeout(parseInt(vars["WaitTime"]) * 1000);
      await page.reload();
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      await expect(page.locator("//div/span[@class=\"text-danger\"]")).toHaveAttribute('title', "text-danger");
      await expect(page.locator("//div[@id=\"page-footer\"]//button[@disabled]")).toBeDisabled();
    } else {
      await expect(page.locator("//div/span[@class=\"text-danger\"]")).toHaveAttribute('title', "text-danger");
      await expect(page.locator("//div[@id=\"page-footer\"]//button[@disabled]")).toBeDisabled();
    }
    await page.locator("//li[@class=\"nav-item\"]//a[@href=\"#/bid-requests\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]")).toBeVisible();
    // [DISABLED] Enter TrimmedBidRequestID1 in the Search by Bid Request ID Field field
    // await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["TrimmedBidRequestID1"]);
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(String(vars["TrimmedBidRequestID1"]));
    vars[""] = String(vars["ExtractedQueuedForTime( time with am pm)"]) + ' ' + String("ET");
    vars["ExtractedQueuedForTime( time with am pm ET)"] = String('') + String('');
    vars["FinalExpectedStatus(bid requests)"] = String(vars["FinalExpectedStatus(bid requests)"]).trim();
    vars["FinalActualStatus(bid requests)"] = await page.locator("(//td[@data-title=\"Status\"])[1]//span").textContent() || '';
    vars["FinalActualStatus(bid requests)"] = String(vars["FinalActualStatus(bid requests)"]).trim();
    expect(String(vars["FinalActualStatus(bid requests)"]).toLowerCase()).toContain(String(vars["FinalExpectedStatus(bid requests)"]).toLowerCase());
  });
});
