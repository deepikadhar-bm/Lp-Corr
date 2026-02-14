import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Commitment List - TS_1', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS21_TC02_Apply filter for current day/particular day and verify the Export functionality', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//div[normalize-space()=\"Closed List\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Selecting_Date_from_the_filters_by_fetching_the_first_comm_d(page, vars);
    await page.locator("//div[contains(@class, \"justify-content-end\")]//button[text()=\"Apply Filters\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Verification_of_Total_noof_rows_from_UI_to_Excel_and_Export_(page, vars);
    await stepGroups.stepGroup_Headers_Verification_Closed_List(page, vars);
    await stepGroups.stepGroup_Verification_of_Data_from_Excel_to_UI_Excluding_HeadersCommi(page, vars);
  });
});
