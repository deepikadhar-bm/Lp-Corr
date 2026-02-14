import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS02_TC10_ Not mapped fields will be identified in Red color.', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Creation_Of_Bid_Map_Upto_Header_Mapping(page, vars);
    await expect(page.locator("//span[text()='Enumeration Mapping']")).toBeVisible();
    vars["HeaderMapping"] = String(await page.locator("//div[@class=\"gap-2 header-grid-layout unidentified-header\"]").count());
    vars["Count"] = "2";
    while (parseFloat(String(vars["Count"])) <= parseFloat(String(vars["HeaderMapping"]))) {
      await expect(page.locator("//div[@class=\"gap-2 header-grid-layout unidentified-header\"]")).toHaveCSS('border', testData["CSS Attribute"]);
      vars["Count"] = (parseFloat(String("1")) + parseFloat(String(vars["Count"]))).toFixed(0);
    }
  });
});
