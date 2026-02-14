import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS09_TC08_Audit Log - Verify the difference button in the details section  (Side by side) & (Line by Line).', async ({ page }) => {
    // Prerequisite: REG_TS09_TC05.2_Bid Request - Make Changes in the Pricing Modes, and check whether it is get reflect
    // TODO: Ensure prerequisite test passes first

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
    await page.locator("//a[@href=\"#/admin/general-settings/audit-log\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Verifying_the_Audit_Time_and_Date(page, vars);
    await stepGroups.stepGroup_Verifying_the_Username_and_Config_Type_in_Audit_List_Screen(page, vars);
    await stepGroups.stepGroup_Verifying_the_side_by_side_data_in_see_difference_pop_upAudi(page, vars);
    await expect(page.locator("(//div[@class=\"d2h-file-side-diff\"]//table)[1]")).toContainText("pricingModeType\": \"REALTIME");
    await expect(page.locator("(//td[@class=\"d2h-del d2h-change\"]//span[@class=\"d2h-code-line-ctn\"])[1]")).toContainText("\"enabled\":");
    await expect(page.locator("(//td[@class=\"d2h-del d2h-change\"]//span[@class=\"d2h-code-line-ctn\"])[1]//del")).toContainText("true");
    await expect(page.locator("(//td[@class=\"d2h-del d2h-change\"]//span[@class=\"d2h-code-line-ctn\"])[1]//del")).toHaveCSS('border', "rgba(255, 182, 186, 1)");
    await expect(page.locator("(//div[@class=\"d2h-file-side-diff\"]//table)[1]")).toContainText("pricingModeType\": \"REALTIME");
    await expect(page.locator("(//td[@class=\"d2h-ins d2h-change\"]//span[@class=\"d2h-code-line-ctn\"])[1]")).toContainText("\"enabled\":");
    await expect(page.locator("(//td[@class=\"d2h-ins d2h-change\"]//span[@class=\"d2h-code-line-ctn\"])[1]//ins")).toContainText("false");
    await expect(page.locator("(//td[@class=\"d2h-ins d2h-change\"]//span[@class=\"d2h-code-line-ctn\"])[1]//ins")).toHaveCSS('border', "rgba(151, 242, 149, 1)");
    await stepGroups.stepGroup_Verifying_the_Line_by_line_data_in_see_difference_pop_upAudi(page, vars);
    await expect(page.locator("//div[@class=\"d2h-file-diff\"]//table")).toContainText("pricingModeType\": \"REALTIME");
    await expect(page.locator("(//td[@class=\"d2h-del d2h-change\"]//span[@class=\"d2h-code-line-ctn\"])[1]")).toContainText("\"enabled\":");
    await expect(page.locator("(//td[@class=\"d2h-del d2h-change\"]//span[@class=\"d2h-code-line-ctn\"])[1]//del")).toContainText("true");
    await expect(page.locator("(//td[@class=\"d2h-del d2h-change\"]//span[@class=\"d2h-code-line-ctn\"])[1]//del")).toHaveCSS('border', "rgba(255, 182, 186, 1)");
    await expect(page.locator("(//td[@class=\"d2h-ins d2h-change\"]//span[@class=\"d2h-code-line-ctn\"])[1]")).toContainText("\"enabled\":");
    await expect(page.locator("(//td[@class=\"d2h-ins d2h-change\"]//span[@class=\"d2h-code-line-ctn\"])[1]//ins")).toContainText("false");
    await expect(page.locator("(//td[@class=\"d2h-ins d2h-change\"]//span[@class=\"d2h-code-line-ctn\"])[1]//ins")).toHaveCSS('border', "rgba(151, 242, 149, 1)");
    await page.locator("//i[contains(@class, 'fa-lg') and contains(@class, 'color-primary') and contains(@class, 'fa-times')]").click();
  });
});
