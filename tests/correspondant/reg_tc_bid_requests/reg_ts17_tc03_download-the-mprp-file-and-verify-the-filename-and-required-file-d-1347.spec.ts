import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';
import * as excelHelper from '../../../src/helpers/excel-helpers';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS17_TC03_Download the MPRP file and verify the filename and required file data.', async ({ page }) => {
    // Set up download handler
    page.on('download', async (download) => {
      const filePath = path.join('test-results', 'downloads', download.suggestedFilename());
      await download.saveAs(filePath);
      vars['_lastDownloadPath'] = filePath;
    });

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//h3[text()[normalize-space() = \"Bid Requests\"]]")).toBeVisible();
    vars["Count"] = "1";
    vars["RowsCountBidList"] = String(await page.locator("(//td[@data-title=\"#Loans / #Errors\"])").count());
    while (parseFloat(String(vars["Count"])) <= parseFloat(String(vars["RowsCountBidList"]))) {
      vars["StatusOfBidRequestID"] = await page.locator("(//td[@data-title=\"Status\"])[$|Count|]").textContent() || '';
      if (String(vars["StatusOfBidRequestID"]).includes(String("Committed"))) {
        vars["Count"] = (parseFloat(String(vars["Count"])) + parseFloat(String("1"))).toFixed(0);
      } else {
        vars["Loans&Errors"] = await page.locator("(//td[@data-title=\"#Loans / #Errors\"])[$|Count|]").textContent() || '';
        vars["loans"] = String(vars["Loans&Errors"]).split("/")["1"] || '';
        vars["Errors"] = String(vars["Loans&Errors"]).split("/")["2"] || '';
        if (String(vars["loans"]) > String(vars["Errors"])) {
          await page.locator("(//td[@data-title=\"#Loans / #Errors\"]/..//td[@data-title=\"Bid Req. ID\"])[$|Count|]").click();
          break;
        } else {
          vars["Count"] = (parseFloat(String(vars["Count"])) + parseFloat(String("1"))).toFixed(0);
        }
      }
    }
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//h3[text()[normalize-space() = \"Bid Request Details\"]]")).toBeVisible();
    vars["Rows"] = "1";
    vars["LoanStatusCountDetails"] = String(await page.locator("//td[@data-title=\"Loan Status\"]//div").count());
    while (parseFloat(String(vars["Rows"])) <= parseFloat(String(vars["LoanStatusCountDetails"]))) {
      vars["LoanStatusText"] = await page.locator("(//td[@data-title=\"Loan Status\"]//div)[$|Rows|]").textContent() || '';
      if (String(vars["LoanStatusText"]) === String("Success")) {
        vars["LoanName"] = await page.locator("(//div[text()=\" Success \"])[1]/../..//td[@data-title=\"Corr. Loan#\"]//button[1]").textContent() || '';
        vars["RequestID"] = await page.locator("//div[text()=\"Request ID\"]/..//h5").inputValue() || '';
        await page.locator("//div[text()=\" Success \"]/../..//td//button[text()=\"MPRP\"]").click();
        break;
      } else {
        vars["Rows"] = (parseFloat(String(vars["Rows"])) + parseFloat(String("1"))).toFixed(0);
      }
    }
    // [DISABLED] Wait until all files are download in all browsers
    // await page.waitForTimeout(3000); // Wait for download to complete
    // Wait for download - handled by Playwright download events
    await page.waitForTimeout(2000);
    vars[""] = vars['_lastDownloadPath'] ? require('path').basename(vars['_lastDownloadPath']) : '';
    expect(String(vars["ExcelFile"])).toBe(vars["LoanName"]);
    vars["LoanName"] = String('') + String('');
    expect(String(vars["ExcelFile"])).toBe(vars["LoanName"]);
    vars["FileName"] = String(vars["LoanName"]) + "-" + String(vars["RequestID"]);
    expect(String(vars["ExcelFile"])).toBe(vars["FileName"]);
    vars["ExcelFile"] = vars['_lastDownloadPath'] || '';
    vars["NonEmptyCells"] = String(excelHelper.getColumnCount(vars["ExcelFile"], "0"));
    expect(String(vars["NonEmptyCells"])).toBe("5");
  });
});
