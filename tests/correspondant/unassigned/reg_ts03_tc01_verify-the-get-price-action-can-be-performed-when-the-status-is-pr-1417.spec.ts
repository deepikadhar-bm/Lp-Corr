import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS03_TC01_Verify the Get price action can be performed when the status is price offered', async ({ page }) => {
    // Prerequisite: REG_TS01_TC01_Perform submit for pricing action, and then verify the status should be updated to pri
    // TODO: Ensure prerequisite test passes first

    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText("Price Offered\r\r")).toBeVisible();
    await expect(page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]")).toBeVisible();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["RequestIDDetails"]);
    // Write to test data profile: "RequestIDCreated3rdScenario" = vars["RequestIDDetails"]
    // TODO: Test data profile writes need custom implementation
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Bid Req. ID\"]/a)[1]").click();
    await page.locator("//div[contains(@id,\"price-offered-back\")]//i").waitFor({ state: 'visible' });
    await expect(page.locator("//div[@id=\"price-offered-details-header\"]//div/div[text()=\"Current Market\"]/..//h5")).toContainText("-");
    await expect(page.locator("//div[@id=\"price-offered-details-header\"]//div/div[text()=\"Current Market Diff\"]/..//h5")).toContainText("-");
    vars["count1"] = "1";
    vars["TotalRowCountInPriceOffered"] = String(await page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"])[position() >=2 and position()<=last()]").count());
    while (parseFloat(String(vars["count1"])) <= parseFloat(String(vars["TotalRowCountInPriceOffered"]))) {
      vars["IntRateValue"] = await page.locator("( //table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Int. Rate\"])[$|count1|]").textContent() || '';
      vars["IntRateValue"] = String(vars["IntRateValue"]).trim();
      // TODO: Regex verification with empty pattern
      // Action: Verify if the text IntRateValue matches the pattern ^\d+\.\d{3}\%$
      vars["RefSecPriceValue"] = await page.locator("( //table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Ref Sec Price\"]/div)[$|count1|]").textContent() || '';
      vars["RefSecPriceValue"] = String(vars["RefSecPriceValue"]).trim();
      // TODO: Regex verification with empty pattern
      // Action: Verify if the text RefSecPriceValue matches the pattern ^\d+\.\d{3}$
      vars["GrossPriceValue"] = await page.locator("( //table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Gross Price\"]/div)[$|count1|]").textContent() || '';
      vars["GrossPriceValue"] = String(vars["GrossPriceValue"]).trim();
      // TODO: Regex verification with empty pattern
      // Action: Verify if the text GrossPriceValue matches the pattern ^\d+\.\d{3}$
      vars["HedgeRatioValue"] = await page.locator("( //table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Hedge Ratio\"]/div)[$|count1|]").textContent() || '';
      vars["HedgeRatioValue"] = String(vars["HedgeRatioValue"]).trim();
      // TODO: Regex verification with empty pattern
      // Action: Verify if the text HedgeRatioValue matches the pattern ^\d+\.\d{3}$
      await expect(page.locator(" (//table//td[@data-title=\"Mark Adj\"])[$|count1|]")).toContainText("-");
      await expect(page.locator(" (//table//td[@data-title=\"Curr Gross\"])[$|count1|]")).toContainText("-");
      vars["count1"] = (parseFloat(String("1")) + parseFloat(String(vars["count1"]))).toFixed(0);
    }
    await page.locator("//button[text()[normalize-space() = \"Get Price\"]]").click();
    await page.waitForLoadState('networkidle');
    await page.locator("//div[@id=\"price-offered-details-header\"]//div/div[text()=\"Remaining Time\"]").waitFor({ state: 'visible' });
    vars["CurrentMarketValue"] = await page.locator("//div[@id=\"price-offered-details-header\"]//div/div[text()=\"Current Market\"]/..//h5").textContent() || '';
    vars["CurrentMarketValue"] = String(vars["CurrentMarketValue"]).trim();
    // TODO: Regex verification with empty pattern
    // Action: Verify if the text CurrentMarketValue matches the pattern ^\d+\.\d{3}$
    vars["CurrentMarketDiffValue"] = await page.locator("//div[@id=\"price-offered-details-header\"]//div/div[text()=\"Current Market Diff\"]/..//h5").textContent() || '';
    vars["CurrentMarketDiffValue"] = String(vars["CurrentMarketDiffValue"]).trim();
    // TODO: Regex verification with empty pattern
    // Action: Verify if the text CurrentMarketDiffValue matches the pattern ^[+-]?\d+\.\d{3}$
    vars["count1"] = "1";
    vars["TotalRowCountInPriceOffered"] = String(await page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"])[position() >=2 and position()<=last()]").count());
    while (parseFloat(String(vars["count1"])) <= parseFloat(String(vars["TotalRowCountInPriceOffered"]))) {
      vars["IntRateValue"] = await page.locator("( //table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Int. Rate\"])[$|count1|]").textContent() || '';
      vars["IntRateValue"] = String(vars["IntRateValue"]).trim();
      // TODO: Regex verification with empty pattern
      // Action: Verify if the text IntRateValue matches the pattern ^\d+\.\d{3}%$
      vars["RefSecPriceValue"] = await page.locator("( //table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Ref Sec Price\"]/div)[$|count1|]").textContent() || '';
      vars["RefSecPriceValue"] = String(vars["RefSecPriceValue"]).trim();
      // TODO: Regex verification with empty pattern
      // Action: Verify if the text RefSecPriceValue matches the pattern ^\d+\.\d{3}$
      vars["GrossPriceValue"] = await page.locator("( //table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Gross Price\"]/div)[$|count1|]").textContent() || '';
      vars["GrossPriceValue"] = String(vars["GrossPriceValue"]).trim();
      // TODO: Regex verification with empty pattern
      // Action: Verify if the text GrossPriceValue matches the pattern ^\d+\.\d{3}$
      vars["HedgeRatioValue"] = await page.locator("( //table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Hedge Ratio\"]/div)[$|count1|]").textContent() || '';
      vars["HedgeRatioValue"] = String(vars["HedgeRatioValue"]).trim();
      // TODO: Regex verification with empty pattern
      // Action: Verify if the text HedgeRatioValue matches the pattern ^\d+\.\d{3}$
      vars["MarkAdjValue"] = await page.locator(" (//table//td[@data-title=\"Mark Adj\"])[$|count1|]").textContent() || '';
      vars["MarkAdjValue"] = String(vars["MarkAdjValue"]).trim();
      // TODO: Regex verification with empty pattern
      // Action: Verify if the text MarkAdjValue matches the pattern ^[+-]?\d+\.\d{3}$
      vars["CurrGrossValue"] = await page.locator(" (//table//td[@data-title=\"Curr Gross\"])[$|count1|]").textContent() || '';
      vars["CurrGrossValue"] = String(vars["CurrGrossValue"]).trim();
      // TODO: Regex verification with empty pattern
      // Action: Verify if the text CurrGrossValue matches the pattern ^\d+\.\d{3}$
      vars["count1"] = (parseFloat(String("1")) + parseFloat(String(vars["count1"]))).toFixed(0);
    }
  });
});
