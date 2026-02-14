import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS22_TC07_02_Reprice bid for #Bid req ID\\\" popup : Modify the bulk batch time config for today, and validate that Today\\\'s pricing return time values are updated accordingly, when bid requested da', async ({ page }) => {
    // Prerequisite: REG_TS22_TC07_01_Reprice bid for #Bid req ID" popup : Modify the bulk batch time config for today, a
    // TODO: Ensure prerequisite test passes first

    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await expect(page.locator("//form//div//label[text()=\"Bid Requested Date\"]")).toBeVisible();
    await expect(page.locator("(//form//div[@class=\"col\"]//div//input[@name=\"bidRequestDate\"])[1]")).toBeEnabled();
    await page.locator("//select[@aria-label=\"Dropdown selection\"]").click();
    vars["DropdownValue"] = String(await page.locator("(//select[@aria-label=\"Dropdown selection\"]//option)[position() > 1 and position() <= last()]").count());
    vars["count"] = "1";
    vars["count1"] = "0";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["DropdownValue"]))) {
      vars["Value"] = await page.locator("((//select[@aria-label=\"Dropdown selection\"]//option)[position() > 1 and position() <= last()])[$|count|]").textContent() || '';
      for (let dataIdx = parseInt(vars["count"]); dataIdx <= parseInt(vars["count"]); dataIdx++) {
        expect(String(testData["Stored_Text"])).toBe(vars["Value"]);
        vars["count1"] = (parseFloat(String("1")) + parseFloat(String(vars["count1"]))).toFixed(0);
      }
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    await page.locator("//i[contains(@class, 'fa-lg') and contains(@class, 'color-primary') and contains(@class, 'fa-times')]").click();
  });
});
