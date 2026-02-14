import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_General Settings', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS14_TC02_Commitment timer - Verify the Last Modified date, time and user get displayed in the screen.', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.waitForLoadState('networkidle');
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//a[@href=\"#/admin/general-settings/commitment-timer\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["MinutesBeforeEdit"] = await page.locator("//input[@aria-label=\"Internal User Minutes\"]").inputValue() || '';
    vars["NewMinToEnter"] = String(Math.floor(Math.random() * (4 - 1 + 1)) + 1);
    while (String(vars["NewMinToEnter"]) === String(vars["MinutesBeforeEdit"])) {
      vars["NewMinToEnter"] = String(Math.floor(Math.random() * (4 - 1 + 1)) + 1);
    }
    await page.locator("//input[@aria-label=\"Internal User Minutes\"]").clear();
    await page.locator("//input[@aria-label=\"Internal User Minutes\"]").fill(vars["NewMinToEnter"]);
    await page.locator("//button[normalize-space(text())=\"Save changes\" or contains(text(),\"Save Changes\")]").waitFor({ state: 'visible' });
    await page.locator("//button[normalize-space(text())=\"Save changes\" or contains(text(),\"Save Changes\")]").click();
    await page.waitForLoadState('networkidle');
    await stepGroups.stepGroup_Verifying_the_Last_Modified_Data_In_the_Right_corner_screen(page, vars);
    await page.locator("//input[@aria-label=\"Internal User Minutes\"]").fill(String(vars["MinutesBeforeEdit"]));
    await page.locator("//button[normalize-space(text())=\"Save changes\" or contains(text(),\"Save Changes\")]").waitFor({ state: 'visible' });
    await page.locator("//button[normalize-space(text())=\"Save changes\" or contains(text(),\"Save Changes\")]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
  });
});
