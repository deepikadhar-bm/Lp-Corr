import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_PriceOffered', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS22_TC01.2_Perform commit action and verify that the status is updated to partially committed when few loans from the bid is committed(Two Execution Type)', async ({ page }) => {
    // Prerequisite: REG_TS02_TC01.1_Perform submit for pricing action, and then verify the status should be updated to p
    // TODO: Ensure prerequisite test passes first

    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["BidReqIdPriceOffered"] = vars["RequestIDDetails"];
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdPriceOffered"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Commits_an_Fresh_Loan_Num_Chase_Direct(page, vars);
    await page.locator("//div[@id=\"price-offered-list-tabs\"]/div//span[text()=\"All Loans\"]").click();
    await page.waitForLoadState('networkidle');
    vars["CommittedLoanNumChaseDirect"] = await page.locator("//div[@aria-label=\"Locked loan\"]/../..//td[@data-title=\"Corr. Loan#\"]").textContent() || '';
    await page.locator("//i[contains(@class,'fa-arrow-left')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["BidStatusChasePriceOffered"] = await page.locator("//td[@data-title=\"Execution Type\"]//div[contains(text(),\"CHASE_DIRECT\")]//ancestor::tr//td[@data-title=\"Status\"]").textContent() || '';
    vars["BidStatusChasePriceOffered"] = String(vars["BidStatusChasePriceOffered"]).trim();
    expect(String(vars["BidStatusChasePriceOffered"])).toBe("Partially Committed");
    vars["BidStatusStandardPriceOffered"] = await page.locator("//td[@data-title=\"Execution Type\"]//div[contains(text(),\"STANDARD\")]//ancestor::tr//td[@data-title=\"Status\"]").textContent() || '';
    vars["BidStatusStandardPriceOffered"] = String(vars["BidStatusStandardPriceOffered"]).trim();
    expect(String(vars["BidStatusStandardPriceOffered"])).toBe("Price Offered");
    await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdPriceOffered"]);
    await page.keyboard.press('Enter');
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//button[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//td[@data-title=\"Status\"]//span").waitFor({ state: 'visible' });
    vars["StatusBidReqPage"] = await page.locator("//button[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//td[@data-title=\"Status\"]//span").textContent() || '';
    vars["StatusBidReqPage"] = String(vars["StatusBidReqPage"]).trim();
    expect(String(vars["StatusBidReqPage"])).toBe("Partially Committed");
    await page.locator("//button[contains(text(),\"$|BidReqIdPriceOffered|\")]").click();
    await page.locator("//div[contains(@aria-label,\"Status:\")]//h5").waitFor({ state: 'visible' });
    vars["StatusBidReqDetails"] = await page.locator("//div[contains(@aria-label,\"Status:\")]//h5").textContent() || '';
    expect(String(vars["StatusBidReqDetails"])).toBe("Partially Committed");
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdPriceOffered"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Execution Type\"]//div[contains(text(),\"STANDARD\")]//ancestor::tr//td[@data-title=\"Bid Req. ID\"]//a[contains(@aria-label,\"View details \")]").click();
    await stepGroups.stepGroup_Commits_an_Fresh_Loan_Num_Standard(page, vars);
    await page.locator("//i[contains(@class,'fa-arrow-left')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["BidStatusChasePriceOffered"] = await page.locator("//td[@data-title=\"Execution Type\"]//div[contains(text(),\"CHASE_DIRECT\")]//ancestor::tr//td[@data-title=\"Status\"]").textContent() || '';
    vars["BidStatusChasePriceOffered"] = String(vars["BidStatusChasePriceOffered"]).trim();
    expect(String(vars["BidStatusChasePriceOffered"])).toBe("Partially Committed");
    vars["BidStatusStandardPriceOffered"] = await page.locator("//td[@data-title=\"Execution Type\"]//div[contains(text(),\"STANDARD\")]//ancestor::tr//td[@data-title=\"Status\"]").textContent() || '';
    vars["BidStatusStandardPriceOffered"] = String(vars["BidStatusStandardPriceOffered"]).trim();
    expect(String(vars["BidStatusStandardPriceOffered"])).toBe("Partially Committed");
    await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdPriceOffered"]);
    await page.keyboard.press('Enter');
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//button[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//td[@data-title=\"Status\"]//span").waitFor({ state: 'visible' });
    vars["StatusBidReqPage"] = await page.locator("//button[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//td[@data-title=\"Status\"]//span").textContent() || '';
    vars["StatusBidReqPage"] = String(vars["StatusBidReqPage"]).trim();
    expect(String(vars["StatusBidReqPage"])).toBe("Partially Committed");
    await page.locator("//button[contains(text(),\"$|BidReqIdPriceOffered|\")]").click();
    await page.locator("//div[contains(@aria-label,\"Status:\")]//h5").waitFor({ state: 'visible' });
    vars["StatusBidReqDetails"] = await page.locator("//div[contains(@aria-label,\"Status:\")]//h5").textContent() || '';
    expect(String(vars["StatusBidReqDetails"])).toBe("Partially Committed");
    // Write to test data profile: "RequestIDfrom22-1.2" = vars["BidReqIdPriceOffered"]
    // TODO: Test data profile writes need custom implementation
  });
});
