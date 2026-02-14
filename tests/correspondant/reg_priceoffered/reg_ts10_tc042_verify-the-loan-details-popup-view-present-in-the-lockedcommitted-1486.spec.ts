import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_PriceOffered', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS10_TC04.2_Verify the loan details popup view present in the \\\"Locked/Committed\\\" loans - Should be same as present in all loans. Also verify the search / clear search actions', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//tr[td[@data-title=\"Status\"]//span[contains(text(),'Partially Committed') or contains(text(),'Committed')]]/td[@data-title=\"Bid Req. ID\"]").click();
    await page.locator("//div[@id='price-offered-list-tabs']//span[text()[normalize-space() = \"Locked/Committed Loans\"]]").click();
    await page.waitForLoadState('networkidle');
    await page.locator("//button[text()[normalize-space() = \"Paste Loans\"]]").waitFor({ state: 'hidden' });
    await page.locator("//button[contains(@aria-label, \"View loan details for\")]\n").click();
    vars["ChaseFieldName"] = await page.locator("//div[text()=\"Chase Field Name\"]    /ancestor::div[2]     //div[@class=\"apply-grid\"]     //div[@class=\"border-bottom p-2\"]").textContent() || '';
    vars["ExpectedChaseFieldName"] = String(vars["ChaseFieldName"]).substring(1);
    vars["ChaseValue"] = await page.locator("//div[text()=\"Chase Field Name\"]     /ancestor::div[2]     //div[@class=\"apply-grid\"]     //div[@class=\"border-bottom p-2 tr-value\"]").textContent() || '';
    vars["ExpectedChaseValue"] = String(vars["ChaseValue"]).trim();
    await page.locator("//input[@placeholder=\"Search Fields\"]").click();
    await page.locator("//input[@placeholder=\"Search Fields\"]").fill(vars["ExpectedChaseFieldName"]);
    vars["ChaseFieldCount"] = String(await page.locator("//div[@class=\"border-bottom p-2\"]").count());
    expect(String(vars["ChaseFieldCount"])).toBe("1");
    await expect(page.locator("//div[text()=\"Chase Field Name\"]     /ancestor::div[2]     //div[@class=\"apply-grid\"]     //div[@class=\"border-bottom p-2\"]")).toContainText(vars["ExpectedChaseFieldName"]);
    await expect(page.locator("//div[text()=\"Chase Field Name\"]     /ancestor::div[2]     //div[@class=\"apply-grid\"]     //div[@class=\"border-bottom p-2 tr-value\"]")).toContainText(vars["ExpectedChaseValue"]);
    await page.locator("//input[@placeholder=\"Search Fields\"]").click();
    await page.locator("//input[@placeholder=\"Search Fields\"]").clear();
    vars["ChaseFieldCount"] = String(await page.locator("//div[@class=\"border-bottom p-2\"]").count());
    expect(String(vars["ChaseFieldCount"])).toBe("1");
  });
});
