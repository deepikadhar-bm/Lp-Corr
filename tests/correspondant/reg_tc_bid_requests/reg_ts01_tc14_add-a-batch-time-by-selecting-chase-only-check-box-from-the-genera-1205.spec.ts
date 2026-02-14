import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS01_TC14_Add a batch time by selecting Chase only check box from the general settings module and verify that batch time value should be updated here under today\\\'s pricing return time value.', async ({ page }) => {
    // Prerequisite: REG_TS01_TC13_Add a batch time value (without selecting chase only checkbox) from the general settin
    // TODO: Ensure prerequisite test passes first

    // [DISABLED] Login to CORR Portal
    // await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Navigating_to_Bulk_Batch_Timing(page, vars);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText("Bulk Batch Timing")).toBeVisible();
    // [DISABLED] Store text from the element Last batch Time(bulk batch screen) into a variable LastBatchTime
    // vars["LastBatchTime"] = await page.locator("(//h5[@class=\"mb-0\"])[last()]").textContent() || '';
    // [DISABLED] Add 5 minutes to the LastBatchTime with HH:mm a , convert to HH:mm a format, and store it in a runtime variable BatchTime(FewMinAdded)
    // vars["BatchTime(FewMinAdded)"] = (() => {
    //   const d = new Date('2000-01-01 ' + String(vars["LastBatchTime"]));
    //   d.setMinutes(d.getMinutes() + parseInt(String("5")));
    //   return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }); // Format: HH:mm a
    // })();
    vars["MinWithStandard"] = String(vars["DeletedBatchTime2"]).split(":")["2"] || '';
    vars["Time_Hour"] = String(vars["DeletedBatchTime2"]).substring(0, String(vars["DeletedBatchTime2"]).length - 6);
    vars["Time_Min"] = String(vars["MinWithStandard"]).substring(0, String(vars["MinWithStandard"]).length - 3);
    vars["Time_Unit"] = String(vars["MinWithStandard"]).substring(3);
    await page.locator("//button[text()[normalize-space() = \"Add A Batch\"]]").click();
    await expect(page.getByText("Add a Batch")).toBeVisible();
    await page.locator("//input[@type=\"checkbox\"]").check();
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
    vars["PricingReturnTimeBuffer"] = await page.locator("//input[@id=\"pricingReturnTimeBuffer\"]").inputValue() || '';
    await page.locator("(//input[@placeholder=\"00\"])[1]").fill(vars["Time_Min"]);
    vars["AddStartTimeInMin"] = await page.locator("(//input[@placeholder=\"00\"])[1]").inputValue() || '';
    await stepGroups.stepGroup_selecting_time_unit_bulk_batch(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Add Batch\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Wait until the current page is loaded completely
    // await page.waitForLoadState('networkidle');
    await expect(page.getByText("Create Batch Timing")).toBeVisible();
    await expect(page.locator("//div[text()[normalize-space() = \"Batch timing has been created successfully\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Ok\"]]").click();
    vars["AddedBatchTime"] = await page.locator("(//div[@class=\"card-body\"]//*[text()=\"$|DeletedBatchTime2|\"])[last()]").textContent() || '';
    vars["PricingReturnTimeBuffer"] = await page.locator("//input[@id=\"pricingReturnTimeBuffer\"]").inputValue() || '';
    vars["AddedBatchTime"] = (() => {
      const d = new Date('2000-01-01 ' + String(vars["AddedBatchTime"]));
      d.setMinutes(d.getMinutes() + parseInt(String(vars["PricingReturnTimeBuffer"])));
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }); // Format: hh:mm a
    })();
    // [DISABLED] Store the count of elements identified by locator Batches_Count into a variable BatchCount
    // vars["BatchCount"] = String(await page.locator("//h6[@class=\"card-subtitle text-body-secondary flex-grow-1 mb-0\"]").count());
    await page.waitForLoadState('networkidle');
    await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//button[text()[normalize-space() = \"Upload New Bid Request\"]]").click();
    await expect(page.getByText("Bid Request Details")).toBeVisible();
    await page.locator("//*[@id=\"pricingReturnTimeDropdown\"]//select[contains(@class,\"form-select\")]").click();
    await expect(page.locator("//select[@class=\"form-select ng-pristine ng-invalid ng-touched\"] | //select[@class=\"form-select ng-untouched ng-pristine ng-invalid\"]").locator('option', { hasText: vars["AddedBatchTime"] })).toBeVisible();
    // [DISABLED] Store 1 in Batch
    // vars["Batch"] = "1";
    while (true) /* Verify if Batch <= BatchCount */ {
      // [DISABLED] Perform addition on 1 and Batch and store the result inside a Batch considering 0 decimal places
      // vars["Batch"] = (parseFloat(String("1")) + parseFloat(String(vars["Batch"]))).toFixed(0);
      // [DISABLED] Navigating to Bulk Batch Timing
      // await stepGroups.stepGroup_Navigating_to_Bulk_Batch_Timing(page, vars);
    }
  });
});
