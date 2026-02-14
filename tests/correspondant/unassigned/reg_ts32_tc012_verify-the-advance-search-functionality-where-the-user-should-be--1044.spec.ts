import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS32_TC01.2_Verify the advance search functionality, where the user should be able to perform search action based on the rules and actions.[Advance Search for Actions]', async ({ page }) => {
    // Prerequisite: REG_TS32_TC01_Verify the advance search functionality, where the user should be able to perform sear
    // TODO: Ensure prerequisite test passes first

    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Advance_Search_For_Actions(page, vars);
    await expect(page.locator("(//td//button[text()=\" $|BidMapName1| \"])")).toBeVisible();
    await expect(page.locator("(//td//button[text()=\" $|BidMapName2| \"])")).toBeVisible();
    await expect(page.locator("(//td//button[text()=\" $|BidMapName3| \"])")).toBeVisible();
    await stepGroups.stepGroup_Exporting_Map_list_for_Advance_Search_New(page, vars);
    await page.locator("//i[contains(@class, 'fa-undo')]").click();
    await page.locator("//i[contains(@class, 'fa-undo')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//input[@placeholder=\"Search/Filter\"]")).toBeVisible();
  });
});
