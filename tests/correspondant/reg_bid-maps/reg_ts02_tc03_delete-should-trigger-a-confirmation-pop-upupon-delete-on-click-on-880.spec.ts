import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS02_TC03_Delete Should trigger a confirmation pop up.Upon Delete, On click on \\\'X\\\" / \\\'No\\\' The pop up should close.Upon Delete, On click on \\\'Yes, Proceed\\\' should delete the Mapping.', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Creation_Of_Bid_Map_Upto_Header_Mapping(page, vars);
    await expect(page.locator("//span[text()='Enumeration Mapping']")).toBeVisible();
    vars["DeleteHeaderMapping"] = await page.locator("(//div[contains(@class,\"gap-2 header-grid-layout\")]//div[@class=\"flex-grow-1\"])[5]").textContent() || '';
    await page.locator("(//i[@class=\"fas fa-trash-alt text-danger\"])[5]").click();
    vars["DeleteHederMapping"] = await page.locator("//div[text()[normalize-space() = 'You have selected to delete \"$|DeleteHeaderMapping|\" mapping. Do you want to proceed?']]").textContent() || '';
    await expect(page.getByText(vars["DeleteHederMapping"])).toBeVisible();
    await expect(page.locator("//div[text()[normalize-space() = 'You have selected to delete \"$|DeleteHeaderMapping|\" mapping. Do you want to proceed?']]")).toBeVisible();
    await page.locator("//i[contains(@class, 'fa-lg') and contains(@class, 'color-primary') and contains(@class, 'fa-times')]").click();
    await expect(page.locator("//div[text()[normalize-space() = 'You have selected to delete \"$|DeleteHeaderMapping|\" mapping. Do you want to proceed?']]")).toBeVisible();
    await page.locator("(//i[@class=\"fas fa-trash-alt text-danger\"])[5]").click();
    await expect(page.locator("//div[text()[normalize-space() = 'You have selected to delete \"$|DeleteHeaderMapping|\" mapping. Do you want to proceed?']]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"No\"]]").click();
    await expect(page.locator("//div[text()[normalize-space() = 'You have selected to delete \"$|DeleteHeaderMapping|\" mapping. Do you want to proceed?']]")).toBeVisible();
    await page.locator("(//i[@class=\"fas fa-trash-alt text-danger\"])[5]").click();
    await expect(page.locator("//div[text()[normalize-space() = 'You have selected to delete \"$|DeleteHeaderMapping|\" mapping. Do you want to proceed?']]")).toBeVisible();
    await expect(page.locator("//span[text()[normalize-space() = \"Yes, Proceed\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Yes, Proceed\"]]").click();
    await expect(page.locator("//div[@class=\"gap-2 header-grid-layout unidentified-header\"]/../..[$|DeleteHeaderMapping|]")).toBeVisible();
  });
});
