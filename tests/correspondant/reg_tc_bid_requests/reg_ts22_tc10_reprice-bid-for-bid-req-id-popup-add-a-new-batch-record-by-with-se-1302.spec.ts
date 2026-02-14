import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS22_TC10_Reprice bid for #Bid req ID\\\" popup : Add a new batch record by with selecting \\\"Chase only\\\" option, and verify the value should be displayed in the pricing return time dropdown for tod', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Deleting_Early_Config_Report_If_Present(page, vars);
    await stepGroups.stepGroup_Navigating_to_Upload_New_Bid_Request(page, vars);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("(//select[@aria-label=\"Dropdown selection\"])[3]").click();
    if (true) /* Element Enabled Time is visible */ {
      await stepGroups.stepGroup_Navigating_to_Bulk_Batch_Timing(page, vars);
    } else {
      await stepGroups.stepGroup_Navigating_to_Bulk_Batch_Timing(page, vars);
      await stepGroups.stepGroup_Modifying_The_Batch_Intervals_For_one_Hour_Prior(page, vars);
    }
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText("Bulk Batch Timing")).toBeVisible();
    vars["LastBeforeBatchTime"] = await page.locator("(//h5[@class=\"mb-0\"])[position() = last()-1]").textContent() || '';
    vars["BatchTime(FewMinAdded)"] = (() => {
      const d = new Date('2000-01-01 ' + String(vars["LastBeforeBatchTime"]));
      d.setMinutes(d.getMinutes() + parseInt(String("1")));
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }); // Format: hh:mm a
    })();
    vars["MinWithStandard"] = String(vars["BatchTime(FewMinAdded)"]).split(":")["2"] || '';
    vars["Time_Hour"] = String(vars["BatchTime(FewMinAdded)"]).substring(0, String(vars["BatchTime(FewMinAdded)"]).length - 6);
    vars["Time_Min"] = String(vars["MinWithStandard"]).substring(0, String(vars["MinWithStandard"]).length - 3);
    vars["Time_Unit"] = String(vars["MinWithStandard"]).substring(3);
    await page.locator("//button[text()[normalize-space() = \"Add A Batch\"]]").click();
    await expect(page.getByText("Add a Batch")).toBeVisible();
    await page.locator("//input[@type=\"checkbox\"]").check();
    await page.locator("//span[text()[normalize-space() = \"H\"]]/preceding-sibling::input[@placeholder=\"0\"]").fill(vars["Time_Hour"]);
    vars["PricingReturnTimeBuffer"] = await page.locator("//input[@id=\"pricingReturnTimeBuffer\"]").inputValue() || '';
    await page.locator("(//input[@placeholder=\"00\"])[1]").fill(vars["Time_Min"]);
    vars["AddStartTimeInMin"] = await page.locator("(//input[@placeholder=\"00\"])[1]").inputValue() || '';
    await stepGroups.stepGroup_selecting_time_unit_bulk_batch(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Add Batch\"]]").click();
    // [DISABLED] Wait until the current page is loaded completely
    // await page.waitForLoadState('networkidle');
    // [DISABLED] Verify that the current page displays text Create Batch Timing
    // await expect(page.getByText("Create Batch Timing")).toBeVisible();
    await page.locator("//div[text()[normalize-space() = \"Batch timing has been created successfully\"]]").waitFor({ state: 'visible' });
    await expect(page.locator("//div[text()[normalize-space() = \"Batch timing has been created successfully\"]]")).toBeVisible();
    await expect(page.getByText(vars["BatchTime(FewMinAdded)"])).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Ok\"]]").click();
    vars["PricingReturnTimeBuffer"] = await page.locator("//input[@id=\"pricingReturnTimeBuffer\"]").inputValue() || '';
    vars["AddedBatchTime"] = (() => {
      const d = new Date('2000-01-01 ' + String(vars["BatchTime(FewMinAdded)"]));
      d.setMinutes(d.getMinutes() + parseInt(String(vars["PricingReturnTimeBuffer"])));
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }); // Format: hh:mm a
    })();
    await page.waitForLoadState('networkidle');
    await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["StatusToBeSelected"] = "Upload Expired";
    vars["ExecutionType"] = "Standard";
    await stepGroups.stepGroup_Filtering_Status_and_Navigating_to_Filtered_Status_Bid_Reque(page, vars);
    await page.locator("//button[contains(@class, 'btn-primary')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//select[@aria-label=\"Dropdown selection\"]").click();
    await page.waitForTimeout(5000);
    await expect(page.locator("//select[@aria-label=\"Dropdown selection\"]").locator('option', { hasText: vars["AddedBatchTime"] })).toBeVisible();
    await page.locator("//label[text()[normalize-space() = \"Next Business Day\"]]/preceding-sibling::input[@type=\"radio\"]").check();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//select[@aria-label=\"Dropdown selection\"]").click();
    await expect(page.locator("//select[@aria-label=\"Dropdown selection\"]")).not.toContainText(vars["AddedBatchTime"]);
  });
});
