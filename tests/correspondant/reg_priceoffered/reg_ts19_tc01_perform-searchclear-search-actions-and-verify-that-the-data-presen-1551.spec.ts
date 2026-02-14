import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_PriceOffered', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS19_TC01_Perform search/Clear search actions and verify that the data present in the list screen', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").click();
    vars["ThreeDigitBidId"] = "874";
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["ThreeDigitBidId"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["count"] = "1";
    vars["Count"] = "1";
    vars["PageCount"] = await page.locator("//div[@aria-label=\"Pagination Controls\"]//span[@aria-atomic=\"true\"]").textContent() || '';
    vars["PageCount"] = String(vars["PageCount"]).substring(10);
    while (parseFloat(String(vars["count"])) <= parseFloat(String("2"))) {
      vars["BidReqIdPriceOffered"] = String(await page.locator("//a[contains(@aria-label, \"View details for price offered\")]\n").count());
      while (parseFloat(String(vars["Count"])) <= parseFloat(String(vars["BidReqIdPriceOffered"]))) {
        vars["IndividualBidReqIds"] = await page.locator("(//a[contains(@aria-label, \"View details for price offered\")])[$|Count|]\n").textContent() || '';
        expect(String(vars["IndividualBidReqId's"])).toBe(vars["ThreeDigitBidId"]);
        vars["Count"] = (parseFloat(String("1")) + parseFloat(String(vars["Count"]))).toFixed(0);
      }
      if (true) /* Element Go to Next Page Button is enabled */ {
        await page.locator("//button[@aria-label=\"Go to Next Page\"]//span").click();
        vars["Count"] = (parseFloat(String(vars["Count"])) - parseFloat(String("19"))).toFixed(0);
      }
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").clear();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["FirstBidReqId"] = await page.locator("//td[@data-title=\"Bid Req. ID\"]").textContent() || '';
    vars["FirstBidReqId"] = String(vars["FirstBidReqId"]).trim();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").click();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["FirstBidReqId"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["CountBidReqIdPriceOffered"] = String(await page.locator("//a[contains(@aria-label, \"View details for price offered\")]\n").count());
    vars["Count1"] = "1";
    while (parseFloat(String(vars["Count1"])) <= parseFloat(String(vars["CountBidReqIdPriceOffered"]))) {
      vars["IndividualBidIds"] = await page.locator("(//a[contains(@aria-label, \"View details for price offered\")])[$|Count1|]").textContent() || '';
      expect(String(vars["IndividualBidIds"])).toBe(vars["FirstBidReqId"]);
      vars["Count1"] = (parseFloat(String("1")) + parseFloat(String(vars["Count1"]))).toFixed(0);
    }
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").clear();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["CountBidReqIdPriceOffered"] = String(await page.locator("//a[contains(@aria-label, \"View details for price offered\")]\n").count());
    expect(String(vars["CountBidReqIdPriceOffered"])).toBe("2");
  });
});
