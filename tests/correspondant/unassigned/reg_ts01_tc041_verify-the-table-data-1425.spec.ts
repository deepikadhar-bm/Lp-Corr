import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS01_TC04.1_Verify the table data..', async ({ page }) => {
    // Prerequisite: REG_TS01_TC04_Verify the table data..
    // TODO: Ensure prerequisite test passes first

    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]")).toBeVisible();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["RequestIDDetails"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["TotalRowCountValue"] = String(await page.locator("//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Bid Req. ID\"]").count());
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["TotalRowCountValue"]))) {
      vars["ExecutionType(price offered screen1)"] = await page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Execution Type\"]/div)[$|count|]").textContent() || '';
      if (String(vars["ExecutionType(price offered screen1)"]).includes(String("STANDARD"))) {
        await page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Bid Req. ID\"])[$|count|]").click();
        await page.waitForLoadState('networkidle');
        vars["TotalRowCount(price offered screen)"] = String(await page.locator("//table//td[@data-title=\"Corr. Loan#\"]/div").count());
        await page.locator("//th[@aria-label=\"Corr. Loan#\"]//span[contains(@class, 'small') and contains(@class, 'fa-sort')]/preceding-sibling::div").click();
        await page.locator("//div[text()=\" Corr. Loan# \"]/..//span[@class=\"fas small px-1 fa-sort-down\"]").waitFor({ state: 'visible' });
        await page.waitForLoadState('networkidle');
        vars["count1"] = "1";
        while (parseFloat(String(vars["count1"])) <= parseFloat(String(vars["TotalRowCount(price offered screen)"]))) {
          await page.locator("//div[text()=\"Bid Req. ID\"]//following-sibling::h5").click();
          for (let dataIdx = parseInt(vars["count1"]); dataIdx <= parseInt(vars["count1"]); dataIdx++) {
            await expect(page.locator("(//table//td[@data-title=\"Corr. Loan#\"]/div)[$|count1|]")).toContainText(testData["Loan Number(Standard)"]);
            // [DISABLED] Click on Last Name Sort Button
            // await page.locator("//div[@aria-label=\"Sort by Last Name\"]").click();
            // [DISABLED] Wait until the current page is loaded completely
            // await page.waitForLoadState('networkidle');
            // [DISABLED] Wait until the element Last Name Down Arrow Sort is visible
            // await page.locator("//div[text()=\" Last Name \"]/..//span[@class=\"fas small px-1 fa-sort-down\"]").waitFor({ state: 'visible' });
            await expect(page.locator("(//table//td[@data-title=\"Last Name\"]/div)[$|count1|]")).toContainText(testData["Last Name(Standard)"]);
            // [DISABLED] Click on Loan Amount Sort Button
            // await page.locator("//div[@aria-label=\"Sort by Loan Amount\"]").click();
            // [DISABLED] Wait until the current page is loaded completely
            // await page.waitForLoadState('networkidle');
            // [DISABLED] Wait until the element Loan Amount Down Arrow Sort is visible
            // await page.locator("//div[text()=\" Loan Amount \"]/..//span[@class=\"fas small px-1 fa-sort-down\"]").waitFor({ state: 'visible' });
            await expect(page.locator("(//table//td[@data-title=\"Loan Amount\"]/div)[$|count1|]")).toContainText(testData["Loan Amount(Standard)"]);
          }
          vars["InterestRateFromTable"] = await page.locator("( //table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Int. Rate\"])[$|count1|]").textContent() || '';
          vars["InterestRateFromTable"] = String(vars["InterestRateFromTable"]).trim();
          // TODO: Regex verification with empty pattern
          // Action: Verify if the text InterestRateFromTable matches the pattern ^\d+\.\d{3}%$
          vars["ProductPriceOfferedScreen"] = await page.locator("//div[@id=\"price-offered-details-header\"]//div/div[text()=\"Product\"]/..//h5").textContent() || '';
          vars["ProductPriceOfferedScreen"] = String(vars["ProductPriceOfferedScreen"]).trim();
          await expect(page.locator("(//table//td[@data-title=\"Ref Sec Prod.\"]/div)[$|count1|]")).toContainText(vars["ProductPriceOfferedScreen"]);
          vars["ReferencePriceFromTable"] = await page.locator("( //table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Ref Sec Price\"]/div)[$|count1|]").textContent() || '';
          vars["ReferencePriceFromTable"] = String(vars["ReferencePriceFromTable"]).trim();
          // TODO: Regex verification with empty pattern
          // Action: Verify if the text ReferencePriceFromTable matches the pattern ^\d+\.\d{3}$
          vars["GrossPriceFromTable"] = await page.locator("( //table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Gross Price\"]/div)[$|count1|]").textContent() || '';
          vars["GrossPriceFromTable"] = String(vars["GrossPriceFromTable"]).trim();
          // TODO: Regex verification with empty pattern
          // Action: Verify if the text GrossPriceFromTable matches the pattern ^\d+\.\d{3}$
          vars["HedgeRationFromTable"] = await page.locator("( //table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Hedge Ratio\"]/div)[$|count1|]").textContent() || '';
          vars["HedgeRationFromTable"] = String(vars["HedgeRationFromTable"]).trim();
          // TODO: Regex verification with empty pattern
          // Action: Verify if the text HedgeRationFromTable matches the pattern ^\d+\.\d{3}$
          await expect(page.locator(" (//table//td[@data-title=\"Mark Adj\"])[$|count1|]")).toContainText("-");
          await expect(page.locator(" (//table//td[@data-title=\"Curr Gross\"])[$|count1|]")).toContainText("-");
          vars["count1"] = (parseFloat(String("1")) + parseFloat(String(vars["count1"]))).toFixed(0);
        }
      }
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
  });
});
