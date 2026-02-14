import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('2215_0525c1ab8f0948959e16c24504242922_aftertest', async ({ page }) => {
    if (true) /* Test Case Result is Failed */ {
      await stepGroups.stepGroup_Navigating_To_Bid_Request_Config(page, vars);
      await page.locator("//input[@id=\"pricingMode-0-off\"]").check();
      await page.locator("//input[@id=\"pricingMode-1-on\"]").check();
      await page.waitForLoadState('networkidle');
      if (true) /* Element Save Changes Button is enabled */ {
        await page.locator("//button[text()=\"Save Changes\"]").click();
      }
    }
  });
});
