import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';
import * as excelHelper from '../../../src/helpers/excel-helpers';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS32_TC02_Verify Export Functionality by randomly selecting records', async ({ page }) => {
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
    await expect(page.locator("//button[@aria-label=\"Export Selected Bid Requests\"]")).toBeVisible();
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String("8"))) {
      vars["RandomNumber"] = String(Math.floor(Math.random() * (10 - 1 + 1)) + 1);
      await page.locator("(//tbody//input[@type=\"checkbox\"])[$|RandomNumber|]").check();
      await expect(page.locator("(//tbody//input[@type=\"checkbox\"])[$|RandomNumber|]")).toBeVisible();
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
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
    await stepGroups.stepGroup_Verification_of_Column_Headers_Count_and_Column_Names_From_U(page, vars);
  });
});
