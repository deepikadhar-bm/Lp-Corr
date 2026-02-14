import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('1808_2c68baa50dc041e285e88a46be2a7296_aftertest', async ({ page }) => {
    if (true) /* Test Case Result is Failed */ {
      await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
      await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
      await page.locator("//a[@href=\"#/admin/general-settings/other-config\"]").click();
      if (String(vars["CommitCorrectionCutOffBefore"]) !== String(vars["CommitCorrectionCutOffAfter"])) {
        await page.locator("//input[@id=\"internalUserCorrectionCutOfHours\"and @type=\"number\"]").clear();
        await page.locator("//input[@id=\"internalUserCorrectionCutOfHours\"and @type=\"number\"]").click();
        await page.locator("//input[@id=\"internalUserCorrectionCutOfHours\"and @type=\"number\"]").fill(vars["CommitCorrectionCutOffBefore"]);
        await page.locator("//button[normalize-space(text())=\"Save changes\" or contains(text(),\"Save Changes\")]").waitFor({ state: 'visible' });
        await page.locator("//button[normalize-space(text())=\"Save changes\" or contains(text(),\"Save Changes\")]").click();
      }
    }
  });
});
