import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS02_TC04_Verify the table data', async ({ page }) => {
    // Prerequisite: REG_TS02_TC03_Verify the data present in the summary
    // TODO: Ensure prerequisite test passes first

    await page.locator("//a[@href=\"#/bid-requests\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]")).toBeVisible();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["RequestIDDetails"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Bid Req. ID\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["ExecutionTypeCheck"] = await page.locator("(//div[text()=\" Execution Type \"]/..//h5)[1]").textContent() || '';
    vars["SuccessStatusCount(table1)"] = String(await page.locator("(//table)[1]//tr[@role=\"row\"]//td[@data-title=\"Loan Status\"]//div[text()[normalize-space() = \"Success\"]]").count());
    await page.locator("//th[@aria-label=\"Corr. Loan#\"]//span[contains(@class, 'small') and contains(@class, 'fa-sort')]/preceding-sibling::div").click();
    await page.locator("//div[text()=\" Corr. Loan# \"]/..//span[@class=\"fas small px-1 fa-sort-down\"]").waitFor({ state: 'visible' });
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["SuccessStatusCount(table1)"]))) {
      await page.locator("//div[@aria-label=\"Request ID Label\"]/..//h5").click();
      for (let dataIdx = parseInt(vars["count"]); dataIdx <= parseInt(vars["count"]); dataIdx++) {
        vars["LoanNumber(table1)"] = await page.locator("((//table)[1]//tr[@role=\"row\"]//td[@data-title=\"Loan Status\"]//div[text()[normalize-space() = \"Success\"]]/../..//td[@data-title=\"Corr. Loan#\"])[$|count|]").textContent() || '';
        vars["LoanNumber(table1)"] = String(vars["LoanNumber(table1)"]).substring(0, String(vars["LoanNumber(table1)"]).length - 7);
        // Write to test data profile: "Loan Number(Standard)" = vars["LoanNumber(table1)"]
        // TODO: Test data profile writes need custom implementation
        // [DISABLED] Click on Last Name Sort Button
        // await page.locator("//div[@aria-label=\"Sort by Last Name\"]").click();
        // [DISABLED] Wait until the element Last Name Down Arrow Sort is visible
        // await page.locator("//div[text()=\" Last Name \"]/..//span[@class=\"fas small px-1 fa-sort-down\"]").waitFor({ state: 'visible' });
        vars["LastName(table1)"] = await page.locator("((//table)[1]//tr[@role=\"row\"]//td[@data-title=\"Loan Status\"]//div[text()[normalize-space() = \"Success\"]]/ancestor::tr//td[@data-title=\"Last Name\"]/div)[$|count|]").textContent() || '';
        // Write to test data profile: "Last Name(Standard)" = vars["LastName(table1)"]
        // TODO: Test data profile writes need custom implementation
        // [DISABLED] Click on Loan Amount Sort Button
        // await page.locator("//div[@aria-label=\"Sort by Loan Amount\"]").click();
        // [DISABLED] Wait until the element Loan Amount Down Arrow Sort is visible
        // await page.locator("//div[text()=\" Loan Amount \"]/..//span[@class=\"fas small px-1 fa-sort-down\"]").waitFor({ state: 'visible' });
        vars["LoanAmount(table1)"] = await page.locator("((//table)[1]//tr[@role=\"row\"]//td[@data-title=\"Loan Status\"]//div[text()[normalize-space() = \"Success\"]]/../..//td[@data-title=\"Loan Amount\"])[$|count|]").textContent() || '';
        // Write to test data profile: "Loan Amount(Standard)" = vars["LoanAmount(table1)"]
        // TODO: Test data profile writes need custom implementation
      }
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    vars["ExecutionTypeCheck"] = await page.locator("(//div[text()=\" Execution Type \"]/..//h5)[2]").textContent() || '';
    vars["SuccessStatusCount(table2)"] = String(await page.locator("(//table)[2]//tr[@role=\"row\"]//td[@data-title=\"Loan Status\"]//div[text()[normalize-space() = \"Success\"]]").count());
    // [DISABLED] Click on Loan Number Sort Button 2
    // await page.locator("(//th[@aria-label=\"Corr. Loan#\"]//span[contains(@class, 'small') and contains(@class, 'fa-sort')]/preceding-sibling::div)[2]").click();
    // [DISABLED] Wait until the element Spinner is not visible
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["SuccessStatusCount(table2)"]))) {
      await page.locator("//div[@aria-label=\"Request ID Label\"]/..//h5").click();
      for (let dataIdx = parseInt(vars["count"]); dataIdx <= parseInt(vars["count"]); dataIdx++) {
        vars["LoanNumber(table2)"] = await page.locator("((//table)[2]//tr[@role=\"row\"]//td[@data-title=\"Loan Status\"]//div[text()[normalize-space() = \"Success\"]]/../..//td[@data-title=\"Corr. Loan#\"])[$|count|]").textContent() || '';
        vars["LoanNumber(table2)"] = String(vars["LoanNumber(table2)"]).substring(0, String(vars["LoanNumber(table2)"]).length - 7);
        // Write to test data profile: "Loan Number (ChaseDirect)" = vars["LoanNumber(table2)"]
        // TODO: Test data profile writes need custom implementation
        // [DISABLED] Click on Last Name Sort Button 2
        // await page.locator("(//div[@aria-label=\"Sort by Last Name\"])[2]").click();
        // [DISABLED] Wait until the element Spinner is not visible
        // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
        vars["LastName(table2)"] = await page.locator("((//table)[2]//tr[@role=\"row\"]//td[@data-title=\"Loan Status\"]//div[text()[normalize-space() = \"Success\"]]/ancestor::tr//td[@data-title=\"Last Name\"]/div)[$|count|]").textContent() || '';
        // Write to test data profile: "Last Name(Chase Direct)" = vars["LastName(table2)"]
        // TODO: Test data profile writes need custom implementation
        // [DISABLED] Click on Loan Amount Sort Button 2
        // await page.locator("(//div[@aria-label=\"Sort by Loan Amount\"])[2]").click();
        // [DISABLED] Wait until the element Spinner is not visible
        // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
        vars["LoanAmount(table2)"] = await page.locator("((//table)[2]//tr[@role=\"row\"]//td[@data-title=\"Loan Status\"]//div[text()[normalize-space() = \"Success\"]]/../..//td[@data-title=\"Loan Amount\"])[$|count|]").textContent() || '';
        // Write to test data profile: "Loan Amount(Chase Direct)" = vars["LoanAmount(table2)"]
        // TODO: Test data profile writes need custom implementation
      }
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
  });
});
