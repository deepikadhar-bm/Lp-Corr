import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('904_f8203f694aa348eab99a5b0d28fbc085_aftertest', async ({ page }) => {
    if (true) /* Test Case Result is Failed */ {
      await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
      await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
      await page.waitForLoadState('networkidle');
      await page.locator("//a[@href=\"#/admin/general-settings/batch-timing\"]\n").click();
      await page.waitForLoadState('networkidle');
      await stepGroups.stepGroup_Modifying_The_Batch_Intervals(page, vars);
    }
  });
});
