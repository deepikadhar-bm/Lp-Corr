import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS08_TC02_ Add loans to commitment for the commitment which is latest one and verify auth limit values', async ({ page }) => {
    // Prerequisite: REG_TS08_TC01_ Add loans to commitment for the commitment which is not latest one and verify auth li
    // TODO: Ensure prerequisite test passes first

    await page.locator("(//div[text()=\"Commit. ID\"]//following-sibling::h5)[last()]").waitFor({ state: 'visible' });
    vars["CommitID"] = await page.locator("(//div[text()=\"Commit. ID\"]//following-sibling::h5)[last()]").textContent() || '';
    vars["LatestCommitmentOrderScreen"] = await page.locator("(//div[text()=\"Commit. #\"]//following-sibling::h5)[last()]").textContent() || '';
    vars["LastCommittedBidTime"] = await page.locator("(//div[text()=\"Commit. Time\"]//following-sibling::h5)[last()]").textContent() || '';
    vars["LastCommittedBidDate"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC" };
      const fmt = "M/d/yy";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    vars[""] = String(vars["LastCommittedBidDate"]) + ' ' + String(vars["LastCommittedBidTime"]);
    vars["OpenAuthLimit"] = await page.locator("//div[contains(text(),\"Open Auth Limit:\")]//following-sibling::div").textContent() || '';
    vars["OpenAuthLimitBeforeCommit"] = String('').split("(")["0"] || '';
    vars["AuthLimitBeforeCommit"] = await page.locator("//div[normalize-space(text())=\"Auth Limit:\"]//following-sibling::div").textContent() || '';
    vars["LastCommittedBidLoanAmountBeforeCommit"] = await page.locator("//div[contains(text(),\"Last Committed Bid:\")]//following::span[1]").textContent() || '';
    vars["LastCommittedBidLoanAmountBeforeCommit"] = String(vars["LastCommittedBidLoanAmountBeforeCommit"]).substring(3);
    await page.locator("//div[text()[normalize-space() = \"Total Loans\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@role=\"cell\"]//input[@type=\"checkbox\"]").check();
    vars["CommittedCorrLoan"] = await page.locator("//tr[contains(@class,\"row\")]//button[contains(@class,\"btn bg-transparent text-primary\")][1]").textContent() || '';
    vars["CommittedLastNameTotalLoans"] = await page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Last Name\"]").textContent() || '';
    vars["CommittedLoanAmountTotalLoans"] = await page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Loan Amount\"]").textContent() || '';
    vars["CommittedLoanAmountTotalLoans"] = String(vars["CommittedLoanAmountTotalLoans"]).trim();
    vars["CommittedIntRateTotalLoans"] = await page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Int. Rate\"]").textContent() || '';
    vars["CommittedRefSecProdTotalLoans"] = await page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Ref Sec Prod.\"]").textContent() || '';
    vars["CommittedRefSecPriceTotalLoans"] = await page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Ref Sec Price\"]  ").textContent() || '';
    vars["CommittedGrossPriceTotalLoans"] = await page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Gross Price\"]").textContent() || '';
    vars["CommittedHedgeRatioTotalLoans"] = await page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Hedge Ratio\"]  ").textContent() || '';
    vars["CommittedCurrMarketValueTotalLoans"] = await page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Curr Market Value\"]").textContent() || '';
    vars["CommittedMarkAdjTotalLoans"] = await page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Mark Adj\"]").textContent() || '';
    vars["CommittedCurrGrossTotalLoans"] = await page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Curr Gross\"]").textContent() || '';
    await page.locator("//button[@id='commitdropdownMenuButton']").waitFor({ state: 'visible' });
    await page.locator("//button[@id='commitdropdownMenuButton']").click();
    await page.locator("//div[text()=\"$|CommitID|\"]//preceding-sibling::div[contains(text(),\"Commitment Order\")]").click();
    await page.locator("//span[text()[normalize-space() = \"Yes, Commit\"]]").click();
    await page.locator("//button[text()[normalize-space() = \"Okay\"]]").waitFor({ state: 'visible' });
    await page.locator("//button[text()[normalize-space() = \"Okay\"]]").click();
    await page.locator("//span[contains(text(),\" Total Committed Loans\")]").waitFor({ state: 'visible' });
    await page.locator("//span[contains(text(),\" Total Committed Loans\")]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//div[text()=\"Commit. ID\"]//following-sibling::h5[text()=\"$|CommitID|\"]//ancestor::div[contains(@class,\"accordion-item\")]//div[@class=\"accordion-body\"]//tbody//button[\"$|CommittedCorrLoan|\"]")).toBeVisible();
    vars["LatestCommittedCommitmentOrder"] = await page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//div[@class=\"commit-order\"]").textContent() || '';
    expect(String(vars["LatestCommitmentOrderScreen"])).toBe(vars["LatestCommittedCommitmentOrder"]);
    await expect(page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Last Name\"]")).toContainText(vars["CommittedLastNameTotalLoans"]);
    await expect(page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Loan Amount\"]")).toContainText(vars["CommittedLoanAmountTotalLoans"]);
    await expect(page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Int. Rate\"]")).toContainText(vars["CommittedIntRateTotalLoans"]);
    await expect(page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Ref Sec Prod.\"]")).toContainText(vars["CommittedRefSecProdTotalLoans"]);
    await expect(page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Ref Sec Price\"]  ")).toContainText(vars["CommittedRefSecPriceTotalLoans"]);
    await expect(page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Gross Price\"]")).toContainText(vars["CommittedGrossPriceTotalLoans"]);
    await expect(page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Hedge Ratio\"]  ")).toContainText(vars["CommittedHedgeRatioTotalLoans"]);
    await expect(page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Curr Market Value\"]")).toContainText(vars["CommittedCurrMarketValueTotalLoans"]);
    await expect(page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Mark Adj\"]")).toContainText(vars["CommittedMarkAdjTotalLoans"]);
    await expect(page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Curr Gross\"]")).toContainText(vars["CommittedCurrGrossTotalLoans"]);
    await page.locator("//div[contains(text(),\"Open Auth Limit:\")]//following-sibling::div").scrollIntoViewIfNeeded();
    vars["OpenAuthLimit"] = await page.locator("//div[contains(text(),\"Open Auth Limit:\")]//following-sibling::div").textContent() || '';
    vars["OpenAuthLimitAfterCommit"] = String('').split("(")["0"] || '';
    vars["OpenAuthLimitAfterCommit"] = String(vars["OpenAuthLimitAfterCommit"]).replace(/\$\,/g, '');
    vars["OpenAuthLimitAfterCommit"] = String(vars["OpenAuthLimitAfterCommit"]).trim();
    vars["OpenAuthLimitPercentageAfterCommit"] = String('').split("(")["1"] || '';
    vars["OpenAuthLimitPercentageAfterCommit"] = String(vars["OpenAuthLimitPercentageAfterCommit"]).replace(/\)%/g, '');
    vars["AuthLimitAfterCommit"] = await page.locator("//div[normalize-space(text())=\"Auth Limit:\"]//following-sibling::div").textContent() || '';
    vars["LastCommittedBidAfterCommit"] = await page.locator("//div[normalize-space(text())=\"Last Committed Bid:\"]/following-sibling::div").textContent() || '';
    vars["LastCommittedBidAfterCommit"] = String('').split("|")["0"] || '';
    vars["LastCommittedBidAfterCommit"] = String(vars["LastCommittedBidAfterCommit"]).trim();
    vars["LastCommittedBidLoanAmountAfterCommit"] = await page.locator("//div[contains(text(),\"Last Committed Bid:\")]//following::span[1]").textContent() || '';
    vars["LastCommittedBidLoanAmountAfterCommit"] = String(vars["LastCommittedBidLoanAmountAfterCommit"]).substring(3);
    vars["LastCommittedBidLoanAmountAfterCommit"] = String(vars["LastCommittedBidLoanAmountAfterCommit"]).replace(/\$\,/g, '');
    vars["ExpectedOpenAuthLimit"] = (parseFloat(String(vars["OpenAuthLimitBeforeCommit"])) - parseFloat(String(vars["CommittedLoanAmountTotalLoans"]))).toFixed(0);
    vars["ExpectedOpenAuthLimitPercentage"] = (parseFloat(String(vars["ExpectedOpenAuthLimit"])) / parseFloat(String(vars["AuthLimitBeforeCommit"]))).toFixed(4);
    vars["ExpectedOpenAuthLimitPercentage"] = (parseFloat(String(vars["ExpectedOpenAuthLimitPercentage"])) * parseFloat(String("100"))).toFixed(2);
    vars["ExpectedLastCommittedLoanAmount"] = (parseFloat(String(vars["LastCommittedBidLoanAmountBeforeCommit"])) + parseFloat(String(vars["CommittedLoanAmountTotalLoans"]))).toFixed(0);
    expect(String(vars["ExpectedOpenAuthLimit"])).toBe(vars["OpenAuthLimitAfterCommit"]);
    expect(String(vars["ExpectedOpenAuthLimitPercentage"])).toBe(vars["OpenAuthLimitPercentageAfterCommit"]);
    expect(String(vars["AuthLimitBeforeCommit"])).toBe(vars["AuthLimitAfterCommit"]);
    expect(String(vars["ExpectedLastCommittedBidDateAndTime"])).toBe(vars["LastCommittedBidAfterCommit"]);
    expect(String(vars["ExpectedLastCommittedLoanAmount"])).toBe(vars["LastCommittedBidLoanAmountAfterCommit"]);
  });
});
