import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';
import * as excelHelper from '../../../src/helpers/excel-helpers';

test.describe('REG_General Settings', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS15_TC07_Company Config - Verify the User making the Changes, in the Input of the Internal User Username Replacement, whether it is get Reflected in the Commitment letter', async ({ page }) => {
    // Prerequisite: REG_TS15_TC06_Company Config - Verify the User making the Changes, in the Input of the Internal User
    // TODO: Ensure prerequisite test passes first

    // Set up download handler
    page.on('download', async (download) => {
      const filePath = path.join('test-results', 'downloads', download.suggestedFilename());
      await download.saveAs(filePath);
      vars['_lastDownloadPath'] = filePath;
    });

    await stepGroups.stepGroup_Creating_a_new_bid_for_price_offered_status_with_freedom_com(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").click();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["RequestIDDetails"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[contains(text(),\"$|RequestIDDetails|\")]").click();
    await stepGroups.stepGroup_Commit_All_Loans_Standard(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//input[@id='searchTagInput']").click();
    await page.locator("//input[@id='searchTagInput']").fill(vars["RequestIDDetails"]);
    await page.locator("//span[normalize-space(text())=\"Bid Request ID\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Comm. Letter\"]//span").click();
    await page.locator("//button[i[contains(@class,'fa-arrow-to-bottom')]]").click();
    await page.waitForTimeout(3000); // Wait for download to complete
    vars["FilePath"] = vars['_lastDownloadPath'] || '';
    vars["CoverLetterUserName"] = excelHelper.readCell(vars["FilePath"], "3", "4", "0");
    expect(String(vars["CoverLetterUserName"])).toBe(vars["UsernameUpdated"]);
    await page.locator("//span[text()[normalize-space() = \"Ok\"]]").click();
    await stepGroups.stepGroup_Updating_Back_Username_in_Company_Config(page, vars);
  });
});
