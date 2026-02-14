import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS02_TC04.1_Verify the table data', async ({ page }) => {
    // Prerequisite: REG_TS02_TC04_Verify the table data
    // TODO: Ensure prerequisite test passes first

    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").waitFor({ state: 'visible' });
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["RequestIDDetails"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["count"] = "1";
    await page.locator("//td[@data-title=\"Execution Type\"]//div[contains(text(),\"CHASE_DIRECT\")]//ancestor::tr//td[@data-title=\"Bid Req. ID\"]//a[contains(@aria-label,\"View details for\")]").click();
    await page.locator("//th[@aria-label=\"Corr. Loan#\"]//span[contains(@class, 'small') and contains(@class, 'fa-sort')]/preceding-sibling::div").waitFor({ state: 'visible' });
    vars["ExecutionType(price offered screen1)"] = await page.locator("//div[@id=\"price-offered-details-header\"]//div[text()=\"Execution Type\"]/..//h5").textContent() || '';
    expect(String(vars["ExecutionType(price offered screen1)"])).toBe("CHASE_DIRECT");
    vars["TotalRowCount(price offered screen)"] = String(await page.locator("//table//td[@data-title=\"Corr. Loan#\"]/div").count());
    await page.locator("//th[@aria-label=\"Corr. Loan#\"]//span[contains(@class, 'small') and contains(@class, 'fa-sort')]/preceding-sibling::div").click();
    await page.locator("//div[text()=\" Corr. Loan# \"]/..//span[@class=\"fas small px-1 fa-sort-down\"]").waitFor({ state: 'visible' });
    vars["count1"] = "1";
    while (parseFloat(String(vars["count1"])) <= parseFloat(String(vars["TotalRowCount(price offered screen)"]))) {
      for (let dataIdx = parseInt(vars["count1"]); dataIdx <= parseInt(vars["count1"]); dataIdx++) {
        await expect(page.locator("(//table//td[@data-title=\"Corr. Loan#\"]/div)[$|count1|]")).toContainText(testData["Loan Number (ChaseDirect)"]);
        await expect(page.locator("(//table//td[@data-title=\"Last Name\"]/div)[$|count1|]")).toContainText(testData["Last Name(Chase Direct)"]);
        await expect(page.locator("(//table//td[@data-title=\"Loan Amount\"]/div)[$|count1|]")).toContainText(testData["Loan Amount(Chase Direct)"]);
      }
      vars["InterestRateFromTable"] = await page.locator("( //table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Int. Rate\"])[$|count1|]").textContent() || '';
      vars["InterestRateFromTable"] = String(vars["InterestRateFromTable"]).trim();
      // TODO: Regex verification with empty pattern
      // Action: Verify if the text InterestRateFromTable matches the pattern ^\d+\.\d{3}%$
      vars["Product(price offered screen)"] = await page.locator("//div[@id=\"price-offered-details-header\"]//div/div[text()=\"Product\"]/..//h5").textContent() || '';
      await expect(page.locator("(//table//td[@data-title=\"Ref Sec Prod.\"]/div)[$|count1|]")).toContainText(vars["Product(price offered screen)"]);
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
    await page.locator("//div[contains(@id,\"price-offered-back\")]//i").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Execution Type\"]//div[contains(text(),\"STANDARD\")]//ancestor::tr//td[@data-title=\"Bid Req. ID\"]//a[contains(@aria-label,\"View details \")]").click();
    await page.locator("//th[@aria-label=\"Corr. Loan#\"]//span[contains(@class, 'small') and contains(@class, 'fa-sort')]/preceding-sibling::div").waitFor({ state: 'visible' });
    await page.locator("//th[@aria-label=\"Corr. Loan#\"]//span[contains(@class, 'small') and contains(@class, 'fa-sort')]/preceding-sibling::div").click();
    await page.locator("//div[text()=\" Corr. Loan# \"]/..//span[@class=\"fas small px-1 fa-sort-down\"]").waitFor({ state: 'visible' });
    vars["TotalRowCount(price offered screen)"] = String(await page.locator("//table//td[@data-title=\"Corr. Loan#\"]/div").count());
    vars["ExecutionType(price offered screen1)"] = await page.locator("//div[@id=\"price-offered-details-header\"]//div[text()=\"Execution Type\"]/..//h5").textContent() || '';
    expect(String(vars["ExecutionType(price offered screen1)"])).toBe("STANDARD");
    vars["count1"] = "1";
    while (parseFloat(String(vars["count1"])) <= parseFloat(String(vars["TotalRowCount(price offered screen)"]))) {
      for (let dataIdx = parseInt(vars["count1"]); dataIdx <= parseInt(vars["count1"]); dataIdx++) {
        await expect(page.locator("(//table//td[@data-title=\"Corr. Loan#\"]/div)[$|count1|]")).toContainText(testData["Loan Number(Standard)"]);
        await expect(page.locator("(//table//td[@data-title=\"Last Name\"]/div)[$|count1|]")).toContainText(testData["Last Name(Standard)"]);
        await expect(page.locator("(//table//td[@data-title=\"Loan Amount\"]/div)[$|count1|]")).toContainText(testData["Loan Amount(Standard)"]);
      }
      vars["InterestRateFromTable"] = await page.locator("( //table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Int. Rate\"])[$|count1|]").textContent() || '';
      vars["InterestRateFromTable"] = String(vars["InterestRateFromTable"]).trim();
      // TODO: Regex verification with empty pattern
      // Action: Verify if the text InterestRateFromTable matches the pattern ^\d+\.\d{3}%$
      vars["Product(price offered screen)"] = await page.locator("//div[@id=\"price-offered-details-header\"]//div/div[text()=\"Product\"]/..//h5").textContent() || '';
      await expect(page.locator("(//table//td[@data-title=\"Ref Sec Prod.\"]/div)[$|count1|]")).toContainText(vars["Product(price offered screen)"]);
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
  });
});
