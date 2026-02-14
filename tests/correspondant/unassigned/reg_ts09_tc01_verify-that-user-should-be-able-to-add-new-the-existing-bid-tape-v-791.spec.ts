import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS09_TC01_Verify that user should be able to Add new  the existing bid tape value under the enum and also should be able to update the chase values', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Smart_Mapper_from_Off_to_On(page, vars);
    await stepGroups.stepGroup_Creation_Of_Bid_Map_Upto_Header_Mapping(page, vars);
    await expect(page.locator("//h1[@class=\"fw-semibold py-3\"]")).toBeVisible();
    await page.locator("//span[text()='Enumeration Mapping']").waitFor({ state: 'visible' });
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await page.locator("//h5[text()[normalize-space() = \"Save and Move to Next Page\"]]").waitFor({ state: 'visible' });
    await page.locator("(//button[@type=\"button\"])[last()]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//h1[@class=\"fw-semibold py-3\"]")).toBeVisible();
    await page.locator("(//button[text()[normalize-space() = \"Add Field\"]])[7]").click();
    await page.locator("(//select[contains(normalize-space(),\"Select Fixed rate Variable rate\")])[2]").selectOption({ label: testData["Chase Value"] });
    await page.locator("//input[@type=\"text\" and contains(@class, 'input-field-edit')]").fill(testData["Bid Tape Value"]);
    await page.locator("//span[text()[normalize-space() = \"Save Draft\"]]/..").click();
    await expect(page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]")).toBeVisible();
  });
});
