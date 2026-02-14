import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS04_TC01_Verify the Total loans section, It should display the list of all the loans present in Price offered module', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    vars["BidReqId"] = testData["RequestIDFromPRE_PR_1-1"];
    // [DISABLED] Store RequestIDFromPRE_PR_1-1 in BidReqIdPriceOffered
    // vars["BidReqIdPriceOffered"] = testData["RequestIDFromPRE_PR_1-1"];
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqId"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[contains(text(),\"$|BidReqId|\")]").click();
    await page.locator("//div[@id=\"price-offered-list-tabs\"]/div//span[text()=\"All Loans\"]").waitFor({ state: 'visible' });
    await page.locator("//div[@aria-label=\"Sort by Last Name\"]").click();
    await page.locator("//div[contains(text(),\"Last Name\")]//following::span[contains(@class,\"fas small px-1 fa-sort-down\")]").waitFor({ state: 'visible' });
    vars["TotalLoans"] = String(await page.locator("//td[@data-title=\"Corr. Loan#\"]").count());
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["TotalLoans"]))) {
      await page.locator("//div[text()=\"Bid Req. ID\"]").click();
      vars["CorrLoanNumAllLoans"] = await page.locator("(//tbody//tr[$|count|]//td[@data-title=\"Corr. Loan#\"]//button)[1]").textContent() || '';
      vars["LastNameAllLoans"] = await page.locator("//tbody//tr[$|count|]//td[@data-title=\"Last Name\"]").textContent() || '';
      vars["LoanAmountAllLoans"] = await page.locator("//tbody//tr[$|count|]//td[@data-title=\"Loan Amount\"]").textContent() || '';
      vars["InterestRateAllLoans"] = await page.locator("//tbody//tr[$|count|]//td[@data-title=\"Int. Rate\"]").textContent() || '';
      vars["ReferenceSecurityAllLoans"] = await page.locator("//tbody//tr[$|count|]//td[@data-title=\"Ref Sec Prod.\"]").textContent() || '';
      vars["ReferenceSecurityPriceAllLoans"] = await page.locator("//tbody//tr[$|count|]//td[@data-title=\"Ref Sec Price\"]").textContent() || '';
      vars["GrossPriceAllLoans"] = await page.locator("//tbody//tr[$|count|]//td[@data-title=\"Gross Price\"]").textContent() || '';
      vars["HedgeRatioAllLoans"] = await page.locator("//tbody//tr[$|count|]//td[@data-title=\"Hedge Ratio\"]").textContent() || '';
      vars["MarketAdjustmentAllLoans"] = await page.locator("//tbody//tr[$|count|]//td[@data-title=\"Mark Adj\"]").textContent() || '';
      vars["CurrentGrossPriceAllLoans"] = await page.locator("//tbody//tr[$|count|]//td[@data-title=\"Curr Gross\"]").textContent() || '';
      for (let dataIdx = parseInt(vars["count"]); dataIdx <= parseInt(vars["count"]); dataIdx++) {
        // Write to test data profile: "Corr Loan Num" = vars["CorrLoanNumAllLoans"]
        // TODO: Test data profile writes need custom implementation
        // Write to test data profile: "Last Name" = vars["LastNameAllLoans"]
        // TODO: Test data profile writes need custom implementation
        // Write to test data profile: "Loan Amount" = vars["LoanAmountAllLoans"]
        // TODO: Test data profile writes need custom implementation
        // Write to test data profile: "Interest Rate" = vars["InterestRateAllLoans"]
        // TODO: Test data profile writes need custom implementation
        // Write to test data profile: "Ref Sec Prod" = vars["ReferenceSecurityAllLoans"]
        // TODO: Test data profile writes need custom implementation
        // Write to test data profile: "Ref Sec Price" = vars["ReferenceSecurityPriceAllLoans"]
        // TODO: Test data profile writes need custom implementation
        // Write to test data profile: "Gross Price" = vars["GrossPriceAllLoans"]
        // TODO: Test data profile writes need custom implementation
        // Write to test data profile: "Hedge Ratio" = vars["HedgeRatioAllLoans"]
        // TODO: Test data profile writes need custom implementation
        // Write to test data profile: "Mark Adj" = vars["MarketAdjustmentAllLoans"]
        // TODO: Test data profile writes need custom implementation
        // Write to test data profile: "Current Gross Price" = vars["CurrentGrossPriceAllLoans"]
        // TODO: Test data profile writes need custom implementation
        if (true) /* Element Committed Loan Lock icon(Detail Screen) is visible */ {
          vars["CommitmentOderAllLoans"] = await page.locator("//button[text()=\"$|CorrLoanNumAllLoans|\"]//ancestor::tr//div[@class=\"commit-order\"]").textContent() || '';
          // Write to test data profile: "Locked Loan" = "Yes"
          // TODO: Test data profile writes need custom implementation
          // Write to test data profile: "Commitment Order" = vars["CommitmentOderAllLoans"]
          // TODO: Test data profile writes need custom implementation
        } else {
          // Write to test data profile: "Locked Loan" = "None"
          // TODO: Test data profile writes need custom implementation
          // Write to test data profile: "Commitment Order" = "None"
          // TODO: Test data profile writes need custom implementation
        }
        vars["count"] = (parseFloat(String(vars["count"])) + parseFloat(String("1"))).toFixed(0);
      }
    }
  });
});
