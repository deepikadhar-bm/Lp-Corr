import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('2342_7f932dae20c443e7adc05b4919df045d_aftertest', async ({ page }) => {
    if (true) /* Test Case Result is Failed */ {
      await page.locator("//input[@aria-label=\"Company Name\"]").fill(String(vars["CompanyBeforeEdit"]));
      await page.locator("//input[@aria-label=\"Internal User Username Replacement\"]").fill(String(vars["InternalUserNameBeforeEdit"]));
      if (true) /* Element Save Settings is enabled */ {
        await page.locator("//div[contains(@class, 'scrollable-page')]/div[1]/app-general-settings-container[1]/div[2]/div[1]/div[2]/app-company-config-container[1]/app-company-config[1]/div[2]//button").click();
        await page.getByText("Company config updated successfully!").waitFor({ state: 'visible' });
        await page.locator("//span[text()[normalize-space() = \"Ok\"]]").waitFor({ state: 'visible' });
        await page.locator("//span[text()[normalize-space() = \"Ok\"]]").click();
      }
    }
  });
});
