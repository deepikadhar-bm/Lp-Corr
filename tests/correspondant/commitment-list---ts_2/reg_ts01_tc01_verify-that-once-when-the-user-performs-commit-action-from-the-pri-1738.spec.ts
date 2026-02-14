import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Commitment List - TS_2', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS01_TC01_Verify that once when the user performs commit action from the price offered module, then a newly created commitment will be displayed', async ({ page }) => {
    // Prerequisite: REG_TS01_TC01_Perform submit for pricing action, and then verify the status should be updated to pri
    // TODO: Ensure prerequisite test passes first

    vars["CurrentEstDate"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC-05:00" };
      const fmt = "MM/dd/yyyy";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    vars["DatePriceOfferedScreen"] = vars["CurrentEstDate"];
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    vars["BidReqId"] = vars["RequestIDDetails"];
    // Write to test data profile: "RequestIDFromPRE_PR_1-1" = vars["BidReqId"]
    // TODO: Test data profile writes need custom implementation
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").click();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqId"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[contains(text(),\"$|BidReqId|\")]").click();
    await page.locator("//tbody//input[@type=\"checkbox\"]").waitFor({ state: 'visible' });
    await page.locator("//tbody//input[@type=\"checkbox\"]").check();
    vars["CommittedCorrLoan"] = await page.locator("//tr[contains(@class,\"row\")]//button[contains(@class,\"btn bg-transparent text-primary\")][1]").textContent() || '';
    await page.locator("//button[normalize-space(text())=\"Get Price\"]").waitFor({ state: 'visible' });
    await page.locator("//button[normalize-space(text())=\"Get Price\"]").click();
    await page.locator("//button[@id='commitdropdownMenuButton']").waitFor({ state: 'visible' });
    await page.locator("//button[@id='commitdropdownMenuButton']").click();
    await page.locator("//span[text()=\"Yes, Commit\"]//parent::button").click();
    vars["ExpectedCommitDate"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC" };
      const fmt = "MM/dd/yyyy";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    vars["CommitTimePriceOffered"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC" };
      const fmt = "h:mm a";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    await page.locator("//span[text()=\"Yes, Commit\"]//parent::button").waitFor({ state: 'hidden' });
    await page.locator("//button[contains(text(),\"Okay\")]").waitFor({ state: 'visible' });
    vars["CommitmentIDPriceOffered"] = await page.locator("//div[contains(text(),'Commitment')]/span\n").textContent() || '';
    vars["CommitmentIDPriceOffered"] = String(vars["CommitmentIDPriceOffered"]).trim();
    await page.locator("//button[contains(text(),\"Okay\")]").click();
    vars["LockedLoansCount"] = await page.locator("//span[text()=\"Locked/Committed Loans\"]//following-sibling::span").textContent() || '';
    vars["CommitmentOrderPriceOffered"] = await page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//div[@class=\"commit-order\"]").textContent() || '';
    vars["MaraketValuePriceOffered"] = await page.locator("//div[@id=\"price-offered-details-header\"]//div/div[text()=\"Current Market\"]/..//h5").textContent() || '';
    vars["LockedLoanAmountPriceOffered"] = await page.locator("//span[@aria-label=\"Committed loan\"]//ancestor::tr//td[@data-title=\"Loan Amount\"]").textContent() || '';
    await page.locator("//i[contains(@class,'fa-arrow-left')]").click();
    vars["CompanyCCodePriceOfferedScreen"] = await page.locator("//td[@data-title='Bid Req. ID']/a[normalize-space(text())='$|BidReqId|']//ancestor::tr//td[@data-title=\"CCode\"]").textContent() || '';
    vars["CompanyNamePriceOfferedScreen"] = await page.locator("//td[@data-title='Bid Req. ID']/a[normalize-space(text())='$|BidReqId|']//ancestor::tr//td[@data-title='Company']").textContent() || '';
    // [DISABLED] Store text from the element Date(Price Offered Screen) into a variable DatePriceOfferedScreen
    // vars["DatePriceOfferedScreen"] = await page.locator("//td[@data-title='Bid Req. ID']/a[normalize-space(text())='$|BidReqId|']//ancestor::tr//td[@data-title=\"Date Price Offered\"]").textContent() || '';
    vars["ExecutionTypePriceOfferedScreen"] = await page.locator("//td[@data-title='Bid Req. ID']/a[normalize-space(text())='$|BidReqId|']//ancestor::tr//td[@data-title=\"Execution Type\"]").textContent() || '';
    vars["StatusPriceOfferedScreen"] = await page.locator("//td[@data-title='Bid Req. ID']/a[normalize-space(text())='$|BidReqId|']//ancestor::tr//td[@data-title=\"Status\"]").textContent() || '';
    vars["DateAfterAdding3Days"] = (() => {
      const d = new Date(String(vars["DatePriceOfferedScreen"]));
      d.setDate(d.getDate() + parseInt(String("3")));
      const _p = { yyyy: String(d.getFullYear()), yy: String(d.getFullYear()).slice(-2), MM: String(d.getMonth()+1).padStart(2,'0'), M: String(d.getMonth()+1), dd: String(d.getDate()).padStart(2,'0'), d: String(d.getDate()), HH: String(d.getHours()).padStart(2,'0'), hh: String(d.getHours()%12||12).toString().padStart(2,'0'), h: String(d.getHours()%12||12), mm: String(d.getMinutes()).padStart(2,'0'), ss: String(d.getSeconds()).padStart(2,'0'), a: d.getHours() >= 12 ? 'PM' : 'AM' };
      return "MM/dd/yyyy".replace('yyyy',_p.yyyy).replace('yy',_p.yy).replace('MM',_p.MM).replace('dd',_p.dd).replace('HH',_p.HH).replace('hh',_p.hh).replace('mm',_p.mm).replace('ss',_p.ss).replace(/a/g,_p.a).replace(/M(?!M)/g,_p.M).replace(/d(?!d)/g,_p.d).replace(/h(?!h)/g,_p.h);
    })();
    vars[""] = new Date(String("DayAfter3Days")).toLocaleDateString('en-US', { weekday: 'long' });
    if (String(vars["DayAfter3Days"]) === String("Saturday")) {
      vars["ExpectedExpirationDate"] = (() => {
        const d = new Date(String(vars["DateAfterAdding3Days"]));
        d.setDate(d.getDate() + parseInt(String("2")));
        const _p = { yyyy: String(d.getFullYear()), yy: String(d.getFullYear()).slice(-2), MM: String(d.getMonth()+1).padStart(2,'0'), M: String(d.getMonth()+1), dd: String(d.getDate()).padStart(2,'0'), d: String(d.getDate()), HH: String(d.getHours()).padStart(2,'0'), hh: String(d.getHours()%12||12).toString().padStart(2,'0'), h: String(d.getHours()%12||12), mm: String(d.getMinutes()).padStart(2,'0'), ss: String(d.getSeconds()).padStart(2,'0'), a: d.getHours() >= 12 ? 'PM' : 'AM' };
        return "MM/dd/yyyy".replace('yyyy',_p.yyyy).replace('yy',_p.yy).replace('MM',_p.MM).replace('dd',_p.dd).replace('HH',_p.HH).replace('hh',_p.hh).replace('mm',_p.mm).replace('ss',_p.ss).replace(/a/g,_p.a).replace(/M(?!M)/g,_p.M).replace(/d(?!d)/g,_p.d).replace(/h(?!h)/g,_p.h);
      })();
    } else if (String(vars["DayAfter3Days"]) === String("Sunday")) {
      vars["ExpectedExpirationDate"] = (() => {
        const d = new Date(String(vars["DateAfterAdding3Days"]));
        d.setDate(d.getDate() + parseInt(String("1")));
        const _p = { yyyy: String(d.getFullYear()), yy: String(d.getFullYear()).slice(-2), MM: String(d.getMonth()+1).padStart(2,'0'), M: String(d.getMonth()+1), dd: String(d.getDate()).padStart(2,'0'), d: String(d.getDate()), HH: String(d.getHours()).padStart(2,'0'), hh: String(d.getHours()%12||12).toString().padStart(2,'0'), h: String(d.getHours()%12||12), mm: String(d.getMinutes()).padStart(2,'0'), ss: String(d.getSeconds()).padStart(2,'0'), a: d.getHours() >= 12 ? 'PM' : 'AM' };
        return "MM/dd/yyyy".replace('yyyy',_p.yyyy).replace('yy',_p.yy).replace('MM',_p.MM).replace('dd',_p.dd).replace('HH',_p.HH).replace('hh',_p.hh).replace('mm',_p.mm).replace('ss',_p.ss).replace(/a/g,_p.a).replace(/M(?!M)/g,_p.M).replace(/d(?!d)/g,_p.d).replace(/h(?!h)/g,_p.h);
      })();
    } else {
      vars["ExpectedExpirationDate"] = (() => {
        const d = new Date(String(vars["DateAfterAdding3Days"]));
        d.setDate(d.getDate() + parseInt(String("0")));
        const _p = { yyyy: String(d.getFullYear()), yy: String(d.getFullYear()).slice(-2), MM: String(d.getMonth()+1).padStart(2,'0'), M: String(d.getMonth()+1), dd: String(d.getDate()).padStart(2,'0'), d: String(d.getDate()), HH: String(d.getHours()).padStart(2,'0'), hh: String(d.getHours()%12||12).toString().padStart(2,'0'), h: String(d.getHours()%12||12), mm: String(d.getMinutes()).padStart(2,'0'), ss: String(d.getSeconds()).padStart(2,'0'), a: d.getHours() >= 12 ? 'PM' : 'AM' };
        return "MM/dd/yyyy".replace('yyyy',_p.yyyy).replace('yy',_p.yy).replace('MM',_p.MM).replace('dd',_p.dd).replace('HH',_p.HH).replace('hh',_p.hh).replace('mm',_p.mm).replace('ss',_p.ss).replace(/a/g,_p.a).replace(/M(?!M)/g,_p.M).replace(/d(?!d)/g,_p.d).replace(/h(?!h)/g,_p.h);
      })();
    }
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//input[@id='searchTagInput']").click();
    await page.locator("//input[@id='searchTagInput']").fill(vars["BidReqId"]);
    vars["BidRequestIdPriceOffered"] = vars["BidReqId"];
    await page.locator("//span[normalize-space(text())=\"Bid Request ID\"]").click();
    vars["CCodeInCommitmentList"] = await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())='$|BidReqId|']//ancestor::tr//td[@data-title=\"CCode\"]").textContent() || '';
    vars["CommitmentIdInCommitmentList"] = await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())='$|BidReqId|']//ancestor::tr//td[@data-title=\"Comm. ID\"]").textContent() || '';
    vars["CompanyInCommitmentList"] = await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())='$|BidReqId|']//ancestor::tr//td[@data-title=\"Company\"]").textContent() || '';
    vars["CommAmountCommitmentList"] = await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())='$|BidReqId|']//ancestor::tr//td[@data-title=\"Comm. Amount\"]").textContent() || '';
    vars["CommLoansCommitmentList"] = await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())='$|BidReqId|']//ancestor::tr//td[@data-title=\"Comm. Loans\"]").textContent() || '';
    vars["CommittedDateCommitmentList"] = await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())='$|BidReqId|']//ancestor::tr//td[@data-title=\"Comm. Date\"]").textContent() || '';
    vars["ExpirationDateCommitmentList"] = await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())='$|BidReqId|']//ancestor::tr//td[@data-title=\"Expiration Date\"]").textContent() || '';
    vars["ExecutionTypeCommitmentList"] = await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())='$|BidReqId|']//ancestor::tr//td[@data-title=\"Execution Type\"]").textContent() || '';
    vars["AmountDeliveredCommitmentList"] = await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())='$|BidReqId|']//ancestor::tr//td[@data-title=\"Amt. Delivered\"]").textContent() || '';
    vars["AmountFundedCommitmentList"] = await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())='$|BidReqId|']//ancestor::tr//td[@data-title=\"Amt. Funded\"]").textContent() || '';
    vars["AmountPairedOffCommitmentList"] = await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())='$|BidReqId|']//ancestor::tr//td[@data-title=\"Amt. Pair-off\"]").textContent() || '';
    expect(String(vars["CompanyCCodePriceOfferedScreen"])).toBe(vars["CCodeInCommitmentList"]);
    expect(String(vars["CommitmentIDPriceOffered"])).toBe(vars["CommitmentIdInCommitmentList"]);
    await expect(page.locator("//td[@data-title=\"Bid Request ID\"]")).toContainText(vars["BidRequestIdPriceOffered"]);
    expect(String(vars["CompanyNamePriceOfferedScreen"])).toBe(vars["CompanyInCommitmentList"]);
    expect(String(vars["LockedLoanAmountPriceOffered"])).toBe(vars["CommAmountCommitmentList"]);
    expect(String(vars["LockedLoansCount"])).toBe(vars["CommLoansCommitmentList"]);
    expect(String(vars["ExpectedCommitDate"])).toBe(vars["CommittedDateCommitmentList"]);
    expect(String(vars["ExecutionTypePriceOfferedScreen"])).toBe(vars["ExecutionTypeCommitmentList"]);
    expect(String("$0")).toBe(vars["AmountDeliveredCommitmentList"]);
    expect(String("$0")).toBe(vars["AmountFundedCommitmentList"]);
    expect(String("$0")).toBe(vars["AmountPairedOffCommitmentList"]);
    expect(String(vars["ExpectedExpirationDate"])).toBe(vars["ExpirationDateCommitmentList"]);
  });
});
