import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS21_TC01_Verify that user should be able to navigate to the required bid map details screen.', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    if (true) /* Element Dashboard is visible */ {
      await stepGroups.stepGroup_Smart_Mapper_from_Off_to_On(page, vars);
      await stepGroups.stepGroup_Creation_Of_Bid_Map_Upto_Header_Mapping(page, vars);
      await stepGroups.stepGroup_Edition_in_Header_Mapping(page, vars);
      await stepGroups.stepGroup_Deletion_in_Enumeration_Mapping(page, vars);
      await stepGroups.stepGroup_Import_Rule_in_Mapping(page, vars);
      await page.locator("//button[contains(text(),\"$|BidMap|\")]").click();
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      await expect(page.locator("//span[contains(.,' $|Create New Map|')]")).toContainText(vars["Create New Map"]);
    } else {
      await page.waitForLoadState('networkidle');
    }
  });
});
