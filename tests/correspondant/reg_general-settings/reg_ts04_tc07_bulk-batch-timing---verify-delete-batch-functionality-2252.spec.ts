import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_General Settings', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS04_TC07_Bulk Batch Timing - Verify Delete batch functionality', async ({ page }) => {
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
    await stepGroups.stepGroup_Verifying_the_Last_Modified_Data_In_the_Right_corner_screen(page, vars);
    await page.waitForTimeout(3000);
    vars["DeletedBatchTime2"] = vars["LastBatchTime(withspace)"];
    await expect(page.getByText(vars["DeletedBatchTime2"])).not.toBeVisible();
    // [DISABLED] Click on BidRequests_Menu
    // await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    // [DISABLED] Wait until the element Spinner is not visible
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Verify that the current page displays text Bid Requests
    // await expect(page.getByText("Bid Requests")).toBeVisible();
    // [DISABLED] Click on Upload New Bid Request Button
    // await page.locator("//button[text()[normalize-space() = \"Upload New Bid Request\"]]").click();
    // [DISABLED] Wait until the element Spinner is not visible
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Verify that the current page displays text Bid Request Details
    // await expect(page.getByText("Bid Request Details\r")).toBeVisible();
    // [DISABLED] Click on Today_Pricing
    // await page.locator("//*[@id=\"pricingReturnTimeDropdown\"]//select[contains(@class,\"form-select\")]").click();
    // [DISABLED] Verify that the option Select_Pricing_Batch_Dropdown in the dropdown is not present BufferedDeletedBatchTime1 and With Scrollable TRUE
    // await expect(page.locator("//select[@class=\"form-select ng-pristine ng-invalid ng-touched\"] | //select[@class=\"form-select ng-untouched ng-pristine ng-invalid\"]").locator('option', { hasText: vars["BufferedDeletedBatchTime1"] })).not.toBeVisible();
    // [DISABLED] Verify that the option Select_Pricing_Batch_Dropdown in the dropdown is not present BufferedDeletedBatchTime2 and With Scrollable TRUE
    // await expect(page.locator("//select[@class=\"form-select ng-pristine ng-invalid ng-touched\"] | //select[@class=\"form-select ng-untouched ng-pristine ng-invalid\"]").locator('option', { hasText: vars["BufferedDeletedBatchTime2"] })).not.toBeVisible();
  });
});
