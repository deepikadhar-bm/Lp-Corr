import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';
import * as excelHelper from '../../../src/helpers/excel-helpers';

test.describe('Commitment List - TS_1', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS18_TC02_Apply filter for current day/particular day and verify the Export functionality', async ({ page }) => {
    // Set up download handler
    page.on('download', async (download) => {
      const filePath = path.join('test-results', 'downloads', download.suggestedFilename());
      await download.saveAs(filePath);
      vars['_lastDownloadPath'] = filePath;
    });

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"Filter\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"Select Date Range\"]]").click();
    await page.locator("//input[@placeholder=\"Select Date\"]").click();
    vars["CurrentDate"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC-05:00" };
      const fmt = "d-M-yyyy";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    await page.locator("//div[@class=\"ngb-dp-month\"]//div[@aria-label=\"$|CurrentDate|\"]").click();
    await page.locator("//button[text()[normalize-space() = \"Apply\"]]").click();
    await page.locator("//div[contains(@class, \"justify-content-end\")]//button[text()=\"Apply Filters\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    if (true) /* Element Pagination Count is not visible */ {
      vars["PageCount"] = "1";
    } else {
      vars["PageCount"] = await page.locator("//div[@aria-label=\"Pagination Controls\"]//span[@aria-atomic=\"true\"]").textContent() || '';
      vars["PageCount"] = String(vars["PageCount"]).substring(10);
    }
    vars["Count1"] = "1";
    vars["TotalRowsAllPagesUI"] = "0";
    while (parseFloat(String(vars["Count1"])) <= parseFloat(String(vars["PageCount"]))) {
      vars["RowCountUI"] = String(await page.locator("(//tbody//tr)[position() >= 1 and position() <= last()]").count());
      vars["TotalRowsAllPagesUI"] = (parseFloat(String(vars["TotalRowsAllPagesUI"])) + parseFloat(String(vars["RowCountUI"]))).toFixed(0);
      if (true) /* Element Go to Next Page Button is enabled */ {
        await page.locator("//button[@aria-label=\"Go to Next Page\"]//span").click();
      }
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      vars["Count1"] = (parseFloat(String("1")) + parseFloat(String(vars["Count1"]))).toFixed(0);
    }
    await page.locator("//input[contains(@aria-label,\"Select all for\") and @type=\"checkbox\"]").click();
    vars["ExportedCountUI"] = await page.locator(" //span[text()=\" Export Selected\"]/following-sibling::span").textContent() || '';
    vars["ExportedCountUI"] = String(vars["ExportedCountUI"]).trim();
    vars["ExportedCountUI"] = String(vars["ExportedCountUI"]).replace(/\(\)/g, '');
    vars["RowCount"] = String(await page.locator("//tr[@role=\"row\"]").count());
    vars["RowCountInUI"] = (parseFloat(String(vars["RowCount"])) - parseFloat(String("1"))).toFixed(0);
    await page.locator("//span[text()[normalize-space() = \"Export Selected\"]]").click();
    // Wait for download - handled by Playwright download events
    await page.waitForTimeout(2000);
    vars["File"] = vars['_lastDownloadPath'] || '';
    vars["ExcelRowCount"] = String(excelHelper.getRowCount(vars["File"], "0"));
    vars["ExcelRowCount"] = (parseFloat(String(vars["ExcelRowCount"])) - parseFloat(String("1"))).toFixed(0);
    expect(String(vars["TotalRowsAllPagesUI"])).toBe(vars["ExcelRowCount"]);
    expect(String(vars["TotalRowsAllPagesUI"])).toBe(vars["ExportedCountUI"]);
    vars["Count"] = "1";
    vars["count"] = "1";
    vars["ExcelHeader"] = "0";
    vars["CountOfHeaders"] = String(await page.locator("(//div[contains(@aria-label,\"Sort by\")])[position() <= 12]").count());
    vars["HeaderValuesExcel"] = excelHelper.readRow(vars['_lastDownloadPath'] || '', vars["ExcelHeader"], "0");
    while (parseFloat(String(vars["Count"])) <= parseFloat(String(vars["CountOfHeaders"]))) {
      vars["IndividualHeaders"] = await page.locator("((//div[contains(@aria-label,\"Sort by\")])[position() <= 13])[$|Count|]").textContent() || '';
      vars["IndividualHeadersUI"] = String(vars["IndividualHeaders"]).trim();
      vars["IndividualExcelHeaders"] = String(vars["HeaderValuesExcel"]).split(",")[parseInt(String(vars["count"]))] || '';
      vars["IndividualExcelHeaders"] = String(vars["IndividualExcelHeaders"]).trim();
      if (String(vars["IndividualHeadersUI"]) === String("BidReq.ID")) {
        vars["IndividualHeadersUI"] = "BidRequestID";
      }
      expect(String(vars["IndividualHeadersUI"]).toLowerCase()).toContain(String(vars["IndividualExcelHeaders"]).toLowerCase());
      vars["Count"] = (parseFloat(String("1")) + parseFloat(String(vars["Count"]))).toFixed(0);
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
  });
});
