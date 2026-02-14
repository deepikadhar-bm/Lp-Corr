import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_PriceOffered', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS08_TC03_Input a loan number present which is present in this company, but is not in this bid/price offered record', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Store RequestIDCreated1stScenario in Bidreq_ID
    // vars["Bidreq_ID"] = testData["RequestIDCreated1stScenario"];
    await page.locator("//tr[.//td[@data-title='Company']//div[normalize-space(text())='@|Company Name|'] and .//td[@data-title='Status']//span[normalize-space(text())='Partially Committed' or normalize-space(text())='Price Offered']]//td[@data-title='Bid Req. ID']").click();
    await page.locator("//div[@id=\"price-offered-details-header\"]//div/div[text()=\"Bid Req. ID\"]/..//h5").waitFor({ state: 'visible' });
    vars["Bidreq_ID"] = await page.locator("//div[@id=\"price-offered-details-header\"]//div/div[text()=\"Bid Req. ID\"]/..//h5").textContent() || '';
    vars["Companyname"] = await page.locator("//h5[@class=\"text-nowrap\"]").textContent() || '';
    vars["Companyname"] = String(vars["Companyname"]).trim();
    vars["BidLoanNumberCompany"] = await page.locator("//button[contains(@aria-label,\"View loan details\")]").textContent() || '';
    await page.reload();
    await page.locator("(//tr[td[@data-title=\"Company\"]//div[contains(text(),\"@|Company Name|\")]]//td[@data-title=\"Bid Req. ID\"]//a[not(contains(text(),\"$|Bidreq_ID|\"))]/../..//td[@data-title=\"Status\"]//span[contains(text(),\" Price Offered \") or contains(text(),\" Partially Committed \")]/../../..//td[@data-title=\"Bid Req. ID\"])[1]").waitFor({ state: 'visible' });
    await page.locator("(//tr[td[@data-title=\"Company\"]//div[contains(text(),\"@|Company Name|\")]]//td[@data-title=\"Bid Req. ID\"]//a[not(contains(text(),\"$|Bidreq_ID|\"))]/../..//td[@data-title=\"Status\"]//span[contains(text(),\" Price Offered \") or contains(text(),\" Partially Committed \")]/../../..//td[@data-title=\"Bid Req. ID\"])[1]").click();
    await page.locator("//h5[@class=\"text-nowrap\"]").waitFor({ state: 'visible' });
    await expect(page.getByText(vars["BidLoanNumberCompany"])).not.toBeVisible();
    await expect(page.locator("//h5[@class=\"text-nowrap\"]")).toContainText(vars["Companyname"]);
    await page.locator("//button[text()[normalize-space() = \"Paste Loans\"]]").click();
    await page.locator("//div[@role=\"textbox\"]").click();
    await page.locator("//div[@role=\"textbox\"]").fill(vars["BidLoanNumberCompany"]);
    vars["BidLoanNumberPopup"] = await page.locator("//div[@role=\"textbox\"]").inputValue() || '';
    expect(String(vars["BidLoanNumberCompany"])).toBe(vars["BidLoanNumberPopup"]);
    await page.locator("//span[text()[normalize-space() = \"Validate\"]]").click();
    await page.locator("//span[@class=\"error-loan\"]").waitFor({ state: 'visible' });
    await page.locator("//h5[contains(@class,\"text-danger mb\")]").waitFor({ state: 'visible' });
    await expect(page.locator("//span[@class=\"error-loan\"]")).toHaveCSS('border', "rgba(255, 0, 0, 1)");
    await expect(page.locator("//h5[contains(@class,\"text-danger mb\")]")).toHaveAttribute('aria-label', "text-danger");
    await expect(page.locator("//div[contains(text(),\"Unidentified Loan\")]//following::div[1]/div")).toContainText(vars["BidLoanNumberCompany"]);
    await page.locator("//label[text()=\"Remove errors and continue\"]/preceding-sibling::input[@type=\"checkbox\"]").check();
    await expect(page.locator("//span[text()=\"Add to Commit\"]//parent::button")).toBeVisible();
    await page.locator("//button[@aria-label=\"Close modal\"]").click();
  });
});
