import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS16_TC03_(Rules and Actions)If the status is active draft, then verify that user should be able to switch the view between active draft and should be able to delete the defat version if not requi', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Smart_Mapper_from_Off_to_On(page, vars);
    await stepGroups.stepGroup_Creation_Of_Bid_Map_Upto_Header_Mapping(page, vars);
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await page.locator("(//button[@type=\"button\"])[last()]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    await page.locator("(//button[@type=\"button\"])[last()]").waitFor({ state: 'visible' });
    await page.locator("(//button[@type=\"button\"])[last()]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Adding_Rules_In_Rules_and_Actions_Screen(page, vars);
    await stepGroups.stepGroup_Add_Actions_in_Rules_and_Actions(page, vars);
    await stepGroups.stepGroup_Duplicating_Rule_In_Enumeration_Mapping(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Save and Publish\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Map Name\"]//button[text()=\" $|Create New Map| \"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Map Headers\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await page.locator("(//button[@type=\"button\"])[last()]").waitFor({ state: 'visible' });
    await page.locator("(//button[@type=\"button\"])[last()]").evaluate(el => (el as HTMLElement).click());
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    await page.locator("(//button[@type=\"button\"])[last()]").waitFor({ state: 'visible' });
    await page.locator("(//button[@type=\"button\"])[last()]").evaluate(el => (el as HTMLElement).click());
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Editing_All_Fields_In_a_Rule(page, vars);
    await stepGroups.stepGroup_Deleting_the_Rule_in_Rules_and_Actions_Page(page, vars);
    await expect(page.getByText(testData["Duplicated Rule Name"])).not.toBeVisible();
    await stepGroups.stepGroup_Duplicating_Rule_In_Enumeration_Mapping(page, vars);
    await page.locator("//span[text()=\"Save Draft\"]").click();
    await page.locator("//button[text()[normalize-space() = \"View Active Version\"]]").waitFor({ state: 'visible' });
    await page.locator("//button[text()[normalize-space() = \"View Active Version\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//fieldset[@disabled]")).toBeVisible();
    await stepGroups.stepGroup_Verifying_that_Changes_Are_Not_Updated_In_Active_VersionRule(page, vars);
    await stepGroups.stepGroup_Verification_of_Rules_and_Action_Values_Before_EditingActive(page, vars);
    await expect(page.locator("(//input[@placeholder=\"Enter a Rule Name\"])[2]")).toHaveValue(testData["Duplicated Rule Name"]);
    vars["Rulename"] = await page.locator("(//input[@placeholder=\"Enter a Rule Name\"])[2]").inputValue() || '';
    expect(String(vars["Rulename"])).toBe(testData["New Rule Name"]);
    await page.locator("//button[text()[normalize-space() = \"View Draft\"]]").click();
    await expect(page.locator("//fieldset[@disabled]")).toBeVisible();
    await expect(page.locator("//button[text()[normalize-space() = \"View Active Version\"]]")).toBeVisible();
    await expect(page.locator("//button[text()[normalize-space() = \"Delete Draft\"]]")).toBeVisible();
    await page.locator("//button[text()[normalize-space() = \"Delete Draft\"]]").click();
    await expect(page.locator(" //div[normalize-space(text())='You have selected to delete this draft map which will be permanently deleted and cannot be recovered. Do you want to proceed?']")).toBeVisible();
    await expect(page.locator("//span[normalize-space(text())='Yes, proceed']")).toBeVisible();
    await page.locator("//span[normalize-space(text())='Yes, proceed']").click();
    await expect(page.locator("//button[normalize-space(text())='$|Create New Map|']//..//..//span[text()='ACTIVE']")).toContainText("ACTIVE");
  });
});
