import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_PriceOffered', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS18_TC02_Ensure the sorting filter works correctly in both ascending and descending order - Verify for the list screen and the detail screen', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    vars["CommittedBidId"] = "87XBBBD565A1";
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["CommittedBidId"]);
    await page.locator("//tr[td[normalize-space(.)='Committed']]//a").click();
    vars["ColumnHeadersDetailsScreenUI"] = String(await page.locator("(//th//div[@role=\"button\"])[position() >=1 and position() <= last()]").count());
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["ColumnHeadersDetailsScreenUI"]))) {
      vars["IndividualHeaderScreenDetails"] = await page.locator("((//th//div[@role=\"button\"])[position() >=1 and position() <= 10])[$|count|]").textContent() || '';
      vars["IndividualHeaderScreenDetails"] = String(vars["IndividualHeaderScreenDetails"]).substring(1, String(vars["IndividualHeaderScreenDetails"]).length - 1);
      await page.locator("((//th//div[@role=\"button\"])[position() >=1 and position() <= 10])[$|count|]").click();
      await expect(page.locator("//span[contains(@class, 'small') and contains(@class, 'fa-sort-down')]")).toBeVisible();
      await page.locator("(//th[@aria-label=\"$|IndividualHeaderScreenDetails|\"])[1]").waitFor({ state: 'visible' });
      if (String(vars["IndividualHeaderScreenDetails"]) === String("Loan Amount")) {
        {
          const texts = await page.locator("//td[@data-title=\"$|IndividualHeaderScreenDetails|\"]//div\n").allTextContents();
          const nums = texts.map(t => parseFloat(t));
          const sorted = [...nums].sort((a, b) => a - b);
          expect(nums).toEqual(sorted);
        }
      } else if (String(vars["IndividualHeaderScreenDetails"]) === String("Mark Adj")) {
        {
          const texts = await page.locator("//td[@data-title=\"$|IndividualHeaderScreenDetails|\"]//div\n").allTextContents();
          const nums = texts.map(t => parseFloat(t));
          const sorted = [...nums].sort((a, b) => a - b);
          expect(nums).toEqual(sorted);
        }
      } else {
        {
          const texts = await page.locator("//td[@data-title=\"$|IndividualHeaderScreenDetails|\"]//div\n").allTextContents();
          const sorted = [...texts].sort((a, b) => a.localeCompare(b));
          expect(texts).toEqual(sorted);
        }
      }
      await page.locator("((//th//div[@role=\"button\"])[position() >=1 and position() <= 10])[$|count|]").click();
      await expect(page.locator("//span[contains(@class, 'small') and contains(@class, 'fa-sort-up')]")).toBeVisible();
      await page.locator("(//th[@aria-label=\"$|IndividualHeaderScreenDetails|\"])[1]").waitFor({ state: 'visible' });
      await page.waitForTimeout(4000);
      if (String(vars["IndividualHeaderScreenDetails"]) === String("Loan Amount")) {
        {
          const texts = await page.locator("//td[@data-title=\"$|IndividualHeaderScreenDetails|\"]//div\n").allTextContents();
          const nums = texts.map(t => parseFloat(t));
          const sorted = [...nums].sort((a, b) => a - b);
          expect(nums).toEqual(sorted);
        }
      } else if (String(vars["IndividualHeaderScreenDetails"]) === String("Mark Adj")) {
        {
          const texts = await page.locator("//td[@data-title=\"$|IndividualHeaderScreenDetails|\"]//div\n").allTextContents();
          const nums = texts.map(t => parseFloat(t));
          const sorted = [...nums].sort((a, b) => a - b);
          expect(nums).toEqual(sorted);
        }
      } else {
        {
          const texts = await page.locator("//td[@data-title=\"$|IndividualHeaderScreenDetails|\"]//div\n").allTextContents();
          const sorted = [...texts].sort((a, b) => a.localeCompare(b));
          expect(texts).toEqual(sorted);
        }
      }
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    vars["count"] = "1";
    await page.locator("//div[@id='price-offered-list-tabs']//span[text()[normalize-space() = \"Locked/Committed Loans\"]]").click();
    await expect(page.locator("//button[@id='commitdropdownMenuButton']")).toBeVisible();
    await expect(page.locator("//button[text()[normalize-space() = \"Paste Loans\"]]")).toBeVisible();
    vars["ColumnHeadersDetailsScreenUI"] = String(await page.locator("(//th//div[@role=\"button\"])[position() >=1 and position() <= last()]").count());
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["ColumnHeadersDetailsScreenUI"]))) {
      vars["IndividualHeaderScreenDetails"] = await page.locator("((//th//div[@role=\"button\"])[position() >=1 and position() <= 10])[$|count|]").textContent() || '';
      vars["IndividualHeaderScreenDetails"] = String(vars["IndividualHeaderScreenDetails"]).substring(1, String(vars["IndividualHeaderScreenDetails"]).length - 1);
      await page.locator("((//th//div[@role=\"button\"])[position() >=1 and position() <= 10])[$|count|]").click();
      await expect(page.locator("//span[contains(@class, 'small') and contains(@class, 'fa-sort-down')]")).toBeVisible();
      await page.locator("(//th[@aria-label=\"$|IndividualHeaderScreenDetails|\"])[1]").waitFor({ state: 'visible' });
      if (String(vars["IndividualHeaderScreenDetails"]) === String("Loan Amount")) {
        {
          const texts = await page.locator("//td[@data-title=\"$|IndividualHeaderScreenDetails|\"]//div\n").allTextContents();
          const nums = texts.map(t => parseFloat(t));
          const sorted = [...nums].sort((a, b) => a - b);
          expect(nums).toEqual(sorted);
        }
      } else if (true) /* Verify if IndividualHeaderScreenDetails == Mark Adj */ {
        {
          const texts = await page.locator("//td[@data-title=\"$|IndividualHeaderScreenDetails|\"]//div\n").allTextContents();
          const nums = texts.map(t => parseFloat(t));
          const sorted = [...nums].sort((a, b) => a - b);
          expect(nums).toEqual(sorted);
        }
      } else {
        {
          const texts = await page.locator("//td[@data-title=\"$|IndividualHeaderScreenDetails|\"]//div\n").allTextContents();
          const nums = texts.map(t => parseFloat(t));
          const sorted = [...nums].sort((a, b) => a - b);
          expect(nums).toEqual(sorted);
        }
      }
      await page.locator("((//th//div[@role=\"button\"])[position() >=1 and position() <= 10])[$|count|]").click();
      await expect(page.locator("//span[contains(@class, 'small') and contains(@class, 'fa-sort-up')]")).toBeVisible();
      await page.locator("(//th[@aria-label=\"$|IndividualHeaderScreenDetails|\"])[1]").waitFor({ state: 'visible' });
      await page.waitForTimeout(4000);
      if (String(vars["IndividualHeaderScreenDetails"]) === String("Loan Amount")) {
        {
          const texts = await page.locator("//td[@data-title=\"$|IndividualHeaderScreenDetails|\"]//div\n").allTextContents();
          const nums = texts.map(t => parseFloat(t));
          const sorted = [...nums].sort((a, b) => a - b);
          expect(nums).toEqual(sorted);
        }
      } else if (String(vars["IndividualHeaderScreenDetails"]) === String("Mark Adj")) {
        {
          const texts = await page.locator("//td[@data-title=\"$|IndividualHeaderScreenDetails|\"]//div\n").allTextContents();
          const nums = texts.map(t => parseFloat(t));
          const sorted = [...nums].sort((a, b) => a - b);
          expect(nums).toEqual(sorted);
        }
      } else {
        {
          const texts = await page.locator("//td[@data-title=\"$|IndividualHeaderScreenDetails|\"]//div\n").allTextContents();
          const nums = texts.map(t => parseFloat(t));
          const sorted = [...nums].sort((a, b) => a - b);
          expect(nums).toEqual(sorted);
        }
      }
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
  });
});
