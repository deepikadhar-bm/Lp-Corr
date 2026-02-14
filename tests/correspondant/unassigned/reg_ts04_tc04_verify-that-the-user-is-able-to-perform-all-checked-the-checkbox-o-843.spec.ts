import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS04_TC04_Verify that the user is able to perform all Checked the checkbox  operations in the header mapping.', async ({ page }) => {
    // Prerequisite: REG_TS04_TC03_Verify that the user is able to perform all Delete operations in the header mapping.
    // TODO: Ensure prerequisite test passes first

    await page.locator("(//input[@type=\"checkbox\"])[2]").check();
    await page.locator("(//input[@type=\"checkbox\"])[3]").check();
    await expect(page.locator("//span[text()='Enumeration Mapping']")).toBeVisible();
  });
});
