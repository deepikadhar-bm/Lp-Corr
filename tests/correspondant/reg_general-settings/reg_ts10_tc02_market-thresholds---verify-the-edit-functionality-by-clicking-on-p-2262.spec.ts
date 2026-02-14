import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_General Settings', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS10_TC02_Market Thresholds - Verify the Edit functionality by clicking on Pencil Icon', async ({ page }) => {
    // Prerequisite: REG_TS10_TC01_Market Thresholds - Verify the Add New Threshold Functionality
    // TODO: Ensure prerequisite test passes first

    await page.locator("//td[@data-title=\"Security Product\"]//div[contains(text(),\"$|ExpectedProductCode|\")]/../..//button[@aria-label=\"Edit Map\"]").click();
    await page.locator("//input[@aria-label=\"Enter minimum display value in percentage\"]").waitFor({ state: 'visible' });
    await page.locator("//input[@type=\"text\"]").fill("FN50");
    vars["ExpectedProductCode"] = "FN50";
    await page.locator("//input[@aria-label=\"Enter minimum display value in percentage\"]").fill("2");
    vars["MinDisplayValue"] = "2";
    await page.locator("//input[@aria-label=\"Enter maximum display value in percentage\"]").fill("12");
    vars["MaxDisplayValue"] = "12";
    vars["ExpectedMinBPSValue"] = await page.locator("//input[@aria-label=\"Enter minimum value in BPS\"]").inputValue() || '';
    vars["MaxBPSValue"] = await page.locator("//input[@aria-label=\"Enter maximum value in BPS\"]").inputValue() || '';
    await page.locator("//span[contains(text(),\"Update Threshold\")]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//td[@data-title=\"Security Product\"]//div[contains(text(),\"$|ExpectedProductCode|\")]/../..//td[@data-title=\"Min Display Value\"]")).toContainText("2 %");
    await expect(page.locator("//td[@data-title=\"Security Product\"]//div[contains(text(),\"$|ExpectedProductCode|\")]/../..//td[@data-title=\"Max Display Value\"]")).toContainText("12 %");
    await expect(page.locator("//td[@data-title=\"Security Product\"]//div[contains(text(),\"$|ExpectedProductCode|\")]/../..//td[@data-title=\"Security Product\"]")).toContainText(vars["ExpectedProductCode"]);
    await expect(page.locator("//td[@data-title=\"Security Product\"]//div[contains(text(),\"$|ExpectedProductCode|\")]/../..//td[@data-title=\"Min Value (BPS)\"]")).toContainText(vars["ExpectedMinBPSValue"]);
    await expect(page.locator("//td[@data-title=\"Security Product\"]//div[contains(text(),\"$|ExpectedProductCode|\")]/../..//td[@data-title=\"Max Value (BPS)\"]")).toContainText(vars["MaxBPSValue"]);
  });
});
