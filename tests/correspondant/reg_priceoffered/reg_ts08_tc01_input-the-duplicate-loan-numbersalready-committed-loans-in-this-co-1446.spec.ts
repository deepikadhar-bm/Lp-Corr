import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_PriceOffered', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS08_TC01_Input the duplicate loan numbers[Already committed loans in this company] and verify that the error message should be displayed and user should not be able to proceed further.', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").click();
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(testData["RequestIDCreated3rdScenario"]);
    await page.keyboard.press('Enter');
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Bid Req. ID\"]/a)[1]").click();
    await page.waitForLoadState('networkidle');
    vars["CommittedLoanNumber"] = await page.locator("//span[@aria-label=\"Committed loan\"]//..//..//button[contains(@aria-label, \"View loan details for\")]").textContent() || '';
    await page.locator("//button[text()[normalize-space() = \"Paste Loans\"]]").click();
    await page.locator("//div[@role=\"textbox\"]").click();
    await page.locator("//div[@role=\"textbox\"]").fill(vars["CommittedLoanNumber"]);
    await page.locator("//button[@aria-label=\"Validate loan numbers\"]").click();
    await expect(page.locator("//div[text()=\"Duplicate Loan # \"]")).toBeVisible();
    vars["LoanNumberPopup"] = await page.locator("//div[@role=\"textbox\"]").textContent() || '';
    expect(String(vars["LoanNumberPopup"])).toBe(vars["CommittedLoanNumber"]);
    await expect(page.locator("//span[@class=\"error-loan\"]")).toHaveCSS('border', "rgba(255, 0, 0, 1)");
    await expect(page.locator("//h5[contains(normalize-space(.), \"Errors Found\")]\n")).toHaveAttribute('aria-label', "text-danger");
    await expect(page.getByText("1 Errors Found\r")).toBeVisible();
    await expect(page.locator("//div[text()=\"Duplicate Loan # \"]")).toBeVisible();
    vars["DuplicateLoanNumberPopup"] = await page.locator("//div[text()=\"Duplicate Loan # \"]//following::div[1]/div").textContent() || '';
    expect(String(vars["CommittedLoanNumber"])).toBe(vars["DuplicateLoanNumberPopup"]);
    await page.locator("//input[contains(@id,'errorsCheckbox')]\n").check();
    await expect(page.locator("//span[text()=\"Add to Commit\"]//parent::button")).toBeVisible();
    await page.locator("//button[@aria-label=\"Close modal\"]").click();
  });
});
