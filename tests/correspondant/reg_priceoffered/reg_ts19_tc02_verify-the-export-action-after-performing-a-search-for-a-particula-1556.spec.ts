import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';
import * as excelHelper from '../../../src/helpers/excel-helpers';

test.describe('REG_PriceOffered', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS19_TC02_Verify the Export action after performing a search for a particular bid.', async ({ page }) => {
    // Set up download handler
    page.on('download', async (download) => {
      const filePath = path.join('test-results', 'downloads', download.suggestedFilename());
      await download.saveAs(filePath);
      vars['_lastDownloadPath'] = filePath;
    });

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    vars["FirstBidReqId"] = await page.locator("//td[@data-title=\"Bid Req. ID\"]").textContent() || '';
    vars["FirstBidReqId"] = String(vars["FirstBidReqId"]).trim();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["FirstBidReqId"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["RowCount"] = String(await page.locator("//tbody//tr[@role=\"row\"]").count());
    vars["RowCountUI"] = "1";
    vars["RowCountExcel"] = "1";
    await page.locator("//input[contains(@aria-label,\"Select all for\") and @type=\"checkbox\"]").click();
    await page.locator("//span[text()[normalize-space() = \"Export Selected\"]]").waitFor({ state: 'visible' });
    await page.locator("//span[text()[normalize-space() = \"Export Selected\"]]").click();
    // Wait for download - handled by Playwright download events
    await page.waitForTimeout(2000);
    // [DISABLED] Headers Verification
    // await stepGroups.stepGroup_Headers_Verification(page, vars);
    await stepGroups.stepGroup_Headers_Verification_Price_Offered(page, vars);
    while (parseFloat(String(vars["RowCountUI"])) <= parseFloat(String(vars["RowCount"]))) {
      vars["ColumnCountUI"] = "2";
      vars["indexExcel"] = "1";
      vars["RowDataExcel"] = excelHelper.readRow(vars['_lastDownloadPath'] || '', vars["RowCountExcel"], "0");
      while (parseFloat(String(vars["ColumnCountUI"])) <= parseFloat(String("9"))) {
        vars["CellValueInExcel"] = String(vars["RowDataExcel"]).split(",")[parseInt(String(vars["indexExcel"]))] || '';
        vars["CellValueInExcel"] = String(vars["CellValueInExcel"]).trim();
        vars["CellValuesUI "] = await page.locator("(//tbody//tr[$|RowCountUI|]//td)[$|ColumnCountUI|]").textContent() || '';
        vars["CellValuesUI"] = String(vars["CellValuesUI "]).trim();
        vars["HeadersUI"] = await page.locator("(//div[@role=\"button\"])[$|indexExcel|]").textContent() || '';
        vars["HeadersUI"] = String(vars["HeadersUI"]).trim();
        if (String(vars["CellValuesUI"]).includes(String("$"))) {
          vars["CellValuesUI"] = String(vars["CellValuesUI"]).replace(/\$\,/g, '');
        }
        if (String(vars["CellValueInExcel"]).includes(String("ET"))) {
          vars["CellValueInExcel"] = String(vars["CellValueInExcel"]).substring(0, String(vars["CellValueInExcel"]).length - 7);
        }
        if (String(vars["CellValuesUI"]).includes(String("_"))) {
          vars["CellValuesUI"] = String(vars["CellValuesUI"]).replace(/_/g, '');
        }
        if (String(vars["CellValueInExcel"]).includes(String("_"))) {
          vars["CellValueInExcel"] = String(vars["CellValueInExcel"]).replace(/_/g, '');
        }
        if (String(vars["HeadersUI"]) === String("Status")) {
          expect(String(vars["CellValuesUI"]).toLowerCase()).toContain(String(vars["CellValueInExcel"]).toLowerCase());
        } else {
          expect(String(vars["CellValueInExcel"])).toBe(vars["CellValuesUI"]);
        }
        vars["ColumnCountUI"] = (parseFloat(String("1")) + parseFloat(String(vars["ColumnCountUI"]))).toFixed(0);
        vars["indexExcel"] = (parseFloat(String("1")) + parseFloat(String(vars["indexExcel"]))).toFixed(0);
      }
      vars["RowCountExcel"] = (parseFloat(String("1")) + parseFloat(String(vars["RowCountExcel"]))).toFixed(0);
      vars["RowCountUI"] = (parseFloat(String("1")) + parseFloat(String(vars["RowCountUI"]))).toFixed(0);
    }
  });
});
