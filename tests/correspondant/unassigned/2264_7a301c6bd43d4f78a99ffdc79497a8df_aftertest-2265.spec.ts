import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('2264_7a301c6bd43d4f78a99ffdc79497a8df_aftertest', async ({ page }) => {
    if (true) /* Test Case Result is Failed */ {
      await page.locator("//a[@href=\"#/admin/general-settings/market-thresholds\"]").click();
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      if (true) /* Element Required Threshold Delete Button is visible */ {
        await page.locator("//td[@data-title=\"Security Product\"]//div[contains(text(),\"$|ExpectedProductCode|\")]/../..//button[@aria-label=\"Delete Map\"]").click();
        await page.locator("//i[contains(@class,\"trash-alt\")]/ancestor::button").click();
        await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
        await expect(page.locator("//td[@data-title=\"Security Product\"]//div[contains(text(),\"$|ExpectedProductCode|\")]/../..//button[@aria-label=\"Delete Map\"]")).toBeVisible();
      }
    }
  });
});
