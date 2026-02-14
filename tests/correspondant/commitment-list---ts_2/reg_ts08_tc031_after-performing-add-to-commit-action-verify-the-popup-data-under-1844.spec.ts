import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Commitment List - TS_2', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS08_TC03.1_After performing add to commit action, verify the popup data under the total commitment details section', async ({ page }) => {
    // Prerequisite: REG_TS08_TC03_After performing add to commit action, verify the popup data under the total commitmen
    // TODO: Ensure prerequisite test passes first

    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await page.locator("//span[contains(text(),\" Total Committed Loans\")]").waitFor({ state: 'visible' });
    await page.locator("//span[contains(text(),\" Total Committed Loans\")]").click();
    await page.locator("//button[text()=\"$|CommittedCorrLoan|\"]").scrollIntoViewIfNeeded();
    await page.locator("//button[text()=\"$|CommittedCorrLoan|\"]").click();
    await page.locator("//div[text()=\"Bid Request ID\"]//following-sibling::h5").waitFor({ state: 'visible' });
    await expect(page.locator("//div[text()=\"Bid Request ID\"]//following-sibling::h5")).toContainText(vars["BidReqIDTotalLoansPopup"]);
    await expect(page.locator("//div[text()=\"Bid Loan Number\"]//following-sibling::h5")).toContainText(vars["BidLoanNumTotalLoansPopup"]);
    await expect(page.locator("//div[text()=\"Errors Check\"]//following-sibling::h5")).toContainText(vars["ErorsCheckTotalLoansPopup"]);
    vars["count"] = "1";
    vars["ChaseFieldCountPopup"] = String(await page.locator("//div[@class=\"border-bottom p-2\"]").count());
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["ChaseFieldCountPopup"]))) {
      await page.locator("//h5[text()=\"Loan Details\"]").click();
      vars["ChaseFieldNamePopupTotalCommittedLoans"] = await page.locator("(//div[@class=\"border-bottom p-2\"])[$|count|]").textContent() || '';
      vars["ChaseValuePopupTotalCommittedLoans"] = await page.locator("(//div[@class=\"border-bottom p-2\" and contains(text(),\"$|ChaseFieldNamePopupTotalCommittedLoans|\")]/following-sibling::div)[1]\n").textContent() || '';
      for (let dataIdx = parseInt(vars["count"]); dataIdx <= parseInt(vars["count"]); dataIdx++) {
        await expect(page.locator("(//div[@class=\"border-bottom p-2\"])[$|count|]")).toContainText(testData["Chase Field Name"]);
        if (String(vars["ChaseValuePopupTotalCommittedLoans"]) === String("key_blank")) {
          expect(String(testData["Chase Field Value"])).toBe("Null");
        } else {
          await expect(page.locator("(//div[@class=\"border-bottom p-2\" and contains(text(),\"$|ChaseFieldNamePopupTotalCommittedLoans|\")]/following-sibling::div)[1]\n")).toContainText(testData["Chase Field Value"]);
        }
        vars["count"] = (parseFloat(String(vars["count"])) + parseFloat(String("1"))).toFixed(0);
      }
    }
    await page.locator("//button[@aria-label=\"Close\"]").click();
  });
});
