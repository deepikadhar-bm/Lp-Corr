import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS28_TC01_Verification Of Resend Email Feature', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await expect(page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Filter\"]]").click();
    await page.locator("//div[text()[normalize-space() = \"Select Bid Request Status\"]]/..").click();
    await page.locator("//label[@for=\"chkItemPRICE_OFFEREDundefined\"]//input").check();
    await expect(page.locator("//label[@for=\"chkItemPRICE_OFFEREDundefined\"]//input")).toBeVisible();
    await page.locator("//button[contains(text(),\" Apply Selected \")]").click();
    await page.locator("//div[contains(@class, \"justify-content-end\")]//button[text()=\"Apply Filters\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("(//td[@data-title=\"Status\"])[1]//span")).toContainText(testData["Price Offered"]);
    await page.locator("//tr[contains(normalize-space(),\"A4187 87W396593360 Freedom A4187 $888.71K 3 / 0 Standard Price Offered 05/22/2025 05/22/2025\")]//td[@data-title=\"Actions\"]//div[@role=\"group\"]//button[@aria-label=\"Send Email\"]//span[contains(@class, 'fa-envelope')]").click();
    await expect(page.getByText(testData["Email Message Verification"])).toBeVisible();
    await expect(page.locator("//button[@aria-label=\"Send Email\" and contains(@class, 'fw-bold') and contains(@class, 'btn-primary')]")).toBeVisible();
    await page.locator("//button[@aria-label=\"Send Email\" and contains(@class, 'fw-bold') and contains(@class, 'btn-primary')]").click();
    await page.getByText(testData["Email Success Message"]).waitFor({ state: 'visible' });
    // API: Api1
    const _apiResponse_26670 = await page.request.get("https://ext-qa.lpcorrtest.com/cp/assets/configurations/web.configuration.json");
    expect(_apiResponse_26670.status()).toBe(200);
  });
});
