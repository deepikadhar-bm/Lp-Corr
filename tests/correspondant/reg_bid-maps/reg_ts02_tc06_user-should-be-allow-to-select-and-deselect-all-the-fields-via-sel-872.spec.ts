import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS02_TC06_User should be allow to select and deselect all the Fields via \\\"Select all\\\" checkbox.', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Creation_Of_Bid_Map_Upto_Header_Mapping(page, vars);
    await expect(page.locator("//input[@type=\"checkbox\" and contains(@class, 'custom-control-input')]")).toBeEnabled();
    await page.locator("//input[@type=\"checkbox\" and contains(@class, 'custom-control-input')]").check();
    vars["BidSampleFieldName"] = String(await page.locator("//i[@class=\"fas fa-pencil-alt\"]").count());
    vars["Count"] = "2";
    while (parseFloat(String(vars["Count"])) <= parseFloat(String(vars["BidSampleFieldName"]))) {
      await expect(page.locator("(//input[@type=\"checkbox\"])[$|Count|]")).toBeVisible();
      vars["Count"] = (parseFloat(String("1")) + parseFloat(String(vars["Count"]))).toFixed(0);
    }
  });
});
