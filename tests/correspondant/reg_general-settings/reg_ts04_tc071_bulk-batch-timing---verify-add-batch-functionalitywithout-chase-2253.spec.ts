import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_General Settings', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS04_TC07.1_Bulk Batch Timing - Verify Add batch functionality(Without Chase)', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Navigating_to_Bulk_Batch_Timing(page, vars);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText("Bulk Batch Timing")).toBeVisible();
    vars["LastBeforeBatchTime"] = await page.locator("(//h5[@class=\"mb-0\"])[position() = last()-1]").textContent() || '';
    vars["BatchTime(FewMinAdded)"] = (() => {
      const d = new Date('2000-01-01 ' + String(vars["LastBeforeBatchTime"]));
      d.setMinutes(d.getMinutes() + parseInt(String("2")));
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }); // Format: hh:mm a
    })();
    vars["AddedBatchTime"] = vars["BatchTime(FewMinAdded)"];
    // [DISABLED] Trim white space from DeletedBatch1 and store it in a runtime DeletedBatch1
    // vars["DeletedBatch1"] = String(vars["DeletedBatch1"]).trim();
    vars["MinWithStandard"] = String(vars["BatchTime(FewMinAdded)"]).split(":")["2"] || '';
    vars["Time_Hour"] = String(vars["BatchTime(FewMinAdded)"]).substring(0, String(vars["BatchTime(FewMinAdded)"]).length - 6);
    vars["Time_Min"] = String(vars["MinWithStandard"]).substring(0, String(vars["MinWithStandard"]).length - 3);
    vars["Time_Unit"] = String(vars["MinWithStandard"]).substring(3);
    await page.locator("//button[text()[normalize-space() = \"Add A Batch\"]]").click();
    await expect(page.getByText("Add a Batch")).toBeVisible();
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
    // [DISABLED] Store the value displayed in the text box Pricing_Return_Time_Buffer field into a variable PricingReturnTimeBuffer
    // vars["PricingReturnTimeBuffer"] = await page.locator("//input[@id=\"pricingReturnTimeBuffer\"]").inputValue() || '';
    await page.locator("(//input[@placeholder=\"00\"])[1]").fill(vars["Time_Min"]);
    vars["AddStartTimeInMin"] = await page.locator("(//input[@placeholder=\"00\"])[1]").inputValue() || '';
    if (String(vars["Time_Unit"]).includes(String("PM"))) {
      await page.locator("//select[@aria-label=\"Dropdown selection\"]").selectOption({ label: "PM" });
      await expect(page.locator("//select[@aria-label=\"Dropdown selection\"]")).toHaveValue("PM");
    }
    await page.locator("//span[text()[normalize-space() = \"Add Batch\"]]").click();
    // [DISABLED] Wait until the current page is loaded completely
    // await page.waitForLoadState('networkidle');
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText("Create Batch Timing")).toBeVisible();
    await expect(page.locator("//div[text()[normalize-space() = \"Batch timing has been created successfully\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Ok\"]]").click();
    vars["ActualBatchTime"] = await page.locator("(//h5[@class=\"mb-0\"])[position() = last()-1]").textContent() || '';
    expect(String(vars["ActualBatchTime"])).toBe(vars["AddedBatchTime"]);
    await stepGroups.stepGroup_Verifying_the_Last_Modified_Data_In_the_Right_corner_screen(page, vars);
    // [DISABLED] Store the value displayed in the text box Pricing_Return_Time_Buffer field into a variable PricingReturnTimeBuffer
    // vars["PricingReturnTimeBuffer"] = await page.locator("//input[@id=\"pricingReturnTimeBuffer\"]").inputValue() || '';
    // [DISABLED] Add PricingReturnTimeBuffer minutes to the AddedBatchTime with hh:mm a , convert to hh:mm a format, and store it in a runtime variable AddedBatchTime
    // vars["AddedBatchTime"] = (() => {
    //   const d = new Date('2000-01-01 ' + String(vars["AddedBatchTime"]));
    //   d.setMinutes(d.getMinutes() + parseInt(String(vars["PricingReturnTimeBuffer"])));
    //   return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }); // Format: hh:mm a
    // })();
    // [DISABLED] Store the count of elements identified by locator Batches_Count into a variable BatchCount
    // vars["BatchCount"] = String(await page.locator("//h6[@class=\"card-subtitle text-body-secondary flex-grow-1 mb-0\"]").count());
    // [DISABLED] Wait until the current page is loaded completely
    // await page.waitForLoadState('networkidle');
    // [DISABLED] Click on BidRequests_Menu
    // await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    // [DISABLED] Wait until the element Spinner is not visible
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Click on Upload New Bid Request Button
    // await page.locator("//button[text()[normalize-space() = \"Upload New Bid Request\"]]").click();
    // [DISABLED] Verify that the current page displays text Bid Request Details
    // await expect(page.getByText("Bid Request Details")).toBeVisible();
    // [DISABLED] Click on Today_Pricing
    // await page.locator("//*[@id=\"pricingReturnTimeDropdown\"]//select[contains(@class,\"form-select\")]").click();
    // [DISABLED] Verify that the options with text AddedBatchTime is present in the select list Select_Pricing_Batch_Dropdown and With Scrollable FALSE
    // await expect(page.locator("//select[@class=\"form-select ng-pristine ng-invalid ng-touched\"] | //select[@class=\"form-select ng-untouched ng-pristine ng-invalid\"]").locator('option', { hasText: vars["AddedBatchTime"] })).toBeVisible();
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
