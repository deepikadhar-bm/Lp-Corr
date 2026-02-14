import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS22_TC06_01_Perform the resubmit for pricing action for a bid with the Standard and chase type, and verify the values in the resubmitted record, ensuring validation of table data, loan details, s', async ({ page }) => {
    // Prerequisite: REG_TS25_TC01_Perform submit for pricing action, and then verify the status should be updated to pri
    // TODO: Ensure prerequisite test passes first

    await stepGroups.stepGroup_Navigating_to_Bulk_Batch_Timing(page, vars);
    vars["BufferTime"] = await page.locator("//input[@id=\"pricingReturnTimeBuffer\"]").inputValue() || '';
    await page.locator("//a[@href=\"#/bid-requests\"]").click();
    await page.waitForLoadState('networkidle');
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["RequestIDDetails"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["StatusToBeSelected"] = "Price Offered";
    await expect(page.locator("(//td[@data-title=\"Status\"])[1]")).toContainText(vars["StatusToBeSelected"]);
    await page.locator("//td[@data-title=\"Bid Req. ID\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["CCodeBeforeResubmit"] = await page.locator("//div[text()=\"CCode\"]/..//h5").textContent() || '';
    vars["CompanyBeforeResubmit"] = await page.locator("//div[text()=\"Company\"]/..//h5").textContent() || '';
    vars["RequestIDBeforeResubmit"] = await page.locator("//div[text()=\"Request ID\"]/..//h5").textContent() || '';
    vars["RequestIDBeforeResubmit"] = String(vars["RequestIDBeforeResubmit"]).trim();
    vars["StatusBeforeResubmit"] = await page.locator("//div[text()=\"Status\"]/..//h5").textContent() || '';
    vars["BidValueBeforeResubmit"] = await page.locator("//div[text()=\"Total Bid Value\"]/..//h5").textContent() || '';
    vars["ExecutionBeforeResubmit"] = await page.locator("//div[@aria-label=\"Execution Type Label\"]/..//h5").textContent() || '';
    vars["ParsedTotalLoansBeforeSubmit"] = await page.locator("(//h5[@aria-label=\"Total Loan Rows\"]//span[contains(@aria-label,\"Total Loans\")])").textContent() || '';
    vars["ParsedSuccessLoansBeforeSubmit"] = await page.locator("(//h5[@aria-label=\"Total Loan Rows\"]//span[contains(@aria-label,\"Successful Loans\")])").textContent() || '';
    vars["ParsedErroredLoansBeforeSubmit"] = await page.locator("(//h5[@aria-label=\"Total Loan Rows\"]//span[contains(@aria-label,\"Errored Loans\")])").textContent() || '';
    vars["ExecutionTypeHeaderBeforeSubmitTable1"] = await page.locator("(//div[text()=\" Execution Type \"]/..//h5)[1]").textContent() || '';
    vars["BidValueHeaderBeforeSubmitTable1"] = await page.locator("//h5[@aria-labelledby=\"bidValueLabel\"]").textContent() || '';
    vars["TotalloansHeaderBeforeSubmitTable1"] = await page.locator("(//h5[@aria-labelledby=\"totalLoanRowsLabel\"]//span[contains(@aria-label,\"Total Loans\")])[1]").textContent() || '';
    vars["SuccessLoansHeaderBeforeSubmitTable1"] = await page.locator("(//h5[@aria-labelledby=\"totalLoanRowsLabel\"]//span[contains(@aria-label,\"Successful Loans\")])[1]").textContent() || '';
    vars["ErrorredLoansHeaderBeforeSubmitTable1"] = await page.locator("(//h5[@aria-labelledby=\"totalLoanRowsLabel\"]//span[contains(@aria-label,\"Errored Loans\")])[1]").textContent() || '';
    vars["TotalRowsCount"] = String(await page.locator("(//table)[1]//tbody//tr").count());
    vars["RowsCount"] = "1";
    while (parseFloat(String(vars["RowsCount"])) <= parseFloat(String(vars["TotalRowsCount"]))) {
      vars["ColumnCount"] = "1";
      while (parseFloat(String(vars["ColumnCount"])) <= parseFloat(String("7"))) {
        await page.locator("//div[@aria-label=\"Request ID Label\"]/..//h5").click();
        vars["CellData"] = await page.locator("(//tr[$|RowsCount|]//td)[$|ColumnCount|]").textContent() || '';
        for (let dataIdx = parseInt(vars["RowsCount"]); dataIdx <= parseInt(vars["RowsCount"]); dataIdx++) {
          if (String(vars["ColumnCount"]) === String("1")) {
            // Write to test data profile: "Loan Number" = vars["CellData"]
            // TODO: Test data profile writes need custom implementation
          } else if (String(vars["ColumnCount"]) === String("2")) {
            // Write to test data profile: "Last Name" = vars["CellData"]
            // TODO: Test data profile writes need custom implementation
          } else if (String(vars["ColumnCount"]) === String("3")) {
            // Write to test data profile: "LoanAmount" = vars["CellData"]
            // TODO: Test data profile writes need custom implementation
          } else if (String(vars["ColumnCount"]) === String("4")) {
            // Write to test data profile: "Program" = vars["CellData"]
            // TODO: Test data profile writes need custom implementation
          } else if (String(vars["ColumnCount"]) === String("5")) {
            // Write to test data profile: "Loan Status" = vars["CellData"]
            // TODO: Test data profile writes need custom implementation
          } else if (String(vars["ColumnCount"]) === String("6")) {
            if (String(vars["CellData"]).includes(String("+"))) {
              await page.locator("//div[@id=\"page-footer\"]//span[contains(text(),\"Queued For\")]").click();
              await page.locator("(//tr[$|RowsCount|]//td)[$|ColumnCount|]").hover();
              vars["CellDataPopup"] = await page.locator("//div[@class=\"tooltip-inner\"]").textContent() || '';
              vars["CellData"] = String(vars["CellDataPopup"]) + "," + String(vars["CellData"]);
            }
            // Write to test data profile: "Errors" = vars["CellData"]
            // TODO: Test data profile writes need custom implementation
          } else {
            // Write to test data profile: "Error Description" = vars["CellData"]
            // TODO: Test data profile writes need custom implementation
          }
          if (true) /* Element Individual PQ Button is enabled */ {
            // Write to test data profile: "PQ Status" = "PQ Enabled"
            // TODO: Test data profile writes need custom implementation
          } else {
            // Write to test data profile: "PQ Status" = "PQ Disabled"
            // TODO: Test data profile writes need custom implementation
          }
          if (true) /* Element Individual PS Button is enabled */ {
            // Write to test data profile: "PS Status" = "PS Enabled"
            // TODO: Test data profile writes need custom implementation
          } else {
            // Write to test data profile: "PS Status" = "PS Disabled"
            // TODO: Test data profile writes need custom implementation
          }
          vars["ColumnCount"] = (parseFloat(String("1")) + parseFloat(String(vars["ColumnCount"]))).toFixed(0);
        }
      }
      vars["RowsCount"] = (parseFloat(String("1")) + parseFloat(String(vars["RowsCount"]))).toFixed(0);
    }
    await page.locator("(//tbody//tr//td)[1]//button[1]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["RequestIdPopupBeforeSubmitTable1"] = await page.locator("(//h5[@aria-labelledby=\"bidRequestIdLabel\"])[1]").textContent() || '';
    vars["LoanNumberPopUpBeforeSubmitTable1"] = await page.locator("(//h5[@aria-labelledby=\"bidRequestIdLabel\"])[2]").textContent() || '';
    vars["ErrorsCheckPopupBeforeSubmitTable1"] = await page.locator("//div[@class=\"flex-grow-1 d-flex gap-3\"]//div/div[@id=\"errorsCheckLabel\"]/..//h5[@aria-labelledby=\"errorsCheckLabel\"]").textContent() || '';
    vars["ChaseFieldCountPopup"] = String(await page.locator("//div[@class=\"border-bottom p-2\"]").count());
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["ChaseFieldCountPopup"]))) {
      await page.locator("(//h5[@aria-labelledby=\"bidRequestIdLabel\"])[1]").click();
      vars["ChaseFieldNameBeforeSubmit"] = await page.locator("(//div[@class=\"border-bottom p-2\"])[$|count|]").textContent() || '';
      vars["ChaseValuePopupBeforeSubmit"] = await page.locator("(//div[@class=\"border-bottom p-2\" and contains(text(),\"$|ChaseFieldNameBeforeSubmit|\")]/following-sibling::div)[1]").textContent() || '';
      if (String(vars["ChaseValuePopupBeforeSubmit"]) === String("Key_blank")) {
        vars["ChaseValuePopupBeforeSubmit"] = "Null";
      }
      for (let dataIdx = parseInt(vars["count"]); dataIdx <= parseInt(vars["count"]); dataIdx++) {
        // Write to test data profile: "ChaseFieldNameBeforeSubmit" = vars["ChaseFieldNameBeforeSubmit"]
        // TODO: Test data profile writes need custom implementation
        // Write to test data profile: "ChaseValueBeforeSubmit" = vars["ChaseValuePopupBeforeSubmit"]
        // TODO: Test data profile writes need custom implementation
      }
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
  });
});
