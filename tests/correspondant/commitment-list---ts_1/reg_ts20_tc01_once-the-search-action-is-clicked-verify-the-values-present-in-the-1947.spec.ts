import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Commitment List - TS_1', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS20_TC01_Once the search action is clicked, verify the values present in the popup should be commitment commitment ID, Bid request ID, Chase loan number and the Correspondent loan number', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//div[normalize-space()=\"Closed List\"]").waitFor({ state: 'visible' });
    await page.locator("//div[normalize-space()=\"Closed List\"]").click();
    await page.locator("//input[@id='searchTagInput']").waitFor({ state: 'visible' });
    await page.locator("//input[@id='searchTagInput']").click();
    await expect(page.locator("(//li[contains(@class,\"text-primary\")]//span)[1]")).toContainText("Commitment ID");
    await expect(page.locator("(//li[contains(@class,\"text-primary\")]//span)[2]")).toContainText("Bid Request ID");
    await expect(page.locator("(//li[contains(@class,\"text-primary\")]//span)[3]")).toContainText("Chase Loan Number");
    await expect(page.locator("(//li[contains(@class,\"text-primary\")]//span)[4]")).toContainText("Correspondent Loan Number");
  });
});
