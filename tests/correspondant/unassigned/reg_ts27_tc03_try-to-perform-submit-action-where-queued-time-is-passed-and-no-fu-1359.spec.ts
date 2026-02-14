import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS27_TC03_Try to perform submit action where, Queued time is passed, and no further batch exists for the day..', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Navigating_to_Bulk_Batch_Timing(page, vars);
    vars["BufferTime"] = await page.locator("//input[@id=\"pricingReturnTimeBuffer\"]").inputValue() || '';
    await stepGroups.stepGroup_Modifying_The_batch_Intervals_with_current_est_time(page, vars);
    await stepGroups.stepGroup_Navigating_to_Upload_New_Bid_Request(page, vars);
    await stepGroups.stepGroup_Uploading_Bid_RequestNew(page, vars);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()=\"Continue\"]/..").waitFor({ state: 'visible' });
    await page.locator("//span[text()=\"Continue\"]/..").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["FooterQueuedDate"] = await page.locator("//div[@id=\"page-footer\"]//span[contains(text(),\"Queued For\")]").textContent() || '';
    vars["QueuedForTime"] = String(vars["FooterQueuedDate"]).substring(23, String(vars["FooterQueuedDate"]).length - 6);
    vars["CurrentEstTime"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC-05:00" };
      const fmt = "hh:mm";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    vars["TimeDifference"] = Math.abs(new Date('2000-01-01 ' + String(vars["CurrentEstTime"])).getTime() - new Date('2000-01-01 ' + String(vars["QueuedForTime"])).getTime()) / 60000 + '';
    await expect(page.locator("//span[@class=\"text-danger\" and contains(text(),\"Queued For\")]")).toBeVisible();
    vars["TimeDifferenceInSeconds"] = (parseFloat(String(vars["TimeDifference"])) * parseFloat(String("60"))).toFixed(0);
    await page.waitForTimeout(parseInt(vars["TimeDifferenceInSeconds"]) * 1000);
    await page.reload();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//button/span[text()=\"Submit For Pricing\"]/..")).toBeEnabled();
    await page.locator("//button/span[text()=\"Submit For Pricing\"]/..").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//button[@aria-label=\"Yes Submit\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//div[@id=\"modalBody\"]/b[text()=\" Cannot submit for pricing as last batch for pricing missed \"]")).toContainText("Cannot submit for pricing as last batch for pricing missed");
    // [DISABLED] Verify that the current page displays text Cannot submit for pricing as last batch for pricing missed
    // await expect(page.getByText("Cannot submit for pricing as last batch for pricing missed")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Ok\"]]").click();
    await page.reload();
    await expect(page.locator("//div[text()=\"Status\"]/..//h5")).toContainText("Upload Expired");
    vars["RequestIdFromDetails"] = await page.locator("//div[text()=\"Request ID\"]/..//h5").textContent() || '';
    vars["RequestIdFromDetails"] = String(vars["RequestIdFromDetails"]).trim();
    await page.locator("//a[@href=\"#/bid-requests\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//span[@class=\"text-danger\" and contains(text(),\"Queued For\")]")).toBeVisible();
    await expect(page.locator("//button[contains(text(),\"$|RequestIdFromDetails|\")]/../..//td[@data-title=\"Status\"]")).toContainText("Upload Expired");
    await stepGroups.stepGroup_Navigating_to_Bulk_Batch_Timing(page, vars);
    await stepGroups.stepGroup_Modifying_The_Batch_Intervals_For_one_Hour_Prior(page, vars);
  });
});
