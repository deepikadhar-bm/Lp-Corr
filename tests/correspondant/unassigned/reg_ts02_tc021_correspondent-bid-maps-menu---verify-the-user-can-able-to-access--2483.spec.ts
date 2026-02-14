import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';
import * as excelHelper from '../../../src/helpers/excel-helpers';
import * as fileHelper from '../../../src/helpers/file-helpers';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS02_TC02.1_Correspondent Bid Maps Menu - Verify the User can able to access  some of the features in the Bid Request.', async ({ page }) => {
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
    await page.locator("//button[@aria-label=\"Download Bid Request\"]").evaluate(el => (el as HTMLElement).click());
    await page.locator("//h5[contains(text(),\"Download file\")]").waitFor({ state: 'visible' });
    await expect(page.locator("//h5[contains(text(),\"Download file\")]")).toBeVisible();
    await page.locator("//button[@class=\"btn bg-transparent border-0 m-0\"]").click();
    await page.locator("//td[@data-title=\"Bid Req. ID\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//button[@aria-label=\"Download File\"]").click();
    await page.locator("//h5[contains(text(),\"Download file\")]").waitFor({ state: 'visible' });
    await expect(page.locator("//h5[contains(text(),\"Download file\")]")).toBeVisible();
    await page.locator("//button[@class=\"btn bg-transparent border-0 m-0\"]").click();
    await page.locator("//button[@aria-label=\"Download Grid\"]").click();
    await page.waitForTimeout(3000); // Wait for download to complete
    vars["DownloadedGridExcelData"] = excelHelper.readRow(vars['_lastDownloadPath'] || '', "1", "1");
    await page.locator("(//button[text()=\"PQ\"])[2]").click();
    await page.waitForTimeout(3000); // Wait for download to complete
    vars["PQFilePath"] = vars['_lastDownloadPath'] || '';
    vars[""] = fileHelper.readJsonValue('', "");
    await page.locator("(//button[text()=\"PS\"])[2]").click();
    await page.waitForTimeout(3000); // Wait for download to complete
    vars["PSFilePath"] = vars['_lastDownloadPath'] || '';
    vars[""] = fileHelper.readJsonValue('', "");
    await page.locator("(//button[text()=\"MPRP\"])[2]").click();
    await page.waitForTimeout(3000); // Wait for download to complete
    vars["MPRPExcelData"] = excelHelper.readRow(vars['_lastDownloadPath'] || '', "1", "1");
    await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["FirstBidRequestId"] = await page.locator("//td[@data-title=\"Bid Req. ID\"]").textContent() || '';
    vars["FirstBidRequestId"] = String(vars["FirstBidRequestId"]).trim();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["FirstBidRequestId"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["ActualTotalRowsCount"] = String(await page.locator("//tbody//tr[@role=\"row\"]").count());
    vars["ExpectedTotalRowsCount"] = "1";
    expect(String(vars["ExpectedTotalRowsCount"])).toBe(vars["ActualTotalRowsCount"]);
    await page.locator("//tbody//input[@type=\"checkbox\"]").check();
    await page.locator("//span[text()[normalize-space() = \"Export Selected\"]]").waitFor({ state: 'visible' });
    await page.locator("//span[text()[normalize-space() = \"Export Selected\"]]").click();
    await page.waitForTimeout(3000); // Wait for download to complete
    vars["ExportedExcelData"] = excelHelper.readRow(vars['_lastDownloadPath'] || '', "1", "1");
  });
});
