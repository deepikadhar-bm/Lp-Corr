import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS24_TC02_01_Verify that submit for pricing button should be disabled for the status and the Queued Time text Should be Red In colour for passed time.', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await expect(page.locator("//li[@class=\"nav-item\"]//a[@href=\"#/bid-requests\"]")).toBeVisible();
    vars["count"] = "1";
    vars["TotalStatusCount"] = "4";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["TotalStatusCount"]))) {
      await page.locator("//li[@class=\"nav-item\"]//a[@href=\"#/bid-requests\"]").click();
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      await expect(page.getByText("Bid Requests\r\r")).toBeVisible();
      if (await page.locator("//i[contains(@class, 'fa-times-circle')]").isVisible()) {
        await page.locator("//i[contains(@class, 'fa-times-circle')]").click();
      }
      await page.locator("//span[text()[normalize-space() = \"Filter\"]]").click();
      await page.locator("//div[text()[normalize-space() = \"Select Bid Request Status\"]]/..").click();
      if (String(vars["count"]) === String("1")) {
        vars["StatusToBeSet"] = "Processing Failed";
      } else if (String(vars["count"]) === String("2")) {
        vars["StatusToBeSet"] = "Cancelled";
      } else if (String(vars["count"]) === String("3")) {
        vars["StatusToBeSet"] = "Committed";
      } else {
        vars["StatusToBeSet"] = "Deleted";
      }
      await expect(page.locator("(//input[@id=\"searchBox\"])[2]")).toBeVisible();
      await page.locator("(//input[@id=\"searchBox\"])[2]").fill(vars["StatusToBeSet"]);
      await page.getByText(vars["StatusToBeSet"]).waitFor({ state: 'visible' });
      await expect(page.locator("//label[.//span[normalize-space(.)=\"$|StatusToBeSet|\"]]//input[@type=\"checkbox\"]")).toBeEnabled();
      await page.locator("//label[.//span[normalize-space(.)=\"$|StatusToBeSet|\"]]//input[@type=\"checkbox\"]").check();
      await expect(page.locator("//label[.//span[normalize-space(.)=\"$|StatusToBeSet|\"]]//input[@type=\"checkbox\"]")).toBeVisible();
      await page.locator("//button[contains(text(),\" Apply Selected \")]").click();
      await page.locator("//div[contains(@class, \"justify-content-end\")]//button[text()=\"Apply Filters\"]").click();
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      if (true) /* Element Select_Date_Range_Error is visible */ {
        await page.locator("//i[@class=\"fas fa-times-circle text-primary\"]").click();
      }
      await page.locator("//td[@data-title=\"Bid Req. ID\"]").click();
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      await expect(page.locator("//span[@class=\"text-danger\" and contains(text(),\"Queued For\")]")).toBeVisible();
      await expect(page.locator("//div[@id=\"page-footer\"]//button[@disabled]")).toBeDisabled();
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
  });
});
