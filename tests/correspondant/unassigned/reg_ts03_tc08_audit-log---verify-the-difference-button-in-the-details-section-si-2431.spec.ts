import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS03_TC08_Audit Log - Verify the difference button in the details section  (Side by side) & (Line by Line). ', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Navigating_to_Customer_Permissions_and_disabling_both_execut(page, vars);
    await stepGroups.stepGroup_Navigating_to_Customer_Permissions_and_enabling_both_executi(page, vars);
    await page.locator("//a[@href=\"#/admin/general-settings/audit-log\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Verifying_the_Audit_Time_and_Date(page, vars);
    await expect(page.locator("//td[@data-title=\"Username\"]")).toContainText("testsigma_internal\t\r");
    await expect(page.locator("//td[@data-title=\"Config Type\"]")).toContainText("Customer Permission Config");
    await page.locator("//tbody[@role=\"rowgroup\"]/tr[1]/td[4]/div[1]/button[1]").click();
    await page.locator("//button[text()[normalize-space() = \"Side by side\"]]").waitFor({ state: 'visible' });
    await expect(page.locator("//button[text()[normalize-space() = \"Side by side\"]]")).toBeVisible();
    await expect(page.locator("//button[text()[normalize-space() = \"Line by line\"]]")).toBeVisible();
    await expect(page.locator("//div[@class=\"d2h-file-side-diff\"]//table")).toBeVisible();
    vars["SidebySideTablesCount"] = String(await page.locator("//div[@class=\"d2h-file-side-diff\"]//table").count());
    expect(String(vars["SidebySideTablesCount"])).toBe("2");
    await expect(page.locator("//span[@class=\"d2h-code-line-ctn\" and contains(text(),\"executionTypes\")]//del[text()=\"]\"]")).toBeVisible();
    await expect(page.locator("//*[text()=\"+\"]/following-sibling::span[contains(text(),\"executionTypes\")]/../../../following-sibling::tr//span[contains(text(),\"STANDARD\")]/../..")).toBeVisible();
    await expect(page.locator("//*[text()=\"+\"]/following-sibling::span[contains(text(),\"executionTypes\")]/../../../following-sibling::tr//span[contains(text(),\"CHASE_DIRECT\")]/../..")).toBeVisible();
    await expect(page.locator("//span[@class=\"d2h-code-line-ctn\" and contains(text(),\"executionTypes\")]//del[text()=\"]\"]")).toHaveCSS('border', "rgba(255, 182, 186, 1)");
    await expect(page.locator("//*[text()=\"+\"]/following-sibling::span[contains(text(),\"executionTypes\")]/../../../following-sibling::tr//span[contains(text(),\"STANDARD\")]/../..")).toHaveCSS('border', "rgba(221, 255, 221, 1)");
    await expect(page.locator("//*[text()=\"+\"]/following-sibling::span[contains(text(),\"executionTypes\")]/../../../following-sibling::tr//span[contains(text(),\"CHASE_DIRECT\")]/../..")).toHaveCSS('border', "rgba(221, 255, 221, 1)");
    await page.locator("//button[text()[normalize-space() = \"Line by line\"]]").click();
    await page.locator("//button[text()[normalize-space() = \"Side by side\"]]").waitFor({ state: 'visible' });
    await expect(page.locator("//button[text()[normalize-space() = \"Line by line\"]]")).toBeVisible();
    await page.locator("//div[@class=\"d2h-file-diff\"]//table").waitFor({ state: 'visible' });
    vars["LineByLineTableCount"] = String(await page.locator("//div[@class=\"d2h-file-diff\"]//table").count());
    expect(String(vars["LineByLineTableCount"])).toBe("1");
    await expect(page.locator("//span[@class=\"d2h-code-line-ctn\" and contains(text(),\"executionTypes\")]//del[text()=\"]\"]")).toHaveCSS('border', "rgba(255, 182, 186, 1)");
    await expect(page.locator("//*[text()=\"+\"]/following-sibling::span[contains(text(),\"executionTypes\")]/../../../following-sibling::tr//span[contains(text(),\"STANDARD\")]/../..")).toHaveCSS('border', "rgba(221, 255, 221, 1)");
    await expect(page.locator("//*[text()=\"+\"]/following-sibling::span[contains(text(),\"executionTypes\")]/../../../following-sibling::tr//span[contains(text(),\"CHASE_DIRECT\")]/../..")).toHaveCSS('border', "rgba(221, 255, 221, 1)");
    await page.locator("//i[contains(@class, 'fa-lg') and contains(@class, 'color-primary') and contains(@class, 'fa-times')]").click();
  });
});
