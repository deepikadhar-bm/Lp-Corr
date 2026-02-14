import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS22_TC03.2_Perform commit action and verify that the status is updated to committed when all the loans from the bid is committed(Two Execution Type)', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    vars["BidReqIdPriceOffered"] = testData["RequestIDfrom22-1.2"];
    await stepGroups.stepGroup_Uncommits_the_Committed_Loans_Two_Exe_Type(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdPriceOffered"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Commit_All_Loans_Chase_Direct(page, vars);
    vars["ExecutionTypePriceOfferedDetails"] = await page.locator("//div[text()=\"Execution Type\"]//following-sibling::h5").textContent() || '';
    vars["ExecutionTypePriceOfferedDetails"] = String(vars["ExecutionTypePriceOfferedDetails"]).trim();
    await page.locator("//i[contains(@class,'fa-arrow-left')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["BidStatusChasePriceOffered"] = await page.locator("//td[@data-title=\"Execution Type\"]//div[contains(text(),\"CHASE_DIRECT\")]//ancestor::tr//td[@data-title=\"Status\"]").textContent() || '';
    vars["BidStatusChasePriceOffered"] = String(vars["BidStatusChasePriceOffered"]).trim();
    expect(String(vars["BidStatusChasePriceOffered"])).toBe("Committed");
    vars["BidStatusStandardPriceOffered"] = await page.locator("//td[@data-title=\"Execution Type\"]//div[contains(text(),\"STANDARD\")]//ancestor::tr//td[@data-title=\"Status\"]").textContent() || '';
    vars["BidStatusStandardPriceOffered"] = String(vars["BidStatusStandardPriceOffered"]).trim();
    expect(String(vars["BidStatusStandardPriceOffered"])).toBe("Price Offered");
    await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdPriceOffered"]);
    await page.keyboard.press('Enter');
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//button[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//td[@data-title=\"Status\"]//span").waitFor({ state: 'visible' });
    vars["StatusBidReqPage"] = await page.locator("//button[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//td[@data-title=\"Status\"]//span").textContent() || '';
    vars["StatusBidReqPage"] = String(vars["StatusBidReqPage"]).trim();
    expect(String(vars["StatusBidReqPage"])).toBe("Committed");
    await page.locator("//button[contains(text(),\"$|BidReqIdPriceOffered|\")]").click();
    await page.locator("//div[contains(@aria-label,\"Status:\")]//h5").waitFor({ state: 'visible' });
    vars["StatusBidReqDetails"] = await page.locator("//div[contains(@aria-label,\"Status:\")]//h5").textContent() || '';
    expect(String(vars["StatusBidReqDetails"])).toBe("Committed");
  });
});
