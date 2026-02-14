import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS22_TC01_Verify that user should be able to update the clients from the list screen for the required bid', async ({ page }) => {
    // Prerequisite: REG_TS17_TC01_If a new record is created then verify the data present in the list should be displaye
    // TODO: Ensure prerequisite test passes first

    await page.waitForLoadState('networkidle');
    await page.locator("//button[contains(text(),\"$|BidMap|\")]").hover();
    await page.locator("(//span[contains(@class, 'fa-landmark')])[1]").click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByText(vars["Create New Map"])).toBeVisible();
    await page.locator("(//input[@type=\"checkbox\"])[23]").check();
    await page.locator("(//input[@type=\"checkbox\"])[24]").check();
    await page.locator("//i[contains(@class, 'fa-arrow-left') and contains(@class, 'btn-primary')]").click();
    vars["firstComany_from_client_acc"] = await page.locator("(//div[@class='custom-input searchbox']/following-sibling::div//span)[1]").textContent() || '';
    vars["secondComany_from_client_acc"] = await page.locator("(//div[@class='custom-input searchbox']/following-sibling::div//span)[2]").textContent() || '';
    vars["thirdComany_from_client_acc"] = await page.locator("(//div[@class='custom-input searchbox']/following-sibling::div//span)[3]").textContent() || '';
    await page.locator("//span[text()[normalize-space() = \"Save Clients\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//button[contains(text(),\"$|BidMap|\")]").hover();
    await page.locator("(//*[@class=\"more-clients custom-bg-primary text-white fs-xs border-0\"])[1]").click();
    await expect(page.locator("//h5[contains(text(),\"$|Create New Map|\")]")).toContainText(vars["Create New Map"]);
    vars["FirstCompanyName"] = await page.locator("(//td[@data-title=\"Company\"])[21]").textContent() || '';
    expect(String(vars["FirstCompanyName"])).toBe(vars["firstComany_from_client_acc"]);
    vars["SecondCompanyName"] = await page.locator("(//td[@data-title=\"Company\"])[22]").textContent() || '';
    expect(String(vars["SecondCompanyName"])).toBe(vars["secondComany_from_client_acc"]);
    vars["ThirdCompanyName"] = await page.locator("(//td[@data-title=\"Company\"])[23]").textContent() || '';
    expect(String(vars["ThirdCompanyName"])).toBe(vars["thirdComany_from_client_acc"]);
  });
});
