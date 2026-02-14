import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS16_TC02_(Enumeration Mapping)If the status is active draft, then verify that user should be able to switch the view between active draft and should be able to delete the defat version if not req', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Smart_Mapper_from_Off_to_On(page, vars);
    await stepGroups.stepGroup_Navigating_to_Customer_Permission_For_the_Chase_Direct_Compa(page, vars);
    await stepGroups.stepGroup_EditActions_In_CustomerPermission(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"Bid Maps\"]]").click();
    await stepGroups.stepGroup_Creating_Of_Bid_Maps(page, vars);
    // [DISABLED] Creation Of Bid Map_Upto_Header Mapping
    // await stepGroups.stepGroup_Creation_Of_Bid_Map_Upto_Header_Mapping(page, vars);
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await page.locator("(//button[@type=\"button\"])[last()]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    await page.locator("//button[@aria-label=\"Yes, Proceed\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Save and Publish\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Map Name\"]//button[text()=\" $|Create New Map| \"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//label[text()=\"Execution Type\"]/..//select").selectOption({ index: parseInt("2") });
    await page.locator("//div[contains(@class, 'container') and contains(@class, 'd-flex')]/div[2]/button[2]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"Bid Maps\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Map Name\"]//button[text()=\" $|Create New Map| \"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Map Headers\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await page.locator("//button[@aria-label=\"Yes, Proceed\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Adding_Field_In_Enumeration_Mapping(page, vars);
    vars["NewFieldChaseValue"] = await page.locator("(//div[@class=\"field-block mb-2\"]//input/../../../../..//select)[last()]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
    await stepGroups.stepGroup_Editing_In_Enumeration_Mapping_Screen(page, vars);
    await stepGroups.stepGroup_Delete_In_Enumeration_Mapping(page, vars);
    await page.locator("(//fieldset//input[@type=\"checkbox\"])[1]").check();
    await expect(page.locator("(//fieldset//input[@type=\"checkbox\"])[1]")).toBeVisible();
    vars["FirstBidSampleName"] = await page.locator("((//fieldset//input[@type=\"checkbox\"])[1]/../..//div[@class=\"col-2\"]//div)[1]").textContent() || '';
    // [DISABLED] Click on Save Draft Button
    // await page.locator("//div[contains(@class, 'container') and contains(@class, 'd-flex')]/div[2]/button[2]").click();
    // [DISABLED] Wait until the element Spinner is not visible
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Store the text of the selected option from Newly Added chase value list into a variable NewFieldChaseValueAfterSaveDraftExit
    // vars["NewFieldChaseValueAfterSaveDraftExit"] = await page.locator("(//div[@class=\"mb-2\"]//select)[1]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
    // [DISABLED] Verify if NewFieldChaseValue == NewFieldChaseValueAfterSaveDraftExit
    // expect(String(vars["NewFieldChaseValue"])).toBe(vars["NewFieldChaseValueAfterSaveDraftExit"]);
    // [DISABLED] Verify that the Edited Chase Value After Save list has option with text EditedChaseValue selected and With Scrollable FALSE
    // await expect(page.locator("(//button[text()=\" Add Field \"]/../div[text()=\"$|EditedChaseFieldName|\"]/../..//select)[1]")).toHaveValue(vars["EditedChaseValue"]);
    // [DISABLED] Verify that the element Deleted Field In Enumeration is not displayed and With Scrollable FALSE
    // await expect(page.locator("(//div[@class=\"field-block mb-2\"])//div[text()=\" $|BidTapeValueforBeforeDeleted| \"]")).toBeVisible();
    // [DISABLED] Verify that the element Bid Sample Name 1 is checked and With Scrollable FALSE
    // await expect(page.locator("(//div[@class=\"col-2\"]//div[text()=\"$|FirstBidSampleName|\"])[1]/../..//input[@type=\"checkbox\"]")).toBeVisible();
    // [DISABLED] Uncheck the checkbox Bid Sample Name 1
    // await page.locator("(//div[@class=\"col-2\"]//div[text()=\"$|FirstBidSampleName|\"])[1]/../..//input[@type=\"checkbox\"]").uncheck();
    // [DISABLED] Check the checkbox Bid Sample Name 2
    // await page.locator("(//div[@class=\"col-2\"]//div[text()=\"$|SecondBidSampleName|\"])[1]/../..//input[@type=\"checkbox\"]").check();
    // [DISABLED] Verify that the element Bid Sample Name 2 is checked and With Scrollable FALSE
    // await expect(page.locator("(//div[@class=\"col-2\"]//div[text()=\"$|SecondBidSampleName|\"])[1]/../..//input[@type=\"checkbox\"]")).toBeVisible();
    // [DISABLED] Verify that the element Bid Sample Name 1 is unchecked and With Scrollable FALSE
    // await expect(page.locator("(//div[@class=\"col-2\"]//div[text()=\"$|FirstBidSampleName|\"])[1]/../..//input[@type=\"checkbox\"]")).toBeVisible();
    await page.locator("//div[contains(@class, 'container') and contains(@class, 'd-flex')]/div[2]/button[2]").click();
    await stepGroups.stepGroup_Verifying_Changes_After_SaveDraft_Action_In_Enumeration_Mapp(page, vars);
    // [DISABLED] Verify that the element Bid Sample Name 2 is checked and With Scrollable FALSE
    // await expect(page.locator("(//div[@class=\"col-2\"]//div[text()=\"$|SecondBidSampleName|\"])[1]/../..//input[@type=\"checkbox\"]")).toBeVisible();
    // [DISABLED] Select option using value StreamLineRefinance in the Loan Purpose Dropdwon list
    // await page.locator("(//div[text()='Loan Purpose'])[2]/../..//select[@aria-label=\"Default dropdown selection\"]").selectOption({ label: "StreamLineRefinance" });
    // [DISABLED] Verify that the Loan Purpose Dropdwon list has option with value StreamLineRefinance selected and With Scrollable FALSE
    // await expect(page.locator("(//div[text()='Loan Purpose'])[2]/../..//select[@aria-label=\"Default dropdown selection\"]")).toHaveValue("StreamLineRefinance");
    // [DISABLED] Verify that the element Save Draft Button is enabled and With Scrollable FALSE
    // await expect(page.locator("//div[contains(@class, 'container') and contains(@class, 'd-flex')]/div[2]/button[2]")).toBeVisible();
    // [DISABLED] Click on Save Draft Button
    // await page.locator("//div[contains(@class, 'container') and contains(@class, 'd-flex')]/div[2]/button[2]").click();
    await expect(page.locator("//button[text()[normalize-space() = \"View Active Version\"]]")).toBeVisible();
    await page.locator("//button[text()[normalize-space() = \"View Active Version\"]]").click();
    await page.locator("//fieldset[@disabled]").waitFor({ state: 'visible' });
    await expect(page.locator("//fieldset[@disabled]")).toBeVisible();
    await expect(page.locator("(//div[@class=\"input-field-name text-truncate cursor-pointer\"])[1]")).not.toContainText(vars["AddedBidTapeValueEnumerationMapping"]);
    await expect(page.locator("(//div[@class=\"mb-2\"]//select)[1]")).not.toContainText(vars["NewFieldChaseValue"]);
    // [DISABLED] Verify that the text NewFieldChaseValue is not displayed in the element Added Chase Value Dropdown and With Scrollable FALSE
    // await expect(page.locator("(//div[@class=\"field-block mb-2\"]//input/../../../../..//select)[last()]")).not.toContainText(vars["NewFieldChaseValue"]);
    await expect(page.locator("(//button[text()=\" Add Field \"]/../div[text()=\"$|EditedChaseFieldName|\"]/../..//select)[2]")).not.toContainText(vars["EditedChaseValue"]);
    await expect(page.locator("(//div[@class=\"field-block mb-2\"])//div[text()=\" $|BidTapeValueforBeforeDeleted| \"]")).toBeVisible();
    await expect(page.locator("(//div[@class=\"col-2\"]//div[text()=\"$|FirstBidSampleName|\"])[1]/../..//input[@type=\"checkbox\"]")).toBeVisible();
    // [DISABLED] Verify that the element Bid Sample Name 2 is unchecked and With Scrollable FALSE
    // await expect(page.locator("(//div[@class=\"col-2\"]//div[text()=\"$|SecondBidSampleName|\"])[1]/../..//input[@type=\"checkbox\"]")).toBeVisible();
    await page.locator("//button[text()[normalize-space() = \"View Draft\"]]").click();
    await expect(page.locator("//fieldset[@disabled]")).toBeVisible();
    await page.locator("//button[text()[normalize-space() = \"Delete Draft\"]]").waitFor({ state: 'visible' });
    await page.locator("//button[text()[normalize-space() = \"Delete Draft\"]]").click();
    await expect(page.locator(" //div[normalize-space(text())='You have selected to delete this draft map which will be permanently deleted and cannot be recovered. Do you want to proceed?']")).toBeVisible();
    await page.locator("//span[normalize-space(text())='Yes, proceed']").click();
    await expect(page.locator("//button[normalize-space(text())='$|Create New Map|']//..//..//span[text()='ACTIVE']")).toContainText("ACTIVE");
  });
});
