import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('2268_13e8b8e54e0e4fe7a60247c957efce9d_aftertest', async ({ page }) => {
    if (true) /* Test Case Result is Failed */ {
      await page.locator("//a[@href=\"#/admin/general-settings/market-thresholds\"]").click();
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      if (true) /* Element Required Threshold Delete Button is visible */ {
        await page.locator("//td[@data-title=\"Security Product\"]//div[contains(text(),\"$|ExpectedProductCode|\")]/../..//button[@aria-label=\"Delete Map\"]").click();
        await page.waitForLoadState('networkidle');
        await page.locator("//button[@aria-label=\"Yes, Go ahead\"]").click();
      }
    }
  });
});
