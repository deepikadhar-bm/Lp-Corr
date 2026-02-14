import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Commitment List - TS_2', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS05_TC01_Perfom commit action for valid loan and verify the commitment should be created and. auth limit value should be updated', async ({ page }) => {
    // Prerequisite: REG_TS02_TC01.1_Perform submit for pricing action, and then verify the status should be updated to p
    // TODO: Ensure prerequisite test passes first

    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    vars["BidReqId"] = vars["RequestIDDetails"];
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqId"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Execution Type\"]//div[contains(text(),\"STANDARD\")]//ancestor::tr//td[@data-title=\"Bid Req. ID\"]//a[contains(@aria-label,\"View details \")]").click();
    vars["ExecutionType"] = await page.locator("//div[text()='Execution Type']/..//h5[text()='STANDARD']").textContent() || '';
    await page.locator("//div[@id=\"price-offered-list-tabs\"]/div//span[text()=\"All Loans\"]").click();
    await stepGroups.stepGroup_Storing_Open_Auth_Limit_and_AuthLimit_Price_Offered(page, vars);
    await page.locator("//td[@role=\"cell\"]//input[@type=\"checkbox\"]").check();
    vars["ExpectedCommittedLoanAmount"] = await page.locator("//tr[@class=\"row-highlight\"]//td[@data-title=\"Loan Amount\"]").textContent() || '';
    await page.locator("//button[normalize-space(text())=\"Get Price\"]").click();
    await page.locator("//button[@id='commitdropdownMenuButton']").waitFor({ state: 'visible' });
    await page.locator("//button[@id='commitdropdownMenuButton']").click();
    await page.locator("//span[text()=\"Yes, Commit\"]//parent::button").click();
    await page.locator("//button[contains(text(),\"Okay\")]").waitFor({ state: 'visible' });
    vars["ExpectedBidCommittedDate"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC" };
      const fmt = "M/d/yy";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    vars["ExpectedBidCommittedTime"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC" };
      const fmt = "h:mm a";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    vars[""] = String(vars["ExpectedBidCommittedDate"]) + ' ' + String(vars["ExpectedBidCommittedTime"]);
    vars["ExpectedLastCommittedBidDateAndTimeplus1"] = (() => {
      const d = new Date('2000-01-01 ' + String(vars["ExpectedBidCommittedTime"]));
      d.setMinutes(d.getMinutes() + parseInt(String("1")));
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }); // Format: h:mm a
    })();
    vars[""] = (() => {
      const d = new Date('2000-01-01 ' + String(''));
      d.setMinutes(d.getMinutes() - parseInt(String('')));
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    })();
    vars[""] = String(vars["ExpectedBidCommittedDate"]) + ' ' + String(vars["ExpectedLastCommittedBidDateAndTimeplus1"]);
    vars[""] = String(vars["ExpectedBidCommittedDate"]) + ' ' + String(vars["ExpectedLastCommittedBidDateAndTimeminus1"]);
    vars["CommitmentID"] = await page.locator("//div[contains(text(),'Commitment')]/span\n").textContent() || '';
    await page.locator("//button[contains(text(),\"Okay\")]").click();
    await page.locator("//div[@id=\"price-offered-list-tabs\"]/div//span[text()=\"All Loans\"]").click();
    await page.locator("//span[@aria-label=\"Committed loan\"]//..//..//button[contains(@aria-label, \"View loan details for\")]").waitFor({ state: 'visible' });
    vars["CommittedLoanNumStandard"] = await page.locator("//span[@aria-label=\"Committed loan\"]//..//..//button[contains(@aria-label, \"View loan details for\")]").textContent() || '';
    await expect(page.locator("//button[text()=\"$|CommittedLoanNumStandard|\"]//ancestor::tr//span[@aria-label=\"Committed loan\"]")).toBeVisible();
    vars["CommitmentOrderPriceOffered"] = await page.locator("//button[text()=\"$|CommittedLoanNumStandard|\"]//ancestor::tr/td//div[contains(@class,\"commit-order\")]").textContent() || '';
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
    await expect(page.getByText(vars["CommitmentID"])).toBeVisible();
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
    vars["ExpectedOpenAuthLimit"] = (parseFloat(String(vars["OpenAuthLimitBeforeCommit"])) - parseFloat(String(vars["ExpectedCommittedLoanAmount"]))).toFixed(0);
    vars["ExpectedOpenAuthLimitPercentage"] = (parseFloat(String(vars["ExpectedOpenAuthLimit"])) / parseFloat(String(vars["AuthLimitBeforeCommit"]))).toFixed(4);
    vars["ExpectedOpenAuthLimitPercentage"] = (parseFloat(String(vars["ExpectedOpenAuthLimitPercentage"])) * parseFloat(String("100"))).toFixed(2);
    expect(String(vars["ExpectedOpenAuthLimit"])).toBe(vars["OpenAuthLimitAfterCommit"]);
    expect(String(vars["ExpectedOpenAuthLimitPercentage"])).toBe(vars["OpenAuthLimitPercentageAfterCommit"]);
    expect(String(vars["AuthLimitBeforeCommit"])).toBe(vars["AuthLimitAfterCommit"]);
    if (String(vars["ExpectedBidCommittedDateAndTime"]) === String(vars["LastCommittedBidAfterCommit"])) {
    } else if (String(vars["ExpectedLastCommittedBidDateAndTimeplus1"]) === String(vars["LastCommittedBidAfterCommit"])) {
    } else {
      expect(String(vars["ExpectedLastCommittedBidDateAndTimeminus1"])).toBe(vars["LastCommittedBidAfterCommit"]);
    }
    expect(String(vars["ExpectedCommittedLoanAmount"])).toBe(vars["LastCommittedBidLoanAmountAfterCommit"]);
    // Write to test data profile: "RequestIdFrom5-1" = vars["BidReqId"]
    // TODO: Test data profile writes need custom implementation
    await page.locator("//div[text()[normalize-space() = \"Total Loans\"]]").click();
    await page.locator("//tbody//input[@type=\"checkbox\"]").waitFor({ state: 'visible' });
    await page.locator("//tbody//input[@type=\"checkbox\"]").check();
    await page.locator("//button[@id='commitdropdownMenuButton']").waitFor({ state: 'visible' });
    await page.locator("//button[@id='commitdropdownMenuButton']").click();
    await expect(page.locator("//div[normalize-space(text())=\"$|CommitmentID|\"]")).toBeVisible();
    vars["CommitmentOrderCommitmentList"] = await page.locator("//div[normalize-space(text())=\"$|CommitmentID|\"]//preceding-sibling::div[contains(text(),\"Commitment Order\")]").textContent() || '';
    vars["CommitmentOrderCommitmentList"] = String(vars["CommitmentOrderCommitmentList"]).slice(-1);
    expect(String(vars["CommitmentOrderPriceOffered"])).toBe(vars["CommitmentOrderCommitmentList"]);
    // Write to test data profile: "RequestIdFrom5-1" = vars["BidReqId"]
    // TODO: Test data profile writes need custom implementation
  });
});
