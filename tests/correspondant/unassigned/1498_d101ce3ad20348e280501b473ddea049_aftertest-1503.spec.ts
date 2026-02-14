import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('1498_d101ce3ad20348e280501b473ddea049_aftertest', async ({ page }) => {
    if (true) /* Test Case Result is Failed */ {
      await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
      await page.locator("//a[@aria-label=\"General Settings\"]//span[text()=\"General Settings\"]").click();
      await page.locator("//a[@href=\"#/admin/general-settings/market-thresholds\"]").click();
      await page.locator("//td[@role=\"cell\"]//input[@type=\"checkbox\"]//..//..//button[contains(@aria-label,\"Edit Map\")]").click();
      await page.locator("//label[text()=\"Min Display Value\"]/..//input[contains(@aria-label,\"Enter minimum display value in percentage\")]").clear();
      await page.locator("//label[text()=\"Min Display Value\"]/..//input[contains(@aria-label,\"Enter minimum display value in percentage\")]").fill("1");
      await page.locator("//label[text()=\"Max Display Value\"]/..//input[contains(@aria-label,\"Enter maximum display value in percentage\")]").clear();
      await page.locator("//label[text()=\"Max Display Value\"]/..//input[contains(@aria-label,\"Enter maximum display value in percentage\")]").fill("120");
      await page.locator("//span[contains(text(),\"Update Threshold\")]").click();
    }
  });
});
