import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';
import * as excelHelper from '../../../src/helpers/excel-helpers';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS15_TC03_Upload a bid with both execution types standard and chase and verify the values present in the accordian table', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Deleting_Early_Config_Report_If_Present(page, vars);
    await stepGroups.stepGroup_Navigating_to_Upload_New_Bid_Request(page, vars);
    await stepGroups.stepGroup_Uploading_Bid_Request_By_Selecting_both_standard_and_chase_t(page, vars);
    if (true) /* Element Second Enabled Time is visible */ {
      await stepGroups.stepGroup_Selecting_Second_Enabled_Batch_Time_If_the_Condition_is_fail(page, vars);
      // [DISABLED] Scroll to the element Enabled Time New into view
      // await page.locator("(//option[@aria-disabled=\"false\"])").scrollIntoViewIfNeeded();
      // [DISABLED] Click on Enabled Time New
      // await page.locator("(//option[@aria-disabled=\"false\"])").click();
    } else {
      await stepGroups.stepGroup_Navigating_to_Bulk_Batch_Timing(page, vars);
      await stepGroups.stepGroup_Modifying_The_Batch_Intervals_For_one_Hour_Prior(page, vars);
      await stepGroups.stepGroup_Navigating_to_Upload_New_Bid_Request(page, vars);
      await stepGroups.stepGroup_Uploading_Bid_Request_By_Selecting_both_standard_and_chase_t(page, vars);
      await stepGroups.stepGroup_Selecting_Second_Enabled_Batch_Time_If_the_Condition_is_fail(page, vars);
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
    await page.locator("(//input[@type=\"file\"])[1]").setInputFiles(path.resolve(__dirname, 'test-data', "Bid_file_success_error.xlsx,Bid_file_success_error.xlsx"));
    vars["LoanNumberFromExcel"] = excelHelper.readCell(path.resolve(__dirname, 'test-data', "Bid_file_success_error.xlsx,Bid_file_success_error.xlsx"), "2", "1");
    await expect(page.locator("//span[text()[normalize-space() = \"Upload Bid\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Upload Bid\"]]").click();
    await page.locator("//div[@class=\"modal-header\"]/div/h5").waitFor({ state: 'visible' });
    await expect(page.locator("//div[@class=\"modal-header\"]/div/h5")).toContainText("Bid Upload Progress");
    await page.locator("//span[text()=\"Continue\"]/..").waitFor({ state: 'visible' });
    await expect(page.locator("//span[text()=\"Continue\"]/..")).toBeVisible();
    await expect(page.locator("(//td[@data-title=\"Status\"]//span)[position() >=1 and position() <=5]")).toContainText("Success");
    await page.locator("//span[text()=\"Continue\"]/..").click();
    await expect(page.locator("(//div[text()=\" Execution Type \"]/..//h5)[1]")).toContainText("Standard Flow Loans");
    vars["TotalLoanAmountsCountTable1"] = String(await page.locator("(//table)[1]//td[@data-title=\"Loan Amount\"]").count());
    vars["count"] = "1";
    vars["TotalLoanAmountFromRows"] = "0";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["TotalLoanAmountsCountTable1"]))) {
      vars["IndividualLoanAmount"] = await page.locator("(//td[@data-title=\"Loan Amount\"])[$|count|]").textContent() || '';
      vars["TotalLoanAmountFromRows"] = (parseFloat(String(vars["IndividualLoanAmount"])) + parseFloat(String(vars["TotalLoanAmountFromRows"]))).toFixed(0);
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    vars["BidValueFromTableHeader1"] = await page.locator("//h5[@aria-labelledby=\"bidValueLabel\"]").textContent() || '';
    vars["amount1"] = String(vars["BidValueFromTableHeader1"]).split(",")["1"] || '';
    vars["amount2"] = String(vars["BidValueFromTableHeader1"]).split(",")["2"] || '';
    vars["BidValueFromTableHeader1"] = String(vars["amount1"]) + String(vars["amount2"]);
    vars["TotalLoanAmountFromRows"] = String("$") + String(vars["TotalLoanAmountFromRows"]);
    expect(String(vars["BidValueFromTableHeader1"])).toBe(vars["TotalLoanAmountFromRows"]);
    vars["TotalLoansCountRows"] = String(await page.locator("(//table)[1]//td[@data-title=\"Loan Status\"]").count());
    if (true) /* Element Success Loans Header 1 is visible */ {
      vars["SuccessLoansCountRows"] = String(await page.locator("(//table)[1]//td[@data-title=\"Loan Status\"]//*[text()=\" Success \"]").count());
    } else {
      vars["SuccessLoansCountRows"] = "0";
    }
    if (true) /* Element Errored Loans Count from Rows is visible */ {
      vars["ErroredLoansCountRows"] = String(await page.locator("(//table)[1]//td[@data-title=\"Loan Status\"]//*[text()=\" Error \"]").count());
    } else {
      vars["ErroredLoansCountRows"] = "0";
    }
    await expect(page.locator("(//h5[@aria-labelledby=\"totalLoanRowsLabel\"]//span[contains(@aria-label,\"Total Loans\")])[1]")).toContainText(vars["TotalLoansCountRows"]);
    await expect(page.locator("(//h5[@aria-labelledby=\"totalLoanRowsLabel\"]//span[contains(@aria-label,\"Successful Loans\")])[1]")).toContainText(vars["SuccessLoansCountRows"]);
    await expect(page.locator("(//h5[@aria-labelledby=\"totalLoanRowsLabel\"]//span[contains(@aria-label,\"Errored Loans\")])[1]")).toContainText(vars["ErroredLoansCountRows"]);
    vars["TotalColumnCountExcel"] = String(excelHelper.getColumnCount("Bid_file_success_error.xlsx,Bid_file_success_error.xlsx", "0"));
    vars["count"] = "1";
    vars["ColumnCountExcel"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["TotalColumnCountExcel"]))) {
      await page.locator("//div[@aria-label=\"Request ID Label\"]/..//h5").click();
      vars["ColumnHeaderExcel"] = excelHelper.readCell(path.resolve(__dirname, 'test-data', "Bid_file_success_error.xlsx,Bid_file_success_error.xlsx"), "1", vars["ColumnCountExcel"]);
      if (String("Correspondent Loan Number , Borrower Last Name , Original Loan Amount , Product Code").includes(String(vars["ColumnHeaderExcel"]))) {
        if (String(vars["ColumnHeaderExcel"]).includes(String("Correspondent Loan Number"))) {
          vars["ColumnHeaderUI"] = "Corr. Loan#";
        } else if (String(vars["ColumnHeaderExcel"]).includes(String("Borrower Last Name"))) {
          vars["ColumnHeaderUI"] = "Last Name";
        } else if (String(vars["ColumnHeaderExcel"]).includes(String("Original Loan Amount"))) {
          vars["ColumnHeaderUI"] = "Loan Amount";
        } else {
          vars["ColumnHeaderUI"] = "Program";
        }
        vars["RowsCountTable"] = String(await page.locator("(//table)[1]//tbody//tr").count());
        vars["RowCountExcel"] = "2";
        while (parseFloat(String(vars["RowsCountTable"])) >= parseFloat(String("1"))) {
          await page.locator("//div[@aria-label=\"Request ID Label\"]/..//h5").click();
          vars["CellDataTable"] = await page.locator("(//td[@data-title=\"$|ColumnHeaderUI|\"])[$|RowsCountTable|]").textContent() || '';
          vars["CellDataExcel"] = excelHelper.readCell(path.resolve(__dirname, 'test-data', "Bid_file_success_error.xlsx,Bid_file_success_error.xlsx"), vars["RowCountExcel"], vars["ColumnCountExcel"]);
          if (String(vars["ColumnHeaderUI"]) === String("Loan Amount")) {
            vars["CellDataExcel"] = parseFloat(String(vars["CellDataExcel"])).toFixed(0);
            vars["CellDataTable"] = String(vars["CellDataTable"]).trim();
            vars["amount1"] = String(vars["CellDataTable"]).split(",")["1"] || '';
            vars["amount2"] = String(vars["CellDataTable"]).split(",")["2"] || '';
            vars["CellDataTable"] = String(vars["amount1"]) + String(vars["amount2"]);
            vars["CellDataExcel"] = String("$") + String(vars["CellDataExcel"]);
            expect(String(vars["CellDataTable"])).toBe(vars["CellDataExcel"]);
          } else {
            expect(String(vars["CellDataTable"])).toBe(vars["CellDataExcel"]);
          }
          vars["RowCountExcel"] = (parseFloat(String("1")) + parseFloat(String(vars["RowCountExcel"]))).toFixed(0);
          vars["RowsCountTable"] = (parseFloat(String(vars["RowsCountTable"])) - parseFloat(String("1"))).toFixed(0);
        }
      }
      vars["ColumnCountExcel"] = (parseFloat(String("1")) + parseFloat(String(vars["ColumnCountExcel"]))).toFixed(0);
      if (String(vars["ColumnHeaderExcel"]).includes(String("Product Code"))) {
        break;
      }
    }
    await page.locator("//div[@aria-label=\"Request ID Label\"]/..//h5").click();
    await stepGroups.stepGroup_Verifying_the_second_accordian_table_from_excel_to_UI_In_bid(page, vars);
  });
});
