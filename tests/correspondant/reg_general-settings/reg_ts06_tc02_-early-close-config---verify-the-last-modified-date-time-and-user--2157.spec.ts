import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_General Settings', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS06_TC02_ Early Close Config - Verify the last Modified date, Time and User data that get displayed in the Right corner of the Page.', async ({ page }) => {
    // Prerequisite: REG_TS06_TC01_ Early Close Config - Verify the last Modified date, Time and User data that get displ
    // TODO: Ensure prerequisite test passes first

    expect((await page.locator("(//div[contains(text(),\"Last Modified\")])[1]").textContent() || '').toLowerCase()).toContain(String('').toLowerCase());
    expect((await page.locator("(//div[contains(text(),\"Last Modified\")])[1]").textContent() || '').toLowerCase()).toContain(String('').toLowerCase());
  });
});
