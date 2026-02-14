import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_PriceOffered', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS08_TC02_Input the Unidentified loan numbers and verify that the error message should be displayed and user should not be able to proceed further', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    vars["BidReqID"] = testData["RequestIDCreated1stScenario"];
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(testData["RequestIDCreated1stScenario"]);
    await page.keyboard.press('Enter');
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Bid Req. ID\"]/a)[1]").click();
    vars["BidLoanNumber(Loan Details)"] = await page.locator("//button[contains(@aria-label,\"View loan details\")]").textContent() || '';
    vars["BidLoanNumber"] = String(vars["BidLoanNumber(Loan Details)"]).substring(0, String(vars["BidLoanNumber(Loan Details)"]).length - 9);
    await page.locator("//button[contains(text(),\"Paste Loans\")]\n").click();
    await page.locator("//div[@role=\"textbox\"]").fill(vars["BidLoanNumber"]);
    await page.locator("//span[text()[normalize-space() = \"Validate\"]]").click();
    await expect(page.locator("//h5[text()[normalize-space() = \"1 Errors Found\"]]")).toBeVisible();
    await expect(page.locator("//div[contains(normalize-space(.),\"Unidentified Loan #\")]\n")).toBeVisible();
    await expect(page.locator("//span[@class=\"error-loan\"]")).toHaveCSS('border', "rgba(255, 0, 0, 1)");
    await expect(page.locator("//h5[contains(normalize-space(.), \"Errors Found\")]\n")).toHaveAttribute('aria-label', "text-danger");
    vars["UnidentifiedLoanNumber"] = await page.locator("//div[contains(text(),\"Unidentified Loan\")]/../div[contains(@class,\"d-flex flex-wrap gap-1 flex-grow\")]").textContent() || '';
    expect(String(vars["BidLoanNumber"])).toBe(vars["UnidentifiedLoanNumber"]);
    await page.locator("//input[contains(@id,'errorsCheckbox')]\n").check();
    await expect(page.locator("//button[@aria-label=\"Add loans to commit\"]")).toBeVisible();
    await page.locator("//i[contains(@class, 'fa-lg') and contains(@class, 'color-primary') and contains(@class, 'fa-times')]").click();
  });
});
