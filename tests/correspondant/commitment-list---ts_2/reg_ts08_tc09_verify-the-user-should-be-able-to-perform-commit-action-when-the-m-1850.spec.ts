import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Commitment List - TS_2', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS08_TC09_Verify the user should be able to perform commit action when the market threshold value does not satisfy min condition', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    vars["BidReqId"] = testData["RequestIdFrom8-8"];
    vars["CommitmentID"] = testData["CommitmentIdfrom8-8"];
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqId"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[contains(text(),\"$|BidReqId|\")]").click();
    await page.locator("//button[text()[normalize-space() = \"Get Price\"]]").click();
    await page.waitForLoadState('networkidle');
    await page.locator("//a[contains(text(),\"Commitment List\")]//i[contains(@class,\"fas fa-arrow-left \")]").waitFor({ state: 'visible' });
    await page.locator("//tbody//input[@type=\"checkbox\"]").waitFor({ state: 'visible' });
    vars["FirstMarkAdjValue"] = await page.locator("//tbody//input//ancestor::tr//td[@data-title=\"Mark Adj\"]").textContent() || '';
    vars["FirstMarkAdjValue"] = String(vars["FirstMarkAdjValue"]).trim();
    vars["FirstMarkAdjValue"] = String(vars["FirstMarkAdjValue"]).replace(/\-/g, '');
    vars["FirstMarkAdjValue"] = (parseFloat(String("0")) + parseFloat(String(vars["FirstMarkAdjValue"]))).toFixed(0);
    vars["MinValue"] = (parseFloat(String(vars["FirstMarkAdjValue"])) + parseFloat(String(String(Math.floor(Math.random() * (9999 - 1 + 1)) + 1)))).toFixed(0);
    vars["MaxValue"] = (parseFloat(String(vars["MinValue"])) + parseFloat(String(String(Math.floor(Math.random() * (9999 - 1 + 1)) + 1)))).toFixed(0);
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//a[@href=\"#/admin/general-settings/market-thresholds\"]").scrollIntoViewIfNeeded();
    await page.locator("//a[@href=\"#/admin/general-settings/market-thresholds\"]").click();
    await stepGroups.stepGroup_Market_Threshold(page, vars);
    await page.locator("//input[@aria-label=\"Enter maximum display value in percentage\"]").fill(vars["MaxValue"]);
    await page.locator("//input[@aria-label=\"Enter minimum display value in percentage\"]").clear();
    await page.locator("//input[@aria-label=\"Enter minimum display value in percentage\"]").fill(vars["MinValue"]);
    await page.locator("//span[contains(text(),\"Update Threshold\")]").click();
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqId"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[contains(text(),\"$|BidReqId|\")]").click();
    await page.locator("//button[text()[normalize-space() = \"Get Price\"]]").waitFor({ state: 'visible' });
    await page.locator("//button[text()[normalize-space() = \"Get Price\"]]").click();
    await page.locator("//*[contains(@aria-label,\"Select loan\")]/../..//td[@data-title=\"Mark Adj\"]").waitFor({ state: 'visible' });
    await stepGroups.stepGroup_Verifying_MarkAdjValue(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//input[@id='searchTagInput']").click();
    await page.locator("//input[@id='searchTagInput']").fill(vars["BidReqId"]);
    await page.locator("//span[normalize-space(text())=\"Bid Request ID\"]").click();
    await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())=\"$|BidReqId|\"]//ancestor::tr//td[@data-title=\"Comm. ID\"]").click();
    await expect(page.locator("(//div[text()=\"Min/Max Threshold\"]//..//span)[2]")).toContainText(vars["MaxValue"]);
    await expect(page.locator("(//div[text()=\"Min/Max Threshold\"]//..//span)[1]")).toContainText(vars["MinValue"]);
    vars["LoansCountBefore"] = await page.locator("//div[text()=\"No. Loans \"]//..//h5").textContent() || '';
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
    vars["LoansCountAfter"] = await page.locator("//div[text()=\"No. Loans \"]//..//h5").textContent() || '';
    expect(String(vars["LoansCountAfter"])).toBe(vars["LoansCountBefore"]);
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//a[@href=\"#/admin/general-settings/market-thresholds\"]").scrollIntoViewIfNeeded();
    await page.locator("//a[@href=\"#/admin/general-settings/market-thresholds\"]").click();
    await stepGroups.stepGroup_Market_Threshold(page, vars);
    await page.locator("//input[@aria-label=\"Enter minimum display value in percentage\"]").clear();
    await page.locator("//input[@aria-label=\"Enter maximum display value in percentage\"]").fill("120");
    await page.locator("//input[@aria-label=\"Enter minimum display value in percentage\"]").fill("1");
    await page.locator("//span[contains(text(),\"Update Threshold\")]").click();
  });
});
