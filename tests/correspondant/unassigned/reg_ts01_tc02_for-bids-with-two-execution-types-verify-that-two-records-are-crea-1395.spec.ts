import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS01_TC02_For bids with two execution types, verify that two records are created in the Price Offered screen, one for each execution type with proper bid records data..', async ({ page }) => {
    // Prerequisite: REG_TS01_TC01.2_Bid Creation for 1-5
    // TODO: Ensure prerequisite test passes first

    await expect(page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]")).toBeVisible();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["RequestIDDetails"]);
    // Write to test data profile: "RequestIDCreated1stScenario" = vars["RequestIDDetails"]
    // TODO: Test data profile writes need custom implementation
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["RequestedDate(bid requests)"] = await page.locator("(//td[@data-title=\"Requested\"])[1]").textContent() || '';
    await page.locator("//td[@data-title=\"Bid Req. ID\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText("Bid Request Details\r")).toBeVisible();
    vars["CCode(bid request details)"] = await page.locator("//div[text()=\"CCode\"]/..//h5").textContent() || '';
    vars["Company(bid request details)"] = await page.locator("//div[text()=\"Company\"]/..//h5").textContent() || '';
    vars["Company(bid request details)"] = String(vars["Company(bid request details)"]).substring(1, String(vars["Company(bid request details)"]).length - 1);
    vars["RequestID(bid request details)"] = await page.locator("//div[text()=\"Request ID\"]/..//h5").textContent() || '';
    vars["Status(bid request details)"] = await page.locator("//div[text()=\"Status\"]/..//h5").textContent() || '';
    vars["ExecutionFlow(SFL)"] = await page.locator("//div[@aria-labelledby=\"executionHeader\"]//div/h5[text()=\"Standard Flow Loans\"]").textContent() || '';
    vars["ExecutionFlow(SFL)"] = String('').split("")["0"] || '';
    vars["SuccessLoan(SFL)"] = await page.locator(" //div[@aria-labelledby=\"executionHeader\"]//div/h5[text()=\"Standard Flow Loans\"]/../..//div[text()='Total Loan Rows']/..//span[contains(@aria-label,\"Successful Loan\")]").textContent() || '';
    vars["count1"] = "1";
    vars["total"] = "0";
    vars["TotalSuccessLoanAmountCount"] = String(await page.locator("(//tbody)[1]//td[@data-title=\"Loan Status\"]//div[contains(text(),\"Success\")]/../..//td[@data-title=\"Loan Amount\"]").count());
    while (parseFloat(String(vars["count1"])) <= parseFloat(String(vars["TotalSuccessLoanAmountCount"]))) {
      vars["SuccessLoanAmount"] = await page.locator("((//tbody)[1]//td[@data-title=\"Loan Status\"]//div[contains(text(),\"Success\")]/../..//td[@data-title=\"Loan Amount\"])[$|count1|]").textContent() || '';
      vars["SuccessLoanAmount"] = String(vars["SuccessLoanAmount"]).replace(/\$/g, '');
      vars["SuccessLoanAmount"] = String(vars["SuccessLoanAmount"]).replace(/\,/g, '');
      vars["total"] = (parseFloat(String(vars["total"])) + parseFloat(String(vars["SuccessLoanAmount"]))).toFixed(0);
      vars["count1"] = (parseFloat(String("1")) + parseFloat(String(vars["count1"]))).toFixed(0);
    }
    vars["BidValue(SFL,bid request details)"] = vars["total"];
    await expect(page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]")).toBeVisible();
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]")).toBeVisible();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["RequestIDDetails"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText("Price Offered\r\r")).toBeVisible();
    await expect(page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"CCode\"]/div)[1]")).toContainText(vars["CCode(bid request details)"]);
    await expect(page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Bid Req. ID\"]/a)[1]")).toContainText(vars["RequestID(bid request details)"]);
    // [DISABLED] Verify that the element Company1(price offered standard) displays text contains Company(bid request details) and With Scrollable FALSE
    // await expect(page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Company\"]/div)[1]")).toContainText(vars["Company(bid request details)"]);
    await expect(page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Company\"]/div)[1]")).toContainText(vars["Company(bid request details)"]);
    await expect(page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Date Price Offered\"]/div)[1]")).toContainText(vars["RequestedDate(bid requests)"]);
    vars["TotalBidValue(SFL)"] = await page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Bid Value\"]/div)[1]").textContent() || '';
    vars["TotalBidValueResult(SFL)"] = String(vars["TotalBidValue(SFL)"]).replace(/\$/g, '');
    vars["TotalBidValueResult(SFL,price offered)"] = String(vars["TotalBidValueResult(SFL)"]).replace(/\,/g, '');
    expect(String(vars["TotalBidValueResult(SFL,price offered)"])).toBe(vars["BidValue(SFL,bid request details)"]);
    await expect(page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"#Loans\"]/div)[1]")).toContainText(vars["SuccessLoan(SFL)"]);
    vars["ExecutionType(price offered)"] = await page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"])[2]//td[@data-title=\"Execution Type\"]/div").textContent() || '';
    expect((await page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"])[2]//td[@data-title=\"Execution Type\"]/div").textContent() || '').toLowerCase()).toContain(String('').toLowerCase());
    await expect(page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Status\"])[1]")).toContainText(vars["Status(bid request details)"]);
  });
});
