import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('2109_f16479d679004b83b611f3237a0d2fea_aftertest', async ({ page }) => {
    if (true) /* Test Case Result is Failed */ {
      if (true) /* Element CrossButton [Edit Customer Permissions] is visible */ {
        await page.locator("//i[contains(@class, 'fa-lg') and contains(@class, 'color-primary') and contains(@class, 'fa-times')]").click();
        await page.locator("//i[contains(@class, 'fa-lg') and contains(@class, 'color-primary') and contains(@class, 'fa-times')]").waitFor({ state: 'hidden' });
      }
      await stepGroups.stepGroup_Toggling_the_Radio_Button_based_on_previous_state(page, vars);
      await stepGroups.stepGroup_Toggling_the_Radio_Button_based_on_previous_state(page, vars);
    }
  });
});
