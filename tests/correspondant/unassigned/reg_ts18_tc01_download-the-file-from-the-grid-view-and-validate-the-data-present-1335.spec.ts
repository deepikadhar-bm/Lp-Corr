import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';
import * as excelHelper from '../../../src/helpers/excel-helpers';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS18_TC01_Download the file from the grid view and validate the data present in the file', async ({ page }) => {
    // Set up download handler
    page.on('download', async (download) => {
      const filePath = path.join('test-results', 'downloads', download.suggestedFilename());
      await download.saveAs(filePath);
      vars['_lastDownloadPath'] = filePath;
    });

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//a[@href=\"#/bid-requests\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Filter\"]]").click();
    await page.locator("(//div[@class=\"d-flex\"]//div//button[@id=\"multiSelectDropDown\"])[last()]").click();
    await page.locator("(//div[@class=\"d-flex\"]//div//button[@id=\"multiSelectDropDown\"])[last()]//following::input[@placeholder=\"Search\"]").fill("Upload Expired");
    await page.locator("//span[text()=\"Upload Expired\"]//parent::div//preceding-sibling::input[@type=\"checkbox\"]").check();
    await page.locator("(//button[@aria-label=\"Apply selected items\"])[2]").waitFor({ state: 'visible' });
    await page.locator("(//button[@aria-label=\"Apply selected items\"])[2]").click();
    await page.locator("//div[contains(@class, \"justify-content-end\")]//button[text()=\"Apply Filters\"]").click();
    await page.locator("//td[@data-title=\"Status\"]//span[normalize-space(text())=\"Upload Expired\"]//ancestor::tr//td[@data-title=\"Bid Req. ID\"]").waitFor({ state: 'visible' });
    await page.locator("//td[@data-title=\"Status\"]//span[normalize-space(text())=\"Upload Expired\"]//ancestor::tr//td[@data-title=\"Bid Req. ID\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["BidReqIdUI"] = await page.locator("//div[text()=\"Request ID\"]//following-sibling::h5").textContent() || '';
    await page.locator("//div[@aria-label=\"Sort by Last Name\"]").click();
    await page.locator("//div[contains(text(),\"Last Name\")]//following::span[contains(@class,\"fas small px-1 fa-sort-down\")]").waitFor({ state: 'visible' });
    vars["TablesCount"] = String(await page.locator("//table[@role=\"table\"]").count());
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["TablesCount"]))) {
      await page.locator("(//button[@aria-label=\"Download Grid\"])[$|count|]").scrollIntoViewIfNeeded();
      await page.locator("(//button[@aria-label=\"Download Grid\"])[$|count|]").click();
      // Wait for download - handled by Playwright download events
      await page.waitForTimeout(2000);
      vars["space"] = "key_blank";
      vars["DateAndTimeFormat"] = "MM/dd/yyyy" + vars["space"] + "HH:mm";
      vars["CurrentEstDateAndTime"] = (() => {
        const d = new Date();
        const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC-05:00" };
        const fmt = "DateAndTimeFormat";
        // Map Java date format to Intl parts
        const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
        const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
        return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
      })();
      vars["ExpectedReportGenTime"] = vars["CurrentEstDateAndTime"] + vars["space"] + "ET";
      vars["ErrorLoansCountUI"] = String(await page.locator("((//table)[$|count|]//td[@data-title=\"Errors\"]//div[not(contains(text(),\"No errors\"))]//ancestor::tr//td[@data-title=\"Corr. Loan#\"])").count());
      vars["EntireHeadersDataExcel"] = excelHelper.readRow(vars['_lastDownloadPath'] || '', "0", "1");
      await page.locator("//h3[text()=\"Bid Request Details\"]").click();
      vars["HeadersCount"] = "1";
      while (parseFloat(String(vars["HeadersCount"])) <= parseFloat(String("5"))) {
        vars["IndividualHeaderNameExcel"] = String(vars["EntireHeadersDataExcel"]).split(",")[parseInt(String(vars["HeadersCount"]))] || '';
        vars["IndividualHeaderNameExcel"] = String(vars["IndividualHeaderNameExcel"]).trim();
        vars["IndividualHeaderNameUI"] = await page.locator("(((//table)[$|count|]//div[contains(@aria-label,\"Sort by\")])[position()<=5])[$|HeadersCount|]").textContent() || '';
        if (String(vars["IndividualHeaderNameUI"]).includes(String("."))) {
          vars["IndividualHeaderNameUI"] = String(vars["IndividualHeaderNameUI"]).replace(/\./g, '');
        }
        vars["IndividualHeaderNameUI"] = String(vars["IndividualHeaderNameUI"]).trim();
        expect(String(vars["IndividualHeaderNameUI"])).toBe(vars["IndividualHeaderNameExcel"]);
        vars["HeadersCount"] = (parseFloat(String(vars["HeadersCount"])) + parseFloat(String("1"))).toFixed(0);
      }
      vars["TotalRowsCountUI"] = String(await page.locator("(//table)[$|count|]//tbody[@role=\"rowgroup\"]//tr[@role=\"row\"]").count());
      vars["RowsCount"] = "1";
      while (parseFloat(String(vars["RowsCount"])) <= parseFloat(String(vars["TotalRowsCountUI"]))) {
        vars["ColumnCount"] = "1";
        vars["EntireRowDataGeneralViewExcel"] = excelHelper.readRow(vars['_lastDownloadPath'] || '', vars["RowsCount"], "1");
        await page.locator("//h3[text()=\"Bid Request Details\"]").click();
        while (parseFloat(String(vars["ColumnCount"])) <= parseFloat(String("5"))) {
          vars["IndividualColumnDataUI"] = await page.locator("((//table)[$|count|]//tbody//tr[$|RowsCount|]//td[position()<=5])[$|ColumnCount|]").textContent() || '';
          if (String(vars["IndividualColumnDataUI"]).includes(String("$"))) {
            vars["IndividualColumnDataUI"] = String(vars["IndividualColumnDataUI"]).replace(/\$\,/g, '');
          } else if (String(vars["IndividualColumnDataUI"]).includes(String("| PQ | PS"))) {
            vars["IndividualColumnDataUI"] = String('').split("|")["0"] || '';
          }
          vars["IndividualColumnDataUI"] = String(vars["IndividualColumnDataUI"]).trim();
          vars["IndiualGeneralViewDataExcel"] = String(vars["EntireRowDataGeneralViewExcel"]).split(",")[parseInt(String(vars["ColumnCount"]))] || '';
          expect(String(vars["IndividualColumnDataUI"])).toBe(vars["IndiualGeneralViewDataExcel"]);
          vars["ColumnCount"] = (parseFloat(String(vars["ColumnCount"])) + parseFloat(String("1"))).toFixed(0);
        }
        vars["RowsCount"] = (parseFloat(String(vars["RowsCount"])) + parseFloat(String("1"))).toFixed(0);
      }
      vars["count1"] = "1";
      vars["EntireHeadersErrorsDetailsExcel"] = excelHelper.readRow(vars['_lastDownloadPath'] || '', "0", "2");
      vars["IndividualHeaderNameErrordDetailsExcel"] = String(vars["EntireHeadersErrorsDetailsExcel"]).split(",")["1"] || '';
      expect(String(vars["IndividualHeaderNameErrordDetailsExcel"])).toBe("Corr Loan #");
      vars["IndividualHeaderNameErrordDetailsExcel"] = String(vars["EntireHeadersErrorsDetailsExcel"]).split(",")["2"] || '';
      expect(String(vars["IndividualHeaderNameErrordDetailsExcel"])).toBe("Error");
      vars["IndividualHeaderNameErrordDetailsExcel"] = String(vars["EntireHeadersErrorsDetailsExcel"]).split(",")["3"] || '';
      expect(String(vars["IndividualHeaderNameErrordDetailsExcel"])).toBe("Error Details");
      while (parseFloat(String(vars["count1"])) <= parseFloat(String(vars["ErrorLoansCountUI"]))) {
        await page.locator("//h3[text()=\"Bid Request Details\"]").click();
        vars["IndividualLoanNum"] = await page.locator("((//table)[$|count|]//td[@data-title=\"Errors\"]//div[not(contains(text(),\"No errors\"))]//ancestor::tr//td[@data-title=\"Corr. Loan#\"])[$|count1|]").textContent() || '';
        vars["IndividualLoanNum"] = String('').split("|")["0"] || '';
        vars["IndividualLoanNum"] = String(vars["IndividualLoanNum"]).trim();
        await page.locator("(//table)[$|count|]//td[@data-title=\"Corr. Loan#\"]//button[text()=\"$|IndividualLoanNum|\"]//ancestor::tr//td[@data-title=\"Errors\"]//div[not(contains(text(),\"No errors\"))]\n").scrollIntoViewIfNeeded();
        await page.locator("(//table)[$|count|]//td[@data-title=\"Corr. Loan#\"]//button[text()=\"$|IndividualLoanNum|\"]//ancestor::tr//td[@data-title=\"Errors\"]//div[not(contains(text(),\"No errors\"))]\n").hover();
        vars["ErrorsCount"] = String(await page.locator("//div[@class=\"tooltip-inner\"]//div[@class=\"text-danger\"]").count());
        vars["count2"] = "1";
        while (parseFloat(String(vars["count2"])) <= parseFloat(String(vars["ErrorsCount"]))) {
          await page.locator("(//table)[$|count|]//td[@data-title=\"Corr. Loan#\"]//button[text()=\"$|IndividualLoanNum|\"]//ancestor::tr//td[@data-title=\"Errors\"]//div[not(contains(text(),\"No errors\"))]\n").hover();
          vars["DangerHeaderErrorText"] = await page.locator("(//div[@class=\"tooltip-inner\"]//div[@class=\"text-danger\"])[$|count2|]").textContent() || '';
          vars["ErrorTextBody"] = await page.locator("(//div[@class=\"tooltip-inner\"]//div[@class=\"text-secondary\"])[$|count2|]").textContent() || '';
          vars["EntireRowDataErrorDetailsExcel"] = excelHelper.readRow(vars['_lastDownloadPath'] || '', vars["count2"], "2");
          vars["COUNT3"] = "1";
          while (parseFloat(String(vars["COUNT3"])) <= parseFloat(String("3"))) {
            vars["IndividualRowDataErrorDetailsExcel"] = String(vars["EntireRowDataErrorDetailsExcel"]).split(",")[parseInt(String(vars["COUNT3"]))] || '';
            if (String(vars["IndividualLoanNum"]) === String(vars["IndividualRowDataErrorDetailsExcel"])) {
            } else if (String(vars["DangerHeaderErrorText"]) === String(vars["IndividualRowDataErrorDetailsExcel"])) {
            } else if (String(vars["ErrorTextBody"]) === String(vars["IndividualRowDataErrorDetailsExcel"])) {
            }
            vars["COUNT3"] = (parseFloat(String(vars["COUNT3"])) + parseFloat(String("1"))).toFixed(0);
          }
          vars["count2"] = (parseFloat(String(vars["count2"])) + parseFloat(String("1"))).toFixed(0);
        }
        vars["count1"] = (parseFloat(String(vars["count1"])) + parseFloat(String("1"))).toFixed(0);
      }
      vars["EntireRowDataExcelMetaInfo1"] = excelHelper.readRow(vars['_lastDownloadPath'] || '', "0", "3");
      vars["BidReqNumTextExcelMetaInfo"] = String(vars["EntireRowDataExcelMetaInfo1"]).split(",")["1"] || '';
      expect(String(vars["BidReqNumTextExcelMetaInfo"])).toBe("BID REQUEST NUMBER");
      vars["BidReqIdExcelMetaInfo"] = String(vars["EntireRowDataExcelMetaInfo1"]).split(",")["2"] || '';
      expect(String(vars["BidReqIdExcelMetaInfo"])).toBe(vars["BidReqIdUI"]);
      vars["EntireRowDataExcelMetaInfo2"] = excelHelper.readRow(vars['_lastDownloadPath'] || '', "1", "3");
      vars["ReportGenerationTextExcelMetaInfo"] = String(vars["EntireRowDataExcelMetaInfo2"]).split(",")["1"] || '';
      expect(String(vars["ReportGenerationTextExcelMetaInfo"])).toBe("REPORT GENERATION TIME");
      vars["ReportGenTimeExcelMetaInfo"] = String(vars["EntireRowDataExcelMetaInfo2"]).split(",")["2"] || '';
      expect(String(vars["ReportGenTimeExcelMetaInfo"])).toBe(vars["ExpectedReportGenTime"]);
      vars["count"] = (parseFloat(String(vars["count"])) + parseFloat(String("1"))).toFixed(0);
    }
  });
});
