import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS08_TC04_CASE-1_ Fetch all the enum type values from header mapping and verify that it should be present in enumeration mapping.', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Smart_Mapper_from_Off_to_On(page, vars);
    await stepGroups.stepGroup_Creation_Of_New_Map(page, vars);
    await page.locator("//input[@type=\"file\"]").setInputFiles(path.resolve(__dirname, 'test-data', "Bid Maps File,Bid Maps File.xlsx"));
    await page.locator("//div[@class=\"card\"]").hover();
    await page.locator("//span[text()[normalize-space() = \"Map Headers\"]]").click();
    await expect(page.locator("//*[contains(text(),\"This action will save the changes and Move to Next Page\")]")).toBeVisible();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.waitForLoadState('networkidle');
    await stepGroups.stepGroup_Fetching_the_data_based_on_Enum_value_in_Header_Mapping_and_(page, vars);
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await expect(page.locator("//p[text()[normalize-space() = \"You have unidentified fields do you want to proceed further.\"]]")).toBeVisible();
    if (true) /* Element Yes, Proceed Button is visible */ {
      await page.locator("//button[@aria-label=\"Yes, Proceed\"]").click();
    } else {
      await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    }
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Verification_of_Chase_Enum_Values_From_Header_Mapping_To_Cha(page, vars);
    vars["Chase Enum Namescount2"] = String(await page.locator("//div[@class=\"my-2\"]").count());
    for (let dataIdx = -1; dataIdx <= parseInt(vars["Chase Enum Namescount2"]); dataIdx++) {
      await expect(page.locator("//div[contains(text(),\"@|Chase value name|\")]/../..//div[contains(text(),\"@|Bid Sample Field|\")]")).toBeVisible();
    }
  });
});
