import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('1045_df8297c4d7c64cb9873b10ea84310984_aftertest', async ({ page }) => {
    if (true) /* Test Case Result is Failed */ {
      if (true) /* Element Close Advance Search Pop up Button is visible */ {
        await page.locator("//h2[text()=\"Advanced Search/Filter\"]/..//button").click();
        await page.reload();
        await stepGroups.stepGroup_Deleting_All_Advanced_Search_Bid_Maps(page, vars);
      }
      if (true) /* Element Reset Button is visible */ {
        await page.locator("//i[contains(@class, 'fa-undo')]").click();
        await page.locator("//input[@placeholder=\"Search/Filter\"]").waitFor({ state: 'visible' });
        await stepGroups.stepGroup_Deleting_All_Advanced_Search_Bid_Maps(page, vars);
      }
      if (true) /* Element Search/Filter Input(All Map List Page) is visible */ {
        await stepGroups.stepGroup_Deleting_All_Advanced_Search_Bid_Maps(page, vars);
      }
    }
  });
});
