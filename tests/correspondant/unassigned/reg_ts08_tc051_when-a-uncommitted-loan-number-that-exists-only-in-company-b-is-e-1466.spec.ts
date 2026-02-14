import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS08_TC05.1_When a uncommitted loan number that exists only in Company B is entered in Company A\\\'s pase loan popup, an error message should be displayed', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    vars["BidReqIdCompanyFreedom"] = await page.locator("//tr[td[@data-title=\"Status\"]//span[contains(text(),'Partially Committed') or contains(text(),'Price Offered')] and td[@data-title=\"Company\"]/div[contains(text(),\"Freedom\")]]/td[@data-title=\"Bid Req. ID\"]").textContent() || '';
    vars["BidReqIdCompanyFreedom"] = String(vars["BidReqIdCompanyFreedom"]).trim();
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").click();
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdCompanyFreedom"]);
    await page.keyboard.press('Enter');
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[contains(@aria-label, \"View details for price offered\")]\n").click();
    vars["UnLockedLoanNumber"] = await page.locator("//td//input[@type=\"checkbox\"]//..//..//button[contains(@aria-label, \"View loan details for\")]").textContent() || '';
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//i[contains(@class, 'fa-times')]").click();
    vars["BidReqIdCompanyNotFreedom"] = await page.locator("//tr[td[@data-title=\"Status\"]//span[contains(text(),'Partially Committed')or contains(text(),'Price Offered')]and not(td[@data-title=\"Company\"]/div[contains(text(),\"Freedom\")]) ]/td[@data-title=\"Bid Req. ID\"]").textContent() || '';
    vars["BidReqIdCompanyNotFreedom"] = String(vars["BidReqIdCompanyNotFreedom"]).trim();
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").click();
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdCompanyNotFreedom"]);
    await page.keyboard.press('Enter');
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[contains(@aria-label, \"View details for price offered\")]\n").click();
    await page.locator("//button[text()[normalize-space() = \"Paste Loans\"]]").click();
    await page.locator("//div[@role=\"textbox\"]").click();
    await page.locator("//div[@role=\"textbox\"]").fill(vars["UnLockedLoanNumber"]);
    await page.locator("//span[text()[normalize-space() = \"Validate\"]]").click();
    await expect(page.locator("//h5[contains(@class, \"text-danger\")]")).toBeVisible();
    vars["UnidentifiedLoanNumber"] = await page.locator("//div[contains(text(),\"Unidentified Loan\")]/../div[contains(@class,\"d-flex flex-wrap gap-1 flex-grow\")]").textContent() || '';
    expect(String(vars["UnidentifiedLoanNumber"])).toBe(vars["UnLockedLoanNumber"]);
  });
});
