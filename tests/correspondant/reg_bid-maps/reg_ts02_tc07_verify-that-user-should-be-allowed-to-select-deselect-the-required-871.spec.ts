import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS02_TC07_Verify that user should be allowed to select / deselect the required fields via individual fields.Allow users to enable / disable the checkboxes / header values.', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Creation_Of_Bid_Map_Upto_Header_Mapping(page, vars);
    await expect(page.locator("(//input[@type=\"checkbox\"])[2]")).toBeEnabled();
    await page.locator("(//input[@type=\"checkbox\"])[2]").check();
    await expect(page.locator("//span[text()[normalize-space() = \"Save Draft & Exit\"]]")).toBeVisible();
    await expect(page.locator("(//input[@type=\"checkbox\"])[3]")).toBeEnabled();
    await page.locator("(//input[@type=\"checkbox\"])[3]").check();
    await page.locator("(//input[@type=\"checkbox\"])[2]").uncheck();
    await page.locator("(//input[@type=\"checkbox\"])[3]").uncheck();
    await expect(page.locator("(//input[@type=\"checkbox\"])[2]")).toBeVisible();
    await expect(page.locator("(//input[@type=\"checkbox\"])[3]")).toBeVisible();
  });
});
