import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS11_TC02_Verification Of Duplicating the Rule', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Creation_Of_Bid_Map_Upto_Header_Mapping(page, vars);
    await page.locator("//span[text()='Enumeration Mapping']").click();
    if (true) /* Element Yes, Proceed Button. is visible */ {
      await page.locator("//span[text()[normalize-space() = \"Yes, Proceed\"]]").click();
    }
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"Yes, Proceed\"]]").click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator("//h1[text()=\" Rules and Actions / \"]")).toBeVisible();
    await stepGroups.stepGroup_Adding_Rules_In_Rules_and_Actions_Screen(page, vars);
    await stepGroups.stepGroup_Add_Actions_in_Rules_and_Actions(page, vars);
    await page.locator("(//span[text()[normalize-space() = \"Duplicate/Copy\"]])[1]").click();
    await expect(page.locator("(//div[@class=\"block\"])[2]")).toBeVisible();
    await stepGroups.stepGroup_Verification_Of_Duplicated_Rule_Values(page, vars);
    await stepGroups.stepGroup_Adding_Rules_In_Rules_and_Actions_Screen_Duplicated_Rule(page, vars);
    await stepGroups.stepGroup_Add_Actions_in_Rules_and_ActionsDuplicated_Rule(page, vars);
    await stepGroups.stepGroup_Verification_Of_Duplicated_Rule_Values(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Save and Publish\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
  });
});
