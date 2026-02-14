import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_PriceOffered', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS10_TC04.1_Verify the loan details popup view present in the \\\"Locked/Committed\\\" loans - Should be same as present in all loans. Also verify the search / clear search actions', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["BidRequestID"] = await page.locator("//tr[td[@data-title=\"Status\"]//span[contains(text(),'Partially Committed') or contains(text(),'Committed')]]/td[@data-title=\"Bid Req. ID\"]").textContent() || '';
    vars["BidRequestID"] = String(vars["BidRequestID"]).trim();
    await page.locator("//a[contains(text(),\"$|BidRequestID|\")]").click();
    await page.locator("//div[@aria-label=\"Locked loan\"]/../..//td[@data-title=\"Corr. Loan#\"]").waitFor({ state: 'visible' });
    vars["CommittedLoanNum"] = await page.locator("//div[@aria-label=\"Locked loan\"]/../..//td[@data-title=\"Corr. Loan#\"]").textContent() || '';
    await page.locator("//div[@aria-label=\"Locked loan\"]/../..//td[@data-title=\"Corr. Loan#\"]").click();
    vars["BidRequestIdAllLoans"] = await page.locator("//div[text()=\"Bid Request ID\"]//following-sibling::h5").textContent() || '';
    vars["BidLoanNumAllLoans"] = await page.locator("//div[text()=\"Bid Loan Number\"]//following-sibling::h5").textContent() || '';
    vars["ErrorsCheckAllLoans"] = await page.locator("//div[text()=\"Errors Check\"]//following-sibling::h5").textContent() || '';
    await stepGroups.stepGroup_Storing_Loan_Popup_Details_From_All_Loans_Tab_in_to_the_tdp_(page, vars);
    await page.locator("//div[@id='price-offered-list-tabs']/div[1]/div[2]").click();
    await page.waitForLoadState('networkidle');
    await page.locator("//button[contains(text(),\"$|BidLoanNumAllLoans|\")]").click();
    await expect(page.locator("//div[text()=\"Bid Request ID\"]//following-sibling::h5")).toContainText(vars["BidRequestIdAllLoans"]);
    await expect(page.locator("//div[text()=\"Bid Loan Number\"]//following-sibling::h5")).toContainText(vars["BidLoanNumAllLoans"]);
    await expect(page.locator("//div[text()=\"Errors Check\"]//following-sibling::h5")).toContainText(vars["ErrorsCheckAllLoans"]);
    await stepGroups.stepGroup_Verification_of_Loan_Pop_up_Details_From_Locked_Loans_Tab_Pr(page, vars);
  });
});
