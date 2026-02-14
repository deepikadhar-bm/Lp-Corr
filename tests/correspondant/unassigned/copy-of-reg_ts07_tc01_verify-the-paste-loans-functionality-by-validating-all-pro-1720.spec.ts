import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('Copy of (REG_TS07_TC01_Verify the \\\"Paste Loans\\\" functionality by validating all provided valid loans, and ensure that the functionality is handled correctly for both same-company and different-compa', async ({ page }) => {
    // [DISABLED] Remove Special char , from 123,543 and store it in runtime zx
    // vars["zx"] = String("123,543").replace(/\,/g, '');
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    // [DISABLED] Notifications: set notifications Allow mode for the current site
    // // Notification permissions are handled via Playwright browser context
    // [DISABLED] Set chrome permission to URL: CORR_QA_URL , Permission Name: Popup , Permission Type: Allow
    // // Chrome permissions are handled via Playwright browser context
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").waitFor({ state: 'visible' });
    await expect(page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]")).toBeVisible();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill("87LO5003095E");
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Bid Req. ID\"]/a)[1]").click();
    await page.locator("//button[text()[normalize-space() = \"Paste Loans\"]]").waitFor({ state: 'visible' });
    // [DISABLED] Double click on Execution Type(Details)
    // await page.locator("//div[text()=\"Execution Type\"]//following-sibling::h5").dblclick();
    // [DISABLED] Press Control(Command) + c Keys
    // await page.keyboard.press('Control(Command)+c');
    await page.locator("//button[text()[normalize-space() = \"Paste Loans\"]]").click();
    vars[""] = await page.locator("(//input[contains(@aria-label,\"Select loan\")]/../..//td[@data-title=\"Corr. Loan#\"]/div/button)[1]").textContent() || '';
    vars[""] = await page.locator("(//input[contains(@aria-label,\"Select loan\")]/../..//td[@data-title=\"Corr. Loan#\"]/div/button)[1]").getAttribute("value") || '';
    vars[""] = await page.locator("(//input[contains(@aria-label,\"Select loan\")]/../..//td[@data-title=\"Corr. Loan#\"]/div/button)[1]").textContent() || '';
    // [DISABLED] Notifications: set notifications Allow mode for the current site
    // // Notification permissions are handled via Playwright browser context
    // [DISABLED] Wait until the text Allow is present on the current page
    // await page.getByText("Allow").waitFor({ state: 'visible' });
    // [DISABLED] Set chrome permission to URL: CurrentPageUrl , Permission Name: Popup , Permission Type: Allow
    // // Chrome permissions are handled via Playwright browser context
    await page.locator("//span[text()[normalize-space() = \"Paste Clipboard\"]]").click();
    // [DISABLED] Wait until the text Allow is present on the current page
    // await page.getByText("Allow").waitFor({ state: 'visible' });
    // [DISABLED] Store the url of the current page into a variable CurrentPageUrl
    // vars["CurrentPageUrl"] = page.url();
    // [DISABLED] Set chrome permission to URL: CurrentPageUrl , Permission Name: AutomaticDownload , Permission Type: Allow
    // // Chrome permissions are handled via Playwright browser context
    // [DISABLED] Set chrome permission to URL: CurrentPageUrl , Permission Name: Popup , Permission Type: Allow
    // // Chrome permissions are handled via Playwright browser context
    await page.waitForTimeout(10000);
  });
});
