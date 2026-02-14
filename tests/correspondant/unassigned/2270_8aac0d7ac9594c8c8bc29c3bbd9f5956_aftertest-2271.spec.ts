import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('2270_8aac0d7ac9594c8c8bc29c3bbd9f5956_aftertest', async ({ page }) => {
    if (true) /* Test Case Result is Failed */ {
      await page.locator("//a[@href=\"#/admin/general-settings/early-close-config\"]").click();
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      await stepGroups.stepGroup_Deleting_Early_Config_Recordsother_than_today(page, vars);
    }
  });
});
