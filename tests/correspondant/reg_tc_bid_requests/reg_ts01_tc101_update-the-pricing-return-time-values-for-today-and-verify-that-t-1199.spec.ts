import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS01_TC10.1_Update the pricing return time values for today and verify that the same should be displayed in the dropdown list for today.', async ({ page }) => {
    // Prerequisite: REG_TS01_TC10_Update the pricing return time values for today and verify that the same should be dis
    // TODO: Ensure prerequisite test passes first

    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText("Bid Requests")).toBeVisible();
    await page.locator("//button[text()[normalize-space() = \"Upload New Bid Request\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText("Bid Request Details")).toBeVisible();
    vars["space"] = "Key_blank";
    vars["BatchNum"] = "1";
    await page.locator("//*[@id=\"pricingReturnTimeDropdown\"]//select[contains(@class,\"form-select\")]").click();
    vars["OptionsCountInPricingDropdown"] = String(await page.locator("(//select[@aria-label=\"Dropdown selection\"])[3]//option[position() >=2 and position() <=last()]\n\n\n").count());
    while (parseFloat(String(vars["BatchNum"])) <= parseFloat(String(vars["OptionsCountInPricingDropdown"]))) {
      for (let dataIdx = parseInt(vars["BatchNum"]); dataIdx <= parseInt(vars["BatchNum"]); dataIdx++) {
        vars["BatchTime"] = testData["batch time"];
        await expect(page.locator("//option[contains(text(),\"$|BatchTime|\")]")).toBeVisible();
        vars["BatchNum"] = (parseFloat(String("1")) + parseFloat(String(vars["BatchNum"]))).toFixed(0);
      }
    }
  });
});
