import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';
import * as excelHelper from '../../../src/helpers/excel-helpers';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS11_TC01_When a bid file with valid data for all loans is uploaded, all statuses should display as success, and no loans should be marked as error. and all the loan status should be success.', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Deleting_Early_Config_Report_If_Present(page, vars);
    await stepGroups.stepGroup_Navigating_to_Upload_New_Bid_Request(page, vars);
    await stepGroups.stepGroup_Uploading_Bid_Request(page, vars);
    if (true) /* Element Second Enabled Time is visible */ {
      await stepGroups.stepGroup_Selecting_Second_Enabled_Batch_Time_If_the_Condition_is_fail(page, vars);
      // [DISABLED] Scroll to the element Enabled Date into view
      // await page.locator("//option[@aria-disabled=\"false\"]").scrollIntoViewIfNeeded();
      // [DISABLED] Click on Enabled Date
      // await page.locator("//option[@aria-disabled=\"false\"]").click();
    } else {
      await stepGroups.stepGroup_Navigating_to_Bulk_Batch_Timing(page, vars);
      await stepGroups.stepGroup_Modifying_batches_with_5_min_prior(page, vars);
      await stepGroups.stepGroup_Navigating_to_Upload_New_Bid_Request(page, vars);
      await stepGroups.stepGroup_Uploading_Bid_Request(page, vars);
      await stepGroups.stepGroup_Selecting_Second_Enabled_Batch_Time_If_the_Condition_is_fail(page, vars);
      // [DISABLED] Scroll to the element Enabled Date into view
      // await page.locator("//option[@aria-disabled=\"false\"]").scrollIntoViewIfNeeded();
      // [DISABLED] Click on Enabled Date
      // await page.locator("//option[@aria-disabled=\"false\"]").click();
    }
    await page.locator("(//input[@type=\"file\"])[1]").setInputFiles(path.resolve(__dirname, 'test-data', "BidSuccesloans_popup_UI.xlsx,BidSuccesloans_popup_UI.xlsx"));
    vars["LoanNumberFromExcel"] = excelHelper.readCell(path.resolve(__dirname, 'test-data', "BidSuccesloans_popup_UI.xlsx,BidSuccesloans_popup_UI.xlsx"), "2", "1");
    await expect(page.locator("//span[text()[normalize-space() = \"Upload Bid\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Upload Bid\"]]").click();
    await page.locator("//div[@class=\"modal-header\"]/div/h5").waitFor({ state: 'visible' });
    await expect(page.locator("//div[@class=\"modal-header\"]/div/h5")).toContainText("Bid Upload Progress");
    await page.locator("//span[text()=\"Continue\"]/..").waitFor({ state: 'visible' });
    await expect(page.locator("//span[text()=\"Continue\"]/..")).toBeVisible();
    await expect(page.locator("(//td[@data-title=\"Status\"]//span)[position() >=1 and position() <=5]")).toContainText("Success");
    // [DISABLED] Verify that the element Geo Coding Status On Pop up displays text Warning and With Scrollable FALSE
    // await expect(page.locator("//div[text()=\" Geo Coding \"]/../..//span")).toContainText("Warning");
    vars["count"] = "1";
    vars["AllStatusCountPopup"] = String(await page.locator("//td[@data-title=\"Status\"]//span").count());
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["AllStatusCountPopup"]))) {
      await expect(page.locator("(//td[@data-title=\"Status\"]//span)[$|count|]")).toContainText("Success");
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    await page.locator("//span[text()=\"Continue\"]/..").click();
    vars["RowsCountTable"] = String(await page.locator("(//table)[1]//tbody//tr").count());
    vars["RowCountExcel"] = "2";
    while (parseFloat(String(vars["RowsCountTable"])) >= parseFloat(String("1"))) {
      vars["LoanNumberUI"] = await page.locator("(//td[@data-title=\"Corr. Loan#\"]//div)[$|RowsCountTable|]").textContent() || '';
      vars["LoanNumberExcel"] = excelHelper.readCell(path.resolve(__dirname, 'test-data', "BidSuccesloans_popup_UI.xlsx,BidSuccesloans_popup_UI.xlsx"), vars["RowCountExcel"], "1");
      expect(String(vars["LoanNumberUI"])).toBe(vars["LoanNumberExcel"]);
      vars["RowCountExcel"] = (parseFloat(String("1")) + parseFloat(String(vars["RowCountExcel"]))).toFixed(0);
      vars["RowsCountTable"] = (parseFloat(String(vars["RowsCountTable"])) - parseFloat(String("1"))).toFixed(0);
    }
    await expect(page.locator("(//td[@data-title=\"Loan Status\"]//div)")).toContainText(testData["Bid Valid File(Loan Status)"]);
    await expect(page.locator("(//td[@data-title=\"Errors\"]//div)")).toContainText(testData["Bid Valid File(Error Column)"]);
    await expect(page.locator("(//td[@data-title=\"Error Description\"]//div)")).toContainText(testData["Bid Valid File(Error Description)"]);
  });
});
