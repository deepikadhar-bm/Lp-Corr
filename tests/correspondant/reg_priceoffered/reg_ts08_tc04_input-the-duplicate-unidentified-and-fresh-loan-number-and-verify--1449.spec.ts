import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_PriceOffered', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS08_TC04_Input the duplicate, unidentified and fresh loan number and verify the error messages should be displayed and also user should be allowed to proceed with commit action since it contains ', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").waitFor({ state: 'visible' });
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(testData["RequestIDCreated3rdScenario"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Bid Req. ID\"]/a)[1]").click();
    await page.waitForLoadState('networkidle');
    vars["CommittedLoanNumber(price offered table)"] = await page.locator("//td//span[@aria-label=\"Committed loan\"]/../..//td[@data-title=\"Corr. Loan#\"]").textContent() || '';
    vars["CommittedLoanNumber(price offered table)"] = String(vars["CommittedLoanNumber(price offered table)"]).substring(0, String(vars["CommittedLoanNumber(price offered table)"]).length - 10);
    vars["FreshLoanNumber(price offered table)"] = await page.locator("(//input[contains(@aria-label,\"Select loan\")]/../..//td[@data-title=\"Corr. Loan#\"]/div/button)[1]").textContent() || '';
    // [DISABLED] Remove the no of ( 0,10 ) positions of given string FreshLoanNumber(price offered table) and store into runtime variable FreshLoanNumber(price offered table)
    // vars["FreshLoanNumber(price offered table)"] = String(vars["FreshLoanNumber(price offered table)"]).substring(0, String(vars["FreshLoanNumber(price offered table)"]).length - 10);
    vars["UnidentifiedLoanNumber(price offered table)"] = String(vars["FreshLoanNumber(price offered table)"]).substring(0, String(vars["FreshLoanNumber(price offered table)"]).length - 5);
    vars["CommittedFreshLoan"] = String(vars["CommittedLoanNumber(price offered table)"]) + "," + String(vars["FreshLoanNumber(price offered table)"]);
    vars["CommittedFreshUnidentifiedLoan(price offered table)"] = String(vars["CommittedFreshLoan"]) + "," + String(vars["UnidentifiedLoanNumber(price offered table)"]);
    await page.locator("//button[text()[normalize-space() = \"Paste Loans\"]]").click();
    await page.locator("//div[@role=\"textbox\"]").fill(vars["CommittedFreshUnidentifiedLoan(price offered table)"]);
    await page.locator("//button[@aria-label=\"Validate loan numbers\"]").click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator("//h5[contains(@class,\"text-danger\")]")).toBeVisible();
    await expect(page.locator("//h5[contains(@class,\"text-danger\")]")).toContainText("2 Errors Found");
    await expect(page.locator("//h5[contains(@class,\"text-danger\")]")).toHaveAttribute('aria-label', "text-danger");
    await expect(page.locator("//div//div[contains(text(),\"Duplicate Loan\")]/../hr/..//div//div")).toContainText(vars["CommittedLoanNumber(price offered table)"]);
    vars["CommittedLoanNumber(errors found popup)"] = await page.locator("//div//div[contains(text(),\"Duplicate Loan\")]/../hr/..//div//div").textContent() || '';
    expect(String(vars["CommittedLoanNumber(price offered table)"])).toBe(vars["CommittedLoanNumber(errors found popup)"]);
    await expect(page.locator("//div//div[contains(text(),\"Unidentified Loan\")]/../hr/..//div//div")).toContainText(vars["UnidentifiedLoanNumber(price offered table)"]);
    vars["UnidentifiedLoanNumber(errors found popup)"] = await page.locator("//div//div[contains(text(),\"Unidentified Loan\")]/../hr/..//div//div").textContent() || '';
    expect(String(vars["UnidentifiedLoanNumber(price offered table)"])).toBe(vars["UnidentifiedLoanNumber(errors found popup)"]);
    vars[""] = await page.locator("//div[@role=\"textbox\"]/span[contains(text(),\"$|UnidentifiedLoanNumber(errors found popup)|\")]").evaluate((el) => window.getComputedStyle(el as HTMLElement).color);
    if (String(vars["ColorValueUnidentifiedLoan"]) === String("rgba(255, 0, 0, 1)")) {
      vars["ColorValueUnidentifiedLoan"] = "red";
    } else {
      vars["ColorValueUnidentifiedLoan"] = "othercolor";
    }
    expect(String(vars["ColorValueUnidentifiedLoan"])).toBe(String("red"));
    await expect(page.locator("//div[@role=\"textbox\"]/span[contains(text(),\"$|UnidentifiedLoanNumber(errors found popup)|\")]")).toHaveAttribute('title', "error-loan");
    vars[""] = await page.locator("//div[@role=\"textbox\"]/span[contains(text(),\"$|CommittedLoanNumber(errors found popup)|\")]").evaluate((el) => window.getComputedStyle(el as HTMLElement).color);
    if (String(vars["ColorValueDuplicateLoan"]) === String("rgba(255, 0, 0, 1)")) {
      vars["ColorValueDuplicateLoan"] = "red";
    } else {
      vars["ColorValueDuplicateLoan"] = "othercolor";
    }
    expect(String(vars["ColorValueDuplicateLoan"])).toBe(String("red"));
    await expect(page.locator("//div[@role=\"textbox\"]/span[contains(text(),\"$|CommittedLoanNumber(errors found popup)|\")]")).toHaveAttribute('title', "error-loan");
    vars[""] = await page.locator("//div[@class=\"loanPasteTextArea\"]").evaluate((el) => window.getComputedStyle(el as HTMLElement).color);
    if (String(vars["ColorValueFreshLoan"]) === String("rgba(33, 37, 41, 1)")) {
      vars["ColorValueFreshLoan"] = "black";
    } else {
      vars["ColorValueFreshLoan"] = "othercolor";
    }
    expect(String(vars["ColorValueFreshLoan"])).toBe(String("black"));
    await expect(page.locator("//input[contains(@id,'errorsCheckbox')]\n")).toBeVisible();
    await page.locator("//input[contains(@id,'errorsCheckbox')]\n").check();
    await expect(page.locator("//input[contains(@id,'errorsCheckbox')]\n")).toBeVisible();
    await expect(page.locator("//button[@aria-label=\"Add loans to commit\"]")).toContainText("Add to Commit");
    await expect(page.locator("//button[@aria-label=\"Add loans to commit\"]")).toBeVisible();
    await page.locator("//button[@aria-label=\"Add loans to commit\"]").click();
    await expect(page.locator("//input[contains(@aria-label,\"Select loan\")]/../..//td[@data-title=\"Corr. Loan#\"]/div/button[text()=\"$|FreshLoanNumber(price offered table)|\"]")).toContainText(vars["FreshLoanNumber(price offered table)"]);
    await expect(page.locator("//input[contains(@aria-label,\"Select loan\")]/../..//td[@data-title=\"Corr. Loan#\"]/..//td[@role=\"cell\"]/input[@type=\"checkbox\"]")).toBeVisible();
    await expect(page.locator("//input[contains(@aria-label,\"Select loan\")]/../..//td[@data-title=\"Corr. Loan#\"]/..//td[@role=\"cell\"]/input[@type=\"checkbox\"]")).toBeVisible();
    await expect(page.locator("//div[@id=\"page-footer\"]/div//button[@id=\"commitdropdownMenuButton\"][@id=\"commitdropdownMenuButton\"]/i/../span")).toContainText("1");
    await page.locator("//button[text()[normalize-space() = \"Paste Loans\"]]").click();
    await page.locator("//div[@role=\"textbox\"]").fill(vars["FreshLoanNumber(price offered table)"]);
    await page.locator("//button[@aria-label=\"Validate loan numbers\"]").click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator("//input[contains(@id,'errorsCheckbox')]\n")).toBeVisible();
    await expect(page.locator("//button[@aria-label=\"Add loans to commit\"]")).toBeVisible();
  });
});
