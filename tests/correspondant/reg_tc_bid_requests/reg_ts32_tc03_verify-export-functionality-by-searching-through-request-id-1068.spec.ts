import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';
import * as excelHelper from '../../../src/helpers/excel-helpers';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS32_TC03_Verify Export Functionality by searching through request ID', async ({ page }) => {
    // Set up download handler
    page.on('download', async (download) => {
      const filePath = path.join('test-results', 'downloads', download.suggestedFilename());
      await download.saveAs(filePath);
      vars['_lastDownloadPath'] = filePath;
    });

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await expect(page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[contains(@class, 'dlp-icon') and contains(@class, 'fa-chevron-right')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["RandomNumber"] = String(Math.floor(Math.random() * (10 - 1 + 1)) + 1);
    vars["RandomRequestID"] = await page.locator("(//td[@data-title=\"Bid Req. ID\"]//button)[$|RandomNumber|]").textContent() || '';
    vars["RandomRequestID"] = String(vars["RandomRequestID"]).trim();
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["RandomRequestID"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("(//td[@data-title=\"Bid Req. ID\"]//button)").waitFor({ state: 'visible' });
    await expect(page.locator("//button[@aria-label=\"Export Selected Bid Requests\"]")).toBeVisible();
    await expect(page.locator("(//td[@data-title=\"Bid Req. ID\"]//button)")).toContainText(vars["RandomRequestID"]);
    await page.locator("(//input[@type=\"checkbox\"])[2]").check();
    await expect(page.locator("(//input[@type=\"checkbox\"])[2]")).toBeVisible();
    await expect(page.locator("//button[@aria-label=\"Export Selected Bid Requests\"]")).toBeVisible();
    vars["CountOfRequestsUI"] = await page.locator("(//button[@aria-label=\"Export Selected Bid Requests\"]//span)[2]").textContent() || '';
    vars["CountOfRequestsUI"] = String(vars["CountOfRequestsUI"]).trim();
    vars["CountOfRequestsUI"] = String(vars["CountOfRequestsUI"]).substring(1, String(vars["CountOfRequestsUI"]).length - 1);
    await page.locator("//button[@aria-label=\"Export Selected Bid Requests\"]").click();
    // Wait for download - handled by Playwright download events
    await page.waitForTimeout(2000);
    vars["File"] = vars['_lastDownloadPath'] || '';
    vars["CountOfRequestsExcel"] = String(excelHelper.getRowCount(vars["File"], "0"));
    vars["CountOfRequestsExcel"] = (parseFloat(String(vars["CountOfRequestsExcel"])) - parseFloat(String("1"))).toFixed(0);
    expect(String(vars["CountOfRequestsUI"])).toBe(vars["CountOfRequestsExcel"]);
    vars["RequestIDExcel"] = excelHelper.readCell(vars['_lastDownloadPath'] || '', "1", "1", "0");
    expect(String(vars["RandomRequestID"])).toBe(vars["RequestIDExcel"]);
    await stepGroups.stepGroup_Verification_of_Column_Headers_Count_and_Column_Names_From_U(page, vars);
  });
});
