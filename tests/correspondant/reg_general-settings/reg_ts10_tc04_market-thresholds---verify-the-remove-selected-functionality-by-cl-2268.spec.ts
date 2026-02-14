import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_General Settings', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS10_TC04_Market Thresholds - Verify the Remove selected Functionality by clicking on the Delete Icon', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//a[@href=\"#/admin/general-settings/market-thresholds\"]").click();
    await page.locator("//button[text()[normalize-space() = \"Add New Thresholds\"]]").click();
    await page.locator("//input[@aria-label=\"Enter minimum display value in percentage\"]").waitFor({ state: 'visible' });
    await page.locator("//input[@type=\"text\"]").fill("FN40");
    vars["ExpectedProductCode"] = "FN40";
    await page.locator("//input[@aria-label=\"Enter minimum display value in percentage\"]").fill("1");
    vars["MinDisplayValue"] = "1";
    await page.locator("//input[@aria-label=\"Enter maximum display value in percentage\"]").fill("120");
    vars["MaxDisplayValue"] = "120";
    vars["ExpectedMinBPSValue"] = await page.locator("//input[@aria-label=\"Enter minimum value in BPS\"]").inputValue() || '';
    vars["MaxBPSValue"] = await page.locator("//input[@aria-label=\"Enter maximum value in BPS\"]").inputValue() || '';
    await page.locator("//button[contains(@class, 'fw-bold')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Verify that the element Last Min Display Value displays text contains 1 % and With Scrollable FALSE
    // await expect(page.locator("//td[@data-title=\"Security Product\"]//div[contains(text(),\"$|ExpectedProductCode|\")]/../..//td[@data-title=\"Min Display Value\"]")).toContainText("1 %");
    // [DISABLED] Verify that the element Last Max Display Value(market thresholds) displays text contains 120 % and With Scrollable FALSE
    // await expect(page.locator("//td[@data-title=\"Security Product\"]//div[contains(text(),\"$|ExpectedProductCode|\")]/../..//td[@data-title=\"Max Display Value\"]")).toContainText("120 %");
    // [DISABLED] Verify that the element Last Product Code Value displays text contains ExpectedProductCode and With Scrollable FALSE
    // await expect(page.locator("//td[@data-title=\"Security Product\"]//div[contains(text(),\"$|ExpectedProductCode|\")]/../..//td[@data-title=\"Security Product\"]")).toContainText(vars["ExpectedProductCode"]);
    // [DISABLED] Verify that the element Last Min Value (BPS) displays text contains ExpectedMinBPSValue and With Scrollable FALSE
    // await expect(page.locator("//td[@data-title=\"Security Product\"]//div[contains(text(),\"$|ExpectedProductCode|\")]/../..//td[@data-title=\"Min Value (BPS)\"]")).toContainText(vars["ExpectedMinBPSValue"]);
    // [DISABLED] Verify that the element Last Max Value(BPS) displays text contains MaxBPSValue and With Scrollable FALSE
    // await expect(page.locator("//td[@data-title=\"Security Product\"]//div[contains(text(),\"$|ExpectedProductCode|\")]/../..//td[@data-title=\"Max Value (BPS)\"]")).toContainText(vars["MaxBPSValue"]);
    await page.locator("//td[@data-title=\"Security Product\"]//div[contains(text(),\"$|ExpectedProductCode|\")]/../..//input[@type=\"checkbox\"]").check();
    await expect(page.locator("//td[@data-title=\"Security Product\"]//div[contains(text(),\"$|ExpectedProductCode|\")]/../..//input[@type=\"checkbox\"]")).toBeVisible();
    await expect(page.locator("//button[text()[normalize-space() = \"Remove selected\"]]")).toBeVisible();
    await page.locator("//button[text()[normalize-space() = \"Remove selected\"]]").click();
    await page.locator("//button[@aria-label=\"Yes, Go ahead\"]").waitFor({ state: 'visible' });
    await page.locator("//button[@aria-label=\"Yes, Go ahead\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//td[@data-title=\"Security Product\"]//div[contains(text(),\"$|ExpectedProductCode|\")]/../..//td[@data-title=\"Security Product\"]")).toBeVisible();
  });
});
