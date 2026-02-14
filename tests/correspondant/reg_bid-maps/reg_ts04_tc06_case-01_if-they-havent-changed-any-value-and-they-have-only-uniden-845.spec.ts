import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS04_TC06_CASE-01_If they haven\\\'t changed any value and they have only unidentified fields - Message should be \\\"You have unidentified fields do you want to proceed further\\\", its just \\\"Yes, Pro', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Smart_Mapper_from_Off_to_On(page, vars);
    await stepGroups.stepGroup_Creation_Of_Bid_Map_Upto_Header_Mapping(page, vars);
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await expect(page.locator("//p[text()[normalize-space() = \"You have unidentified fields do you want to proceed further.\"]]")).toBeVisible();
    await expect(page.locator("(//button[@type=\"button\"])[last()]")).toBeVisible();
    await page.locator("//i[contains(@class, 'fa-lg') and contains(@class, 'color-primary') and contains(@class, 'fa-times')]").click();
    await page.waitForLoadState('networkidle');
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await expect(page.locator("//p[text()[normalize-space() = \"You have unidentified fields do you want to proceed further.\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Continue Editing\"]]").click();
    await page.waitForLoadState('networkidle');
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await expect(page.locator("//p[text()[normalize-space() = \"You have unidentified fields do you want to proceed further.\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Yes, Proceed\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//span[text()[normalize-space() = \"BACK\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"BACK\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//input[@type=\"checkbox\" and contains(@class, 'custom-control-input')]")).toBeVisible();
  });
});
