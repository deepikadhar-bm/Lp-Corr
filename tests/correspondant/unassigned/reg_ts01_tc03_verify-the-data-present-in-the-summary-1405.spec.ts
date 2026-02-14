import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS01_TC03_Verify the data present in the summary..', async ({ page }) => {
    // Prerequisite: REG_TS01_TC02_For bids with two execution types, verify that two records are created in the Price Of
    // TODO: Ensure prerequisite test passes first

    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    vars["count"] = "1";
    vars["TotalRowCount(price offered screen1)"] = String(await page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"])[position() >=2 and position()<=last()]").count());
    vars["ExpectedProductCode"] = "FN30";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["TotalRowCount(price offered screen1)"]))) {
      vars["ExecutionType1(price offered screen)"] = await page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Execution Type\"]/div)[$|count|]").textContent() || '';
      if (String(vars["ExecutionType1(price offered screen)"]).includes(String("STANDARD"))) {
        await page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Bid Req. ID\"]/a)[$|count|]").click();
        await page.locator("//button[text()[normalize-space() = \"Get Price\"]]").waitFor({ state: 'visible' });
        await expect(page.locator("//div[@id=\"price-offered-details-header\"]//div/div[text()=\"Bid Req. ID\"]/..//h5")).toContainText(vars["RequestID(bid request details)"]);
        await expect(page.locator("//div[@id=\"price-offered-details-header\"]//*[text()=\"Execution Type\"]/..//h5")).toContainText("STANDARD");
        await expect(page.locator("//div[@id=\"price-offered-details-header\"]//div/div[text()=\"CCode\"]/..//h5")).toContainText(vars["CCode(bid request details)"]);
        await expect(page.locator("//div[@id=\"price-offered-details-header\"]//div/div[text()=\"Company\"]/..//h5")).toContainText(vars["Company(bid request details)"]);
        await expect(page.locator("//div[@id=\"price-offered-details-header\"]//div/div[text()=\"Product\"]/..//h5")).toContainText(testData["Expected Product(price offered)"]);
        await expect(page.locator("//div[@id=\"price-offered-details-header\"]//div/div[text()=\"Coupon\"]/..//h5")).toContainText(testData["Expected Coupon(price offered)"]);
        await stepGroups.stepGroup_Getting_Next_Month_From_Current_Month(page, vars);
        vars[""] = new Date(2000, parseInt(String("FullNextMonthName")) - 1, 1).toLocaleString('en-US', { month: 'long' });
        vars["Position"] = String(vars["FullNextMonthName"]).substring(0, parseInt("3"));
        vars["HalfNextMonthName"] = String(vars["SplittedNextMonthName"]).split(",")["1"] || '';
        await expect(page.locator("//div[@id=\"price-offered-details-header\"]//div/div[text()=\"Sec. Month\"]/..//h5")).toContainText(vars["HalfNextMonthName"]);
        await expect(page.locator("//div[@id=\"price-offered-details-header\"]//div/div[text()=\"Current Market\"]/..//h5")).toContainText("-");
        await expect(page.locator("//div[@id=\"price-offered-details-header\"]//div/div[text()=\"Current Market Diff\"]/..//h5")).toContainText("-");
        await expect(page.locator("//span[text()[normalize-space() = \"Administration\"]]")).toBeVisible();
        await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
        await page.locator("//a[@aria-label=\"General Settings\"]//span[text()=\"General Settings\"]").click();
        await page.locator("//a[@href=\"#/admin/general-settings/market-thresholds\"]").click();
        await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
        vars["MinDisplayValue"] = await page.locator("//div[text()=\" FN30 \"]/../..//td[@data-title=\"Min Display Value\"]//div").textContent() || '';
        vars["MinDisplayValue"] = String(vars["MinDisplayValue"]).split("%")["1"] || '';
        vars["MaxDisplayValue"] = await page.locator("//td[@data-title=\"Security Product\"]//div[contains(text(),\"$|ExpectedProductCode|\")]/../..//td[@data-title=\"Max Display Value\"]").textContent() || '';
        vars["MaxDisplayValue"] = String(vars["MaxDisplayValue"]).split("%")["1"] || '';
        vars["MinMaxThreshold(expected)"] = vars["MinDisplayValue"] + "/" + vars["MaxDisplayValue"];
        await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
        await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
        await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
        await expect(page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]")).toBeVisible();
        await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["RequestIDDetails"]);
        await page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Bid Req. ID\"]/a)[1]").click();
        await page.locator("//div[@id=\"price-offered-details-header\"]//div/div[text()=\"Min/Max Threshold\"]/..//h5").waitFor({ state: 'visible' });
        await expect(page.locator("//div[@id=\"price-offered-details-header\"]//div/div[text()=\"Min/Max Threshold\"]/..//h5")).toContainText(vars["MinMaxThreshold(expected)"]);
        await page.locator("//div[contains(@id,\"price-offered-back\")]//i").click();
        await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      }
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
  });
});
