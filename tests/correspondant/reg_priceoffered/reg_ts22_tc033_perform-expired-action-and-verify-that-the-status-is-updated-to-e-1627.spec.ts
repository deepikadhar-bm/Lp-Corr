import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_PriceOffered', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS22_TC03.3_Perform Expired action and verify that the status is updated to Expired and other execution type is not updated', async ({ page }) => {
    // Prerequisite: REG_TS22_TC03.2_Perform commit action and verify that the status is updated to committed when all th
    // TODO: Ensure prerequisite test passes first

    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdPriceOffered"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//button[@aria-label=\"Expire Pricing\"]//span").click();
    await page.locator("//button[@aria-label=\"Yes, Expire\"]").waitFor({ state: 'visible' });
    await page.locator("//button[@aria-label=\"Yes, Expire\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["BidStatusChasePriceOffered"] = await page.locator("//td[@data-title=\"Execution Type\"]//div[contains(text(),\"CHASE_DIRECT\")]//ancestor::tr//td[@data-title=\"Status\"]").textContent() || '';
    vars["BidStatusChasePriceOffered"] = String(vars["BidStatusChasePriceOffered"]).trim();
    expect(String(vars["BidStatusChasePriceOffered"])).toBe("Committed");
    vars["BidStatusStandardPriceOffered"] = await page.locator("//td[@data-title=\"Execution Type\"]//div[contains(text(),\"STANDARD\")]//ancestor::tr//td[@data-title=\"Status\"]").textContent() || '';
    vars["BidStatusStandardPriceOffered"] = String(vars["BidStatusStandardPriceOffered"]).trim();
    expect(String(vars["BidStatusStandardPriceOffered"])).toBe("Expired");
    await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdPriceOffered"]);
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
