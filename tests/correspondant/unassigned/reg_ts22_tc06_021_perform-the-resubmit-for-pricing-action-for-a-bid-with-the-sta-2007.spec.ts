import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS22_TC06_02.1_Perform the resubmit for pricing action for a bid with the Standard and chase type, and verify the values in the resubmitted record, ensuring validation of table data, loan details,', async ({ page }) => {
    // Prerequisite: REG_TS22_TC06_02_Perform the resubmit for pricing action for a bid with the Standard and chase type,
    // TODO: Ensure prerequisite test passes first

    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    // [DISABLED] Verify that the element CCode Value(bid request details) displays text contains CCodeBeforeResubmit and With Scrollable FALSE
    // await expect(page.locator("//div[text()=\"CCode\"]/..//h5")).toContainText(vars["CCodeBeforeResubmit"]);
    // [DISABLED] Verify that the element Company Value(Bid Request Details) displays text contains CompanyBeforeResubmit and With Scrollable FALSE
    // await expect(page.locator("//div[text()=\"Company\"]/..//h5")).toContainText(vars["CompanyBeforeResubmit"]);
    // [DISABLED] Verify that the text RequestIDBeforeResubmit is not displayed in the element Request Id From Details and With Scrollable TRUE
    // await expect(page.locator("//div[text()=\"Request ID\"]/..//h5")).not.toContainText(vars["RequestIDBeforeResubmit"]);
    // [DISABLED] Verify that the element Bid Status From Details displays text contains Ready for Pricing and With Scrollable TRUE
    // await expect(page.locator("//div[text()=\"Status\"]/..//h5")).toContainText("Ready for Pricing");
    // [DISABLED] Verify that the element Bid Value parsed row displays text contains BidValueBeforeResubmit and With Scrollable TRUE
    // await expect(page.locator("//div[text()=\"Total Bid Value\"]/..//h5")).toContainText(vars["BidValueBeforeResubmit"]);
    // [DISABLED] Verify that the element Execution Type Parsed Row displays text contains ExecutionBeforeResubmit and With Scrollable TRUE
    // await expect(page.locator("//div[@aria-label=\"Execution Type Label\"]/..//h5")).toContainText(vars["ExecutionBeforeResubmit"]);
    // [DISABLED] Verify that the element Parsed Total Loans displays text contains ParsedTotalLoansBeforeSubmit and With Scrollable FALSE
    // await expect(page.locator("(//h5[@aria-label=\"Total Loan Rows\"]//span[contains(@aria-label,\"Total Loans\")])")).toContainText(vars["ParsedTotalLoansBeforeSubmit"]);
    // [DISABLED] Verify that the element Parsed Success Loans displays text contains ParsedSuccessLoansBeforeSubmit and With Scrollable FALSE
    // await expect(page.locator("(//h5[@aria-label=\"Total Loan Rows\"]//span[contains(@aria-label,\"Successful Loans\")])")).toContainText(vars["ParsedSuccessLoansBeforeSubmit"]);
    // [DISABLED] Verify that the element Parsed Errored loans displays text contains ParsedErroredLoansBeforeSubmit and With Scrollable FALSE
    // await expect(page.locator("(//h5[@aria-label=\"Total Loan Rows\"]//span[contains(@aria-label,\"Errored Loans\")])")).toContainText(vars["ParsedErroredLoansBeforeSubmit"]);
    // [DISABLED] Verify that the element Execution Type from Details (table1) displays text contains ExecutionTypeHeaderBeforeSubmitTable1 and With Scrollable TRUE
    // await expect(page.locator("(//div[text()=\" Execution Type \"]/..//h5)[1]")).toContainText(vars["ExecutionTypeHeaderBeforeSubmitTable1"]);
    // [DISABLED] Verify that the element Bid Value From Table Header1 displays text contains BidValueHeaderBeforeSubmitTable1 and With Scrollable FALSE
    // await expect(page.locator("//h5[@aria-labelledby=\"bidValueLabel\"]")).toContainText(vars["BidValueHeaderBeforeSubmitTable1"]);
    // [DISABLED] Verify that the element Total loans TableHeader 1 displays text contains TotalloansHeaderBeforeSubmitTable1 and With Scrollable FALSE
    // await expect(page.locator("(//h5[@aria-labelledby=\"totalLoanRowsLabel\"]//span[contains(@aria-label,\"Total Loans\")])[1]")).toContainText(vars["TotalloansHeaderBeforeSubmitTable1"]);
    // [DISABLED] Verify that the element Success Loans Header 1 displays text contains SuccessLoansHeaderBeforeSubmitTable1 and With Scrollable FALSE
    // await expect(page.locator("(//h5[@aria-labelledby=\"totalLoanRowsLabel\"]//span[contains(@aria-label,\"Successful Loans\")])[1]")).toContainText(vars["SuccessLoansHeaderBeforeSubmitTable1"]);
    // [DISABLED] Verify that the element Errored Loans Header1 displays text contains ErrorredLoansHeaderBeforeSubmitTable1 and With Scrollable TRUE
    // await expect(page.locator("(//h5[@aria-labelledby=\"totalLoanRowsLabel\"]//span[contains(@aria-label,\"Errored Loans\")])[1]")).toContainText(vars["ErrorredLoansHeaderBeforeSubmitTable1"]);
    // [DISABLED] Verifying the table data in bid request details from tdp
    // await stepGroups.stepGroup_Verifying_the_table_data_in_bid_request_details_from_tdp(page, vars);
    // [DISABLED] Click on First loan Number In table
    // await page.locator("(//tbody//tr//td)[1]//button[1]").click();
    // [DISABLED] Wait until the element Spinner is not visible
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Verify that the text RequestIdPopupBeforeSubmitTable1 is not displayed in the element Bid Request ID On Loan Details Popup and With Scrollable TRUE
    // await expect(page.locator("(//h5[@aria-labelledby=\"bidRequestIdLabel\"])[1]")).not.toContainText(vars["RequestIdPopupBeforeSubmitTable1"]);
    // [DISABLED] Verify that the element Bid Loan Number Loan Details Pop up displays text contains LoanNumberPopUpBeforeSubmitTable1 and With Scrollable FALSE
    // await expect(page.locator("(//h5[@aria-labelledby=\"bidRequestIdLabel\"])[2]")).toContainText(vars["LoanNumberPopUpBeforeSubmitTable1"]);
    // [DISABLED] Verify that the element Errors Check On Laon Details Popup displays text contains ErrorsCheckPopupBeforeSubmitTable1 and With Scrollable FALSE
    // await expect(page.locator("//div[@class=\"flex-grow-1 d-flex gap-3\"]//div/div[@id=\"errorsCheckLabel\"]/..//h5[@aria-labelledby=\"errorsCheckLabel\"]")).toContainText(vars["ErrorsCheckPopupBeforeSubmitTable1"]);
    // [DISABLED] Store the count of elements identified by locator ChaseFields Count Popup (Loan Details) into a variable ChaseFieldCountPopup
    // vars["ChaseFieldCountPopup"] = String(await page.locator("//div[@class=\"border-bottom p-2\"]").count());
    // [DISABLED] Store 1 in count
    // vars["count"] = "1";
    while (true) /* Verify if count <= ChaseFieldCountPopup */ {
      // [DISABLED] Click on Bid Request ID On Loan Details Popup
      // await page.locator("(//h5[@aria-labelledby=\"bidRequestIdLabel\"])[1]").click();
      // [DISABLED] Store text from the element Individual Chase Field Name Popup into a variable ChaseFieldPopupAfterSubmit
      // vars["ChaseFieldPopupAfterSubmit"] = await page.locator("(//div[@class=\"border-bottom p-2\"])[$|count|]").textContent() || '';
      // [DISABLED] Store text from the element Individual Chase Value popup2 into a variable ChaseValuePopupAfterSubmit
      // vars["ChaseValuePopupAfterSubmit"] = await page.locator("(//div[@class=\"border-bottom p-2\" and contains(text(),\"$|ChaseFieldPopupAfterSubmit|\")]/following-sibling::div)[1]").textContent() || '';
      for (let i = 0; i < 1; i++) /* Loop over data set in Chase Field Names and Values On Loan D */ {
        // [DISABLED] Verify that the element Individual Chase Field Name Popup displays text contains ChaseFieldNameBeforeSubmit and With Scrollable TRUE
        // await expect(page.locator("(//div[@class=\"border-bottom p-2\"])[$|count|]")).toContainText(testData["ChaseFieldNameBeforeSubmit"]);
        if (true) /* Verify if ChaseValuePopupAfterSubmit == Key_blank */ {
          // [DISABLED] Verify if ChaseValueBeforeSubmit == Null
          // expect(String(testData["ChaseValueBeforeSubmit"])).toBe("Null");
        } else {
          // [DISABLED] Verify that the element Individual Chase Value popup2 displays text contains ChaseValueBeforeSubmit and With Scrollable TRUE
          // await expect(page.locator("(//div[@class=\"border-bottom p-2\" and contains(text(),\"$|ChaseFieldPopupAfterSubmit|\")]/following-sibling::div)[1]")).toContainText(testData["ChaseValueBeforeSubmit"]);
        }
      }
      // [DISABLED] Perform addition on 1 and count and store the result inside a count considering 0 decimal places
      // vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    // [DISABLED] Click on Close Button Loan Details Popup
    // await page.locator("//button[@aria-label=\"Close\"]").click();
    await page.locator("(//td[@data-title=\"Program\"])[last()]").scrollIntoViewIfNeeded();
    await expect(page.locator("(//div[text()=\" Execution Type \"]/..//h5)[2]")).toContainText(vars["ExecutionTypeHeaderBeforeSubmitTable2"]);
    await expect(page.locator("//h5[@aria-labelledby=\"bidValueLabel\"]")).toContainText(vars["BidValueHeaderBeforeSubmitTable2"]);
    await expect(page.locator("(//h5[@aria-labelledby=\"totalLoanRowsLabel\"]//span[contains(@aria-label,\"Total Loans\")])[1]")).toContainText(vars["TotalloansHeaderBeforeSubmitTable2"]);
    await expect(page.locator("(//h5[@aria-labelledby=\"totalLoanRowsLabel\"]//span[contains(@aria-label,\"Successful Loans\")])[1]")).toContainText(vars["SuccessLoansHeaderBeforeSubmitTable2"]);
    await expect(page.locator("(//h5[@aria-labelledby=\"totalLoanRowsLabel\"]//span[contains(@aria-label,\"Errored Loans\")])[1]")).toContainText(vars["ErrorredLoansHeaderBeforeSubmitTable2"]);
    await stepGroups.stepGroup_Verifying_the_table_data_in_bid_request_details_from_tdp(page, vars);
    await page.locator("(//tbody)[2]//tr[1]//td[1]//button[1]").click();
    await stepGroups.stepGroup_Verifying_Second_Table_loan_details_On_popupBid_Request_Deta(page, vars);
    await expect(page.locator("//div[@id=\"page-footer\"]//span[@class=\"d-block\"]")).not.toContainText(vars["FooterSubmssionBeforeSubmit"]);
    await expect(page.locator("//div[@id=\"page-footer\"]//span[contains(text(),\"Queued For\")]")).not.toContainText(vars["FooterQueuedBeforeSubmit"]);
    await stepGroups.stepGroup_Verify_Footer_Submission_and_Queued_Date_For_Today_in_Bid_Re(page, vars);
  });
});
