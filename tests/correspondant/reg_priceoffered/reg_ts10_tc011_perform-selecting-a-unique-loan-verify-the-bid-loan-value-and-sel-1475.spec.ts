import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_PriceOffered', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS10_TC01.1_Perform selecting a unique loan Verify the bid, loan value, and selected loan count displayed in the Commit Selected Loans popup', async ({ page }) => {
    // Prerequisite: REG_TS10_TC01_Perform selecting a unique loan Verify the bid, loan value, and selected loan count di
    // TODO: Ensure prerequisite test passes first

    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    vars["count"] = "1";
    for (let dataIdx = -1; dataIdx <= 2; dataIdx++) {
      await expect(page.locator("(//div[@class=\"commit-order\"])[$|count|]")).toContainText(testData["CommitOrder"]);
      await expect(page.locator("(//div[@aria-label=\"Locked loan\"]/ancestor::tr//button[contains(@aria-label,\"View loan details\")])[$|count|]")).toContainText(testData["Corr Loan"]);
      await expect(page.locator("(//div[@aria-label=\"Locked loan\"]/ancestor::tr//div[contains(@aria-label, \"Last name\")])[$|count|]")).toContainText(testData["Last Name"]);
      await expect(page.locator("(//div[@aria-label=\"Locked loan\"]/ancestor::tr//div[contains(@aria-label, \"Loan amount\")])[$|count|]")).toContainText(testData["Loan Amount"]);
      await expect(page.locator("(//div[@aria-label=\"Locked loan\"]/ancestor::tr//div[contains(@aria-label, \"Interest rate\")])[$|count|]")).toContainText(testData["Int Rate"]);
      await expect(page.locator("(//div[@aria-label=\"Locked loan\"]/ancestor::tr//div[contains(@aria-label, \"Reference security\")])[$|count|]")).toContainText(testData["Ref Sec Prod"]);
      await expect(page.locator("(//div[@aria-label=\"Locked loan\"]/ancestor::tr//div[contains(@aria-label, \"Reference security price\")])[$|count|]")).toContainText(testData["Ref Sec Price"]);
      await expect(page.locator("(//div[@aria-label=\"Locked loan\"]/ancestor::tr//div[contains(@aria-label, \"Gross price\")])[$|count|]")).toContainText(testData["Gross Price"]);
      await expect(page.locator("(//div[@aria-label=\"Locked loan\"]/ancestor::tr//div[contains(@aria-label, \"Hedge ratio\")])[$|count|]")).toContainText(testData["Hedge Ratio"]);
      await expect(page.locator("(//div[@aria-label=\"Locked loan\"]/ancestor::tr//td[@data-title=\"Mark Adj\"])[$|count|]")).toContainText(testData["Mark Adj"]);
      await expect(page.locator("(//div[@aria-label=\"Locked loan\"]/ancestor::tr//div[contains(@aria-label, \"Current gross price\")])[$|count|]")).toContainText(testData["Curr Gross"]);
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    await expect(page.locator("//span[contains(text(),\"Locked/Committed Loans\")]/following-sibling::span[contains(@class,\"counter\")]")).toContainText(vars["CountOfCommittedLoans"]);
    expect(String(vars["ActualOpenAuthLimit"])).toBe(vars["ExpectedOpenAuthLimit"]);
    expect(String(vars["ActualOpenAuthLimitPercentage"])).toBe(vars["ExpectedOpenAuthLimitPercentage"]);
    await expect(page.locator("//div[normalize-space(text())=\"Auth Limit:\"]//following-sibling::div")).toContainText(vars["ActualAuthLimit"]);
    expect(String(vars["LastCommittedBidTimeAndDate"])).toBe(vars["BidCommittedDateAndTime"]);
    expect(String(vars["LastCommittedBidLoanLoanAmount"])).toBe(vars["TotalLoanAmountSelectedBids"]);
  });
});
