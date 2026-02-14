import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_General Settings', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS15_TC03_Company Config - Verify by changing the Company Logo', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//a[@href=\"#/admin/general-settings/company-config\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()=\"upload\"]/..//input").click();
    await page.locator("//span[text()=\"upload\"]/..//input").setInputFiles(path.resolve(__dirname, 'test-data', "Newlogo.png,Newlogo.png"));
    await page.locator("//div[contains(@class, 'scrollable-page')]/div[1]/app-general-settings-container[1]/div[2]/div[1]/div[2]/app-company-config-container[1]/app-company-config[1]/div[2]//button").waitFor({ state: 'visible' });
    await page.locator("//div[contains(@class, 'scrollable-page')]/div[1]/app-general-settings-container[1]/div[2]/div[1]/div[2]/app-company-config-container[1]/app-company-config[1]/div[2]//button").click();
    await page.getByText("Company config updated successfully!").waitFor({ state: 'visible' });
    await page.locator("//span[text()[normalize-space() = \"Ok\"]]").click();
    await stepGroups.stepGroup_Verifying_the_Last_Modified_Data_In_the_Right_corner_screen(page, vars);
    await page.locator("//span[text()=\"upload\"]/..//input").setInputFiles(path.resolve(__dirname, 'test-data', "logo.png,logo.png"));
    await page.locator("//div[contains(@class, 'scrollable-page')]/div[1]/app-general-settings-container[1]/div[2]/div[1]/div[2]/app-company-config-container[1]/app-company-config[1]/div[2]//button").waitFor({ state: 'visible' });
    await page.locator("//div[contains(@class, 'scrollable-page')]/div[1]/app-general-settings-container[1]/div[2]/div[1]/div[2]/app-company-config-container[1]/app-company-config[1]/div[2]//button").click();
    await page.getByText("Company config updated successfully!").waitFor({ state: 'visible' });
    await page.locator("//span[text()[normalize-space() = \"Ok\"]]").click();
  });
});
