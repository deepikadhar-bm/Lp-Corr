import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_PriceOffered', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS24_TC01_Verify that if the status is partially committed and if al the loan from the list is uncommitted, then the status should be updated back as price offered', async ({ page }) => {
    // Prerequisite: REG_TS01_TC01_Perform submit for pricing action, and then verify the status should be updated to pri
    // TODO: Ensure prerequisite test passes first

    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    vars["BidReqIdPriceOffered"] = vars["RequestIDDetails"];
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(String(vars["BidReqIdPriceOffered"]));
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]").click();
    await page.locator("//div[normalize-space(text())=\"Last Committed Bid:\"]/following-sibling::div").waitFor({ state: 'visible' });
    vars["LastCommittedBidBeforeUncommit"] = await page.locator("//div[normalize-space(text())=\"Last Committed Bid:\"]/following-sibling::div").textContent() || '';
    vars["LastCommittedBidBeforeUncommit"] = String('').split("|")["0"] || '';
    vars["LastCommittedBidBeforeUncommit"] = String(vars["LastCommittedBidBeforeUncommit"]).trim();
    vars["LastCommittedLoanAmountBeforeUncommit"] = await page.locator("//div[contains(text(),\"Last Committed Bid:\")]//following::span[1]").textContent() || '';
    vars["LastCommittedLoanAmountBeforeUncommit"] = String(vars["LastCommittedLoanAmountBeforeUncommit"]).substring(3);
    await page.locator("//tbody//input[@type=\"checkbox\"]").click();
    await page.locator("//button[normalize-space(text())=\"Get Price\"]").waitFor({ state: 'visible' });
    await page.locator("//button[normalize-space(text())=\"Get Price\"]").click();
    await page.locator("//button[@id='commitdropdownMenuButton']").waitFor({ state: 'visible' });
    await page.locator("//button[@id='commitdropdownMenuButton']").click();
    await page.locator("//span[text()=\"Yes, Commit\"]//parent::button").click();
    await page.locator("//button[contains(text(),\"Okay\")]").waitFor({ state: 'visible' });
    await page.locator("//button[contains(text(),\"Okay\")]").click();
    await page.locator("//div[@id='price-offered-list-tabs']/div[1]/div[2]").click();
    await page.locator("//button[text()[normalize-space() = \"Paste Loans\"]]").waitFor({ state: 'hidden' });
    vars["TotalCountLoanAmounts"] = String(await page.locator("//td[@data-title=\"Loan Amount\"]").count());
    vars["TotalCommittedLoanAmount"] = "0";
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["TotalCountLoanAmounts"]))) {
      vars["IndividualCommittedLoanAmount"] = await page.locator("(//td[@data-title=\"Loan Amount\"])[$|count|]").textContent() || '';
      vars["TotalCommittedLoanAmount"] = (parseFloat(String(vars["TotalCommittedLoanAmount"])) + parseFloat(String(vars["IndividualCommittedLoanAmount"]))).toFixed(0);
      vars["count"] = (parseFloat(String(vars["count"])) + parseFloat(String("1"))).toFixed(0);
    }
    vars["UncommittedLoanAmount"] = vars["TotalCommittedLoanAmount"];
    vars["OpenAuthLimit"] = await page.locator("//div[contains(text(),\"Open Auth Limit:\")]//following-sibling::div").textContent() || '';
    vars["OpenAuthLimitBeforeUncommit"] = String('').split("(")["0"] || '';
    vars["AuthLimitBeforeUncommit"] = await page.locator("//div[normalize-space(text())=\"Auth Limit:\"]//following-sibling::div").textContent() || '';
    await page.locator("//div[contains(@id,\"price-offered-back\")]//i").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(String(vars["BidReqIdPriceOffered"]));
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//td[@data-title=\"Status\"]//span")).toContainText("Partially Committed");
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//div//input[@placeholder=\"Search\"]").click();
    await page.locator("//div//input[@placeholder=\"Search\"]").fill(String(vars["BidReqIdPriceOffered"]));
    await page.locator("//span[normalize-space(text())=\"Bid Request ID\"]").click();
    await page.locator("//div[contains(text(),\"$|BidReqIdPriceOffered|\")]/ancestor::tr/td[@data-title=\"Comm. ID\"]").waitFor({ state: 'visible' });
    await page.locator("//div[contains(text(),\"$|BidReqIdPriceOffered|\")]/ancestor::tr/td[@data-title=\"Comm. ID\"]").click();
    vars["CommittedLoansCountBeforeUnommit"] = await page.locator("//span[contains(text(),\"Total Committed Loans\")]//following-sibling::span[contains(@class,\"counter\")]").textContent() || '';
    while (await page.locator("//input[normalize-space(@aria-label)=\"Select all for\" and @type=\"checkbox\"]").isVisible()) {
      await page.locator("//input[normalize-space(@aria-label)=\"Select all for\" and @type=\"checkbox\"]").check();
      await page.locator("//button[@id='commitdropdownMenuButton']").waitFor({ state: 'visible' });
      await page.locator("//button[@id='commitdropdownMenuButton']").click();
      await page.locator("//span[text()[normalize-space() = \"Yes, Uncommit\"]]").click();
      await page.locator("//button[text()[normalize-space() = \"Okay\"]]").waitFor({ state: 'visible' });
      await page.locator("//button[text()[normalize-space() = \"Okay\"]]").click();
      await page.locator("//span[contains(text(),\" Total Committed Loans\")]").waitFor({ state: 'visible' });
      await page.locator("//span[contains(text(),\" Total Committed Loans\")]").click();
    }
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").click();
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(String(vars["BidReqIdPriceOffered"]));
    await page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//td[@data-title=\"Status\"]//span").waitFor({ state: 'visible' });
    vars["BidStatusPriceOfferedPage"] = await page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//td[@data-title=\"Status\"]//span").textContent() || '';
    vars["BidStatusPriceOfferedPage"] = String(vars["BidStatusPriceOfferedPage"]).trim();
    expect(String(vars["BidStatusPriceOfferedPage"])).toBe("Price Offered");
    await page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]").click();
    await page.locator("//div[text()=\"Open Auth Limit: \"]//..//div[@class=\"fw-semibold\"]").waitFor({ state: 'visible' });
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
    vars["ExpectedOpenAuthLimit"] = (parseFloat(String(vars["OpenAuthLimitBeforeUncommit"])) + parseFloat(String(vars["UncommittedLoanAmount"]))).toFixed(0);
    vars["ExpectedOpenAuthPercentage"] = (parseFloat(String(vars["ExpectedOpenAuthLimit"])) / parseFloat(String(vars["AuthLimitAfterUncommit"]))).toFixed(4);
    vars["ExpectedOpenAuthPercentage"] = (parseFloat(String(vars["ExpectedOpenAuthPercentage"])) * parseFloat(String("100"))).toFixed(2);
    expect(String(vars["ExpectedOpenAuthLimit"])).toBe(vars["OpenAuthLimitAfterUncommit"]);
    expect(String(vars["ExpectedOpenAuthPercentage"])).toBe(vars["OpenAuthLimitPercentageAfterUncommit"]);
    expect(String(vars["AuthLimitBeforeUncommit"])).toBe(vars["AuthLimitAfterUncommit"]);
    expect(String(vars["LastCommittedBidBeforeUncommit"])).toBe(vars["LastCommittedBidAfterUnommit"]);
    expect(String(vars["LastCommittedLoanAmountBeforeUncommit"])).toBe(vars["LastCommittedLoanAmountAfterUncommit"]);
    await expect(page.locator("//span[contains(text(),\"Locked/Committed Loans\")]/following-sibling::span[contains(@class,\"counter\")]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(String(vars["BidReqIdPriceOffered"]));
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["BidStatusBidReqPage"] = await page.locator("//button[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//td[@data-title=\"Status\"]//span").textContent() || '';
    vars["BidStatusBidReqPage"] = String(vars["BidStatusBidReqPage"]).trim();
    expect(String(vars["BidStatusBidReqPage"])).toBe("Price Offered");
    await page.locator("//button[contains(text(),\"$|BidReqIdPriceOffered|\")]").click();
    await page.locator("//div[contains(@aria-label,\"Status:\")]//h5").waitFor({ state: 'visible' });
    vars["StatusBidReqDetails"] = await page.locator("//div[contains(@aria-label,\"Status:\")]//h5").textContent() || '';
    expect(String(vars["StatusBidReqDetails"])).toBe("Price Offered");
    // Write to test data profile: "RequestIDfrom24-1" = vars["BidReqIdPriceOffered"]
    // TODO: Test data profile writes need custom implementation
  });
});
