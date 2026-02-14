import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_General Settings', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS15_TC01_Company Config - Verify the User can add/ edit  the Values in the Inputs. ', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//a[@href=\"#/admin/general-settings/company-config\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//input[@aria-label=\"Company Name\"]").click();
    // [DISABLED] Store text from the element Company Name Input(Company Config) into a variable CompanyBeforeEdit
    // vars["CompanyBeforeEdit"] = await page.locator("//input[@aria-label=\"Company Name\"]").textContent() || '';
    vars["CompanyBeforeEdit"] = await page.locator("//input[@aria-label=\"Company Name\"]").inputValue() || '';
    await page.locator("//input[@aria-label=\"Company Name\"]").fill(String("Company_Testing"));
    vars["CompanyPreviousDataExp"] = "Company_Testing";
    await page.locator("//div[contains(@class, 'scrollable-page')]/div[1]/app-general-settings-container[1]/div[2]/div[1]/div[2]/app-company-config-container[1]/app-company-config[1]/div[2]//button").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Ok\"]]").click();
    await stepGroups.stepGroup_Verifying_the_Last_Modified_Data_In_the_Right_corner_screen(page, vars);
    vars["InternalUserNameBeforeEdit"] = await page.locator("//input[@aria-label=\"Internal User Username Replacement\"]").inputValue() || '';
    // [DISABLED] Store text from the element Internal User Username Replacement Input into a variable InternalUserNameBeforeEdit
    // vars["InternalUserNameBeforeEdit"] = await page.locator("//input[@aria-label=\"Internal User Username Replacement\"]").textContent() || '';
    await page.locator("//input[@aria-label=\"Internal User Username Replacement\"]").fill(String("InternalUser_Testing"));
    vars["InternalUserPreviousDataExp"] = "InternalUser_Testing";
    await page.locator("//div[contains(@class, 'scrollable-page')]/div[1]/app-general-settings-container[1]/div[2]/div[1]/div[2]/app-company-config-container[1]/app-company-config[1]/div[2]//button").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Ok\"]]").click();
    await stepGroups.stepGroup_Verifying_the_Last_Modified_Data_In_the_Right_corner_screen(page, vars);
    await page.locator("//input[@aria-label=\"Company Name\"]").fill(String(vars["CompanyBeforeEdit"]));
    vars["CompanyNewDataExp"] = vars["CompanyBeforeEdit"];
    await page.locator("//input[@aria-label=\"Internal User Username Replacement\"]").fill(String(vars["InternalUserNameBeforeEdit"]));
    vars["InternalUserNewDataExp"] = vars["InternalUserNameBeforeEdit"];
    await page.locator("//div[contains(@class, 'scrollable-page')]/div[1]/app-general-settings-container[1]/div[2]/div[1]/div[2]/app-company-config-container[1]/app-company-config[1]/div[2]//button").waitFor({ state: 'visible' });
    await page.locator("//div[contains(@class, 'scrollable-page')]/div[1]/app-general-settings-container[1]/div[2]/div[1]/div[2]/app-company-config-container[1]/app-company-config[1]/div[2]//button").click();
    await page.getByText("Company config updated successfully!").waitFor({ state: 'visible' });
    await page.locator("//span[text()[normalize-space() = \"Ok\"]]").click();
  });
});
