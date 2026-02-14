import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';
import * as fileHelper from '../../../src/helpers/file-helpers';

test.describe('REG_PriceOffered', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS16_TC02_Perform download action for PS file and verify the details', async ({ page }) => {
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
    await page.locator("//button[text()=\"PS\"]").click();
    // Wait for download - handled by Playwright download events
    await page.waitForTimeout(2000);
    vars[""] = vars['_lastDownloadPath'] ? require('path').basename(vars['_lastDownloadPath']) : '';
    vars["BidReqIDUI"] = await page.locator("//div[text()=\"Bid Req. ID\"]//following-sibling::h5").textContent() || '';
    vars["SourceLoanNumUI"] = "\"sourceLoanNumber\":\"" + vars["BidReqIDUI"];
    vars["CorrLoanNumUI"] = await page.locator("(//button[contains(@aria-label,\"View loan details\")])[1]").textContent() || '';
    vars["CorrLoanNumUI1"] = "\"corrLoanNumber\":\"" + vars["CorrLoanNumUI"] + "\"";
    vars["RefSecProdUI"] = await page.locator("//div[contains(@aria-label,\"Reference security: \")]").textContent() || '';
    vars["RefSecProdUI"] = String(vars["RefSecProdUI"]).trim();
    vars["RefSecProdUI"] = "\"referenceSecurityName\":\"" + vars["RefSecProdUI"] + "\"";
    vars["RefSecPriceLoanUI"] = await page.locator("//div[contains(@aria-label,\"Reference security price\")]").textContent() || '';
    vars["RefSecPriceLoanUI"] = String(vars["RefSecPriceLoanUI"]).trim();
    await stepGroups.stepGroup_Verifying_and_Removing_If_the_Last_Digits_are_Zeroes(page, vars);
    vars["RefSecPriceLoanUI"] = "\"referenceSecurityPrice\":" + vars["RefSecPriceLoanUI"];
    vars["SecMonthName"] = await page.locator("//div[contains(text(),\"Sec. Month\")]/..//h5").textContent() || '';
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String("12"))) {
      vars[""] = new Date(2000, parseInt(String("MonthName")) - 1, 1).toLocaleString('en-US', { month: 'long' });
      vars["Position"] = String(vars["MonthName"]).substring(0, parseInt("3"));
      vars["MonthName2"] = vars["MonthName1"];
      vars["MonthNames"] = String(vars["MonthName2"]).split(",")["1"] || '';
      if (String(vars["MonthNames"]) === String(vars["SecMonthName"])) {
        break;
      }
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    vars["MonthNumUI"] = vars["count"];
    vars["MonthNumUI"] = "\"referenceSecurityMonth\":" + vars["MonthNumUI"];
    vars["CorrLoanNumUI"] = String('') + String('');
    expect(String(vars["PSDownloadedFile1"])).toBe(vars["ExpectedFileName"]);
    vars["PSFilePath1"] = vars['_lastDownloadPath'] || '';
    vars[""] = fileHelper.readJsonValue('', "");
    expect(String(vars["PSFileData1"])).toBe(vars["SourceLoanNumUI"]);
    expect(String(vars["PSFileData1"])).toBe(vars["CorrLoanNumUI1"]);
    expect(String(vars["PSFileData1"])).toBe(vars["RefSecProdUI"]);
    expect(String(vars["PSFileData1"])).toBe(vars["RefSecPriceLoanUI"]);
    expect(String(vars["PSFileData1"])).toBe(vars["MonthNumUI"]);
    await page.locator("//div[@id='price-offered-list-tabs']//span[text()[normalize-space() = \"Locked/Committed Loans\"]]").click();
    await page.locator("//tr[td//div[contains(@aria-label,'Locked loan')]]//button[contains(text(),'PS')]").click();
    // Wait for download - handled by Playwright download events
    await page.waitForTimeout(2000);
    vars[""] = vars['_lastDownloadPath'] ? require('path').basename(vars['_lastDownloadPath']) : '';
    vars["LockedCorrLoanUI"] = await page.locator("//button[contains(@aria-label,\"View loan details for\")]").textContent() || '';
    vars["LockedCorrLoanUI1"] = "\"corrLoanNumber\":\"" + vars["LockedCorrLoanUI"] + "\"";
    vars["RefSecPriceLockedLoanUI"] = await page.locator("//div[contains(@aria-label,\"Reference security price\")]").textContent() || '';
    vars["RefSecPriceLockedLoansUI"] = String(vars["RefSecPriceLockedLoanUI"]).trim();
    await stepGroups.stepGroup_Verifying_and_Removing_If_the_Last_Digits_are_Zeroes(page, vars);
    vars["RefSecPriceLockedLoansUI"] = "\"referenceSecurityPrice\":" + vars["RefSecPriceLockedLoansUI"];
    vars["LockedCorrLoanUI"] = String('') + String('');
    expect(String(vars["PSDownloadedFile2"])).toBe(vars["ExpectedFileNamePSLockedLoan"]);
    vars["PSFilePath2"] = vars['_lastDownloadPath'] || '';
    vars[""] = fileHelper.readJsonValue('', "");
    expect(String(vars["PSFileData2"])).toBe(vars["SourceLoanNumUI"]);
    expect(String(vars["PSFileData2"])).toBe(vars["RefSecPriceLockedLoansUI"]);
    expect(String(vars["PSFileData2"])).toBe(vars["LockedCorrLoanUI1"]);
    expect(String(vars["PSFileData2"])).toBe(vars["RefSecProdUI"]);
    expect(String(vars["PSFileData2"])).toBe(vars["MonthNumUI"]);
  });
});
