import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_General Settings', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS20_TC03_Email Configuration - Verify the System should not allow Duplicate email entries in add and edit flow', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//a[@href=\"#/admin/general-settings/email-config\"]").click();
    await page.locator("//button[text()[normalize-space() = \"Add Email\"]]").click();
    await page.getByText("Add Internal Recipient").waitFor({ state: 'visible' });
    await page.locator("//input[@id='emailInput']").fill("testsigma@sysla.com");
    vars["DuplicateEmail"] = "testsigma@sysla.com";
    vars["ExpectedEmail"] = vars["DuplicateEmail"];
    await page.locator("//button[@aria-label=\"Save\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//button[@aria-label=\"Close\"]").click();
    // [DISABLED] Verify that the current page displays an element Last Email Record and With Scrollable FALSE
    // await expect(page.locator("(//td[@data-title=\"Email\"])[last()]")).toBeVisible();
    await expect(page.locator("(//td[@data-title=\"Email\"])[last()]")).toContainText("testsigma@sysla.com");
    await page.locator("//button[text()[normalize-space() = \"Add Email\"]]").click();
    await page.getByText("Add Internal Recipient").waitFor({ state: 'visible' });
    await page.locator("//input[@id='emailInput']").fill("testsigma@sysla.com");
    vars["ExpectedEmail"] = "testsigma@sysla.com";
    await page.locator("//button[@aria-label=\"Save\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.getByText("Internal recipients must be unique.").waitFor({ state: 'visible' });
    await page.locator("//button[@aria-label=\"Close\"]").click();
    // [DISABLED] Verifying the Last Modified Data In the Right corner screen
    // await stepGroups.stepGroup_Verifying_the_Last_Modified_Data_In_the_Right_corner_screen(page, vars);
    await page.locator("//tbody[@role=\"rowgroup\"]/tr[last()]/td[2]/button[1]/i[1]").click();
    vars["DuplicateEmail"] = await page.locator("//input[@id='emailInput']").textContent() || '';
    await page.locator("//input[@id='emailInput']").fill(String("DuplicateEmail"));
    await expect(page.locator("//button[@aria-label=\"Save\"]")).toBeVisible();
    await page.locator("//i[contains(@class, 'fa-lg') and contains(@class, 'color-primary') and contains(@class, 'fa-times')]").click();
    await page.locator("(//td[@data-title=\"Email\" and contains(text(),\"$|ExpectedEmail|\")])/..//button[2]").click();
    await page.locator("//button[contains(@aria-label,\"Yes, Go ahead.\")]").waitFor({ state: 'visible' });
    await page.locator("//button[contains(@aria-label,\"Yes, Go ahead.\")]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Verifying the Last Modified Data In the Right corner screen
    // await stepGroups.stepGroup_Verifying_the_Last_Modified_Data_In_the_Right_corner_screen(page, vars);
  });
});
