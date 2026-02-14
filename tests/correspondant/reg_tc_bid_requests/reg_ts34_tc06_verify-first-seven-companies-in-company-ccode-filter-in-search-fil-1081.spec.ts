import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS34_TC06_Verify First Seven Companies In Company Ccode Filter In Search Filter Dropdown', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await expect(page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String("7"))) {
      // [DISABLED] Click on Clear all Button
      // await page.locator("//span[@role=\"button\" and @aria-label=\"Clear all chips\"]").click();
      if (await page.locator("//span[@role=\"button\" and @aria-label=\"Clear all chips\"]").isVisible()) {
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
    // [DISABLED] Store text from the element Company Name On Bid Request Page into a variable company name
    // vars["company name"] = await page.locator("//div[@class=\"pill rounded-pill relative\"]").textContent() || '';
    // [DISABLED] Remove the no of ( 9,0 ) positions of given string company name and store into runtime variable company_name1
    // vars["company_name1"] = String(vars["company name"]).substring(9);
    // [DISABLED] Verify that the element Company Name On Bid Request Page displays text company_name1 and With Scrollable FALSE
    // await expect(page.locator("//div[@class=\"pill rounded-pill relative\"]")).toContainText(vars["company_name1"]);
  });
});
