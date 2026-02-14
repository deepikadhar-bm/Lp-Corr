import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS06_TC05_Early Close Config -Audit Log - Verify the difference button in the details section  (Side by side) & (Line by Line).', async ({ page }) => {
    // [DISABLED] Enter FN50 in the Enter product code Input field
    // await page.locator("//input[@type=\"text\"]").fill("FN50");
    // [DISABLED] Store FN50 in ExpectedProductCode
    // vars["ExpectedProductCode"] = "FN50";
    // [DISABLED] Enter 2 in the Enter minimum display value in percentage field
    // await page.locator("//input[@aria-label=\"Enter minimum display value in percentage\"]").fill("2");
    // [DISABLED] Enter 12 in the Enter maximum display value in percentage Input field
    // await page.locator("//input[@aria-label=\"Enter maximum display value in percentage\"]").fill("12");
    // [DISABLED] Store 12 in MaxDisplayValue
    // vars["MaxDisplayValue"] = "12";
    // [DISABLED] Store the value displayed in the text box Enter minimum value in BPS Input field into a variable ExpectedMinBPSValue
    // vars["ExpectedMinBPSValue"] = await page.locator("//input[@aria-label=\"Enter minimum value in BPS\"]").inputValue() || '';
    // [DISABLED] Store the value displayed in the text box Enter maximum value in BPS Input field into a variable MaxBPSValue
    // vars["MaxBPSValue"] = await page.locator("//input[@aria-label=\"Enter maximum value in BPS\"]").inputValue() || '';
    // [DISABLED] Verify that the element Required Max Display Value displays text contains 12 % and With Scrollable FALSE
    // await expect(page.locator("//td[@data-title=\"Security Product\"]//div[contains(text(),\"$|ExpectedProductCode|\")]/../..//td[@data-title=\"Max Display Value\"]")).toContainText("12 %");
    // [DISABLED] Verify that the element Required Product Code Value displays text contains ExpectedProductCode and With Scrollable FALSE
    // await expect(page.locator("//td[@data-title=\"Security Product\"]//div[contains(text(),\"$|ExpectedProductCode|\")]/../..//td[@data-title=\"Security Product\"]")).toContainText(vars["ExpectedProductCode"]);
    // [DISABLED] Verify that the element Required Min Value (BPS) displays text contains ExpectedMinBPSValue and With Scrollable FALSE
    // await expect(page.locator("//td[@data-title=\"Security Product\"]//div[contains(text(),\"$|ExpectedProductCode|\")]/../..//td[@data-title=\"Min Value (BPS)\"]")).toContainText(vars["ExpectedMinBPSValue"]);
    // [DISABLED] Verify that the element Last Max Value(BPS) displays text contains MaxBPSValue and With Scrollable FALSE
    // await expect(page.locator("//td[@data-title=\"Security Product\"]//div[contains(text(),\"$|ExpectedProductCode|\")]/../..//td[@data-title=\"Max Value (BPS)\"]")).toContainText(vars["MaxBPSValue"]);
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.waitForLoadState('networkidle');
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").waitFor({ state: 'visible' });
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await stepGroups.stepGroup_Creating_an_Early_Config_Record(page, vars);
    vars["TimeHour"] = String('').split(":")["0"] || '';
    vars["TimeHour"] = (() => {
      const d = new Date(String(vars["TimeHour"]));
      const _p = { yyyy: String(d.getFullYear()), yy: String(d.getFullYear()).slice(-2), MM: String(d.getMonth()+1).padStart(2,'0'), M: String(d.getMonth()+1), dd: String(d.getDate()).padStart(2,'0'), d: String(d.getDate()), HH: String(d.getHours()).padStart(2,'0'), hh: String(d.getHours()%12||12).toString().padStart(2,'0'), h: String(d.getHours()%12||12), mm: String(d.getMinutes()).padStart(2,'0'), ss: String(d.getSeconds()).padStart(2,'0'), a: d.getHours() >= 12 ? 'PM' : 'AM' };
      return "h".replace('yyyy',_p.yyyy).replace('yy',_p.yy).replace('MM',_p.MM).replace('dd',_p.dd).replace('HH',_p.HH).replace('hh',_p.hh).replace('mm',_p.mm).replace('ss',_p.ss).replace(/a/g,_p.a).replace(/M(?!M)/g,_p.M).replace(/d(?!d)/g,_p.d).replace(/h(?!h)/g,_p.h);
    })();
    vars["TimeMin"] = String('').split(":")["1"] || '';
    await stepGroups.stepGroup_Deleting_Early_Config_Recordsother_than_today(page, vars);
    await page.locator("//a[@href=\"#/admin/general-settings/audit-log\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Verifying_the_Audit_Time_and_Date(page, vars);
    await stepGroups.stepGroup_Verifying_the_Username_and_Config_Type_in_Audit_List_Screen(page, vars);
    await stepGroups.stepGroup_Verifying_the_side_by_side_data_in_see_difference_pop_upAudi(page, vars);
    vars["ExpectedCreationDate"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC-05:00" };
      const fmt = "yyyy-MM-dd";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    // [DISABLED] Concate "date": " and TomorrowsDateInput with Space and store into a variable ExpectedDate
    // vars[""] = String("\"date\": \"") + ' ' + String(vars["TomorrowsDateInput"]);
    vars["TomorrowsDateInput"] = String('') + String('');
    await expect(page.locator("(//div[@class=\"d2h-file-side-diff\"]//table)[1]")).toContainText(vars["ExpectedDate"]);
    await expect(page.locator("(//div[@class=\"d2h-file-side-diff\"]//table)[1]")).toContainText("\"commitCreationCutOffTime\": null,");
    await expect(page.locator("(//div[@class=\"d2h-file-side-diff\"]//table)[1]")).toContainText("\"lastBatchTime\": {");
    // [DISABLED] Store key_blank in Space
    // vars["Space"] = "key_blank";
    // [DISABLED] Store StringFunctions :: Concat in ExpectedTimeHour
    // vars["ExpectedTimeHour"] = "\"hours\":" + vars["Space"] + vars["TimeHour"] + ",";
    vars[""] = String("\"hours\":") + ' ' + String(vars["TimeHour"]);
    vars[","] = String('') + String('');
    vars[""] = String("\"minutes\":") + ' ' + String(vars["TimeMin"]);
    await expect(page.locator("(//div[@class=\"d2h-file-side-diff\"]//table)[1]")).toContainText(vars["ExpectedTimeHour"]);
    await expect(page.locator("(//div[@class=\"d2h-file-side-diff\"]//table)[1]")).toContainText(vars["ExpectedTimeMin"]);
    await expect(page.locator("(//div[@class=\"d2h-file-side-diff\"]//table)[1]")).toContainText("\"createdBy\": \"testsigma_internal\",");
    vars["ExpectedCreationDate"] = String('') + String('');
    await expect(page.locator("(//div[@class=\"d2h-file-side-diff\"]//table)[1]")).toContainText(vars["ExpectedCreationDate"]);
    await expect(page.locator("(//div[@class=\"d2h-file-side-diff\"]//table)[1]")).toContainText("\"modifiedBy\": \"testsigma_internal\",");
    vars["ExpectedModifiedTime"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC-05:00" };
      const fmt = "yyyy-MM-dd";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    vars["ExpectedModifiedTime"] = String('') + String('');
    await expect(page.locator("(//div[@class=\"d2h-file-side-diff\"]//table)[1]")).toContainText(vars["ExpectedModifiedTime"]);
    // [DISABLED] Verify that the element Previous Data Text(Side by Side) displays text contains "enabled": and With Scrollable FALSE
    // await expect(page.locator("(//td[@class=\"d2h-del d2h-change\"]//span[@class=\"d2h-code-line-ctn\"])[1]")).toContainText("\"enabled\":");
    // [DISABLED] Verify that the element Previous Data Change Text(Side by Side) displays text contains true and With Scrollable FALSE
    // await expect(page.locator("(//td[@class=\"d2h-del d2h-change\"]//span[@class=\"d2h-code-line-ctn\"])[1]//del")).toContainText("true");
    // [DISABLED] Verify that the element Side by Side Previous Data (Early Config) displays rgba(255, 182, 186, 1) for css property name background-color and With Scrollable FALSE
    // await expect(page.locator("(//td[@class=\"d2h-del d2h-change\"]//span[@class=\"d2h-code-line-ctn\"])/../..")).toHaveCSS('border', "rgba(255, 182, 186, 1)");
    await expect(page.locator("(//td[@class=\"d2h-del d2h-change\"]//span[@class=\"d2h-code-line-ctn\"])/../..")).toHaveCSS('border', "rgba(254, 232, 233, 1)");
    // [DISABLED] Verify that the text pricingModeType": "REALTIME is present in the table element Side by side (Previous data table) and With Scrollable FALSE
    // await expect(page.locator("(//div[@class=\"d2h-file-side-diff\"]//table)[1]")).toContainText("pricingModeType\": \"REALTIME");
    await expect(page.locator("(//td[@class=\"d2h-ins d2h-change\"]//span[@class=\"d2h-code-line-ctn\"])[1]")).toContainText("{}");
    // [DISABLED] Verify that the element New Data Change Text (Side by Side) displays text contains false and With Scrollable FALSE
    // await expect(page.locator("(//td[@class=\"d2h-ins d2h-change\"]//span[@class=\"d2h-code-line-ctn\"])[1]//ins")).toContainText("false");
    await expect(page.locator("(//td[@class=\"d2h-ins d2h-change\"]//span[@class=\"d2h-code-line-ctn\"])[1]//ins")).toHaveCSS('border', "rgba(151, 242, 149, 1)");
    await stepGroups.stepGroup_Verifying_the_Line_by_line_data_in_see_difference_pop_upAudi(page, vars);
    // [DISABLED] Verify that the text pricingModeType": "REALTIME is present in the table element Line by line Table and With Scrollable FALSE
    // await expect(page.locator("//div[@class=\"d2h-file-diff\"]//table")).toContainText("pricingModeType\": \"REALTIME");
    // [DISABLED] Verify that the element Previous Data Text(Side by Side) displays text contains "enabled": and With Scrollable FALSE
    // await expect(page.locator("(//td[@class=\"d2h-del d2h-change\"]//span[@class=\"d2h-code-line-ctn\"])[1]")).toContainText("\"enabled\":");
    // [DISABLED] Verify that the element Previous Data Change Text(Side by Side) displays text contains true and With Scrollable FALSE
    // await expect(page.locator("(//td[@class=\"d2h-del d2h-change\"]//span[@class=\"d2h-code-line-ctn\"])[1]//del")).toContainText("true");
    await expect(page.locator("(//td[@class=\"d2h-del d2h-change\"]//span[@class=\"d2h-code-line-ctn\"])[1]//del")).toHaveCSS('border', "rgba(255, 182, 186, 1)");
    await expect(page.locator("(//td[@class=\"d2h-ins d2h-change\"]//span[@class=\"d2h-code-line-ctn\"])[1]")).toContainText("{}");
    // [DISABLED] Verify that the element New Data Change Text (Side by Side) displays text contains false and With Scrollable FALSE
    // await expect(page.locator("(//td[@class=\"d2h-ins d2h-change\"]//span[@class=\"d2h-code-line-ctn\"])[1]//ins")).toContainText("false");
    await expect(page.locator("(//td[@class=\"d2h-ins d2h-change\"]//span[@class=\"d2h-code-line-ctn\"])[1]//ins")).toHaveCSS('border', "rgba(151, 242, 149, 1)");
    await page.locator("//i[contains(@class, 'fa-lg') and contains(@class, 'color-primary') and contains(@class, 'fa-times')]").click();
    await stepGroups.stepGroup_Navigating_To_Early_Close_Config(page, vars);
    await stepGroups.stepGroup_Deleting_Early_Config_Recordsother_than_today(page, vars);
  });
});
