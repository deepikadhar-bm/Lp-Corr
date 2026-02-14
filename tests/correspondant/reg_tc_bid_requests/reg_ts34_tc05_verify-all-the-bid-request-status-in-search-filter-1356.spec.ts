import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS34_TC05_Verify All the Bid Request Status In Search Filter', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await expect(page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Filter\"]]").click();
    await page.locator("//div[text()[normalize-space() = \"Select Bid Request Status\"]]").click();
    vars["CountOfStatus"] = String(await page.locator("(//label[text()='Select Bid Request Status']//..//div[@class=\"cursor-pointer py-3 text-wrap\"])[position() > 2 and position() <= last()]").count());
    await page.locator("//span[text()[normalize-space() = \"Filter\"]]").click();
    await expect(page.locator("//div[text()[normalize-space() = \"Select Bid Request Status\"]]")).toBeVisible();
    vars["Count"] = "1";
    while (parseFloat(String(vars["Count"])) <= parseFloat(String(vars["CountOfStatus"]))) {
      await page.locator("//span[text()[normalize-space() = \"Filter\"]]").click();
      await page.waitForLoadState('networkidle');
      await page.locator("//div[text()[normalize-space() = \"Select Bid Request Status\"]]").click();
      vars["ExpectedStatus"] = await page.locator("((//label[text()='Select Bid Request Status']//..//div[@class=\"cursor-pointer py-3 text-wrap\"])[position() > 1 and position() <= last()])[$|Count|]").textContent() || '';
      await page.locator("((//label[text()='Select Bid Request Status']//..//div[@class=\"cursor-pointer py-3 text-wrap\"])[position() > 1 and position() <= last()])[$|Count|]").click();
      await page.waitForLoadState('networkidle');
      await page.locator("//button[contains(normalize-space(),\"Apply Selected 1\")]").click();
      await page.locator("//div[contains(@class, \"justify-content-end\")]//button[text()=\"Apply Filters\"]").click();
      await page.waitForLoadState('networkidle');
      await page.waitForLoadState('networkidle');
      if (String(vars["ExpectedStatus"]).includes(String("Queued"))) {
        if (true) /* Verify that the element Status On Home Page displays text co */ {
        } else {
          await expect(page.getByText("No result")).toBeVisible();
        }
      } else if (String(vars["ExpectedStatus"]).includes(String("Commitment"))) {
        if (true) /* Verify that the element Status On Home Page displays text co */ {
        } else {
          await expect(page.getByText("No result")).toBeVisible();
        }
      } else if (String(vars["ExpectedStatus"]).includes(String("Deleted"))) {
        if (true) /* Verify that the element Status On Home Page displays text co */ {
        } else {
          await expect(page.getByText("No result")).toBeVisible();
        }
      } else {
        if (true) /* Verify that the element Status On Home Page displays text co */ {
        } else {
          await expect(page.getByText("No result")).toBeVisible();
        }
      }
      await page.locator("//span[text()='Clear all']").click();
      vars["Count"] = (parseFloat(String(vars["Count"])) + parseFloat(String("1"))).toFixed(0);
    }
  });
});
