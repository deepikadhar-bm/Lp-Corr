import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('2241_bbc18427981b44f1a90cdc0da0be4153_aftertest', async ({ page }) => {
    if (true) /* Test Case Result is Failed */ {
      if (true) /* Element Cross Button is visible */ {
        await page.locator("//i[contains(@class, 'fa-lg') and contains(@class, 'color-primary') and contains(@class, 'fa-times')]").click();
      }
      if (true) /* Element Delete Button Early Config(Next Day) is visible */ {
        await stepGroups.stepGroup_Delete_early_config(page, vars);
      }
    }
  });
});
