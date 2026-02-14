import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS22_TC05_02_Perform the resubmit for pricing action for a bid with the Standard execution type, and verify the values in the resubmitted record(Target: Submit on next business day, upload expired', async ({ page }) => {
    // Prerequisite: REG_TS22_TC05_01.1_Perform the resubmit for pricing action for a bid with the Standard execution typ
    // TODO: Ensure prerequisite test passes first

    await expect(page.locator("//div[text()=\"CCode\"]/..//h5")).toContainText(vars["CCodeBeforeResubmit"]);
    await expect(page.locator("//div[text()=\"Company\"]/..//h5")).toContainText(vars["CompanyBeforeResubmit"]);
    await expect(page.locator("//div[text()=\"Request ID\"]/..//h5")).not.toContainText(vars["RequestIDBeforeResubmit"]);
    await expect(page.locator("//div[text()=\"Status\"]/..//h5")).toContainText("Ready for Pricing");
    await expect(page.locator("//div[text()=\"Total Bid Value\"]/..//h5")).toContainText(vars["BidValueBeforeResubmit"]);
    await expect(page.locator("//div[@aria-label=\"Execution Type Label\"]/..//h5")).toContainText(vars["ExecutionBeforeResubmit"]);
    await expect(page.locator("(//h5[@aria-label=\"Total Loan Rows\"]//span[contains(@aria-label,\"Total Loans\")])")).toContainText(vars["ParsedTotalLoansBeforeSubmit"]);
    await expect(page.locator("(//h5[@aria-label=\"Total Loan Rows\"]//span[contains(@aria-label,\"Successful Loans\")])")).toContainText(vars["ParsedSuccessLoansBeforeSubmit"]);
    await expect(page.locator("(//h5[@aria-label=\"Total Loan Rows\"]//span[contains(@aria-label,\"Errored Loans\")])")).toContainText(vars["ParsedErroredLoansBeforeSubmit"]);
    await expect(page.locator("(//div[text()=\" Execution Type \"]/..//h5)[1]")).toContainText(vars["ExecutionTypeHeaderBeforeSubmit"]);
    await expect(page.locator("//h5[@aria-labelledby=\"bidValueLabel\"]")).toContainText(vars["BidValueHeaderBeforeSubmit"]);
    await expect(page.locator("(//h5[@aria-labelledby=\"totalLoanRowsLabel\"]//span[contains(@aria-label,\"Total Loans\")])[1]")).toContainText(vars["TotalloansHeaderBeforeSubmit"]);
    await expect(page.locator("(//h5[@aria-labelledby=\"totalLoanRowsLabel\"]//span[contains(@aria-label,\"Successful Loans\")])[1]")).toContainText(vars["SuccessLoansHeaderBeforeSubmit"]);
    await expect(page.locator("(//h5[@aria-labelledby=\"totalLoanRowsLabel\"]//span[contains(@aria-label,\"Errored Loans\")])[1]")).toContainText(vars["ErrorredLoansHeaderBeforeSubmit"]);
    await stepGroups.stepGroup_Verifying_the_table_data_in_bid_request_details_from_tdp(page, vars);
  });
});
