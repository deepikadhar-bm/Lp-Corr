import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS33_TC01_Verify Sorting Action [Ascending Order and Descending Order]', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await expect(page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["ColumnHeadersCount"] = String(await page.locator("(//th//div[@role=\"button\"])[position() >=1 and position() < last()]").count());
    vars["HeadersWithoutSorting"] = " Execution Type and  #Loans / #Errors and Bid Value ";
    // [DISABLED] Click on Go to Next Page Button
    // await page.locator("//span[contains(@class, 'dlp-icon') and contains(@class, 'fa-chevron-right')]").click();
    // [DISABLED] Click on Go to Next Page Button
    // await page.locator("//span[contains(@class, 'dlp-icon') and contains(@class, 'fa-chevron-right')]").click();
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String("7"))) {
      vars["IndividualHeaderName"] = await page.locator("((//th//div[@role=\"button\"])[position() >=1 and position() <= 7])[$|count|]").textContent() || '';
      vars["IndividualHeaderName"] = String(vars["IndividualHeaderName"]).substring(1, String(vars["IndividualHeaderName"]).length - 1);
      if (String(vars["HeadersWithoutSorting"]).includes(String(vars["IndividualHeaderName"]))) {
        await page.waitForLoadState('networkidle');
      } else {
        await page.locator("((//th//div[@role=\"button\"])[position() >=1 and position() <= 7])[$|count|]").click();
        await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
        await expect(page.locator("//span[contains(@class, 'small') and contains(@class, 'fa-sort-down')]")).toBeVisible();
        await page.locator("(//td[@data-title=\"$|IndividualHeaderName|\"])[1]").waitFor({ state: 'visible' });
        {
          const texts = await page.locator("//td[@data-title=\"$|IndividualHeaderName|\"]\n\n").allTextContents();
          const sorted = [...texts].sort((a, b) => a.localeCompare(b));
          expect(texts).toEqual(sorted);
        }
        await page.locator("((//th//div[@role=\"button\"])[position() >=1 and position() <= 7])[$|count|]").click();
        await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
        await expect(page.locator("//span[contains(@class, 'small') and contains(@class, 'fa-sort-up')]")).toBeVisible();
        await page.locator("(//td[@data-title=\"$|IndividualHeaderName|\"])[1]").waitFor({ state: 'visible' });
        await page.waitForTimeout(4000);
        {
          const texts = await page.locator("//td[@data-title=\"$|IndividualHeaderName|\"]\n\n").allTextContents();
          const sorted = [...texts].sort((a, b) => a.localeCompare(b));
          expect(texts).toEqual(sorted);
        }
      }
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    vars["RequestedDateHeaderName"] = await page.locator("(//th//div[@role=\"button\"])[8]").textContent() || '';
    await page.locator("(//th//div[@role=\"button\"])[8]").click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator("//span[contains(@class, 'small') and contains(@class, 'fa-sort-down')]")).toBeVisible();
    await page.locator("(//td[@data-title=\"Requested\"])[1]").waitFor({ state: 'visible' });
    {
      const texts = await page.locator("//td[@data-title=\"Requested\"]").allTextContents();
      const dates = texts.map(t => new Date(t).getTime());
      const sorted = [...dates].sort((a, b) => a - b);
      expect(dates).toEqual(sorted);
    }
    await page.locator("(//th//div[@role=\"button\"])[8]").click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator("//span[contains(@class, 'small') and contains(@class, 'fa-sort-up')]")).toBeVisible();
    await page.locator("(//td[@data-title=\"Requested\"])[1]").waitFor({ state: 'visible' });
    {
      const texts = await page.locator("//td[@data-title=\"Requested\"]").allTextContents();
      const dates = texts.map(t => new Date(t).getTime());
      const sorted = [...dates].sort((a, b) => a - b);
      expect(dates).toEqual(sorted);
    }
    await page.locator("(//th//div[@role=\"button\"])[9]").click();
    await page.locator("//td[@data-title=\"Uploaded\"][1]").waitFor({ state: 'visible' });
    await expect(page.locator("//span[contains(@class, 'small') and contains(@class, 'fa-sort-down')]")).toBeVisible();
    {
      const texts = await page.locator("//td[@data-title=\"Uploaded\"]").allTextContents();
      const dates = texts.map(t => new Date(t).getTime());
      const sorted = [...dates].sort((a, b) => a - b);
      expect(dates).toEqual(sorted);
    }
    await page.locator("(//th//div[@role=\"button\"])[9]").click();
    await page.locator("//td[@data-title=\"Uploaded\"][1]").waitFor({ state: 'visible' });
    await expect(page.locator("//span[contains(@class, 'small') and contains(@class, 'fa-sort-up')]")).toBeVisible();
    {
      const texts = await page.locator("//td[@data-title=\"Uploaded\"]").allTextContents();
      const dates = texts.map(t => new Date(t).getTime());
      const sorted = [...dates].sort((a, b) => a - b);
      expect(dates).toEqual(sorted);
    }
  });
});
