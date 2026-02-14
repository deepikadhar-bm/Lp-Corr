import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('1057_88b2a04aa3334f26b423573dc579c726_aftertest', async ({ page }) => {
    if (true) /* Test Case Result is Failed */ {
      await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
      await page.locator("//span[text()[normalize-space() = \"Bid Maps\"]]").click();
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      await stepGroups.stepGroup_Deleting_All_Advanced_Search_Bid_Maps(page, vars);
    }
  });
});
