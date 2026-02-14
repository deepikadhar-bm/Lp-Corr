import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_General Settings', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS04_TC06_Bulk Batch Timing - Click on the Modify Batch Intervals, and in the displayed Popup Modify the Timings and Click on the Today and Future Business Days.', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Navigating_to_Bulk_Batch_Timing(page, vars);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText("Bulk Batch Timing")).toBeVisible();
    await stepGroups.stepGroup_Modifying_The_batch_Intervals_with_current_est_time(page, vars);
    vars["ExpectedBatch2Time"] = (() => {
      const d = new Date('2000-01-01 ' + String(vars["CurrentTime"]));
      d.setMinutes(d.getMinutes() + parseInt(String("5")));
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }); // Format: hh:mm a
    })();
    await expect(page.locator("//*[contains(@class,\"card-subtitle\") and contains(text(),\"Batch 1\")]/../..//*[@class=\"mb-0\"]")).toContainText(vars["CurrentTime"]);
    await expect(page.locator("//*[contains(@class,\"card-subtitle\") and contains(text(),\"Batch 2\")]/../..//*[@class=\"mb-0\"]")).toContainText(vars["ExpectedBatch2Time"]);
    await stepGroups.stepGroup_Modifying_The_batch_Intervals_with_current_est_time(page, vars);
  });
});
