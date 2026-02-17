import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_PriceOffered', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS10_TC01_Perform selecting a unique loan Verify the bid, loan value, and selected loan count displayed in the Commit Selected Loans popup', async ({ page }) => {
    // Prerequisite: REG_TS01_TC01_Perform submit for pricing action, and then verify the status should be updated to pri
    // TODO: Ensure prerequisite test passes first

    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href='#/commitments/price-offered']").click();
    vars["PriceOfferedBidReqId"] = vars["RequestIDDetails"];
    vars["PriceOfferedBidReqId"] = String(vars["PriceOfferedBidReqId"]).trim();
    await page.locator("//input[@placeholder='Search By Bid Request ID']").click();
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["PriceOfferedBidReqId"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[contains(text(),\"$|PriceOfferedBidReqId|\")]").click();
    await page.waitForLoadState('networkidle');
    await page.locator("(//input[contains(@aria-label, \"Select loan\") and @type=\"checkbox\"])[1]").check();
    vars["UncommittedLoanNum1"] = await page.locator("(//tr[@class=\"row-highlight\"]//button[contains(@aria-label,\"View loan details\")])[1]").textContent() || '';
    await page.locator("(//input[contains(@aria-label, \"Select loan\") and @type=\"checkbox\"])[2]").check();
    vars["UncommittedLoanNum2"] = await page.locator("(//tr[@class=\"row-highlight\"]//button[contains(@aria-label,\"View loan details\")])[2]").textContent() || '';
    vars["CheckedRowsCount"] = String(await page.locator("//tr[@class=\"row-highlight\"]").count());
    vars["LoanAmount1"] = await page.locator("//button[text()=\"$|UncommittedLoanNum1|\"]/ancestor::tr//div[contains(@aria-label,\"Loan amount:\")]").textContent() || '';
    vars["LoanAmount2"] = await page.locator("//button[text()=\"$|UncommittedLoanNum2|\"]/ancestor::tr//div[contains(@aria-label,\"Loan amount:\")]").textContent() || '';
    vars["TotalLoanAmountSelectedBids"] = (parseFloat(String(vars["LoanAmount1"])) + parseFloat(String(vars["LoanAmount2"]))).toFixed(0);
    await page.locator("//button[normalize-space(text())=\"Get Price\"]").click();
    await page.locator("//button[@id='commitdropdownMenuButton']").waitFor({ state: 'visible' });
    vars["OpenAuthLimitBeforeCommitted"] = await page.locator("//div[contains(text(),\"Open Auth Limit:\")]//following-sibling::div").textContent() || '';
    vars["OpenAuthLimitBeforeCommitted"] = String('').split("(")["0"] || '';
    await page.locator("//button[@id='commitdropdownMenuButton']").click();
    vars["BidreqIDPopup"] = await page.locator("//div[contains(@class,\"mb\")]//b").textContent() || '';
    vars["LoanValuePopup"] = await page.locator("//div[text()=\"Loan Value\"]//following-sibling::div/b").textContent() || '';
    vars["LoanValuePopup"] = String(vars["LoanValuePopup"]).replace(/\$\,/g, '');
    vars["SelectedLoansCountPopup"] = await page.locator("//div[text()=\"Selected Loans\"]//following-sibling::div/b").textContent() || '';
    vars["SelectedLoansCountPopup"] = String(vars["SelectedLoansCountPopup"]).trim();
    expect(String(vars["BidreqIDPopup"])).toBe(vars["PriceOfferedBidReqId"]);
    expect(String(vars["LoanValuePopup"])).toBe(vars["TotalLoanAmountSelectedBids"]);
    expect(String(vars["SelectedLoansCountPopup"])).toBe(vars["CheckedRowsCount"]);
    await page.locator("//span[text()=\"Yes, Commit\"]//parent::button").click();
    vars["space"] = "key_blank";
    vars["DateAndTimeFormatCurrent"] = "M/d/yy" + vars["space"] + "h:mm a";
    vars["BidCommittedDateAndTime"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC" };
      const fmt = "DateAndTimeFormatCurrent";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    await page.locator("//button[contains(text(),\"Okay\")]").waitFor({ state: 'visible' });
    vars["CommitmentUniqueNumPopup"] = await page.locator("//span[@class=\"fw-bold\"]").textContent() || '';
    vars["CommitmentUniqueNumPopup"] = String(vars["CommitmentUniqueNumPopup"]).length.toString();
    expect(String(vars["CommitmentUniqueNumPopup"])).toBe("8");
    await page.locator("//button[contains(text(),\"Okay\")]").click();
    await page.waitForLoadState('networkidle');
    await page.locator("//span[text()=\"All Loans\"]").click();
    vars["count"] = "1";
    vars["CountOfCommittedLoans"] = String(await page.locator("//div[@aria-label=\"Locked loan\"]").count());
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["CountOfCommittedLoans"]))) {
      for (let dataIdx = parseInt(vars["count"]); dataIdx <= parseInt(vars["count"]); dataIdx++) {
        await expect(page.locator("(//span[@aria-label=\"Committed loan\"])[$|count|]")).toBeVisible();
        vars["LockedLoanCommitOrder"] = await page.locator("(//div[@class=\"commit-order\"])[$|count|]").textContent() || '';
        // Write to test data profile: "CommitOrder" = vars["LockedLoanCommitOrder"]
        // TODO: Test data profile writes need custom implementation
        vars["CorrLoan(table)"] = await page.locator("(//div[@aria-label=\"Locked loan\"]/ancestor::tr//button[contains(@aria-label,\"View loan details\")])[$|count|]").textContent() || '';
        // Write to test data profile: "Corr Loan" = vars["CorrLoan(table)"]
        // TODO: Test data profile writes need custom implementation
        vars["LastName(table)"] = await page.locator("(//div[@aria-label=\"Locked loan\"]/ancestor::tr//div[contains(@aria-label, \"Last name\")])[$|count|]").textContent() || '';
        // Write to test data profile: "Last Name" = vars["LastName(table)"]
        // TODO: Test data profile writes need custom implementation
        vars["LoanAmount(table)"] = await page.locator("(//div[@aria-label=\"Locked loan\"]/ancestor::tr//div[contains(@aria-label, \"Loan amount\")])[$|count|]").textContent() || '';
        // Write to test data profile: "Loan Amount" = vars["LoanAmount(table)"]
        // TODO: Test data profile writes need custom implementation
        vars["IntRate(table)"] = await page.locator("(//div[@aria-label=\"Locked loan\"]/ancestor::tr//div[contains(@aria-label, \"Interest rate\")])[$|count|]").textContent() || '';
        // Write to test data profile: "Int Rate" = vars["IntRate(table)"]
        // TODO: Test data profile writes need custom implementation
        vars["RefSecProd(table)"] = await page.locator("(//div[@aria-label=\"Locked loan\"]/ancestor::tr//div[contains(@aria-label, \"Reference security\")])[$|count|]").textContent() || '';
        // Write to test data profile: "Ref Sec Prod" = vars["RefSecProd(table)"]
        // TODO: Test data profile writes need custom implementation
        vars["RefSecPrice(table)"] = await page.locator("(//div[@aria-label=\"Locked loan\"]/ancestor::tr//div[contains(@aria-label, \"Reference security price\")])[$|count|]").textContent() || '';
        // Write to test data profile: "Ref Sec Price" = vars["RefSecPrice(table)"]
        // TODO: Test data profile writes need custom implementation
        vars["GrossPrice(table)"] = await page.locator("(//div[@aria-label=\"Locked loan\"]/ancestor::tr//div[contains(@aria-label, \"Gross price\")])[$|count|]").textContent() || '';
        // Write to test data profile: "Gross Price" = vars["GrossPrice(table)"]
        // TODO: Test data profile writes need custom implementation
        vars["HedgeRatio(table)"] = await page.locator("(//div[@aria-label=\"Locked loan\"]/ancestor::tr//div[contains(@aria-label, \"Hedge ratio\")])[$|count|]").textContent() || '';
        // Write to test data profile: "Hedge Ratio" = vars["HedgeRatio(table)"]
        // TODO: Test data profile writes need custom implementation
        vars["MarkAdj(table)"] = await page.locator("(//div[@aria-label=\"Locked loan\"]/ancestor::tr//td[@data-title=\"Mark Adj\"])[$|count|]").textContent() || '';
        // Write to test data profile: "Mark Adj" = vars["MarkAdj(table)"]
        // TODO: Test data profile writes need custom implementation
        vars["CurrGross(table)"] = await page.locator("(//div[@aria-label=\"Locked loan\"]/ancestor::tr//div[contains(@aria-label, \"Current gross price\")])[$|count|]").textContent() || '';
        // Write to test data profile: "Curr Gross" = vars["CurrGross(table)"]
        // TODO: Test data profile writes need custom implementation
      }
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    vars["OpenAuthLimitAllLoans"] = await page.locator("//div[contains(text(),\"Open Auth Limit:\")]//following-sibling::div").textContent() || '';
    vars["ActualOpenAuthLimit"] = String('').split("(")["0"] || '';
    vars["ActualOpenAuthLimit"] = String(vars["ActualOpenAuthLimit"]).replace(/\$\,/g, '');
    vars["ActualOpenAuthLimit"] = String(vars["ActualOpenAuthLimit"]).trim();
    vars["ActualAuthLimit"] = await page.locator("//div[normalize-space(text())=\"Auth Limit:\"]//following-sibling::div").textContent() || '';
    vars["ExpectedOpenAuthLimit"] = (parseFloat(String(vars["OpenAuthLimitBeforeCommitted"])) - parseFloat(String(vars["TotalLoanAmountSelectedBids"]))).toFixed(0);
    vars["ActualOpenAuthLimitPercentage"] = String('').split("(")["1"] || '';
    vars["ActualOpenAuthLimitPercentage"] = String(vars["ActualOpenAuthLimitPercentage"]).replace(/\)%/g, '');
    vars["ExpectedOpenAuthLimitPercentage"] = (parseFloat(String(vars["ActualOpenAuthLimit"])) / parseFloat(String(vars["ActualAuthLimit"]))).toFixed(4);
    vars["ExpectedOpenAuthLimitPercentage"] = (parseFloat(String(vars["ExpectedOpenAuthLimitPercentage"])) * parseFloat(String("100"))).toFixed(2);
    vars["LastCommittedBid"] = await page.locator("//div[normalize-space(text())=\"Last Committed Bid:\"]/following-sibling::div").textContent() || '';
    vars["LastCommittedBidTimeAndDate"] = String('').split("|")["0"] || '';
    vars["LastCommittedBidTimeAndDate"] = String(vars["LastCommittedBidTimeAndDate"]).trim();
    vars["LastCommittedBidLoanLoanAmount"] = await page.locator("//div[contains(text(),\"Last Committed Bid:\")]//following::span[1]").textContent() || '';
    vars["LastCommittedBidLoanLoanAmount"] = String(vars["LastCommittedBidLoanLoanAmount"]).substring(3);
    vars["LastCommittedBidLoanLoanAmount"] = String(vars["LastCommittedBidLoanLoanAmount"]).replace(/\$\,/g, '');
    await page.locator("//div[@id='price-offered-list-tabs']/div[1]/div[2]").click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator("//button[contains(text(),\"Paste Loans\")]\n")).toBeVisible();
    await expect(page.locator("//button[@id='commitdropdownMenuButton']")).toBeVisible();
  });
});
