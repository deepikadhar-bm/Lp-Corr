import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS01_TC07_Select the Company B\\\" from the \\\'Select company\\\" dropdown and now in the \\\"Bid mapping id\\\" dropdown verify that the associated bid map names are being displayed here. [ Verify atleast', async ({ page }) => {
    // Prerequisite: REG_TS01_TC06_Select the "Company A" from the 'Select company" dropdown and now in the "Bid mapping 
    // TODO: Ensure prerequisite test passes first

    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//button[text()[normalize-space() = \"Upload New Bid Request\"]]")).toBeVisible();
    await page.locator("//button[text()[normalize-space() = \"Upload New Bid Request\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//div[text()[normalize-space() = \"Select\"]]").click();
    await page.locator("//div[text()=\" Select \"]/../../../following-sibling::div//input[@placeholder=\"Search\"]").fill(testData["Company name 2"]);
    await page.locator("//span[@class='pl-2'][contains(.,'@|Company name 2|')]").click();
    await expect(page.locator("//span[@class='pl-2'][contains(.,'@|Company name 2|')]")).toContainText(testData["Company name 2"]);
    await page.locator("//div[text()[normalize-space() = \"Select Mapping\"]]").click();
    await page.locator("//div[contains(@class, 'shadow') and contains(@class, 'dropdown-menu') and contains(@class, 'show')]//input[@placeholder=\"Search\"]").fill(vars["CreatedBidMap"]);
    await page.waitForLoadState('networkidle');
    await expect(page.locator("//div[contains(@class, 'shadow') and contains(@class, 'dropdown-menu') and contains(@class, 'show')]//input[@placeholder=\"Search\"]")).toHaveAttribute('value', vars["CreatedBidMap"]);
  });
});
