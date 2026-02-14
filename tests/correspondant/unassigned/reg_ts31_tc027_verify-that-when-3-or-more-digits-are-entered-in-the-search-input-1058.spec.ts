import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS31_TC02.7_Verify that when 3 or more digits are entered in the search input, bid map records are displayed in the popup, showing matching keywords within the categories of Actions.', async ({ page }) => {
    // Prerequisite: REG_TS31_TC02.6_Verify that when 3 or more digits are entered in the search input, bid map records a
    // TODO: Ensure prerequisite test passes first

    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await page.locator("//i[@class=\"fas fa-times-circle text-primary\"]").click();
    await page.waitForLoadState('networkidle');
    await page.locator("//input[@placeholder=\"Search/Filter\"]").click();
    await page.locator("//input[@placeholder=\"Search/Filter\"]").fill(testData["UniqueChaseValueSearch"]);
    await page.keyboard.press('Enter');
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.waitForLoadState('networkidle');
    await page.locator("//h6[text()[normalize-space() = \"Action\"]]").waitFor({ state: 'visible' });
    await expect(page.locator("//i[text()[normalize-space() = \"act:\"]]")).toContainText("act:");
    await expect(page.locator("(//*[@aria-label=\"Bid Map Search and Filter\"]//*[text()=\"Action\"]/../following-sibling::div//a)[1]")).toContainText(testData["UniqueChaseValueSearch"]);
    await page.locator("//h6[text()[normalize-space() = \"Action\"]]").hover();
    await page.locator("//h6[text()[normalize-space() = \"Action\"]]/following-sibling::a[text()[normalize-space() = \"Show All\"]]").click();
    await page.waitForLoadState('networkidle');
    await page.locator("(//button[@class=\"text-primary pointer border-0 bg-transparent\"])[1]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText(vars["UniqueBidMapName"])).toBeVisible();
    await page.locator("//a[text()[normalize-space() = \"Rules and Actions\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//label[text()=\"Chase Value\"]/..//div[@class=\"d-flex\"]//button//div")).toContainText(testData["UniqueChaseValueSearch"]);
    await page.locator("//span[text()[normalize-space() = \"Save and Publish\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//button[@class=\"text-primary pointer border-0 bg-transparent\"]")).toContainText(vars["UniqueBidMapName"]);
    await page.locator("//input[@aria-label=\"Select all for \"]").click();
    await page.locator("//button[@id='exportdropdownMenuButton']").click();
    await stepGroups.stepGroup_Verification_of_ExportList_from_UI_to_Excel(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"Bid Maps\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Deleting_All_Advanced_Search_Bid_Maps(page, vars);
  });
});
