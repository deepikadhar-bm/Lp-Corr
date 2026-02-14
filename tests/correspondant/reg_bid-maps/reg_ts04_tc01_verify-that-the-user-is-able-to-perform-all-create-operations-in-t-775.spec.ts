import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS04_TC01_Verify that the user is able to perform all Create operations in the header mapping.', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Creation_Of_Bid_Map_Upto_Header_Mapping(page, vars);
    await expect(page.locator("//h1[@class=\"fw-semibold py-3\"]")).toBeVisible();
    await page.locator("//button[text()[normalize-space() = \"Add New Header\"]]").click();
    await expect(page.locator("//h5[text()[normalize-space() = \"Add Header\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Insert Header\"]]").click();
    await expect(page.locator("//div[text()[normalize-space() = \"Name can't be empty.\"]]")).toBeVisible();
    await page.locator("//div[text()='Custom Header']//..//..//input[contains(@class, 'form-control')]").fill(testData["Custom Header"]);
    await page.locator("//div[contains(@class, 'd-flex') and contains(@class, 'small')]/following-sibling::div[contains(@class, 'd-flex')]//select[contains(@class, 'form-select')]").click();
    await page.locator("//div[contains(@class, 'd-flex') and contains(@class, 'small')]/following-sibling::div[contains(@class, 'd-flex')]//select[contains(@class, 'form-select')]").selectOption({ index: parseInt("10") });
    await page.locator("//span[text()[normalize-space() = \"Insert Header\"]]").click();
    await expect(page.locator("//div[contains(@class, 'header-grid-layout') and contains(@class, 'custom-header')]")).toBeVisible();
    vars["Header Value"] = await page.locator("//div[text()=\"@|Custom Header|\"]/..//select[@id=\"id\"]").getAttribute('title') || '';
    await expect(page.locator("//span[text()='Enumeration Mapping']")).toBeVisible();
  });
});
