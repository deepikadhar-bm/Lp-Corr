import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS01_TC01_Verify Default Data Load and Graph Updates', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.waitForLoadState('networkidle');
    await expect(page.locator("//h3[text()[normalize-space() = \"Dashboard\"]]")).toBeVisible();
    await expect(page.locator("//a[@role=\"button\" and contains(@class, 'd-flex')]")).toContainText("Current Day");
    await expect(page.locator("//button[@id='multiSelectDropDown']")).toContainText("All Companies");
    await expect(page.locator("//div[text()[normalize-space() = \"Total # commitments\"]]")).toBeVisible();
    await expect(page.locator("//div[text()[normalize-space() = \"Total # loan value\"]]")).toBeVisible();
    await expect(page.locator("//div[text()[normalize-space() = \"SLA Accuracy\"]]")).toBeVisible();
  });
});
