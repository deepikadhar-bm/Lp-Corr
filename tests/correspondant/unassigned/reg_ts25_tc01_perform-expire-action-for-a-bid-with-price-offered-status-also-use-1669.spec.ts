import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS25_TC01_Perform expire action for a bid with price offered status, Also user should be able to update back to price offered', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").click();
    vars["BidReqIdPriceOffered"] = testData["RequestIDfrom24-1"];
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(String(vars["BidReqIdPriceOffered"]));
    // [DISABLED] Enter BidReqIdPriceOffered in the Search by Bid Request ID Field field
    // await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdPriceOffered"]);
    await page.locator("//td[@data-title=\"Bid Req. ID\"]//a[contains(text(),\"$|BidReqIdPriceOffered|\")]").waitFor({ state: 'visible' });
    vars["BidStatusPriceOffered"] = await page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//td[@data-title=\"Status\"]//span").textContent() || '';
    vars["BidStatusPriceOffered"] = String(vars["BidStatusPriceOffered"]).trim();
    expect(String(vars["BidStatusPriceOffered"])).toBe("Price Offered");
    vars["BidValuePriceOffered"] = await page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//td[@data-title=\"Bid Value\"]").textContent() || '';
    vars["TotalLoansPriceOffered"] = await page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//td[@data-title=\"#Loans\"]\n ").textContent() || '';
    await page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//button[@aria-label=\"Expire Pricing\"]//span").click();
    await expect(page.locator("//span[@id=\"expirePricingTitle\"]//b")).toContainText(vars["BidReqIdPriceOffered"]);
    await expect(page.locator("//div[text()=\"Bid Value: \"]//following-sibling::h4")).toContainText(vars["BidValuePriceOffered"]);
    await expect(page.locator("//div[text()=\"Total Loans: \"]//following-sibling::h4")).toContainText(vars["TotalLoansPriceOffered"]);
    await page.locator("//button[@aria-label=\"Yes, Expire\"]").click();
    await page.reload();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(String(vars["BidReqIdPriceOffered"]));
    // [DISABLED] Enter BidReqIdPriceOffered in the Search by Bid Request ID Field field
    // await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdPriceOffered"]);
    vars["RequiredBidID"] = vars["BidReqIdPriceOffered"];
    await page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//td[@data-title=\"Status\"]//span").waitFor({ state: 'visible' });
    vars["BidStatusPriceOffered"] = await page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//td[@data-title=\"Status\"]//span").textContent() || '';
    vars["BidStatusPriceOffered"] = String(vars["BidStatusPriceOffered"]).trim();
    expect(String(vars["BidStatusPriceOffered"])).toBe("Expired");
    await page.locator("//td[@data-title=\"Bid Req. ID\"]//a[contains(text(),\"$|BidReqIdPriceOffered|\")]").click();
    await page.locator("//button[text()[normalize-space() = \"Get Price\"]]").waitFor({ state: 'visible' });
    await expect(page.locator("//button[text()[normalize-space() = \"Get Price\"]]")).toBeVisible();
    await page.locator("//i[contains(@class,'fa-arrow-left')]").click();
    await page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//button[@aria-label=\"Change Status\"]").click();
    await page.locator("//h5[text()=\"Change Status\"]//ancestor::div//button[@aria-label=\"Change Status\"]").click();
    // [DISABLED] Click on the Refresh button in the browser
    // await page.reload();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(String(vars["BidReqIdPriceOffered"]));
    // [DISABLED] Enter BidReqIdPriceOffered in the Search by Bid Request ID Field field
    // await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdPriceOffered"]);
    await page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//td[@data-title=\"Status\"]//span").waitFor({ state: 'visible' });
    await page.waitForTimeout(10000);
    vars["BidStatusPriceOffered"] = await page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//td[@data-title=\"Status\"]//span").textContent() || '';
    vars["BidStatusPriceOffered"] = String(vars["BidStatusPriceOffered"]).trim();
    expect(String(vars["BidStatusPriceOffered"])).toBe("Price Offered");
  });
});
