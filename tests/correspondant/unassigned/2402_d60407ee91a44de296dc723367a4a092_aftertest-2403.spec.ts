import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('2402_d60407ee91a44de296dc723367a4a092_aftertest', async ({ page }) => {
    if (true) /* Test Case Result is Failed */ {
      await page.locator("//input[@aria-label=\"Internal User Minutes\"]").fill(String(vars["MinutesBeforeEdit"]));
      await page.locator("//button[normalize-space(text())=\"Save changes\" or contains(text(),\"Save Changes\")]").waitFor({ state: 'visible' });
      await page.locator("//button[normalize-space(text())=\"Save changes\" or contains(text(),\"Save Changes\")]").click();
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    }
  });
});
