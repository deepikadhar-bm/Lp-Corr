import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Commitment List - TS_2', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS08_TC06_If a bid has multiple execution types, then verify that the commitment details mentioned here belongs to one particular execution type', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//input[@id='searchTagInput']").click();
    vars["BidReqId"] = testData["RequestIdFrom5-1"];
    await page.locator("//input[@id='searchTagInput']").fill(vars["BidReqId"]);
    await page.locator("//span[normalize-space(text())=\"Bid Request ID\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Execution Type\"]//div[normalize-space(text())=\"STANDARD\"]//ancestor::tr//td[@data-title=\"Comm. ID\"]//a[contains(@aria-label,\"View details for commitment\")]").click();
    await page.locator("//div[text()=\"Commit. ID\"]/following-sibling::h5").waitFor({ state: 'visible' });
    vars["CommitIDStandard"] = await page.locator("//div[text()=\"Commit. ID\"]/following-sibling::h5").textContent() || '';
    await page.locator("//a[contains(text(),\"Commitment List\")]//i[contains(@class,\"fas fa-arrow-left \")]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Execution Type\"]//div[normalize-space(text())=\"CHASE_DIRECT\"]//ancestor::tr//td[@data-title=\"Comm. ID\"]//a[contains(@aria-label,\"View details for commitment\")]").click();
    await page.locator("//div[text()=\"Commit. ID\"]/following-sibling::h5").waitFor({ state: 'visible' });
    vars["CommitIDChase"] = await page.locator("//div[text()=\"Commit. ID\"]/following-sibling::h5").textContent() || '';
    await page.locator("//a[contains(text(),\"Commitment List\")]//i[contains(@class,\"fas fa-arrow-left \")]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Execution Type\"]//div[normalize-space(text())=\"STANDARD\"]//ancestor::tr//td[@data-title=\"Comm. ID\"]//a[contains(@aria-label,\"View details for commitment\")]").click();
    await page.locator("//div[text()[normalize-space() = \"Total Loans\"]]").waitFor({ state: 'visible' });
    await page.locator("//div[text()[normalize-space() = \"Total Loans\"]]").click();
    await page.locator("//tbody//input[@type=\"checkbox\"]").waitFor({ state: 'visible' });
    await page.locator("//tbody//input[@type=\"checkbox\"]").click();
    await page.locator("//button[@id='commitdropdownMenuButton']").waitFor({ state: 'visible' });
    await page.locator("//button[@id='commitdropdownMenuButton']").click();
    await expect(page.locator("//div[normalize-space(text())=\"$|CommitIDStandard|\"]")).toBeVisible();
    await expect(page.locator("//div[normalize-space(text())=\"$|CommitIDChase|\"]\n")).toBeVisible();
    await page.locator("//a[contains(text(),\"Commitment List\")]//i[contains(@class,\"fas fa-arrow-left \")]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Execution Type\"]//div[normalize-space(text())=\"CHASE_DIRECT\"]//ancestor::tr//td[@data-title=\"Comm. ID\"]//a[contains(@aria-label,\"View details for commitment\")]").click();
    await page.locator("//div[text()[normalize-space() = \"Total Loans\"]]").waitFor({ state: 'visible' });
    await page.locator("//div[text()[normalize-space() = \"Total Loans\"]]").click();
    await page.locator("//tbody//input[@type=\"checkbox\"]").waitFor({ state: 'visible' });
    await page.locator("//tbody//input[@type=\"checkbox\"]").click();
    await page.locator("//button[@id='commitdropdownMenuButton']").waitFor({ state: 'visible' });
    await page.locator("//button[@id='commitdropdownMenuButton']").click();
    await expect(page.locator("//div[normalize-space(text())=\"$|CommitIDChase|\"]\n")).toBeVisible();
    await expect(page.locator("//div[normalize-space(text())=\"$|CommitIDStandard|\"]")).toBeVisible();
  });
});
