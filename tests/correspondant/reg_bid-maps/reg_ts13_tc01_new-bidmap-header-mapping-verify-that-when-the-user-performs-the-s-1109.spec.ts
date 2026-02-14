import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS13_TC01_New Bidmap & Header Mapping Verify that when the user performs the save draft action on each screen, a draft version is saved.1.', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Smart_Mapper_from_Off_to_On(page, vars);
    vars["Companyname"] = testData["Company name 1"];
    await stepGroups.stepGroup_Creating_New_BidMap_Upto_Upload_File(page, vars);
    vars["EditedMapName"] = vars["Create New Map"];
    vars["SelectedCompanyName"] = await page.locator("//label[text()=\"Select Company/s\"]/..//div[@class=\"pill rounded-pill relative\"]//span").textContent() || '';
    vars["ExecutionType"] = await page.locator("//label[text()=\"Execution Type\"]/..//select").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
    vars["UploadedFileName"] = await page.locator("//label[text()=\"Upload File\"]/..//div[contains(@class,\"text-truncate flex-grow-1\")]").textContent() || '';
    await page.locator("//div[contains(@class, 'container') and contains(@class, 'd-flex')]/div[2]/button[2]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Map Headers\"]]").waitFor({ state: 'visible' });
    await expect(page.locator("//label[text()=\"New Map Name\"]/..//input")).toHaveValue(vars["Create New Map"]);
    await expect(page.locator("//label[text()=\"Select Company/s\"]/..//div[@class=\"pill rounded-pill relative\"]//span")).toContainText(vars["SelectedCompanyName"]);
    await expect(page.locator("//label[text()=\"Execution Type\"]/..//select")).toHaveValue(vars["ExecutionType"]);
    await expect(page.locator("//span[@aria-live=\"polite\"]")).toContainText(vars["UploadedFileName"]);
    await stepGroups.stepGroup_Editing_In_New_Map_After_Save_draft(page, vars);
    vars["Create New Map"] = vars["EditedMapName"];
    await page.locator("//span[text()[normalize-space() = \"Map Headers\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[text()[normalize-space() = \"Enumeration Mapping\"]]").waitFor({ state: 'visible' });
    await stepGroups.stepGroup_Creating_New_Header_In_Header_Mapping_Screen(page, vars);
    await stepGroups.stepGroup_Editing_Header_Mapping(page, vars);
    vars["DeletedHeader[HeaderMapping]"] = await page.locator("(//div[contains(@class,\"gap-2 header-grid-layout\")]//div[@class=\"flex-grow-1\"])[5]").textContent() || '';
    await stepGroups.stepGroup_Delete_a_Header_In_Header_Mapping(page, vars);
    await page.locator("(//fieldset//input[@type=\"checkbox\"])[1]").check();
    vars["FirstHeaderName"] = await page.locator("(//div[contains(@class,\"gap-2 header-grid-layout\")]//div[@class=\"flex-grow-1\"])[1]").textContent() || '';
    await page.locator("(//fieldset//input[@type=\"checkbox\"])[2]").check();
    vars["SecondHeaderName"] = await page.locator("(//div[contains(@class,\"gap-2 header-grid-layout\")]//div[@class=\"flex-grow-1\"])[2]").textContent() || '';
    await expect(page.locator("//div[contains(@class, 'container') and contains(@class, 'd-flex')]/div[2]/button[2]")).toBeVisible();
    await page.locator("//div[contains(@class, 'container') and contains(@class, 'd-flex')]/div[2]/button[2]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()='Enumeration Mapping']").waitFor({ state: 'visible' });
    await expect(page.locator("//div[@class=\"gap-2 header-grid-layout custom-header\"]//div[@class=\"flex-grow-1\"]")).toBeVisible();
    await expect(page.locator("//div[@class=\"gap-2 header-grid-layout custom-header\"]//div[@class=\"flex-grow-1\"]")).toContainText(vars["customheadername"]);
    vars["CustomHeaderChaseValue"] = await page.locator("//div[@class=\"gap-2 header-grid-layout custom-header\"]//select").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
    expect(String(vars["clmfieldname"])).toBe(vars["CustomHeaderChaseValue"]);
    await expect(page.locator("//div[text()=\"$|UpdatedBidSampleNameHeaderMapping|\"]/ancestor::div[@class=\"gap-2 header-grid-layout\"]//*[@class=\"flex-grow-1\"]")).toContainText(vars["UpdatedBidSampleNameHeaderMapping"]);
    vars["ChaseFieldNameHeaderMapping"] = await page.locator("//div[text()=\"$|UpdatedBidSampleNameHeaderMapping|\"]/ancestor::div[@class=\"gap-2 header-grid-layout\"]//select").getAttribute('title') || '';
    expect(String(vars["ChaseFieldNameHeaderMapping"])).toBe(vars["UpdatedChaseFieldNameHeaderMapping"]);
    await expect(page.locator("//div[@class=\"gap-2 header-grid-layout\"]//div[text()=\"$|DeletedHeader[HeaderMapping]|\"]")).toBeVisible();
    await expect(page.locator("(//div[contains(@class,\"gap-2 header-grid-layout\")]//div[@class=\"flex-grow-1\" and text()=\"$|FirstHeaderName|\"])[1]/..//input")).toBeVisible();
    await expect(page.locator("(//div[contains(@class,\"gap-2 header-grid-layout\")]//div[@class=\"flex-grow-1\" and text()=\"$|SecondHeaderName|\"])[1]/..//input")).toBeVisible();
    await page.locator("(//div[contains(@class,\"gap-2 header-grid-layout\")]//div[@class=\"flex-grow-1\" and text()=\"$|FirstHeaderName|\"])[1]/..//input").uncheck();
    await expect(page.locator("(//div[contains(@class,\"gap-2 header-grid-layout\")]//div[@class=\"flex-grow-1\" and text()=\"$|FirstHeaderName|\"])[1]/..//input")).toBeVisible();
    await page.locator("//div[contains(@class, 'container') and contains(@class, 'd-flex')]/div[2]/button[2]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("(//div[contains(@class,\"gap-2 header-grid-layout\")]//div[@class=\"flex-grow-1\" and text()=\"$|FirstHeaderName|\"])[1]/..//input")).toBeVisible();
    await expect(page.locator("(//div[contains(@class,\"gap-2 header-grid-layout\")]//div[@class=\"flex-grow-1\" and text()=\"$|SecondHeaderName|\"])[1]/..//input")).toBeVisible();
  });
});
