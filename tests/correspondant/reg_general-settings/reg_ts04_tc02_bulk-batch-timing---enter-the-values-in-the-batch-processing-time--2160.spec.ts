import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_General Settings', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS04_TC02_Bulk Batch Timing - Enter the Values in the Batch Processing time Buffer, and verify it is get displayed in the Bid request Module.', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Navigating_to_Bulk_Batch_Timing(page, vars);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText("Bulk Batch Timing")).toBeVisible();
    // [DISABLED] Delete Last Batch Time
    // await stepGroups.stepGroup_Delete_Last_Batch_Time(page, vars);
    await stepGroups.stepGroup_Modifying_The_batch_Intervals_with_current_est_time(page, vars);
    vars["BufferTimeBefore"] = await page.locator("//input[@id='batchProcessingTimeBuffer']").inputValue() || '';
    await page.locator("//input[@id='batchProcessingTimeBuffer']").fill(String("10"));
    await page.locator("//button[text()=\"Save Buffer\"]").waitFor({ state: 'visible' });
    await page.locator("//button[text()=\"Save Buffer\"]").click();
    await page.waitForTimeout(4000);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Navigating_to_Upload_New_Bid_Request(page, vars);
    await page.locator("(//select[@aria-label=\"Dropdown selection\"])[3]").click();
    await page.locator("(//*[@id=\"pricingReturnTimeDropdown\"]//option[not(contains(text(),\"Select\"))])[1]").waitFor({ state: 'visible' });
    await page.waitForTimeout(30000);
    await expect(page.locator("(//*[@id=\"pricingReturnTimeDropdown\"]//option[not(contains(text(),\"Select\"))])[1]")).toBeVisible();
    await expect(page.locator("(//*[@id=\"pricingReturnTimeDropdown\"]//option[not(contains(text(),\"Select\"))])[2]")).toBeVisible();
    await expect(page.locator("(//*[@id=\"pricingReturnTimeDropdown\"]//option[not(contains(text(),\"Select\"))])[3]")).toBeVisible();
    await expect(page.locator("(//*[@id=\"pricingReturnTimeDropdown\"]//option[not(contains(text(),\"Select\"))])[4]")).toBeVisible();
    await expect(page.locator("(//*[@id=\"pricingReturnTimeDropdown\"]//option[not(contains(text(),\"Select\"))])[5]")).toBeVisible();
    await stepGroups.stepGroup_Navigating_to_Bulk_Batch_Timing(page, vars);
    await page.locator("//input[@id='batchProcessingTimeBuffer']").fill(String(vars["BufferTimeBefore"]));
    await page.locator("//button[text()=\"Save Buffer\"]").waitFor({ state: 'visible' });
    await page.locator("//button[text()=\"Save Buffer\"]").click();
    // [DISABLED] Modifying The Batch Intervals
    // await stepGroups.stepGroup_Modifying_The_Batch_Intervals(page, vars);
    // [DISABLED] Wait until the current page is loaded completely
    // await page.waitForLoadState('networkidle');
    // [DISABLED] Pick the current date MM/d/yyyy : h:mm a by location UTC and store into a variable ExpectedTime
    // vars["ExpectedTime"] = (() => {
    //   const d = new Date();
    //   const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC" };
    //   const fmt = "MM/d/yyyy : h:mm a";
    //   // Map Java date format to Intl parts
    //   const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
    //   const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
    //   return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    // })();
    // [DISABLED] Verify that the element Last Modified Data(Right Corner Screen) displayed text contains the ExpectedTime , ignoring case
    // expect((await page.locator("(//div[contains(text(),\"Last Modified\")])[1]").textContent() || '').toLowerCase()).toContain(String('').toLowerCase());
    // [DISABLED] Verify that the element Last Modified Data(Right Corner Screen) displayed text contains the test sigma , ignoring case
    // expect((await page.locator("(//div[contains(text(),\"Last Modified\")])[1]").textContent() || '').toLowerCase()).toContain(String('').toLowerCase());
  });
});
