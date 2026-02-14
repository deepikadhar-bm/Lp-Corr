import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS06_TC03_Uncommit all loans from the commitment which is not latest commitment and verify the open auth limit values + last commit values', async ({ page }) => {
    // Prerequisite: REG_TS06_TC02_Uncommit a single loan from the commitment and verify the open auth limit value + Last
    // TODO: Ensure prerequisite test passes first

    await page.locator("//div[text()=\"Open Auth Limit: \"]//..//div[@class=\"fw-semibold\"]").waitFor({ state: 'visible' });
    vars["OpenAuthLimit"] = await page.locator("//div[text()=\"Open Auth Limit: \"]//..//div[@class=\"fw-semibold\"]").textContent() || '';
    vars["OpenAuthLimitBeforeUncommit"] = String('').split("(")["0"] || '';
    vars["AuthLimitBeforeUncommit"] = await page.locator("//div[text()=\"Auth Limit: \"]//..//div[@class=\"fw-semibold\"]").textContent() || '';
    vars["LastCommittedBidBeforeUncommit"] = await page.locator("//div[normalize-space(text())=\"Last Committed Bid:\"]/following-sibling::div").textContent() || '';
    vars["LastCommittedBidBeforeUncommit"] = String('').split("|")["0"] || '';
    vars["LatestCommittedBidLoanAmountBeforeUncommit"] = await page.locator("//div[contains(text(),\"Last Committed Bid:\")]//following::span[1]").textContent() || '';
    vars["LatestCommittedBidLoanAmountBeforeUncommit"] = String(vars["LatestCommittedBidLoanAmountBeforeUncommit"]).substring(3);
    vars["CommitmentIDBeforeUncommit"] = await page.locator("(//div[text()=\"Commit. ID\"]//following-sibling::h5)[2]").textContent() || '';
    await page.locator("(//input[@aria-label=\"Select all for \"])[2]").check();
    vars["UncommittedLoanNum"] = await page.locator("//tr[contains(@class,\"row\")]//button[contains(@class,\"btn bg-transparent text-primary\")][1]").textContent() || '';
    vars["UncommittedLoanAmount"] = await page.locator("//tr[@class=\"row-highlight\"]//td[@data-title=\"Loan Amount\"]").textContent() || '';
    await page.locator("//button[@id='commitdropdownMenuButton']").waitFor({ state: 'visible' });
    await page.locator("//button[@id='commitdropdownMenuButton']").click();
    await page.locator("//span[text()[normalize-space() = \"Yes, Uncommit\"]]").click();
    await page.locator("//button[text()[normalize-space() = \"Okay\"]]").waitFor({ state: 'visible' });
    await page.locator("//button[text()[normalize-space() = \"Okay\"]]").click();
    await page.locator("//span[contains(text(),\" Total Committed Loans\")]").waitFor({ state: 'visible' });
    await page.locator("//span[contains(text(),\" Total Committed Loans\")]").click();
    await expect(page.getByText(vars["CommitmentIDBeforeUncommit"])).not.toBeVisible();
    await expect(page.locator("//button[text()=\"$|UncommittedLoanNum|\"]")).toBeVisible();
    vars["OpenAuthLimit"] = await page.locator("//div[text()=\"Open Auth Limit: \"]//..//div[@class=\"fw-semibold\"]").textContent() || '';
    vars["OpenAuthLimitAfterUncommit"] = String('').split("(")["0"] || '';
    vars["OpenAuthLimitAfterUncommit"] = String(vars["OpenAuthLimitAfterUncommit"]).replace(/\$\,/g, '');
    vars["OpenAuthLimitAfterUncommit"] = String(vars["OpenAuthLimitAfterUncommit"]).trim();
    vars["OpenAuthLimitPercentageAfterUncommit"] = String('').split("(")["1"] || '';
    vars["OpenAuthLimitPercentageAfterUncommit"] = String(vars["OpenAuthLimitPercentageAfterUncommit"]).replace(/\)%/g, '');
    vars["AuthLimitAfterUncommit"] = await page.locator("//div[text()=\"Auth Limit: \"]//..//div[@class=\"fw-semibold\"]").textContent() || '';
    vars["LastCommittedBidAfterUncommit"] = await page.locator("//div[normalize-space(text())=\"Last Committed Bid:\"]/following-sibling::div").textContent() || '';
    vars["LastCommittedBidAfterUncommit"] = String('').split("|")["0"] || '';
    vars["LastCommittedBidLoanAmountAfterUncommit"] = await page.locator("//div[contains(text(),\"Last Committed Bid:\")]//following::span[1]").textContent() || '';
    vars["LastCommittedBidLoanAmountAfterUncommit"] = String(vars["LastCommittedBidLoanAmountAfterUncommit"]).substring(3);
    vars["ExpectedOpenAuthLimit"] = (parseFloat(String(vars["OpenAuthLimitBeforeUncommit"])) + parseFloat(String(vars["UncommittedLoanAmount"]))).toFixed(0);
    vars["ExpectedOpenAuthPercentage"] = (parseFloat(String(vars["ExpectedOpenAuthLimit"])) / parseFloat(String(vars["AuthLimitBeforeUncommit"]))).toFixed(4);
    vars["ExpectedOpenAuthPercentage"] = (parseFloat(String(vars["ExpectedOpenAuthPercentage"])) * parseFloat(String("100"))).toFixed(2);
    expect(String(vars["ExpectedOpenAuthLimit"])).toBe(vars["OpenAuthLimitAfterUncommit"]);
    expect(String(vars["ExpectedOpenAuthPercentage"])).toBe(vars["OpenAuthLimitPercentageAfterUncommit"]);
    expect(String(vars["AuthLimitBeforeUncommit"])).toBe(vars["AuthLimitAfterUncommit"]);
    expect(String(vars["LastCommittedBidBeforeUncommit"])).toBe(vars["LastCommittedBidAfterUncommit"]);
    expect(String(vars["LatestCommittedBidLoanAmountBeforeUncommit"])).toBe(vars["LastCommittedBidLoanAmountAfterUncommit"]);
  });
});
