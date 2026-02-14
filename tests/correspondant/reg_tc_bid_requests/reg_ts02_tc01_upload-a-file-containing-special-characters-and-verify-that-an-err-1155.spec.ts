import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS02_TC01_Upload a file containing special characters and verify that an error popup is displayed. The popup should have the header \\\"Bid Upload Progress.\\\" Also, verify the correctness of the err', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Deleting_Early_Config_Report_If_Present(page, vars);
    await stepGroups.stepGroup_Navigating_to_Upload_New_Bid_Request(page, vars);
    await stepGroups.stepGroup_Uploading_Bid_Request(page, vars);
    if (true) /* Element Second Enabled Time is visible */ {
      await stepGroups.stepGroup_Selecting_Second_Enabled_Batch_Time_If_the_Condition_is_fail(page, vars);
      vars["SelectedEnabledTime"] = await page.locator("(//select[@aria-label=\"Dropdown selection\"])[3]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
      // [DISABLED] Store text from the element Enabled Time into a variable EnabledTime
      // vars["EnabledTime"] = await page.locator("//option[@aria-disabled=\"false\"]").textContent() || '';
      // [DISABLED] Select option by text EnabledTime in the Pricing_Return_Time list
      // await page.locator("(//select[@aria-label=\"Dropdown selection\"])[3]").selectOption({ label: vars["EnabledTime"] });
    } else {
      await stepGroups.stepGroup_Navigating_to_Bulk_Batch_Timing(page, vars);
      await stepGroups.stepGroup_Modifying_The_Batch_Intervals_For_one_Hour_Prior(page, vars);
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
      // [DISABLED] Store the text of the selected option from Pricing_Return_Time list into a variable SelectedEnabledTime
      // vars["SelectedEnabledTime"] = await page.locator("(//select[@aria-label=\"Dropdown selection\"])[3]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
    }
    // [DISABLED] Store text from the element Enabled_PricingReturnTime into a variable PricingReturnTime
    // vars["PricingReturnTime"] = await page.locator("//option[contains(text(),\"$|BulkBatchTiming|\")]").textContent() || '';
    // [DISABLED] Click on Pricing_Return_Time
    // await page.locator("(//select[@aria-label=\"Dropdown selection\"])[3]").click();
    // [DISABLED] Scroll up to the element Enabled_PricingReturnTime into view
    // await page.locator("//option[contains(text(),\"$|BulkBatchTiming|\")]").scrollIntoViewIfNeeded();
    // [DISABLED] Click on Enabled_PricingReturnTime
    // await page.locator("//option[contains(text(),\"$|BulkBatchTiming|\")]").click();
    // [DISABLED] Remove the no of ( 1,1 ) positions of given string SelectedEnabledTime and store into runtime variable SelectedEnabledTime
    // vars["SelectedEnabledTime"] = String(vars["SelectedEnabledTime"]).substring(1, String(vars["SelectedEnabledTime"]).length - 1);
    vars["SelectedEnabledTime"] = String(vars["SelectedEnabledTime"]).trim();
    await expect(page.locator("(//select[@aria-label=\"Dropdown selection\"])[3]")).toHaveValue(vars["SelectedEnabledTime"]);
    await expect(page.getByText("Drag and drop files here or click to browse. Allowed formats: .xls,.xlsx,.csv,.txt")).toBeVisible();
    await page.locator("(//input[@type=\"file\"])[1]").setInputFiles(path.resolve(__dirname, 'test-data', "Bid_Special_character_space.xlsx,Bid_Special_character_space.xlsx"));
    await expect(page.locator("//span[text()[normalize-space() = \"Upload Bid\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Upload Bid\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText("Bid Upload Progress")).toBeVisible();
    await expect(page.getByText(testData["SpecialCharacter_ErrorHeader"])).toBeVisible();
    await expect(page.getByText(testData["SpecialCharacter_ErrorMessage"])).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Okay, Close\"]]").click();
    await page.locator("//i[contains(@class, 'fa-trash-alt')]/..").click();
    await expect(page.getByText(testData["DeletingMessage for File"])).toBeVisible();
    await page.locator("//button[@aria-label=\"Yes, proceed\"]").click();
    // [DISABLED] Upload file Bid_Missing_headers.xlsx,Bid_Missing_headers.xlsx using the element UploadFile [BidRequest]
    // await page.locator("(//input[@type=\"file\"])[1]").setInputFiles(path.resolve(__dirname, 'test-data', "Bid_Missing_headers.xlsx,Bid_Missing_headers.xlsx"));
    // [DISABLED] Click on Upload Bid Button
    // await page.locator("//span[text()[normalize-space() = \"Upload Bid\"]]").click();
    // [DISABLED] Wait until the element Spinner is not visible
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Verify that the current page displays text Bid Upload Progress
    // await expect(page.getByText("Bid Upload Progress")).toBeVisible();
    // [DISABLED] Verify that the current page displays text MissingHeaders_ErrorHeader
    // await expect(page.getByText(testData["MissingHeaders_ErrorHeader"])).toBeVisible();
    // [DISABLED] Verify that the current page displays text Bid tape is missing values for following headers: Loan Purpose.
    // await expect(page.getByText("Bid tape is missing values for following headers: Loan Purpose.")).toBeVisible();
    // [DISABLED] Verify that the current page displays text Please verify the correct Map ID is selected or tape is formatted correctly.
    // await expect(page.getByText("Please verify the correct Map ID is selected or tape is formatted correctly.")).toBeVisible();
    // [DISABLED] Click on Okay, Close Button
    // await page.locator("//span[text()[normalize-space() = \"Okay, Close\"]]").click();
    // [DISABLED] Click on Delete Button_BidRequest
    // await page.locator("//i[contains(@class, 'fa-trash-alt')]/..").click();
    // [DISABLED] Verify that the current page displays text DeletingMessage for File
    // await expect(page.getByText(testData["DeletingMessage for File"])).toBeVisible();
    // [DISABLED] Click on Yes, proceed_Button [BidRequest]
    // await page.locator("//button[@aria-label=\"Yes, proceed\"]").click();
    // [DISABLED] Upload file Bid_Duplicate_file.xlsx,Bid_Duplicate_file.xlsx using the element UploadFile [BidRequest]
    // await page.locator("(//input[@type=\"file\"])[1]").setInputFiles(path.resolve(__dirname, 'test-data', "Bid_Duplicate_file.xlsx,Bid_Duplicate_file.xlsx"));
    // [DISABLED] Click on Upload Bid Button
    // await page.locator("//span[text()[normalize-space() = \"Upload Bid\"]]").click();
    // [DISABLED] Wait until the element Spinner is not visible
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Verify that the current page displays text Bid Upload Progress
    // await expect(page.getByText("Bid Upload Progress")).toBeVisible();
    // [DISABLED] Verify that the current page displays text DuplicateLoans_HeaderMessage
    // await expect(page.getByText(testData["DuplicateLoans_HeaderMessage"])).toBeVisible();
    // [DISABLED] Verify that the current page displays text DuplicateLoans_ErrorMessage
    // await expect(page.getByText(testData["DuplicateLoans_ErrorMessage"])).toBeVisible();
    // [DISABLED] Click on Okay, Close Button
    // await page.locator("//span[text()[normalize-space() = \"Okay, Close\"]]").click();
    // [DISABLED] Click on Delete Button_BidRequest
    // await page.locator("//i[contains(@class, 'fa-trash-alt')]/..").click();
    // [DISABLED] Verify that the current page displays text DeletingMessage for File
    // await expect(page.getByText(testData["DeletingMessage for File"])).toBeVisible();
    // [DISABLED] Click on Yes, proceed_Button [BidRequest]
    // await page.locator("//button[@aria-label=\"Yes, proceed\"]").click();
  });
});
