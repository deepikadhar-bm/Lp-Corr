import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_PriceOffered', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS22_TC02.2_Perform commit action and verify that during the commitment progress, the status is updated to commitment in progress. -> Verify in both list and detail screen(Two Execution Types)', async ({ page }) => {
    // Prerequisite: REG_TS02_TC01.1_Perform submit for pricing action, and then verify the status should be updated to p
    // TODO: Ensure prerequisite test passes first

    // [DISABLED] Login to CORR Portal
    // await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    vars["BidReqIdPriceOffered"] = vars["RequestIDDetails"];
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdPriceOffered"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Execution Type\"]//div[contains(text(),\"CHASE_DIRECT\")]//ancestor::tr//td[@data-title=\"Bid Req. ID\"]//a[contains(@aria-label,\"View details for\")]").click();
    await page.locator("//div[text()=\"Execution Type\"]//following-sibling::h5").waitFor({ state: 'visible' });
    vars["ExecutionTypePriceOfferedDetails"] = await page.locator("//div[text()=\"Execution Type\"]//following-sibling::h5").textContent() || '';
    await page.locator("//input[normalize-space(@aria-label)=\"Select all for\" and @type=\"checkbox\"]").check();
    await page.locator("//button[normalize-space(text())=\"Get Price\"]").click();
    await page.locator("//button[@id='commitdropdownMenuButton']").waitFor({ state: 'visible' });
    await page.locator("//button[@id='commitdropdownMenuButton']").click();
    await page.locator("//span[text()=\"Yes, Commit\"]//parent::button").click();
    // [DISABLED] Wait until the element Okay Button(Popup) is visible
    // await page.locator("//button[contains(text(),\"Okay\")]").waitFor({ state: 'visible' });
    vars["CurrentPageUrl"] = page.url();
    const newPage = await page.context().newPage();
    await page.goto(vars["CurrentPageUrl"]);
    await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdPriceOffered"]);
    await page.keyboard.press('Enter');
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Wait until the text Commitment in progress is present on the current page
    // await page.getByText("Commitment in progress").waitFor({ state: 'visible' });
    await page.locator("//button[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//td[@data-title=\"Status\"]//span").waitFor({ state: 'visible' });
    vars["StatusBidReqPage"] = await page.locator("//button[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//td[@data-title=\"Status\"]//span").textContent() || '';
    vars["StatusBidReqPage"] = String(vars["StatusBidReqPage"]).trim();
    if (String(vars["StatusBidReqPage"]).includes(String("Price Offered"))) {
      await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(String(vars["BidReqIdPriceOffered"]));
      await page.keyboard.press('Enter');
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    }
    vars["StatusBidReqPage"] = await page.locator("//button[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//td[@data-title=\"Status\"]//span").textContent() || '';
    vars["StatusBidReqPage"] = String(vars["StatusBidReqPage"]).trim();
    expect(String(vars["StatusBidReqPage"])).toBe("Commitment in progress");
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdPriceOffered"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["BidStatusChasePriceOffered"] = await page.locator("//td[@data-title=\"Execution Type\"]//div[contains(text(),\"CHASE_DIRECT\")]//ancestor::tr//td[@data-title=\"Status\"]").textContent() || '';
    vars["BidStatusChasePriceOffered"] = String(vars["BidStatusChasePriceOffered"]).trim();
    if (true) /* Verify if BidStatusChasePriceOffered contains PriceOffered */ {
      // [DISABLED] Clear the existing text from Search By Bid Request ID Input and enter BidReqIdPriceOffered
      // await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(String(vars["BidReqIdPriceOffered"]));
    }
    expect(String(vars["BidStatusChasePriceOffered"])).toBe("Commitment in progress");
    vars["BidStatusStandardPriceOffered"] = await page.locator("//td[@data-title=\"Execution Type\"]//div[contains(text(),\"STANDARD\")]//ancestor::tr//td[@data-title=\"Status\"]").textContent() || '';
    vars["BidStatusStandardPriceOffered"] = String(vars["BidStatusStandardPriceOffered"]).trim();
    expect(String(vars["BidStatusStandardPriceOffered"])).toBe("Price Offered");
  });
});
