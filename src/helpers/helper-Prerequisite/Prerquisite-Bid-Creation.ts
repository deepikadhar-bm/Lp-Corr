import { Page } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../step-groups';
import * as excelHelper from '../excel-helpers';

// ================================================================
// PREREQUISITE 1: Updating the Loan Numbers In File
// (REG_TS02_TC01)
// ================================================================
export async function prereq_UpdateLoanNumbersInFile(
  page: Page,
  vars: Record<string, string>
): Promise<void> {
  console.log('\n========== PREREQ 1 START: Updating Loan Numbers In File ==========');

  // Set up download handler
  page.on('download', async (download) => {
    const filePath = path.join('test-results', 'downloads', download.suggestedFilename());
    await download.saveAs(filePath);
    vars['_lastDownloadPath'] = filePath;
    console.log('[PREREQ 1] ✓ File downloaded: ' + filePath);
  });

  await stepGroups.stepGroup_Rename_File(page, vars);
  console.log('[PREREQ 1] ✓ File renamed');

  if (vars['_lastDownloadPath']) {
    require('fs').copyFileSync(vars['_lastDownloadPath'], vars['_lastDownloadPath'] + '.copy');
    console.log('[PREREQ 1] ✓ File copied');
  }

  vars["CurrentDate"] = (() => {
    const d = new Date();
    const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC" };
    const fmt = "dd-MM-yyyy";
    const parts = new Intl.DateTimeFormat('en-US', {
      ...opts,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).formatToParts(d);
    const p = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
    return fmt
      .replace('yyyy', p.year || '')
      .replace('yy', (p.year || '').slice(-2))
      .replace('MM', p.month || '')
      .replace('dd', p.day || '')
      .replace('HH', String(d.getHours()).padStart(2, '0'))
      .replace('hh', p.hour || '')
      .replace('mm', p.minute || '')
      .replace('ss', p.second || '')
      .replace('a', p.dayPeriod || '')
      .replace(/M(?!M)/g, String(parseInt(p.month || '0')))
      .replace(/d(?!d)/g, String(parseInt(p.day || '0')))
      .replace(/h(?!h)/g, String(parseInt(p.hour || '0')));
  })();

  vars["Str1"] = String("TestSigma_") + String(vars["CurrentDate"]);
  vars["Str2"] = String(vars["Str1"]) + String("_SC1");
  vars["ColumnCount"] = "0";
  vars["count"] = "1";
  vars["RowsCountExcel"] = String(excelHelper.getRowCount(vars["File"], "0"));
  console.log('[PREREQ 1] Total rows in Excel: ' + vars["RowsCountExcel"]);

  await page.waitForTimeout(5000);

  while (parseFloat(String(vars["count"])) < parseFloat(String(vars["RowsCountExcel"]))) {
    vars["RandomString"] = Array.from(
      { length: 2 },
      () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        .charAt(Math.floor(Math.random() * 62))
    ).join('');

    vars["RandomNumber"] = String(Math.floor(Math.random() * (999 - 100 + 1)) + 100);
    vars["FormattedLoanNumber"] = vars["Str2"] + "_" + vars["RandomString"] + "_" + vars["RandomNumber"];

    excelHelper.writeCell(
      vars["File"],
      vars["count"],
      vars["ColumnCount"],
      String(vars["FormattedLoanNumber"]),
      "0"
    );
    console.log('[PREREQ 1] ✓ Written loan number: ' + vars["FormattedLoanNumber"] + ' at row ' + vars["count"]);

    vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
  }

  console.log('========== PREREQ 1 COMPLETE: Loan Numbers Updated ==========\n');
}


// ================================================================
// PREREQUISITE 2: Submit for Pricing and Verify Price Offered
// (REG_TS01_TC01)
// ================================================================
export async function prereq_SubmitForPricingAndVerify(
  page: Page,
  vars: Record<string, string>
): Promise<void> {
  console.log('\n========== PREREQ 2 START: Submit For Pricing ==========');

  await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
  console.log('[PREREQ 2] ✓ Logged in');

  await stepGroups.stepGroup_Deleting_Early_Config_Report_If_Present(page, vars);
  console.log('[PREREQ 2] ✓ Early config report deleted if present');

  await stepGroups.stepGroup_Navigating_to_Bulk_Batch_Timing(page, vars);
  console.log('[PREREQ 2] ✓ Navigated to Bulk Batch Timing');

  await stepGroups.stepGroup_Modifying_The_batch_Intervals_with_current_est_time(page, vars);
  console.log('[PREREQ 2] ✓ Batch intervals modified');

  await stepGroups.stepGroup_Navigating_to_Upload_New_Bid_Request(page, vars);
  console.log('[PREREQ 2] ✓ Navigated to Upload New Bid Request');

  await stepGroups.stepGroup_Uploading_Bid_Request(page, vars);
  console.log('[PREREQ 2] ✓ Bid Request uploaded');

  await page.locator("(//select[@aria-label=\"Dropdown selection\"])[3]").selectOption({ index: parseInt("2") });
  vars["ExtractedPrincingReturnTime"] = await page.locator("(//select[@aria-label=\"Dropdown selection\"])[3]").evaluate(el => {
    const s = el as HTMLSelectElement;
    return s.options[s.selectedIndex]?.text || '';
  });
  console.log('[PREREQ 2] ✓ Pricing return time selected: ' + vars["ExtractedPrincingReturnTime"]);

  await page.locator("(//input[@type=\"file\"])[1]").setInputFiles('');
  await page.locator("//span[text()[normalize-space() = \"Upload Bid\"]]").waitFor({ state: 'visible' });
  await page.locator("//span[text()[normalize-space() = \"Upload Bid\"]]").click();
  await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
  console.log('[PREREQ 2] ✓ Bid uploaded');

  await page.getByText("Bid Upload Progress").waitFor({ state: 'visible' });
  await page.locator("//span[text()=\"Continue\"]/..").waitFor({ state: 'visible' });
  await page.locator("//span[text()=\"Continue\"]/..").click();
  await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });

  vars["RequestIDDetails"] = await page.locator("//div[text()=\"Request ID\"]/..//h5").textContent() || '';
  vars["RequestIDDetails"] = String(vars["RequestIDDetails"]).trim();
  console.log('[PREREQ 2] ✓ Request ID captured: ' + vars["RequestIDDetails"]);

  await page.locator("//button/span[text()=\"Submit For Pricing\"]/..").click();
  await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
  await page.locator("//button[@aria-label=\"Yes Submit\"]").click();
  await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
  console.log('[PREREQ 2] ✓ Submitted for pricing');

  // Navigate to Bid Requests list
  await page.locator("//a[@href=\"#/bid-requests\"]").click();
  await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });

  // Wait for status to become "Price Offered"
  console.log('[PREREQ 2] Waiting for status to become "Price Offered"...');
  let isPriceOffered = false;

  while (!isPriceOffered) {
    await page.reload();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").waitFor({ state: 'visible' });
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["RequestIDDetails"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });

    isPriceOffered = await page.locator(
      `//button[contains(text(),"${vars["RequestIDDetails"]}")]/../..//td[@data-title="Status"]//span[contains(text(),"Price Offered")]`
    ).isVisible();

    if (!isPriceOffered) {
      console.log('[PREREQ 2] Status not yet "Price Offered", retrying in 5 seconds...');
      await page.waitForTimeout(5000);
    }
  }

  vars["StatusOnScreen"] = await page.locator(
    `//button[contains(text(),"${vars["RequestIDDetails"]}")]/../..//td[@data-title="Status"]`
  ).textContent() || '';

  console.log('[PREREQ 2] ✓ Final Status: ' + vars["StatusOnScreen"]);
  console.log('========== PREREQ 2 COMPLETE: Price Offered ==========\n');
}


// ================================================================
// COMBINED: Run Both Prerequisites Together
// ================================================================
export async function runAllPrerequisites(
  page: Page,
  vars: Record<string, string>
): Promise<void> {
  console.log('\n========== RUNNING ALL PREREQUISITES ==========');

  // Step 1: Update Loan Numbers in File
  await prereq_UpdateLoanNumbersInFile(page, vars);

  // Step 2: Submit for Pricing and Verify Price Offered
  await prereq_SubmitForPricingAndVerify(page, vars);

  console.log('\n========== ALL PREREQUISITES COMPLETE ==========');
  console.log('[INFO] Request ID: ' + vars["RequestIDDetails"]);
  console.log('[INFO] Status: ' + vars["StatusOnScreen"]);
  console.log('==============================================\n');
}