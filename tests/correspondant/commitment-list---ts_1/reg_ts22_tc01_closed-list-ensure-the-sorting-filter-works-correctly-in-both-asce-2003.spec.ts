import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Commitment List - TS_1', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS22_TC01_Closed List : Ensure the sorting filter works correctly in both ascending and descending order - Verify for the list screen', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//div[normalize-space()=\"Closed List\"]").click();
    vars["CountOfColumnHeaders"] = String(await page.locator("(//th//div[@role=\"button\"])[position() >=1 and position() < last()]").count());
    vars["HeadersUI"] = " Comm. Loans and Comm. Amount and Amt. Delivered ";
    vars["HeadersUI1"] = " Comm. Date and Closed Date and  Expiration Date  ";
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String("11"))) {
      vars["IndividualHeaderUI"] = await page.locator("((//th//div[@role=\"button\"])[position() >=1 and position() <= 13])[$|count|]").textContent() || '';
      vars["IndividualHeaderUI"] = String(vars["IndividualHeaderUI"]).substring(1, String(vars["IndividualHeaderUI"]).length - 1);
      // [DISABLED] Trim white space from IndividualHeaderUI and store it in a runtime IndividualHeaderUI
      // vars["IndividualHeaderUI"] = String(vars["IndividualHeaderUI"]).trim();
      if (String(vars["HeadersUI"]).includes(String(vars["IndividualHeaderUI"]))) {
        await page.waitForLoadState('networkidle');
        await page.locator("(//th//div[@role=\"button\"])[$|count|]").click();
        await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
        await expect(page.locator("//span[contains(@class, 'small') and contains(@class, 'fa-sort-down')]")).toBeVisible();
        await page.locator("(//td[@data-title=\"$|IndividualHeaderUI|\"])[1]").waitFor({ state: 'visible' });
        await page.locator("(//td[@data-title=\"Closed Date\"]/parent::*//div[contains(@aria-label,'Expiration Date')])[1]").waitFor({ state: 'visible' });
        {
          const texts = await page.locator("//td[@data-title=\"$|IndividualHeaderUI|\"]//*[not(@aria-label=\"Expiration Date: \")]").allTextContents();
          const nums = texts.map(t => parseFloat(t));
          const sorted = [...nums].sort((a, b) => a - b);
          expect(nums).toEqual(sorted);
        }
        await page.locator("(//th//div[@role=\"button\"])[$|count|]").click();
        await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
        await expect(page.locator("//span[contains(@class, 'small') and contains(@class, 'fa-sort-up')]")).toBeVisible();
        await page.locator("(//td[@data-title=\"$|IndividualHeaderUI|\"])[1]").waitFor({ state: 'visible' });
        await page.waitForTimeout(4000);
        {
          const texts = await page.locator("//td[@data-title=\"$|IndividualHeaderUI|\"]//*[not(@aria-label=\"Expiration Date: \")]").allTextContents();
          const nums = texts.map(t => parseFloat(t));
          const sorted = [...nums].sort((a, b) => a - b);
          expect(nums).toEqual(sorted);
        }
      } else if (String(vars["HeadersUI1"]).includes(String(vars["IndividualHeaderUI"]))) {
        await page.waitForLoadState('networkidle');
        await page.locator("(//th//div[@role=\"button\"])[$|count|]").click();
        await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
        await expect(page.locator("//span[contains(@class, 'small') and contains(@class, 'fa-sort-down')]")).toBeVisible();
        await page.locator("(//td[@data-title=\"$|IndividualHeaderUI|\"])[1]").waitFor({ state: 'visible' });
        await page.locator("(//td[@data-title=\"Closed Date\"]/parent::*//div[contains(@aria-label,'Expiration Date')])[1]").waitFor({ state: 'visible' });
        {
          const texts = await page.locator("//td[@data-title=\"$|IndividualHeaderUI|\"]//*[not(@aria-label=\"Expiration Date: \")]").allTextContents();
          const dates = texts.map(t => new Date(t).getTime());
          const sorted = [...dates].sort((a, b) => a - b);
          expect(dates).toEqual(sorted);
        }
        await page.locator("(//th//div[@role=\"button\"])[$|count|]").click();
        await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
        await expect(page.locator("//span[contains(@class, 'small') and contains(@class, 'fa-sort-up')]")).toBeVisible();
        await page.locator("(//td[@data-title=\"$|IndividualHeaderUI|\"])[1]").waitFor({ state: 'visible' });
        await page.waitForTimeout(4000);
        {
          const texts = await page.locator("//td[@data-title=\"$|IndividualHeaderUI|\"]//*[not(@aria-label=\"Expiration Date: \")]").allTextContents();
          const dates = texts.map(t => new Date(t).getTime());
          const sorted = [...dates].sort((a, b) => a - b);
          expect(dates).toEqual(sorted);
        }
      } else {
        await page.locator("(//th//div[@role=\"button\"])[$|count|]").click();
        await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
        await expect(page.locator("//span[contains(@class, 'small') and contains(@class, 'fa-sort-down')]")).toBeVisible();
        await page.locator("(//td[@data-title=\"$|IndividualHeaderUI|\"])[1]").waitFor({ state: 'visible' });
        await page.locator("(//td[@data-title=\"Closed Date\"]/parent::*//div[contains(@aria-label,'Expiration Date')])[1]").waitFor({ state: 'visible' });
        {
          const texts = await page.locator("//td[@data-title=\"$|IndividualHeaderUI|\"]//*[not(@aria-label=\"Expiration Date: \")]").allTextContents();
          const sorted = [...texts].sort((a, b) => a.localeCompare(b));
          expect(texts).toEqual(sorted);
        }
        await page.locator("(//th//div[@role=\"button\"])[$|count|]").click();
        await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
        await expect(page.locator("//span[contains(@class, 'small') and contains(@class, 'fa-sort-up')]")).toBeVisible();
        await page.locator("(//td[@data-title=\"$|IndividualHeaderUI|\"])[1]").waitFor({ state: 'visible' });
        await page.waitForTimeout(4000);
        {
          const texts = await page.locator("//td[@data-title=\"$|IndividualHeaderUI|\"]//*[not(@aria-label=\"Expiration Date: \")]").allTextContents();
          const sorted = [...texts].sort((a, b) => a.localeCompare(b));
          expect(texts).toEqual(sorted);
        }
      }
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
  });
});
