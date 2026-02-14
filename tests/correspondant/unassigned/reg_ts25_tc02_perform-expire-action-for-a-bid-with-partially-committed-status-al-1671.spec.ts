import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS25_TC02_Perform expire action for a bid with partially committed status. Also verify that user should be able to update back to partially committed', async ({ page }) => {
    // Prerequisite: REG_TS25_TC01_Perform expire action for a bid with price offered status, Also user should be able to
    // TODO: Ensure prerequisite test passes first

    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").click();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").clear();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["RequiredBidID"]);
    await page.locator("//td[@data-title=\"Bid Req. ID\"]//a[contains(text(),\"$|BidReqIdPriceOffered|\")]").waitFor({ state: 'visible' });
    await stepGroups.stepGroup_Commits_an_Fresh_Loan_Num(page, vars);
    await page.locator("//div[contains(@id,\"price-offered-back\")]//i").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").clear();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["RequiredBidID"]);
    await page.locator("//td[@data-title=\"Bid Req. ID\"]//a[contains(text(),\"$|BidReqIdPriceOffered|\")]").waitFor({ state: 'visible' });
    vars["BidStatusPriceOffered"] = await page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//td[@data-title=\"Status\"]//span").textContent() || '';
    vars["BidStatusPriceOffered"] = String(vars["BidStatusPriceOffered"]).trim();
    expect(String(vars["BidStatusPriceOffered"])).toBe("Partially Committed");
    await page.locator("//td[@data-title=\"Bid Req. ID\"]//a[contains(text(),\"$|BidReqIdPriceOffered|\")]").click();
    vars["CompanyNameDetails"] = await page.locator("//div[text()=\"Company\"]//following-sibling::h5").textContent() || '';
    vars["count"] = "1";
    vars["TotalLoanAmount"] = "0";
    vars["CountOfUnlockedLoans"] = String(await page.locator("//input//ancestor::tr//td[@data-title=\"Loan Amount\"]").count());
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["CountOfUnlockedLoans"]))) {
      vars["UncommittedLoanAmount"] = await page.locator("(//input//ancestor::tr//td[@data-title=\"Loan Amount\"])[$|count|]").textContent() || '';
      vars["TotalLoanAmount"] = (parseFloat(String(vars["TotalLoanAmount"])) + parseFloat(String(vars["UncommittedLoanAmount"]))).toFixed(0);
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    vars["TotalLoanAmount"] = String(vars["TotalLoanAmount"]).trim();
    await page.locator("//i[contains(@class,'fa-arrow-left')]").click();
    await page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//button[@aria-label=\"Expire Pricing\"]//span").click();
    await page.locator("//span[@id=\"expirePricingTitle\"]//b").waitFor({ state: 'visible' });
    await expect(page.locator("//span[@id=\"expirePricingTitle\"]//b")).toContainText(vars["RequiredBidID"]);
    await expect(page.locator("//div[text()=\"Company: \"]//following-sibling::h4")).toContainText(vars["CompanyNameDetails"]);
    vars["BidValuePopUp"] = await page.locator("//div[text()=\"Bid Value: \"]//following-sibling::h4").textContent() || '';
    vars["BidValuePopUp"] = String(vars["BidValuePopUp"]).replace(/\$\,/g, '');
    expect(String(vars["TotalLoanAmount"])).toBe(vars["BidValuePopUp"]);
    await expect(page.locator("//div[text()=\"Total Loans: \"]//following-sibling::h4")).toContainText(vars["CountOfUnlockedLoans"]);
    await page.locator("//button[@aria-label=\"Yes, Expire\"]").click();
    await page.reload();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").clear();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdPriceOffered"]);
    await page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//td[@data-title=\"Status\"]//span").waitFor({ state: 'visible' });
    vars["BidStatusPriceOffered"] = await page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//td[@data-title=\"Status\"]//span").textContent() || '';
    vars["BidStatusPriceOffered"] = String(vars["BidStatusPriceOffered"]).trim();
    expect(String(vars["BidStatusPriceOffered"])).toBe("Expired");
    await page.locator("//td[@data-title=\"Bid Req. ID\"]//a[contains(text(),\"$|BidReqIdPriceOffered|\")]").click();
    await page.locator("//button[text()[normalize-space() = \"Get Price\"]]").waitFor({ state: 'visible' });
    await expect(page.locator("//button[text()[normalize-space() = \"Get Price\"]]")).toBeVisible();
    vars["TotalCountofLoans"] = String(await page.locator("//td[@data-title=\"Corr. Loan#\"]").count());
    vars["count"] = "1";
    vars["TotalLoanAmount"] = "0";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["TotalCountofLoans"]))) {
      vars["IndividualLoanAmount"] = await page.locator("(//td[@data-title=\"Loan Amount\"])[$|count|]").textContent() || '';
      vars["TotalLoanAmount"] = (parseFloat(String(vars["TotalLoanAmount"])) + parseFloat(String(vars["IndividualLoanAmount"]))).toFixed(0);
      vars["count"] = (parseFloat(String(vars["count"])) + parseFloat(String("1"))).toFixed(0);
    }
    await page.locator("//i[contains(@class,'fa-arrow-left')]").click();
    await page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//button[@aria-label=\"Change Status\"]").waitFor({ state: 'visible' });
    await page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//button[@aria-label=\"Change Status\"]").click();
    await page.locator("//h5[text()=\"Change Status\"]//ancestor::div//button[@aria-label=\"Change Status\"]").waitFor({ state: 'visible' });
    await expect(page.locator("//span[@id=\"changeStatusTitle\"]//b")).toContainText(vars["RequiredBidID"]);
    // [DISABLED] Verify that the element Company Name(Actions Popup) displays text CompanyNameDetails and With Scrollable FALSE
    // await expect(page.locator("//div[text()=\"Company: \"]//following-sibling::h4")).toContainText(vars["CompanyNameDetails"]);
    await expect(page.locator("//div[text()=\"Company: \"]//following-sibling::h4")).toContainText(vars["CompanyNameDetails"]);
    vars["BidValuePopup"] = await page.locator("//div[text()=\"Bid Value: \"]//following-sibling::h4").textContent() || '';
    vars["BidValuePopup"] = String(vars["BidValuePopup"]).replace(/\$\,/g, '');
    expect(String(vars["TotalLoanAmount"])).toBe(vars["BidValuePopup"]);
    await expect(page.locator("//div[text()=\"Total Loans: \"]//following-sibling::h4")).toContainText(vars["TotalCountofLoans"]);
    await page.locator("//h5[text()=\"Change Status\"]//ancestor::div//button[@aria-label=\"Change Status\"]").click();
    await page.reload();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").clear();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdPriceOffered"]);
    await page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//td[@data-title=\"Status\"]//span").waitFor({ state: 'visible' });
    vars["BidStatusPriceOffered"] = await page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//td[@data-title=\"Status\"]//span").textContent() || '';
    vars["BidStatusPriceOffered"] = String(vars["BidStatusPriceOffered"]).trim();
    expect(String(vars["BidStatusPriceOffered"])).toBe("Partially Committed");
  });
});
