import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Commitment List - TS_2', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS08_TC08_Verify the user should not be able to perform commit action when the market threshold value exceeds', async ({ page }) => {
    // Prerequisite: REG_TS01_TC01_Perform submit for pricing action, and then verify the status should be updated to pri
    // TODO: Ensure prerequisite test passes first

    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    vars["BidReqId"] = vars["RequestIDDetails"];
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqId"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[contains(text(),\"$|BidReqId|\")]").click();
    await page.waitForLoadState('networkidle');
    await page.locator("//a[contains(text(),\"Commitment List\")]//i[contains(@class,\"fas fa-arrow-left \")]").waitFor({ state: 'visible' });
    await page.locator("//tbody//input[@type=\"checkbox\"]").waitFor({ state: 'visible' });
    await page.locator("//button[text()[normalize-space() = \"Get Price\"]]").click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(5000);
    vars["FirstMarkAdj"] = await page.locator("//tbody//input//ancestor::tr//td[@data-title=\"Mark Adj\"]").textContent() || '';
    vars["FirstMarkAdj"] = String(vars["FirstMarkAdj"]).trim();
    vars["FirstMarkAdj"] = String(vars["FirstMarkAdj"]).replace(/\-/g, '');
    vars["FirstMarkAdj"] = (parseFloat(String("0")) + parseFloat(String(vars["FirstMarkAdj"]))).toFixed(0);
    await page.locator("//tbody//input[@type=\"checkbox\"]").click();
    await page.locator("//button[normalize-space(text())=\"Get Price\"]").waitFor({ state: 'visible' });
    await page.locator("//button[normalize-space(text())=\"Get Price\"]").click();
    await page.locator("//button[@id='commitdropdownMenuButton']").waitFor({ state: 'visible' });
    await page.locator("//button[@id='commitdropdownMenuButton']").click();
    await page.locator("//span[text()=\"Yes, Commit\"]//parent::button").click();
    await page.locator("//button[contains(text(),\"Okay\")]").waitFor({ state: 'visible' });
    vars["CommitmentID"] = await page.locator("//div[contains(text(),'Commitment')]/span\n").textContent() || '';
    await page.locator("//button[contains(text(),\"Okay\")]").click();
    await page.locator("//div[@id=\"price-offered-list-tabs\"]/div//span[text()=\"All Loans\"]").click();
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//input[@id='searchTagInput']").click();
    await page.locator("//input[@id='searchTagInput']").fill(vars["BidReqId"]);
    await page.locator("//span[normalize-space(text())=\"Bid Request ID\"]").click();
    await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())=\"$|BidReqId|\"]//ancestor::tr//td[@data-title=\"Comm. ID\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["MinMaxThresholdBefore"] = await page.locator("//div[text()=\"Min/Max Threshold\"]//following-sibling::h5").textContent() || '';
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//a[@href=\"#/admin/general-settings/market-thresholds\"]").scrollIntoViewIfNeeded();
    await page.locator("//a[@href=\"#/admin/general-settings/market-thresholds\"]").click();
    await stepGroups.stepGroup_Market_Threshold(page, vars);
    vars["RandomInteger"] = String(Math.floor(Math.random() * (6 - 3 + 1)) + 3);
    vars["NumberLessThanMarkAdj"] = (parseFloat(String(vars["FirstMarkAdj"])) - parseFloat(String(vars["RandomInteger"]))).toFixed(0);
    vars["NumLowerThanMarkAdjPopup"] = (parseFloat(String("0")) + parseFloat(String(vars["NumberLessThanMarkAdj"]))).toFixed(1);
    await page.locator("//input[@aria-label=\"Enter maximum display value in percentage\"]").fill(vars["NumberLessThanMarkAdj"]);
    await page.locator("//span[contains(text(),\"Update Threshold\")]").click();
    await page.reload();
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").click();
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqId"]);
    await page.locator("//a[contains(text(),\"$|BidReqId|\")]").click();
    await page.locator("//button[text()[normalize-space() = \"Get Price\"]]").click();
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//input[@id='searchTagInput']").click();
    await page.locator("//input[@id='searchTagInput']").fill(vars["BidReqId"]);
    await page.locator("//span[normalize-space(text())=\"Bid Request ID\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())=\"$|BidReqId|\"]//ancestor::tr//td[@data-title=\"Comm. ID\"]").click();
    await page.locator("//div[text()=\"No. Loans \"]//..//h5").waitFor({ state: 'visible' });
    vars["NoOfLoansBefore"] = await page.locator("//div[text()=\"No. Loans \"]//..//h5").textContent() || '';
    await page.locator("//div[text()[normalize-space() = \"Total Loans\"]]").click();
    await page.locator("//tbody//input[@type=\"checkbox\"]").waitFor({ state: 'visible' });
    // [DISABLED] Click on Check the Loan Num
    // await page.locator("//tbody//input[@type=\"checkbox\"]").click();
    await page.locator("//tbody//input[@type=\"checkbox\"]").check();
    await page.locator("//tr[contains(@class,\"row\")]//button[contains(@class,\"btn bg-transparent text-primary\")][1]").waitFor({ state: 'visible' });
    vars["CorrLoan"] = await page.locator("//tr[contains(@class,\"row\")]//button[contains(@class,\"btn bg-transparent text-primary\")][1]").textContent() || '';
    await stepGroups.stepGroup_Storing_PopUpError(page, vars);
    await page.locator("//button[@id='commitdropdownMenuButton']").waitFor({ state: 'visible' });
    await page.locator("//button[@id='commitdropdownMenuButton']").click();
    await page.locator("//div[normalize-space(text())=\"$|CommitmentID|\"]").click();
    await page.locator("//span[text()[normalize-space() = \"Yes, Commit\"]]").click();
    await page.locator("//button[contains(text(),\"Okay\")]").waitFor({ state: 'visible' });
    await expect(page.locator("//li[text()[normalize-space() = \"Loans failed to be added to commitment\"]]")).toBeVisible();
    vars["ActualErrorPopup"] = await page.locator("(//div[@class=\"modal-content\"]//li)[2]").textContent() || '';
    await expect(page.getByText(vars["ExpectedPopUpError1"])).toBeVisible();
    expect(String(vars["ActualErrorPopup"])).toBe(vars["ExpectedPopUpError2"]);
    await page.locator("//button[contains(text(),\"Okay\")]").click();
    await page.locator("//span[contains(text(),\" Total Committed Loans\")]").click();
    vars["NoOfLoansAfter"] = await page.locator("//div[text()=\"No. Loans \"]//..//h5").textContent() || '';
    expect(String(vars["NoOfLoansBefore"])).toBe(vars["NoOfLoansAfter"]);
    vars["MaxThreshold"] = await page.locator("(//div[text()=\"Min/Max Threshold\"]//..//span)[2]").textContent() || '';
    expect(String(vars["MaxThreshold"])).toBe(vars["NumberLessThanMarkAdj"]);
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//a[@href=\"#/admin/general-settings/market-thresholds\"]").scrollIntoViewIfNeeded();
    await page.locator("//a[@href=\"#/admin/general-settings/market-thresholds\"]").click();
    await stepGroups.stepGroup_Market_Threshold(page, vars);
    await page.locator("//input[@aria-label=\"Enter maximum display value in percentage\"]").fill("120");
    await page.locator("//span[contains(text(),\"Update Threshold\")]").click();
    // Write to test data profile: "RequestIdFrom8-8" = vars["BidReqId"]
    // TODO: Test data profile writes need custom implementation
    // Write to test data profile: "CommitmentIdfrom8-8" = vars["CommitmentID"]
    // TODO: Test data profile writes need custom implementation
  });
});
