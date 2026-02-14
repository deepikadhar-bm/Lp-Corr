import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS22_TC09_Reprice bid for #Bid req ID\\\" popup Delete an existing batch record from the bulk batch config and validate that deleted time should no longer be displayed in the pricing return time dro', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Navigating_to_Bulk_Batch_Timing(page, vars);
    await stepGroups.stepGroup_Modifying_The_Batch_Intervals_For_Next_bussiness_day_with_on(page, vars);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("(//div[contains(@class,\"card rounded-3\")])[last()]")).toBeVisible();
    vars["LastBatchTime"] = await page.locator("(//div[contains(@class,\"card rounded-3\")]//div//h5)[last()]").textContent() || '';
    vars["BufferTime"] = await page.locator("//input[@id=\"pricingReturnTimeBuffer\"]").inputValue() || '';
    vars["LastBatchTime(OneMinAdded)"] = (() => {
      const d = new Date('2000-01-01 ' + String(vars["LastBatchTime"]));
      d.setMinutes(d.getMinutes() + parseInt(String(vars["BufferTime"])));
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }); // Format: hh:mm a
    })();
    await page.locator("(//div[contains(@class,\"card rounded-3\")]//button[@aria-label=\"Delete Batch Time\"])[last()]").hover();
    await expect(page.getByText(testData["Display_Text1"])).toBeVisible();
    await page.locator("(//div[contains(@class,\"card rounded-3\")]//button[@aria-label=\"Delete Batch Time\"])[last()]").click();
    await expect(page.getByText(testData["Display_Text2"])).toBeVisible();
    await page.locator("//div//button[@aria-label=\"Delete batch\"]//span[text()=\"Delete batch \"]").click();
    await expect(page.locator("//div[contains(@class,\"card rounded-3\")]")).not.toContainText(vars["LastBatchTime"]);
    await page.locator("//li[@class=\"nav-item\"]//a[@href=\"#/bid-requests\"]").click();
    await page.locator("//span[text()[normalize-space() = \"Filter\"]]").click();
    await page.locator("//div[text()[normalize-space() = \"Select Company/CCode\"]]").click();
    await page.locator("//input[@type=\"checkbox\" and contains(@aria-label,\"@|Company Name|\")]").check();
    await page.locator("//div[@id=\"multiSelectOptionsDropDown\"]//button[text()=\" Apply Selected \"]").click();
    await page.locator("(//div[@class=\"d-flex\"]//div//button[@id=\"multiSelectDropDown\"])[last()]").click();
    await expect(page.locator("//div[@id=\"multiSelectOptionsDropDown\"]//div//div//label//input[@aria-label=\"Select Expired\"]")).toBeVisible();
    await page.locator("//div[@id=\"multiSelectOptionsDropDown\"]//div//div//label//input[@aria-label=\"Select Expired\"]").check();
    await page.locator("(//button[contains(normalize-space(),\"Apply Selected 1\")])[2]").click();
    await expect(page.locator("//div[contains(@class, \"justify-content-end\")]//button[text()=\"Apply Filters\"]")).toBeVisible();
    await page.locator("//div[contains(@class, \"justify-content-end\")]//button[text()=\"Apply Filters\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//td[@data-title=\"Bid Req. ID\"]")).toBeVisible();
    await page.locator("//td[@data-title=\"Bid Req. ID\"]").click();
    await page.locator("//button//span[text()=\"Re-Submit For Pricing\"]").click();
    await expect(page.locator("//form//div//label[text()=\"Bid Requested Date\"]")).toBeVisible();
    await expect(page.locator("(//form//div[@class=\"col\"]//div//input[@name=\"bidRequestDate\"])[1]")).toBeEnabled();
    await page.locator("//select[@aria-label=\"Dropdown selection\"]").click();
    await expect(page.locator("//select[@aria-label=\"Dropdown selection\"]").locator('option', { hasText: vars["LastBatchTime(OneMinAdded)"] })).not.toBeVisible();
    await page.locator("(//form//div[@class=\"col\"]//div//input[@name=\"bidRequestDate\"])[2]").check();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//select[@aria-label=\"Dropdown selection\"]").click();
    await expect(page.locator("//select[@aria-label=\"Dropdown selection\"]").locator('option', { hasText: vars["LastBatchTime(OneMinAdded)"] })).not.toBeVisible();
  });
});
