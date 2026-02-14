import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Commitment List - TS_1', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS14_TC06_Verify the Resend commitment letter action', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Comm. Letter\"]//span").click();
    await page.locator("//button[@aria-label=\"Send Email\"]//span").waitFor({ state: 'visible' });
    await page.locator("//button[@aria-label=\"Send Email\"]//span").click();
    await page.getByText("Commitment letter email triggered successfully!").waitFor({ state: 'visible' });
    await expect(page.getByText("Commitment letter email triggered successfully!")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"OK\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"Close\"]]").click();
  });
});
