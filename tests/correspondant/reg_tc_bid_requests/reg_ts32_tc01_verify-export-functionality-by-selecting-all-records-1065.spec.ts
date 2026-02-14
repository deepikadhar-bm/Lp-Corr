import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';
import * as excelHelper from '../../../src/helpers/excel-helpers';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS32_TC01_Verify Export Functionality by selecting all records', async ({ page }) => {
    // Set up download handler
    page.on('download', async (download) => {
      const filePath = path.join('test-results', 'downloads', download.suggestedFilename());
      await download.saveAs(filePath);
      vars['_lastDownloadPath'] = filePath;
    });

    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await expect(page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Filter\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"Select Date Range\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"Last One Month\"]]").click();
    vars["LastMonth"] = await page.locator("//span[text()[normalize-space() = \"Last One Month\"]]").textContent() || '';
    await expect(page.locator("//button[@role=\"button\" and contains(@class, 'form-control') and contains(@class, 'd-flex') and contains(@class, 'dropdown-toggle')]")).toContainText(vars["LastMonth"]);
    await page.locator("//div[contains(@class, \"justify-content-end\")]//button[text()=\"Apply Filters\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//button[@aria-label=\"Export Selected Bid Requests\"]")).toBeVisible();
    await page.locator("//input[contains(@aria-label,\"Select all for\") and @type=\"checkbox\"]").click();
    await expect(page.locator("//input[contains(@aria-label,\"Select all for\") and @type=\"checkbox\"]")).toBeVisible();
    await expect(page.locator("(//input[@type=\"checkbox\"])[2]")).toBeVisible();
    vars["CountOfRequestsUI"] = await page.locator("(//button[@aria-label=\"Export Selected Bid Requests\"]//span)[2]").textContent() || '';
    vars["CountOfRequestsUI"] = String(vars["CountOfRequestsUI"]).trim();
    vars["CountOfRequestsUI"] = String(vars["CountOfRequestsUI"]).substring(1, String(vars["CountOfRequestsUI"]).length - 1);
    await expect(page.locator("//button[@aria-label=\"Export Selected Bid Requests\"]")).toBeVisible();
    await page.locator("//button[@aria-label=\"Export Selected Bid Requests\"]").click();
    // Wait for download - handled by Playwright download events
    await page.waitForTimeout(2000);
    vars["File"] = vars['_lastDownloadPath'] || '';
    vars["CountOfRequestsExcel"] = String(excelHelper.getRowCount(vars["File"], "0"));
    vars["CountOfRequestsExcel"] = (parseFloat(String(vars["CountOfRequestsExcel"])) - parseFloat(String("1"))).toFixed(0);
    expect(String(vars["CountOfRequestsUI"])).toBe(vars["CountOfRequestsExcel"]);
    vars["CountOfColumnsUI"] = String(await page.locator("//th[position() > 1 and position() < last()]").count());
    vars["CountOfColumnsExcel"] = String(excelHelper.getColumnCount(vars["File"], "0"));
    expect(String(vars["CountOfColumnsUI"])).toBe(vars["CountOfColumnsExcel"]);
    vars["count1"] = "0";
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["CountOfColumnsUI"]))) {
      vars["ColumnNameUI"] = await page.locator("//th[position() >1 and position() < last()][$|count|]").textContent() || '';
      vars["ColumnNameUI"] = String(vars["ColumnNameUI"]).trim();
      vars["ColumnNameExcel"] = excelHelper.readCell(vars['_lastDownloadPath'] || '', "0", vars["count1"], "0");
      vars["ColumnNameExcel"] = String(vars["ColumnNameExcel"]).trim();
      if (String(vars["count"]) === String("6")) {
        expect(String(vars["ColumnNameExcel"])).toBe(testData["Execution Type Header"]);
      } else if (String(vars["count"]) === String("1")) {
        expect(String(vars["ColumnNameExcel"])).toBe(testData["CCode Header"]);
      } else if (String(vars["count"]) === String("2")) {
        expect(String(vars["ColumnNameExcel"])).toBe(testData["Bid Request ID Header"]);
      } else {
        expect(String(vars["ColumnNameUI"])).toBe(vars["ColumnNameExcel"]);
      }
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
      vars["count1"] = (parseFloat(String("1")) + parseFloat(String(vars["count1"]))).toFixed(0);
    }
  });
});
