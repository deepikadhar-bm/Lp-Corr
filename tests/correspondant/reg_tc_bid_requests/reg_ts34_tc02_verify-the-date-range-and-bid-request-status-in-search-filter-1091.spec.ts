import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS34_TC02_Verify The Date range and Bid Request Status In Search Filter', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await expect(page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Filter\"]]").click();
    await page.waitForLoadState('networkidle');
    await page.locator("//label[text()=\"Select Date Range\"]/..//button").click();
    await page.locator("//span[text()[normalize-space() = \"Last One Month\"]]").click();
    // [DISABLED] Store text from the element Select Date Range Dropdown Value into a variable Last One Month
    // vars["Last One Month"] = await page.locator("//button[@class=\"form-control text-dark text-start d-flex align-items-center dropdown-toggle\"]").textContent() || '';
    await expect(page.locator("//button[@class=\"form-control text-dark text-start d-flex align-items-center dropdown-toggle\"]")).toContainText(testData["Last One Month"]);
    await page.locator("//div[text()[normalize-space() = \"Select Bid Request Status\"]]").click();
    vars["Count"] = "3";
    vars["ExpectedStatus"] = await page.locator("((//label[text()='Select Bid Request Status']//..//div[@class=\"cursor-pointer py-3 text-wrap\"])[position() > 1 and position() <= last()])[$|Count|]").textContent() || '';
    await page.locator("((//label[text()='Select Bid Request Status']//..//div[@class=\"cursor-pointer py-3 text-wrap\"])[position() > 1 and position() <= last()])[$|Count|]").click();
    await page.locator("(//button[@aria-label=\"Apply selected items\"])[2]").click();
    await page.locator("//div[contains(@class, \"justify-content-end\")]//button[text()=\"Apply Filters\"]").click();
    await stepGroups.stepGroup_Getting_Last_Month_From_Current_Month(page, vars);
    await page.waitForLoadState('networkidle');
    await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Date\")]")).toBeVisible();
    await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Status\")]")).toBeVisible();
    if (true) /* Element No result (Bid requests) is visible */ {
      await expect(page.getByText("No result")).toBeVisible();
    } else {
      vars["RowsCount"] = String(await page.locator("(//tbody//tr)[position() >= 1 and position() <= last()]").count());
      vars["LastMonthCount"] = String(await page.locator("//td[@data-title=\"Uploaded\"]//div[starts-with(text(),\" $|Last Month|\")]").count());
      expect(String(vars["LastMonthCount"])).toBe(vars["RowsCount"]);
      // [DISABLED] Verify that the elements with locator Bid Request Status Column Data displays text ExpectedStatus and With Scrollable FALSE
      // await expect(page.locator("//td[@data-title=\"Status\"]//span")).toContainText(vars["ExpectedStatus"]);
      for (let i = 0; i < await page.locator("//td[@data-title=\"Status\"]//span").count(); i++) {
        await expect(page.locator("//td[@data-title=\"Status\"]//span").nth(i)).toHaveText(String(vars["ExpectedStatus"]));
      }
    }
    await page.locator("//span[@role=\"button\" and @aria-label=\"Clear all chips\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Verifying_last_month_and_Required_status_In_filter(page, vars);
  });
});
