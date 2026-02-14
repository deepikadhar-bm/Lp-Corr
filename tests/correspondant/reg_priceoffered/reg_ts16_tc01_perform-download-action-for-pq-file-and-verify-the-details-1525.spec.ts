import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';
import * as fileHelper from '../../../src/helpers/file-helpers';

test.describe('REG_PriceOffered', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS16_TC01_Perform download action for PQ file and verify the details', async ({ page }) => {
    // Set up download handler
    page.on('download', async (download) => {
      const filePath = path.join('test-results', 'downloads', download.suggestedFilename());
      await download.saveAs(filePath);
      vars['_lastDownloadPath'] = filePath;
    });

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//tr[td[@data-title=\"Status\"]//span[contains(text(),'Partially Committed') or contains(text(),'Committed')]]/td[@data-title=\"Bid Req. ID\"]").click();
    await page.waitForLoadState('networkidle');
    vars["SourceLoanNumUI"] = await page.locator("//div[text()=\"Bid Req. ID\"]//following-sibling::h5").textContent() || '';
    vars["SourceLoanNumUI"] = "\"sourceLoanNumber\":\"" + vars["SourceLoanNumUI"];
    vars["FirstLoanCorrNumberUI"] = await page.locator("(//button[contains(@aria-label,\"View loan details\")])[1]").textContent() || '';
    vars["FirstLoanCorrNumberUI1"] = "\"corrLoanNumber\":\"" + vars["FirstLoanCorrNumberUI"] + "\"";
    vars["CCodeInUI"] = await page.locator("//div[text()=\"CCode\"]//following-sibling::h5").textContent() || '';
    vars["CCodeInUI"] = "\"corrCode\":\"" + vars["CCodeInUI"] + "\"";
    await page.locator("(//button[contains(@aria-label,\"Download PQ file\")])[1]").click();
    // Wait for download - handled by Playwright download events
    await page.waitForTimeout(2000);
    vars[""] = vars['_lastDownloadPath'] ? require('path').basename(vars['_lastDownloadPath']) : '';
    vars["FirstLoanCorrNumberUI"] = String('') + String('');
    expect(String(vars["DownloadedPQFileName"])).toBe(vars["ExpectedFileName"]);
    vars["PQFilePathAllLoans"] = vars['_lastDownloadPath'] || '';
    vars[""] = fileHelper.readJsonValue('', "");
    expect(String(vars["PQFileDataAllLoans"])).toBe(vars["SourceLoanNumUI"]);
    expect(String(vars["PQFileDataAllLoans"])).toBe(vars["FirstLoanCorrNumberUI1"]);
    expect(String(vars["PQFileDataAllLoans"])).toBe(vars["CCodeInUI"]);
    await page.locator("//div[@id='price-offered-list-tabs']//span[text()[normalize-space() = \"Locked/Committed Loans\"]]").click();
    await page.waitForLoadState('networkidle');
    vars["LockedCorrLoan"] = await page.locator("//button[contains(@aria-label,\"View loan details for\")]").textContent() || '';
    vars["LockedCorrLoan1"] = "\"corrLoanNumber\":\"" + vars["LockedCorrLoan"] + "\"";
    await page.locator("//button[text()=\"PQ\"]").click();
    // Wait for download - handled by Playwright download events
    await page.waitForTimeout(2000);
    vars[""] = vars['_lastDownloadPath'] ? require('path').basename(vars['_lastDownloadPath']) : '';
    vars["LockedCorrLoan"] = String('') + String('');
    expect(String(vars["DownLoadedFileName2"])).toBe(vars["ExpectedFileName2"]);
    vars["PQFilePathLockedLoans"] = vars['_lastDownloadPath'] || '';
    vars[""] = fileHelper.readJsonValue('', "");
    expect(String(vars["PQFileDataLockedLoans"])).toBe(vars["SourceLoanNumUI"]);
    expect(String(vars["PQFileDataLockedLoans"])).toBe(vars["LockedCorrLoan1"]);
    expect(String(vars["PQFileDataLockedLoans"])).toBe(vars["CCodeInUI"]);
  });
});
