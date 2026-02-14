import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS32_TC01.3_Verify the advance search functionality, where the user should be able to perform search action based on the rules and actions.[Advance Search for Rules]', async ({ page }) => {
    // Prerequisite: REG_TS32_TC01.2_Verify the advance search functionality, where the user should be able to perform se
    // TODO: Ensure prerequisite test passes first

    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Advanced_Search_For_Rules(page, vars);
    await expect(page.locator("(//td//button[text()=\" $|BidMapName2| \"])")).toBeVisible();
    await expect(page.locator("(//td//button[text()=\" $|BidMapName1| \"])")).toBeVisible();
    await expect(page.locator("(//td//button[text()=\" $|BidMapName3| \"])")).toBeVisible();
    vars["BidMapsCount(AdvanceSearch)"] = String(await page.locator("(//tbody//tr)[position() >= 1 and position() <= last()]").count());
    await stepGroups.stepGroup_Exporting_Map_list_for_Advance_Search_New(page, vars);
    await page.locator("//i[contains(@class, 'fa-undo')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("(//i[contains(@class, 'fa-times-circle')])[1]")).toBeVisible();
    await expect(page.locator("//input[@placeholder=\"Search/Filter\"]")).toBeVisible();
    await stepGroups.stepGroup_Verifying_The_BidMaps_Count(page, vars);
  });
});
