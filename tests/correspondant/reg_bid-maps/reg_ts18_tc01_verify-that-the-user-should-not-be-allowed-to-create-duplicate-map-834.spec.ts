import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS18_TC01_Verify that the user should not be allowed to create duplicate maps and verify that if the map is deleted then the user should be able to create a new map with the same name.', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//h3[text()[normalize-space() = \"Dashboard\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"Bid Maps\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//h1[text()=\"Mappings\"]")).toBeVisible();
    vars["ExistingBidMapName"] = await page.locator("//table[contains(@class,'table table-hover')]/tbody[1]/tr[1]/td[@data-title=\"Map Name\"]").textContent() || '';
    vars["ExistingBidMapName"] = String(vars["ExistingBidMapName"]).substring(1, String(vars["ExistingBidMapName"]).length - 1);
    await page.locator("//button[text()[normalize-space() = \"Add New Mapping\"]]").click();
    await expect(page.locator("//h5[text()[normalize-space() = \"Create New Map\"]]")).toBeVisible();
    await page.locator("mapName").fill(vars["ExistingBidMapName"]);
    await page.locator("//button[@aria-label=\"Create\"]").click();
    await expect(page.locator("//div[contains(.,'already exists')][last()]")).toBeVisible();
    await page.locator("//i[contains(@class, 'fa-lg') and contains(@class, 'color-primary') and contains(@class, 'fa-times')]").click();
    await page.waitForLoadState('networkidle');
  });
});
