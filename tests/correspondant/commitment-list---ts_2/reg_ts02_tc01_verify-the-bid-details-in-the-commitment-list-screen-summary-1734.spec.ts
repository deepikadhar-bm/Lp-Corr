import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Commitment List - TS_2', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS02_TC01_Verify the Bid details in the commitment List screen summary', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    vars["BidReqId"] = testData["RequestIDFromPRE_PR_1-1"];
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").click();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqId"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[contains(text(),\"$|BidReqId|\")]").click();
    vars["BidReqIdPriceOfferedDetails"] = await page.locator("//div[text()=\"Bid Req. ID\"]//following-sibling::h5").textContent() || '';
    vars["ExecutionTypePriceOfferedDetails"] = await page.locator("//div[text()=\"Execution Type\"]//following-sibling::h5").textContent() || '';
    vars["CCodeInPriceOfferedDetails"] = await page.locator("//div[text()=\"CCode\"]//following-sibling::h5").textContent() || '';
    vars["CompanyNamePriceOfferedDetails"] = await page.locator("//div[text()=\"Customer\" or text()=\"Company\"]//following-sibling::h5").textContent() || '';
    vars["ProductPriceOfferedDetails"] = await page.locator("//div[text()=\"Product\"]//following-sibling::h5").textContent() || '';
    vars["CouponPriceOffereddetails"] = await page.locator("//div[contains(text(),\"Coupon\")]//following-sibling::h5").textContent() || '';
    vars["CurrentMarketPriceOfferedDetails"] = await page.locator("//div[contains(text(),\"Current Market\")]//following-sibling::h5").textContent() || '';
    vars["MinMaxThresholdPriceOfferedDetails"] = await page.locator("//div[text()=\"Min/Max Threshold\"]//following-sibling::h5").textContent() || '';
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//input[@id='searchTagInput']").click();
    await page.locator("//input[@id='searchTagInput']").fill(vars["BidReqId"]);
    await page.locator("//div[contains(@class, 'popover-body')]/ul[1]/li[3]/a[1]").click();
    await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())=\"$|BidReqId|\"]//ancestor::tr//td[@data-title=\"Comm. ID\"]//a[contains(@aria-label,\"View details for commitme\")]").click();
    vars["BidReqIdCommitmentListDetails"] = await page.locator("//div[text()=\"Bid Req. ID\"]//following-sibling::h5").textContent() || '';
    vars["ExecutionTypeCommitmentListDetails"] = await page.locator("//div[text()=\"Execution Type\"]//following-sibling::h5").textContent() || '';
    vars["CCodeInCommitmentListDetails"] = await page.locator("//div[text()=\"CCode\"]//following-sibling::h5").textContent() || '';
    vars["CompanyNameCommitmentListDetails"] = await page.locator("//div[text()=\"Customer\" or text()=\"Company\"]//following-sibling::h5").textContent() || '';
    vars["ProductCommitmentListDetails"] = await page.locator("//div[text()=\"Product\"]//following-sibling::h5").textContent() || '';
    vars["CouponCommitmentListdetails"] = await page.locator("//div[contains(text(),\"Coupon\")]//following-sibling::h5").textContent() || '';
    vars["CurrentMarketCommitmentListDetails"] = await page.locator("//div[contains(text(),\"Current Market\")]//following-sibling::h5").textContent() || '';
    vars["MinMaxThresholdCommitmentListDetails"] = await page.locator("//div[text()=\"Min/Max Threshold\"]//following-sibling::h5").textContent() || '';
    expect(String(vars["BidReqIdPriceOfferedDetails"])).toBe(vars["BidReqIdCommitmentListDetails"]);
    expect(String(vars["ExecutionTypePriceOfferedDetails"])).toBe(vars["ExecutionTypeCommitmentListDetails"]);
    expect(String(vars["CCodeInPriceOfferedDetails"])).toBe(vars["CCodeInCommitmentListDetails"]);
    expect(String(vars["CompanyNamePriceOfferedDetails"])).toBe(vars["CompanyNameCommitmentListDetails"]);
    expect(String(vars["ProductPriceOfferedDetails"])).toBe(vars["ProductCommitmentListDetails"]);
    expect(String(vars["MinMaxThresholdPriceOfferedDetails"])).toBe(vars["MinMaxThresholdCommitmentListDetails"]);
    expect(String(vars["CouponPriceOffereddetails"])).toBe(vars["CouponCommitmentListdetails"]);
  });
});
