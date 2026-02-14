import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS08_TC01_Bid Map config - Verify the last modified and audit log info by updating the smart mapper config', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Smart_Mapper_from_On_to_Off(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[@href=\"#/admin/general-settings/bidmap-creation\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Verifying_the_Last_Modified_Data_In_the_Right_corner_screen(page, vars);
    // [DISABLED] Store CurrentLocalTime in ExpectedTimeAudit
    // vars["ExpectedTimeAudit"] = vars["CurrentLocalTime"];
    await stepGroups.stepGroup_Smart_Mapper_from_Off_to_On(page, vars);
    vars["ExpectedPreviousData"] = "false";
    vars["ExpectedNewData"] = "true";
  });
});
