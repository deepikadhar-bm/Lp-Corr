import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('2362_a6767b7b1d8041a8902c5e9d47207f6b_aftertest', async ({ page }) => {
    if (true) /* Test Case Result is Failed */ {
      // [DISABLED] Clear the existing text from Company Name Input(Company Config) and enter CompanyBeforeEdit
      // await page.locator("//input[@aria-label=\"Company Name\"]").fill(String(vars["CompanyBeforeEdit"]));
      // [DISABLED] Clear the existing text from Internal User Username Replacement Input and enter InternalUserNameBeforeEdit
      // await page.locator("//input[@aria-label=\"Internal User Username Replacement\"]").fill(String(vars["InternalUserNameBeforeEdit"]));
      await page.locator("//span[text()=\"upload\"]/..//input").setInputFiles(path.resolve(__dirname, 'test-data', "logo.png,logo.png"));
      if (true) /* Element Save Settings is enabled */ {
        await page.locator("//div[contains(@class, 'scrollable-page')]/div[1]/app-general-settings-container[1]/div[2]/div[1]/div[2]/app-company-config-container[1]/app-company-config[1]/div[2]//button").click();
        await page.getByText("Company config updated successfully!").waitFor({ state: 'visible' });
        await page.locator("//span[text()[normalize-space() = \"Ok\"]]").waitFor({ state: 'visible' });
        await page.locator("//span[text()[normalize-space() = \"Ok\"]]").click();
      }
    }
  });
});
