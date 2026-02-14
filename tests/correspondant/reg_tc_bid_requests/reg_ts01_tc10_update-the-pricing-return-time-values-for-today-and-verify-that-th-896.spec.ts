import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS01_TC10_Update the pricing return time values for today and verify that the same should be displayed in the dropdown list for today.', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Deleting_Early_Config_Report_If_Present(page, vars);
    await stepGroups.stepGroup_Navigating_to_Bulk_Batch_Timing(page, vars);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Modifying_The_Batch_Intervals_For_one_Hour_Prior(page, vars);
    vars["BatchCount"] = String(await page.locator("//h6[@class=\"card-subtitle text-body-secondary flex-grow-1 mb-0\"]").count());
    vars["BatchNum"] = "1";
    while (parseFloat(String(vars["BatchNum"])) <= parseFloat(String(vars["BatchCount"]))) {
      for (let dataIdx = parseInt(vars["BatchNum"]); dataIdx <= parseInt(vars["BatchNum"]); dataIdx++) {
        vars["BatchTime"] = await page.locator("(//h6[@class=\"card-subtitle text-body-secondary flex-grow-1 mb-0\"]/../..//h5)[$|BatchNum|]").textContent() || '';
        vars["PricingReturnTimeBuffer"] = await page.locator("//input[@id=\"pricingReturnTimeBuffer\"]").inputValue() || '';
        vars["BufferedBatchTiming"] = (() => {
          const d = new Date('2000-01-01 ' + String(vars["BatchTime"]));
          d.setMinutes(d.getMinutes() + parseInt(String(vars["PricingReturnTimeBuffer"])));
          return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }); // Format: hh:mm a
        })();
        // Write to test data profile: "batch time" = vars["BufferedBatchTiming"]
        // TODO: Test data profile writes need custom implementation
        vars["BatchNum"] = (parseFloat(String("1")) + parseFloat(String(vars["BatchNum"]))).toFixed(0);
      }
    }
  });
});
