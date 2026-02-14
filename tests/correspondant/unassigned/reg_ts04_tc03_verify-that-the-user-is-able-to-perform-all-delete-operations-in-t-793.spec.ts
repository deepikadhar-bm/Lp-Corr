import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS04_TC03_Verify that the user is able to perform all Delete operations in the header mapping.', async ({ page }) => {
    // Prerequisite: REG_TS04_TC02_Verify that the user is able to perform all Edit operations in the header mapping.
    // TODO: Ensure prerequisite test passes first

    await page.locator("(//i[@class=\"fas fa-trash-alt text-danger\"])[5]").click();
    await expect(page.locator("//div[contains(@class, 'modal-header')]")).toBeVisible();
    vars["DeleteHeaderMapping"] = await page.locator("(//div[contains(@class,\"gap-2 header-grid-layout\")]//div[@class=\"flex-grow-1\"])[5]").textContent() || '';
    vars["BidSampleFieldName"] = await page.locator("//div[text()[normalize-space() = 'You have selected to delete \"$|DeleteHeaderMapping|\" mapping. Do you want to proceed?']]").textContent() || '';
    await expect(page.getByText(vars["BidSampleFieldName"])).toBeVisible();
    await page.locator("(//button[@type=\"button\"])[last()]").click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator("//div[@class='p-2'][contains(.,'You have selected to delete \"$|BidSampleFieldName|\" mapping. Do you want to proceed?')]\" mapping. Do you want to proceed?')]")).toBeVisible();
    await expect(page.locator("//span[text()='Enumeration Mapping']")).toBeVisible();
  });
});
