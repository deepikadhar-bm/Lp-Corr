import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS07_TC03_Verify the \\\"Paste Loans\\\" functionality by validating all provided valid loans, and ensure that the functionality is handled correctly for both same-company and different-company scenar', async ({ page }) => {
    // Prerequisite: REG_TS07_TC01_Verify the "Paste Loans" functionality by validating all provided valid loans, and ens
    // TODO: Ensure prerequisite test passes first

    await stepGroups.stepGroup_Uploading_bid_for_American_Pacific_Company(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").waitFor({ state: 'visible' });
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["RequestIDDetails"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Bid Req. ID\"]/a)[1]").click();
    await page.waitForLoadState('networkidle');
    await stepGroups.stepGroup_Unique_Loan_Number_Check_In_Price_Offered_Screen(page, vars);
    await page.locator("//button[text()[normalize-space() = \"Get Price\"]]").click();
    await page.locator("//div[text()=\"Remaining Time\"]/..//h5").waitFor({ state: 'visible' });
    await page.locator("//button[contains(@aria-label,\"View loan details\") and text()=\"$|LoanNumFreedom|\"]/../../..//input").check();
    await expect(page.locator("//button[contains(@aria-label,\"View loan details\") and text()=\"$|LoanNumFreedom|\"]/../../..//input")).toBeVisible();
    await expect(page.locator("//div[@id=\"page-footer\"]/div//button[@id=\"commitdropdownMenuButton\"]")).toBeVisible();
    // [DISABLED] Click on Commit Selected Footer Button(price offered)
    // await page.locator("//div[@id=\"page-footer\"]/div//button[@id=\"commitdropdownMenuButton\"]").click();
    await page.locator("//button[text()[normalize-space() = \"Paste Loans\"]]").click();
    await page.locator("//div[@role=\"textbox\"]").waitFor({ state: 'visible' });
    await page.locator("//div[@role=\"textbox\"]").fill(vars["LoanNumFreedom"]);
    await page.locator("//button[@aria-label=\"Validate loan numbers\"]").click();
    await expect(page.locator("//h5[text()[normalize-space() = \"1 Errors Found\"]]")).toBeVisible();
    await page.locator("//button[@aria-label=\"Add loans to commit\"]").waitFor({ state: 'visible' });
  });
});
