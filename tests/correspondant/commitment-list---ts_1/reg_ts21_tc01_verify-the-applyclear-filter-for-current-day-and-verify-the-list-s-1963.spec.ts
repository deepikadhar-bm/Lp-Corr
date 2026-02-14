import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Commitment List - TS_1', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS21_TC01_Verify the Apply/Clear filter for current day and Verify the list should display the records from current day only', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//div[normalize-space()=\"Closed List\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Selecting_Date_from_the_filters_by_fetching_the_first_comm_d(page, vars);
    await page.locator("//div[contains(@class, \"justify-content-end\")]//button[text()=\"Apply Filters\"]").click();
    if (true) /* Element Go to Next Page Button is enabled */ {
      vars["CountofPages"] = "2";
    } else {
      vars["CountofPages"] = "1";
    }
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["CountofPages"]))) {
      vars["ActualCommDate"] = await page.locator("//div[contains(@aria-label,\"Committed Date:\")]").textContent() || '';
      for (let i = 0; i < await page.locator("//div[contains(@aria-label,\"Committed Date:\")]").count(); i++) {
        await expect(page.locator("//div[contains(@aria-label,\"Committed Date:\")]").nth(i)).toHaveText(String(vars["ExpectedCommDate"]));
      }
      if (true) /* Element Go to Next Page Button is enabled */ {
        await page.locator("//button[@aria-label=\"Go to Next Page\"]//span").click();
        await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      }
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    await page.locator("//input[@aria-label=\"Select all for \" and @type=\"checkbox\"]").check();
    vars["ExportSelectedCountAfterApplyingFilters"] = await page.locator("//span[contains(text(),\"Export Selected\")]//following-sibling::span").textContent() || '';
    vars["ExportSelectedCountAfterApplyingFilters"] = String(vars["ExportSelectedCountAfterApplyingFilters"]).replace(/\(\)/g, '');
    await page.locator("//button[contains(@aria-label,\"Remove Date:\")]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Date\")]")).toBeVisible();
    await page.locator("//input[@aria-label=\"Select all for \" and @type=\"checkbox\"]").check();
    vars["ExportSelectedCountAfterRemovingFilters"] = await page.locator("//span[contains(text(),\"Export Selected\")]//following-sibling::span").textContent() || '';
    vars["ExportSelectedCountAfterRemovingFilters"] = String(vars["ExportSelectedCountAfterRemovingFilters"]).replace(/\(\)/g, '');
    expect(String(vars["ExportSelectedCountAfterRemovingFilters"])).toBe(vars["ExportSelectedCountAfterApplyingFilters"]);
    await stepGroups.stepGroup_Selecting_Date_from_the_filters_by_fetching_the_first_comm_d(page, vars);
    await page.locator("//div[contains(@class, \"justify-content-end\")]//button[text()=\"Apply Filters\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//input[@aria-label=\"Select all for \" and @type=\"checkbox\"]").check();
    await page.waitForTimeout(3000);
    vars["ExportSelectedCountAfterApplyingFilters"] = await page.locator("//span[contains(text(),\"Export Selected\")]//following-sibling::span").textContent() || '';
    vars["ExportSelectedCountAfterApplyingFilters"] = String(vars["ExportSelectedCountAfterApplyingFilters"]).replace(/\(\)/g, '');
    await page.locator("//button[@aria-label=\"Clear all filters\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Date\")]")).toBeVisible();
    await page.locator("//input[@aria-label=\"Select all for \" and @type=\"checkbox\"]").check();
    await page.waitForTimeout(3000);
    vars["ExportSelectedCountAfterRemovingFilters"] = await page.locator("//span[contains(text(),\"Export Selected\")]//following-sibling::span").textContent() || '';
    vars["ExportSelectedCountAfterRemovingFilters"] = String(vars["ExportSelectedCountAfterRemovingFilters"]).replace(/\(\)/g, '');
    expect(String(vars["ExportSelectedCountAfterRemovingFilters"])).toBe(vars["ExportSelectedCountAfterApplyingFilters"]);
  });
});
