import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_General Settings', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS01_TC03_Audit log - Verify the select config type functionality', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["FirstConfigOptionList"] = await page.locator("//td[@data-title=\"Config Type\"]").textContent() || '';
    vars["FirstConfigOptionList"] = String(vars["FirstConfigOptionList"]).substring(1, String(vars["FirstConfigOptionList"]).length - 1);
    await page.locator("//button[@aria-label=\"Toggle dropdown\"]//div[contains(text(),\"Select Config Type\")]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["SelectedConfig"] = vars["FirstConfigOptionList"];
    await page.locator("//input[@placeholder=\"Search\"]").fill(vars["SelectedConfig"]);
    await page.keyboard.press('Enter');
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//div[@role=\"listbox\"]/div[2]/button[2]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//button[@aria-label=\"Change Page Size\"]").click();
    await page.locator("//button[@aria-label=\"Set page size to 50\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    for (let i = 0; i < await page.locator("//td[@data-title=\"Config Type\"]").count(); i++) {
      await expect(page.locator("//td[@data-title=\"Config Type\"]").nth(i)).toHaveText(String(vars["SelectedConfig"]));
    }
    if (true) /* Element Go to Next Page Button is enabled */ {
      await page.locator("//span[contains(@class, 'dlp-icon') and contains(@class, 'fa-chevron-right')]").click();
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      for (let i = 0; i < await page.locator("//td[@data-title=\"Config Type\"]").count(); i++) {
        await expect(page.locator("//td[@data-title=\"Config Type\"]").nth(i)).toHaveText(String(vars["SelectedConfig"]));
      }
      await page.locator("//button[@aria-label=\"Go to Previous Page\"  ]").click();
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    }
    vars["CreatedColumnDataWithSearch"] = (await page.locator("//td[@data-title=\"Created\"]").allTextContents()).join(', ');
    await page.locator("//button[@aria-label=\"Toggle dropdown\"]//div[contains(text(),\"Select Config Type\")]").click();
    await page.locator("//div[@role=\"listbox\"]/div[2]/button[1]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["CreatedColumnDataWithoutSearch"] = (await page.locator("//td[@data-title=\"Created\"]").allTextContents()).join(', ');
    expect(String(vars["CreatedColumnDataWithoutSearch"])).toBe(vars["CreatedColumnDataWithSearch"]);
  });
});
