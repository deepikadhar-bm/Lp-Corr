import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';
import * as fileHelper from '../../../src/helpers/file-helpers';

test.describe('Commitment List - TS_1', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS17_TC02_Perform download action for PS file and verify the details', async ({ page }) => {
    // Set up download handler
    page.on('download', async (download) => {
      const filePath = path.join('test-results', 'downloads', download.suggestedFilename());
      await download.saveAs(filePath);
      vars['_lastDownloadPath'] = filePath;
    });

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//td[@data-title=\"Comm. ID\"]//a[contains(@aria-label,\"View details for commitment\")]").click();
    await page.locator("//button[text()=\"PS\"]").waitFor({ state: 'visible' });
    await page.locator("//button[text()=\"PS\"]").click();
    // Wait for download - handled by Playwright download events
    await page.waitForTimeout(2000);
    vars[""] = vars['_lastDownloadPath'] ? require('path').basename(vars['_lastDownloadPath']) : '';
    vars["BidReqIDUI"] = await page.locator("//div[text()=\"Bid Req. ID\"]//following-sibling::h5").textContent() || '';
    vars["SourceLoanNumUI"] = "\"sourceLoanNumber\":\"" + vars["BidReqIDUI"];
    vars["CorrLoanNumUI"] = await page.locator("//tr[@role=\"row\"]//button[1]").textContent() || '';
    vars["CorrLoanNumUI1"] = "\"corrLoanNumber\":\"" + vars["CorrLoanNumUI"] + "\"";
    vars["RefSecProdUI"] = await page.locator("//td[@data-title=\"Ref Sec Prod.\"]").textContent() || '';
    vars["RefSecProdUI"] = String(vars["RefSecProdUI"]).trim();
    vars["RefSecProdUI"] = "\"referenceSecurityName\":\"" + vars["RefSecProdUI"] + "\"";
    vars["RefSecPriceLoanUI"] = await page.locator("//td[@data-title=\"Ref Sec Price\"]").textContent() || '';
    vars["RefSecPriceLoanUI"] = String(vars["RefSecPriceLoanUI"]).trim();
    await stepGroups.stepGroup_Verifying_and_Removing_If_the_Last_Digits_are_Zeroes(page, vars);
    vars["RefSecPriceLoanUI"] = "\"referenceSecurityPrice\":" + vars["RefSecPriceLoanUI"];
    vars["CorrLoanNumUI"] = String('') + String('');
    expect(String(vars["PSDownloadedFile1"])).toBe(vars["ExpectedFileName"]);
    vars["PSFilePath1"] = vars['_lastDownloadPath'] || '';
    vars[""] = fileHelper.readJsonValue('', "");
    expect(String(vars["PSFileData1"])).toBe(vars["SourceLoanNumUI"]);
    expect(String(vars["PSFileData1"])).toBe(vars["CorrLoanNumUI1"]);
    expect(String(vars["PSFileData1"])).toBe(vars["RefSecProdUI"]);
    expect(String(vars["PSFileData1"])).toBe(vars["RefSecPriceLoanUI"]);
    await page.locator("//div[text()[normalize-space() = \"Total Loans\"]]").click();
    await page.locator("//div[@class=\"commit-order\"]//../..//button[contains(text(),'PS')]").click();
    // Wait for download - handled by Playwright download events
    await page.waitForTimeout(2000);
    vars[""] = vars['_lastDownloadPath'] ? require('path').basename(vars['_lastDownloadPath']) : '';
    vars["LockedCorrLoanUI"] = await page.locator("(//span[contains(@class,\"lock-icon\")]/../..//td[@data-title=\"Corr. Loan#\"])[1]").textContent() || '';
    vars["LockedCorrLoanUI"] = String(vars["LockedCorrLoanUI"]).substring(0, String(vars["LockedCorrLoanUI"]).length - 10);
    vars["LockedCorrLoanUI1"] = "\"corrLoanNumber\":\"" + vars["LockedCorrLoanUI"] + "\"";
    vars["RefSecPriceLockedLoanUI"] = await page.locator("//td[@data-title=\"Ref Sec Price\"]").textContent() || '';
    vars["RefSecPriceLockedLoansUI"] = String(vars["RefSecPriceLockedLoanUI"]).trim();
    await stepGroups.stepGroup_Verifying_and_Removing_If_the_Last_Digits_are_Zeroes(page, vars);
    vars["RefSecPriceLockedLoansUI"] = "\"referenceSecurityPrice\":" + vars["RefSecPriceLockedLoansUI"];
    vars["LockedCorrLoanUI"] = String('') + String('');
    expect(String(vars["PSDownloadedFile2"])).toBe(vars["ExpectedFileNamePSLockedLoan"]);
    vars["PSFilePath2"] = vars['_lastDownloadPath'] || '';
    vars[""] = fileHelper.readJsonValue('', "");
    expect(String(vars["PSFileData2"])).toBe(vars["SourceLoanNumUI"]);
    expect(String(vars["PSFileData2"])).toBe(vars["LockedCorrLoanUI1"]);
    expect(String(vars["PSFileData2"])).toBe(vars["RefSecPriceLockedLoansUI"]);
    expect(String(vars["PSFileData2"])).toBe(vars["RefSecProdUI"]);
  });
});
