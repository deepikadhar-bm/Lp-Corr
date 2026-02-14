import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_PriceOffered', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS10_TC02_Try to commit a duplicate loan and Verify the bid, loan value, and selected loan count displayed in the Commit Selected Loans popup. After a successful commitment, verify that a commitme', async ({ page }) => {
    // Prerequisite: REG_TS02_TC01.1_Perform submit for pricing action, and then verify the status should be updated to p
    // TODO: Ensure prerequisite test passes first

    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").click();
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["RequestIDDetails"]);
    await page.waitForLoadState('networkidle');
    await page.keyboard.press('Enter');
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//div[contains(@aria-label,\"Execution type: CHASE_DIRECT\")]/../..//a[contains(@aria-label,\"View details for price offered \")]").click();
    if (true) /* Element Committed Loan is not visible */ {
      await page.locator("(//input[contains(@aria-label, \"Select loan\") and @type=\"checkbox\"])[1]").check();
      await page.locator("//button[text()[normalize-space() = \"Get Price\"]]").click();
      await page.locator("//button[@id='commitdropdownMenuButton']").waitFor({ state: 'visible' });
      await page.locator("//button[@id='commitdropdownMenuButton']").click();
      await page.locator("(//div[@class=\"modal-footer\"]/button)[2]").waitFor({ state: 'visible' });
      await page.locator("(//div[@class=\"modal-footer\"]/button)[2]").click();
      await page.locator("(//div[@class=\"modal-footer\"]/button)[2]").waitFor({ state: 'hidden' });
      await page.locator("//div[@class=\"modal-footer\"]//button[contains(text(), \"Okay\")]").waitFor({ state: 'visible' });
      await page.locator("//div[@class=\"modal-footer\"]//button[contains(text(), \"Okay\")]").click();
    }
    await page.locator("//span[text()=\"All Loans\"]").click();
    vars["CommittedLoanNumber"] = await page.locator("//span[@aria-label=\"Committed loan\"]//..//..//button[contains(@aria-label, \"View loan details for\")]").textContent() || '';
    await expect(page.locator("//button[text()=\"$|CommittedLoanNumber|\"]//ancestor::tr//span[contains(@aria-label,\"Committed loan\")]")).toBeVisible();
    vars["OpenAuthLimit"] = await page.locator("//div[contains(text(),\"Open Auth Limit:\")]//following-sibling::div").textContent() || '';
    vars["OpenAuthLimitChaseDirect"] = String('').split("(")["0"] || '';
    vars["OpenAuthLimitPercentageChaseDirect"] = String('').split("(")["1"] || '';
    vars["OpenAuthLimitPercentageChaseDirect"] = String(vars["OpenAuthLimitPercentageChaseDirect"]).replace(/\)%/g, '');
    vars["AuthLimitChaseDirect"] = await page.locator("//div[normalize-space(text())=\"Auth Limit:\"]/following-sibling::div").textContent() || '';
    vars["LastCommittedBidChaseDirect"] = await page.locator("//div[normalize-space(text())=\"Last Committed Bid:\"]/following-sibling::div").textContent() || '';
    vars["LastCommittedBidChaseDirect"] = String('').split("|")["0"] || '';
    vars["LastCommittedBidChaseDirect"] = String(vars["LastCommittedBidChaseDirect"]).trim();
    vars["LastCommittedBidLoanAmountChaseDirect"] = await page.locator("//div[contains(text(),\"Last Committed Bid:\")]//following::span[1]").textContent() || '';
    vars["LastCommittedBidLoanAmountChaseDirect"] = String(vars["LastCommittedBidLoanAmountChaseDirect"]).substring(3);
    await page.locator("//i[contains(@class,'fa-arrow-left')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//div[contains(@aria-label,\"Execution type: STANDARD\")]/../..//a[contains(@aria-label,\"View details for price offered \")]").click();
    await page.locator("//button[text()=\"$|CommittedLoanNumber|\"]/ancestor::tr//input[@type=\"checkbox\"]").waitFor({ state: 'visible' });
    await page.locator("//button[text()=\"$|CommittedLoanNumber|\"]/ancestor::tr//input[@type=\"checkbox\"]").check();
    vars["LoanCount(Screen)"] = String(await page.locator("//tr[@class=\"row-highlight\"]").count());
    vars["LoanAmountValue(Screen)"] = await page.locator("//tr[@class=\"row-highlight\"]//*[contains(@aria-label, \"Loan amount:\")]").textContent() || '';
    await page.locator("//button[text()[normalize-space() = \"Get Price\"]]").click();
    await page.locator("//button[@id='commitdropdownMenuButton']").waitFor({ state: 'visible' });
    await page.locator("//button[@id='commitdropdownMenuButton']").click();
    vars["BidRequestIDPopup"] = await page.locator("//div[@class=\"mb-2\"]//b[text()]").textContent() || '';
    vars["PriceofferedLoanvalue(Popup)"] = await page.locator("//div[text()=\"Loan Value\"]//..//b[text()]").textContent() || '';
    vars["CountofSelectedLoans(Popup)"] = await page.locator("//div[text()=\"Selected Loans\"]//..//b[text()]").textContent() || '';
    expect(String(vars["RequestIDDetails"])).toBe(vars["BidRequestIDPopup"]);
    expect(String(vars["LoanAmountValue(Screen)"])).toBe(vars["PriceofferedLoanvalue(Popup)"]);
    expect(String(vars["LoanCount(Screen)"])).toBe(vars["CountofSelectedLoans(Popup)"]);
    await page.locator("//span[text()=\"Yes, Commit\"]//parent::button").click();
    await page.locator("//button[text()[normalize-space() = \"Okay\"]]").waitFor({ state: 'visible' });
    vars["CommitmentUpdatedNumber"] = await page.locator("//span[@class=\"fw-bold\"]").textContent() || '';
    vars["CommitmentUpdatedValue"] = String(vars["CommitmentUpdatedNumber"]).length.toString();
    expect(String(vars["CommitmentUpdatedValue"])).toBe("8");
    vars["Loansfailed(Popup)"] = await page.locator("(//li[text()])[1]").textContent() || '';
    expect(String(vars["Loansfailed(Popup)"])).toBe("Loans failed to be added to commitment");
    vars["space"] = "key_blank";
    vars["DuplicateLoan(Popup)"] = "Loan" + vars["space"] + vars["CommittedLoanNumber"] + vars["space"] + "is a Duplicate loan. It is already committed";
    await expect(page.locator("(//li[text()])[2]")).toContainText(vars["DuplicateLoan(Popup)"]);
    await page.locator("//button[text()[normalize-space() = \"Okay\"]]").click();
    await page.locator("//div[@id='price-offered-list-tabs']//span[text()[normalize-space() = \"Locked/Committed Loans\"]]").waitFor({ state: 'visible' });
    vars["OpenAuthLimit"] = await page.locator("//div[contains(text(),\"Open Auth Limit:\")]//following-sibling::div").textContent() || '';
    vars["OpenAuthLimitStandard"] = String('').split("(")["0"] || '';
    vars["OpenAuthLimitPercentageStandard"] = String('').split("(")["1"] || '';
    vars["OpenAuthLimitPercentageStandard"] = String(vars["OpenAuthLimitPercentageStandard"]).replace(/\)%/g, '');
    vars["AuthLimitStandard"] = await page.locator("//div[normalize-space(text())=\"Auth Limit:\"]/following-sibling::div").textContent() || '';
    vars["LastCommitedBidStandard"] = await page.locator("//div[normalize-space(text())=\"Last Committed Bid:\"]/following-sibling::div").textContent() || '';
    vars["LastCommitedBidStandard"] = String('').split("|")["0"] || '';
    vars["LastCommitedBidStandard"] = String(vars["LastCommitedBidStandard"]).trim();
    vars["LastCommittedBidLoanAmountStandard"] = await page.locator("//div[contains(text(),\"Last Committed Bid:\")]//following::span[1]").textContent() || '';
    vars["LastCommittedBidLoanAmountStandard"] = String(vars["LastCommittedBidLoanAmountStandard"]).substring(3);
    await page.locator("//div[@id=\"price-offered-list-tabs\"]/div//span[text()=\"All Loans\"]").click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator("//button[text()=\"$|CommittedLoanNumber|\"]//ancestor::tr//span[contains(@aria-label,\"Committed loan\")]")).toBeVisible();
    expect(String(vars["OpenAuthLimitStandard"])).toBe(vars["OpenAuthLimitChaseDirect"]);
    expect(String(vars["OpenAuthLimitPercentageStandard"])).toBe(vars["OpenAuthLimitPercentageChaseDirect"]);
    expect(String(vars["AuthLimitStandard"])).toBe(vars["AuthLimitChaseDirect"]);
    expect(String(vars["LastCommitedBidStandard"])).toBe(vars["LastCommittedBidChaseDirect"]);
    expect(String(vars["LastCommittedBidLoanAmountStandard"])).toBe(vars["LastCommittedBidLoanAmountChaseDirect"]);
    // Write to test data profile: "RequestIDfrom10-2" = vars["RequestIDDetails"]
    // TODO: Test data profile writes need custom implementation
  });
});
