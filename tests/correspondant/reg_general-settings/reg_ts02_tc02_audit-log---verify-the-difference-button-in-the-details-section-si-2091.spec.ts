import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_General Settings', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS02_TC02_Audit Log - Verify the difference button in the details section  (Side by side) & (Line by Line).', async ({ page }) => {
    // Prerequisite: REG_TS02_TC01_Global Restrictions - Update the configs for both chase and standard
    // TODO: Ensure prerequisite test passes first

    // [DISABLED] Login to CORR Portal
    // await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    // [DISABLED] Click on Administration_Menu
    // await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    // [DISABLED] Click on GeneralSettings_Menu
    // await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    // [DISABLED] Wait until the element Spinner is not visible
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[@href=\"#/admin/general-settings/audit-log\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//td[@data-title=\"Created\"]")).toContainText(vars["ExpectedTimeAudit"]);
    await expect(page.locator("//td[@data-title=\"Username\"]")).toContainText("testsigma_internal\t\r");
    await expect(page.locator("//td[@data-title=\"Config Type\"]")).toContainText("Global Restrictions Config");
    await page.locator("//tbody[@role=\"rowgroup\"]/tr[1]/td[4]/div[1]/button[1]").click();
    await page.locator("//button[text()[normalize-space() = \"Side by side\"]]").waitFor({ state: 'visible' });
    await expect(page.locator("//button[text()[normalize-space() = \"Side by side\"]]")).toBeVisible();
    await expect(page.locator("//button[text()[normalize-space() = \"Line by line\"]]")).toBeVisible();
    await expect(page.locator("//div[@class=\"d2h-file-side-diff\"]//table")).toBeVisible();
    vars["SidebySideTablesCount"] = String(await page.locator("//div[@class=\"d2h-file-side-diff\"]//table").count());
    expect(String(vars["SidebySideTablesCount"])).toBe("2");
    await expect(page.locator("//td[@class=\"d2h-del d2h-change\"]//span[contains(text(),\"dynamicPricing\" )]")).toContainText(vars["StandardPreviousDataExp"]);
    await expect(page.locator("//td[@class=\"d2h-del d2h-change\"]//span[contains(text(),\"executionTypeFastPath\" )]")).toContainText(vars["ChasePreviousDataExp"]);
    await expect(page.locator("//td[@class=\"d2h-del d2h-change\"]//span[contains(text(),\"dynamicPricing\" )]//del")).toHaveCSS('border', "rgba(255, 182, 186, 1)");
    await expect(page.locator("//td[@class=\"d2h-del d2h-change\"]//span[contains(text(),\"executionTypeFastPath\" )]//del")).toHaveCSS('border', "rgba(255, 182, 186, 1)");
    await expect(page.locator("//td[@class=\"d2h-ins d2h-change\"]//span[contains(text(),\"executionTypeFastPath\" )]//ins")).toContainText(vars["ChaseNewDataExp"]);
    await expect(page.locator("//td[@class=\"d2h-ins d2h-change\"]//span[contains(text(),\"dynamicPricing\" )]//ins")).toContainText(vars["StandardNewDataExp"]);
    await expect(page.locator("//td[@class=\"d2h-ins d2h-change\"]//span[contains(text(),\"dynamicPricing\" )]//ins")).toHaveCSS('border', "rgba(151, 242, 149, 1)");
    await expect(page.locator("//td[@class=\"d2h-ins d2h-change\"]//span[contains(text(),\"executionTypeFastPath\" )]//ins")).toHaveCSS('border', "rgba(151, 242, 149, 1)");
    await page.locator("//button[text()[normalize-space() = \"Line by line\"]]").click();
    await page.locator("//button[text()[normalize-space() = \"Side by side\"]]").waitFor({ state: 'visible' });
    await expect(page.locator("//button[text()[normalize-space() = \"Line by line\"]]")).toBeVisible();
    await page.locator("//div[@class=\"d2h-file-diff\"]//table").waitFor({ state: 'visible' });
    vars["LineByLineTableCount"] = String(await page.locator("//div[@class=\"d2h-file-diff\"]//table").count());
    expect(String(vars["LineByLineTableCount"])).toBe("1");
    await stepGroups.stepGroup_Verification_of_see_difference_pop_up_data(page, vars);
    await page.locator("//i[contains(@class, 'fa-lg') and contains(@class, 'color-primary') and contains(@class, 'fa-times')]").click();
  });
});
