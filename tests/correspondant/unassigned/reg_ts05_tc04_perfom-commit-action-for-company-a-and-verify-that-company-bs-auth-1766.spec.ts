import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS05_TC04_Perfom commit action for Company A and verify that Company B\\\'s auth limit is not impacted', async ({ page }) => {
    // Prerequisite: REG_TS01_TC01_Perform submit for pricing action, and then verify the status should be updated to pri
    // TODO: Ensure prerequisite test passes first

    // [DISABLED] Login to CORR Portal
    // await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    // [DISABLED] Store test data1 in RequestIDDetails
    // vars["RequestIDDetails"] = "test data1";
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").click();
    vars["BidReqIdCompanyA"] = vars["RequestIDDetails"];
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdCompanyA"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["CompanyName"] = await page.locator("//td[@data-title=\"Company\"]").textContent() || '';
    vars["CompanyName"] = String(vars["CompanyName"]).trim();
    await page.locator("//td[@data-title=\"Bid Req. ID\"]").click();
    await page.locator("//tbody//input[@type=\"checkbox\"]").waitFor({ state: 'visible' });
    await page.locator("//tbody//input[@type=\"checkbox\"]").check();
    await page.locator("//button[normalize-space(text())=\"Get Price\"]").click();
    await page.locator("//button[@id='commitdropdownMenuButton']").waitFor({ state: 'visible' });
    await page.locator("//button[@id='commitdropdownMenuButton']").click();
    await page.locator("//span[text()=\"Yes, Commit\"]//parent::button").click();
    await page.locator("//button[contains(text(),\"Okay\")]").waitFor({ state: 'visible' });
    await page.locator("//button[contains(text(),\"Okay\")]").click();
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//input[@id='searchTagInput']").click();
    await page.locator("//input[@id='searchTagInput']").fill(vars["BidReqIdCompanyA"]);
    await page.locator("//span[normalize-space(text())=\"Bid Request ID\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Comm. ID\"]//a[contains(@aria-label,\"View details for commitment\")]").click();
    await page.locator("//div[text()=\"Open Auth Limit: \"]//..//div[@class=\"fw-semibold\"]").waitFor({ state: 'visible' });
    vars["OpenAuthLimitCompanyA"] = await page.locator("//div[text()=\"Open Auth Limit: \"]//..//div[@class=\"fw-semibold\"]").textContent() || '';
    vars["AuthLimitCompanyA"] = await page.locator("//div[text()=\"Auth Limit: \"]//..//div[@class=\"fw-semibold\"]").textContent() || '';
    vars["LastCommittedBidCompanyA"] = await page.locator("//div[normalize-space(text())=\"Last Committed Bid:\"]/following-sibling::div").textContent() || '';
    await page.locator("//a[contains(text(),\"Commitment List\")]//i[contains(@class,\"fas fa-arrow-left \")]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//button[contains(@class,\"search-cancel-btn btn\")]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Filter\"]]").click();
    await page.locator("//div[text()[normalize-space() = \"Select Company/CCode\"]]").waitFor({ state: 'visible' });
    await page.locator("//div[text()[normalize-space() = \"Select Company/CCode\"]]").click();
    await page.locator("(//div[normalize-space(text())=\"Select Company/CCode\"]//following::input[@aria-label=\"Search items\"])[1]").fill("American");
    await page.locator("//input[@type=\"checkbox\" and contains(@aria-label,\"Select Freedom\")]").check();
    await page.locator("//button[contains(text(),\" Apply Selected \")]").waitFor({ state: 'visible' });
    await page.locator("//button[contains(text(),\" Apply Selected \")]").click();
    await page.locator("//div[contains(@class, \"justify-content-end\")]//button[text()=\"Apply Filters\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["BidReqIdCompanyB"] = await page.locator("//td[@data-title=\"Bid Request ID\"]").textContent() || '';
    await page.locator("//td[@data-title=\"Comm. ID\"]//a[contains(@aria-label,\"View details for commitment\")]").click();
    await page.locator("//div[text()=\"Open Auth Limit: \"]//..//div[@class=\"fw-semibold\"]").waitFor({ state: 'visible' });
    vars["OpenAuthLimitCompanyB"] = await page.locator("//div[text()=\"Open Auth Limit: \"]//..//div[@class=\"fw-semibold\"]").textContent() || '';
    vars["AuthLimitCompanyB"] = await page.locator("//div[text()=\"Auth Limit: \"]//..//div[@class=\"fw-semibold\"]").textContent() || '';
    vars["LastCommitedBidCompanyB"] = await page.locator("//div[normalize-space(text())=\"Last Committed Bid:\"]/following-sibling::div").textContent() || '';
    expect(String(vars["OpenAuthLimitCompanyA"])).toBe(vars["OpenAuthLimitCompanyB"]);
    expect(String(vars["AuthLimitCompanyA"])).toBe(vars["AuthLimitCompanyB"]);
    expect(String(vars["LastCommittedBidCompanyA"])).toBe(vars["LastCommitedBidCompanyB"]);
  });
});
