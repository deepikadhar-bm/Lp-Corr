import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('Storing The PopUp Details', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    // [DISABLED] Click on Commitments Side Menu
    // await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    // [DISABLED] Click on Price Offered List Dropdown
    // await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Bid Req. ID\"]/a)[1]").click();
    await page.locator("(//input[contains(@aria-label,\"Select loan\")]/../..//td[@data-title=\"Corr. Loan#\"]/div/button)[1]").waitFor({ state: 'visible' });
    await page.locator("(//input[contains(@aria-label,\"Select loan\")]/../..//td[@data-title=\"Corr. Loan#\"]/div/button)[1]").click();
    await stepGroups.stepGroup_Demo_Storing_Popup_details(page, vars);
  });
});
