import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';
import * as excelHelper from '../../../src/helpers/excel-helpers';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS14_TC03_Verify the data present in bid detail screen by selecting both standard and chase execution type', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Deleting_Early_Config_Report_If_Present(page, vars);
    // [DISABLED] Navigating to Bulk Batch Timing
    // await stepGroups.stepGroup_Navigating_to_Bulk_Batch_Timing(page, vars);
    // [DISABLED] Store the value displayed in the text box Pricing_Return_Time_Buffer field into a variable BufferTime
    // vars["BufferTime"] = await page.locator("//input[@id=\"pricingReturnTimeBuffer\"]").inputValue() || '';
    await stepGroups.stepGroup_Navigating_to_Upload_New_Bid_Request(page, vars);
    await stepGroups.stepGroup_Uploading_Bid_Request_By_Selecting_both_standard_and_chase_t(page, vars);
    // [DISABLED] Uploading Bid Request
    // await stepGroups.stepGroup_Uploading_Bid_Request(page, vars);
    if (true) /* Element Second Enabled Time is visible */ {
      await stepGroups.stepGroup_Selecting_Second_Enabled_Batch_Time_If_the_Condition_is_fail(page, vars);
      // [DISABLED] Scroll to the element Enabled Time New into view
      // await page.locator("(//option[@aria-disabled=\"false\"])").scrollIntoViewIfNeeded();
      // [DISABLED] Click on Enabled Time New
      // await page.locator("(//option[@aria-disabled=\"false\"])").click();
    } else {
      await stepGroups.stepGroup_Navigating_to_Bulk_Batch_Timing(page, vars);
      await stepGroups.stepGroup_Modifying_Batch_Intervals_For_next_bussiness_day(page, vars);
      await stepGroups.stepGroup_Navigating_to_Upload_New_Bid_Request(page, vars);
      await stepGroups.stepGroup_Uploading_Bid_Request_By_Selecting_both_standard_and_chase_t(page, vars);
      await stepGroups.stepGroup_Selecting_Second_Enabled_Batch_Time_If_the_Condition_is_fail(page, vars);
      // [DISABLED] Uploading Bid Request
      // await stepGroups.stepGroup_Uploading_Bid_Request(page, vars);
      // [DISABLED] Scroll to the element Enabled Date into view
      // await page.locator("//option[@aria-disabled=\"false\"]").scrollIntoViewIfNeeded();
      // [DISABLED] Click on Enabled Date
      // await page.locator("//option[@aria-disabled=\"false\"]").click();
    }
    vars["CurrentESTDate"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC-05:00" };
      const fmt = "MM/dd/yyyy";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    vars["CurrentEstTime"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC-05:00" };
      const fmt = "hh:mm a";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    vars["CurrentEstHourMin"] = String(vars["CurrentEstTime"]).substring(0, String(vars["CurrentEstTime"]).length - 3);
    vars["CurrentEstTimeUnit"] = String(vars["CurrentEstTime"]).substring(6);
    await page.locator("//label[text()=\"Bid Requested Date\"]").click();
    await page.locator("(//input[@type=\"file\"])[1]").setInputFiles(path.resolve(__dirname, 'test-data', "Bid_Valid_file.xlsx,Bid_Valid_file.xlsx"));
    vars["LoanNumberFromExcel"] = excelHelper.readCell(path.resolve(__dirname, 'test-data', "Bid_Valid_file.xlsx,Bid_Valid_file.xlsx"), "2", "1");
    vars["SelectedCompanyName"] = await page.locator("(//*[@id=\"selectCompanyDropdown\"]//button)[1]").textContent() || '';
    vars["SelectedLockTermStandard"] = await page.locator("(//option[@value=\"3\"])[1]/../..//select[@aria-label=\"Dropdown selection\"]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
    vars["SelectedLockTermChase"] = await page.locator("(//select[contains(normalize-space(),\"Select 3 7 15\")])[2]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
    vars["SelectedBidMappingId"] = await page.locator("//button//div[text()=' @|BidMappingID| ']").textContent() || '';
    vars["SelectedBatchTime"] = await page.locator("(//select[@aria-label=\"Dropdown selection\"])[3]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
    await expect(page.locator("//span[text()[normalize-space() = \"Upload Bid\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Upload Bid\"]]").click();
    await page.locator("//div[@class=\"modal-header\"]/div/h5").waitFor({ state: 'visible' });
    await expect(page.locator("//div[@class=\"modal-header\"]/div/h5")).toContainText("Bid Upload Progress");
    await page.locator("//span[text()=\"Continue\"]/..").waitFor({ state: 'visible' });
    await expect(page.locator("//span[text()=\"Continue\"]/..")).toBeVisible();
    await expect(page.locator("(//td[@data-title=\"Status\"]//span)[position() >=1 and position() <=5]")).toContainText("Success");
    await page.locator("//span[text()=\"Continue\"]/..").click();
    await expect(page.locator("(//td[@data-title=\"Corr. Loan#\"]//button[1])[last()]")).toContainText(vars["LoanNumberFromExcel"]);
    await expect(page.locator("//div[text()=\"CCode\"]/..//h5")).toContainText(testData["Ccode for freedom"]);
    await expect(page.locator("//div[text()=\"Company\"]/..//h5")).toContainText(vars["SelectedCompanyName"]);
    vars["RequestIdDetails"] = await page.locator("//div[text()=\"Request ID\"]/..//h5").textContent() || '';
    vars["RequestIdDetails"] = String(vars["RequestIdDetails"]).trim();
    vars[""] = String('').length.toString();
    expect(String(vars["RequestIdCount"])).toBe("12");
    if (true) /* Verify that the element Bid Status From Details displays tex */ {
    } else {
      await expect(page.locator("//div[text()=\"Status\"]/..//h5")).toContainText("Processing Failed");
    }
    vars["ExecutionTypeDetails"] = await page.locator("//div[@aria-label=\"Execution Type Label\"]/..//h5").textContent() || '';
    vars["ExecutionTypeDetails"] = String(vars["ExecutionTypeDetails"]).trim();
    vars["OnlyExecution1"] = String(vars["ExecutionTypeDetails"]).substring(0, String(vars["ExecutionTypeDetails"]).length - 11);
    expect(String(vars["OnlyExecution1"])).toBe("SF");
    vars["LocktermFromDetails1"] = String(vars["ExecutionTypeDetails"]).substring(3, String(vars["ExecutionTypeDetails"]).length - 8);
    expect(String(vars["LocktermFromDetails1"])).toBe(vars["SelectedLockTermStandard"]);
    vars["OnlyExecution2"] = String(vars["ExecutionTypeDetails"]).substring(7, String(vars["ExecutionTypeDetails"]).length - 4);
    expect(String(vars["OnlyExecution2"])).toBe("CD");
    vars["LocktermFromDetails2"] = String(vars["ExecutionTypeDetails"]).substring(10, String(vars["ExecutionTypeDetails"]).length - 1);
    expect(String(vars["LocktermFromDetails2"])).toBe(vars["SelectedLockTermChase"]);
    vars["BidValueTableHeader1"] = await page.locator("//h5[@aria-labelledby=\"bidValueLabel\"]").textContent() || '';
    vars["BidValueTableHeader2"] = await page.locator("(//h5[@aria-labelledby=\"bidValueLabel\"])[2]").textContent() || '';
    vars["ExpectedParsedBidValue"] = (parseFloat(String(vars["BidValueTableHeader1"])) + parseFloat(String(vars["BidValueTableHeader2"]))).toFixed(0);
    vars["ExpectedParsedBidValue"] = (parseFloat(String(vars["ExpectedParsedBidValue"])) / parseFloat(String("1000000"))).toFixed(2);
    vars["TotalLoansHeader1"] = await page.locator("(//h5[@aria-labelledby=\"totalLoanRowsLabel\"]//span[contains(@aria-label,\"Total Loans\")])[1]").textContent() || '';
    vars["TotalLoansHeader2"] = await page.locator("(//h5[@aria-labelledby=\"totalLoanRowsLabel\"]//span[contains(@aria-label,\"Total Loans\")])[2]").textContent() || '';
    vars["ExpectedParsedTotalLoans"] = (parseFloat(String(vars["TotalLoansHeader1"])) + parseFloat(String(vars["TotalLoansHeader2"]))).toFixed(0);
    vars["SuccessLoansHeader1"] = await page.locator("(//h5[@aria-labelledby=\"totalLoanRowsLabel\"]//span[contains(@aria-label,\"Successful Loans\")])[1]").textContent() || '';
    vars["SuccessLoansHeader2"] = await page.locator("(//h5[@aria-labelledby=\"totalLoanRowsLabel\"]//span[contains(@aria-label,\"Successful Loans\")])[2]").textContent() || '';
    vars["ExpectedParsedSuccessLoans"] = (parseFloat(String(vars["SuccessLoansHeader1"])) + parseFloat(String(vars["SuccessLoansHeader2"]))).toFixed(0);
    vars["ErroredLoansHeader1"] = await page.locator("(//h5[@aria-labelledby=\"totalLoanRowsLabel\"]//span[contains(@aria-label,\"Errored Loans\")])[1]").textContent() || '';
    vars["ErroredLoansHeader2"] = await page.locator("(//h5[@aria-labelledby=\"totalLoanRowsLabel\"]//span[contains(@aria-label,\"Errored Loans\")])[2]").textContent() || '';
    vars["ExpectedParsedErroredLoans"] = (parseFloat(String(vars["ErroredLoansHeader1"])) + parseFloat(String(vars["ErroredLoansHeader2"]))).toFixed(0);
    await expect(page.locator("(//h5[@aria-label=\"Total Loan Rows\"]//span[contains(@aria-label,\"Total Loans\")])")).toContainText(vars["ExpectedParsedTotalLoans"]);
    await expect(page.locator("(//h5[@aria-label=\"Total Loan Rows\"]//span[contains(@aria-label,\"Successful Loans\")])")).toContainText(vars["ExpectedParsedSuccessLoans"]);
    await expect(page.locator("(//h5[@aria-label=\"Total Loan Rows\"]//span[contains(@aria-label,\"Errored Loans\")])")).toContainText(vars["ExpectedParsedErroredLoans"]);
    // [DISABLED] Verify that the element Bid Value parsed row displays text contains ExpectedParsedBidValue and With Scrollable TRUE
    // await expect(page.locator("//div[text()=\"Total Bid Value\"]/..//h5")).toContainText(vars["ExpectedParsedBidValue"]);
    // [DISABLED] Store text from the element LoansDataTableHeader into a variable LoansTableHeader
    // vars["LoansTableHeader"] = await page.locator("//h5[@aria-labelledby=\"totalLoanRowsLabel\"]").textContent() || '';
    // [DISABLED] Trim white space from LoansTableHeader and store it in a runtime LoansTableHeader
    // vars["LoansTableHeader"] = String(vars["LoansTableHeader"]).trim();
    // [DISABLED] Store text from the element LoansDataParsedRow into a variable LoansDataParsedRow
    // vars["LoansDataParsedRow"] = await page.locator("//h5[@aria-label=\"Total Loan Rows\"]").textContent() || '';
    // [DISABLED] Trim white space from LoansDataParsedRow and store it in a runtime LoansDataParsedRow
    // vars["LoansDataParsedRow"] = String(vars["LoansDataParsedRow"]).trim();
    // [DISABLED] Verify if LoansDataParsedRow contains LoansTableHeader
    // expect(String(vars["LoansDataParsedRow"])).toBe(vars["LoansTableHeader"]);
    // [DISABLED] Verify that the element Footer Submission Date displays text contains CurrentESTDate and With Scrollable TRUE
    // await expect(page.locator("//div[@id=\"page-footer\"]//span[@class=\"d-block\"]")).toContainText(vars["CurrentESTDate"]);
    // [DISABLED] Verify that the element Footer Submission Date displays text contains CurrentEstHourMin and With Scrollable TRUE
    // await expect(page.locator("//div[@id=\"page-footer\"]//span[@class=\"d-block\"]")).toContainText(vars["CurrentEstHourMin"]);
    // [DISABLED] Verify that the element Footer Submission Date displays text contains CurrentEstTimeUnit and With Scrollable TRUE
    // await expect(page.locator("//div[@id=\"page-footer\"]//span[@class=\"d-block\"]")).toContainText(vars["CurrentEstTimeUnit"]);
    // [DISABLED] Verify that the element Footer Queued For Date displays text contains CurrentESTDate and With Scrollable TRUE
    // await expect(page.locator("//div[@id=\"page-footer\"]//span[contains(text(),\"Queued For\")]")).toContainText(vars["CurrentESTDate"]);
    // [DISABLED] Adjust EST by Subtracting Minutes hh:mm a BufferTime into SelectedBatchTime
    // vars[""] = (() => {
    //   const d = new Date('2000-01-01 ' + String(''));
    //   d.setMinutes(d.getMinutes() - parseInt(String('')));
    //   return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    // })();
    // [DISABLED] Verify that the element Footer Queued For Date displays text contains SelectedBatchTime and With Scrollable TRUE
    // await expect(page.locator("//div[@id=\"page-footer\"]//span[contains(text(),\"Queued For\")]")).toContainText(vars["SelectedBatchTime"]);
  });
});
