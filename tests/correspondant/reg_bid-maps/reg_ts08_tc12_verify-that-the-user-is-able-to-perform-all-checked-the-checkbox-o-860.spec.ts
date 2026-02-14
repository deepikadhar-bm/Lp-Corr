import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS08_TC12_Verify that the user is able to perform all Checked the checkbox operations in the Enumeration mapping.', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Smart_Mapper_from_Off_to_On(page, vars);
    await stepGroups.stepGroup_Creation_Of_Bid_Map_Upto_Header_Mapping(page, vars);
    await page.waitForLoadState('networkidle');
    await stepGroups.stepGroup_Storing_All_Enum_TDP_Values_into_a_Variable(page, vars);
    await stepGroups.stepGroup_Checking_All_Enum_Fields_In_Header_Mapping_Screen(page, vars);
    await page.locator("//span[text()='Enumeration Mapping']").click();
    if (true) /* Element Proceed with Saving Button is visible */ {
      await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    }
    if (true) /* Element Yes, Proceed Button. is visible */ {
      await page.locator("//span[text()[normalize-space() = \"Yes, Proceed\"]]").click();
    }
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Verification_Of_Checked_Enum_Fields_In_Enumeration(page, vars);
    await page.locator("//span[text()[normalize-space() = \"BACK\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()='Enumeration Mapping']").waitFor({ state: 'visible' });
    await stepGroups.stepGroup_Unchecking_All_Enum_Fields_In_Header_Mapping_Screen(page, vars);
    await page.locator("//span[text()='Enumeration Mapping']").click();
    if (true) /* Element Proceed with Saving Button is visible */ {
      await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    }
    if (true) /* Element Yes, Proceed Button. is visible */ {
      await page.locator("//span[text()[normalize-space() = \"Yes, Proceed\"]]").click();
    }
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Verification_Of_Unchecked_Enum_Fields_In_Enumeration(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    if (true) /* Element Proceed with Saving Button is visible */ {
      await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    }
    if (true) /* Element Yes, Proceed Button. is visible */ {
      await page.locator("//span[text()[normalize-space() = \"Yes, Proceed\"]]").click();
    }
  });
});
