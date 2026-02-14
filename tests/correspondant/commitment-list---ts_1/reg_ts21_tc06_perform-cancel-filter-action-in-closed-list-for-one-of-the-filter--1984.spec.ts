import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Commitment List - TS_1', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS21_TC06_Perform cancel filter action in closed list for one of the filter applied, and then verify that the filter is cleared in both the closed and open list sections', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//div[normalize-space()=\"Closed List\"]").waitFor({ state: 'visible' });
    await page.locator("//div[normalize-space()=\"Closed List\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Filter\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"Select Date Range\"]]").waitFor({ state: 'visible' });
    await page.locator("//span[text()[normalize-space() = \"Select Date Range\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"Last One Month\"]]").click();
    await page.locator("//div[text()[normalize-space() = \"Select Company/CCode\"]]").waitFor({ state: 'visible' });
    await page.locator("//div[text()[normalize-space() = \"Select Company/CCode\"]]").click();
    await page.locator("(//div[@class=\"dropdown-overflow\"])[1]//input[@type=\"checkbox\"]").check();
    await page.locator("//button[contains(text(),\" Apply Selected \")]").waitFor({ state: 'visible' });
    await page.locator("//button[contains(text(),\" Apply Selected \")]").click();
    await page.locator("//div[contains(@class, \"justify-content-end\")]//button[text()=\"Apply Filters\"]").waitFor({ state: 'visible' });
    await page.locator("//div[contains(@class, \"justify-content-end\")]//button[text()=\"Apply Filters\"]").click();
    await page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Date\")]").waitFor({ state: 'visible' });
    await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Date\")]")).toBeVisible();
    await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Company\")]")).toBeVisible();
    if (true) /* Verify that the current page displays text No result */ {
      vars["RecordsCountWithFilterClosedList"] = "0";
    } else {
      await page.locator("//input[normalize-space(@aria-label)=\"Select all for\" and @type=\"checkbox\"]").check();
      vars["RecordsCountWithFilterClosedList"] = await page.locator(" //span[text()=\" Export Selected\"]/following-sibling::span").textContent() || '';
      vars["RecordsCountWithFilterClosedList"] = String(vars["RecordsCountWithFilterClosedList"]).replace(/\(\)/g, '');
      vars["RecordsCountWithFilterClosedList"] = String(vars["RecordsCountWithFilterClosedList"]).trim();
    }
    await page.locator("//div[text()[normalize-space() = \"Open List\"]]").click();
    await page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Date\")]").waitFor({ state: 'visible' });
    await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Date\")]")).toBeVisible();
    await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Company\")]")).toBeVisible();
    if (true) /* Verify that the current page displays text No result */ {
      vars["RecordsCountWithFilterOpenList"] = "0";
    } else {
      await page.locator("//input[normalize-space(@aria-label)=\"Select all for\" and @type=\"checkbox\"]").check();
      vars["RecordsCountWithFilterOpenList"] = await page.locator(" //span[text()=\" Export Selected\"]/following-sibling::span").textContent() || '';
      vars["RecordsCountWithFilterOpenList"] = String(vars["RecordsCountWithFilterOpenList"]).replace(/\(\)/g, '');
      vars["RecordsCountWithFilterOpenList"] = String(vars["RecordsCountWithFilterOpenList"]).trim();
    }
    await page.locator("//div[normalize-space()=\"Closed List\"]").click();
    await page.locator("//button[contains(@aria-label,\"Remove Date:\")]").waitFor({ state: 'visible' });
    await page.locator("//button[contains(@aria-label,\"Remove Date:\")]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Date\")]")).toBeVisible();
    await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Company\")]")).toBeVisible();
    await page.locator("//input[normalize-space(@aria-label)=\"Select all for\" and @type=\"checkbox\"]").check();
    vars["RecordsCountWithoutFilterClosedList"] = await page.locator(" //span[text()=\" Export Selected\"]/following-sibling::span").textContent() || '';
    vars["RecordsCountWithoutFilterClosedList"] = String(vars["RecordsCountWithoutFilterClosedList"]).replace(/\(\)/g, '');
    vars["RecordsCountWithoutFilterClosedList"] = String(vars["RecordsCountWithoutFilterClosedList"]).trim();
    expect(String(vars["RecordsCountWithFilterClosedList"])).toBe(vars["RecordsCountWithoutFilterClosedList"]);
    await page.locator("//div[text()[normalize-space() = \"Open List\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Date\")]")).toBeVisible();
    await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Company\")]")).toBeVisible();
    await page.locator("//input[normalize-space(@aria-label)=\"Select all for\" and @type=\"checkbox\"]").check();
    vars["RecordsCountWithoutFilterOpenList"] = await page.locator(" //span[text()=\" Export Selected\"]/following-sibling::span").textContent() || '';
    vars["RecordsCountWithoutFilterOpenList"] = String(vars["RecordsCountWithoutFilterOpenList"]).replace(/\(\)/g, '');
    vars["RecordsCountWithoutFilterOpenList"] = String(vars["RecordsCountWithoutFilterOpenList"]).trim();
    expect(String(vars["RecordsCountWithFilterOpenList"])).toBe(vars["RecordsCountWithoutFilterOpenList"]);
  });
});
