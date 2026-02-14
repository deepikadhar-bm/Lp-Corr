import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS22_TC08_01_Reprice bid for #Bid req ID\\\" popup : Modify the bulk batch time config for next business day,  and validate that Next business day\\\'s pricing return time values are updated according', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Deleting_Early_Config_Report_If_Present(page, vars);
    await stepGroups.stepGroup_Navigating_to_Bulk_Batch_Timing(page, vars);
    await stepGroups.stepGroup_Modifying_The_Batch_Intervals_For_Next_bussiness_day_with_on(page, vars);
    vars["BufferTime"] = await page.locator("//input[@id=\"pricingReturnTimeBuffer\"]").inputValue() || '';
    vars["count"] = "1";
    vars["TotalExtractedBatch"] = String(await page.locator("//div[@class=\"col\"]//div//h5").count());
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["TotalExtractedBatch"]))) {
      vars["EachBatchTiming"] = await page.locator("(//div[@class=\"col\"]//div//h5)[$|count|]").textContent() || '';
      vars["EachBatchTiming"] = (() => {
        const d = new Date('2000-01-01 ' + String(vars["EachBatchTiming"]));
        d.setMinutes(d.getMinutes() + parseInt(String(vars["BufferTime"])));
        return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }); // Format: hh:mm a
      })();
      for (let dataIdx = parseInt(vars["count"]); dataIdx <= parseInt(vars["count"]); dataIdx++) {
        // Write to test data profile: "Stored_Text1" = vars["EachBatchTiming"]
        // TODO: Test data profile writes need custom implementation
        vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
      }
    }
    await page.reload();
    await page.locator("//li[@class=\"nav-item\"]//a[@href=\"#/bid-requests\"]").waitFor({ state: 'visible' });
    await page.locator("//li[@class=\"nav-item\"]//a[@href=\"#/bid-requests\"]").click();
    await page.locator("//span[text()[normalize-space() = \"Filter\"]]").click();
    await page.locator("//div[text()[normalize-space() = \"Select Company/CCode\"]]").click();
    await page.locator("//input[@type=\"checkbox\" and contains(@aria-label,\"@|Company Name|\")]").check();
    await page.locator("//div[@id=\"multiSelectOptionsDropDown\"]//button[text()=\" Apply Selected \"]").click();
    await page.locator("(//div[@class=\"d-flex\"]//div//button[@id=\"multiSelectDropDown\"])[last()]").click();
    await expect(page.locator("//div[@id=\"multiSelectOptionsDropDown\"]//div//div//label//input[@aria-label=\"Select Upload Expired\"]")).toBeVisible();
    await page.locator("//div[@id=\"multiSelectOptionsDropDown\"]//div//div//label//input[@aria-label=\"Select Upload Expired\"]").check();
    await page.locator("(//button[contains(normalize-space(),\"Apply Selected 1\")])[2]").click();
    await expect(page.locator("//div[contains(@class, \"justify-content-end\")]//button[text()=\"Apply Filters\"]")).toBeVisible();
    await page.locator("//div[contains(@class, \"justify-content-end\")]//button[text()=\"Apply Filters\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//td[@data-title=\"Bid Req. ID\"]")).toBeVisible();
    await page.locator("//td[@data-title=\"Bid Req. ID\"]").click();
    await page.locator("//button//span[text()=\"Re-Submit For Pricing\"]").click();
  });
});
