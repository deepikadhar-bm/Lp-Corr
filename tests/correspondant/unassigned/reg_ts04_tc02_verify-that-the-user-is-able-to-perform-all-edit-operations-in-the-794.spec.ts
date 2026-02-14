import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS04_TC02_Verify that the user is able to perform all Edit operations in the header mapping.', async ({ page }) => {
    // Prerequisite: REG_TS04_TC01_Verify that the user is able to perform all Create operations in the header mapping.
    // TODO: Ensure prerequisite test passes first

    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await page.locator("(//i[@class=\"fas fa-pencil-alt\"])[3]").click();
    await expect(page.locator("//h5[text()[normalize-space() = \"Update Header\"]]")).toBeVisible();
    await page.locator("//div[contains(@class, 'd-flex') and contains(@class, 'small')]/following-sibling::div[contains(@class, 'd-flex')]//input[contains(@class, 'form-control')]").clear();
    await page.locator("//span[text()[normalize-space() = \"Update Header\"]]").click();
    await expect(page.locator("//div[text()[normalize-space() = \"Name can't be empty.\"]]")).toBeVisible();
    await page.locator("//div[contains(@class, 'd-flex') and contains(@class, 'small')]/following-sibling::div[contains(@class, 'd-flex')]//input[contains(@class, 'form-control')]").fill(testData["Chase Field Name"]);
    await page.locator("//div[contains(@class, 'd-flex') and contains(@class, 'small')]/following-sibling::div[contains(@class, 'd-flex')]//select[contains(@class, 'form-select')]").selectOption({ index: parseInt("11") });
    await page.locator("//span[text()[normalize-space() = \"Update Header\"]]").click();
    await expect(page.locator("//select[@title=\"Fico\"]")).toBeVisible();
  });
});
