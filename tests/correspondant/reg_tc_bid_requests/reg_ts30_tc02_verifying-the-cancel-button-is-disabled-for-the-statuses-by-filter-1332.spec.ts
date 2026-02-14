import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS30_TC02_Verifying the Cancel Button is disabled for the statuses by filtering', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await expect(page.locator("//li[@class=\"nav-item\"]//a[@href=\"#/bid-requests\"]")).toBeVisible();
    vars["count"] = "1";
    vars["TotalStatusCount"] = "4";
    vars["DisabledOptions"] = "Processing Failed, Pricing in Progress, Price Offered, Partially Committed, Commitment in Progress, Cancelled, Expired";
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
        vars["StatusToBeSet"] = "Price Offered";
      } else if (String(vars["count"]) === String("3")) {
        vars["StatusToBeSet"] = "Expired";
      } else {
        vars["StatusToBeSet"] = "Cancelled";
      }
      await page.locator("(//label[text()='Select Bid Request Status']//..//div[@class=\"cursor-pointer py-3 text-wrap\"])[position() > 2 and position() <= last()]").evaluate(el => { (el as HTMLElement).scrollTop = (el as HTMLElement).scrollHeight; });
      await page.locator("//label[.//span[normalize-space(.)=\"$|StatusToBeSet|\"]]//input[@type=\"checkbox\"]").check();
      await expect(page.locator("//label[.//span[normalize-space(.)=\"$|StatusToBeSet|\"]]//input[@type=\"checkbox\"]")).toBeVisible();
      await page.locator("//button[contains(text(),\" Apply Selected \")]").click();
      await page.locator("//div[contains(@class, \"justify-content-end\")]//button[text()=\"Apply Filters\"]").click();
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      await expect(page.locator("(//button[@aria-label=\"Cancel Bid Request\"])[1]")).toBeVisible();
      expect(String(vars["DisabledOptions"])).toBe(vars["StatusToBeSet"]);
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
  });
});
