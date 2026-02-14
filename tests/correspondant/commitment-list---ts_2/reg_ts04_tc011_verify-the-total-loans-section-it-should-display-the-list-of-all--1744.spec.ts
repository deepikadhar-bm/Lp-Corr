import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Commitment List - TS_2', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS04_TC01.1_Verify the Total loans section, It should display the list of all the loans present in Price offered module', async ({ page }) => {
    // Prerequisite: REG_TS04_TC01_Verify the Total loans section, It should display the list of all the loans present in
    // TODO: Ensure prerequisite test passes first

    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//input[@id='searchTagInput']").click();
    await page.locator("//input[@id='searchTagInput']").fill(vars["BidReqId"]);
    await page.locator("//span[normalize-space(text())=\"Bid Request ID\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())=\"$|BidReqId|\"]//ancestor::tr//td[@data-title=\"Comm. ID\"]").click();
    await page.locator("//div[text()[normalize-space() = \"Total Loans\"]]").waitFor({ state: 'visible' });
    await page.locator("//div[text()[normalize-space() = \"Total Loans\"]]").click();
    await page.locator("//div[@aria-label=\"Sort by Last Name\"]").waitFor({ state: 'visible' });
    await page.locator("//div[@aria-label=\"Sort by Last Name\"]").click();
    await page.locator("//div[contains(text(),\"Last Name\")]//following::span[contains(@class,\"fas small px-1 fa-sort-down\")]").waitFor({ state: 'visible' });
    vars["TotalLoans"] = String(await page.locator("//td[@data-title=\"Corr. Loan#\"]").count());
    vars["count"] = "1";
    for (let dataIdx = -1; dataIdx <= parseInt(vars["TotalLoans"]); dataIdx++) {
      if (String(testData["Locked Loan"]) === String("Yes")) {
        await expect(page.locator("//button[text()=\"@|Corr Loan Num|\"]//ancestor::tr//span[contains(@class,\"fa fas fa-lock lock-icon\")]")).toBeVisible();
        await expect(page.locator("//button[text()=\"@|Corr Loan Num|\"]//ancestor::tr//div[@class=\"commit-order\"]")).toContainText(testData["Commitment Order"]);
      }
      await expect(page.locator("(//tbody//tr[$|count|]//td[@data-title=\"Corr. Loan#\"]//button)[1]")).toContainText(testData["Corr Loan Num"]);
      await expect(page.locator("//tbody//tr[$|count|]//td[@data-title=\"Last Name\"]")).toContainText(testData["Last Name"]);
      await expect(page.locator("//tbody//tr[$|count|]//td[@data-title=\"Loan Amount\"]")).toContainText(testData["Loan Amount"]);
      await expect(page.locator("//tbody//tr[$|count|]//td[@data-title=\"Int. Rate\"]")).toContainText(testData["Interest Rate"]);
      await expect(page.locator("//tbody//tr[$|count|]//td[@data-title=\"Ref Sec Prod.\"]")).toContainText(testData["Ref Sec Prod"]);
      await expect(page.locator("//tbody//tr[$|count|]//td[@data-title=\"Ref Sec Price\"]")).toContainText(testData["Ref Sec Price"]);
      await expect(page.locator("//tbody//tr[$|count|]//td[@data-title=\"Gross Price\"]")).toContainText(testData["Gross Price"]);
      await expect(page.locator("//tbody//tr[$|count|]//td[@data-title=\"Hedge Ratio\"]")).toContainText(testData["Hedge Ratio"]);
      await expect(page.locator("//tbody//tr[$|count|]//td[@data-title=\"Mark Adj\"]")).toContainText(testData["Mark Adj"]);
      await expect(page.locator("//tbody//tr[$|count|]//td[@data-title=\"Curr Gross\"]")).toContainText(testData["Current Gross Price"]);
      vars["count"] = (parseFloat(String(vars["count"])) + parseFloat(String("1"))).toFixed(0);
    }
  });
});
