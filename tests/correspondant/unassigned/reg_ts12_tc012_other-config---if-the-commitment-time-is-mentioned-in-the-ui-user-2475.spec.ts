import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS12_TC01.2_Other Config - If the Commitment time is Mentioned in the UI, Users are allowed to commit a new loans within the Mentioned time limit in the UI.', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    vars["BidReqId"] = testData["RequestIDFrom-REG_TS12_TC01.1"];
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//input[@id='searchTagInput']").click();
    await page.locator("//input[@id='searchTagInput']").fill(vars["BidReqId"]);
    await page.locator("//span[normalize-space(text())=\"Bid Request ID\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())=\"$|BidReqId|\"]//ancestor::tr//td[@data-title=\"Comm. ID\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//div[text()[normalize-space() = \"Total Loans\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@role=\"cell\"]//input[@type=\"checkbox\"]").check();
    vars["CommittedCorrLoan"] = await page.locator("//tr[contains(@class,\"row\")]//button[contains(@class,\"btn bg-transparent text-primary\")][1]").textContent() || '';
    await page.locator("//button[@id='commitdropdownMenuButton']").waitFor({ state: 'visible' });
    await page.locator("//button[@id='commitdropdownMenuButton']").click();
    await expect(page.locator("//div[contains(text(),\"Commitment Order\")]//parent::a[contains(@class,\"disabled\")]")).toHaveAttribute('aria-label', "disabled");
    await page.locator("//span[contains(text(),\" Total Committed Loans\")]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//button[\"$|CommittedCorrLoan|\"]")).toBeVisible();
    await stepGroups.stepGroup_Revert_The_Commitment_Correction_Cutoff_Time(page, vars);
  });
});
