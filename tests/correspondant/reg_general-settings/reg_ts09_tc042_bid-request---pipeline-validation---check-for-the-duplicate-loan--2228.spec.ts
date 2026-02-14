import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_General Settings', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS09_TC04.2_Bid Request - Pipeline Validation - Check for the Duplicate Loan Check, - by enable and disable upload the loan for verification.', async ({ page }) => {
    // Prerequisite: REG_TS09_TC04.1_Bid Request - Pipeline Validation - Check for the Duplicate Loan Check, - by enable 
    // TODO: Ensure prerequisite test passes first

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[@href=\"#/admin/general-settings/bid-request\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["LightGrayColor"] = "rgba(204, 204, 204, 1)";
    vars["BrightBlueColor"] = "rgba(33, 150, 243, 1)";
    vars[""] = await page.locator("(//*[@class=\"slider round\"])[2]").evaluate((el) => window.getComputedStyle(el as HTMLElement).backgroundColor);
    if (String(vars["ToggleColor"]) === String(vars["LightGrayColor"])) {
      await page.locator("(//*[@class=\"slider round\"])[2]").click();
    }
    await expect(page.locator("(//*[@class=\"slider round\"])[2]")).toHaveCSS('border', vars["BrightBlueColor"]);
    // [DISABLED] Wait for 5 seconds
    // await page.waitForTimeout(5000);
    // [DISABLED] Get background color of element Loan Duplicate Toggle and store into ldf
    // vars[""] = await page.locator("(//*[@class=\"slider round\"])[2]").evaluate((el) => window.getComputedStyle(el as HTMLElement).backgroundColor);
    // [DISABLED] Get background color of Loan Duplicate Toggle and convert to color name and store into xcf
    // vars[""] = await page.locator("(//*[@class=\"slider round\"])[2]").evaluate((el) => window.getComputedStyle(el as HTMLElement).backgroundColor);
    // [DISABLED] Wait until the element Save Changes Button is enabled
    // await page.locator("//button[normalize-space(text())=\"Save changes\" or contains(text(),\"Save Changes\")]").waitFor({ state: 'visible' });
    if (true) /* Element Save Changes Button is enabled */ {
      await page.locator("//button[text()=\"Save Changes\"]").click();
    }
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Click on Save Changes Button
    // await page.locator("//button[text()=\"Save Changes\"]").click();
    // [DISABLED] Wait until the element Spinner is not visible
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Navigating_to_Bulk_Batch_Timing(page, vars);
    await stepGroups.stepGroup_Modifying_The_batch_Intervals_with_current_est_time(page, vars);
    await stepGroups.stepGroup_Navigating_to_Upload_New_Bid_Request(page, vars);
    await stepGroups.stepGroup_Uploading_Bid_Request(page, vars);
    await stepGroups.stepGroup_Upload_Bid_Request_from_batch_time_selection_to_continue_but(page, vars);
    // [DISABLED] Store the count of elements identified by locator Rows Count Table 1 into a variable RowsCount
    // vars["RowsCount"] = String(await page.locator("(//table)[1]//tbody//tr").count());
    // [DISABLED] Mouseover the element First error data
    // await page.locator("//td[@data-title=\"Errors\"]").hover();
    // [DISABLED] Store the count of elements identified by locator Not Approved for Conventional Error Description into a variable ConventionalErrorCount
    // vars["ConventionalErrorCount"] = String(await page.locator("//td[@data-title=\"Error Description\"]//div[contains(text(),\"not approved for [conventional]\") or contains(text(),\"Not approved for [conventional]\")]").count());
    // [DISABLED] Verify if RowsCount == ConventionalErrorCount
    // expect(String(vars["RowsCount"])).toBe(vars["ConventionalErrorCount"]);
    await stepGroups.stepGroup_Navigating_To_Bid_Request_Config(page, vars);
    await page.locator("(//*[@class=\"slider round\"])[2]").click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator("(//*[@class=\"slider round\"])[2]")).toHaveCSS('border', vars["LightGrayColor"]);
    await page.locator("//button[text()=\"Save Changes\"]").waitFor({ state: 'visible' });
    await page.locator("//button[text()=\"Save Changes\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Navigating_to_Upload_New_Bid_Request(page, vars);
    await stepGroups.stepGroup_Uploading_Bid_Request(page, vars);
    await stepGroups.stepGroup_Upload_Bid_Request_from_batch_time_selection_to_continue_but(page, vars);
    // [DISABLED] Select option using value Conventional in the Conventional Dropdown(Bid Request Config) list
    // await page.locator("(//select[@aria-label=\"Dropdown selection\"])[3]").selectOption({ label: "Conventional" });
    // [DISABLED] Pick the current date MM/d/yyyy : h:mm a by location UTC and store into a variable ExpectedModifiedTime
    // vars["ExpectedModifiedTime"] = (() => {
    //   const d = new Date();
    //   const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC" };
    //   const fmt = "MM/d/yyyy : h:mm a";
    //   // Map Java date format to Intl parts
    //   const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
    //   const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
    //   return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    // })();
    // [DISABLED] Adjust UTC Time by Subtracting Minutes hh:mm a 1 into HourMinMinus1
    // vars[""] = (() => {
    //   const d = new Date('2000-01-01 ' + String(''));
    //   d.setMinutes(d.getMinutes() - parseInt(String('')));
    //   return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    // })();
    // [DISABLED] Verify that the Conventional Dropdown(Bid Request Config) list has option with value Conventional selected and With Scrollable FALSE
    // await expect(page.locator("(//select[@aria-label=\"Dropdown selection\"])[3]")).toHaveValue("Conventional");
    await stepGroups.stepGroup_Navigating_To_Bid_Request_Config(page, vars);
    await page.locator("(//*[@class=\"slider round\"])[2]").click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator("(//*[@class=\"slider round\"])[2]")).toHaveCSS('border', vars["BrightBlueColor"]);
    await page.locator("//button[text()=\"Save Changes\"]").waitFor({ state: 'visible' });
    await page.locator("//button[text()=\"Save Changes\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
  });
});
