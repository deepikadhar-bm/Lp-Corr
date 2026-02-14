import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('2383_7c7cf68ee94f416a9976cb0a7a503083_aftertest', async ({ page }) => {
    if (true) /* Test Case Result is Failed */ {
      await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
      await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
      await page.locator("//a[@href=\"#/admin/general-settings/company-config\"]").click();
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      await page.locator("//button[@aria-label=\"Toggle dropdown\"]").click();
      await page.locator("//div[@role=\"listbox\"]//button[@role=\"option\"]//span[contains(text(),\"America/New_York\")]").scrollIntoViewIfNeeded();
      await page.locator("//div[@role=\"listbox\"]//button[@role=\"option\"]//span[contains(text(),\"America/New_York\")]").click();
      await expect(page.locator("//button[@aria-label=\"Toggle dropdown\"]")).toContainText("America/New_York");
      if (true) /* Element Save Settings is enabled */ {
        await page.locator("//div[contains(@class, 'scrollable-page')]/div[1]/app-general-settings-container[1]/div[2]/div[1]/div[2]/app-company-config-container[1]/app-company-config[1]/div[2]//button").click();
        await page.getByText("Company config updated successfully!").waitFor({ state: 'visible' });
        await page.locator("//span[text()[normalize-space() = \"Ok\"]]").waitFor({ state: 'visible' });
        await page.locator("//span[text()[normalize-space() = \"Ok\"]]").click();
      }
    }
  });
});
