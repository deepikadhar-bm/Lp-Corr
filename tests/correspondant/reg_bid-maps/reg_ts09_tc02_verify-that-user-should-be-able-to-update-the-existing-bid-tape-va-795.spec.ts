import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS09_TC02_Verify that user should be able to Update the existing bid tape value is not editable under the enum and also should be able to update the chase values.', async ({ page }) => {
    // Prerequisite: REG_TS09_TC01_Verify that user should be able to Add new  the existing bid tape value under the enum
    // TODO: Ensure prerequisite test passes first

    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await page.locator("(//select[contains(normalize-space(),\"Select Attached Detached\")])[1]").selectOption({ label: testData["ChaseValue"] });
    await page.locator("//div[contains(@class, 'container') and contains(@class, 'd-flex')]/div[2]/button[2]").click();
    await expect(page.locator("(//div[text()='Attachment Type']/../..//select[@id=\"id\"])[1]")).toHaveValue("Attached");
    vars["AllBidTapeValuesCount"] = String(await page.locator("//div[@class=\"field-block mb-2\"]").count());
    vars["DisabledBidTapeCount"] = String(await page.locator("//div[contains(@class,\"input-field-name text-truncate cursor-pointer\")]").count());
    expect(String(vars["AllBidTapeValuesCount"])).toBe(vars["DisabledBidTapeCount"]);
    await expect(page.locator("//input[@class=\"input-field-edit\"]")).toBeVisible();
    await expect(page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]")).toBeVisible();
  });
});
