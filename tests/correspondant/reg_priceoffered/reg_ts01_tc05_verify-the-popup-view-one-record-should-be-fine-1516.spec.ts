import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_PriceOffered', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS01_TC05_Verify the popup view [[ one record should be fine]', async ({ page }) => {
    // Prerequisite: REG_TS01_TC04.1_Verify the table data..
    // TODO: Ensure prerequisite test passes first

    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["RequestIDDetails"]);
    await page.locator("//button[contains(text(),\"$|RequestIDDetails|\")]").waitFor({ state: 'visible' });
    await page.locator("//button[contains(text(),\"$|RequestIDDetails|\")]").click();
    vars["Last Name"] = testData["Static Last Name(Pop Up Verfication)"];
    await page.locator("(//tr[td[@data-title=\"Loan Status\"]//div[not(contains(text(),\"Error\"))]]//td[@data-title=\"Last Name\"]//div[contains(text(),\"$|Last Name|\")]/../..//td[@data-title=\"Corr. Loan#\"]//button)[1]").click();
    vars["BidReqIdBidReqPage"] = await page.locator("//div[text()=\"Bid Request ID\"]//following-sibling::h5").textContent() || '';
    vars["BidLoanNumBidReqPage"] = await page.locator("//div[text()=\"Bid Loan Number\"]//following-sibling::h5").textContent() || '';
    vars["ErrorsCheckBidReqPage"] = await page.locator("//div[text()=\"Errors Check\"]//following-sibling::h5").textContent() || '';
    await page.locator("//button[@aria-label=\"Close\"]").click();
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["RequestIDDetails"]);
    await page.locator("//a[contains(text(),\"$|RequestIDDetails|\")]").waitFor({ state: 'visible' });
    await page.locator("//a[contains(text(),\"$|RequestIDDetails|\")]").click();
    await page.locator("//button[contains(text(),\"$|BidLoanNumBidReqPage|\")]").waitFor({ state: 'visible' });
    await page.locator("(//div[contains(@aria-label,\"Last name\") and contains(text(),\"$|Last Name|\")])/../..//td[@data-title=\"Corr. Loan#\"]//button[contains(@aria-label,\"View loan details\")]").click();
    await expect(page.locator("//div[text()=\"Bid Request ID\"]//following-sibling::h5")).toContainText(vars["BidReqIdBidReqPage"]);
    await expect(page.locator("//div[text()=\"Bid Loan Number\"]//following-sibling::h5")).toContainText(vars["BidLoanNumBidReqPage"]);
    await expect(page.locator("//div[text()=\"Errors Check\"]//following-sibling::h5")).toContainText(vars["ErrorsCheckBidReqPage"]);
    await stepGroups.stepGroup_Verification_of_Loan_Popup_Details_From_BidReq_Lon_Popup(page, vars);
  });
});
