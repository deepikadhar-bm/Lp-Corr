import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS23_TC01_Verify that if all loans in a bid fail, the status is updated to \\\"Processing Failed,\\\" and the bid cannot be submitted for pricing.', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Deleting_Early_Config_Report_If_Present(page, vars);
    await stepGroups.stepGroup_Navigating_to_Upload_New_Bid_Request(page, vars);
    await stepGroups.stepGroup_Uploading_Bid_Request(page, vars);
    if (true) /* Element Second Enabled Time is visible */ {
      await stepGroups.stepGroup_Selecting_Second_Enabled_Batch_Time_If_the_Condition_is_fail(page, vars);
      // [DISABLED] Scroll to the element Enabled Date into view
      // await page.locator("//option[@aria-disabled=\"false\"]").scrollIntoViewIfNeeded();
      // [DISABLED] Click on Enabled Date
      // await page.locator("//option[@aria-disabled=\"false\"]").click();
    } else {
      await stepGroups.stepGroup_Navigating_to_Bulk_Batch_Timing(page, vars);
      await stepGroups.stepGroup_Modifying_batches_with_5_min_prior(page, vars);
      await stepGroups.stepGroup_Navigating_to_Upload_New_Bid_Request(page, vars);
      await stepGroups.stepGroup_Uploading_Bid_Request(page, vars);
      await stepGroups.stepGroup_Selecting_Second_Enabled_Batch_Time_If_the_Condition_is_fail(page, vars);
      // [DISABLED] Scroll to the element Enabled Time into view
      // await page.locator("//option[@aria-disabled=\"false\"]").scrollIntoViewIfNeeded();
      // [DISABLED] Click on Enabled Date
      // await page.locator("//option[@aria-disabled=\"false\"]").click();
    }
    await page.locator("(//input[@type=\"file\"])[1]").setInputFiles(path.resolve(__dirname, 'test-data', "Bid_file_success_error_loans_popup_updated.xlsx,Bid_file_success_error_loans_popup_updated.xlsx"));
    await expect(page.locator("//span[text()[normalize-space() = \"Upload Bid\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Upload Bid\"]]").click();
    await page.locator("//div[@class=\"modal-header\"]/div/h5").waitFor({ state: 'visible' });
    await expect(page.locator("//div[@class=\"modal-header\"]/div/h5")).toBeVisible();
    await page.locator("//span[text()=\"Continue\"]/..").waitFor({ state: 'visible' });
    await expect(page.locator("//span[text()=\"Continue\"]/..")).toBeVisible();
    await expect(page.locator("(//td[@data-title=\"Status\"]//span)[position() >=1 and position() <=5]")).toContainText("Success");
    await page.locator("//span[text()=\"Continue\"]/..").click();
    vars["RequestIDDetails"] = await page.locator("//div[text()=\"Request ID\"]/..//h5").textContent() || '';
    vars["RequestIDDetails"] = String(vars["RequestIDDetails"]).trim();
    vars["BidStatusFromDetails"] = await page.locator("//div[text()=\"Status\"]/..//h5").textContent() || '';
    await expect(page.locator("//div[text()=\"Status\"]/..//h5")).toContainText("Processing Failed");
    await expect(page.locator("(//td[@data-title=\"Loan Status\"]//div)")).toContainText("Error");
    vars["TotalLoansDetails"] = await page.locator("//div[@aria-label=\"Total Loan Rows Label\"]/..//span[contains(@aria-label,\"Total Loans\")]").textContent() || '';
    vars["ErroredLoansDetails"] = await page.locator("//div[@aria-label=\"Total Loan Rows Label\"]/..//span[contains(@aria-label,\"Errored Loans\")]").textContent() || '';
    expect(String(vars["ErroredLoansDetails"])).toBe(vars["TotalLoansDetails"]);
    vars["LoansErrors(Bid request details)"] = String(vars["TotalLoansDetails"]) + "/" + String(vars["ErroredLoansDetails"]);
    vars["LoansErrors(Bid request details)"] = String(vars["LoansErrors(Bid request details)"]).trim();
    await expect(page.locator("//div[@id=\"page-footer\"]//button[@disabled]")).toBeDisabled();
    await page.locator("//li[@class=\"nav-item\"]//a[@href=\"#/bid-requests\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]")).toBeVisible();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["RequestIDDetails"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//button[contains(text(),\"$|RequestIDDetails|\")]/../..//td[@data-title=\"Bid Req. ID\"]")).toContainText(vars["RequestIDDetails"]);
    await expect(page.locator("//button[contains(text(),\"$|RequestIDDetails|\")]/../..//td[@data-title=\"Status\"]")).toContainText("Processing Failed");
    vars["LoansErrors(bid requests list)"] = await page.locator("//table[@aria-label=\"Data Table\"]//td[@data-title=\"#Loans / #Errors\"]//div").textContent() || '';
    vars["LoansErrors(bid requests list)"] = String(vars["LoansErrors(bid requests list)"]).trim();
    expect(String(vars["LoansErrors(Bid request details)"])).toBe(vars["LoansErrors(bid requests list)"]);
  });
});
