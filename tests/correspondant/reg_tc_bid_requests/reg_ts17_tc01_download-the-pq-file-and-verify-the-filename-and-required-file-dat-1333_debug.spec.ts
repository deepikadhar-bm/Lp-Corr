import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';
import * as fileHelper from '../../../src/helpers/file-helpers';
test.describe('REG_TC_Bid_Requests [DEBUG]', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS17_TC01_Download the PQ file and verify the filename and required file data [DEBUG]', async ({ page }) => {
    // Set up download handler
    page.on('download', async (download) => {
      const filePath = path.join('test-results', 'downloads', download.suggestedFilename());
      await download.saveAs(filePath);
      vars['_lastDownloadPath'] = filePath;
    });

    console.log('\n========== TEST START ==========');
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    console.log('[STEP] Logged in to CORR Portal');
    
    await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    console.log('[STEP] Clicked on Bid Requests menu');
    
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    console.log('[STEP] Loading spinner hidden');
    
    await expect(page.locator("//h3[text()[normalize-space() = \"Bid Requests\"]]")).toBeVisible();
    console.log('[STEP] Bid Requests heading visible');
    
    vars["Count"] = "1";
    vars["RowsCountBidList"] = String(await page.locator("(//td[@data-title=\"#Loans / #Errors\"])").count());
    console.log('\n===== LOOP-1 START =====');
    console.log('[LOOP-1] Initial Count: ' + vars["Count"] + ', Total Rows: ' + vars["RowsCountBidList"]);
    
    while (parseFloat(String(vars["Count"])) <= parseFloat(String(vars["RowsCountBidList"]))) {
      console.log('\n[LOOP-1] ========== Iteration ' + vars["Count"] + ' / ' + vars["RowsCountBidList"] + ' ==========');
      
      vars["StatusOfBidRequestID"] = await page.locator(`(//td[@data-title="Status"])[${vars["Count"]}]`).textContent() || '';
      console.log('[LOOP-1] StatusOfBidRequestID: "' + vars["StatusOfBidRequestID"] + '"');
      
      if (String(vars["StatusOfBidRequestID"]).includes(String("Committed"))) {
        console.log('[LOOP-1] ✓ Status is "Committed" - incrementing Count');
        vars["Count"] = (parseFloat(String(vars["Count"])) + parseFloat(String("1"))).toFixed(0);
      } else {
        console.log('[LOOP-1] ✗ Status is NOT "Committed" - checking loans vs errors');
        vars["Loans&Errors"] = await page.locator(`(//td[@data-title="#Loans / #Errors"])[${vars["Count"]}]`).textContent() || '';
        console.log('[LOOP-1] Loans&Errors value: "' + vars["Loans&Errors"] + '"');
        
        const loansParts = String(vars["Loans&Errors"]).trim().split("/");
        vars["loans"] = loansParts[0]?.trim() || '';
        vars["Errors"] = loansParts[1]?.trim() || '';
        console.log('[LOOP-1] Split values - loans: "' + vars["loans"] + '", Errors: "' + vars["Errors"] + '"');
        
        const loansNum = parseInt(vars["loans"]) || 0;
        const errorsNum = parseInt(vars["Errors"]) || 0;
        console.log('[LOOP-1] Numeric comparison - loans: ' + loansNum + ', Errors: ' + errorsNum);
        
        if (loansNum > errorsNum) {
          console.log('[LOOP-1] ✓ Loans > Errors - CLICKING Bid Request ID to open details');
          await page.locator(`(//td[@data-title="#Loans / #Errors"]/..//td[@data-title="Bid Req. ID"])[${vars["Count"]}]`).click();
          console.log('[LOOP-1] ✓ Clicked - BREAKING from loop');
          break;
        } else {
          console.log('[LOOP-1] ✗ Loans <= Errors - incrementing Count and continuing loop');
          vars["Count"] = (parseFloat(String(vars["Count"])) + parseFloat(String("1"))).toFixed(0);
        }
      }
    }
    console.log('\n===== LOOP-1 END ===== (Final Count: ' + vars["Count"] + ')');
    
    console.log('[STEP] Waiting for loading spinner to hide after Bid Request Details navigation');
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    console.log('[STEP] Spinner hidden');
    
    console.log('[STEP] Waiting for "Bid Request Details" heading to be visible');
    await expect(page.locator("//h3[text()[normalize-space() = \"Bid Request Details\"]]")).toBeVisible();
    console.log('[STEP] ✓ "Bid Request Details" heading is visible');
    
    vars["Rows"] = "1";
    vars["LoanStatusCountDetails"] = String(await page.locator("//td[@data-title='Loan Status']//div").count());
    console.log('\n===== LOOP-2 START =====');
    console.log('[LOOP-2] Initial Rows: ' + vars["Rows"] + ', Total LoanStatusCount: ' + vars["LoanStatusCountDetails"]);
    
    while (parseFloat(String(vars["Rows"])) <= parseFloat(String(vars["LoanStatusCountDetails"]))) {
      console.log('\n[LOOP-2] ========== Iteration ' + vars["Rows"] + ' / ' + vars["LoanStatusCountDetails"] + ' ==========');
      
      vars["LoanStatusText"] = await page.locator(`(//td[@data-title="Loan Status"]//div)[${vars["Rows"]}]`).textContent() || '';
      console.log('[LOOP-2] LoanStatusText: "' + vars["LoanStatusText"] + '"');
      
      if (String(vars["LoanStatusText"]).trim() === String("Success")) {
        console.log('[LOOP-2] ✓ Found Status = "Success"');
        vars["LoanName"] = await page.locator(`(//div[text()=" Success "])[1]/../..//td[@data-title="Corr. Loan#"]//button[1]`).textContent() || '';
        console.log('[LOOP-2] LoanName: "' + vars["LoanName"] + '"');
        console.log('[LOOP-2] Clicking on PQ button for row ' + vars["Rows"]);
        await page.locator(`(//div[text()=" Success "]/../..//td//button[text()="PQ"])[${vars["Rows"]}]`).click();
        console.log('[LOOP-2] ✓ PQ button clicked - BREAKING from loop');
        break;
      } else {
        console.log('[LOOP-2] ✗ Status is NOT "Success" - incrementing Rows');
        vars["Rows"] = (parseFloat(String(vars["Rows"])) + parseFloat(String("1"))).toFixed(0);
      }
    }
    console.log('\n===== LOOP-2 END ===== (Final Rows: ' + vars["Rows"] + ')');
    
    // [DISABLED] Wait until all files are download in all browsers
    // await page.waitForTimeout(3000); // Wait for download to complete
    // Wait for download - handled by Playwright download events
    console.log('[STEP] Waiting for file download to complete...');
    await page.waitForTimeout(2000);
    console.log('[STEP] Download wait completed');
    
    vars[""] = vars['_lastDownloadPath'] ? require('path').basename(vars['_lastDownloadPath']) : '';
    console.log('[STEP] Last downloaded file: "' + vars['_lastDownloadPath'] + '"');
    
    vars["LoanName"] = String('') + String('');
    console.log('[STEP] Verifying JsonFile matches FileName');
    expect(String(vars["JsonFile"])).toBe(vars["FileName"]);
    console.log('[STEP] ✓ JsonFile and FileName match');
    
    vars["JsonFilePath"] = vars['_lastDownloadPath'] || '';
    console.log('[STEP] JsonFilePath: "' + vars["JsonFilePath"] + '"');
    
    vars[""] = fileHelper.readJsonValue('', "");
    console.log('[STEP] Verifying DataFromJsonFile matches LoanName');
    expect(String(vars["DataFromJsonFile"])).toBe(vars["LoanName"]);
    console.log('[STEP] ✓ DataFromJsonFile and LoanName match');
    
    console.log('\n========== TEST END ==========\n');
  });
});
