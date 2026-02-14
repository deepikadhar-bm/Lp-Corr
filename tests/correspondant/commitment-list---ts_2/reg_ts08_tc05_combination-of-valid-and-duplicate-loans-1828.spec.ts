import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Commitment List - TS_2', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS08_TC05_Combination of valid and duplicate loans', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    vars["BidReqId"] = testData["RequestIdFrom5-1"];
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//input[@id='searchTagInput']").click();
    await page.locator("//input[@id='searchTagInput']").fill(vars["BidReqId"]);
    await page.locator("//span[normalize-space(text())=\"Bid Request ID\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Execution Type\"]//div[normalize-space(text())=\"STANDARD\"]//ancestor::tr//td[@data-title=\"Comm. ID\"]//a[contains(@aria-label,\"View details for commitment\")]").click();
    await page.locator("//div[text()[normalize-space() = \"Total Loans\"]]").waitFor({ state: 'visible' });
    await page.locator("//div[text()[normalize-space() = \"Total Loans\"]]").click();
    await page.locator("//span[contains(@class,\"fa fas fa-lock lock-icon\")]//ancestor::tr//td[@data-title=\"Corr. Loan#\"]//button[contains(@class,\"btn bg-transparent text-primary\")][1]").waitFor({ state: 'visible' });
    vars["CommittedLoanNumStandard"] = await page.locator("//span[contains(@class,\"fa fas fa-lock lock-icon\")]//ancestor::tr//td[@data-title=\"Corr. Loan#\"]//button[contains(@class,\"btn bg-transparent text-primary\")][1]").textContent() || '';
    vars["FreshLoanNumStandard1"] = await page.locator("//input//ancestor::tr//button[contains(@class,\"btn bg-transparent text-primary\")][1]").textContent() || '';
    vars["FreshLoanNumStandard2"] = await page.locator("(//input//ancestor::tr//button[contains(@class,\"btn bg-transparent text-primary\")][1])[2]").textContent() || '';
    await page.locator("//a[contains(text(),\"Commitment List\")]//i[contains(@class,\"fas fa-arrow-left \")]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Execution Type\"]//div[normalize-space(text())=\"CHASE_DIRECT\"]//ancestor::tr//td[@data-title=\"Comm. ID\"]//a[contains(@aria-label,\"View details for commitment\")]").click();
    await page.locator("//div[text()[normalize-space() = \"Total Loans\"]]").waitFor({ state: 'visible' });
    vars["NoOfLoansBeforeCommit"] = await page.locator("//div[normalize-space(text())=\"No. Loans\"]//following-sibling::h5").textContent() || '';
    vars["CommitID"] = await page.locator("//div[text()=\"Commit. ID\"]/following-sibling::h5").textContent() || '';
    vars["OpenAuthLimitBeforeCommit"] = await page.locator("//div[contains(text(),\"Open Auth Limit:\")]//following-sibling::div").textContent() || '';
    vars["OpenAuthLimitBeforeCommit"] = String('').split("(")["0"] || '';
    vars["AuthLimitBeforeCommit"] = await page.locator("//div[normalize-space(text())=\"Auth Limit:\"]//following-sibling::div").textContent() || '';
    vars["LastCommitBidTime"] = await page.locator("(//div[text()=\"Commit. Time\"]//following-sibling::h5)[last()]").textContent() || '';
    vars["LastCommitBidDate"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC" };
      const fmt = "M/d/yy";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    vars[""] = String(vars["LastCommitBidDate"]) + ' ' + String(vars["LastCommitBidTime"]);
    vars["LastCommittedBidLoanAmounBeforeCommit"] = await page.locator("//div[contains(text(),\"Last Committed Bid:\")]//following::span[1]").textContent() || '';
    vars["LastCommittedBidLoanAmounBeforeCommit"] = String(vars["LastCommittedBidLoanAmounBeforeCommit"]).substring(3);
    await page.locator("//div[text()[normalize-space() = \"Total Loans\"]]").click();
    await page.locator("//span[contains(@class,\"fa fas fa-lock lock-icon\")]//ancestor::tr//td[@data-title=\"Corr. Loan#\"]//button[1]").waitFor({ state: 'visible' });
    vars["CommittedLoanNumChaseDirect"] = await page.locator("//span[contains(@class,\"fa fas fa-lock lock-icon\")]//ancestor::tr//td[@data-title=\"Corr. Loan#\"]//button[1]").textContent() || '';
    if (String(vars["CommittedLoanNumChaseDirect"]) !== String(vars["FreshLoanNumStandard1"])) {
      vars["CommittedCorrLoan"] = vars["FreshLoanNumStandard1"];
    } else if (String(vars["CommittedLoanNumChaseDirect"]) !== String(vars["FreshLoanNumStandard2"])) {
      vars["CommittedCorrLoan"] = vars["FreshLoanNumStandard2"];
    }
    await page.locator("//button[text()=\"$|CommittedCorrLoan|\"]/ancestor::tr//input[@type=\"checkbox\"]").check();
    await page.locator("//button[text()=\"$|CommittedLoanNumStandard|\"]/ancestor::tr//input[@type=\"checkbox\"]").check();
    await stepGroups.stepGroup_Storing_Required_Loan_Number_Details(page, vars);
    vars["ExpectedCommittedLoanAmount"] = String(vars["CommittedLoanAmountTotalLoans"]).trim();
    vars["SelectedLoanScreen"] = String(await page.locator("//tr[@class=\"row-highlight\"]").count());
    vars["LoanAmount2"] = await page.locator("//button[text()=\"$|CommittedLoanNumStandard|\"]//ancestor::tr//td[@data-title=\"Loan Amount\"]").textContent() || '';
    vars["SelectedLoanAmountScreen"] = (parseFloat(String(vars["CommittedLoanAmountTotalLoans"])) + parseFloat(String(vars["LoanAmount2"]))).toFixed(0);
    await page.locator("//button[@id='commitdropdownMenuButton']").waitFor({ state: 'visible' });
    await page.locator("//button[@id='commitdropdownMenuButton']").click();
    vars["CommitmentOrder"] = await page.locator("//div[text()=\"$|CommitID|\"]//preceding-sibling::div[contains(text(),\"Commitment Order\")]").textContent() || '';
    vars["CommitmentOrder"] = String(vars["CommitmentOrder"]).slice(-1);
    await page.locator("//div[text()=\"$|CommitID|\"]//preceding-sibling::div[contains(text(),\"Commitment Order\")]").click();
    vars["BidRequestIDPopup"] = await page.locator("//div[@class=\"mb-2\"]//b[text()]").textContent() || '';
    vars["LoanValuePopup"] = await page.locator("//div[text()=\"Loan Value\"]//following-sibling::div/b").textContent() || '';
    vars["LoanValuePopup"] = String(vars["LoanValuePopup"]).replace(/\$\,/g, '');
    vars["SelectedLoansPopup"] = await page.locator("//div[text()=\"Selected Loans\"]//following-sibling::div/b").textContent() || '';
    expect(String(vars["BidReqId"])).toBe(vars["BidRequestIDPopup"]);
    expect(String(vars["SelectedLoanAmountScreen"])).toBe(vars["LoanValuePopup"]);
    expect(String(vars["SelectedLoanScreen"])).toBe(vars["SelectedLoansPopup"]);
    await page.locator("//span[text()=\"Yes, Commit\"]//parent::button").click();
    await page.locator("//button[contains(text(),\"Okay\")]").waitFor({ state: 'visible' });
    vars["space"] = "key_blank";
    vars["CommitmentUpdateText"] = "Commitment" + vars["space"] + vars["CommitID"] + vars["space"] + "is" + vars["space"] + "updated.";
    await expect(page.locator("(//div[@class=\"modal-body\"]//div)[2]")).toContainText(vars["CommitmentUpdateText"]);
    await expect(page.locator("(//li[text()])[1]")).toContainText("Loans added successfully -");
    await expect(page.locator("(//li[text()])[2]")).toContainText(vars["CommittedCorrLoan"]);
    await expect(page.locator("(//li[text()])[3]")).toContainText("Loans failed to be added to commitment");
    vars["DuplicateLoanText"] = "Loan" + vars["space"] + vars["CommittedLoanNumStandard"] + vars["space"] + "is a Duplicate loan. It is already committed";
    await expect(page.locator("(//li[text()])[4]")).toContainText(vars["DuplicateLoanText"]);
    await page.locator("//button[contains(text(),\"Okay\")]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//button[text()=\"$|CommittedCorrLoan|\"]")).toBeVisible();
    await expect(page.locator("//button[text()=\"$|CommittedLoanNumStandard|\"]")).toBeVisible();
    vars["NoOfLoansAfterCommit"] = await page.locator("//div[normalize-space(text())=\"No. Loans\"]//following-sibling::h5").textContent() || '';
    expect(String(vars["NoOfLoansBeforeCommit"])).toBe(vars["NoOfLoansAfterCommit"]);
    await expect(page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//div[@class=\"commit-order\"]")).toContainText(vars["CommitmentOrder"]);
    await stepGroups.stepGroup_Verifying_Loan_Details(page, vars);
    await page.locator("//div[text()=\"Open Auth Limit: \"]//..//div[@class=\"fw-semibold\"]").scrollIntoViewIfNeeded();
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
    vars["LastCommittedBidLoanAmountAfterCommit"] = String(vars["LastCommittedBidLoanAmountAfterCommit"]).replace(/\$\,/g, '');
    vars["ExpectedOpenAuthLimit"] = (parseFloat(String(vars["OpenAuthLimitBeforeCommit"])) - parseFloat(String(vars["ExpectedCommittedLoanAmount"]))).toFixed(0);
    vars["ExpectedOpenAuthLimitPercentage"] = (parseFloat(String(vars["ExpectedOpenAuthLimit"])) / parseFloat(String(vars["AuthLimitBeforeCommit"]))).toFixed(4);
    vars["ExpectedOpenAuthLimitPercentage"] = (parseFloat(String(vars["ExpectedOpenAuthLimitPercentage"])) * parseFloat(String("100"))).toFixed(2);
    vars["ExpectedLastCommittedLoanAmount"] = (parseFloat(String(vars["LastCommittedBidLoanAmounBeforeCommit"])) + parseFloat(String(vars["ExpectedCommittedLoanAmount"]))).toFixed(2);
    expect(String(vars["ExpectedOpenAuthLimit"])).toBe(vars["OpenAuthLimitAfterCommit"]);
    expect(String(vars["ExpectedOpenAuthLimitPercentage"])).toBe(vars["OpenAuthLimitPercentageAfterCommit"]);
    expect(String(vars["AuthLimitBeforeCommit"])).toBe(vars["AuthLimitAfterCommit"]);
    expect(String(vars["ExpectedLastCommittedBidDateAndTime"])).toBe(vars["LastCommittedBidDateAndTimeAfterCommit"]);
    expect(String(vars["ExpectedLastCommittedLoanAmount"])).toBe(vars["LastCommittedBidLoanAmountAfterCommit"]);
  });
});
