import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_General Settings', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS15_TC04_Company Config - Verify the User making changes in the input of the Name, and Check whether it is get Reflected in the other Modules or Not. => Bid Maps., Commitment Timer.', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//a[@href=\"#/admin/general-settings/company-config\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["CompanyNameBeforeEdit"] = await page.locator("//input[@aria-label=\"Company Name\"]").inputValue() || '';
    await page.locator("//input[@aria-label=\"Company Name\"]").fill(String("Chase_Testing"));
    vars[""] = String("Chase_Testing") + ' ' + String("Field Name");
    await page.locator("//div[contains(@class, 'scrollable-page')]/div[1]/app-general-settings-container[1]/div[2]/div[1]/div[2]/app-company-config-container[1]/app-company-config[1]/div[2]//button").waitFor({ state: 'visible' });
    await page.locator("//div[contains(@class, 'scrollable-page')]/div[1]/app-general-settings-container[1]/div[2]/div[1]/div[2]/app-company-config-container[1]/app-company-config[1]/div[2]//button").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Ok\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"Bid Maps\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//button[@class=\"text-primary pointer border-0 bg-transparent\"]").click();
    await page.locator("//a[text()[normalize-space() = \"Header Mapping\"]]").waitFor({ state: 'visible' });
    await page.locator("//a[text()[normalize-space() = \"Header Mapping\"]]").click();
    vars["ChaseFieldNameAfterEdit"] = await page.locator("//div[text()=\"Select\"]/following-sibling::div[text()=\"Bid Sample Field Name\"]/following-sibling::div[1]").textContent() || '';
    expect(String(vars["ExpectedChaseFieldName"])).toBe(vars["ChaseFieldNameAfterEdit"]);
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//a[@href=\"#/admin/general-settings/company-config\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//input[@aria-label=\"Company Name\"]").fill(String(vars["CompanyNameBeforeEdit"]));
    await page.locator("//div[contains(@class, 'scrollable-page')]/div[1]/app-general-settings-container[1]/div[2]/div[1]/div[2]/app-company-config-container[1]/app-company-config[1]/div[2]//button").waitFor({ state: 'visible' });
    await page.locator("//div[contains(@class, 'scrollable-page')]/div[1]/app-general-settings-container[1]/div[2]/div[1]/div[2]/app-company-config-container[1]/app-company-config[1]/div[2]//button").click();
    await page.getByText("Company config updated successfully!").waitFor({ state: 'visible' });
    await page.locator("//span[text()[normalize-space() = \"Ok\"]]").click();
  });
});
