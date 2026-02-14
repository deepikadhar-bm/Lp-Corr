import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('2394_e438cc480b0249e5a5bbaa24f64d8aad_aftertest', async ({ page }) => {
    if (true) /* Test Case Result is Failed */ {
      await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
      await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
      await page.locator("//a[@href=\"#/admin/general-settings/company-config\"]").click();
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      await page.locator("//input[@aria-label=\"Company Name\"]").fill(String(vars["CompanyNameBeforeEdit"]));
      if (true) /* Element Save Settings is enabled */ {
        await page.locator("//div[contains(@class, 'scrollable-page')]/div[1]/app-general-settings-container[1]/div[2]/div[1]/div[2]/app-company-config-container[1]/app-company-config[1]/div[2]//button").click();
        await page.getByText("Company config updated successfully!").waitFor({ state: 'visible' });
        await page.locator("//span[text()[normalize-space() = \"Ok\"]]").waitFor({ state: 'visible' });
        await page.locator("//span[text()[normalize-space() = \"Ok\"]]").click();
      }
    }
  });
});
