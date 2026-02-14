import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Commitment List - TS_2', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS08_TC10_Verify the user should be able to perform commit action when market threshold value is valid but updated market threshold does not satisfy', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    vars["BidReqId"] = testData["RequestIdFrom8-8"];
    vars["CommitmentID"] = testData["CommitmentIdfrom8-8"];
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqId"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[contains(text(),\"$|BidReqId|\")]").click();
    await page.locator("//div[contains(@id,\"price-offered-back\")]//i").waitFor({ state: 'visible' });
    await page.locator("//button[text()[normalize-space() = \"Get Price\"]]").click();
    await page.waitForLoadState('networkidle');
    await page.locator("//div[contains(@id,\"price-offered-back\")]//i").waitFor({ state: 'visible' });
    await page.locator("//tbody//input[@type=\"checkbox\"]").waitFor({ state: 'visible' });
    vars["FirstMarkAdj"] = await page.locator("//tbody//input//ancestor::tr//td[@data-title=\"Mark Adj\"]").textContent() || '';
    vars["FirstMarkAdj"] = String(vars["FirstMarkAdj"]).trim();
    vars["FirstMarkAdj"] = String(vars["FirstMarkAdj"]).replace(/\-/g, '');
    vars["FirstMarkAdj"] = (parseFloat(String("0")) + parseFloat(String(vars["FirstMarkAdj"]))).toFixed(0);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//input[@id='searchTagInput']").click();
    await page.locator("//input[@id='searchTagInput']").fill(vars["BidReqId"]);
    await page.locator("//span[normalize-space(text())=\"Bid Request ID\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
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
    await page.locator("//input[@aria-label=\"Enter maximum display value in percentage\"]").fill(vars["NumberLessThanMarkAdj"]);
    await page.locator("//span[contains(text(),\"Update Threshold\")]").click();
    await page.reload();
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//input[@id='searchTagInput']").click();
    await page.locator("//input[@id='searchTagInput']").fill(vars["BidReqId"]);
    await page.locator("//span[normalize-space(text())=\"Bid Request ID\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())=\"$|BidReqId|\"]//ancestor::tr//td[@data-title=\"Comm. ID\"]").click();
    vars["NoOfLoansBefore"] = await page.locator("//div[text()=\"No. Loans \"]//..//h5").textContent() || '';
    await page.locator("//div[text()[normalize-space() = \"Total Loans\"]]").click();
    await page.locator("//tbody//input[@type=\"checkbox\"]").waitFor({ state: 'visible' });
    await page.locator("//tbody//input[@type=\"checkbox\"]").click();
    await page.locator("//button[@id='commitdropdownMenuButton']").waitFor({ state: 'visible' });
    await page.locator("//button[@id='commitdropdownMenuButton']").click();
    await page.locator("//div[normalize-space(text())=\"$|CommitmentID|\"]").click();
    await page.locator("//span[text()[normalize-space() = \"Yes, Commit\"]]").click();
    await page.locator("//button[contains(text(),\"Okay\")]").waitFor({ state: 'visible' });
    await page.locator("//button[contains(text(),\"Okay\")]").click();
    await page.locator("//span[contains(text(),\" Total Committed Loans\")]").click();
    vars["NoOfLoansAfter"] = await page.locator("(//div[text()=\"No. Loans \"]//..//h5)[last()]").textContent() || '';
    expect(String(vars["NoOfLoansBefore"])).toBe(vars["NoOfLoansAfter"]);
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//a[@href=\"#/admin/general-settings/market-thresholds\"]").scrollIntoViewIfNeeded();
    await page.locator("//a[@href=\"#/admin/general-settings/market-thresholds\"]").click();
    await stepGroups.stepGroup_Market_Threshold(page, vars);
    await page.locator("//input[@aria-label=\"Enter maximum display value in percentage\"]").fill("120");
    await page.locator("//span[contains(text(),\"Update Threshold\")]").click();
    // Write to test data profile: "CommitmentIDfrom8-10" = vars["CommitmentID"]
    // TODO: Test data profile writes need custom implementation
  });
});
