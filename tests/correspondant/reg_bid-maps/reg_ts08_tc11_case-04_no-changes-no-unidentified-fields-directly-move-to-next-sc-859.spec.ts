import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS08_TC11_CASE-04_No changes / No unidentified fields : Directly move to next screen without prompt.', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Smart_Mapper_from_Off_to_On(page, vars);
    await stepGroups.stepGroup_Creation_Of_Bid_Map_Upto_Header_Mapping(page, vars);
    await page.waitForLoadState('networkidle');
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await expect(page.getByText(testData["Unidentified fields Message"])).toBeVisible();
    if (true) /* Element Yes, Proceed Button is visible */ {
      await page.locator("//button[@aria-label=\"Yes, Proceed\"]").click();
    } else {
      await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    }
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Verifying_ChaseValue_In_EnumerationMapping(page, vars);
    await expect(page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    // [DISABLED] Verify that the element This action will save the changes and Move to Next Page is displayed and With Scrollable FALSE
    // await expect(page.locator("//*[contains(text(),\"This action will save the changes and Move to Next Page\")]")).toBeVisible();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").waitFor({ state: 'visible' });
    await expect(page.getByText("This action will save the changes and Move to Next Page")).toBeVisible();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.waitForLoadState('networkidle');
    await expect(page.locator("//div[text()[normalize-space() = \"Click on Add Rule Or Import Rule...\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"BACK\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    await expect(page.locator("//*[contains(text(),\"This action will save the changes and Move to Next Page\")]")).toBeVisible();
    if (true) /* Element Yes, Proceed Button is visible */ {
      await page.locator("//button[@aria-label=\"Yes, Proceed\"]").click();
    }
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//div[text()[normalize-space() = \"Click on Add Rule Or Import Rule...\"]]")).toBeVisible();
  });
});
