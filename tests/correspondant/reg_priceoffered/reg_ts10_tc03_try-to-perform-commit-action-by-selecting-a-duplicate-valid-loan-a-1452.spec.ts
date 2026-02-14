import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_PriceOffered', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS10_TC03_Try to perform commit action by selecting a duplicate + valid loan and Verify the bid, loan value, and selected loan count displayed in the Commit Selected Loans popup', async ({ page }) => {
    // Prerequisite: REG_TS02_TC01.1_Perform submit for pricing action, and then verify the status should be updated to p
    // TODO: Ensure prerequisite test passes first

    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    vars["BidReqIdPriceOffered"] = vars["RequestIDDetails"];
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdPriceOffered"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Execution Type\"]//div[contains(text(),\"STANDARD\")]//ancestor::tr//td[@data-title=\"Bid Req. ID\"]//a[contains(@aria-label,\"View details \")]").click();
    await page.locator("//td[@role=\"cell\"]//input[@type=\"checkbox\"]").waitFor({ state: 'visible' });
    await page.locator("//td[@role=\"cell\"]//input[@type=\"checkbox\"]").check();
    await page.locator("//button[normalize-space(text())=\"Get Price\"]").click();
    await page.locator("//button[@id='commitdropdownMenuButton']").waitFor({ state: 'visible' });
    await page.locator("//button[@id='commitdropdownMenuButton']").click();
    await page.locator("//span[text()=\"Yes, Commit\"]//parent::button").click();
    await page.locator("//button[contains(text(),\"Okay\")]").waitFor({ state: 'visible' });
    await page.locator("//button[contains(text(),\"Okay\")]").click();
    await page.locator("//div[@id=\"price-offered-list-tabs\"]/div//span[text()=\"All Loans\"]").click();
    await page.locator("//span[@aria-label=\"Committed loan\"]//ancestor::tr//button[contains(@aria-label,\"View loan details\")]").waitFor({ state: 'visible' });
    vars["CommittedLoanNumStandard"] = await page.locator("//span[@aria-label=\"Committed loan\"]//ancestor::tr//button[contains(@aria-label,\"View loan details\")]").textContent() || '';
    vars["UncommittedLoanNumStandard"] = await page.locator("//input[contains(@aria-label,\"Select loan\")]/ancestor::tr//button[contains(@aria-label,\"View loan details\")]").textContent() || '';
    vars["OpenAuthLimitStandard"] = await page.locator("//div[contains(text(),\"Open Auth Limit:\")]//following-sibling::div").textContent() || '';
    vars["OpenAuthLimitStandard"] = String('').split("(")["0"] || '';
    vars["AuthLimitStandard"] = await page.locator("//div[normalize-space(text())=\"Auth Limit:\"]//following-sibling::div").textContent() || '';
    await page.locator("//i[contains(@class,'fa-arrow-left')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Execution Type\"]//div[contains(text(),\"CHASE_DIRECT\")]//ancestor::tr//td[@data-title=\"Bid Req. ID\"]//a[contains(@aria-label,\"View details for\")]").click();
    await page.locator("//button[text()=\"$|UncommittedLoanNumStandard|\"]/ancestor::tr//input[@type=\"checkbox\"]").check();
    await page.locator("//button[text()=\"$|CommittedLoanNumStandard|\"]/ancestor::tr//input[@type=\"checkbox\"]").check();
    vars["SelectedLoansCount"] = String(await page.locator("//tr[@class=\"row-highlight\"]").count());
    vars["LoanAmountDuplicateLoan"] = await page.locator("//button[text()=\"$|CommittedLoanNumStandard|\"]//ancestor::tr//td[@data-title=\"Loan Amount\"]").textContent() || '';
    vars["LoanAmountFreshLoan"] = await page.locator("//button[text()=\"$|UncommittedLoanNumStandard|\"]//ancestor::tr//div[contains(@aria-label,\"Loan amount:\")]").textContent() || '';
    vars["ExpectedCommittedLoanAmount"] = String(vars["LoanAmountFreshLoan"]).trim();
    vars["TotalSelectedLoanAmount"] = (parseFloat(String(vars["LoanAmountDuplicateLoan"])) + parseFloat(String(vars["LoanAmountFreshLoan"]))).toFixed(0);
    vars["TotalSelectedLoanAmount"] = String(vars["TotalSelectedLoanAmount"]).trim();
    await page.locator("//button[normalize-space(text())=\"Get Price\"]").click();
    await page.locator("//button[@id='commitdropdownMenuButton']").waitFor({ state: 'visible' });
    await expect(page.locator("//button[@id='commitdropdownMenuButton']")).toBeEnabled();
    await page.locator("//button[@id='commitdropdownMenuButton']").click();
    vars["BidreqIDPopup"] = await page.locator("//div[contains(@class,\"mb\")]//b").textContent() || '';
    vars["LoanValuePopup"] = await page.locator("//div[text()=\"Loan Value\"]//following-sibling::div/b").textContent() || '';
    vars["LoanValuePopup"] = String(vars["LoanValuePopup"]).replace(/\$\,/g, '');
    vars["SelectedLoansCountPopup"] = await page.locator("//div[text()=\"Selected Loans\"]//following-sibling::div/b").textContent() || '';
    vars["SelectedLoansCountPopup"] = String(vars["SelectedLoansCountPopup"]).trim();
    expect(String(vars["BidReqIdPriceOffered"])).toBe(vars["BidreqIDPopup"]);
    expect(String(vars["TotalSelectedLoanAmount"])).toBe(vars["LoanValuePopup"]);
    expect(String(vars["SelectedLoansCount"])).toBe(vars["SelectedLoansCountPopup"]);
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
    vars["CommitmentUniqueNumberPopup"] = await page.locator("//span[@class=\"fw-bold\"]").textContent() || '';
    vars["CommitmentUniqueNumberPopup"] = String(vars["CommitmentUniqueNumberPopup"]).length.toString();
    expect(String(vars["CommitmentUniqueNumberPopup"])).toBe("8");
    await expect(page.locator("(//li[text()])[1]")).toContainText("Loans added successfully -");
    await expect(page.locator("(//li[text()])[2]")).toContainText(vars["UncommittedLoanNumStandard"]);
    await expect(page.locator("(//li[text()])[3]")).toContainText("Loans failed to be added to commitment");
    vars["LoanDuplicateMessage"] = "Loan" + vars["space"] + vars["CommittedLoanNumStandard"] + vars["space"] + "is a Duplicate loan. It is already committed";
    await expect(page.locator("(//li[text()])[4]")).toContainText(vars["LoanDuplicateMessage"]);
    await page.locator("//button[contains(text(),\"Okay\")]").click();
    await page.waitForLoadState('networkidle');
    await page.locator("//span[text()=\"All Loans\"]").click();
    vars["ExpectedCommittedLoans"] = String(await page.locator("//span[@aria-label=\"Committed loan\"]").count());
    await expect(page.locator("//button[text()=\"$|UncommittedLoanNumStandard|\"]//ancestor::tr//span[@aria-label=\"Committed loan\"]")).toBeVisible();
    vars["CommitmentOrderAllLoans"] = await page.locator("//button[text()=\"$|UncommittedLoanNumStandard|\"]//ancestor::tr/td//div[contains(@class,\"commit-order\")]").textContent() || '';
    vars["LastNameAllLoans"] = await page.locator("//button[text()=\"$|UncommittedLoanNumStandard|\"]//ancestor::tr/td/div[contains(@aria-label,\"Last name:\")]").textContent() || '';
    vars["LoanAmountAllLoans"] = await page.locator("//button[text()=\"$|UncommittedLoanNumStandard|\"]//ancestor::tr/td/div[contains(@aria-label,\"Loan amount:\")]").textContent() || '';
    vars["InterestRateAllLoans"] = await page.locator("//button[text()=\"$|UncommittedLoanNumStandard|\"]//ancestor::tr/td/div[contains(@aria-label,\"Interest rate:\")]").textContent() || '';
    vars["ReferenceSecurityAllLoans"] = await page.locator("//button[text()=\"$|UncommittedLoanNumStandard|\"]//ancestor::tr/td/div[contains(@aria-label,\"Reference security:\")]").textContent() || '';
    vars["ReferenceSecurityPriceAllLoans"] = await page.locator("//button[text()=\"$|UncommittedLoanNumStandard|\"]//ancestor::tr/td/div[contains(@aria-label,\"Reference security price:\")]").textContent() || '';
    vars["GrossPriceAllLoans"] = await page.locator("//button[text()=\"$|UncommittedLoanNumStandard|\"]//ancestor::tr/td/div[contains(@aria-label,\"Gross price:\")]").textContent() || '';
    vars["HedgeRatioAllLoans"] = await page.locator("//button[text()=\"$|UncommittedLoanNumStandard|\"]//ancestor::tr/td/div[contains(@aria-label,\"Hedge ratio:\")]").textContent() || '';
    vars["MarketAdjustmentAllLoans"] = await page.locator("//button[text()=\"$|UncommittedLoanNumStandard|\"]//ancestor::tr/td[@data-title=\"Mark Adj\"]").textContent() || '';
    vars["CurrentGrossPriceAllLoans"] = await page.locator("//button[text()=\"$|UncommittedLoanNumStandard|\"]//ancestor::tr/td/div[contains(@aria-label,\"Current gross price:\")]").textContent() || '';
    vars["OpenAuthLimit"] = await page.locator("//div[contains(text(),\"Open Auth Limit:\")]//following-sibling::div").textContent() || '';
    vars["OpenAuthLimitChaseDirect"] = String('').split("(")["0"] || '';
    vars["OpenAuthLimitChaseDirect"] = String(vars["OpenAuthLimitChaseDirect"]).replace(/\$\,/g, '');
    vars["OpenAuthLimitChaseDirect"] = String(vars["OpenAuthLimitChaseDirect"]).trim();
    vars["OpenAuthLimitPercentageChaseDirect"] = String('').split("(")["1"] || '';
    vars["OpenAuthLimitPercentageChaseDirect"] = String(vars["OpenAuthLimitPercentageChaseDirect"]).replace(/\)%/g, '');
    vars["AuthLimitChaseDirect"] = await page.locator("//div[normalize-space(text())=\"Auth Limit:\"]//following-sibling::div").textContent() || '';
    vars["LastCommittedBid"] = await page.locator("//div[normalize-space(text())=\"Last Committed Bid:\"]/following-sibling::div").textContent() || '';
    vars["ActualCommittedBidDateAndTime"] = String('').split("|")["0"] || '';
    vars["ActualCommittedBidDateAndTime"] = String(vars["ActualCommittedBidDateAndTime"]).trim();
    vars["LatestCommittedBidLoanAmount"] = await page.locator("//div[contains(text(),\"Last Committed Bid:\")]//following::span[1]").textContent() || '';
    vars["ActualCommittedBidLoanAmount"] = String(vars["LatestCommittedBidLoanAmount"]).substring(3);
    await page.locator("//div[@id='price-offered-list-tabs']//span[text()[normalize-space() = \"Locked/Committed Loans\"]]").click();
    await page.locator("//button[@id='commitdropdownMenuButton']").waitFor({ state: 'hidden' });
    await expect(page.locator("//button[contains(text(),\"Paste Loans\")]\n")).toBeVisible();
    vars["ActualCommittedLoans"] = await page.locator("//span[contains(text(),\"Locked/Committed Loans\")]/following-sibling::span[contains(@class,\"counter\")]").textContent() || '';
    expect(String(vars["ActualCommittedLoans"])).toBe(vars["ExpectedCommittedLoans"]);
    await expect(page.locator("//button[text()=\"$|UncommittedLoanNumStandard|\"]//ancestor::tr/td//div[contains(@class,\"commit-order\")]")).toContainText(vars["CommitmentOrderAllLoans"]);
    await expect(page.locator("//button[text()=\"$|UncommittedLoanNumStandard|\"]")).toBeVisible();
    await expect(page.locator("//button[text()=\"$|CommittedLoanNumStandard|\"]")).toBeVisible();
    await expect(page.locator("//button[text()=\"$|UncommittedLoanNumStandard|\"]//ancestor::tr/td/div[contains(@aria-label,\"Last name:\")]")).toContainText(vars["LastNameAllLoans"]);
    await expect(page.locator("//button[text()=\"$|UncommittedLoanNumStandard|\"]//ancestor::tr/td/div[contains(@aria-label,\"Loan amount:\")]")).toContainText(vars["LoanAmountAllLoans"]);
    await expect(page.locator("//button[text()=\"$|UncommittedLoanNumStandard|\"]//ancestor::tr/td/div[contains(@aria-label,\"Interest rate:\")]")).toContainText(vars["InterestRateAllLoans"]);
    await expect(page.locator("//button[text()=\"$|UncommittedLoanNumStandard|\"]//ancestor::tr/td/div[contains(@aria-label,\"Reference security:\")]")).toContainText(vars["ReferenceSecurityAllLoans"]);
    await expect(page.locator("//button[text()=\"$|UncommittedLoanNumStandard|\"]//ancestor::tr/td/div[contains(@aria-label,\"Reference security price:\")]")).toContainText(vars["ReferenceSecurityPriceAllLoans"]);
    await expect(page.locator("//button[text()=\"$|UncommittedLoanNumStandard|\"]//ancestor::tr/td/div[contains(@aria-label,\"Gross price:\")]")).toContainText(vars["GrossPriceAllLoans"]);
    await expect(page.locator("//button[text()=\"$|UncommittedLoanNumStandard|\"]//ancestor::tr/td/div[contains(@aria-label,\"Hedge ratio:\")]")).toContainText(vars["HedgeRatioAllLoans"]);
    await expect(page.locator("//button[text()=\"$|UncommittedLoanNumStandard|\"]//ancestor::tr/td[@data-title=\"Mark Adj\"]")).toContainText(vars["MarketAdjustmentAllLoans"]);
    await expect(page.locator("//button[text()=\"$|UncommittedLoanNumStandard|\"]//ancestor::tr/td/div[contains(@aria-label,\"Current gross price:\")]")).toContainText(vars["CurrentGrossPriceAllLoans"]);
    vars["ExpectedOpenAuthLimit"] = (parseFloat(String(vars["OpenAuthLimitStandard"])) - parseFloat(String(vars["ExpectedCommittedLoanAmount"]))).toFixed(0);
    vars["ExpectedOpenAuthLimitPercentage"] = (parseFloat(String(vars["ExpectedOpenAuthLimit"])) / parseFloat(String(vars["AuthLimitChaseDirect"]))).toFixed(4);
    vars["ExpectedOpenAuthLimitPercentage"] = (parseFloat(String(vars["ExpectedOpenAuthLimitPercentage"])) * parseFloat(String("100"))).toFixed(2);
    expect(String(vars["ExpectedOpenAuthLimit"])).toBe(vars["OpenAuthLimitChaseDirect"]);
    expect(String(vars["ExpectedOpenAuthLimitPercentage"])).toBe(vars["OpenAuthLimitPercentageChaseDirect"]);
    expect(String(vars["AuthLimitStandard"])).toBe(vars["AuthLimitChaseDirect"]);
    expect(String(vars["ExpectedBidCommittedDateAndTime"])).toBe(vars["ActualCommittedBidDateAndTime"]);
    expect(String(vars["ExpectedCommittedLoanAmount"])).toBe(vars["ActualCommittedBidLoanAmount"]);
    // Write to test data profile: "RequestIDfrom10-3" = vars["BidReqIdPriceOffered"]
    // TODO: Test data profile writes need custom implementation
  });
});
