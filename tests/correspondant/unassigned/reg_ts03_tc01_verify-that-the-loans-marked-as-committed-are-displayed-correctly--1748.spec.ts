import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS03_TC01_Verify that the loans marked as committed are displayed correctly on the respective commitment detail screen under that commitment section', async ({ page }) => {
    // Prerequisite: REG_TS01_TC01_Verify that once when the user performs commit action from the price offered module, t
    // TODO: Ensure prerequisite test passes first

    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").click();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqId"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[contains(text(),\"$|BidReqId|\")]").click();
    vars["LockedCorrLoanNumPriceOffered"] = await page.locator("(//span[@aria-label=\"Committed loan\"]//ancestor::tr//td[@data-title=\"Corr. Loan#\"]//button)[1]").textContent() || '';
    vars["LockedLastNamePriceOffered"] = await page.locator("//span[@aria-label=\"Committed loan\"]//ancestor::tr//td[@data-title=\"Last Name\"]").textContent() || '';
    vars["LockedLoanAmountPriceOffered"] = await page.locator("//span[@aria-label=\"Committed loan\"]//ancestor::tr//td[@data-title=\"Loan Amount\"]").textContent() || '';
    vars["LockedInterestRatePriceOffered"] = await page.locator("//span[@aria-label=\"Committed loan\"]//ancestor::tr//td[@data-title=\"Int. Rate\"]").textContent() || '';
    vars["LockedRefSecProdPriceOffered"] = await page.locator("//span[@aria-label=\"Committed loan\"]//ancestor::tr//td[@data-title=\"Ref Sec Prod.\"]").textContent() || '';
    vars["LockedRefSecPricePriceOffered"] = await page.locator("//span[@aria-label=\"Committed loan\"]//ancestor::tr//td[@data-title=\"Ref Sec Price\"]").textContent() || '';
    vars["LockedGrossPriceOffered"] = await page.locator("//span[@aria-label=\"Committed loan\"]//ancestor::tr//td[@data-title=\"Gross Price\"]").textContent() || '';
    vars["LockedHedgeRatioPriceOffered"] = await page.locator("//span[@aria-label=\"Committed loan\"]//ancestor::tr//td[@data-title=\"Hedge Ratio\"]").textContent() || '';
    vars["LockedMarkAdjPriceOffered"] = await page.locator("//span[@aria-label=\"Committed loan\"]//ancestor::tr//td[@data-title=\"Mark Adj\"]").textContent() || '';
    vars["LockedCurrGrossPriceOffered"] = await page.locator("//span[@aria-label=\"Committed loan\"]//ancestor::tr//td[@data-title=\"Curr Gross\"]").textContent() || '';
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//input[@id='searchTagInput']").click();
    await page.locator("//input[@id='searchTagInput']").fill(vars["BidReqId"]);
    await page.locator("//div[contains(@class, 'popover-body')]/ul[1]/li[3]/a[1]").click();
    await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())=\"$|BidReqId|\"]//ancestor::tr//td[@data-title=\"Comm. ID\"]//a[contains(@aria-label,\"View details for commitme\")]").click();
    await page.locator("//div[contains(text(),\"Current Market\")]//following-sibling::h5").waitFor({ state: 'visible' });
    await expect(page.locator("//div[text()=\"Commit. #\"]/following-sibling::h5")).toContainText(vars["CommitmentOrderPriceOffered"]);
    await expect(page.locator("//div[text()=\"Commit. ID\"]/following-sibling::h5")).toContainText(vars["CommitmentIDPriceOffered"]);
    await expect(page.locator("//div[text()=\"Commit. Time\"]//following-sibling::h5")).toContainText(vars["CommitTimePriceOffered"]);
    await expect(page.locator("//div[normalize-space(text())=\"No. Loans\"]//following-sibling::h5")).toContainText(vars["LockedLoansCount"]);
    await expect(page.locator("//div[text()=\"Market Value\"]//following-sibling::h5")).toContainText(vars["MaraketValuePriceOffered"]);
    await expect(page.locator("//div[contains(text(),\"Current Market\")]//following-sibling::h5")).toContainText(vars["MaraketValuePriceOffered"]);
    // [DISABLED] Verify that the element Current Market Value(Details Screen) displays text MaraketValuePriceOffered and With Scrollable FALSE
    // await expect(page.locator("//div[contains(text(),\"Current Market\")]//following-sibling::h5")).toContainText(vars["MaraketValuePriceOffered"]);
    await expect(page.getByText(vars["LockedCorrLoanNumPriceOffered"])).toBeVisible();
    await expect(page.locator("//td[@data-title=\"Last Name\"]")).toContainText(vars["LockedLastNamePriceOffered"]);
    await expect(page.locator("//td[@data-title=\"Loan Amount\"]")).toContainText(vars["LockedLoanAmountPriceOffered"]);
    await expect(page.locator("//td[@data-title=\"Ref Sec Prod.\"]")).toContainText(vars["LockedRefSecProdPriceOffered"]);
    await expect(page.locator("//td[@data-title=\"Ref Sec Price\"]")).toContainText(vars["LockedRefSecPricePriceOffered"]);
    await expect(page.locator("//td[@data-title=\"Gross Price\"]")).toContainText(vars["LockedGrossPriceOffered"]);
    await expect(page.locator("//td[@data-title=\"Hedge Ratio\"]")).toContainText(vars["LockedHedgeRatioPriceOffered"]);
    await expect(page.locator("//td[@data-title=\"Mark Adj\"]")).toContainText(vars["LockedMarkAdjPriceOffered"]);
    await expect(page.locator("//td[@data-title=\"Curr Gross\"]")).toContainText(vars["LockedCurrGrossPriceOffered"]);
  });
});
