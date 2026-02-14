import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS22_TC06_02_Perform the resubmit for pricing action for a bid with the Standard and chase type, and verify the values in the resubmitted record, ensuring validation of table data, loan details, s', async ({ page }) => {
    // Prerequisite: REG_TS22_TC06_01.1_Perform the resubmit for pricing action for a bid with the Standard and chase typ
    // TODO: Ensure prerequisite test passes first

    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await expect(page.locator("//div[text()=\"CCode\"]/..//h5")).toContainText(vars["CCodeBeforeResubmit"]);
    await expect(page.locator("//div[text()=\"Company\"]/..//h5")).toContainText(vars["CompanyBeforeResubmit"]);
    await expect(page.locator("//div[text()=\"Request ID\"]/..//h5")).not.toContainText(vars["RequestIDBeforeResubmit"]);
    await expect(page.locator("//div[text()=\"Status\"]/..//h5")).toContainText("Ready for Pricing");
    await expect(page.locator("//div[text()=\"Total Bid Value\"]/..//h5")).toContainText(vars["BidValueBeforeResubmit"]);
    await expect(page.locator("//div[@aria-label=\"Execution Type Label\"]/..//h5")).toContainText(vars["ExecutionBeforeResubmit"]);
    await expect(page.locator("(//h5[@aria-label=\"Total Loan Rows\"]//span[contains(@aria-label,\"Total Loans\")])")).toContainText(vars["ParsedTotalLoansBeforeSubmit"]);
    await expect(page.locator("(//h5[@aria-label=\"Total Loan Rows\"]//span[contains(@aria-label,\"Successful Loans\")])")).toContainText(vars["ParsedSuccessLoansBeforeSubmit"]);
    await expect(page.locator("(//h5[@aria-label=\"Total Loan Rows\"]//span[contains(@aria-label,\"Errored Loans\")])")).toContainText(vars["ParsedErroredLoansBeforeSubmit"]);
    await expect(page.locator("(//div[text()=\" Execution Type \"]/..//h5)[1]")).toContainText(vars["ExecutionTypeHeaderBeforeSubmitTable1"]);
    await expect(page.locator("//h5[@aria-labelledby=\"bidValueLabel\"]")).toContainText(vars["BidValueHeaderBeforeSubmitTable1"]);
    await expect(page.locator("(//h5[@aria-labelledby=\"totalLoanRowsLabel\"]//span[contains(@aria-label,\"Total Loans\")])[1]")).toContainText(vars["TotalloansHeaderBeforeSubmitTable1"]);
    await expect(page.locator("(//h5[@aria-labelledby=\"totalLoanRowsLabel\"]//span[contains(@aria-label,\"Successful Loans\")])[1]")).toContainText(vars["SuccessLoansHeaderBeforeSubmitTable1"]);
    await expect(page.locator("(//h5[@aria-labelledby=\"totalLoanRowsLabel\"]//span[contains(@aria-label,\"Errored Loans\")])[1]")).toContainText(vars["ErrorredLoansHeaderBeforeSubmitTable1"]);
    await stepGroups.stepGroup_Verifying_the_table_data_in_bid_request_details_from_tdp(page, vars);
    await page.locator("(//tbody//tr//td)[1]//button[1]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("(//h5[@aria-labelledby=\"bidRequestIdLabel\"])[1]")).not.toContainText(vars["RequestIdPopupBeforeSubmitTable1"]);
    await expect(page.locator("(//h5[@aria-labelledby=\"bidRequestIdLabel\"])[2]")).toContainText(vars["LoanNumberPopUpBeforeSubmitTable1"]);
    await expect(page.locator("//div[@class=\"flex-grow-1 d-flex gap-3\"]//div/div[@id=\"errorsCheckLabel\"]/..//h5[@aria-labelledby=\"errorsCheckLabel\"]")).toContainText(vars["ErrorsCheckPopupBeforeSubmitTable1"]);
    vars["ChaseFieldCountPopup"] = String(await page.locator("//div[@class=\"border-bottom p-2\"]").count());
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["ChaseFieldCountPopup"]))) {
      await page.locator("(//h5[@aria-labelledby=\"bidRequestIdLabel\"])[1]").click();
      vars["ChaseFieldPopupAfterSubmit"] = await page.locator("(//div[@class=\"border-bottom p-2\"])[$|count|]").textContent() || '';
      vars["ChaseValuePopupAfterSubmit"] = await page.locator("(//div[@class=\"border-bottom p-2\" and contains(text(),\"$|ChaseFieldPopupAfterSubmit|\")]/following-sibling::div)[1]").textContent() || '';
      for (let dataIdx = parseInt(vars["count"]); dataIdx <= parseInt(vars["count"]); dataIdx++) {
        await expect(page.locator("(//div[@class=\"border-bottom p-2\"])[$|count|]")).toContainText(testData["ChaseFieldNameBeforeSubmit"]);
        if (String(vars["ChaseValuePopupAfterSubmit"]) === String("Key_blank")) {
          expect(String(testData["ChaseValueBeforeSubmit"])).toBe("Null");
        } else {
          await expect(page.locator("(//div[@class=\"border-bottom p-2\" and contains(text(),\"$|ChaseFieldPopupAfterSubmit|\")]/following-sibling::div)[1]")).toContainText(testData["ChaseValueBeforeSubmit"]);
        }
      }
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    await page.locator("//button[@aria-label=\"Close\"]").click();
    // [DISABLED] Verify that the element Execution Type from details(table2) displays text contains ExecutionTypeHeaderBeforeSubmitTable2 and With Scrollable TRUE
    // await expect(page.locator("(//div[text()=\" Execution Type \"]/..//h5)[2]")).toContainText(vars["ExecutionTypeHeaderBeforeSubmitTable2"]);
    // [DISABLED] Verify that the element Bid Value From Table Header1 displays text contains BidValueHeaderBeforeSubmitTable2 and With Scrollable FALSE
    // await expect(page.locator("//h5[@aria-labelledby=\"bidValueLabel\"]")).toContainText(vars["BidValueHeaderBeforeSubmitTable2"]);
    // [DISABLED] Verify that the element Total loans TableHeader 1 displays text contains TotalloansHeaderBeforeSubmitTable2 and With Scrollable FALSE
    // await expect(page.locator("(//h5[@aria-labelledby=\"totalLoanRowsLabel\"]//span[contains(@aria-label,\"Total Loans\")])[1]")).toContainText(vars["TotalloansHeaderBeforeSubmitTable2"]);
    // [DISABLED] Verify that the element Success Loans Header 1 displays text contains SuccessLoansHeaderBeforeSubmitTable2 and With Scrollable FALSE
    // await expect(page.locator("(//h5[@aria-labelledby=\"totalLoanRowsLabel\"]//span[contains(@aria-label,\"Successful Loans\")])[1]")).toContainText(vars["SuccessLoansHeaderBeforeSubmitTable2"]);
    // [DISABLED] Verify that the element Errored Loans Header1 displays text contains ErrorredLoansHeaderBeforeSubmitTable2 and With Scrollable TRUE
    // await expect(page.locator("(//h5[@aria-labelledby=\"totalLoanRowsLabel\"]//span[contains(@aria-label,\"Errored Loans\")])[1]")).toContainText(vars["ErrorredLoansHeaderBeforeSubmitTable2"]);
    // [DISABLED] Verifying the table data in bid request details from tdp
    // await stepGroups.stepGroup_Verifying_the_table_data_in_bid_request_details_from_tdp(page, vars);
    // [DISABLED] Click on First Loan Number Table 2
    // await page.locator("(//tbody)[2]//tr[1]//td[1]//button[1]").click();
    // [DISABLED] Verifying Second Table loan details On popup(Bid Request Details)
    // await stepGroups.stepGroup_Verifying_Second_Table_loan_details_On_popupBid_Request_Deta(page, vars);
    // [DISABLED] Verify that the text FooterSubmssionBeforeSubmit is not displayed in the element Footer Submission Date and With Scrollable FALSE
    // await expect(page.locator("//div[@id=\"page-footer\"]//span[@class=\"d-block\"]")).not.toContainText(vars["FooterSubmssionBeforeSubmit"]);
    // [DISABLED] Verify that the text FooterQueuedBeforeSubmit is not displayed in the element Footer Queued For Date and With Scrollable FALSE
    // await expect(page.locator("//div[@id=\"page-footer\"]//span[contains(text(),\"Queued For\")]")).not.toContainText(vars["FooterQueuedBeforeSubmit"]);
    // [DISABLED] Verify Footer Submission and Queued Date For Today in Bid Request details
    // await stepGroups.stepGroup_Verify_Footer_Submission_and_Queued_Date_For_Today_in_Bid_Re(page, vars);
  });
});
