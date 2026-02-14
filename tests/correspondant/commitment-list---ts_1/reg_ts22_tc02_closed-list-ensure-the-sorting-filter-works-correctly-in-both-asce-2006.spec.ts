import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Commitment List - TS_1', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS22_TC02_Closed List : Ensure the sorting filter works correctly in both ascending and descending order - Verify for the detail screen', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//div[normalize-space()=\"Closed List\"]").click();
    await page.waitForLoadState('networkidle');
    vars["IndividualHeadersCommitmentList"] = "Loan Amount and Ref Sec Price and Gross Price and Hedge Ratio and Curr Market Value and Curr Gross and Chase Loan# and Mark Adj";
    await page.locator("//td[@data-title=\"Comm. Loans\"]//div[not(contains(text(),'1'))]//ancestor::tr//td[@data-title=\"Comm. ID\"] ").click();
    vars["ColumnHeadersDetailsScreenUI"] = String(await page.locator("(//th//div[@role=\"button\"])[position() >=1 and position() <= last()]").count());
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["ColumnHeadersDetailsScreenUI"]))) {
      vars["IndividualHeaderScreenDetails"] = await page.locator("((//th//div[@role=\"button\"])[position() >=1 and position() <= 12])[$|count|]").textContent() || '';
      vars["IndividualHeaderScreenDetails"] = String(vars["IndividualHeaderScreenDetails"]).trim();
      await page.locator("((//th//div[@role=\"button\"])[position() >=1 and position() <= 12])[$|count|]").click();
      await expect(page.locator("//span[contains(@class, 'small') and contains(@class, 'fa-sort-down')]")).toBeVisible();
      await page.locator("(//th[@aria-label=\"$|IndividualHeaderScreenDetails|\"])[1]").waitFor({ state: 'visible' });
      if (String(vars["IndividualHeadersCommitmentList"]).includes(String(vars["IndividualHeaderScreenDetails"]))) {
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
      await page.locator("((//th//div[@role=\"button\"])[position() >=1 and position() <= 12])[$|count|]").click();
      await expect(page.locator("//span[contains(@class, 'small') and contains(@class, 'fa-sort-up')]")).toBeVisible();
      await page.locator("(//th[@aria-label=\"$|IndividualHeaderScreenDetails|\"])[1]").waitFor({ state: 'visible' });
      await page.waitForTimeout(4000);
      if (String(vars["IndividualHeadersCommitmentList"]).includes(String(vars["IndividualHeaderScreenDetails"]))) {
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
    await page.locator("//div[text()[normalize-space() = \"Total Loans\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["ColumnHeadersDetailsScreenUI"] = String(await page.locator("(//th//div[@role=\"button\"])[position() >=1 and position() <= last()]").count());
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["ColumnHeadersDetailsScreenUI"]))) {
      vars["IndividualHeaderScreenDetails"] = await page.locator("((//th//div[@role=\"button\"])[position() >=1 and position() <= 12])[$|count|]").textContent() || '';
      vars["IndividualHeaderScreenDetails"] = String(vars["IndividualHeaderScreenDetails"]).trim();
      await page.locator("((//th//div[@role=\"button\"])[position() >=1 and position() <= 12])[$|count|]").click();
      await expect(page.locator("//span[contains(@class, 'small') and contains(@class, 'fa-sort-down')]")).toBeVisible();
      await page.locator("(//th[@aria-label=\"$|IndividualHeaderScreenDetails|\"])[1]").waitFor({ state: 'visible' });
      if (String(vars["IndividualHeadersCommitmentList"]).includes(String(vars["IndividualHeaderScreenDetails"]))) {
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
      await page.locator("((//th//div[@role=\"button\"])[position() >=1 and position() <= 12])[$|count|]").click();
      await expect(page.locator("//span[contains(@class, 'small') and contains(@class, 'fa-sort-up')]")).toBeVisible();
      await page.locator("(//th[@aria-label=\"$|IndividualHeaderScreenDetails|\"])[1]").waitFor({ state: 'visible' });
      await page.waitForTimeout(4000);
      if (String(vars["IndividualHeadersCommitmentList"]).includes(String(vars["IndividualHeaderScreenDetails"]))) {
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
  });
});
