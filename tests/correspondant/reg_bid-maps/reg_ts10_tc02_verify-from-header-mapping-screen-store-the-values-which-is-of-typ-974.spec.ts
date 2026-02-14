import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS10_TC02_Verify From header mapping screen store the values which is of type enum[store both bid sample and chase field name values\\\"} Now in the enum header mapping screen verify that the stored', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Smart_Mapper_from_Off_to_On(page, vars);
    await stepGroups.stepGroup_Creation_Of_Bid_Map_Upto_Header_Mapping(page, vars);
    await stepGroups.stepGroup_Storing_All_Enum_TDP_Values_into_a_Variable(page, vars);
    vars["count"] = "1";
    vars["MappedChaseFieldCount"] = String(await page.locator("//fieldset//div[@class=\"gap-2 header-grid-layout\"]//select").count());
    await stepGroups.stepGroup_Fetching_Mapped_Enum_Values_From_Header_Mapping_and_Verifyin(page, vars);
    await page.locator("//a[text()[normalize-space() = \"Enumeration Mapping\"]]").click();
    if (true) /* Element Yes Proceed Button is visible */ {
      await page.locator("//button[@aria-label=\"Yes, Proceed\"]").click();
    }
    await expect(page.locator("//h1[@class=\"fw-semibold py-3\"]")).toBeVisible();
  });
});
