import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';
import * as excelHelper from '../../../src/helpers/excel-helpers';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS06_TC01_If a required loan field is empty or invalid in the bid file, show a LoanfieldDataValidation warning and mark the loan with error: \\\"Loan value cannot be blank or zero for #field.\\\"', async ({ page }) => {
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
      await stepGroups.stepGroup_Adding_a_batch_In_bulk_batch_screen(page, vars);
      await stepGroups.stepGroup_Navigating_to_Upload_New_Bid_Request(page, vars);
      await stepGroups.stepGroup_Uploading_Bid_Request(page, vars);
      await stepGroups.stepGroup_Selecting_Second_Enabled_Batch_Time_If_the_Condition_is_fail(page, vars);
      // [DISABLED] Scroll to the element Enabled Time into view
      // await page.locator("//option[@aria-disabled=\"false\"]").scrollIntoViewIfNeeded();
      // [DISABLED] Click on Enabled Date
      // await page.locator("//option[@aria-disabled=\"false\"]").click();
    }
    await page.locator("(//input[@type=\"file\"])[1]").setInputFiles(path.resolve(__dirname, 'test-data', "Bid_loanfielddatavalidation.xlsx,Bid_loanfielddatavalidation.xlsx"));
    vars["LoanNumberFromExcel"] = excelHelper.readCell(path.resolve(__dirname, 'test-data', "Bid_loanfielddatavalidation.xlsx,Bid_loanfielddatavalidation.xlsx"), "2", "1");
    await expect(page.locator("//span[text()[normalize-space() = \"Upload Bid\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Upload Bid\"]]").click();
    await page.locator("//div[@class=\"modal-header\"]/div/h5").waitFor({ state: 'visible' });
    await expect(page.locator("//div[@class=\"modal-header\"]/div/h5")).toContainText("Bid Upload Progress");
    await page.locator("//span[text()=\"Continue\"]/..").waitFor({ state: 'visible' });
    await expect(page.locator("//span[text()=\"Continue\"]/..")).toBeVisible();
    await expect(page.locator("(//td[@data-title=\"Status\"]//span)[position() >=1 and position() <=5]")).toContainText("Success");
    vars["RowsCountBelowLoanField"] = String(await page.locator("(//td[@data-title=\"Status\"])[position() >=7 and position()<=last()]").count());
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["RowsCountBelowLoanField"]))) {
      vars["StatusBelowLoanField"] = await page.locator("((//td[@data-title=\"Status\"])[position() >=7 and position()<=last()])[$|count|]").textContent() || '';
      expect(String("Success , Warning")).toBe(vars["StatusBelowLoanField"]);
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    await page.locator("//span[text()=\"Continue\"]/..").click();
    await expect(page.locator("(//td[@data-title=\"Errors\"]//div)[last()]")).toContainText(testData["Loan Field Validation(Error)"]);
    await expect(page.locator("(//td[@data-title=\"Error Description\"]//div)[last()]")).toContainText(testData["Loan Field Validation(Error description)"]);
    await expect(page.locator("(//td[@data-title=\"Loan Status\"]//div)[last()]")).toContainText(testData["Loan Field Validation(Status)"]);
    await expect(page.locator("(//td[@data-title=\"Corr. Loan#\"]//button[1])[last()]")).toContainText(vars["LoanNumberFromExcel"]);
    await expect(page.locator("//button[text()=\"PQ\"]")).toBeVisible();
    await expect(page.locator("//button[text()=\"PS\"]")).toBeVisible();
  });
});
