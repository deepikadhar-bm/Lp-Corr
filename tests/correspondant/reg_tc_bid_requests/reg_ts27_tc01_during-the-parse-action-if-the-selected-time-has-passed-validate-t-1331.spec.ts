import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS27_TC01_During the parse action, if the selected time has passed, validate the proper alert message, Once the parse is complete, verify that the queued batch updated accordingly', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Deleting_Early_Config_Report_If_Present(page, vars);
    await stepGroups.stepGroup_Navigating_to_Bulk_Batch_Timing(page, vars);
    vars["BufferTime"] = await page.locator("//input[@id=\"pricingReturnTimeBuffer\"]").inputValue() || '';
    await stepGroups.stepGroup_Modifying_The_batch_Intervals_with_current_est_time(page, vars);
    await stepGroups.stepGroup_Navigating_to_Upload_New_Bid_Request(page, vars);
    await stepGroups.stepGroup_Uploading_Bid_Request(page, vars);
    await page.locator("//option[@aria-disabled=\"false\"]").scrollIntoViewIfNeeded();
    await page.locator("//option[@aria-disabled=\"false\"]").click();
    vars["SelectedBatchTime"] = await page.locator("(//select[@aria-label=\"Dropdown selection\"])[3]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
    vars["SelectedHourMin"] = String(vars["SelectedBatchTime"]).substring(0, String(vars["SelectedBatchTime"]).length - 3);
    vars["CurrentEstTime"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC-05:00" };
      const fmt = "hh:mm";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    vars["TimeDiff"] = Math.abs(new Date('2000-01-01 ' + String(vars["SelectedHourMin"])).getTime() - new Date('2000-01-01 ' + String(vars["CurrentEstTime"])).getTime()) / 60000 + '';
    vars["TimeDifferenceSeconds"] = (parseFloat(String(vars["TimeDiff"])) * parseFloat(String("60"))).toFixed(0);
    while (parseFloat(String(vars["TimeDiff"])) > parseFloat(String("4"))) {
      await page.waitForTimeout(240000);
      await page.locator("//form//div//label[text()=\"Bid Requested Date\"]").click();
      vars["TimeDiff"] = (parseFloat(String(vars["TimeDiff"])) - parseFloat(String("4"))).toFixed(0);
      vars["TimeDifferenceSeconds"] = (parseFloat(String(vars["TimeDiff"])) * parseFloat(String("60"))).toFixed(0);
    }
    await page.waitForTimeout(parseInt(vars["TimeDifferenceSeconds"]) * 1000);
    await page.locator("(//input[@type=\"file\"])[1]").setInputFiles(path.resolve(__dirname, 'test-data', "Bid_file_success_error_newfile.xlsx,Bid_file_success_error_newfile.xlsx"));
    await expect(page.locator("//span[text()[normalize-space() = \"Upload Bid\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Upload Bid\"]]").click();
    // [DISABLED] Wait until the element Spinner is not visible
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//div[@id=\"modalBody\" ]/div[@class=\"p-2\"]").waitFor({ state: 'visible' });
    await expect(page.locator("//div[@id=\"modalBody\" ]/div[@class=\"p-2\"]")).toContainText("Selected pricing return time is already passed, please select a valid pricing return time");
    // [DISABLED] Verify that the current page displays text Selected pricing return time is already passed, please select a valid pricing return time
    // await expect(page.getByText("Selected pricing return time is already passed, please select a valid pricing return time")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Ok\"]]").click();
    // [DISABLED] Wait until the element Spinner is not visible
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("(//select[@aria-label=\"Dropdown selection\"])[3]")).toBeVisible();
    await page.locator("(//select[@aria-label=\"Dropdown selection\"])[3]").click();
    await page.locator("//option[@aria-disabled=\"false\"]").scrollIntoViewIfNeeded();
    await page.locator("//option[@aria-disabled=\"false\"]").click();
    vars["ExtractedTimeAfterTimeLapsed"] = await page.locator("(//select[@aria-label=\"Dropdown selection\"])[3]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
    vars[""] = (() => {
      const d = new Date('2000-01-01 ' + String(''));
      d.setMinutes(d.getMinutes() - parseInt(String('')));
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    })();
    await page.locator("//span[text()[normalize-space() = \"Upload Bid\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//div[@class=\"modal-header\"]/div/h5").waitFor({ state: 'visible' });
    await expect(page.locator("//div[@class=\"modal-header\"]/div/h5")).toBeVisible();
    await page.locator("//span[text()=\"Continue\"]/..").waitFor({ state: 'visible' });
    await page.locator("//span[text()=\"Continue\"]/..").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["ActualFooterQueuedExtractedDate"] = await page.locator("//div[@id=\"page-footer\"]//span[contains(text(),\"Queued For\")]").textContent() || '';
    vars["currentDate"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC-05:00" };
      const fmt = "MM/dd/yyyy";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    vars[""] = String(vars["currentDate"]) + ' ' + String(vars["ExtractedTimeAfterLapsed(Buffer time substracted)"]);
    vars[""] = String(vars["ExpectedFooterQueuedDate"]) + ' ' + String("ET");
    expect(String(vars["ActualFooterQueuedExtractedDate"])).toBe(vars["ExpectedFooterQueuedDate(with ET)"]);
  });
});
