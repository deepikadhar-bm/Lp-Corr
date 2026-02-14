import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS01_TC01.2_Bid Creation for 1-5', async ({ page }) => {
    // Prerequisite: REG_TS01_TC01.1_Updating the Loan Numbers (1-5 and 2-5)
    // TODO: Ensure prerequisite test passes first

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Deleting_Early_Config_Report_If_Present(page, vars);
    await stepGroups.stepGroup_Navigating_to_Bulk_Batch_Timing(page, vars);
    await stepGroups.stepGroup_Modifying_The_batch_Intervals_with_current_est_time(page, vars);
    await stepGroups.stepGroup_Navigating_to_Upload_New_Bid_Request(page, vars);
    await stepGroups.stepGroup_Uploading_Bid_Request(page, vars);
    // [DISABLED] Uploading Bid Request(Latest)
    // await stepGroups.stepGroup_Uploading_Bid_RequestLatest(page, vars);
    await page.locator("(//select[@aria-label=\"Dropdown selection\"])[3]").selectOption({ index: parseInt("2") });
    vars["ExtractedPrincingReturnTime"] = await page.locator("(//select[@aria-label=\"Dropdown selection\"])[3]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
    await page.locator("(//input[@type=\"file\"])[1]").setInputFiles('');
    await expect(page.locator("//span[text()[normalize-space() = \"Upload Bid\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Upload Bid\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.getByText("Bid Upload Progress").waitFor({ state: 'visible' });
    await page.locator("//span[text()=\"Continue\"]/..").waitFor({ state: 'visible' });
    await page.locator("//span[text()=\"Continue\"]/..").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["RequestIDDetails"] = await page.locator("//div[text()=\"Request ID\"]/..//h5").textContent() || '';
    vars["RequestIDDetails"] = String(vars["RequestIDDetails"]).trim();
    await expect(page.locator("//div[text()=\"Status\"]/..//h5")).toContainText("Ready for Pricing");
    vars["QueuedDateTime"] = await page.locator("//div/span[@class=\"text-dark\"]").textContent() || '';
    vars["ExtractedDateTime"] = String('').split("")["3"] || '';
    vars["QueuedTime"] = vars["ExtractedDateTime"];
    vars["CurrentEstTime"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC-05:00" };
      const fmt = "hh:mm ";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    vars["TimeDifference"] = Math.abs(new Date('2000-01-01 ' + String(vars["QueuedTime"])).getTime() - new Date('2000-01-01 ' + String(vars["CurrentEstTime"])).getTime()) / 60000 + '';
    if (String(vars["TimeDifference"]) > String("4")) {
      vars["WaitTime"] = "4";
    } else {
      vars["WaitTime"] = vars["TimeDifference"];
    }
    vars["WaitTimeSeconds"] = (parseFloat(String(vars["WaitTime"])) * parseFloat(String("60"))).toFixed(0);
    vars["WaitTimeSeconds"] = (parseFloat(String(vars["WaitTimeSeconds"])) - parseFloat(String("60"))).toFixed(0);
    await page.waitForTimeout(parseInt(vars["WaitTimeSeconds"]) * 1000);
    await page.locator("//button/span[text()=\"Submit For Pricing\"]/..").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//button[@aria-label=\"Yes Submit\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[@href=\"#/bid-requests\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["CurrentEstTime"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC-05:00" };
      const fmt = "hh:mm a";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    await stepGroups.stepGroup_Waiting_in_the_2_while_loops_for_the_price_offered_status_up(page, vars);
    while (true) /* While element Price Offered Status of searched bid is not vi */ {
      // [DISABLED] Verify that the current page displays an element Search by Bid Request ID Field and With Scrollable FALSE
      // await expect(page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]")).toBeVisible();
      // [DISABLED] Enter RequestIDDetails in the Search by Bid Request ID Field field
      // await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["RequestIDDetails"]);
      // [DISABLED] Wait until the element Spinner is not visible
      // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      // [DISABLED] Click on the Refresh button in the browser
      // await page.reload();
      // [DISABLED] Wait until the element Spinner is not visible
      // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    }
    // [DISABLED] Verify that the element BidStatus From List displays text contains Price Offered and With Scrollable TRUE
    // await expect(page.locator("//button[contains(text(),\"$|RequestIDDetails|\")]/../..//td[@data-title=\"Status\"]")).toContainText("Price Offered");
  });
});
