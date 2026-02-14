import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_General Settings', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS10_TC01_Market Thresholds - Verify the Add New Threshold Functionality', async ({ page }) => {
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
    await expect(page.locator("//td[@data-title=\"Security Product\"]//div[contains(text(),\"$|ExpectedProductCode|\")]/../..//td[@data-title=\"Min Display Value\"]")).toContainText("1 %");
    await expect(page.locator("//td[@data-title=\"Security Product\"]//div[contains(text(),\"$|ExpectedProductCode|\")]/../..//td[@data-title=\"Max Display Value\"]")).toContainText("120 %");
    await expect(page.locator("//td[@data-title=\"Security Product\"]//div[contains(text(),\"$|ExpectedProductCode|\")]/../..//td[@data-title=\"Security Product\"]")).toContainText(vars["ExpectedProductCode"]);
    await expect(page.locator("//td[@data-title=\"Security Product\"]//div[contains(text(),\"$|ExpectedProductCode|\")]/../..//td[@data-title=\"Min Value (BPS)\"]")).toContainText(vars["ExpectedMinBPSValue"]);
    await expect(page.locator("//td[@data-title=\"Security Product\"]//div[contains(text(),\"$|ExpectedProductCode|\")]/../..//td[@data-title=\"Max Value (BPS)\"]")).toContainText(vars["MaxBPSValue"]);
  });
});
