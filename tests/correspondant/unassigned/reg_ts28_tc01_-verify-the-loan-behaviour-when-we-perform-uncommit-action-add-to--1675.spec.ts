import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS28_TC01_ Verify the loan behaviour when we perform uncommit action / Add to commit action for a loan', async ({ page }) => {
    // Prerequisite: REG_TS01_TC01_Perform submit for pricing action, and then verify the status should be updated to pri
    // TODO: Ensure prerequisite test passes first

    // [DISABLED] Login to CORR Portal
    // await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    vars["BidReqIdPriceOffered"] = vars["RequestIDDetails"];
    // [DISABLED] Store 57818B1FBE79 in BidReqIdPriceOffered
    // vars["BidReqIdPriceOffered"] = "57818B1FBE79";
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdPriceOffered"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]").click();
    await page.locator("//tbody//input[@type=\"checkbox\"]").waitFor({ state: 'visible' });
    await page.locator("//tbody//input[@type=\"checkbox\"]").check();
    await page.locator("//button[normalize-space(text())=\"Get Price\"]").click();
    await page.locator("//button[@id='commitdropdownMenuButton']").waitFor({ state: 'visible' });
    await expect(page.locator("//button[@id='commitdropdownMenuButton']")).toBeEnabled();
    await page.locator("//button[@id='commitdropdownMenuButton']").click();
    await page.locator("//span[text()=\"Yes, Commit\"]//parent::button").click();
    await page.locator("//span[text()=\"Yes, Commit\"]//parent::button").waitFor({ state: 'hidden' });
    await page.locator("//button[contains(text(),\"Okay\")]").waitFor({ state: 'visible' });
    await page.locator("//button[contains(text(),\"Okay\")]").click();
    await page.locator("//div[contains(text(),\"Open Auth Limit:\")]//following-sibling::div").waitFor({ state: 'visible' });
    vars["OpenAuthLimit"] = await page.locator("//div[contains(text(),\"Open Auth Limit:\")]//following-sibling::div").textContent() || '';
    vars["OpenAuthLimitBeforeCommit"] = String('').split("(")["0"] || '';
    vars["AuthLimitBeforeCommit"] = await page.locator("//div[normalize-space(text())=\"Auth Limit:\"]//following-sibling::div").textContent() || '';
    vars["CommittedLoansCountBeforeCommit"] = await page.locator("//span[contains(text(),\"Locked/Committed Loans\")]/following-sibling::span[contains(@class,\"counter\")]").textContent() || '';
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//input[@id='searchTagInput']").click();
    await page.locator("//input[@id='searchTagInput']").fill(vars["BidReqIdPriceOffered"]);
    await page.locator("//span[normalize-space(text())=\"Bid Request ID\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//tr[td[@data-title=\"Bid Request ID\"]//div[contains(text(),\"$|BidReqIdPriceOffered|\")]]//td[@data-title=\"Comm. ID\"]").click();
    vars["CommitID"] = await page.locator("//div[text()=\"Commit. ID\"]/following-sibling::h5").textContent() || '';
    vars["CommitOrderInCommitmentList"] = await page.locator("//div[text()=\"Commit. #\"]/following-sibling::h5").textContent() || '';
    await page.locator("//div[text()[normalize-space() = \"Total Loans\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@role=\"cell\"]//input[@type=\"checkbox\"]").check();
    vars["CommittedCorrLoan"] = await page.locator("//tr[contains(@class,\"row\")]//button[contains(@class,\"btn bg-transparent text-primary\")][1]").textContent() || '';
    // [DISABLED] Store text from the element element into a variable test data
    // vars["test data"] = await page.locator('//*').textContent() || '';
    // [DISABLED] Trim the data CommittedCorrLoan and store into a runtime variable CommittedCorrLoan
    // vars["CommittedCorrLoan"] = String(vars["CommittedCorrLoan"]).trim();
    await page.locator("//button[@id='commitdropdownMenuButton']").waitFor({ state: 'visible' });
    await page.locator("//button[@id='commitdropdownMenuButton']").click();
    // [DISABLED] Store text from the element Commitment Order(Commitment List) into a variable CommitOrderInCommitmentList
    // vars["CommitOrderInCommitmentList"] = await page.locator("//div[text()=\"$|CommitID|\"]//preceding-sibling::div[contains(text(),\"Commitment Order\")]").textContent() || '';
    await page.locator("//div[text()=\"$|CommitID|\"]//preceding-sibling::div[contains(text(),\"Commitment Order\")]").click();
    await page.locator("//span[text()[normalize-space() = \"Yes, Commit\"]]").click();
    // [DISABLED] Store key_blank in space
    // vars["space"] = "key_blank";
    // [DISABLED] Store StringFunctions :: Concat in DateAndTimeFormat
    // vars["DateAndTimeFormat"] = "M/d/yy" + vars["space"] + "h:mm a";
    vars["ExpectedBidCommittedDateAndTime"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC" };
      const fmt = "DateAndTimeFormat";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    await page.locator("//button[text()[normalize-space() = \"Okay\"]]").waitFor({ state: 'visible' });
    await page.locator("//button[text()[normalize-space() = \"Okay\"]]").click();
    await page.locator("//span[contains(text(),\" Total Committed Loans\")]").waitFor({ state: 'visible' });
    await page.locator("//span[contains(text(),\" Total Committed Loans\")]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//div[text()=\"Commit. ID\"]//following-sibling::h5[text()=\"$|CommitID|\"]//ancestor::div[contains(@class,\"accordion-item\")]//div[@class=\"accordion-body\"]//tbody//button[\"$|CommittedCorrLoan|\"]")).toBeVisible();
    await expect(page.getByText(vars["CommittedCorrLoan"])).toBeVisible();
    vars["CommittedLastName"] = await page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Last Name\"]").textContent() || '';
    vars["CommittedLoanAmount"] = await page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Loan Amount\"]").textContent() || '';
    vars["CommittedIntRate"] = await page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Int. Rate\"]").textContent() || '';
    vars["CommittedRefSecProd"] = await page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Ref Sec Prod.\"]").textContent() || '';
    vars["CommittedRefSecPrice"] = await page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Ref Sec Price\"]  ").textContent() || '';
    vars["CommittedGrossPrice"] = await page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Gross Price\"]").textContent() || '';
    vars["CommittedHedgeRatio"] = await page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Hedge Ratio\"]  ").textContent() || '';
    // [DISABLED] Store text from the element Curr Market Value(Commitment List) into a variable CommittedMarketValue
    // vars["CommittedMarketValue"] = await page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Curr Market Value\"]").textContent() || '';
    vars["CommittedMarkAdj"] = await page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Mark Adj\"]").textContent() || '';
    vars["CommittedCurrGross"] = await page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Curr Gross\"]").textContent() || '';
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdPriceOffered"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]").click();
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
    vars["ExpectedOpenAuthLimit"] = (parseFloat(String(vars["OpenAuthLimitBeforeCommit"])) - parseFloat(String(vars["CommittedLoanAmount"]))).toFixed(0);
    vars["ExpectedOpenAuthLimitPercentage"] = (parseFloat(String(vars["ExpectedOpenAuthLimit"])) / parseFloat(String(vars["AuthLimitBeforeCommit"]))).toFixed(4);
    vars["ExpectedOpenAuthLimitPercentage"] = (parseFloat(String(vars["ExpectedOpenAuthLimitPercentage"])) * parseFloat(String("100"))).toFixed(2);
    expect(String(vars["OpenAuthLimitAfterCommit"])).toBe(vars["ExpectedOpenAuthLimit"]);
    expect(String(vars["OpenAuthLimitPercentageAfterCommit"])).toBe(vars["ExpectedOpenAuthLimitPercentage"]);
    expect(String(vars["AuthLimitBeforeCommit"])).toBe(vars["AuthLimitAfterCommit"]);
    expect(String(vars["LastCommittedBidAfterCommit"])).toBe(vars["ExpectedBidCommittedDateAndTime"]);
    expect(String(vars["CommittedLoanAmount"])).toBe(vars["LastCommittedBidLoanAmountAfterCommit"]);
    vars["CommittedLoanCountAfterCommit"] = await page.locator("//span[contains(text(),\"Locked/Committed Loans\")]/following-sibling::span[contains(@class,\"counter\")]").textContent() || '';
    expect(String(vars["CommittedLoanCountAfterCommit"])).toBe(vars["CommittedLoansCountBeforeCommit"]);
    await expect(page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//span[@aria-label=\"Committed loan\"]")).toBeVisible();
    vars["CommitmentOrderInPriceOffered"] = await page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//div[@class=\"commit-order\"]").textContent() || '';
    expect(String(vars["CommitOrderInCommitmentList"])).toBe(vars["CommitmentOrderInPriceOffered"]);
    // [DISABLED] Verify that the element Committed Corr Loan(Price Offered) displays text CommittedCorrLoan and With Scrollable FALSE
    // await expect(page.locator("//button[contains(@aria-label,\"View loan details for \")]")).toContainText(vars["CommittedCorrLoan"]);
    await expect(page.locator("//button[text()=\"$|CommittedCorrLoan|\"]")).toBeVisible();
    await expect(page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Last Name\"]\n ")).toContainText(vars["CommittedLastName"]);
    await expect(page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Loan Amount\"]")).toContainText(vars["CommittedLoanAmount"]);
    await expect(page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Int. Rate\"]")).toContainText(vars["CommittedIntRate"]);
    await expect(page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Ref Sec Prod.\"]")).toContainText(vars["CommittedRefSecProd"]);
    await expect(page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Ref Sec Price\"]  ")).toContainText(vars["CommittedRefSecPrice"]);
    await expect(page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Gross Price\"]")).toContainText(vars["CommittedGrossPrice"]);
    await expect(page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Hedge Ratio\"]  ")).toContainText(vars["CommittedHedgeRatio"]);
    await expect(page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Mark Adj\"]")).toContainText(vars["CommittedMarkAdj"]);
    await expect(page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Curr Gross\"]")).toContainText(vars["CommittedCurrGross"]);
    // Write to test data profile: "RequestIDfrom28-1" = vars["BidReqIdPriceOffered"]
    // TODO: Test data profile writes need custom implementation
    // [DISABLED] Click on Locked/Committed Loans
    // await page.locator("//div[@id='price-offered-list-tabs']//span[text()[normalize-space() = \"Locked/Committed Loans\"]]").click();
    // [DISABLED] Wait until the element Paste Loans Button(Price Offered Page) is not visible
    // await page.locator("//button[contains(text(),\"Paste Loans\")]\n").waitFor({ state: 'hidden' });
    // [DISABLED] Verify that the element Commit Selected Button is not present and With Scrollable FALSE
    // await expect(page.locator("//button[@id='commitdropdownMenuButton']")).toBeVisible();
    // [DISABLED] Verify that the element Paste Loans Button(Price Offered Page) is not present and With Scrollable FALSE
    // await expect(page.locator("//button[contains(text(),\"Paste Loans\")]\n")).toBeVisible();
  });
});
