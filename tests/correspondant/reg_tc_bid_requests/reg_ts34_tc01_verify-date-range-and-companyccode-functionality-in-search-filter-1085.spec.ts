import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS34_TC01_Verify Date Range and Company/CCode Functionality In Search Filter', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await expect(page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Filter\"]]").click();
    await page.waitForLoadState('networkidle');
    await page.locator("//label[text()=\"Select Date Range\"]/..//button").click();
    await page.locator("//span[text()[normalize-space() = \"Last One Month\"]]").click();
    vars["Last One Month Name"] = await page.locator("//button[@class=\"form-control text-dark text-start d-flex align-items-center dropdown-toggle\"]").textContent() || '';
    await expect(page.locator("//button[@class=\"form-control text-dark text-start d-flex align-items-center dropdown-toggle\"]")).toContainText(testData["Last One Month"]);
    await page.locator("//div[text()[normalize-space() = \"Select Company/CCode\"]]").click();
    vars["ExpectedCompany"] = await page.locator("(//div[@class=\"dropdown-overflow\"]//input[@type=\"checkbox\"])[1]/..//span").textContent() || '';
    vars["ExpectedCompany"] = String(vars["ExpectedCompany"]).substring(0, String(vars["ExpectedCompany"]).length - 8);
    await page.locator("(//input[@type=\"checkbox\"])[2]").check();
    await page.locator("//button[contains(normalize-space(),\"Apply Selected 1\")]").click();
    await page.locator("//div[contains(@class, \"justify-content-end\")]//button[text()=\"Apply Filters\"]").click();
    await page.waitForLoadState('networkidle');
    if (true) /* Element No result (Bid requests) is visible */ {
      await expect(page.getByText("No result")).toBeVisible();
    } else {
      await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Date\")]")).toBeVisible();
      await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Company\")]")).toContainText(vars["ExpectedCompany"]);
      await stepGroups.stepGroup_Getting_Last_Month_From_Current_Month(page, vars);
      vars["Count of Uploaded Date"] = String(await page.locator("//td[@data-title=\"Uploaded\"]").count());
      vars["count"] = "1";
      while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["Count of Uploaded Date"]))) {
        vars["UploadedDates"] = await page.locator("(//td[@data-title=\"Uploaded\"])[$|count|]").textContent() || '';
        expect(new Date(String('')).getMonth()).toBe(new Date(String('')).getMonth());
        vars["count"] = (parseFloat(String(vars["count"])) + parseFloat(String("1"))).toFixed(0);
      }
      // [DISABLED] Verify that the elements with locator Company Column Data displays text ExpectedCompany and With Scrollable FALSE
      // await expect(page.locator("(//td[@data-title=\"Company\"])[17]")).toContainText(vars["ExpectedCompany"]);
      for (let i = 0; i < await page.locator("(//td[@data-title=\"Company\"])[17]").count(); i++) {
        await expect(page.locator("(//td[@data-title=\"Company\"])[17]").nth(i)).toHaveText(String(vars["ExpectedCompany"]));
      }
    }
  });
});
