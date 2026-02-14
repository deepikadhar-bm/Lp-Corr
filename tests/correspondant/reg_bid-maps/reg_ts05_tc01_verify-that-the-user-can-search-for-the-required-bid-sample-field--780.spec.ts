import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS05_TC01_Verify that the user can search for the required bid sample field name and view the relevant headers (used, unused, or unidentified) based on the dropdown selection.', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Creation_Of_Bid_Map_Upto_Header_Mapping(page, vars);
    await expect(page.locator("//h1[@class=\"fw-semibold py-3\"]")).toBeVisible();
    await page.locator("(//input[@type=\"checkbox\"])[2]").check();
    await page.locator("(//input[contains(@type,'checkbox')])[4]").check();
    await page.locator("//select[contains(normalize-space(),\"Select Show All Headers Show Unidentified Headers (10) Show Unused Headers Show Used Headers\")]").selectOption({ label: testData["Unidentified Headers"] });
    await expect(page.locator("(//select[contains(@class, 'form-select')])[2]")).toHaveValue("Select");
    await expect(page.locator("(//select[contains(@class, 'form-select')])[3]")).toHaveValue("Select");
    await page.locator("//select[contains(normalize-space(),\"Select Show All Headers Show Unidentified Headers (10) Show Unused Headers Show Used Headers\")]").selectOption({ label: testData["Unused Headers"] });
    await expect(page.locator("(//select[contains(@class,'form-select')])[8]")).toHaveValue("Select");
    await expect(page.locator("(//select[contains(@class,'form-select')])[15]")).toHaveValue("Select");
    await page.locator("//select[contains(normalize-space(),\"Select Show All Headers Show Unidentified Headers (10) Show Unused Headers Show Used Headers\")]").selectOption({ label: testData["Used Headers"] });
    await expect(page.locator("(//input[@type=\"checkbox\"])[2]")).toBeVisible();
    await expect(page.locator("(//input[@type=\"checkbox\"])[3]")).toBeVisible();
    // [DISABLED] Verify that the element Headers Mappings is displayed and With Scrollable FALSE
    // await expect(page.locator("//div[contains(@class, 'scrollable-page')]/div[1]/app-mapping-wizard-container[1]/app-header-mapping-container[1]/app-header-mapping[1]/div[1]")).toBeVisible();
  });
});
