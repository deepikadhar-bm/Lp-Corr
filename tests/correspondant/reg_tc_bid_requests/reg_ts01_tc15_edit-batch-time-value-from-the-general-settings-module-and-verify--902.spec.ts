import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS01_TC15_Edit batch time value from the general settings module and verify that batch time value should be updated here under today\\\'s pricing return time value.', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Deleting_Early_Config_Report_If_Present(page, vars);
    await stepGroups.stepGroup_Navigating_to_Bulk_Batch_Timing(page, vars);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["LastBeforeBatchTime"] = await page.locator("(//h5[@class=\"mb-0\"])[position() = last()-1]").textContent() || '';
    vars["LastBeforeBatchTime"] = (() => {
      const d = new Date('2000-01-01 ' + String(vars["LastBeforeBatchTime"]));
      d.setMinutes(d.getMinutes() + parseInt(String("1")));
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }); // Format: hh:mm a
    })();
    await stepGroups.stepGroup_Separating_Hours_and_Minutes(page, vars);
    await page.locator("(//div[@class=\"card-body\"])[last()]").hover();
    await page.locator("(//button[@aria-label=\"Edit Batch Time\"])[last()]").click();
    await expect(page.getByText("Edit Batch Timing")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"H\"]]/preceding-sibling::input[@placeholder=\"0\"]").clear();
    // [DISABLED] Pick the current date hh by location UTC-04:00 and store into a variable Time_Hour
    // vars["Time_Hour"] = (() => {
    //   const d = new Date();
    //   const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC-04:00" };
    //   const fmt = "hh";
    //   // Map Java date format to Intl parts
    //   const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
    //   const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
    //   return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    // })();
    await page.locator("//span[text()[normalize-space() = \"H\"]]/preceding-sibling::input[@placeholder=\"0\"]").fill(vars["Time_Hour"]);
    await page.locator("(//input[@placeholder=\"00\"])[1]").clear();
    // [DISABLED] Pick the current date hh:mm by location UTC-04:00 and store into a variable Time_Min
    // vars["Time_Min"] = (() => {
    //   const d = new Date();
    //   const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC-04:00" };
    //   const fmt = "hh:mm";
    //   // Map Java date format to Intl parts
    //   const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
    //   const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
    //   return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    // })();
    // [DISABLED] Split the Time_Min with the : and store the value from the 2 in the BulkBatchTiming
    // vars["BulkBatchTiming"] = String(vars["Time_Min"]).split(":")["2"] || '';
    await page.locator("(//input[@placeholder=\"00\"])[1]").fill(vars["Time_Min"]);
    await expect(page.locator("//span[text()[normalize-space() = \"Apply Changes\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Apply Changes\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText("Update Batch Timing")).toBeVisible();
    await expect(page.locator("//div[text()[normalize-space() = \"Batch timing has been updated successfully\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Ok\"]]").click();
    vars["EditedBatchTime"] = await page.locator("(//div[@class=\"card-body\"]//*[text()=\"$|LastBeforeBatchTime|\"])").textContent() || '';
    // [DISABLED] Store the count of elements identified by locator Batches_Count into a variable BatchCount
    // vars["BatchCount"] = String(await page.locator("//h6[@class=\"card-subtitle text-body-secondary flex-grow-1 mb-0\"]").count());
    // [DISABLED] Verification for the Pricing Return Timing
    // await stepGroups.stepGroup_Verification_for_the_Pricing_Return_Timing(page, vars);
    vars["BufferTime"] = await page.locator("//input[@id=\"pricingReturnTimeBuffer\"]").inputValue() || '';
    vars["BufferEditedTime"] = (() => {
      const d = new Date('2000-01-01 ' + String(vars["EditedBatchTime"]));
      d.setMinutes(d.getMinutes() + parseInt(String(vars["BufferTime"])));
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }); // Format: hh:mm a
    })();
    await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText("Bid Requests")).toBeVisible();
    await page.locator("//button[text()[normalize-space() = \"Upload New Bid Request\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText("Bid Request Details")).toBeVisible();
    await page.locator("//*[@id=\"pricingReturnTimeDropdown\"]//select[contains(@class,\"form-select\")]").click();
    await expect(page.locator("//select[@class=\"form-select ng-pristine ng-invalid ng-touched\"] | //select[@class=\"form-select ng-untouched ng-pristine ng-invalid\"]").locator('option', { hasText: vars["BufferEditedTime"] })).toBeVisible();
  });
});
