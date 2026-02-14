import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS35_TC01_Verify that entering 3 or more digits in the search input displays bid records that match the entered values.', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await expect(page.locator("//li[@class=\"nav-item\"]//a[@href=\"#/bid-requests\"]")).toBeVisible();
    await page.locator("//li[@class=\"nav-item\"]//a[@href=\"#/bid-requests\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText("Bid Requests")).toBeVisible();
    await expect(page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]")).toBeVisible();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill("878");
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Verify that the elements with locator All Bid Requests(Bid Requests) displays text 878 and With Scrollable TRUE
    // await expect(page.locator("//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Bid Req. ID\"]//button")).toContainText("878");
    vars["TotalCount"] = String(await page.locator("//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Bid Req. ID\"]//button").count());
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["TotalCount"]))) {
      await expect(page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Bid Req. ID\"]//button)[$|count|]")).toHaveAttribute('aria-label', "878");
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    vars["count"] = "1";
    if (true) /* Element Navigate To Page is visible */ {
      await page.locator("(//div[@aria-label=\"Pagination Controls\"]//span)[4]").click();
      await expect(page.locator("(//div[@aria-label=\"Pagination Controls\"]//span)[3]")).toContainText("Page 2");
      while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["TotalCount"]))) {
        await expect(page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Bid Req. ID\"]//button)[$|count|]")).toHaveAttribute('aria-label', "878");
        vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
      }
    }
  });
});
