import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS15_TC06_Company Config - Verify the User making the Changes, in the Input of the Internal User Username Replacement, whether it is get Reflected in the Commitment letter', async ({ page }) => {
    // Prerequisite: REG_TS02_TC01_Updating the Loan Numbers In File
    // TODO: Ensure prerequisite test passes first

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//a[@href=\"#/admin/general-settings/company-config\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["UserName"] = await page.locator("//input[@aria-label=\"Internal User Username Replacement\"]").inputValue() || '';
    await page.locator("//input[@aria-label=\"Internal User Username Replacement\"]").click();
    vars["UsernameUpdated"] = "Username_tesing";
    await page.locator("//input[@aria-label=\"Internal User Username Replacement\"]").fill(String(vars["UsernameUpdated"]));
    await page.locator("//div[contains(@class, 'scrollable-page')]/div[1]/app-general-settings-container[1]/div[2]/div[1]/div[2]/app-company-config-container[1]/app-company-config[1]/div[2]//button").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Ok\"]]").click();
  });
});
