import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';
import * as excelHelper from '../../../src/helpers/excel-helpers';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS14_TC02_Verify the data present in bid detail screen by selecting chase execution type', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Deleting_Early_Config_Report_If_Present(page, vars);
    await stepGroups.stepGroup_Navigating_to_Bulk_Batch_Timing(page, vars);
    vars["BufferTime"] = await page.locator("//input[@id=\"pricingReturnTimeBuffer\"]").inputValue() || '';
    await stepGroups.stepGroup_Navigating_to_Upload_New_Bid_Request(page, vars);
    await stepGroups.stepGroup_Upload_Bid_Request_For_Next_Business_Day_With_Chase_Direct_E(page, vars);
    if (true) /* Element Second Enabled Time is visible */ {
      await stepGroups.stepGroup_Selecting_Second_Enabled_Batch_Time_If_the_Condition_is_fail(page, vars);
      // [DISABLED] Scroll to the element Enabled Time New into view
      // await page.locator("(//option[@aria-disabled=\"false\"])").scrollIntoViewIfNeeded();
      // [DISABLED] Click on Enabled Time New
      // await page.locator("(//option[@aria-disabled=\"false\"])").click();
    } else {
      await stepGroups.stepGroup_Navigating_to_Bulk_Batch_Timing(page, vars);
      await stepGroups.stepGroup_Modifying_Batch_Intervals_For_next_bussiness_day(page, vars);
      await stepGroups.stepGroup_Navigating_to_Upload_New_Bid_Request(page, vars);
      await stepGroups.stepGroup_Upload_Bid_Request_For_Next_Business_Day_With_Chase_Direct_E(page, vars);
      await stepGroups.stepGroup_Selecting_Second_Enabled_Batch_Time_If_the_Condition_is_fail(page, vars);
      // [DISABLED] Scroll to the element Enabled Date into view
      // await page.locator("//option[@aria-disabled=\"false\"]").scrollIntoViewIfNeeded();
      // [DISABLED] Click on Enabled Date
      // await page.locator("//option[@aria-disabled=\"false\"]").click();
    }
    vars["CurrentESTDate"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC-05:00" };
      const fmt = "MM/dd/yyyy";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    vars["CurrentEstTime"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC-05:00" };
      const fmt = "hh:mm a";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    await page.locator("//label[text()=\"Bid Requested Date\"]").click();
    await page.locator("(//input[@type=\"file\"])[1]").setInputFiles(path.resolve(__dirname, 'test-data', "Bid_Valid_file.xlsx,Bid_Valid_file.xlsx"));
    vars["LoanNumberFromExcel"] = excelHelper.readCell(path.resolve(__dirname, 'test-data', "Bid_Valid_file.xlsx,Bid_Valid_file.xlsx"), "2", "1");
    vars["SelectedCompanyName"] = await page.locator("(//*[@id=\"selectCompanyDropdown\"]//button)[1]").textContent() || '';
    vars["SelectedLockTerm"] = await page.locator("(//select[contains(normalize-space(),\"Select 3 7 15\")])[2]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
    vars["SelectedBidMappingId"] = await page.locator("//button//div[text()=' @|BidMappingID| ']").textContent() || '';
    vars["SelectedBatchTime"] = await page.locator("(//select[@aria-label=\"Dropdown selection\"])[3]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
    await expect(page.locator("//span[text()[normalize-space() = \"Upload Bid\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Upload Bid\"]]").click();
    await page.locator("//div[@class=\"modal-header\"]/div/h5").waitFor({ state: 'visible' });
    await expect(page.locator("//div[@class=\"modal-header\"]/div/h5")).toContainText("Bid Upload Progress");
    await page.locator("//span[text()=\"Continue\"]/..").waitFor({ state: 'visible' });
    await expect(page.locator("//span[text()=\"Continue\"]/..")).toBeVisible();
    await expect(page.locator("(//td[@data-title=\"Status\"]//span)[position() >=1 and position() <=5]")).toContainText("Success");
    await page.locator("//span[text()=\"Continue\"]/..").click();
    await expect(page.locator("(//td[@data-title=\"Corr. Loan#\"]//button[1])[last()]")).toContainText(vars["LoanNumberFromExcel"]);
    await expect(page.locator("//div[text()=\"CCode\"]/..//h5")).toContainText(testData["Ccode for freedom"]);
    await expect(page.locator("//div[text()=\"Company\"]/..//h5")).toContainText(vars["SelectedCompanyName"]);
    vars["RequestIdDetails"] = await page.locator("//div[text()=\"Request ID\"]/..//h5").textContent() || '';
    vars["RequestIdDetails"] = String(vars["RequestIdDetails"]).trim();
    vars[""] = String('').length.toString();
    expect(String(vars["RequestIdCount"])).toBe("12");
    if (true) /* Verify that the element Bid Status From Details displays tex */ {
    } else {
      await expect(page.locator("//div[text()=\"Status\"]/..//h5")).toContainText("Processing Failed");
    }
    await expect(page.locator("//h5[contains(@aria-label,\"Execution Type\") and text()=\" CD($|SelectedLockTerm|d) \"]")).toBeVisible();
    vars["BidValueTableHeader"] = await page.locator("//h5[@aria-labelledby=\"bidValueLabel\"]").textContent() || '';
    vars["ExpectedBidValueParsedRow"] = (parseFloat(String(vars["BidValueTableHeader"])) / parseFloat(String("1000"))).toFixed(2);
    await expect(page.locator("//div[text()=\"Total Bid Value\"]/..//h5")).toContainText(vars["ExpectedBidValueParsedRow"]);
    vars["LoansTableHeader"] = await page.locator("//h5[@aria-labelledby=\"totalLoanRowsLabel\"]").textContent() || '';
    vars["LoansTableHeader"] = String(vars["LoansTableHeader"]).trim();
    vars["LoansDataParsedRow"] = await page.locator("//h5[@aria-label=\"Total Loan Rows\"]").textContent() || '';
    vars["LoansDataParsedRow"] = String(vars["LoansDataParsedRow"]).trim();
    expect(String(vars["LoansDataParsedRow"])).toBe(vars["LoansTableHeader"]);
    await stepGroups.stepGroup_Getting_Next_Bussiness_day_by_handling_weekend(page, vars);
    await expect(page.locator("//div[@id=\"page-footer\"]//span[@class=\"d-block\"]")).toContainText(vars["CurrentESTDate"]);
    vars["CurrentEstPlusOneMin"] = (() => {
      const d = new Date('2000-01-01 ' + String(vars["CurrentEstTime"]));
      d.setMinutes(d.getMinutes() + parseInt(String("1")));
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }); // Format: hh:mm a
    })();
    vars["CurrentEstUnitAfterAddition"] = String(vars["CurrentEstPlusOneMin"]).substring(6);
    vars["CurrentEstHourMinAfterAddition"] = String(vars["CurrentEstPlusOneMin"]).substring(0, String(vars["CurrentEstPlusOneMin"]).length - 3);
    vars["CurrentEstTimeUnit"] = String(vars["CurrentEstTime"]).substring(6);
    vars["CurrentEstHourMin"] = String(vars["CurrentEstTime"]).substring(0, String(vars["CurrentEstTime"]).length - 3);
    if (true) /* Verify that the element Footer Submission Date displays text */ {
      await expect(page.locator("//div[@id=\"page-footer\"]//span[@class=\"d-block\"]")).toContainText(vars["CurrentEstTimeUnit"]);
    } else {
      await expect(page.locator("//div[@id=\"page-footer\"]//span[@class=\"d-block\"]")).toContainText(vars["CurrentEstHourMinAfterAddition"]);
      await expect(page.locator("//div[@id=\"page-footer\"]//span[@class=\"d-block\"]")).toContainText(vars["CurrentEstUnitAfterAddition"]);
    }
    await expect(page.locator("//div[@id=\"page-footer\"]//span[contains(text(),\"Queued For\")]")).toContainText(vars["NextBusinessDate"]);
    vars[""] = (() => {
      const d = new Date('2000-01-01 ' + String(''));
      d.setMinutes(d.getMinutes() - parseInt(String('')));
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    })();
    await expect(page.locator("//div[@id=\"page-footer\"]//span[contains(text(),\"Queued For\")]")).toContainText(vars["SelectedBatchTimeWithoutBuffer"]);
    await expect(page.locator("//div[@id=\"page-footer\"]//span[contains(text(),\"Queued For\")]")).toContainText("ET");
    await expect(page.locator("//div[@id=\"page-footer\"]//span[@class=\"d-block\"]")).toContainText("ET");
  });
});
