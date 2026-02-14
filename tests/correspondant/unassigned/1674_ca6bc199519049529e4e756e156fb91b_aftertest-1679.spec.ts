import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('1674_ca6bc199519049529e4e756e156fb91b_aftertest', async ({ page }) => {
    if (true) /* Test Case Result is Failed */ {
      await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
      await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
      await page.locator("//a[@href=\"#/admin/general-settings/early-close-config\"]").click();
      if (true) /* Element Delete Button(Early Conf) is visible */ {
        await page.locator("//button[@aria-label=\"Delete\"]//span").click();
        await page.locator("//button[@aria-label=\"Yes, Delete\"]").click();
        await page.reload();
        await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
        await expect(page.getByText("No result")).toBeVisible();
      }
    }
  });
});
