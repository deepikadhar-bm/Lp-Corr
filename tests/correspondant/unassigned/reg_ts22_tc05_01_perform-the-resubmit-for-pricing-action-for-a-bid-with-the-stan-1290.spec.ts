import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS22_TC05_01_Perform the resubmit for pricing action for a bid with the Standard execution type, and verify the values in the resubmitted record(Target: Submit on next business day, upload expired', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Deleting_Early_Config_Report_If_Present(page, vars);
    await stepGroups.stepGroup_Navigating_to_Bulk_Batch_Timing(page, vars);
    vars["BufferTime"] = await page.locator("//input[@id=\"pricingReturnTimeBuffer\"]").inputValue() || '';
    await page.locator("//a[@href=\"#/bid-requests\"]").click();
    await page.waitForLoadState('networkidle');
    await page.locator("//span[text()[normalize-space() = \"Filter\"]]").click();
    await page.locator("(//div[contains(@class, \"form-control\")]//button)[1]").click();
    await page.locator("//input[@type=\"checkbox\" and contains(@aria-label,\"@|Company Name|\")]").check();
    await page.locator("//button[contains(normalize-space(),\"Apply Selected 1\")]").click();
    vars["StatusToBeSelected"] = "Upload Expired";
    await page.locator("//div[text()[normalize-space() = \"Select Bid Request Status\"]]").click();
    await page.locator("//input[@type=\"checkbox\" and @aria-label=\"Select $|StatusToBeSelected|\"]").check();
    await expect(page.locator("//button[contains(normalize-space(),\"Apply Selected 1\")]")).toBeVisible();
    await page.locator("(//button[contains(normalize-space(),\"Apply Selected 1\")])[2]").click();
    await page.locator("//div[contains(@class, \"justify-content-end\")]//button[text()=\"Apply Filters\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("(//td[@data-title=\"Status\"])[1]")).toContainText(vars["StatusToBeSelected"]);
    vars["ExecutionType"] = "Standard";
    await stepGroups.stepGroup_Traversing_to_the_next_screens_until_the_bid_is_visible(page, vars);
    await page.locator("//div[   contains(@aria-label, 'Loans total:') and   number(substring-before(substring-after(@aria-label, 'Loans total: '), ',')) < 10 ]/../..//td[@data-title=\"Execution Type\"]//div[text()=\" $|ExecutionType| \"]/../..//td[@data-title=\"Status\"]//span[contains(text(),\"$|StatusToBeSelected|\")]/../../..//td[@data-title=\"Bid Req. ID\"]").click();
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
    vars["ExecutionTypeHeaderBeforeSubmit"] = await page.locator("(//div[text()=\" Execution Type \"]/..//h5)[1]").textContent() || '';
    vars["BidValueHeaderBeforeSubmit"] = await page.locator("//h5[@aria-labelledby=\"bidValueLabel\"]").textContent() || '';
    vars["TotalloansHeaderBeforeSubmit"] = await page.locator("(//h5[@aria-labelledby=\"totalLoanRowsLabel\"]//span[contains(@aria-label,\"Total Loans\")])[1]").textContent() || '';
    vars["SuccessLoansHeaderBeforeSubmit"] = await page.locator("(//h5[@aria-labelledby=\"totalLoanRowsLabel\"]//span[contains(@aria-label,\"Successful Loans\")])[1]").textContent() || '';
    vars["ErrorredLoansHeaderBeforeSubmit"] = await page.locator("(//h5[@aria-labelledby=\"totalLoanRowsLabel\"]//span[contains(@aria-label,\"Errored Loans\")])[1]").textContent() || '';
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
  });
});
