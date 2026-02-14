import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_PriceOffered', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS25_TC03_Verify that expire action should not be displayed for the committed status -> Verify for the fresh record that is created recevtly]', async ({ page }) => {
    // Prerequisite: REG_TS25_TC02_Perform expire action for a bid with partially committed status. Also verify that user
    // TODO: Ensure prerequisite test passes first

    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    vars["BidReqIdPriceOffered"] = vars["RequiredBidID"];
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").clear();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdPriceOffered"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Bid Req. ID\"]//a[contains(text(),\"$|BidReqIdPriceOffered|\")]").click();
    await page.locator("//input[contains(@aria-label,\"Select all for\") and @type=\"checkbox\"]").waitFor({ state: 'visible' });
    await page.locator("//input[contains(@aria-label,\"Select all for\") and @type=\"checkbox\"]").check();
    await page.locator("//button[normalize-space(text())=\"Get Price\"]").click();
    await page.locator("//button[@id='commitdropdownMenuButton']").waitFor({ state: 'visible' });
    await page.locator("//button[@id='commitdropdownMenuButton']").click();
    await page.locator("//span[text()=\"Yes, Commit\"]//parent::button").click();
    await page.locator("//button[contains(text(),\"Okay\")]").waitFor({ state: 'visible' });
    await page.locator("//button[contains(text(),\"Okay\")]").click();
    await page.locator("//i[contains(@class,'fa-arrow-left')]").click();
    await page.reload();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdPriceOffered"]);
    await page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//td[@data-title=\"Status\"]//span").waitFor({ state: 'visible' });
    vars["BidStatusPriceOfferedPage"] = await page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//td[@data-title=\"Status\"]//span").textContent() || '';
    vars["BidStatusPriceOfferedPage"] = String(vars["BidStatusPriceOfferedPage"]).trim();
    expect(String(vars["BidStatusPriceOfferedPage"])).toBe("Committed");
    await expect(page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//button[@aria-label=\"Expire Pricing\"]//span")).toBeVisible();
    await stepGroups.stepGroup_Add_Early_Config_With_Current_Est_Time(page, vars);
    await page.waitForTimeout(120000);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").clear();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdPriceOffered"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String("5"))) {
      await page.locator("//h3[text()[normalize-space() = \"Price Offered\"]]").click();
      await page.waitForTimeout(60000);
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    vars["BidStatusPriceOfferedPage"] = await page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//td[@data-title=\"Status\"]//span").textContent() || '';
    vars["BidStatusPriceOfferedPage"] = String(vars["BidStatusPriceOfferedPage"]).trim();
    expect(String(vars["BidStatusPriceOfferedPage"])).toBe("Committed");
    await stepGroups.stepGroup_Deleting_Early_Config_Report_If_Present(page, vars);
  });
});
