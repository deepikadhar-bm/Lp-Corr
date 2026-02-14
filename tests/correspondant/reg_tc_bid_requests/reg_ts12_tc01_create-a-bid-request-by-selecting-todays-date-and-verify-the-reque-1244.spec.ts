import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';
import * as excelHelper from '../../../src/helpers/excel-helpers';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS12_TC01_Create a bid request by selecting today\\\'s date and verify the requested date and the uploaded data should be current date and also verify other fields.', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Deleting_Early_Config_Report_If_Present(page, vars);
    await stepGroups.stepGroup_Navigating_to_Upload_New_Bid_Request(page, vars);
    await stepGroups.stepGroup_Uploading_Bid_Request(page, vars);
    if (true) /* Element Second Enabled Time is visible */ {
      await stepGroups.stepGroup_Selecting_Second_Enabled_Batch_Time_If_the_Condition_is_fail(page, vars);
      // [DISABLED] Scroll to the element Enabled Date into view
      // await page.locator("//option[@aria-disabled=\"false\"]").scrollIntoViewIfNeeded();
      // [DISABLED] Click on Enabled Date
      // await page.locator("//option[@aria-disabled=\"false\"]").click();
    } else {
      await stepGroups.stepGroup_Navigating_to_Bulk_Batch_Timing(page, vars);
      await stepGroups.stepGroup_Modifying_batches_with_5_min_prior(page, vars);
      await stepGroups.stepGroup_Navigating_to_Upload_New_Bid_Request(page, vars);
      await stepGroups.stepGroup_Uploading_Bid_Request(page, vars);
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
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["CCodeValuesFromDetails"] = await page.locator("//div[text()=\"CCode\"]/..//h5").textContent() || '';
    vars["CompanyValueFromDetails"] = await page.locator("//div[text()=\"Company\"]/..//h5").textContent() || '';
    vars["RequestIDDetails"] = await page.locator("//div[text()=\"Request ID\"]/..//h5").textContent() || '';
    vars["RequestIDDetails"] = String(vars["RequestIDDetails"]).trim();
    vars["BidStatusFromDetails"] = await page.locator("//div[text()=\"Status\"]/..//h5").textContent() || '';
    vars["BidValueFromDetails"] = await page.locator("//div[text()=\"Total Bid Value\"]/..//h5").textContent() || '';
    vars["ExecutionTypeFromDetails"] = await page.locator("//div[text()=\" Execution Type \"]/..//h5").textContent() || '';
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
    expect(String(vars["ExecutionTypeFromDetails"])).toBe(vars["ExecutionTypeList"]);
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
    await expect(page.locator("//button[contains(text(),\"$|RequestIDDetails|\")]/../..//td[@data-title=\"Requested\"]")).toContainText(vars["TodaysDate"]);
    await expect(page.locator("//button[contains(text(),\"$|RequestIDDetails|\")]/../..//td[@data-title=\"Uploaded\"]")).toContainText(vars["TodaysDate"]);
  });
});
