import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_PriceOffered', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS03_TC02_Verify the Get price action can be performed when the status is partially committed', async ({ page }) => {
    // Prerequisite: REG_TS03_TC01_Verify the Get price action can be performed when the status is price offered
    // TODO: Ensure prerequisite test passes first

    await expect(page.locator("(//input[@type=\"checkbox\" and contains(@aria-label,\"Select loan\")])[1]")).toBeVisible();
    await expect(page.locator("(//input[@type=\"checkbox\" and contains(@aria-label,\"Select loan\")])[1]")).toBeVisible();
    await page.locator("(//input[@type=\"checkbox\" and contains(@aria-label,\"Select loan\")])[1]").check();
    await expect(page.locator("(//input[@type=\"checkbox\" and contains(@aria-label,\"Select loan\")])[1]")).toBeVisible();
    await expect(page.locator("//div[@id=\"page-footer\"]/div//button[@id=\"commitdropdownMenuButton\"]")).toBeVisible();
    await page.locator("//div[@id=\"page-footer\"]/div//button[@id=\"commitdropdownMenuButton\"]").click();
    await page.locator(" //div[@class=\"modal-header\"]//h5[contains(text(), \" Commit Selected Loans \")] ").waitFor({ state: 'visible' });
    await expect(page.locator(" //div[@class=\"modal-header\"]//h5[contains(text(), \" Commit Selected Loans \")] ")).toContainText("Commit Selected Loans");
    await expect(page.getByText("Selecting “Yes, Commit” is confirmation of entering a Mandatory Commitment along with the pair-off risks associated with not meeting the conditions of the commitment.")).toBeVisible();
    await page.locator("(//div[@class=\"modal-footer\"]/button)[2]").click();
    await page.locator("(//div[@class=\"modal-footer\"]/button)[2]").waitFor({ state: 'hidden' });
    await expect(page.locator("//div[@class=\"modal-body\"]/div\n\n")).toContainText("updated successfully");
    await page.locator("//div[@class=\"modal-footer\"]//button[contains(text(), \"Okay\")]").click();
    // [DISABLED] Wait until the element Spinner is not visible
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.waitForLoadState('networkidle');
    await page.locator("//div[contains(@id,\"price-offered-back\")]//i").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").clear();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["RequestIDDetails"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Status\"])[1]")).toContainText("Partially Committed");
    await page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Bid Req. ID\"]/a)[1]").click();
    await page.waitForLoadState('networkidle');
    await stepGroups.stepGroup_Price_offered_Details_Screen_Verification_Price_details_and_(page, vars);
    await page.locator("//button[text()[normalize-space() = \"Get Price\"]]").click();
    await page.waitForLoadState('networkidle');
    vars["CurrentMarketValue"] = await page.locator("//div[@id=\"price-offered-details-header\"]//div/div[text()=\"Current Market\"]/..//h5").textContent() || '';
    vars["CurrentMarketValue"] = String(vars["CurrentMarketValue"]).trim();
    // TODO: Regex verification with empty pattern
    // Action: Verify if the text CurrentMarketValue matches the pattern ^\d+\.\d{3}$
    vars["CurrentMarketDiffValue"] = await page.locator("//div[@id=\"price-offered-details-header\"]//div/div[text()=\"Current Market Diff\"]/..//h5").textContent() || '';
    vars["CurrentMarketDiffValue"] = String(vars["CurrentMarketDiffValue"]).trim();
    // TODO: Regex verification with empty pattern
    // Action: Verify if the text CurrentMarketDiffValue matches the pattern ^[+-]?\d+\.\d{3}$
    vars["count1"] = "1";
    vars["TotalRowsCountValue"] = String(await page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"])[position() >=2 and position()<=last()]").count());
    while (parseFloat(String(vars["count1"])) <= parseFloat(String(vars["TotalRowsCountValue"]))) {
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
    // Write to test data profile: "RequestIDCreated3rdScenario" = vars["RequestIDDetails"]
    // TODO: Test data profile writes need custom implementation
  });
});
