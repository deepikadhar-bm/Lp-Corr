import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS08_TC09_CASE-02_  If they have changed value and they have unidentified fields also - Message should be \\\"You have unidentified fields do you still want to proceed. (Note : This action will save', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Smart_Mapper_from_Off_to_On(page, vars);
    await stepGroups.stepGroup_Creation_Of_Bid_Map_Upto_Header_Mapping(page, vars);
    await page.waitForLoadState('networkidle');
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//p[text()[normalize-space() = \"You have unidentified fields do you want to proceed further.\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Yes, Proceed\"]]").click();
    await stepGroups.stepGroup_Add_Field_in_Enumeration_Mapping(page, vars);
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText(testData["Unidentified Fields Error Message"])).toBeVisible();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"BACK\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText(vars["BidTapeValue"])).toBeVisible();
    await stepGroups.stepGroup_Edition_In_Enumeration_Mapping(page, vars);
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText(testData["Unidentified Fields Error Message"])).toBeVisible();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"BACK\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText(vars["EditedChaseValue[Enumeration Mapping]"])).toBeVisible();
    await stepGroups.stepGroup_Delete_In_Enumeration_Mapping(page, vars);
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await expect(page.getByText(testData["Unidentified Fields Error Message"])).toBeVisible();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"BACK\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("(//div[@class=\"field-block mb-2\"])//div[text()=\" $|BidTapeValueforBeforeDeleted| \"]")).toBeVisible();
    await page.locator("//input[@aria-label=\"Enable or disable field Amortization Type\"]").check();
    await page.locator("(//fieldset//input[@type=\"checkbox\"])[2]").check();
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    await expect(page.getByText(testData["Unidentified Fields Error Message"])).toBeVisible();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"BACK\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("(//fieldset//input[@type=\"checkbox\"])[1]").uncheck();
    await page.locator("(//fieldset//input[@type=\"checkbox\"])[2]").uncheck();
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    await expect(page.getByText(testData["Unidentified Fields Error Message"])).toBeVisible();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"BACK\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
  });
});
