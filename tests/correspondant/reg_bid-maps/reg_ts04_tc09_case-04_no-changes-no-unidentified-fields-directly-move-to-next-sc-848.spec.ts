import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS04_TC09_CASE-04_No changes / No unidentified fields : Directly move to next screen without prompt.', async ({ page }) => {
    // Prerequisite: REG_TS04_TC08_CASE-03_ They have changes and they don't have unidentified field - Message should be 
    // TODO: Ensure prerequisite test passes first

    vars["headername"] = String(await page.locator("//div[@class=\"gap-2 header-grid-layout\"]").count());
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["headername"]))) {
      await expect(page.locator("(//div[@class=\"flex-grow-1\"]/../..//div[@class=\"gap-2 header-grid-layout\"])[$|count|]")).toBeVisible();
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]")).toBeVisible();
  });
});
