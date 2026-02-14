import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS01_TC12_Delete batch time value from the general settings module and verify that batch time value should be updated here under today\\\'s pricing return time value.', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Deleting_Early_Config_Report_If_Present(page, vars);
    await stepGroups.stepGroup_Navigating_to_Bulk_Batch_Timing(page, vars);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText("Bulk Batch Timing")).toBeVisible();
    await stepGroups.stepGroup_Modifying_The_Batch_Intervals(page, vars);
    vars["LastBatchTime(withspace)"] = await page.locator("(//h5[@class=\"mb-0\"])[last()]").textContent() || '';
    vars["DeletedBatchTime1"] = await page.locator("(//h5[@class=\"mb-0\"])[last()]").textContent() || '';
    vars["BufferTime"] = await page.locator("//input[@id=\"pricingReturnTimeBuffer\"]").inputValue() || '';
    vars["BufferedDeletedBatchTime1"] = (() => {
      const d = new Date('2000-01-01 ' + String(vars["LastBatchTime(withspace)"]));
      d.setMinutes(d.getMinutes() + parseInt(String(vars["BufferTime"])));
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }); // Format: hh:mm a
    })();
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.locator("(//div[@class=\"card-body\"])[last()]").hover();
    await page.locator("(//button[@aria-label=\"Delete Batch Time\"])[last()]").hover();
    await expect(page.getByText("Delete Batch Time")).toBeVisible();
    await page.locator("(//button[@aria-label=\"Delete Batch Time\"])[last()]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//span[normalize-space(text())=\"Delete batch\"]//parent::button")).toContainText("Delete batch");
    await page.locator("//span[normalize-space(text())=\"Delete batch\"]//parent::button").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.waitForTimeout(3000);
    await expect(page.getByText(vars["DeletedBatchTime1"])).not.toBeVisible();
    await page.reload();
    await page.waitForLoadState('networkidle');
    await stepGroups.stepGroup_Delete_Last_Batch_Time(page, vars);
    await page.waitForTimeout(3000);
    await expect(page.getByText(vars["LastBatchTime(withspace)"])).not.toBeVisible();
    vars["DeletedBatchTime2"] = vars["LastBatchTime(withspace)"];
    await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText("Bid Requests")).toBeVisible();
    await page.locator("//button[text()[normalize-space() = \"Upload New Bid Request\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText("Bid Request Details\r")).toBeVisible();
    await page.locator("//*[@id=\"pricingReturnTimeDropdown\"]//select[contains(@class,\"form-select\")]").click();
    await expect(page.locator("//select[@class=\"form-select ng-pristine ng-invalid ng-touched\"] | //select[@class=\"form-select ng-untouched ng-pristine ng-invalid\"]").locator('option', { hasText: vars["BufferedDeletedBatchTime1"] })).not.toBeVisible();
    await expect(page.locator("//select[@class=\"form-select ng-pristine ng-invalid ng-touched\"] | //select[@class=\"form-select ng-untouched ng-pristine ng-invalid\"]").locator('option', { hasText: vars["BufferedDeletedBatchTime2"] })).not.toBeVisible();
  });
});
