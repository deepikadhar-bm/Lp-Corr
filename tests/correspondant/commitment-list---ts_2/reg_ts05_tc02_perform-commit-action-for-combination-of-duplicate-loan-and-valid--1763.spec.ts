import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Commitment List - TS_2', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS05_TC02_Perform commit action for combination of duplicate loan and valid loan verify that commitment should be created and no loans should be displayed and that commitment record should be disp', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    vars["BidReqId"] = testData["RequestIdFrom5-1"];
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqId"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Execution Type\"]//div[contains(text(),\"STANDARD\")]//ancestor::tr//td[@data-title=\"Bid Req. ID\"]//a[contains(@aria-label,\"View details \")]").click();
    await page.locator("//div[@id=\"price-offered-list-tabs\"]/div//span[text()=\"All Loans\"]").click();
    await page.locator("//span[@aria-label=\"Committed loan\"]//ancestor::tr//button[contains(@aria-label,\"View loan details\")]").waitFor({ state: 'visible' });
    vars["CommittedLoanNumStandard"] = await page.locator("//span[@aria-label=\"Committed loan\"]//ancestor::tr//button[contains(@aria-label,\"View loan details\")]").textContent() || '';
    vars["UncommittedLoanNumStandard"] = await page.locator("//input[contains(@aria-label,\"Select loan\")]/ancestor::tr//button[contains(@aria-label,\"View loan details\")]").textContent() || '';
    vars["OpenAuthLimitBeforeCommit"] = await page.locator("//div[contains(text(),\"Open Auth Limit:\")]//following-sibling::div").textContent() || '';
    vars["OpenAuthLimitBeforeCommit"] = String('').split("(")["0"] || '';
    vars["AuthLimitBeforeCommit"] = await page.locator("//div[normalize-space(text())=\"Auth Limit:\"]//following-sibling::div").textContent() || '';
    await page.locator("//i[contains(@class,'fa-arrow-left')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Execution Type\"]//div[contains(text(),\"CHASE_DIRECT\")]//ancestor::tr//td[@data-title=\"Bid Req. ID\"]//a[contains(@aria-label,\"View details for\")]").click();
    await page.locator("//button[text()=\"$|UncommittedLoanNumStandard|\"]/ancestor::tr//input[@type=\"checkbox\"]").check();
    await page.locator("//button[text()=\"$|CommittedLoanNumStandard|\"]/ancestor::tr//input[@type=\"checkbox\"]").check();
    await page.locator("//button[normalize-space(text())=\"Get Price\"]").click();
    vars["LoanAmountFreshLoan"] = await page.locator("//button[text()=\"$|UncommittedLoanNumStandard|\"]//ancestor::tr//div[contains(@aria-label,\"Loan amount:\")]").textContent() || '';
    vars["ExpectedCommittedLoanAmount"] = String(vars["LoanAmountFreshLoan"]).trim();
    await page.locator("//button[@id='commitdropdownMenuButton']").waitFor({ state: 'visible' });
    await expect(page.locator("//button[@id='commitdropdownMenuButton']")).toBeEnabled();
    await page.locator("//button[@id='commitdropdownMenuButton']").click();
    await page.locator("//span[text()=\"Yes, Commit\"]//parent::button").click();
    vars["space"] = "key_blank";
    vars["DateAndTimeFormat"] = "M/d/yy" + vars["space"] + "h:mm a";
    vars["ExpectedBidCommittedDateAndTime"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC" };
      const fmt = "DateAndTimeFormat";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    await page.locator("//button[contains(text(),\"Okay\")]").waitFor({ state: 'visible' });
    vars["CommitmentID"] = await page.locator("//div[contains(text(),'Commitment')]/span\n").textContent() || '';
    await page.locator("//button[contains(text(),\"Okay\")]").click();
    await page.locator("//span[text()=\"All Loans\"]").waitFor({ state: 'visible' });
    await page.locator("//span[text()=\"All Loans\"]").click();
    await expect(page.locator("//button[text()=\"$|UncommittedLoanNumStandard|\"]//ancestor::tr//span[@aria-label=\"Committed loan\"]")).toBeVisible();
    vars["CommitmentOrderPriceOffered"] = await page.locator("//button[text()=\"$|UncommittedLoanNumStandard|\"]//ancestor::tr/td//div[contains(@class,\"commit-order\")]").textContent() || '';
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//input[@id='searchTagInput']").click();
    await page.locator("//input[@id='searchTagInput']").fill(vars["CommitmentID"]);
    await page.locator("//span[normalize-space(text())=\"Commitment ID\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//td[@data-title=\"Comm. ID\"]//a[normalize-space(text())=\"$|CommitmentID|\"]")).toBeVisible();
    await expect(page.getByText(vars["BidReqId"])).toBeVisible();
    await page.locator("//td[@data-title=\"Comm. ID\"]//a[normalize-space(text())=\"$|CommitmentID|\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText(vars["CommitmentID"])).toBeVisible();
    await expect(page.locator("//button[text()=\"$|UncommittedLoanNumStandard|\"]")).toBeVisible();
    await expect(page.locator("//button[text()=\"$|CommittedLoanNumStandard|\"]")).toBeVisible();
    await page.locator("//div[text()[normalize-space() = \"Total Loans\"]]").click();
    await page.locator("//tbody//input[@type=\"checkbox\"]").waitFor({ state: 'visible' });
    await page.locator("//tbody//input[@type=\"checkbox\"]").check();
    await page.locator("//button[@id='commitdropdownMenuButton']").waitFor({ state: 'visible' });
    await page.locator("//button[@id='commitdropdownMenuButton']").click();
    await expect(page.locator("//div[normalize-space(text())=\"$|CommitmentID|\"]")).toBeVisible();
    vars["CommitmentOrderCommitmentList"] = await page.locator("//div[normalize-space(text())=\"$|CommitmentID|\"]//preceding-sibling::div[contains(text(),\"Commitment Order\")]").textContent() || '';
    vars["CommitmentOrderCommitmentList"] = String(vars["CommitmentOrderCommitmentList"]).slice(-1);
    expect(String(vars["CommitmentOrderPriceOffered"])).toBe(vars["CommitmentOrderCommitmentList"]);
    vars["OpenAuthLimit"] = await page.locator("//div[text()=\"Open Auth Limit: \"]//..//div[@class=\"fw-semibold\"]").textContent() || '';
    vars["OpenAuthLimitAfterCommit"] = String('').split("(")["0"] || '';
    vars["OpenAuthLimitAfterCommit"] = String(vars["OpenAuthLimitAfterCommit"]).replace(/\$\,/g, '');
    vars["OpenAuthLimitAfterCommit"] = String(vars["OpenAuthLimitAfterCommit"]).trim();
    vars["OpenAuthLimitPercentageAfterCommit"] = String('').split("(")["1"] || '';
    vars["OpenAuthLimitPercentageAfterCommit"] = String(vars["OpenAuthLimitPercentageAfterCommit"]).replace(/\)%/g, '');
    vars["AuthLimitAfterCommit"] = await page.locator("//div[text()=\"Auth Limit: \"]//..//div[@class=\"fw-semibold\"]").textContent() || '';
    vars["LastCommittedBidDateAndTimeAfterCommit"] = await page.locator("//div[normalize-space(text())=\"Last Committed Bid:\"]/following-sibling::div").textContent() || '';
    vars["LastCommittedBidDateAndTimeAfterCommit"] = String('').split("|")["0"] || '';
    vars["LastCommittedBidDateAndTimeAfterCommit"] = String(vars["LastCommittedBidDateAndTimeAfterCommit"]).trim();
    vars["LastCommittedBidLoanAmountAfterCommit"] = await page.locator("//div[contains(text(),\"Last Committed Bid:\")]//following::span[1]").textContent() || '';
    vars["LastCommittedBidLoanAmountAfterCommit"] = String(vars["LastCommittedBidLoanAmountAfterCommit"]).substring(3);
    vars["ExpectedOpenAuthLimit"] = (parseFloat(String(vars["OpenAuthLimitBeforeCommit"])) - parseFloat(String(vars["ExpectedCommittedLoanAmount"]))).toFixed(0);
    vars["ExpectedOpenAuthLimitPercentage"] = (parseFloat(String(vars["ExpectedOpenAuthLimit"])) / parseFloat(String(vars["AuthLimitBeforeCommit"]))).toFixed(4);
    vars["ExpectedOpenAuthLimitPercentage"] = (parseFloat(String(vars["ExpectedOpenAuthLimitPercentage"])) * parseFloat(String("100"))).toFixed(2);
    expect(String(vars["ExpectedOpenAuthLimit"])).toBe(vars["OpenAuthLimitAfterCommit"]);
    expect(String(vars["ExpectedOpenAuthLimitPercentage"])).toBe(vars["OpenAuthLimitPercentageAfterCommit"]);
    expect(String(vars["AuthLimitBeforeCommit"])).toBe(vars["AuthLimitAfterCommit"]);
    expect(String(vars["ExpectedBidCommittedDateAndTime"])).toBe(vars["LastCommittedBidDateAndTimeAfterCommit"]);
    expect(String(vars["ExpectedCommittedLoanAmount"])).toBe(vars["LastCommittedBidLoanAmountAfterCommit"]);
  });
});
