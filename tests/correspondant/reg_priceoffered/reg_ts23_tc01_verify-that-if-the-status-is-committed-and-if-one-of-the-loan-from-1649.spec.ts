import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_PriceOffered', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS23_TC01_Verify that if the status is committed and if one of the loan from the list is uncommitted, then the status should be updated as partially committed', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["BidReqIdPriceOffered"] = testData["RequestIDfrom22-3.1"];
    // [DISABLED] Clear the existing text from Search Field in Price Offered Page and enter BidReqIdPriceOffered
    // await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(String(vars["BidReqIdPriceOffered"]));
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdPriceOffered"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]").click();
    await page.locator("//span[contains(text(),\"Locked/Committed Loans\")]/following-sibling::span[contains(@class,\"counter\")]").waitFor({ state: 'visible' });
    vars["CommittedLoansCountBeforeUnommit"] = await page.locator("//span[contains(text(),\"Locked/Committed Loans\")]/following-sibling::span[contains(@class,\"counter\")]").textContent() || '';
    vars["OpenAuthLimit"] = await page.locator("//div[contains(text(),\"Open Auth Limit:\")]//following-sibling::div").textContent() || '';
    vars["OpenAuthLimitBeforeUncommit"] = String('').split("(")["0"] || '';
    vars["AuthLimitBeforeUncommit"] = await page.locator("//div[normalize-space(text())=\"Auth Limit:\"]//following-sibling::div").textContent() || '';
    vars["LastCommittedBidBeforeUncommit"] = await page.locator("//div[normalize-space(text())=\"Last Committed Bid:\"]/following-sibling::div").textContent() || '';
    vars["LastCommittedBidBeforeUncommit"] = String('').split("|")["0"] || '';
    vars["LastCommittedBidBeforeUncommit"] = String(vars["LastCommittedBidBeforeUncommit"]).trim();
    vars["LastCommittedLoanAmountBeforeUncommit"] = await page.locator("//div[contains(text(),\"Last Committed Bid:\")]//following::span[1]").textContent() || '';
    vars["LastCommittedLoanAmountBeforeUncommit"] = String(vars["LastCommittedLoanAmountBeforeUncommit"]).substring(3);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//div//input[@placeholder=\"Search\"]").click();
    await page.locator("//div//input[@placeholder=\"Search\"]").fill(vars["BidReqIdPriceOffered"]);
    await page.locator("//span[normalize-space(text())=\"Bid Request ID\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//div[contains(text(),\"$|BidReqIdPriceOffered|\")]/ancestor::tr/td[@data-title=\"Comm. ID\"]").waitFor({ state: 'visible' });
    await page.locator("//div[contains(text(),\"$|BidReqIdPriceOffered|\")]/ancestor::tr/td[@data-title=\"Comm. ID\"]").click();
    await page.locator("//tbody//input[@type=\"checkbox\"]").check();
    vars["UncommittedLoanNum"] = await page.locator("//tr[contains(@class,\"row\")]//button[contains(@class,\"btn bg-transparent text-primary\")][1]").textContent() || '';
    vars["UncommittedLoanAmount"] = await page.locator("//tr[@class=\"row-highlight\"]//td[@data-title=\"Loan Amount\"]").textContent() || '';
    await page.locator("//button[@id='commitdropdownMenuButton']").waitFor({ state: 'visible' });
    await page.locator("//button[@id='commitdropdownMenuButton']").click();
    await page.locator("//span[text()[normalize-space() = \"Yes, Uncommit\"]]").click();
    await page.waitForLoadState('networkidle');
    if (true) /* Element Okay Button is visible */ {
      await page.locator("//button[text()[normalize-space() = \"Okay\"]]").waitFor({ state: 'visible' });
      await page.locator("//button[text()[normalize-space() = \"Okay\"]]").click();
    }
    // [DISABLED] Perform subtraction on LastCommittedLoanAmountBeforeUncommit and UncommittedLoanAmount and store the result inside a ExpectedLastCommittedLoanAmount considering 0 decimal places
    // vars["ExpectedLastCommittedLoanAmount"] = (parseFloat(String(vars["LastCommittedLoanAmountBeforeUncommit"])) - parseFloat(String(vars["UncommittedLoanAmount"]))).toFixed(0);
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").waitFor({ state: 'visible' });
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").click();
    // [DISABLED] Enter BidReqIdPriceOffered in the Search Field in Price Offered Page field
    // await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdPriceOffered"]);
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(String(vars["BidReqIdPriceOffered"]));
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    while (!(await page.locator("//div[contains(@aria-label,\"Status\")]//span[contains(text(), \"Partially Committed\")]").isVisible())) {
      await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(String(vars["BidReqIdPriceOffered"]));
      // [DISABLED] Enter BidReqIdPriceOffered in the Search Field in Price Offered Page field
      // await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdPriceOffered"]);
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      await page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//td[@data-title=\"Status\"]//span").waitFor({ state: 'visible' });
      vars["BidStatusPriceOfferedPage"] = await page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//td[@data-title=\"Status\"]//span").textContent() || '';
      vars["BidStatusPriceOfferedPage"] = String(vars["BidStatusPriceOfferedPage"]).trim();
      expect(String(vars["BidStatusPriceOfferedPage"])).toBe("Partially Committed");
    }
    await page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]").click();
    await page.locator("//button[text()=\"$|UncommittedLoanNum|\"]").waitFor({ state: 'visible' });
    await expect(page.locator("//button[text()=\"$|UncommittedLoanNum|\"]")).toBeVisible();
    vars["OpenAuthLimit"] = await page.locator("//div[text()=\"Open Auth Limit: \"]//..//div[@class=\"fw-semibold\"]").textContent() || '';
    vars["OpenAuthLimitAfterUncommit"] = String('').split("(")["0"] || '';
    vars["OpenAuthLimitAfterUncommit"] = String(vars["OpenAuthLimitAfterUncommit"]).replace(/\$\,/g, '');
    vars["OpenAuthLimitAfterUncommit"] = String(vars["OpenAuthLimitAfterUncommit"]).trim();
    vars["OpenAuthLimitPercentageAfterUncommit"] = String('').split("(")["1"] || '';
    vars["OpenAuthLimitPercentageAfterUncommit"] = String(vars["OpenAuthLimitPercentageAfterUncommit"]).replace(/\)%/g, '');
    vars["AuthLimitAfterUncommit"] = await page.locator("//div[normalize-space(text())=\"Auth Limit:\"]//following-sibling::div").textContent() || '';
    vars["LastCommittedBidAfterUnommit"] = await page.locator("//div[normalize-space(text())=\"Last Committed Bid:\"]/following-sibling::div").textContent() || '';
    vars["LastCommittedBidAfterUnommit"] = String('').split("|")["0"] || '';
    vars["LastCommittedBidAfterUnommit"] = String(vars["LastCommittedBidAfterUnommit"]).trim();
    vars["LastCommittedLoanAmountAfterUncommit"] = await page.locator("//div[contains(text(),\"Last Committed Bid:\")]//following::span[1]").textContent() || '';
    vars["LastCommittedLoanAmountAfterUncommit"] = String(vars["LastCommittedLoanAmountAfterUncommit"]).substring(3);
    await page.locator("//div[@id='price-offered-list-tabs']//span[text()[normalize-space() = \"Locked/Committed Loans\"]]").click();
    await page.locator("//button[contains(text(),\"Paste Loans\")]\n").waitFor({ state: 'hidden' });
    await expect(page.locator("//button[contains(text(),\"Paste Loans\")]\n")).toBeVisible();
    await expect(page.locator("//button[@id='commitdropdownMenuButton']")).toBeVisible();
    await expect(page.locator("//button[text()=\"$|UncommittedLoanNum|\"]")).toBeVisible();
    vars["ExpectedOpenAuthLimit"] = (parseFloat(String(vars["OpenAuthLimitBeforeUncommit"])) + parseFloat(String(vars["UncommittedLoanAmount"]))).toFixed(0);
    vars["ExpectedOpenAuthPercentage"] = (parseFloat(String(vars["ExpectedOpenAuthLimit"])) / parseFloat(String(vars["AuthLimitAfterUncommit"]))).toFixed(4);
    vars["ExpectedOpenAuthPercentage"] = (parseFloat(String(vars["ExpectedOpenAuthPercentage"])) * parseFloat(String("100"))).toFixed(2);
    expect(String(vars["ExpectedOpenAuthLimit"])).toBe(vars["OpenAuthLimitAfterUncommit"]);
    expect(String(vars["ExpectedOpenAuthPercentage"])).toBe(vars["OpenAuthLimitPercentageAfterUncommit"]);
    expect(String(vars["AuthLimitBeforeUncommit"])).toBe(vars["AuthLimitAfterUncommit"]);
    expect(String(vars["LastCommittedBidBeforeUncommit"])).toBe(vars["LastCommittedBidAfterUnommit"]);
    expect(String(vars["LastCommittedLoanAmountBeforeUncommit"])).toBe(vars["LastCommittedLoanAmountAfterUncommit"]);
    vars["CommittedLoansCountAfterUncommit"] = await page.locator("//span[contains(text(),\"Locked/Committed Loans\")]/following-sibling::span[contains(@class,\"counter\")]").textContent() || '';
    expect(String(vars["CommittedLoansCountBeforeUnommit"])).toBe(vars["CommittedLoansCountAfterUncommit"]);
    await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdPriceOffered"]);
    await page.keyboard.press('Enter');
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["BidStatusBidReqPage"] = await page.locator("//button[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//td[@data-title=\"Status\"]//span").textContent() || '';
    vars["BidStatusBidReqPage"] = String(vars["BidStatusBidReqPage"]).trim();
    expect(String(vars["BidStatusBidReqPage"])).toBe("Partially Committed");
    await page.locator("//button[contains(text(),\"$|BidReqIdPriceOffered|\")]").click();
    await page.locator("//div[contains(@aria-label,\"Status:\")]//h5").waitFor({ state: 'visible' });
    vars["StatusBidReqDetails"] = await page.locator("//div[contains(@aria-label,\"Status:\")]//h5").textContent() || '';
    expect(String(vars["StatusBidReqDetails"])).toBe("Partially Committed");
  });
});
