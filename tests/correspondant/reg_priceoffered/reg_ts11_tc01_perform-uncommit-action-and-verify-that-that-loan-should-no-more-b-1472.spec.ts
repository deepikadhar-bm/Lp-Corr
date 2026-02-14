import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_PriceOffered', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS11_TC01_Perform uncommit action, and verify that that loan should no more be in committed state, and verify the auth limit, open auth limit and the Last committed bid values along with the [+cou', async ({ page }) => {
    // Prerequisite: REG_TS01_TC01_Perform submit for pricing action, and then verify the status should be updated to pri
    // TODO: Ensure prerequisite test passes first

    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").click();
    vars["BidReqIdPriceOffered"] = vars["RequestIDDetails"];
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdPriceOffered"]);
    await page.waitForLoadState('networkidle');
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]").click();
    await page.locator("//div[normalize-space(text())=\"Last Committed Bid:\"]/following-sibling::div").waitFor({ state: 'visible' });
    vars["LastCommittedBidBeforeCommit"] = await page.locator("//div[normalize-space(text())=\"Last Committed Bid:\"]/following-sibling::div").textContent() || '';
    vars["LastCommittedBidBeforeCommit"] = String('').split("|")["0"] || '';
    vars["LastCommittedBidBeforeCommit"] = String(vars["LastCommittedBidBeforeCommit"]).trim();
    vars["LastCommitLoanAmountBeforeCommit"] = await page.locator("//div[contains(text(),\"Last Committed Bid:\")]//following::span[1]").textContent() || '';
    vars["LastCommitLoanAmountBeforeCommit"] = String(vars["LastCommitLoanAmountBeforeCommit"]).substring(3);
    await page.locator("(//input[contains(@aria-label, \"Select loan\") and @type=\"checkbox\"])[1]").check();
    vars["CommittedLoan"] = await page.locator("//tr[@class=\"row-highlight\"]/.//button[contains(@aria-label,\"View loan details\")]").textContent() || '';
    await page.locator("//button[text()[normalize-space() = \"Get Price\"]]").waitFor({ state: 'visible' });
    await page.locator("//button[text()[normalize-space() = \"Get Price\"]]").click();
    await page.locator("//button[@id='commitdropdownMenuButton']").waitFor({ state: 'visible' });
    await page.locator("//button[@id='commitdropdownMenuButton']").click();
    await page.locator("//span[text()=\"Yes, Commit\"]//parent::button").click();
    await page.locator("//button[contains(text(),\"Okay\")]").waitFor({ state: 'visible' });
    await page.locator("//button[contains(text(),\"Okay\")]").click();
    await page.waitForLoadState('networkidle');
    vars["OpenAuthLimitAfterCommit"] = await page.locator("//div[text()=\"Open Auth Limit: \"]//..//div[@class=\"fw-semibold\"]").textContent() || '';
    vars["OpenAuthLimitAfterCommit"] = String('').split("(")["0"] || '';
    vars["AuthLimitAfterCommit"] = await page.locator("//div[normalize-space(text())=\"Auth Limit:\"]//following-sibling::div").textContent() || '';
    vars["CommittedLoansCountAfterCommit"] = await page.locator("//span[contains(text(),\"Locked/Committed Loans\")]/following-sibling::span[contains(@class,\"counter\")]").textContent() || '';
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//input[@id='searchTagInput']").click();
    await page.locator("//input[@id='searchTagInput']").fill(vars["BidReqIdPriceOffered"]);
    await page.locator("//span[text()=\"Bid Request ID\"]").click();
    await page.waitForLoadState('networkidle');
    await page.locator("//div[contains(text(),\"$|BidReqIdPriceOffered|\")]/ancestor::tr/td[@data-title=\"Comm. ID\"]").click();
    await page.locator("//button[contains(text(),\"$|CommittedLoan|\")]/ancestor::tr//input[@type=\"checkbox\"]").waitFor({ state: 'visible' });
    await page.locator("//button[contains(text(),\"$|CommittedLoan|\")]/ancestor::tr//input[@type=\"checkbox\"]").check();
    vars["SelectedLoansCount"] = String(await page.locator("//tr[@class=\"row-highlight\"]").count());
    vars["UncommittedLoanAmount"] = await page.locator("//button[text()=\"$|CommittedLoan|\"]//ancestor::tr//td[@data-title=\"Loan Amount\"]").textContent() || '';
    vars["UncommittedLoanNum"] = await page.locator("//tr[contains(@class,\"row\")]//button[contains(@class,\"btn bg-transparent text-primary\")][1]").textContent() || '';
    await page.locator("//button[@id='commitdropdownMenuButton']").click();
    await expect(page.locator("//div[contains(@class,\"mb\")]//b")).toContainText(vars["BidReqIdPriceOffered"]);
    await expect(page.locator("//div[text()=\"Loan Value\"]//following-sibling::div/b")).toContainText(vars["UncommittedLoanAmount"]);
    await expect(page.locator("//div[text()=\"Selected Loans\"]//following-sibling::div/b")).toContainText(vars["SelectedLoansCount"]);
    await page.locator("//span[text()[normalize-space() = \"Yes, Uncommit\"]]").click();
    await page.locator("//button[contains(text(),\"Okay\")]").waitFor({ state: 'visible' });
    await expect(page.locator("//div[text()[normalize-space() = \"Uncommitted successfully\"]]")).toContainText("Uncommitted successfully");
    await page.locator("//button[contains(text(),\"Okay\")]").click();
    vars["ExpectedOpenAuthLimit"] = (parseFloat(String(vars["OpenAuthLimitAfterCommit"])) + parseFloat(String(vars["UncommittedLoanAmount"]))).toFixed(0);
    vars["ExpectedOpenAuthPercentage"] = (parseFloat(String(vars["ExpectedOpenAuthLimit"])) / parseFloat(String(vars["AuthLimitAfterCommit"]))).toFixed(4);
    vars["ExpectedOpenAuthPercentage"] = (parseFloat(String(vars["ExpectedOpenAuthPercentage"])) * parseFloat(String("100"))).toFixed(2);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdPriceOffered"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]").click();
    await page.locator("//div[@id=\"price-offered-list-tabs\"]/div//span[text()=\"All Loans\"]").waitFor({ state: 'visible' });
    await page.locator("//div[@id=\"price-offered-list-tabs\"]/div//span[text()=\"All Loans\"]").click();
    await expect(page.locator("//button[text()=\"$|UncommittedLoanNum|\"]")).toBeVisible();
    await expect(page.locator("//button[text()=\"$|UncommittedLoanNum|\"]//ancestor::tr//span[@aria-label=\"Committed loan\"]")).toBeVisible();
    await expect(page.locator("//button[text()=\"$|UncommittedLoanNum|\"]//ancestor::tr//input[@type=\"checkbox\"]")).toBeVisible();
    vars["OpenAuthLimit"] = await page.locator("//div[contains(text(),\"Open Auth Limit:\")]//following-sibling::div").textContent() || '';
    vars["OpenAuthLimitAfterUncommit"] = String('').split("(")["0"] || '';
    vars["OpenAuthLimitAfterUncommit"] = String(vars["OpenAuthLimitAfterUncommit"]).replace(/\$\,/g, '');
    vars["OpenAuthLimitAfterUncommit"] = String(vars["OpenAuthLimitAfterUncommit"]).trim();
    vars["OpenAuthLimitPercentageAfterUncommit"] = String('').split("(")["1"] || '';
    vars["OpenAuthLimitPercentageAfterUncommit"] = String(vars["OpenAuthLimitPercentageAfterUncommit"]).replace(/\)%/g, '');
    expect(String(vars["ExpectedOpenAuthLimit"])).toBe(vars["OpenAuthLimitAfterUncommit"]);
    expect(String(vars["ExpectedOpenAuthPercentage"])).toBe(vars["OpenAuthLimitPercentageAfterUncommit"]);
    vars["AuthLimitAfterUncommit"] = await page.locator("//div[normalize-space(text())=\"Auth Limit:\"]//following-sibling::div").textContent() || '';
    expect(String(vars["AuthLimitAfterCommit"])).toBe(vars["AuthLimitAfterUncommit"]);
    vars["LastCommittedBidAfterUncommit"] = await page.locator("//div[normalize-space(text())=\"Last Committed Bid:\"]/following-sibling::div").textContent() || '';
    vars["LastCommittedBidAfterUncommit"] = String('').split("|")["0"] || '';
    vars["LastCommittedBidAfterUncommit"] = String(vars["LastCommittedBidAfterUncommit"]).trim();
    expect(String(vars["LastCommittedBidBeforeCommit"])).toBe(vars["LastCommittedBidAfterUncommit"]);
    vars["LastCommitLoanAmountAfterUncommit"] = await page.locator("//div[contains(text(),\"Last Committed Bid:\")]//following::span[1]").textContent() || '';
    vars["LastCommitLoanAmountAfterUncommit"] = String(vars["LastCommitLoanAmountAfterUncommit"]).substring(3);
    expect(String(vars["LastCommitLoanAmountBeforeCommit"])).toBe(vars["LastCommitLoanAmountAfterUncommit"]);
    if (true) /* Element Actual Locked/Committed Loans is not visible */ {
      expect(String("0")).toBe(vars["CommittedLoansCountAfterCommit"]);
    } else {
      vars["CommittedLoansCountAfterUncommit"] = await page.locator("//span[contains(text(),\"Locked/Committed Loans\")]/following-sibling::span[contains(@class,\"counter\")]").textContent() || '';
      expect(String(vars["CommittedLoansCountAfterUncommit"])).toBe(vars["CommittedLoansCountAfterCommit"]);
    }
    // Write to test data profile: "RequestIDfrom11-1" = vars["BidReqIdPriceOffered"]
    // TODO: Test data profile writes need custom implementation
  });
});
