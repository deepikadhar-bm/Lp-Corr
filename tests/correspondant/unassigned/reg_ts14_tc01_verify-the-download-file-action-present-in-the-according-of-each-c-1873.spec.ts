import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS14_TC01_Verify the download file action present in the according of each commitment, It should display the proper committed loans details', async ({ page }) => {
    // Prerequisite: REG_TS01_TC01_Perform submit for pricing action, and then verify the status should be updated to pri
    // TODO: Ensure prerequisite test passes first

    // Set up download handler
    page.on('download', async (download) => {
      const filePath = path.join('test-results', 'downloads', download.suggestedFilename());
      await download.saveAs(filePath);
      vars['_lastDownloadPath'] = filePath;
    });

    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["BidReqId"] = vars["RequestIDDetails"];
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqId"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[contains(text(),\"$|BidReqId|\")]").click();
    await page.locator("//div[@aria-label=\"Sort by Last Name\"]").waitFor({ state: 'visible' });
    vars["ReferenceMonth"] = await page.locator("//div[contains(text(),\"Sec. Month\")]//following-sibling::h5").textContent() || '';
    await page.locator("//div[@aria-label=\"Sort by Last Name\"]").click();
    await page.locator("//div[contains(text(),\"Last Name\")]//following::span[contains(@class,\"fas small px-1 fa-sort-down\")]").waitFor({ state: 'visible' });
    await page.locator("//tbody//input[@type=\"checkbox\"]").check();
    vars["CommittedCorrLoan"] = await page.locator("//tr[contains(@class,\"row\")]//button[contains(@class,\"btn bg-transparent text-primary\")][1]").textContent() || '';
    await page.locator("//button[normalize-space(text())=\"Get Price\"]").waitFor({ state: 'visible' });
    await page.locator("//button[normalize-space(text())=\"Get Price\"]").click();
    await page.locator("//button[@id='commitdropdownMenuButton']").waitFor({ state: 'visible' });
    await page.locator("//button[@id='commitdropdownMenuButton']").click();
    await page.locator("//span[text()=\"Yes, Commit\"]//parent::button").click();
    vars["CurrentEstTime"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC-05:00" };
      const fmt = "hh:mm a";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    vars["CommittedDateUI1"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC-05:00" };
      const fmt = "MM-dd-yyyy";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    vars["ActualCurrentEstTime"] = (() => {
      const d = new Date(String(vars["CurrentEstTime"]));
      const _p = { yyyy: String(d.getFullYear()), yy: String(d.getFullYear()).slice(-2), MM: String(d.getMonth()+1).padStart(2,'0'), M: String(d.getMonth()+1), dd: String(d.getDate()).padStart(2,'0'), d: String(d.getDate()), HH: String(d.getHours()).padStart(2,'0'), hh: String(d.getHours()%12||12).toString().padStart(2,'0'), h: String(d.getHours()%12||12), mm: String(d.getMinutes()).padStart(2,'0'), ss: String(d.getSeconds()).padStart(2,'0'), a: d.getHours() >= 12 ? 'PM' : 'AM' };
      return "hh:mm".replace('yyyy',_p.yyyy).replace('yy',_p.yy).replace('MM',_p.MM).replace('dd',_p.dd).replace('HH',_p.HH).replace('hh',_p.hh).replace('mm',_p.mm).replace('ss',_p.ss).replace(/a/g,_p.a).replace(/M(?!M)/g,_p.M).replace(/d(?!d)/g,_p.d).replace(/h(?!h)/g,_p.h);
    })();
    vars[""] = String(vars["ActualCurrentEstTime"]).replace(/ActualCurrentEstTime/g, "");
    vars["CurrentEstTimePlusOneMin"] = (() => {
      const d = new Date('2000-01-01 ' + String(vars["CurrentEstTime"]));
      d.setMinutes(d.getMinutes() + parseInt(String("1")));
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }); // Format: hh:mm
    })();
    vars[""] = String(vars["CurrentEstTimePlusOneMin"]).replace(/CurrentEstTimePlusOneMin/g, "");
    vars[""] = (() => {
      const d = new Date('2000-01-01 ' + String(''));
      d.setMinutes(d.getMinutes() - parseInt(String('')));
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    })();
    vars["CurrentEstTimeMinusOneMin"] = (() => {
      const d = new Date(String(vars["CurrentEstTimeMinusOneMin"]));
      const _p = { yyyy: String(d.getFullYear()), yy: String(d.getFullYear()).slice(-2), MM: String(d.getMonth()+1).padStart(2,'0'), M: String(d.getMonth()+1), dd: String(d.getDate()).padStart(2,'0'), d: String(d.getDate()), HH: String(d.getHours()).padStart(2,'0'), hh: String(d.getHours()%12||12).toString().padStart(2,'0'), h: String(d.getHours()%12||12), mm: String(d.getMinutes()).padStart(2,'0'), ss: String(d.getSeconds()).padStart(2,'0'), a: d.getHours() >= 12 ? 'PM' : 'AM' };
      return "hh:mm".replace('yyyy',_p.yyyy).replace('yy',_p.yy).replace('MM',_p.MM).replace('dd',_p.dd).replace('HH',_p.HH).replace('hh',_p.hh).replace('mm',_p.mm).replace('ss',_p.ss).replace(/a/g,_p.a).replace(/M(?!M)/g,_p.M).replace(/d(?!d)/g,_p.d).replace(/h(?!h)/g,_p.h);
    })();
    vars[""] = String(vars["CurrentEstTimeMinusOneMin"]).replace(/CurrentEstTimeMinusOneMin/g, "");
    await page.locator("//button[contains(text(),\"Okay\")]").waitFor({ state: 'visible' });
    vars["CommitmentID"] = await page.locator("//div[contains(text(),'Commitment')]/span\n").textContent() || '';
    await page.locator("//button[contains(text(),\"Okay\")]").click();
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//input[@id='searchTagInput']").click();
    await page.locator("//input[@id='searchTagInput']").fill(vars["CommitmentID"]);
    await page.locator("//span[normalize-space(text())=\"Commitment ID\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["CCodeUI"] = await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())='$|BidReqId|']//ancestor::tr//td[@data-title=\"CCode\"]").textContent() || '';
    vars["CommitmentIdUI"] = await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())='$|BidReqId|']//ancestor::tr//td[@data-title=\"Comm. ID\"]").textContent() || '';
    vars["CommitmentIdUI"] = String(vars["CommitmentIdUI"]).trim();
    vars["CompanyNameUI"] = await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())='$|BidReqId|']//ancestor::tr//td[@data-title=\"Company\"]").textContent() || '';
    vars["CompanyNameUI"] = String(vars["CompanyNameUI"]).trim();
    vars["CommitmentLoanAmountUI"] = await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())='$|BidReqId|']//ancestor::tr//td[@data-title=\"Comm. Amount\"]").textContent() || '';
    vars["CommittedLoansUI"] = await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())='$|BidReqId|']//ancestor::tr//td[@data-title=\"Comm. Loans\"]").textContent() || '';
    vars["CommittedDateUI"] = await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())='$|BidReqId|']//ancestor::tr//td[@data-title=\"Comm. Date\"]").textContent() || '';
    vars["ExpiredDateUI"] = await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())='$|BidReqId|']//ancestor::tr//td[@data-title=\"Expiration Date\"]").textContent() || '';
    vars["ExecutionTypeUI"] = await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())='$|BidReqId|']//ancestor::tr//td[@data-title=\"Execution Type\"]").textContent() || '';
    await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())=\"$|BidReqId|\"]//ancestor::tr//td[@data-title=\"Comm. ID\"]//a[contains(@aria-label,\"View details for commitme\")]").click();
    vars["ProductNameUI"] = await page.locator("//div[text()=\"Product\"]//following-sibling::h5").textContent() || '';
    vars["RefSecCouponUI"] = await page.locator("//div[contains(text(),\"Coupon\")]//following-sibling::h5").textContent() || '';
    vars["CurrentMarketValueUI"] = await page.locator("//ancestor::tr//td[@data-title=\"Curr Market Value\"]").textContent() || '';
    vars["ChaseLoanNumUI"] = await page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Chase Loan#\"]").textContent() || '';
    vars["LastNameUI"] = await page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Last Name\"]").textContent() || '';
    vars["InterestRateUI"] = await page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Int. Rate\"]").textContent() || '';
    vars["CommittedPriceUI"] = await page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Curr Gross\"]").textContent() || '';
    vars["HedgeRatioUI"] = await page.locator("//button[text()=\"$|CommittedCorrLoan|\"]//ancestor::tr//td[@data-title=\"Hedge Ratio\"]  ").textContent() || '';
    await page.locator("//button[text()=\"$|CommittedCorrLoan|\"]").click();
    await page.locator("//input[@placeholder=\"Search Fields\"]").waitFor({ state: 'visible' });
    await page.locator("(//div[@class=\"border-bottom p-2\" and contains(text(),\"Product Code\")]/following-sibling::div)[1]").scrollIntoViewIfNeeded();
    vars["ProductCodeUI"] = await page.locator("(//div[@class=\"border-bottom p-2\" and contains(text(),\"Product Code\")]/following-sibling::div)[1]").textContent() || '';
    await page.locator("(//div[@class=\"border-bottom p-2\" and contains(text(),\"LMI_INCENTIVE_PRICE\")]/following-sibling::div)[1]").scrollIntoViewIfNeeded();
    vars["LMIPriceUI"] = await page.locator("(//div[@class=\"border-bottom p-2\" and contains(text(),\"LMI_INCENTIVE_PRICE\")]/following-sibling::div)[1]").textContent() || '';
    if (true) /* Element LMI Type(Popup Details) is visible */ {
      vars["LMITypeUI"] = await page.locator("(//div[@class=\"border-bottom p-2\" and contains(text(),\"LMI_TYPE\")]/following-sibling::div)[1]").textContent() || '';
    } else {
      vars["LMITypeUI"] = "Null";
    }
    await page.locator("//button[@aria-label=\"Close\"]").click();
    vars["AllCoverLetterDetailsUI"] = String(vars["CommitmentIdUI"]) + ";" + String(vars["CommittedDateUI"]);
    vars["AllCoverLetterDetailsUI"] = String(vars["AllCoverLetterDetailsUI"]) + ";" + String(vars["ProductNameUI"]);
    vars["AllCoverLetterDetailsUI"] = String(vars["AllCoverLetterDetailsUI"]) + ";" + String(vars["CommitmentLoanAmountUI"]);
    vars["AllCoverLetterDetailsUI"] = String(vars["AllCoverLetterDetailsUI"]) + ";" + String(vars["ExpiredDateUI"]);
    vars["AllCoverLetterDetailsUI"] = String(vars["AllCoverLetterDetailsUI"]) + ";" + String(vars["RefSecCouponUI"]);
    vars["AllCoverLetterDetailsUI"] = String(vars["AllCoverLetterDetailsUI"]) + ";" + String(vars["CommittedLoansUI"]);
    vars["AllCoverLetterDetailsUI"] = String(vars["AllCoverLetterDetailsUI"]) + ";" + String(vars["BidReqId"]);
    vars["AllCoverLetterDetailsUI"] = String(vars["AllCoverLetterDetailsUI"]) + ";" + String(vars["ReferenceMonth"]);
    vars["AllCoverLetterDetailsUI"] = String(vars["AllCoverLetterDetailsUI"]) + ";" + String(vars["ExecutionTypeUI"]);
    vars["AllCoverLetterDetailsUI"] = String(vars["AllCoverLetterDetailsUI"]) + ";" + String(vars["CurrentMarketValueUI"]);
    vars["count"] = "1";
    for (let dataIdx = parseInt(vars["count"]); dataIdx <= 11; dataIdx++) {
      vars["IndividualCoverLetterDetailsUI"] = String(vars["AllCoverLetterDetailsUI"]).split(";")[parseInt(String(vars["count"]))] || '';
      vars["IndividualCoverLetterDetailsUI"] = String(vars["IndividualCoverLetterDetailsUI"]).trim();
      // Write to test data profile: "ChaseInfo" = vars["IndividualCoverLetterDetailsUI"]
      // TODO: Test data profile writes need custom implementation
      vars["count"] = (parseFloat(String(vars["count"])) + parseFloat(String("1"))).toFixed(0);
    }
    vars["AllLoanDetailsUI"] = String(vars["CCodeUI"]) + ";" + String(vars["CommitmentIdUI"]);
    vars["AllLoanDetailsUI"] = String(vars["AllLoanDetailsUI"]) + ";" + String(vars["ChaseLoanNumUI"]);
    vars["AllLoanDetailsUI"] = String(vars["AllLoanDetailsUI"]) + ";" + String(vars["CommittedCorrLoan"]);
    vars["AllLoanDetailsUI"] = String(vars["AllLoanDetailsUI"]) + ";" + String(vars["LastNameUI"]);
    vars["AllLoanDetailsUI"] = String(vars["AllLoanDetailsUI"]) + ";" + String(vars["ProductCodeUI"]);
    vars["AllLoanDetailsUI"] = String(vars["AllLoanDetailsUI"]) + ";" + String(vars["CommitmentLoanAmountUI"]);
    vars["AllLoanDetailsUI"] = String(vars["AllLoanDetailsUI"]) + ";" + String(vars["InterestRateUI"]);
    vars["AllLoanDetailsUI"] = String(vars["AllLoanDetailsUI"]) + ";" + String(vars["CommittedPriceUI"]);
    vars["AllLoanDetailsUI"] = String(vars["AllLoanDetailsUI"]) + ";" + String(vars["ExpiredDateUI"]);
    vars["AllLoanDetailsUI"] = String(vars["AllLoanDetailsUI"]) + ";" + String(vars["HedgeRatioUI"]);
    vars["AllLoanDetailsUI"] = String(vars["AllLoanDetailsUI"]) + ";" + String(vars["LMIPriceUI"]);
    vars["AllLoanDetailsUI"] = String(vars["AllLoanDetailsUI"]) + ";" + String(vars["LMITypeUI"]);
    vars["count"] = "1";
    for (let dataIdx = parseInt(vars["count"]); dataIdx <= 13; dataIdx++) {
      vars["IndividualLoanDetailsUI"] = String(vars["AllLoanDetailsUI"]).split(";")[parseInt(String(vars["count"]))] || '';
      vars["IndividualLoanDetailsUI"] = String(vars["IndividualLoanDetailsUI"]).trim();
      // Write to test data profile: "LoanDetails(Loan Level Details)" = vars["IndividualLoanDetailsUI"]
      // TODO: Test data profile writes need custom implementation
      vars["count"] = (parseFloat(String(vars["count"])) + parseFloat(String("1"))).toFixed(0);
    }
    vars["space"] = "key_blank";
    vars["CompanyNameWithCCodeUI"] = vars["CompanyNameUI"] + vars["space"] + "-" + vars["space"] + "(" + vars["CCodeUI"] + ")";
    vars["ExpectedFileName"] = "CommitmentLetter_" + vars["CommitmentIdUI"] + "_" + vars["CommittedDateUI1"] + vars["space"] + vars["ActualCurrentEstTime"];
    vars["ExpectedFileNamePlusOne"] = "CommitmentLetter_" + vars["CommitmentIdUI"] + "_" + vars["CommittedDateUI1"] + vars["space"] + vars["CurrentEstTimePlusOneMin"];
    vars["ExpectedFileNameMinusOne"] = "CommitmentLetter_" + vars["CommitmentIdUI"] + "_" + vars["CommittedDateUI1"] + vars["space"] + vars["CurrentEstTimeMinusOneMin"];
    await page.locator("//a[contains(text(),\"Commitment List\")]//i[contains(@class,\"fas fa-arrow-left \")]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Comm. Letter\"]//span").click();
    await page.locator("//td[@data-title=\"File Name\"]").waitFor({ state: 'visible' });
    vars["FileNamePopup"] = await page.locator("//td[@data-title=\"File Name\"]").textContent() || '';
    vars["FileNamePopup"] = String(vars["FileNamePopup"]).trim();
    if (String(vars["FileNamePopup"]).includes(String(vars["ExpectedFileName"]))) {
    } else if (String(vars["FileNamePopup"]).includes(String(vars["ExpectedFileNamePlusOne"]))) {
    } else {
      expect(String(vars["FileNamePopup"])).toBe(vars["ExpectedFileNameMinusOne"]);
    }
    vars["CreationDatePopup"] = await page.locator("//td[@data-title=\"Creation Date\"]").textContent() || '';
    expect(String(vars["CommittedDateUI"])).toBe(vars["CreationDatePopup"]);
    await page.locator("//td[@data-title=\"File Name\" and contains(text(),\"$|FileNamePopup|\")]/following-sibling::td[@data-title=\"Actions\"]//button[i[contains(@class,'fa-arrow-to-bottom')]]").waitFor({ state: 'visible' });
    await page.locator("//td[@data-title=\"File Name\" and contains(text(),\"$|FileNamePopup|\")]/following-sibling::td[@data-title=\"Actions\"]//button[i[contains(@class,'fa-arrow-to-bottom')]]").hover();
    await page.locator("//td[@data-title=\"File Name\" and contains(text(),\"$|FileNamePopup|\")]/following-sibling::td[@data-title=\"Actions\"]//button[i[contains(@class,'fa-arrow-to-bottom')]]").evaluate(el => (el as HTMLElement).click());
    await page.waitForTimeout(3000); // Wait for download to complete
    vars["FilePath"] = vars['_lastDownloadPath'] || '';
    vars[""] = vars['_lastDownloadPath'] ? require('path').basename(vars['_lastDownloadPath']) : '';
    if (String(vars["ActualDownloadedFileName1"]).includes(String(vars["ExpectedFileName"]))) {
    } else if (String(vars["ActualDownloadedFileName1"]).includes(String(vars["ExpectedFileNamePlusOne"]))) {
    } else {
      expect(String(vars["ActualDownloadedFileName1"])).toBe(vars["ExpectedFileNameMinusOne"]);
    }
  });
});
