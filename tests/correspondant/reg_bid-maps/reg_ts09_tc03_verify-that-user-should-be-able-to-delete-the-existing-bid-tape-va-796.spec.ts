import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS09_TC03_Verify that user should be able to Delete the existing bid tape value under the enum and also should be able to update the chase values.', async ({ page }) => {
    // Prerequisite: REG_TS09_TC01_Verify that user should be able to Add new  the existing bid tape value under the enum
    // TODO: Ensure prerequisite test passes first

    await page.waitForLoadState('networkidle');
    await page.locator("(//i[@class=\"fa fas fa-trash trash-icon\"])[5]").click();
    await page.locator("//h5[text()[normalize-space() = \"Delete Enumeration Pair\"]]").waitFor({ state: 'visible' });
    await expect(page.locator("//div[text()[normalize-space() = \"This action cannot be undone\"]]/..")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Yes, Go ahead.\"]]").click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]")).toBeVisible();
    await expect(page.locator("/html/body/app-root/div/div/div/div/div/div/div/app-mapping-wizard-container/main/app-enumeration-mapping-container/section[2]/app-enumeration-mapping/fieldset/div/div/div[2]/div/div[3]/div[4]/div/div/div")).toBeVisible();
  });
});
