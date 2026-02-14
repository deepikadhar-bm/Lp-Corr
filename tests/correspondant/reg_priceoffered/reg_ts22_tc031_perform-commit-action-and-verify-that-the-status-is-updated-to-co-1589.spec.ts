import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_PriceOffered', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS22_TC03.1_Perform commit action and verify that the status is updated to committed when all the loans from the bid is committed(One Execution Types)', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    vars["BidReqIdPriceOffered"] = testData["RequestIDfrom22-1.1"];
    await stepGroups.stepGroup_Uncommits_the_Committed_Loans_One_Exe_Type(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdPriceOffered"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Bid Req. ID\"]").click();
    await page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"])/th/div//input[@aria-label=\"Select all for \" and @type=\"checkbox\"]").check();
    await page.locator("//button[normalize-space(text())=\"Get Price\"]").click();
    await page.locator("//button[@id='commitdropdownMenuButton']").waitFor({ state: 'visible' });
    await page.locator("//button[@id='commitdropdownMenuButton']").click();
    await page.locator("//span[text()=\"Yes, Commit\"]//parent::button").click();
    await page.locator("//span[text()=\"Yes, Commit\"]//parent::button").waitFor({ state: 'hidden' });
    await page.locator("//button[contains(text(),\"Okay\")]").waitFor({ state: 'visible' });
    await page.locator("//button[contains(text(),\"Okay\")]").click();
    await page.locator("//i[contains(@class,'fa-arrow-left')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["BidStatusPriceOfferedPage"] = await page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//td[@data-title=\"Status\"]//span").textContent() || '';
    vars["BidStatusPriceOfferedPage"] = String(vars["BidStatusPriceOfferedPage"]).trim();
    expect(String(vars["BidStatusPriceOfferedPage"])).toBe("Committed");
    await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdPriceOffered"]);
    await page.keyboard.press('Enter');
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["BidStatusBidReqPage"] = await page.locator("//button[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//td[@data-title=\"Status\"]//span").textContent() || '';
    vars["BidStatusBidReqPage"] = String(vars["BidStatusBidReqPage"]).trim();
    expect(String(vars["BidStatusBidReqPage"])).toBe("Committed");
    await page.locator("//button[contains(text(),\"$|BidReqIdPriceOffered|\")]").click();
    await page.locator("//div[contains(@aria-label,\"Status:\")]//h5").waitFor({ state: 'visible' });
    vars["StatusBidReqDetails"] = await page.locator("//div[contains(@aria-label,\"Status:\")]//h5").textContent() || '';
    expect(String(vars["StatusBidReqDetails"])).toBe("Committed");
    // Write to test data profile: "RequestIDfrom22-3.1" = vars["BidReqIdPriceOffered"]
    // TODO: Test data profile writes need custom implementation
  });
});
