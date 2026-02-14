import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS01_TC04_Verify the table data..', async ({ page }) => {
    // Prerequisite: REG_TS01_TC03_Verify the data present in the summary..
    // TODO: Ensure prerequisite test passes first

    await page.locator("//li[@class=\"nav-item\"]//a[@href=\"#/bid-requests\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]")).toBeVisible();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").clear();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["RequestIDDetails"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Bid Req. ID\"]").click();
    await page.locator("//th[@aria-label=\"Corr. Loan#\"]//span[contains(@class, 'small') and contains(@class, 'fa-sort')]/preceding-sibling::div").waitFor({ state: 'visible' });
    vars["ExecutionTypeCheck"] = await page.locator("(//div[text()=\" Execution Type \"]/..//h5)[1]").textContent() || '';
    if (String(vars["ExecutionTypeCheck"]).includes(String("Standard"))) {
      await page.locator("//th[@aria-label=\"Corr. Loan#\"]//span[contains(@class, 'small') and contains(@class, 'fa-sort')]/preceding-sibling::div").click();
      await page.locator("//div[text()=\" Corr. Loan# \"]/..//span[@class=\"fas small px-1 fa-sort-down\"]").waitFor({ state: 'visible' });
      await page.waitForLoadState('networkidle');
      vars["SuccessStatusCount(table1)"] = String(await page.locator("(//table)[1]//tr[@role=\"row\"]//td[@data-title=\"Loan Status\"]//div[text()[normalize-space() = \"Success\"]]").count());
      vars["count"] = "1";
      while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["SuccessStatusCount(table1)"]))) {
        for (let dataIdx = parseInt(vars["count"]); dataIdx <= parseInt(vars["count"]); dataIdx++) {
          await page.locator("//div[@aria-label=\"Request ID Label\"]/..//h5").click();
          vars["LoanNumber(table1)"] = await page.locator("((//table)[1]//tr[@role=\"row\"]//td[@data-title=\"Loan Status\"]//div[text()[normalize-space() = \"Success\"]]/../..//td[@data-title=\"Corr. Loan#\"])[$|count|]").textContent() || '';
          vars["LoanNumber(table1)"] = String(vars["LoanNumber(table1)"]).substring(0, String(vars["LoanNumber(table1)"]).length - 7);
          // Write to test data profile: "Loan Number(Standard)" = vars["LoanNumber(table1)"]
          // TODO: Test data profile writes need custom implementation
          // [DISABLED] Click on Last Name Sort Button
          // await page.locator("//div[@aria-label=\"Sort by Last Name\"]").click();
          // [DISABLED] Wait until the current page is loaded completely
          // await page.waitForLoadState('networkidle');
          // [DISABLED] Wait until the element Last Name Down Arrow Sort is visible
          // await page.locator("//div[text()=\" Last Name \"]/..//span[@class=\"fas small px-1 fa-sort-down\"]").waitFor({ state: 'visible' });
          vars["LastName(table1)"] = await page.locator("((//table)[1]//tr[@role=\"row\"]//td[@data-title=\"Loan Status\"]//div[text()[normalize-space() = \"Success\"]]/ancestor::tr//td[@data-title=\"Last Name\"]/div)[$|count|]").textContent() || '';
          // Write to test data profile: "Last Name(Standard)" = vars["LastName(table1)"]
          // TODO: Test data profile writes need custom implementation
          // [DISABLED] Click on Loan Amount Sort Button
          // await page.locator("//div[@aria-label=\"Sort by Loan Amount\"]").click();
          // [DISABLED] Wait until the current page is loaded completely
          // await page.waitForLoadState('networkidle');
          // [DISABLED] Wait until the element Loan Amount Down Arrow Sort is visible
          // await page.locator("//div[text()=\" Loan Amount \"]/..//span[@class=\"fas small px-1 fa-sort-down\"]").waitFor({ state: 'visible' });
          vars["LoanAmount(table1)"] = await page.locator("((//table)[1]//tr[@role=\"row\"]//td[@data-title=\"Loan Status\"]//div[text()[normalize-space() = \"Success\"]]/../..//td[@data-title=\"Loan Amount\"])[$|count|]").textContent() || '';
          // Write to test data profile: "Loan Amount(Standard)" = vars["LoanAmount(table1)"]
          // TODO: Test data profile writes need custom implementation
        }
        vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
      }
    }
  });
});
