import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS08_TC05_When a uncommitted loan number that exists only in Company B is entered in Company A\\\'s pase loan popup, an error message should be displayed', async ({ page }) => {
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
    vars["RequestIDDetails1"] = String(vars["RequestIDDetails"]).trim();
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
    await stepGroups.stepGroup_Updating_the_Loan_Numbers_in_a_file(page, vars);
    await stepGroups.stepGroup_Navigating_to_Upload_New_Bid_Request(page, vars);
    await stepGroups.stepGroup_Uploading_Bid_Request(page, vars);
    await stepGroups.stepGroup_Uploading_Bid_RequestFrom_selecting_batch_time(page, vars);
    vars["RequestIDDetails"] = vars["RequestIDDetails2"];
    while (!(await page.locator("//button[contains(text(),\"$|RequestIDDetails|\")]/../..//td[@data-title=\"Status\"]//span[contains(text(),\"Price Offered\")]").isVisible())) {
      await expect(page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]")).toBeVisible();
      await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["RequestIDDetails2"]);
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      await page.reload();
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    }
    // [DISABLED] Store RequestIDDetails2 in RequestIDDetails
    // vars["RequestIDDetails"] = vars["RequestIDDetails2"];
    await expect(page.locator("//button[contains(text(),\"$|RequestIDDetails|\")]/../..//td[@data-title=\"Status\"]")).toContainText("Price Offered");
    vars["RequestIDDetails"] = vars["RequestIDDetails1"];
    await stepGroups.stepGroup_Waiting_until_the_Bid_Status_Changes_to_Price_Offered(page, vars);
  });
});
