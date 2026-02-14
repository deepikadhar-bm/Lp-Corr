import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Commitment List - TS_2', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS05_TC05_Perform commit action for Company A and verify that any related bid. from that company record should display the latest value', async ({ page }) => {
    // Prerequisite: REG_TS05_TC04_Perfom commit action for Company A and verify that Company B's auth limit is not impac
    // TODO: Ensure prerequisite test passes first

    await page.locator("//a[contains(text(),\"Commitment List\")]//i[contains(@class,\"fas fa-arrow-left \")]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//button[@aria-label=\"Clear all filters\"]").click();
    vars["BidReqId1"] = vars["RequestIDDetails"];
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//input[@id='searchTagInput']").click();
    await page.locator("//input[@id='searchTagInput']").fill(vars["BidReqId1"]);
    await page.locator("//span[normalize-space(text())=\"Bid Request ID\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Comm. ID\"]//a[contains(@aria-label,\"View details for commitment\")]").click();
    await page.locator("//div[text()=\"Open Auth Limit: \"]//..//div[@class=\"fw-semibold\"]").waitFor({ state: 'visible' });
    vars["OpenAuthLimitBidReq1"] = await page.locator("//div[text()=\"Open Auth Limit: \"]//..//div[@class=\"fw-semibold\"]").textContent() || '';
    vars["AuthLimitBidReq1"] = await page.locator("//div[text()=\"Auth Limit: \"]//..//div[@class=\"fw-semibold\"]").textContent() || '';
    vars["LastCommitedBidBidReq1"] = await page.locator("//div[normalize-space(text())=\"Last Committed Bid:\"]/following-sibling::div").textContent() || '';
    await page.locator("//a[contains(text(),\"Commitment List\")]//i[contains(@class,\"fas fa-arrow-left \")]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//button[contains(@class,\"search-cancel-btn btn\")]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Filter\"]]").click();
    await page.locator("//div[text()[normalize-space() = \"Select Company/CCode\"]]").waitFor({ state: 'visible' });
    await page.locator("//div[text()[normalize-space() = \"Select Company/CCode\"]]").click();
    await page.locator("(//div[normalize-space(text())=\"Select Company/CCode\"]//following::input[@aria-label=\"Search items\"])[1]").fill(vars["CompanyName"]);
    await page.locator("//label[@class=\"dropdown-item d-flex\"]//input[@type=\"checkbox\"]").check();
    await page.locator("//button[contains(text(),\" Apply Selected \")]").waitFor({ state: 'visible' });
    await page.locator("//button[contains(text(),\" Apply Selected \")]").click();
    await page.locator("//div[contains(@class, \"justify-content-end\")]//button[text()=\"Apply Filters\"]").click();
    vars["BidReqId2"] = await page.locator("//td[@data-title=\"Company\"]//div[normalize-space(text())=\"$|CompanyName|\"] //ancestor::tr //td[@data-title=\"Bid Request ID\"] //div[not(contains(normalize-space(text()),\"$|BidReqId1|\"))]").textContent() || '';
    vars["BidReqId2"] = String(vars["BidReqId2"]).trim();
    await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())=\"$|BidReqId2|\"]//ancestor::tr//td[@data-title=\"Comm. ID\"]").click();
    await page.locator("//div[text()=\"Open Auth Limit: \"]//..//div[@class=\"fw-semibold\"]").waitFor({ state: 'visible' });
    vars["OpenAuthLimitBidReqId2"] = await page.locator("//div[text()=\"Open Auth Limit: \"]//..//div[@class=\"fw-semibold\"]").textContent() || '';
    vars["AuthLimitBidReqId2"] = await page.locator("//div[text()=\"Auth Limit: \"]//..//div[@class=\"fw-semibold\"]").textContent() || '';
    vars["LastCommitedBidBidReqId2"] = await page.locator("//div[normalize-space(text())=\"Last Committed Bid:\"]/following-sibling::div").textContent() || '';
    expect(String(vars["OpenAuthLimitBidReq1"])).toBe(vars["OpenAuthLimitBidReqId2"]);
    expect(String(vars["AuthLimitBidReq1"])).toBe(vars["AuthLimitBidReqId2"]);
    expect(String(vars["LastCommitedBidBidReq1"])).toBe(vars["LastCommitedBidBidReqId2"]);
    // Write to test data profile: "RequestIdFrom5-5" = vars["BidReqId1"]
    // TODO: Test data profile writes need custom implementation
  });
});
