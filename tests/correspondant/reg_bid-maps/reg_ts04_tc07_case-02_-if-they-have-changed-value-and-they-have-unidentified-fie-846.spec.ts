import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS04_TC07_CASE-02_ If they have changed value and they have unidentified fields also - Message should be \\\"You have unidentified fields do you still want to proceed. (Note : This action will save ', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Creation_Of_Bid_Map_Upto_Header_Mapping(page, vars);
    await stepGroups.stepGroup_Creation_of_Add_New_Header(page, vars);
    vars["UnidentifiedCount"] = String(await page.locator("//div[@class=\"gap-2 header-grid-layout unidentified-header\"]").count());
    expect(String(vars["UnidentifiedCount"])).toBe("1");
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await expect(page.locator("//*[contains(text(),\"You have unidentified fields.\")]/../..//*[text()=\" This action will save the changes and Move to Next Page. \"]")).toBeVisible();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.waitForLoadState('networkidle');
    await page.locator("//span[text()[normalize-space() = \"BACK\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText(testData["Custom Header"])).toBeVisible();
    await stepGroups.stepGroup_Verification_Of_Unidentified_Fields_In_Header_Mapping(page, vars);
    await stepGroups.stepGroup_Edit_in_Header_Mapping(page, vars);
    await expect(page.locator("//*[contains(text(),\"You have unidentified fields.\")]/../..//*[text()=\" This action will save the changes and Move to Next Page. \"]")).toBeVisible();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"BACK\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Deleting_the_Header_Mapping(page, vars);
    await stepGroups.stepGroup_Verification_Of_Unidentified_Fields_In_Header_Mapping(page, vars);
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await expect(page.locator("//*[contains(text(),\"You have unidentified fields.\")]/../..//*[text()=\" This action will save the changes and Move to Next Page. \"]")).toBeVisible();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"BACK\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText(testData["ChaseFieldNames"])).toBeVisible();
    await stepGroups.stepGroup_Checking_the_CheckBox_in_Header_Mapping(page, vars);
    await stepGroups.stepGroup_Verification_Of_Unidentified_Fields_In_Header_Mapping(page, vars);
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await expect(page.locator("//*[contains(text(),\"You have unidentified fields.\")]/../..//*[text()=\" This action will save the changes and Move to Next Page. \"]")).toBeVisible();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"BACK\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("(//input[@type=\"checkbox\"])[2]")).toBeVisible();
    await stepGroups.stepGroup_Unchecking_the_CheckBox_in_Header_Mapping(page, vars);
    await stepGroups.stepGroup_Verification_Of_Unidentified_Fields_In_Header_Mapping(page, vars);
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await expect(page.locator("//*[contains(text(),\"You have unidentified fields.\")]/../..//*[text()=\" This action will save the changes and Move to Next Page. \"]")).toBeVisible();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"BACK\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("(//input[@type=\"checkbox\"])[2]")).toBeVisible();
  });
});
