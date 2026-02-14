import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS08_TC03_Verify that when the user navigates to the enum screen, all headers of type enum are fetched, and if the uploaded file contains any values, then the corresponding matched records should ', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Smart_Mapper_from_Off_to_On(page, vars);
    await stepGroups.stepGroup_Creation_Of_Bid_Map_Upto_Header_Mapping(page, vars);
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await expect(page.locator("//p[text()[normalize-space() = \"You have unidentified fields do you want to proceed further.\"]]")).toBeVisible();
    await page.locator("(//button[@type=\"button\"])[last()]").click();
    await stepGroups.stepGroup_Reading_files(page, vars);
    vars["names"] = vars["Total exl"];
    vars[""] = String('');
    while (parseFloat(String(vars["number"])) < parseFloat(String("5"))) {
      vars["Impound Type"] = await page.locator("(//div[text()=\"Impound Type\"]//../..//div[@class=\"input-field-name text-truncate cursor-pointer\"])[$|number|]").inputValue() || '';
      expect(String(vars["names"])).toBe(vars["Impound Type"]);
      vars["number"] = (parseFloat(String("1")) + parseFloat(String(vars["number"]))).toFixed(0);
    }
  });
});
