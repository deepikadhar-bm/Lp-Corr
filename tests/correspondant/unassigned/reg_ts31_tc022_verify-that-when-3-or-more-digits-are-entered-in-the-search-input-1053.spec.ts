import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS31_TC02.2_Verify that when 3 or more digits are entered in the search input, bid map records are displayed in the popup, showing matching keywords within the categories of bid map name.', async ({ page }) => {
    // Prerequisite: REG_TS31_TC02_Verify that when 3 or more digits are entered in the search input, bid map records are
    // TODO: Ensure prerequisite test passes first

    // [DISABLED] Click on Cross button in Bid Map
    // await page.locator("//i[@class=\"fas fa-times-circle text-primary\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.waitForLoadState('networkidle');
    await page.locator("//input[@placeholder=\"Search/Filter\"]").clear();
    await page.locator("//input[@placeholder=\"Search/Filter\"]").click();
    vars["UniqueBidMapName"] = vars["SearchFieldInputMap"];
    await page.locator("//input[@placeholder=\"Search/Filter\"]").fill(vars["UniqueBidMapName"]);
    await page.keyboard.press('Enter');
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.waitForLoadState('networkidle');
    await page.locator("//h6[text()='BidMap']").waitFor({ state: 'visible' });
    await expect(page.locator("//h6[text()[normalize-space() = \"BidMap\"]]")).toBeVisible();
    await expect(page.locator("(//i[text()[normalize-space() = \"map:\"]])[1]")).toContainText("map:");
    await expect(page.locator("(//*[@aria-label=\"Bid Map Search and Filter\"]//*[text()=\"BidMap\"]/../following-sibling::div//a)[1]")).toContainText(vars["UniqueBidMapName"]);
    await page.locator("//h6[text()='BidMap']").hover();
    await page.locator("//h6[text()[normalize-space() = \"BidMap\"]]/following-sibling::a[text()[normalize-space() = \"Show All\"]]").click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator("//button[@class=\"text-primary pointer border-0 bg-transparent\"]")).toContainText(vars["UniqueBidMapName"]);
    await page.locator("//td[@data-title=\"Map Name\"]//button[contains(text(),\"$|UniqueBidMapName|\")]/../preceding-sibling::td//input[@type=\"checkbox\"]").click();
    // [DISABLED] Click on Select_all_for_Checkbox
    // await page.locator("//input[@aria-label=\"Select all for \"]").click();
    await page.locator("//button[@id='exportdropdownMenuButton']").click();
    await stepGroups.stepGroup_Verification_of_ExportList_from_UI_to_Excel(page, vars);
  });
});
