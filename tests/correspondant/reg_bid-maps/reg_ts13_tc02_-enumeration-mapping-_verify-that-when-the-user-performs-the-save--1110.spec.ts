import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS13_TC02_ Enumeration Mapping _Verify that when the user performs the save draft action on each screen, a draft version is saved.1', async ({ page }) => {
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
    await page.locator("//div[contains(@class, 'container') and contains(@class, 'd-flex')]/div[2]/button[2]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["NewFieldChaseValueAfterSaveDraftExit"] = await page.locator("/html/body/app-root/div/div/div/div/div/div/div/app-mapping-wizard-container/main/app-enumeration-mapping-container/section[2]/app-enumeration-mapping/fieldset/div/div/div[1]/div/div[5]/div/div/div/app-single-select-dropdown/select").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
    expect(String(vars["NewFieldChaseValue"])).toBe(vars["NewFieldChaseValueAfterSaveDraftExit"]);
    await expect(page.locator("(//button[text()=\" Add Field \"]/../div[text()=\"$|EditedChaseFieldName|\"]/../..//select)[2]")).toHaveValue(vars["EditedChaseValue"]);
    await expect(page.locator("(//div[@class=\"field-block mb-2\"])//div[text()=\" $|BidTapeValueforBeforeDeleted| \"]")).toBeVisible();
    await expect(page.locator("(//div[@class=\"col-2\"]//div[text()=\"$|FirstBidSampleName|\"])[1]/../..//input[@type=\"checkbox\"]")).toBeVisible();
    await expect(page.locator("(//div[@class=\"col-2\"]//div[text()=\"$|SecondBidSampleName|\"])[1]/../..//input[@type=\"checkbox\"]")).toBeVisible();
    await page.locator("(//div[@class=\"col-2\"]//div[text()=\"$|FirstBidSampleName|\"])[1]/../..//input[@type=\"checkbox\"]").uncheck();
    await expect(page.locator("(//div[@class=\"col-2\"]//div[text()=\"$|FirstBidSampleName|\"])[1]/../..//input[@type=\"checkbox\"]")).toBeVisible();
    await page.locator("//div[contains(@class, 'container') and contains(@class, 'd-flex')]/div[2]/button[2]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("(//div[@class=\"col-2\"]//div[text()=\"$|FirstBidSampleName|\"])[1]/../..//input[@type=\"checkbox\"]")).toBeVisible();
    await expect(page.locator("(//div[@class=\"col-2\"]//div[text()=\"$|SecondBidSampleName|\"])[1]/../..//input[@type=\"checkbox\"]")).toBeVisible();
  });
});
