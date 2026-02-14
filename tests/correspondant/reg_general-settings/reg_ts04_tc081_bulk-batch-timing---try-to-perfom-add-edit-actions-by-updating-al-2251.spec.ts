import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_General Settings', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS04_TC08.1_Bulk Batch Timing - Try to perfom add / edit actions by updating already created batch timings', async ({ page }) => {
    // Prerequisite: REG_TS04_TC08_Bulk Batch Timing - Verify Edit batch functionality
    // TODO: Ensure prerequisite test passes first

    vars["ThirdBatchFromLast"] = await page.locator("(//div[@class=\"card-body\"]//h5)[position() = last()-2]").textContent() || '';
    await stepGroups.stepGroup_Separating_Hours_and_Minutes(page, vars);
    await page.locator("(//div[@class=\"card-body\"])[last()-1]").hover();
    await page.locator("(//button[@aria-label=\"Edit Batch Time\"])[last()-1]").click();
    await expect(page.getByText("Edit Batch Timing")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"H\"]]/preceding-sibling::input[@placeholder=\"0\"]").clear();
    await page.locator("//span[text()[normalize-space() = \"H\"]]/preceding-sibling::input[@placeholder=\"0\"]").fill(vars["Time_Hour"]);
    await page.locator("(//input[@placeholder=\"00\"])[1]").clear();
    await page.locator("(//input[@placeholder=\"00\"])[1]").fill(vars["Time_Min"]);
    await expect(page.locator("//span[text()[normalize-space() = \"Apply Changes\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Apply Changes\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText("Failed to Update Batch Timings")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Ok\"]]").click();
    await stepGroups.stepGroup_Verifying_the_Last_Modified_Data_In_the_Right_corner_screen(page, vars);
  });
});
