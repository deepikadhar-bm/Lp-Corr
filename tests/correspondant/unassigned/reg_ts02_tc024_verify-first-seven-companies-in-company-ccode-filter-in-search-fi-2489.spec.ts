import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS02_TC02.4_Verify First Seven Companies In Company Ccode Filter In Search Filter Dropdown', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await expect(page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String("7"))) {
      if (true) /* Element Clear all Button is visible */ {
        await page.locator("//span[@role=\"button\" and @aria-label=\"Clear all chips\"]").click();
      }
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Company\")]")).toBeVisible();
      await page.locator("//span[text()[normalize-space() = \"Filter\"]]").click();
      await page.waitForLoadState('networkidle');
      await page.locator("//div[text()[normalize-space() = \"Select Company/CCode\"]]").click();
      vars["ExpectedCompany"] = await page.locator("(((//div[@class=\"dropdown-overflow\"])[1]//span)[position() >= 1 and position() <= 7])[$|count|]").textContent() || '';
      await page.locator("(((//div[@class=\"dropdown-overflow\"])[1]//input)[position() >= 1 and position() <= 7])[$|count|]").check();
      await page.locator("//button[contains(normalize-space(),\"Apply Selected 1\")]").click();
      await page.locator("//div[contains(@class, \"justify-content-end\")]//button[text()=\"Apply Filters\"]").click();
      await page.waitForLoadState('networkidle');
      await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Company\")]")).toBeVisible();
      if (true) /* Element No result (Bid requests) is visible */ {
        await expect(page.getByText("No result")).toBeVisible();
      } else {
        vars["ExpectedCompany"] = String(vars["ExpectedCompany"]).substring(0, String(vars["ExpectedCompany"]).length - 8);
        vars["count1"] = "1";
        vars["All Company Count"] = String(await page.locator("(//div[normalize-space(text())='Company']//..//..//..//..//..//div[@class=\"text-nowrap\"])").count());
        while (parseFloat(String(vars["count1"])) <= parseFloat(String(vars["All Company Count"]))) {
          vars["IndividualCompany"] = await page.locator("(//div[normalize-space(text())='Company']//..//..//..//..//..//div[@class=\"text-nowrap\"])[$|count|]").textContent() || '';
          expect(String(vars["ExpectedCompany"])).toBe(vars["IndividualCompany"]);
          vars["count1"] = (parseFloat(String(vars["count1"])) + parseFloat(String("1"))).toFixed(0);
        }
      }
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
  });
});
