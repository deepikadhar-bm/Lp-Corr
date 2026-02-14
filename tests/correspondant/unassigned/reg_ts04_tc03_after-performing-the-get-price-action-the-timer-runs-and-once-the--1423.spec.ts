import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS04_TC03_After performing the \\\"Get Price\\\" action, the timer runs, and once the timer finishes then the screen should reset to normal. and if user should be restricted to perform commit action.', async ({ page }) => {
    // Prerequisite: REG_TS04_TC02_Verify that once we update the timer value then the same should be reflected here upon
    // TODO: Ensure prerequisite test passes first

    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//a[@aria-label=\"General Settings\"]//span[text()=\"General Settings\"]").click();
    await page.locator("//a[@href=\"#/admin/general-settings/commitment-timer\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Editing_the_Chase_Users_Time_Under_General_Settings(page, vars);
    vars["ExtractedTimeFromChaseUserBox"] = await page.locator("//div/input[@aria-label=\"Internal User Minutes\"]").inputValue() || '';
    await page.locator("//button[normalize-space(text())=\"Save changes\" or contains(text(),\"Save Changes\")]").waitFor({ state: 'visible' });
    await page.waitForLoadState('networkidle');
    await page.locator("//button[normalize-space(text())=\"Save changes\" or contains(text(),\"Save Changes\")]").click();
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await expect(page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]")).toBeVisible();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["RequestIDDetails"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Bid Req. ID\"]/a)[1]").click();
    await page.locator("//div[contains(@id,\"price-offered-back\")]//i").waitFor({ state: 'visible' });
    await expect(page.locator("//div[@id=\"price-offered-details-header\"]//div/div[text()=\"Remaining Time\"]")).toBeVisible();
    await page.locator("//button[text()[normalize-space() = \"Get Price\"]]").click();
    await page.locator("(//input[@type=\"checkbox\" and contains(@aria-label,\"Select loan\")])[1]").waitFor({ state: 'visible' });
    await expect(page.locator("//div[@id=\"price-offered-details-header\"]//div/div[text()=\"Remaining Time\"]")).toBeVisible();
    await expect(page.locator("//div[@id=\"price-offered-details-header\"]//div/div[text()=\"Remaining Time\"]")).toContainText("Remaining Time");
    vars["ExtractedTimeFromTimer"] = await page.locator("//div[@id=\"price-offered-details-header\"]//div/div[text()=\"Remaining Time\"]/../h5").textContent() || '';
    vars["WaitingTimeInterval"] = (parseFloat(String("60")) * parseFloat(String(vars["ExtractedTimeFromChaseUserBox"]))).toFixed(0);
    await page.waitForTimeout(parseInt(vars["WaitingTimeInterval"]) * 1000);
    await expect(page.locator("//div[@id=\"price-offered-details-header\"]//div/div[text()=\"Remaining Time\"]")).toBeVisible();
    await expect(page.locator("(//input[@type=\"checkbox\" and contains(@aria-label,\"Select loan\")])[1]")).toBeVisible();
    await page.locator("(//input[@type=\"checkbox\" and contains(@aria-label,\"Select loan\")])[1]").click();
    await page.locator("(//input[@type=\"checkbox\" and contains(@aria-label,\"Select loan\")])[1]").check();
    await expect(page.locator("(//input[@type=\"checkbox\" and contains(@aria-label,\"Select loan\")])[1]")).toBeVisible();
    await expect(page.locator("//div[@id=\"page-footer\"]/div//button[@id=\"commitdropdownMenuButton\" and (contains(@class,'disabled') or @disabled)]")).toBeVisible();
  });
});
