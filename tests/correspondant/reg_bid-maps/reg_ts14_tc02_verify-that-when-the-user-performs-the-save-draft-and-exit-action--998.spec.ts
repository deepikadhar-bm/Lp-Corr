import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS14_TC02_Verify that when the user performs the \\\"Save Draft and Exit\\\" action on each screen, a draft version is saved, and the user is redirected to the bid map list screen.[Enumeration Mapping', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Smart_Mapper_from_Off_to_On(page, vars);
    await stepGroups.stepGroup_Creation_Of_Bid_Map_Upto_Header_Mapping(page, vars);
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await page.locator("(//button[@type=\"button\"])[last()]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]")).toBeVisible();
    await stepGroups.stepGroup_Adding_Field_In_Enumeration_Mapping(page, vars);
    vars["NewFieldChaseValue"] = await page.locator("(//div[@class=\"field-block mb-2\"]//input/../../../../..//select)[last()]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
    await stepGroups.stepGroup_Editing_In_Enumeration_Mapping_Screen(page, vars);
    await stepGroups.stepGroup_Delete_In_Enumeration_Mapping(page, vars);
    await page.locator("(//fieldset//input[@type=\"checkbox\"])[1]").check();
    await expect(page.locator("(//fieldset//input[@type=\"checkbox\"])[1]")).toBeVisible();
    vars["FirstBidSampleName"] = await page.locator("((//fieldset//input[@type=\"checkbox\"])[1]/../..//div[@class=\"col-2\"]//div)[1]").textContent() || '';
    await page.locator("(//fieldset//input[@type=\"checkbox\"])[2]").check();
    await expect(page.locator("(//fieldset//input[@type=\"checkbox\"])[2]")).toBeVisible();
    vars["SecondBidSampleName"] = await page.locator("(((//fieldset//input[@type=\"checkbox\"])[2]/../..//div[@class=\"col-2\"]//div))[1]").textContent() || '';
    await page.locator("//span[text()[normalize-space() = \"Save Draft & Exit\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Map Name\"]//button[text()=\" $|Create New Map| \"]").waitFor({ state: 'visible' });
    await page.locator("//td[@data-title=\"Map Name\"]//button[text()=\" $|Create New Map| \"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Map Headers\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("(//button[@type=\"button\"])[last()]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["NewFieldChaseValueAfterSaveDraftExit"] = await page.locator("((//input[@class=\"form-control rounded-0 border-0 border-bottom p-3 bg-light ng-untouched ng-pristine ng-valid\"]/../../../../../../../../../..//div[@class=\"mb-2\"])//select)[1]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
    expect(String(vars["NewFieldChaseValue"])).toBe(vars["NewFieldChaseValueAfterSaveDraftExit"]);
    await expect(page.locator("(//button[text()=\" Add Field \"]/../div[text()=\"$|EditedChaseFieldName|\"]/../..//select)[2]")).toHaveValue(vars["EditedChaseValue"]);
    await expect(page.locator("(//div[@class=\"field-block mb-2\"])//div[text()=\" $|BidTapeValueforBeforeDeleted| \"]")).toBeVisible();
    await expect(page.locator("(//div[@class=\"col-2\"]//div[text()=\"$|FirstBidSampleName|\"])[1]/../..//input[@type=\"checkbox\"]")).toBeVisible();
    await expect(page.locator("(//div[@class=\"col-2\"]//div[text()=\"$|SecondBidSampleName|\"])[1]/../..//input[@type=\"checkbox\"]")).toBeVisible();
    await page.locator("(//div[@class=\"col-2\"]//div[text()=\"$|FirstBidSampleName|\"])[1]/../..//input[@type=\"checkbox\"]").uncheck();
    await expect(page.locator("(//div[@class=\"col-2\"]//div[text()=\"$|FirstBidSampleName|\"])[1]/../..//input[@type=\"checkbox\"]")).toBeVisible();
    await stepGroups.stepGroup_Save_Draft_Exit_Action_and_Navigate_from_new_map_to_enumerat(page, vars);
    await expect(page.locator("(//div[@class=\"col-2\"]//div[text()=\"$|FirstBidSampleName|\"])[1]/../..//input[@type=\"checkbox\"]")).toBeVisible();
    await expect(page.locator("(//div[@class=\"col-2\"]//div[text()=\"$|SecondBidSampleName|\"])[1]/../..//input[@type=\"checkbox\"]")).toBeVisible();
  });
});
