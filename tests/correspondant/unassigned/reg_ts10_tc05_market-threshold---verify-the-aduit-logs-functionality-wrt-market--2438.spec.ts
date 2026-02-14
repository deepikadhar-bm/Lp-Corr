import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS10_TC05_Market Threshold - Verify the aduit logs functionality wrt Market threshold', async ({ page }) => {
    // Prerequisite: REG_TS10_TC01_Market Thresholds - Verify the Add New Threshold Functionality
    // TODO: Ensure prerequisite test passes first

    await page.locator("//td[@data-title=\"Security Product\"]//div[contains(text(),\"$|ExpectedProductCode|\")]/../..//button[@aria-label=\"Edit Map\"]").click();
    await page.locator("//input[@aria-label=\"Enter minimum display value in percentage\"]").waitFor({ state: 'visible' });
    // [DISABLED] Enter FN50 in the Enter product code Input field
    // await page.locator("//input[@type=\"text\"]").fill("FN50");
    // [DISABLED] Store FN50 in ExpectedProductCode
    // vars["ExpectedProductCode"] = "FN50";
    vars["ExpectedPreviousData"] = await page.locator("//input[@aria-label=\"Enter minimum display value in percentage\"]").inputValue() || '';
    // [DISABLED] Enter 2 in the Enter minimum display value in percentage field
    // await page.locator("//input[@aria-label=\"Enter minimum display value in percentage\"]").fill("2");
    await page.locator("//input[@aria-label=\"Enter minimum display value in percentage\"]").fill(String("2"));
    vars["ExpectedNewData"] = "2";
    // [DISABLED] Enter 12 in the Enter maximum display value in percentage Input field
    // await page.locator("//input[@aria-label=\"Enter maximum display value in percentage\"]").fill("12");
    // [DISABLED] Store 12 in MaxDisplayValue
    // vars["MaxDisplayValue"] = "12";
    // [DISABLED] Store the value displayed in the text box Enter minimum value in BPS Input field into a variable ExpectedMinBPSValue
    // vars["ExpectedMinBPSValue"] = await page.locator("//input[@aria-label=\"Enter minimum value in BPS\"]").inputValue() || '';
    // [DISABLED] Store the value displayed in the text box Enter maximum value in BPS Input field into a variable MaxBPSValue
    // vars["MaxBPSValue"] = await page.locator("//input[@aria-label=\"Enter maximum value in BPS\"]").inputValue() || '';
    await page.locator("//span[contains(text(),\"Update Threshold\")]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//td[@data-title=\"Security Product\"]//div[contains(text(),\"$|ExpectedProductCode|\")]/../..//td[@data-title=\"Min Display Value\"]")).toContainText("2 %");
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
    await expect(page.locator("(//td[@class=\"d2h-del d2h-change\"]//span[@class=\"d2h-code-line-ctn\"])[1]")).toContainText("minValue");
    await expect(page.locator("(//td[@class=\"d2h-del d2h-change\"]//span[@class=\"d2h-code-line-ctn\"])[1]//del")).toContainText(vars["ExpectedPreviousData"]);
    await expect(page.locator("(//td[@class=\"d2h-ins d2h-change\"]//span[@class=\"d2h-code-line-ctn\"])[1]")).toContainText("minValue");
    await expect(page.locator("(//td[@class=\"d2h-ins d2h-change\"]//span[@class=\"d2h-code-line-ctn\"])[1]//ins")).toContainText(vars["ExpectedNewData"]);
    await stepGroups.stepGroup_Verifying_the_Line_by_line_data_in_see_difference_pop_upAudi(page, vars);
    await expect(page.locator("(//td[@class=\"d2h-del d2h-change\"]//span[@class=\"d2h-code-line-ctn\"])[1]")).toContainText("minValue");
    await expect(page.locator("(//td[@class=\"d2h-del d2h-change\"]//span[@class=\"d2h-code-line-ctn\"])[1]//del")).toContainText(vars["ExpectedPreviousData"]);
    await expect(page.locator("(//td[@class=\"d2h-ins d2h-change\"]//span[@class=\"d2h-code-line-ctn\"])[1]")).toContainText("minValue");
    await expect(page.locator("(//td[@class=\"d2h-ins d2h-change\"]//span[@class=\"d2h-code-line-ctn\"])[1]//ins")).toContainText(vars["ExpectedNewData"]);
    await page.locator("//i[contains(@class, 'fa-lg') and contains(@class, 'color-primary') and contains(@class, 'fa-times')]").click();
  });
});
