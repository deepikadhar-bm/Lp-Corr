import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS07_TC01_Verify the \\\"Paste Loans\\\" functionality by validating all provided valid loans, and ensure that the functionality is handled correctly for both same-company and different-company scenar', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    // [DISABLED] Clipboard: set clipboard Allow mode for the current site
    // // Clipboard permissions are handled via Playwright browser context
    // [DISABLED] Notifications: set notifications Allow mode for the current site
    // // Notification permissions are handled via Playwright browser context
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").waitFor({ state: 'visible' });
    await expect(page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]")).toBeVisible();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill("873R67588B72");
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Bid Req. ID\"]/a)[1]").click();
    await page.waitForLoadState('networkidle');
    // [DISABLED] Verify that the current page displays an element Get Price Button(price offered) and With Scrollable FALSE
    // await expect(page.locator("//button[text()[normalize-space() = \"Get Price\"]]")).toBeVisible();
    // [DISABLED] Verify that the element Select all for Checkbox(price offered screen) is unchecked and With Scrollable FALSE
    // await expect(page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"])/th/div//input[@aria-label=\"Select all for \" and @type=\"checkbox\"]")).toBeVisible();
    // [DISABLED] Verify that the element First Check Box(price offered screen) is unchecked and With Scrollable FALSE
    // await expect(page.locator("(//input[@type=\"checkbox\" and contains(@aria-label,\"Select loan\")])[1]")).toBeVisible();
    // [DISABLED] Store 1 in count
    // vars["count"] = "1";
    // [DISABLED] Store the count of elements identified by locator Enabled Loan Numbers In Price Offered into a variable EnabledLoansCount
    // vars["EnabledLoansCount"] = String(await page.locator("//button[contains(@aria-label,\"View loan details\")]").count());
    while (true) /* Verify if count <= EnabledLoansCount */ {
      // [DISABLED] Store text from the element Individual Loan Num Price Offered into a variable CurrentLoanNumber
      // vars["CurrentLoanNumber"] = await page.locator("(//button[contains(@aria-label,\"View loan details\")])[$|count|]").textContent() || '';
      // [DISABLED] Fetch text from multiple elements Loan Numbers Expect the Current Loan with the same xpath and store it in RemainingLoanNumbers .
      // vars["RemainingLoanNumbers"] = (await page.locator("(//button[contains(@aria-label,\"View loan details\")])[not(position()=$|count|)]").allTextContents()).join(', ');
      // [DISABLED] Verify RemainingLoanNumbers not contains CurrentLoanNumber
      // expect(String(vars["RemainingLoanNumbers"])).not.toContain(String(vars["CurrentLoanNumber"]));
      // [DISABLED] Perform addition on 1 and count and store the result inside a count considering 0 decimal places
      // vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    // [DISABLED] Click on Get Price Button(price offered)
    // await page.locator("//button[text()[normalize-space() = \"Get Price\"]]").click();
    // [DISABLED] Verify that the current page displays an element Remaining Time(price offered) and With Scrollable FALSE
    // await expect(page.locator("//div[@id=\"price-offered-details-header\"]//div/div[text()=\"Remaining Time\"]")).toBeVisible();
    // [DISABLED] Click on First Check Box(price offered screen)
    // await page.locator("(//input[@type=\"checkbox\" and contains(@aria-label,\"Select loan\")])[1]").click();
    // [DISABLED] Check the checkbox First Check Box(price offered screen)
    // await page.locator("(//input[@type=\"checkbox\" and contains(@aria-label,\"Select loan\")])[1]").check();
    // [DISABLED] Verify that the element First Check Box(price offered screen) is checked and With Scrollable FALSE
    // await expect(page.locator("(//input[@type=\"checkbox\" and contains(@aria-label,\"Select loan\")])[1]")).toBeVisible();
    // [DISABLED] Store text from the element First Loan Num Price offered into a variable FirstLoanNumPriceOffered
    // vars["FirstLoanNumPriceOffered"] = await page.locator("(//input[contains(@aria-label,\"Select loan\")]/../..//td[@data-title=\"Corr. Loan#\"]/div/button)[1]").textContent() || '';
    // [DISABLED] Verify that the element Commit Selected Footer Button(price offered) is enabled and With Scrollable FALSE
    // await expect(page.locator("//div[@id=\"page-footer\"]/div//button[@id=\"commitdropdownMenuButton\"]")).toBeVisible();
    // [DISABLED] Click on Commit Selected Footer Button(price offered)
    // await page.locator("//div[@id=\"page-footer\"]/div//button[@id=\"commitdropdownMenuButton\"]").click();
    // [DISABLED] Click on Yes Commit Button(popup price offered screen)
    // await page.locator("(//div[@class=\"modal-footer\"]/button)[2]").click();
    // [DISABLED] Wait until the element Yes Commit Button(popup price offered screen) is not visible
    // await page.locator("(//div[@class=\"modal-footer\"]/button)[2]").waitFor({ state: 'hidden' });
    // [DISABLED] Wait until the element Okay Button(popup, price offered screen) is visible
    // await page.locator("//div[@class=\"modal-footer\"]//button[contains(text(), \"Okay\")]").waitFor({ state: 'visible' });
    // [DISABLED] Click on Okay Button(popup, price offered screen)
    // await page.locator("//div[@class=\"modal-footer\"]//button[contains(text(), \"Okay\")]").click();
    await page.waitForLoadState('networkidle');
    await page.locator("//div[@id=\"price-offered-list-tabs\"]/div//span[text()=\"All Loans\"]").waitFor({ state: 'visible' });
    await page.locator("//div[@id=\"price-offered-list-tabs\"]/div//span[text()=\"All Loans\"]").click();
    await page.waitForLoadState('networkidle');
    vars[""] = await page.locator("(//input[contains(@aria-label,\"Select loan\")]/../..//td[@data-title=\"Corr. Loan#\"]/div/button)[1]").getAttribute("value") || '';
    vars[""] = await page.locator("(//input[contains(@aria-label,\"Select loan\")]/../..//td[@data-title=\"Corr. Loan#\"]/div/button)[1]").getAttribute("value") || '';
    // [DISABLED] Copy text from element First Loan Num Price offered and send it as keyboard
    // vars[""] = await page.locator("(//input[contains(@aria-label,\"Select loan\")]/../..//td[@data-title=\"Corr. Loan#\"]/div/button)[1]").textContent() || '';
    vars["URL"] = page.url();
    // [DISABLED] Set chrome permission to URL: URL , Permission Name: Pop-ups and redirects , Permission Type: Allow
    // // Chrome permissions are handled via Playwright browser context
    // [DISABLED] Click on the Refresh button in the browser
    // await page.reload();
    // [DISABLED] Wait for 10 seconds
    // await page.waitForTimeout(10000);
    await page.locator("//button[text()[normalize-space() = \"Paste Loans\"]]").click();
    await page.waitForTimeout(3000);
    // [DISABLED] Enter Allow in prompt popup and click on accept
    // page.once('dialog', async dialog => { await dialog.accept(String("Allow")); });
    // [DISABLED] Click on text Allow
    // await page.getByText("Allow").click();
    await page.locator("//span[text()[normalize-space() = \"Paste Clipboard\"]]").click();
    // [DISABLED] Notifications: set notifications Allow mode for the current site
    // // Notification permissions are handled via Playwright browser context
    // [DISABLED] Allow clipboard access in browser
    // // Clipboard access is handled by Playwright browser context permissions
    // [DISABLED] Wait for 5 seconds
    // await page.waitForTimeout(5000);
    // [DISABLED] Wait until the text Allow is present on the current page
    // await page.getByText("Allow").waitFor({ state: 'visible' });
    // [DISABLED] Enter ok in prompt popup and click on accept
    // page.once('dialog', async dialog => { await dialog.accept(String("ok")); });
    // [DISABLED] Click OK button in the alert
    // page.once('dialog', dialog => dialog.accept());
    // [DISABLED] Wait for 10 seconds
    // await page.waitForTimeout(10000);
    // [DISABLED] Click on Paste loan numbers here
    // await page.locator("//div[@role=\"textbox\"]").click();
    // [DISABLED] Enter FirstLoanNumPriceOffered in the Paste loan numbers here field
    // await page.locator("//div[@role=\"textbox\"]").fill(vars["FirstLoanNumPriceOffered"]);
    await page.waitForTimeout(20000);
    vars["LoanNumFreedom"] = vars["FirstLoanNumPriceOffered"];
    await page.locator("//button[@aria-label=\"Validate loan numbers\"]").click();
    await page.locator("//button[@aria-label=\"Validate loan numbers\"]").waitFor({ state: 'hidden' });
    await expect(page.locator("//button[@aria-label=\"Add loans to commit\"]")).toBeVisible();
  });
});
