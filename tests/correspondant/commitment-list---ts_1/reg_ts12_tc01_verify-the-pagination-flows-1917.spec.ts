import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Commitment List - TS_1', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS12_TC01_Verify the pagination flows', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//button[@aria-label=\"Change Page Size\"]").click();
    vars["CountOfSetPageSize"] = String(await page.locator("//button[contains(@aria-label, \"Set page size to\")]").count());
    await page.locator("//button[@aria-label=\"Change Page Size\"]").click();
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["CountOfSetPageSize"]))) {
      await page.locator("//button[@aria-label=\"Change Page Size\"]").click();
      vars["IndividualSetPageSize"] = await page.locator("(//button[contains(@aria-label, \"Set page size to\")])[$|count|]").textContent() || '';
      await page.locator("(//button[contains(@aria-label, \"Set page size to\")])[$|count|]").click();
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      vars["RowsCount"] = String(await page.locator("//tbody//tr[@role=\"row\"]").count());
      expect(String(vars["IndividualSetPageSize"])).toBe(vars["RowsCount"]);
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
  });
});
