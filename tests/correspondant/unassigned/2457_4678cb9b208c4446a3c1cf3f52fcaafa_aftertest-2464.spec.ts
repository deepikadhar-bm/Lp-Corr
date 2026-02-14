import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('2457_4678cb9b208c4446a3c1cf3f52fcaafa_aftertest', async ({ page }) => {
    if (true) /* Test Case Result is Failed */ {
      if (true) /* Element Cross Button is visible */ {
        await page.locator("//i[contains(@class, 'fa-lg') and contains(@class, 'color-primary') and contains(@class, 'fa-times')]").click();
      }
      await stepGroups.stepGroup_Navigating_To_Early_Close_Config(page, vars);
      await stepGroups.stepGroup_Deleting_Early_Config_Recordsother_than_today(page, vars);
    }
  });
});
