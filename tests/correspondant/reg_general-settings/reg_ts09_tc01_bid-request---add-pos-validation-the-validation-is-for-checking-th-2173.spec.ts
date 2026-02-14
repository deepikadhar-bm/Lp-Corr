import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_General Settings', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS09_TC01_Bid Request - Add POS Validation, the Validation is for Checking the Bid Uploaded, and for the Verification', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[@href=\"#/admin/general-settings/bid-request\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("(//select[@aria-label=\"Dropdown selection\"])[3]").selectOption({ label: "Choice" });
    await expect(page.locator("(//select[@aria-label=\"Dropdown selection\"])[3]")).toHaveValue("Choice");
    await page.locator("//button[normalize-space(text())=\"Save changes\" or contains(text(),\"Save Changes\")]").waitFor({ state: 'visible' });
    await page.locator("//button[text()=\"Save Changes\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Navigating_to_Bulk_Batch_Timing(page, vars);
    await stepGroups.stepGroup_Modifying_The_batch_Intervals_with_current_est_time(page, vars);
    await stepGroups.stepGroup_Navigating_to_Upload_New_Bid_Request(page, vars);
    await stepGroups.stepGroup_Uploading_Bid_Request(page, vars);
    // [DISABLED] Upload Bid Request from batch time selection to continue button
    // await stepGroups.stepGroup_Upload_Bid_Request_from_batch_time_selection_to_continue_but(page, vars);
    await stepGroups.stepGroup_Upload_Bid_Process_from_Batch_time_Selection_to_Bid_Upload_P(page, vars);
    vars["RowsCount"] = String(await page.locator("(//table)[1]//tbody//tr").count());
    await page.locator("//td[@data-title=\"Errors\"]").hover();
    vars["ConventionalErrorCount"] = String(await page.locator("//td[@data-title=\"Error Description\"]//div[contains(text(),\"not approved for [conventional]\") or contains(text(),\"Not approved for [conventional]\")]").count());
    expect(String(vars["RowsCount"])).toBe(vars["ConventionalErrorCount"]);
    await stepGroups.stepGroup_Navigating_To_Bid_Request_Config(page, vars);
    await page.locator("(//select[@aria-label=\"Dropdown selection\"])[3]").selectOption({ label: "Conventional" });
    await page.locator("//button[text()=\"Save Changes\"]").waitFor({ state: 'visible' });
    await page.locator("//button[text()=\"Save Changes\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["ExpectedModifiedTime"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC" };
      const fmt = "MM/d/yyyy : h:mm a";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    vars[""] = (() => {
      const d = new Date('2000-01-01 ' + String(''));
      d.setMinutes(d.getMinutes() - parseInt(String('')));
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    })();
    await expect(page.locator("(//select[@aria-label=\"Dropdown selection\"])[3]")).toHaveValue("Conventional");
  });
});
