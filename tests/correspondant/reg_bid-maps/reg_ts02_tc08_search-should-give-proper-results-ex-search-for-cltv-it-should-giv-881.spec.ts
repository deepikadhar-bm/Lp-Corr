import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS02_TC08_Search should give proper results. ex: Search for CLTV. it should give CLTV as a result.Clear the search result it should give all the results back .If no search found, should give empty', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Creation_Of_Bid_Map_Upto_Header_Mapping(page, vars);
    await expect(page.locator("//input[@placeholder=\"Search\"]")).toBeVisible();
    await expect(page.locator("//input[@placeholder=\"Search\"]")).toHaveValue('');
    await page.locator("//input[@placeholder=\"Search\"]").click();
    await page.locator("//input[@placeholder=\"Search\"]").fill(Array.from({length: 5}, () => "abc".charAt(Math.floor(Math.random() * 3))).join(''));
    await expect(page.locator("//div[@class='parent']//fieldset[1]/parent::div")).toBeVisible();
    await page.locator("//input[@placeholder=\"Search\"]").clear();
    await page.locator("//input[@placeholder=\"Search\"]").fill(testData["BidFields"]);
    await expect(page.locator("//div[text()[normalize-space() = \"CLTV\"]]")).toBeVisible();
    await page.locator("//input[@placeholder=\"Search\"]").clear();
    await stepGroups.stepGroup_Verification_for_the_Header_Mapping(page, vars);
  });
});
