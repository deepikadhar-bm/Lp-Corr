import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';
import * as excelHelper from '../../../src/helpers/excel-helpers';

test.describe('Commitment List - TS_1', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS16_TC01_Verify the download file action and it should contain the all loans and locked loans information as present in the UI', async ({ page }) => {
    // Set up download handler
    page.on('download', async (download) => {
      const filePath = path.join('test-results', 'downloads', download.suggestedFilename());
      await download.saveAs(filePath);
      vars['_lastDownloadPath'] = filePath;
    });

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["BidReqId"] = await page.locator("//td[@data-title=\"Bid Request ID\"]").textContent() || '';
    vars["BidReqId"] = String(vars["BidReqId"]).trim();
    await page.locator("//td[@data-title=\"Comm. ID\"]//a[contains(@aria-label,\"View details for commitment\")]").click();
    await page.locator("//div[text()[normalize-space() = \"Total Loans\"]]").waitFor({ state: 'visible' });
    await page.locator("//div[text()[normalize-space() = \"Total Loans\"]]").click();
    await page.locator("//a[normalize-space(text())=\"Download File\"]").waitFor({ state: 'visible' });
    await page.locator("//a[normalize-space(text())=\"Download File\"]").click();
    vars["space"] = "key_blank";
    vars["DateAndTimeFormat"] = "MM/dd/yyyy" + vars["space"] + "HH:mm";
    vars["CurrentDateAndTime"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC-05:00" };
      const fmt = "DateAndTimeFormat";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    vars["ExpectedReportGenTime"] = vars["CurrentDateAndTime"] + vars["space"] + "ET";
    vars[""] = vars['_lastDownloadPath'] ? require('path').basename(vars['_lastDownloadPath']) : '';
    vars["ExpectedDownloadedFileName"] = "Price_Offer_details_" + vars["BidReqId"];
    expect(String(vars["ActualDownloadedFileName"])).toBe(vars["ExpectedDownloadedFileName"]);
    vars["RecentDownloadedFilePath"] = vars['_lastDownloadPath'] || '';
    vars["TotalLoansRowsCountUI"] = String(await page.locator("//tr[@role=\"row\"]").count());
    vars["AllLoansRowsCountExcel"] = String(excelHelper.getRowCount(vars["RecentDownloadedFilePath"], "0"));
    expect(String(vars["TotalLoansRowsCountUI"])).toBe(vars["AllLoansRowsCountExcel"]);
    vars["HeaderNamesAllLoansExcel"] = excelHelper.readRow(vars['_lastDownloadPath'] || '', "0", "1");
    vars["HeaderNamesAllLoansExcel"] = String(vars["HeaderNamesAllLoansExcel"]).replace(/\./g, '');
    vars["CountofHeaderNamesUI"] = String(await page.locator("(//div[contains(@aria-label,\"Sort by\")])[position() != 2 and position() != 10]").count());
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["CountofHeaderNamesUI"]))) {
      vars["IndividualHeaderNameTotalLoansUI"] = await page.locator("((//div[contains(@aria-label,\"Sort by\")])[position() != 2 and position() != 10])[$|count|]").textContent() || '';
      if (String(vars["IndividualHeaderNameTotalLoansUI"]).includes(String("."))) {
        vars["IndividualHeaderNameTotalLoansUI"] = String(vars["IndividualHeaderNameTotalLoansUI"]).replace(/\./g, '');
      }
      vars["IndividualHeaderNameTotalLoansUI"] = String(vars["IndividualHeaderNameTotalLoansUI"]).trim();
      vars["IndividualHeaderNameAllLoansExcel"] = String(vars["HeaderNamesAllLoansExcel"]).split(",")[parseInt(String(vars["count"]))] || '';
      vars["IndividualHeaderNameAllLoansExcel"] = String(vars["IndividualHeaderNameAllLoansExcel"]).trim();
      if (String(vars["IndividualHeaderNameTotalLoansUI"]) === String("LoanAmount")) {
        expect(String(vars["IndividualHeaderNameAllLoansExcel"])).toBe("LoanAmt");
      } else {
        expect(String(vars["IndividualHeaderNameTotalLoansUI"])).toBe(vars["IndividualHeaderNameAllLoansExcel"]);
      }
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    vars["TotalRowsCountUITotalLoans"] = String(await page.locator("//tbody//tr[@role=\"row\"]").count());
    await page.locator("//div[@aria-label=\"Sort by Last Name\"]").click();
    await page.locator("//div[contains(text(),\"Last Name\")]//following::span[contains(@class,\"fas small px-1 fa-sort-down\")]").waitFor({ state: 'visible' });
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["TotalRowsCountUITotalLoans"]))) {
      vars["EntireRowDataAllLoansExcel"] = excelHelper.readRow(vars['_lastDownloadPath'] || '', vars["count"], "1");
      await page.locator("//div[text()=\"Bid Req. ID\"]//following-sibling::h5").click();
      vars["ColumnCountUITotalLoans"] = String(await page.locator("(//table[@role='table']//tbody//tr[$|count|]//td[@data-title][position() > 2 and position() != 4 and position() != 12])").count());
      vars["Count"] = "1";
      while (parseFloat(String(vars["Count"])) <= parseFloat(String(vars["ColumnCountUITotalLoans"]))) {
        vars["IndividualCellDataTotalLoansUI"] = await page.locator("(//table[@role='table']//tbody//tr[$|count|]//td[@data-title][position() >2 and position()!= 4and  position()!= 12])[$|Count|]").textContent() || '';
        if (String(vars["IndividualCellDataTotalLoansUI"]).includes(String("$"))) {
          vars["IndividualCellDataTotalLoansUI"] = String(vars["IndividualCellDataTotalLoansUI"]).replace(/\$\,/g, '');
        } else if (String(vars["IndividualCellDataTotalLoansUI"]).includes(String("| PQ | PS"))) {
          vars["IndividualCellDataTotalLoansUI"] = String(vars["IndividualCellDataTotalLoansUI"]).substring(0, String(vars["IndividualCellDataTotalLoansUI"]).length - 10);
        } else if (String(vars["IndividualCellDataTotalLoansUI"]).includes(String("%"))) {
          vars["IndividualCellDataTotalLoansUI"] = String(vars["IndividualCellDataTotalLoansUI"]).replace(/%/g, '');
        }
        vars["IndividualCellDataTotalLoansUI"] = String(vars["IndividualCellDataTotalLoansUI"]).trim();
        vars["IndividualRowDataAllLoansExcel"] = String(vars["EntireRowDataAllLoansExcel"]).split(",")[parseInt(String(vars["Count"]))] || '';
        expect(String(vars["IndividualCellDataTotalLoansUI"])).toBe(vars["IndividualRowDataAllLoansExcel"]);
        vars["Count"] = (parseFloat(String("1")) + parseFloat(String(vars["Count"]))).toFixed(0);
      }
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    await stepGroups.stepGroup_Verifying_Header_Names_From_UI_to_ExcelCommitment_List(page, vars);
    await stepGroups.stepGroup_Verifying_Locked_Loans_Data_UI_to_ExcelCommitment_List(page, vars);
    vars["EntireRowDataExcelMetaInfo1"] = excelHelper.readRow(vars['_lastDownloadPath'] || '', "0", "3");
    vars["BidReqNumTextExcelMetaInfo"] = String(vars["EntireRowDataExcelMetaInfo1"]).split(",")["1"] || '';
    expect(String(vars["BidReqNumTextExcelMetaInfo"])).toBe("BID REQUEST NUMBER");
    vars["BidReqIdExcelMetaInfo"] = String(vars["EntireRowDataExcelMetaInfo1"]).split(",")["2"] || '';
    expect(String(vars["BidReqIdExcelMetaInfo"])).toBe(vars["BidReqId"]);
    vars["EntireRowDataExcelMetaInfo2"] = excelHelper.readRow(vars['_lastDownloadPath'] || '', "1", "3");
    vars["ReportGenerationTextExcelMetaInfo"] = String(vars["EntireRowDataExcelMetaInfo2"]).split(",")["1"] || '';
    expect(String(vars["ReportGenerationTextExcelMetaInfo"])).toBe("REPORT GENERATION TIME");
    vars["ReportGenTimeExcelMetaInfo"] = String(vars["EntireRowDataExcelMetaInfo2"]).split(",")["2"] || '';
    expect(String(vars["ExpectedReportGenTime"])).toBe(vars["ReportGenTimeExcelMetaInfo"]);
  });
});
