import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS08_TC03_After performing add to commit action, verify the popup data under the total commitment details section', async ({ page }) => {
    // Prerequisite: REG_TS08_TC02_ Add loans to commitment for the commitment which is latest one and verify auth limit 
    // TODO: Ensure prerequisite test passes first

    await page.locator("//a[contains(text(),\"Commitment List\")]//i[contains(@class,\"fas fa-arrow-left \")]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    if (true) /* Element Search Cancel Button is visible */ {
      await page.locator("//button[contains(@class,\"search-cancel-btn btn\")]").click();
    }
    await page.locator("//input[@id='searchTagInput']").click();
    await page.locator("//input[@id='searchTagInput']").fill(vars["BidReqId"]);
    await page.locator("//span[normalize-space(text())=\"Bid Request ID\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())=\"$|BidReqId|\"]//ancestor::tr//td[@data-title=\"Comm. ID\"]").click();
    await page.locator("//div[text()[normalize-space() = \"Total Loans\"]]").waitFor({ state: 'visible' });
    await page.locator("//div[text()[normalize-space() = \"Total Loans\"]]").click();
    await page.locator("//button[text()=\"$|CommittedCorrLoan|\"]").click();
    await page.locator("//div[text()=\"Bid Request ID\"]//following-sibling::h5").waitFor({ state: 'visible' });
    vars["BidReqIDTotalLoansPopup"] = await page.locator("//div[text()=\"Bid Request ID\"]//following-sibling::h5").textContent() || '';
    vars["BidLoanNumTotalLoansPopup"] = await page.locator("//div[text()=\"Bid Loan Number\"]//following-sibling::h5").textContent() || '';
    vars["ErorsCheckTotalLoansPopup"] = await page.locator("//div[text()=\"Errors Check\"]//following-sibling::h5").textContent() || '';
    vars["ChaseFieldCountPopup"] = String(await page.locator("//div[@class=\"border-bottom p-2\"]").count());
    vars["ChaseFieldCountPopup"] = String(await page.locator("//div[@class=\"border-bottom p-2\"]").count());
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["ChaseFieldCountPopup"]))) {
      await page.locator("//h5[text()=\"Loan Details\"]").click();
      await page.locator("(//div[@class=\"border-bottom p-2\"])[$|count|]").scrollIntoViewIfNeeded();
      vars["ChaseFieldNamePopupTotalLoans"] = await page.locator("(//div[@class=\"border-bottom p-2\"])[$|count|]").textContent() || '';
      await page.locator("(//div[@class=\"border-bottom p-2\" and contains(text(),\"$|ChaseFieldNamePopupTotalLoans|\")]/following-sibling::div)[1]").scrollIntoViewIfNeeded();
      vars["ChaseValuePopupTotalLoans"] = await page.locator("(//div[@class=\"border-bottom p-2\" and contains(text(),\"$|ChaseFieldNamePopupTotalLoans|\")]/following-sibling::div)[1]").textContent() || '';
      if (String(vars["ChaseValuePopupTotalLoans"]) === String("Key_blank")) {
        vars["ChaseValuePopupTotalLoans"] = "Null";
      }
      for (let dataIdx = parseInt(vars["count"]); dataIdx <= parseInt(vars["count"]); dataIdx++) {
        // Write to test data profile: "Chase Field Name" = vars["ChaseFieldNamePopupTotalLoans"]
        // TODO: Test data profile writes need custom implementation
        // Write to test data profile: "Chase Field Value" = vars["ChaseValuePopupTotalLoans"]
        // TODO: Test data profile writes need custom implementation
      }
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    await page.locator("//button[@aria-label=\"Close\"]").click();
  });
});
