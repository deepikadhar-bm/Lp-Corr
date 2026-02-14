import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_General Settings', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS10_TC03_Market Thresholds - Verify the  delete Functionality by clicking on the Delete Icon', async ({ page }) => {
    // Prerequisite: REG_TS10_TC02_Market Thresholds - Verify the Edit functionality by clicking on Pencil Icon
    // TODO: Ensure prerequisite test passes first

    await page.locator("//a[@href=\"#/admin/general-settings/market-thresholds\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Security Product\"]//div[contains(text(),\"$|ExpectedProductCode|\")]/../..//button[@aria-label=\"Delete Map\"]").click();
    await page.locator("//i[contains(@class,\"trash-alt\")]/ancestor::button").waitFor({ state: 'visible' });
    await page.locator("//i[contains(@class,\"trash-alt\")]/ancestor::button").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//td[@data-title=\"Security Product\"]//div[contains(text(),\"$|ExpectedProductCode|\")]/../..//button[@aria-label=\"Delete Map\"]")).toBeVisible();
  });
});
