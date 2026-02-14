import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_PriceOffered', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS22_TC02.1_Perform commit action and verify that during the commitment progress, the status is updated to commitment in progress. -> Verify in both list and detail screen(One Execution Type)', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    vars["BidReqIdPriceOffered"] = testData["RequestIDFrom28-2"];
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdPriceOffered"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[contains(@aria-label, \"View details for price offered\")]\n").click();
    await page.locator("//input[normalize-space(@aria-label)=\"Select all for\" and @type=\"checkbox\"]").check();
    await page.locator("//button[text()[normalize-space() = \"Get Price\"]]").click();
    await page.locator("//button[@id='commitdropdownMenuButton']").waitFor({ state: 'visible' });
    await page.locator("//button[@id='commitdropdownMenuButton']").click();
    await page.locator("//span[text()=\"Yes, Commit\"]//parent::button").click();
    vars["CurrentPageURL"] = page.url();
    const newPage = await page.context().newPage();
    await page.goto(vars["CurrentPageURL"]);
    await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdPriceOffered"]);
    await page.keyboard.press('Enter');
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//button[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//td[@data-title=\"Status\"]//span").waitFor({ state: 'visible' });
    vars["BidStatusBidReqPage"] = await page.locator("//button[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//td[@data-title=\"Status\"]//span").textContent() || '';
    vars["BidStatusBidReqPage"] = String(vars["BidStatusBidReqPage"]).trim();
    if (String(vars["BidStatusBidReqPage"]).includes(String("Partially Committed"))) {
      await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(String(vars["BidReqIdPriceOffered"]));
      await page.keyboard.press('Enter');
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    }
    vars["BidStatusBidReqPage"] = await page.locator("//button[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//td[@data-title=\"Status\"]//span").textContent() || '';
    expect(String(vars["BidStatusBidReqPage"])).toBe("Commitment in progress");
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdPriceOffered"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["BidStatusPriceOfferedPage"] = await page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//td[@data-title=\"Status\"]//span").textContent() || '';
    vars["BidStatusPriceOfferedPage"] = String(vars["BidStatusPriceOfferedPage"]).trim();
    expect(String(vars["BidStatusPriceOfferedPage"])).toBe("Commitment in progress");
  });
});
