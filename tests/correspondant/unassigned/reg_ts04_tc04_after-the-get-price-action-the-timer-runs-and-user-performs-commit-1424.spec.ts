import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS04_TC04_After the \\\"Get Price\\\" action, the timer runs and user performs commit, the screen should reset normal and commit selected button should be disabled. At this point, user should not be a', async ({ page }) => {
    // Prerequisite: REG_TS04_TC03_After performing the "Get Price" action, the timer runs, and once the timer finishes t
    // TODO: Ensure prerequisite test passes first

    await expect(page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]")).toBeVisible();
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]")).toBeVisible();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").clear();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["RequestIDDetails"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Bid Req. ID\"]/a)[1]").click();
    await page.locator("//div[contains(@id,\"price-offered-back\")]//i").waitFor({ state: 'visible' });
    await page.locator("//button[text()[normalize-space() = \"Get Price\"]]").click();
    await page.locator("//div[@id=\"price-offered-details-header\"]//div/div[text()=\"Remaining Time\"]").waitFor({ state: 'visible' });
    await expect(page.locator("(//input[@type=\"checkbox\" and contains(@aria-label,\"Select loan\")])[1]")).toBeVisible();
    await page.locator("(//input[@type=\"checkbox\" and contains(@aria-label,\"Select loan\")])[1]").check();
    await expect(page.locator("(//input[@type=\"checkbox\" and contains(@aria-label,\"Select loan\")])[1]")).toBeVisible();
    await expect(page.locator("//div[@id=\"page-footer\"]/div//button[@id=\"commitdropdownMenuButton\"]")).toBeVisible();
    await expect(page.locator("//div[@id=\"page-footer\"]/div//button[@id=\"commitdropdownMenuButton\"]")).toBeVisible();
    await page.locator("//div[@id=\"page-footer\"]/div//button[@id=\"commitdropdownMenuButton\"]").click();
    await page.locator(" //div[@class=\"modal-header\"]//h5[contains(text(), \" Commit Selected Loans \")] ").waitFor({ state: 'visible' });
    await expect(page.locator(" //div[@class=\"modal-header\"]//h5[contains(text(), \" Commit Selected Loans \")] ")).toContainText("Commit Selected Loans");
    await expect(page.getByText("Selecting “Yes, Commit” is confirmation of entering a Mandatory Commitment along with the pair-off risks associated with not meeting the conditions of the commitment.")).toBeVisible();
    await page.locator("(//div[@class=\"modal-footer\"]/button)[2]").click();
    await page.locator("//div[@class=\"modal-body\"]/div\n\n").waitFor({ state: 'visible' });
    await page.locator("//div[@class=\"modal-footer\"]//button[contains(text(), \"Okay\")]").waitFor({ state: 'visible' });
    await page.locator("//div[@class=\"modal-footer\"]//button[contains(text(), \"Okay\")]").click();
    await expect(page.locator("//div[@id=\"price-offered-details-header\"]//div/div[text()=\"Remaining Time\"]")).toBeVisible();
    await page.locator("//div[@id=\"price-offered-list-tabs\"]/div//span[text()=\"All Loans\"]").click();
    await page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"])[3]/td/input[@type=\"checkbox\"]").waitFor({ state: 'visible' });
    await expect(page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"])[3]/td/input[@type=\"checkbox\"]")).toBeVisible();
    await page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"])[3]/td/input[@type=\"checkbox\"]").check();
    await expect(page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"])[3]/td/input[@type=\"checkbox\"]")).toBeVisible();
    await expect(page.locator("//div[@id=\"page-footer\"]/div//button[@id=\"commitdropdownMenuButton\" and (contains(@class,'disabled') or @disabled)]")).toBeVisible();
  });
});
