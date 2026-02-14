import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';
import * as excelHelper from '../../../src/helpers/excel-helpers';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS02_TC11_Verify by selecting the \\\"show all / Unidentified / unused / used headers\\\" dropdown options should display those respective values and Verify th count of unidentified headers.', async ({ page }) => {
    // Set up download handler
    page.on('download', async (download) => {
      const filePath = path.join('test-results', 'downloads', download.suggestedFilename());
      await download.saveAs(filePath);
      vars['_lastDownloadPath'] = filePath;
    });

    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Smart_Mapper_from_Off_to_On(page, vars);
    await stepGroups.stepGroup_Creation_Of_Bid_Map_Upto_Header_Mapping(page, vars);
    await stepGroups.stepGroup_Reading_files(page, vars);
    vars["Filecounts"] = vars['_lastDownloadPath'] || '';
    await page.locator("(//fieldset//input[@type=\"checkbox\"])[1]").check();
    await expect(page.locator("(//fieldset//input[@type=\"checkbox\"])[1]")).toBeVisible();
    vars["FirstCheckedBidName"] = await page.locator("(//div[contains(@class,\"gap-2 header-grid-layout\")]//div[@class=\"flex-grow-1\"])[1]").textContent() || '';
    await page.locator("(//fieldset//input[@type=\"checkbox\"])[2]").check();
    await expect(page.locator("(//fieldset//input[@type=\"checkbox\"])[2]")).toBeVisible();
    vars["SecondCheckedBidName"] = await page.locator("(//div[contains(@class,\"gap-2 header-grid-layout\")]//div[@class=\"flex-grow-1\"])[2]").textContent() || '';
    vars["UncheckedHeadersCount"] = String(await page.locator("(//fieldset)[position() > 2 and position() <= last()]").count());
    await expect(page.locator("//select[contains(normalize-space(),\"Select Show All Headers Show Unidentified Headers (10) Show Unused Headers Show Used Headers\")]")).toBeVisible();
    await page.locator("//select[@id=\"id\"]").selectOption({ label: testData["Header Mapping"] });
    vars["BidSampleCountFromUI"] = String(await page.locator("//i[@class=\"fas fa-pencil-alt\"]").count());
    // [DISABLED] Store the count of non-empty cells from the excel file Filecounts into runtime variable Filecount
    // vars["Filecount"] = String(excelHelper.getColumnCount(vars["Filecounts"], "0"));
    vars["BidSampleCountFromExcel"] = String(excelHelper.countNonEmptyCells(vars['_lastDownloadPath'] || '', "0", "0"));
    vars["BidSampleCountFromExcel"] = (parseFloat(String(vars["BidSampleCountFromExcel"])) - parseFloat(String("1"))).toFixed(0);
    expect(String(vars["BidSampleCountFromUI"])).toBe(vars["BidSampleCountFromExcel"]);
    await stepGroups.stepGroup_Show_Unidentified_Headers(page, vars);
    await stepGroups.stepGroup_Show_Unused_Headers(page, vars);
    await page.locator("//select[contains(normalize-space(),\"Select Show All Headers Show Unidentified Headers (10) Show Unused Headers Show Used Headers\")]").selectOption({ label: testData["Used Headers"] });
    await expect(page.locator("//div[@class=\"flex-grow-1\" and text()=\"$|FirstCheckedBidName|\"]")).toBeVisible();
    await expect(page.locator("//div[@class=\"flex-grow-1\" and text()=\"$|SecondCheckedBidName|\"]")).toBeVisible();
    await expect(page.locator("//fieldset")).toHaveCount(parseInt("2"));
  });
});
