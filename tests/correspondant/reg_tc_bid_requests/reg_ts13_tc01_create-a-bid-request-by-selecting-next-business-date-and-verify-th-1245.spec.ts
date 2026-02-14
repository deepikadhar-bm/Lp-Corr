import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';
import * as excelHelper from '../../../src/helpers/excel-helpers';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS13_TC01_Create a bid request by selecting next business date and verify the uploaded should be current date, but the requested date should be the next buisness day\\\'s date. and also verify other', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Deleting_Early_Config_Report_If_Present(page, vars);
    await stepGroups.stepGroup_Navigating_to_Upload_New_Bid_Request(page, vars);
    await stepGroups.stepGroup_Uploading_Bid_Request_For_Next_Buisiness_day(page, vars);
    if (true) /* Element Second Enabled Time is visible */ {
      await stepGroups.stepGroup_Selecting_Second_Enabled_Batch_Time_If_the_Condition_is_fail(page, vars);
      // [DISABLED] Scroll to the element Enabled Date into view
      // await page.locator("//option[@aria-disabled=\"false\"]").scrollIntoViewIfNeeded();
      // [DISABLED] Click on Enabled Date
      // await page.locator("//option[@aria-disabled=\"false\"]").click();
    } else {
      await stepGroups.stepGroup_Navigating_to_Bulk_Batch_Timing(page, vars);
      // [DISABLED] Modifying The Batch Intervals For Next bussiness day with one hour prior
      // await stepGroups.stepGroup_Modifying_The_Batch_Intervals_For_Next_bussiness_day_with_on(page, vars);
      await stepGroups.stepGroup_Modifying_Batch_Intervals_For_next_bussiness_day(page, vars);
      await stepGroups.stepGroup_Navigating_to_Upload_New_Bid_Request(page, vars);
      await stepGroups.stepGroup_Uploading_Bid_Request_For_Next_Buisiness_day(page, vars);
      await stepGroups.stepGroup_Selecting_Second_Enabled_Batch_Time_If_the_Condition_is_fail(page, vars);
      // [DISABLED] Scroll to the element Enabled Date into view
      // await page.locator("//option[@aria-disabled=\"false\"]").scrollIntoViewIfNeeded();
      // [DISABLED] Click on Enabled Date
      // await page.locator("//option[@aria-disabled=\"false\"]").click();
    }
    await page.locator("(//input[@type=\"file\"])[1]").setInputFiles(path.resolve(__dirname, 'test-data', "Eligibility_check.xlsx,Eligibility_check.xlsx"));
    vars["LoanNumberFromExcel"] = excelHelper.readCell(path.resolve(__dirname, 'test-data', "Eligibility_check.xlsx,Eligibility_check.xlsx"), "2", "1");
    await expect(page.locator("//span[text()[normalize-space() = \"Upload Bid\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Upload Bid\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.getByText("Bid Upload Progress").waitFor({ state: 'visible' });
    await page.locator("//span[text()=\"Continue\"]/..").waitFor({ state: 'visible' });
    await page.locator("//span[text()=\"Continue\"]/..").click();
    // [DISABLED] Store text from the element Errors Column into a variable ErrorColumnData
    // vars["ErrorColumnData"] = await page.locator("(//td[@data-title=\"Errors\"]//div)[last()]").textContent() || '';
    if (true) /* Verify if Eligibility Check(Error Column) contains ErrorColu */ {
    } else {
      // [DISABLED] Mouseover the element Errors Column
      // await page.locator("(//td[@data-title=\"Errors\"]//div)[last()]").hover();
      // [DISABLED] Verify that the current page displays an element Error Column Popup1 and With Scrollable TRUE
      // await expect(page.locator("//div[text()=\"Eligibility\"]/..//div[@class=\"text-secondary\"]")).toBeVisible();
      // [DISABLED] Verify that the element Error Column Popup1 displays text contains Eligibility Check(Error Column) and With Scrollable TRUE
      // await expect(page.locator("//div[text()=\"Eligibility\"]/..//div[@class=\"text-secondary\"]")).toContainText(testData["Eligibility Check(Error Column)"]);
    }
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["NextBusinessDate"] = await page.locator("//span[contains(text(),\"Queued For:\")]").textContent() || '';
    vars["NextBusinessDate"] = String(vars["NextBusinessDate"]).substring(11);
    // [DISABLED] Split string NextBusinessDate using : and store the 1 into a NextBusinessDate
    // vars["NextBusinessDate"] = String('').split(":")["1"] || '';
    // [DISABLED] Add minute minutes to the input-datetime with input-datetime-format , convert to output-datetime-format format, and store it in a runtime variable variable-name
    // vars["variable-name"] = (() => {
    //   const d = new Date('2000-01-01 ' + String("input-datetime"));
    //   d.setMinutes(d.getMinutes() + parseInt(String("minute")));
    //   return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }); // Format: output-datetime-format
    // })();
    vars["NextBusinessDate"] = String(vars["NextBusinessDate"]).replace(/ET/g, '');
    vars["NextBusinessDate"] = String(vars["NextBusinessDate"]).trim();
    vars[""] = (() => {
      const d = new Date(String(''));
      d.setMinutes(d.getMinutes() + parseInt(String('')));
      return d.toLocaleString('en-US');
    })();
    vars["NextBusinessDate"] = (() => {
      const d = new Date(String(vars["NextBusinessDate"]));
      const _p = { yyyy: String(d.getFullYear()), yy: String(d.getFullYear()).slice(-2), MM: String(d.getMonth()+1).padStart(2,'0'), M: String(d.getMonth()+1), dd: String(d.getDate()).padStart(2,'0'), d: String(d.getDate()), HH: String(d.getHours()).padStart(2,'0'), hh: String(d.getHours()%12||12).toString().padStart(2,'0'), h: String(d.getHours()%12||12), mm: String(d.getMinutes()).padStart(2,'0'), ss: String(d.getSeconds()).padStart(2,'0'), a: d.getHours() >= 12 ? 'PM' : 'AM' };
      return "MM/dd/yyyy".replace('yyyy',_p.yyyy).replace('yy',_p.yy).replace('MM',_p.MM).replace('dd',_p.dd).replace('HH',_p.HH).replace('hh',_p.hh).replace('mm',_p.mm).replace('ss',_p.ss).replace(/a/g,_p.a).replace(/M(?!M)/g,_p.M).replace(/d(?!d)/g,_p.d).replace(/h(?!h)/g,_p.h);
    })();
    vars["CCodeValuesFromDetails"] = await page.locator("//div[text()=\"CCode\"]/..//h5").textContent() || '';
    vars["CompanyValueFromDetails"] = await page.locator("//div[text()=\"Company\"]/..//h5").textContent() || '';
    vars["RequestIDDetails"] = await page.locator("//div[text()=\"Request ID\"]/..//h5").textContent() || '';
    vars["RequestIDDetails"] = String(vars["RequestIDDetails"]).trim();
    vars["BidStatusFromDetails"] = await page.locator("//div[text()=\"Status\"]/..//h5").textContent() || '';
    vars["BidValueFromDetails"] = await page.locator("//div[text()=\"Total Bid Value\"]/..//h5").textContent() || '';
    vars["ExecutionTypeFromDetailsTable1"] = await page.locator("(//div[text()=\" Execution Type \"]/..//h5)[1]").textContent() || '';
    vars["ExecutionTypeFromDetailsTable2"] = await page.locator("(//div[text()=\" Execution Type \"]/..//h5)[2]").textContent() || '';
    vars["TotalLoansDetails"] = await page.locator("//div[@aria-label=\"Total Loan Rows Label\"]/..//span[contains(@aria-label,\"Total Loans\")]").textContent() || '';
    vars["ErroredLoansDetails"] = await page.locator("//div[@aria-label=\"Total Loan Rows Label\"]/..//span[contains(@aria-label,\"Errored Loans\")]").textContent() || '';
    await page.locator("//a[@href=\"#/bid-requests\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//button[contains(text(),\"$|RequestIDDetails|\")]/../..//td[@data-title=\"CCode\"]")).toContainText(vars["CCodeValuesFromDetails"]);
    await expect(page.locator("//button[contains(text(),\"$|RequestIDDetails|\")]/../..//td[@data-title=\"Bid Req. ID\"]")).toContainText(vars["RequestIDDetails"]);
    await expect(page.locator("//button[contains(text(),\"$|RequestIDDetails|\")]/../..//td[@data-title=\"Company\"]")).toContainText(vars["CompanyValueFromDetails"]);
    await expect(page.locator("//button[contains(text(),\"$|RequestIDDetails|\")]/../..//td[@data-title=\"Bid Value\"]")).toContainText(vars["BidValueFromDetails"]);
    vars["LoansErrorsCount"] = await page.locator("//button[contains(text(),\"$|RequestIDDetails|\")]/../..//td[@data-title=\"#Loans / #Errors\"]").textContent() || '';
    vars["TotalLoansList"] = String(vars["LoansErrorsCount"]).split("/")["1"] || '';
    vars["ErroredLoanList"] = String(vars["LoansErrorsCount"]).split("/")["2"] || '';
    expect(String(vars["TotalLoansDetails"])).toBe(vars["TotalLoansList"]);
    expect(String(vars["ErroredLoansDetails"])).toBe(vars["ErroredLoanList"]);
    vars["ExecutionTypeList"] = await page.locator("//button[contains(text(),\"$|RequestIDDetails|\")]/../..//td[@data-title=\"Execution Type\"]").textContent() || '';
    vars["ExecutionType1List"] = String(vars["ExecutionTypeList"]).split(",")["1"] || '';
    vars["ExecutionType2List"] = String(vars["ExecutionTypeList"]).split(",")["2"] || '';
    expect(String(vars["ExecutionTypeFromDetailsTable1"])).toBe(vars["ExecutionType1List"]);
    expect(String(vars["ExecutionTypeFromDetailsTable2"])).toBe(vars["ExecutionType2List"]);
    await expect(page.locator("//button[contains(text(),\"$|RequestIDDetails|\")]/../..//td[@data-title=\"Status\"]")).toContainText(vars["BidStatusFromDetails"]);
    vars["TodaysDate"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC" };
      const fmt = "MM/dd/yyyy";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    // [DISABLED] Getting Next Bussiness day by handling weekend
    // await stepGroups.stepGroup_Getting_Next_Bussiness_day_by_handling_weekend(page, vars);
    await expect(page.locator("//button[contains(text(),\"$|RequestIDDetails|\")]/../..//td[@data-title=\"Requested\"]")).toContainText(vars["NextBusinessDate"]);
    await expect(page.locator("//button[contains(text(),\"$|RequestIDDetails|\")]/../..//td[@data-title=\"Uploaded\"]")).toContainText(vars["TodaysDate"]);
  });
});
