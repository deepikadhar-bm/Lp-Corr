import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS32_TC01_Verify the advance search functionality, where the user should be able to perform search action based on the rules and actions.[Bidmap Creation]', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await expect(page.locator("//h3[text()[normalize-space() = \"Dashboard\"]]")).toBeVisible();
    await stepGroups.stepGroup_Smart_Mapper_from_Off_to_On(page, vars);
    await stepGroups.stepGroup_Creation_Of_Bid_Map_Upto_Header_Mapping(page, vars);
    vars["BidMapName1"] = vars["Create New Map"];
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await page.locator("//button[@aria-label=\"Yes, Proceed\"]").click();
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").waitFor({ state: 'visible' });
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    if (true) /* Element Yes Proceed Button Text is visible */ {
      await page.locator("//button[@aria-label=\"Yes, Proceed\"]").click();
    }
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Adding_Rules_In_Rules_and_Actions_Screen(page, vars);
    await stepGroups.stepGroup_Adding_Actions_In_Rules_and_Actions_Screen(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Save and Publish\"]]").waitFor({ state: 'visible' });
    await page.locator("//span[text()[normalize-space() = \"Save and Publish\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Creation_Of_Bid_Map_Upto_Header_Mapping(page, vars);
    vars["BidMapName2"] = vars["Create New Map"];
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await page.locator("//span[text()[normalize-space() = \"Yes, Proceed\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"Yes, Proceed\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Adding_Rules_In_Rules_and_Actions_Screen(page, vars);
    await stepGroups.stepGroup_Adding_Actions_In_Rules_and_Actions_Screen(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Save and Publish\"]]").waitFor({ state: 'visible' });
    await page.locator("//span[text()[normalize-space() = \"Save and Publish\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Creating_New_Bid_Mapping_For_search_action_based_on_the_rule(page, vars);
    vars["Common Keyword"] = "TS_AdvanceSearch";
    await stepGroups.stepGroup_Creation_Of_Bid_Map_Upto_Header_Mapping(page, vars);
    vars["BidMapName3"] = vars["Create New Map"];
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await page.locator("//button[@aria-label=\"Yes, Proceed\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"Yes, Proceed\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Adding_Rules_In_Rules_and_Actions_Screen(page, vars);
    await stepGroups.stepGroup_Adding_Actions_In_Rules_and_Actions_Screen(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Save Draft & Exit\"]]").waitFor({ state: 'visible' });
    await page.locator("//span[text()[normalize-space() = \"Save Draft & Exit\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
  });
});
