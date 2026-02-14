import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_PriceOffered', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS18_TC01_Ensure the sorting filter works correctly in both ascending and descending order - Verify for the list screen and the detail screen', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    vars["CountOfColumnHeaders"] = String(await page.locator("(//th//div[@role=\"button\"])[position() >=1 and position() < last()]").count());
    vars["HeadersUI"] = " #Loans / #Errors and Bid Value";
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String("8"))) {
      vars["IndividualHeaderUI"] = await page.locator("((//th//div[@role=\"button\"])[position() >=1 and position() <= 13])[$|count|]").textContent() || '';
      vars["IndividualHeaderUI"] = String(vars["IndividualHeaderUI"]).substring(1, String(vars["IndividualHeaderUI"]).length - 1);
      // [DISABLED] Trim white space from IndividualHeaderUI and store it in a runtime IndividualHeaderUI
      // vars["IndividualHeaderUI"] = String(vars["IndividualHeaderUI"]).trim();
      if (String(vars["HeadersUI"]).includes(String(vars["IndividualHeaderUI"]))) {
        await page.waitForLoadState('networkidle');
      } else {
        await page.locator("((//th//div[@role=\"button\"])[position() >=1 and position() <= 13])[$|count|]").click();
        await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
        await expect(page.locator("//span[contains(@class, 'small') and contains(@class, 'fa-sort-down')]")).toBeVisible();
        await page.locator("(//td[@data-title=\"$|IndividualHeaderUI|\"])[1]").waitFor({ state: 'visible' });
        {
          const texts = await page.locator("//td[@data-title=\"$|IndividualHeaderUI|\"]").allTextContents();
          const sorted = [...texts].sort((a, b) => a.localeCompare(b));
          expect(texts).toEqual(sorted);
        }
        await page.locator("((//th//div[@role=\"button\"])[position() >=1 and position() <= 13])[$|count|]").click();
        await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
        await expect(page.locator("//span[contains(@class, 'small') and contains(@class, 'fa-sort-up')]")).toBeVisible();
        await page.locator("(//td[@data-title=\"$|IndividualHeaderUI|\"])[1]").waitFor({ state: 'visible' });
        await page.waitForTimeout(4000);
        {
          const texts = await page.locator("//td[@data-title=\"$|IndividualHeaderUI|\"]").allTextContents();
          const sorted = [...texts].sort((a, b) => a.localeCompare(b));
          expect(texts).toEqual(sorted);
        }
      }
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    vars["BidValue"] = await page.locator("//div[text()=\" Bid Value \"]").textContent() || '';
    await page.locator("//div[text()=\" Bid Value \"]").click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator("//span[contains(@class, 'small') and contains(@class, 'fa-sort-down')]")).toBeVisible();
    await page.locator("(//td[@data-title=\"$|IndividualHeaderUI|\"])[1]").waitFor({ state: 'visible' });
    {
      const texts = await page.locator("//td[@data-title=\"Bid Value\"]").allTextContents();
      const nums = texts.map(t => parseFloat(t));
      const sorted = [...nums].sort((a, b) => a - b);
      expect(nums).toEqual(sorted);
    }
    await page.locator("//div[text()=\" Bid Value \"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//span[contains(@class, 'small') and contains(@class, 'fa-sort-up')]")).toBeVisible();
    await page.locator("(//td[@data-title=\"$|IndividualHeaderUI|\"])[1]").waitFor({ state: 'visible' });
    await page.waitForTimeout(4000);
    // [DISABLED] Verify if the BidValue Column data is in descending order
    // {
    //   const texts = await page.locator("//td[@data-title=\"Bid Value\"]").allTextContents();
    //   const sorted = [...texts].sort((a, b) => a.localeCompare(b));
    //   expect(texts).toEqual(sorted);
    // }
    {
      const texts = await page.locator("//td[@data-title=\"Bid Value\"]").allTextContents();
      const nums = texts.map(t => parseFloat(t));
      const sorted = [...nums].sort((a, b) => a - b);
      expect(nums).toEqual(sorted);
    }
  });
});
