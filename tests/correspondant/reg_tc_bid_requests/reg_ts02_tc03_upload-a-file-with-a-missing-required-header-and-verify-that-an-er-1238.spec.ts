import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS02_TC03_Upload a file with a missing required header and verify that an error popup appears with the header \\\"Bid Upload Progress.\\\" Also, verify the error header and message.', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Deleting_Early_Config_Report_If_Present(page, vars);
    await stepGroups.stepGroup_Navigating_to_Upload_New_Bid_Request(page, vars);
    await stepGroups.stepGroup_Uploading_Bid_Request(page, vars);
    if (true) /* Element Second Enabled Time is visible */ {
      // [DISABLED] Select option by text EnabledTime in the Pricing_Return_Time list
      // await page.locator("(//select[@aria-label=\"Dropdown selection\"])[3]").selectOption({ label: vars["EnabledTime"] });
      await stepGroups.stepGroup_Selecting_Second_Enabled_Batch_Time_If_the_Condition_is_fail(page, vars);
      vars["SelectedEnabledTime"] = await page.locator("(//select[@aria-label=\"Dropdown selection\"])[3]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
    } else {
      await stepGroups.stepGroup_Navigating_to_Bulk_Batch_Timing(page, vars);
      await stepGroups.stepGroup_Modifying_batches_with_5_min_prior(page, vars);
      await stepGroups.stepGroup_Navigating_to_Upload_New_Bid_Request(page, vars);
      await stepGroups.stepGroup_Uploading_Bid_Request(page, vars);
      await stepGroups.stepGroup_Selecting_Second_Enabled_Batch_Time_If_the_Condition_is_fail(page, vars);
      vars["SelectedEnabledTime"] = await page.locator("(//select[@aria-label=\"Dropdown selection\"])[3]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
      // [DISABLED] Scroll to the element Enabled Time into view
      // await page.locator("//option[@aria-disabled=\"false\"]").scrollIntoViewIfNeeded();
      // [DISABLED] Store text from the element Enabled Time into a variable EnabledTime
      // vars["EnabledTime"] = await page.locator("//option[@aria-disabled=\"false\"]").textContent() || '';
      // [DISABLED] Select option by text EnabledTime in the Pricing_Return_Time list
      // await page.locator("(//select[@aria-label=\"Dropdown selection\"])[3]").selectOption({ label: vars["EnabledTime"] });
    }
    // [DISABLED] Store text from the element Enabled_PricingReturnTime into a variable PricingReturnTime
    // vars["PricingReturnTime"] = await page.locator("//option[contains(text(),\"$|BulkBatchTiming|\")]").textContent() || '';
    // [DISABLED] Click on Pricing_Return_Time
    // await page.locator("(//select[@aria-label=\"Dropdown selection\"])[3]").click();
    // [DISABLED] Scroll up to the element Enabled_PricingReturnTime into view
    // await page.locator("//option[contains(text(),\"$|BulkBatchTiming|\")]").scrollIntoViewIfNeeded();
    // [DISABLED] Click on Enabled_PricingReturnTime
    // await page.locator("//option[contains(text(),\"$|BulkBatchTiming|\")]").click();
    // [DISABLED] Remove the no of ( 1,1 ) positions of given string EnabledTime and store into runtime variable EnabledTime
    // vars["EnabledTime"] = String(vars["EnabledTime"]).substring(1, String(vars["EnabledTime"]).length - 1);
    vars["SelectedEnabledTime"] = String(vars["SelectedEnabledTime"]).trim();
    await expect(page.locator("(//select[@aria-label=\"Dropdown selection\"])[3]")).toHaveValue(vars["SelectedEnabledTime"]);
    await page.locator("(//input[@type=\"file\"])[1]").setInputFiles(path.resolve(__dirname, 'test-data', "Bid_Missing_headers.xlsx,Bid_Missing_headers.xlsx"));
    await page.locator("//span[text()[normalize-space() = \"Upload Bid\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText("Bid Upload Progress")).toBeVisible();
    await expect(page.getByText(testData["MissingHeaders_ErrorHeader"])).toBeVisible();
    await expect(page.getByText(testData["Missing Headers(Error Message)"])).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Okay, Close\"]]").click();
    await page.locator("//i[contains(@class, 'fa-trash-alt')]/..").click();
    await expect(page.getByText(testData["DeletingMessage for File"])).toBeVisible();
    await page.locator("//button[@aria-label=\"Yes, proceed\"]").click();
  });
});
