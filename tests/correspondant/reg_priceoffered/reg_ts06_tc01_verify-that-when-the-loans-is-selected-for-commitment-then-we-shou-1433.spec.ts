import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_PriceOffered', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS06_TC01_Verify that when the loans is selected for commitment, then we should be able to see the selected loan amount value and commit selected button should have that selected loan count displa', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").waitFor({ state: 'visible' });
    await expect(page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]")).toBeVisible();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(testData["RequestIDCreated1stScenario"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Bid Req. ID\"]/a)[1]").click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator("//button[text()[normalize-space() = \"Get Price\"]]")).toBeVisible();
    await expect(page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"])/th/div//input[@aria-label=\"Select all for \" and @type=\"checkbox\"]")).toBeVisible();
    await expect(page.locator("(//input[@type=\"checkbox\" and contains(@aria-label,\"Select loan\")])[1]")).toBeVisible();
    await page.locator("(//input[@type=\"checkbox\" and contains(@aria-label,\"Select loan\")])[1]").check();
    vars["LoanAmount(table)"] = await page.locator("(//input[@type=\"checkbox\" and contains(@aria-label,\"Select loan\")]/../..//td[@data-title=\"Loan Amount\"])[1]").textContent() || '';
    vars["TotalLoanAmountCount(table)"] = String(await page.locator("(//input[@type=\"checkbox\" and contains(@aria-label,\"Select loan\")]/../..//td[@data-title=\"Loan Amount\"])[1]").count());
    vars["TotalLoanAmount(table)"] = String(vars["LoanAmount(table)"]).replace(/\$/g, '');
    vars["TotalLoanAmount(table)"] = String(vars["TotalLoanAmount(table)"]).replace(/\,/g, '');
    vars["LoanAmount(footer)"] = await page.locator("(//div[@id=\"page-footer\"]//div)[3]/div/small[text()=\"Selected Loan Amt\"]/../../../div/div[@class=\"fw-bold\"]").textContent() || '';
    vars["TotalLoanAmount(footer)"] = String(vars["LoanAmount(footer)"]).replace(/\$/g, '');
    vars["TotalLoanAmount(footer)"] = String(vars["TotalLoanAmount(footer)"]).replace(/\,/g, '');
    expect(String(vars["TotalLoanAmount(table)"])).toBe(vars["TotalLoanAmount(footer)"]);
    vars["LoanAmountCount(footer)"] = await page.locator("//div[@id=\"page-footer\"]/div//button[@id=\"commitdropdownMenuButton\"][@id=\"commitdropdownMenuButton\"]/i/../span").textContent() || '';
    vars["TotalLoanAmountCount(footer)"] = String(vars["LoanAmountCount(footer)"]).replace(/\(/g, '');
    vars["TotalLoanAmountCount(footer)"] = String(vars["TotalLoanAmountCount(footer)"]).replace(/\)/g, '');
    expect(String(vars["TotalLoanAmountCount(table)"])).toBe(vars["TotalLoanAmountCount(footer)"]);
    await expect(page.locator("(//div[@id=\"page-footer\"]//div)[3]/div/small/../../../div/div[@class=\"fw-bold\"]/..")).toContainText("Selected Loan Amt");
    await page.locator("(//input[@type=\"checkbox\" and contains(@aria-label,\"Select loan\")])[1]").uncheck();
    await expect(page.locator("(//input[@type=\"checkbox\" and contains(@aria-label,\"Select loan\")])[1]")).toBeVisible();
    await expect(page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"])/th/div//input[@aria-label=\"Select all for \" and @type=\"checkbox\"]")).toBeVisible();
    await expect(page.locator("//div[@id=\"page-footer\"]/div//button[@id=\"commitdropdownMenuButton\"][@id=\"commitdropdownMenuButton\"]/i/../span")).toBeVisible();
    await expect(page.locator("(//div[@id=\"page-footer\"]//div)[3]/div/small[text()=\"Selected Loan Amt\"]/../../../div/div[@class=\"fw-bold\"]")).toBeVisible();
    await expect(page.locator("(//div[@id=\"page-footer\"]//div)[3]/div/small/../../../div/div[@class=\"fw-bold\"]/..")).toBeVisible();
    vars["checkedboxcount(table)"] = "0";
    vars["total"] = "0";
    vars["count1"] = "1";
    vars["UncheckedCheckBoxCount(table)"] = String(await page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//input[@type=\"checkbox\"])[position()>=2 and position()<=last()]").count());
    while (parseFloat(String(vars["count1"])) <= parseFloat(String(vars["UncheckedCheckBoxCount(table)"]))) {
      await page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//input[@type=\"checkbox\" and not(contains(@aria-label,\"Select all for \"))])[$|count1|]").check();
      await expect(page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//input[@type=\"checkbox\" and not(contains(@aria-label,\"Select all for \"))])[$|count1|]")).toBeVisible();
      vars["SelectedLoanAmount(table)"] = await page.locator("(//input[@type=\"checkbox\" and contains(@aria-label,\"Select loan\")]/../..//td[@data-title=\"Loan Amount\"])[$|count1|]").textContent() || '';
      vars["SelectedLoanAmountValue(table)"] = String(vars["SelectedLoanAmount(table)"]).replace(/\$/g, '');
      vars["SelectedLoanAmountValue(table)"] = String(vars["SelectedLoanAmountValue(table)"]).replace(/\,/g, '');
      vars["checkedboxcount(table)"] = (parseFloat(String("1")) + parseFloat(String(vars["checkedboxcount(table)"]))).toFixed(0);
      vars["total"] = (parseFloat(String(vars["total"])) + parseFloat(String(vars["SelectedLoanAmountValue(table)"]))).toFixed(0);
      vars["count1"] = (parseFloat(String("1")) + parseFloat(String(vars["count1"]))).toFixed(0);
    }
    vars["totalcheckedboxcount(table)"] = vars["checkedboxcount(table)"];
    vars["TotalSelectedLoanAmountValue(table)"] = vars["total"];
    vars["LoanAmount(footer)"] = await page.locator("(//div[@id=\"page-footer\"]//div)[3]/div/small[text()=\"Selected Loan Amt\"]/../../../div/div[@class=\"fw-bold\"]").textContent() || '';
    vars["TotalLoanAmount(footer)"] = String(vars["LoanAmount(footer)"]).replace(/\$/g, '');
    vars["TotalLoanAmount(footer)"] = String(vars["TotalLoanAmount(footer)"]).replace(/\,/g, '');
    expect(String(vars["TotalSelectedLoanAmountValue(table)"])).toBe(vars["TotalLoanAmount(footer)"]);
    await expect(page.locator("//div[@id=\"page-footer\"]/div//button[@id=\"commitdropdownMenuButton\"]")).toBeVisible();
    vars["LoanCount(footer)"] = await page.locator("//div[@id=\"page-footer\"]/div//button[@id=\"commitdropdownMenuButton\"][@id=\"commitdropdownMenuButton\"]/i/../span").textContent() || '';
    vars["TotalLoanCount(footer)"] = String(vars["LoanCount(footer)"]).replace(/\(/g, '');
    vars["TotalLoanCount(footer)"] = String(vars["TotalLoanCount(footer)"]).replace(/\)/g, '');
    expect(String(vars["totalcheckedboxcount(table)"])).toBe(vars["TotalLoanCount(footer)"]);
    await expect(page.locator("(//div[@id=\"page-footer\"]//div)[3]/div/small/../../../div/div[@class=\"fw-bold\"]/..")).toContainText("Selected Loan Amt");
    await expect(page.locator("(//input[@type=\"checkbox\" and contains(@aria-label,\"Select loan\")])[1]")).toBeVisible();
    await expect(page.locator("(//input[@type=\"checkbox\" and contains(@aria-label,\"Select loan\")])[1]")).toBeVisible();
    await page.locator("(//input[@type=\"checkbox\" and contains(@aria-label,\"Select loan\")])[1]").uncheck();
    await expect(page.locator("(//input[@type=\"checkbox\" and contains(@aria-label,\"Select loan\")])[1]")).toBeVisible();
    vars["total"] = "0";
    vars["count1"] = "1";
    vars["TotalCheckedCount(from second checkbox)"] = String(await page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//input[@type=\"checkbox\"])[position()>=3 and position()<=last()]").count());
    while (parseFloat(String(vars["count1"])) <= parseFloat(String(vars["TotalCheckedCount(from second checkbox)"]))) {
      await expect(page.locator("((//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//input[@type=\"checkbox\"])[position()>=3 and position()<=last()])[$|count1|]")).toBeVisible();
      vars["LoanAmount"] = await page.locator("((//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//input[@type=\"checkbox\"])[position()>=3 and position()<=last()])[$|count1|]/../..//td[@data-title=\"Loan Amount\"]").textContent() || '';
      vars["LoanAmountValue"] = String(vars["LoanAmount"]).replace(/\$/g, '');
      vars["LoanAmountValue"] = String(vars["LoanAmountValue"]).replace(/\,/g, '');
      vars["total"] = (parseFloat(String(vars["total"])) + parseFloat(String(vars["LoanAmountValue"]))).toFixed(0);
      vars["count1"] = (parseFloat(String("1")) + parseFloat(String(vars["count1"]))).toFixed(0);
    }
    vars["TotalDisplayedLoanAmount(table)"] = vars["total"];
    await expect(page.locator("(//div[@id=\"page-footer\"]//div)[3]/div/small[text()=\"Selected Loan Amt\"]/../../../div/div[@class=\"fw-bold\"]")).toBeVisible();
    vars["DisplayedLoanAmount(footer)"] = await page.locator("(//div[@id=\"page-footer\"]//div)[3]/div/small[text()=\"Selected Loan Amt\"]/../../../div/div[@class=\"fw-bold\"]").textContent() || '';
    vars["TotalDisplayedLoanAmount(footer)"] = String(vars["DisplayedLoanAmount(footer)"]).replace(/\$/g, '');
    vars["TotalDisplayedLoanAmount(footer)"] = String(vars["TotalDisplayedLoanAmount(footer)"]).replace(/\,/g, '');
    expect(String(vars["TotalDisplayedLoanAmount(table)"])).toBe(vars["TotalDisplayedLoanAmount(footer)"]);
    await expect(page.locator("//div[@id=\"page-footer\"]/div//button[@id=\"commitdropdownMenuButton\"]")).toBeVisible();
    vars["DisplayedLoanCount(footer)"] = await page.locator("//div[@id=\"page-footer\"]/div//button[@id=\"commitdropdownMenuButton\"][@id=\"commitdropdownMenuButton\"]/i/../span").textContent() || '';
    vars["TotalDisplayedLoanCount(footer)"] = String(vars["DisplayedLoanCount(footer)"]).replace(/\(/g, '');
    vars["TotalDisplayedLoanCount(footer)"] = String(vars["TotalDisplayedLoanCount(footer)"]).replace(/\)/g, '');
    expect(String(vars["TotalCheckedCount(from second checkbox)"])).toBe(vars["TotalDisplayedLoanCount(footer)"]);
    await expect(page.locator("(//div[@id=\"page-footer\"]//div)[3]/div/small/../../../div/div[@class=\"fw-bold\"]/..")).toContainText("Selected Loan Amt");
  });
});
