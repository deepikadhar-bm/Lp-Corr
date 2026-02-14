import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_General Settings', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS15_TC02_Company Config - Verify by changing the timezone.and verified the last Modified date, time and user data', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Reports\"]]").click();
    await page.locator("//a[@href=\"#/reports/reports-bid-requests\"]//span[text()[normalize-space() = \"Bid Requests\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["UploadedTimeBeforeEdit"] = await page.locator("//td[@data-title=\"Upload Time\"]//div[contains(@aria-label,\"Value\")]").textContent() || '';
    vars["UploadedTimeBeforeEdit"] = String(vars["UploadedTimeBeforeEdit"]).trim();
    vars[""] = (() => {
      const d = new Date('2000-01-01 ' + String(''));
      d.setMinutes(d.getMinutes() - parseInt(String('')));
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    })();
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//a[@href=\"#/admin/general-settings/company-config\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//button[@aria-label=\"Toggle dropdown\"]").click();
    // [DISABLED] Store text from the element Company Name Input(Company Config) into a variable CompanyBeforeEdit
    // vars["CompanyBeforeEdit"] = await page.locator("//input[@aria-label=\"Company Name\"]").textContent() || '';
    await page.locator("//div[@role=\"listbox\"]//button[@role=\"option\"]//span[contains(text(),\"America/Los_Angeles\")]").scrollIntoViewIfNeeded();
    await page.locator("//div[@role=\"listbox\"]//button[@role=\"option\"]//span[contains(text(),\"America/Los_Angeles\")]").click();
    await expect(page.locator("//button[@aria-label=\"Toggle dropdown\"]")).toContainText("America/Los_Angeles");
    await page.locator("//div[contains(@class, 'scrollable-page')]/div[1]/app-general-settings-container[1]/div[2]/div[1]/div[2]/app-company-config-container[1]/app-company-config[1]/div[2]//button").waitFor({ state: 'visible' });
    await page.locator("//div[contains(@class, 'scrollable-page')]/div[1]/app-general-settings-container[1]/div[2]/div[1]/div[2]/app-company-config-container[1]/app-company-config[1]/div[2]//button").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Ok\"]]").click();
    await stepGroups.stepGroup_Verifying_the_Last_Modified_Data_In_the_Right_corner_screen(page, vars);
    // [DISABLED] Store text from the element Internal User Username Replacement Input into a variable InternalUserNameBeforeEdit
    // vars["InternalUserNameBeforeEdit"] = await page.locator("//input[@aria-label=\"Internal User Username Replacement\"]").textContent() || '';
    await page.locator("//span[text()[normalize-space() = \"Reports\"]]").click();
    await page.locator("//a[@href=\"#/reports/reports-bid-requests\"]//span[text()[normalize-space() = \"Bid Requests\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["UploadedTimeAfterEdit"] = await page.locator("//td[@data-title=\"Upload Time\"]//div[contains(@aria-label,\"Value\")]").textContent() || '';
    vars["ActualUploadedTime"] = String(vars["UploadedTimeAfterEdit"]).trim();
    expect(String(vars["ExpectedUploadedTime"])).toBe(vars["ActualUploadedTime"]);
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//a[@href=\"#/admin/general-settings/company-config\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//button[@aria-label=\"Toggle dropdown\"]").click();
    await page.locator("//div[@role=\"listbox\"]//button[@role=\"option\"]//span[contains(text(),\"America/New_York\")]").scrollIntoViewIfNeeded();
    await page.locator("//div[@role=\"listbox\"]//button[@role=\"option\"]//span[contains(text(),\"America/New_York\")]").click();
    await expect(page.locator("//button[@aria-label=\"Toggle dropdown\"]")).toContainText("America/New_York");
    await page.locator("//div[contains(@class, 'scrollable-page')]/div[1]/app-general-settings-container[1]/div[2]/div[1]/div[2]/app-company-config-container[1]/app-company-config[1]/div[2]//button").waitFor({ state: 'visible' });
    await page.locator("//div[contains(@class, 'scrollable-page')]/div[1]/app-general-settings-container[1]/div[2]/div[1]/div[2]/app-company-config-container[1]/app-company-config[1]/div[2]//button").click();
  });
});
