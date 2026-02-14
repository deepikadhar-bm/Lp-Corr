import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_General Settings', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS01_TC01_Audit log - Verify the search by username functionality', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["FirstUserNameList"] = await page.locator("//td[@data-title=\"Username\"]").textContent() || '';
    vars["FirstUserNameList"] = String(vars["FirstUserNameList"]).trim();
    await page.locator("//input[@placeholder=\"Search Username\"]").fill(vars["FirstUserNameList"]);
    vars["SearchedUserName"] = vars["FirstUserNameList"];
    await page.keyboard.press('Enter');
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//button[@aria-label=\"Change Page Size\"]").click();
    await page.locator("//button[@aria-label=\"Set page size to 50\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    for (let i = 0; i < await page.locator("//td[@data-title=\"Username\"]").count(); i++) {
      await expect(page.locator("//td[@data-title=\"Username\"]").nth(i)).toHaveText(String(vars["SearchedUserName"]));
    }
    if (true) /* Element Go to Next Page Button is enabled */ {
      await page.locator("//span[contains(@class, 'dlp-icon') and contains(@class, 'fa-chevron-right')]").click();
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      for (let i = 0; i < await page.locator("//td[@data-title=\"Username\"]").count(); i++) {
        await expect(page.locator("//td[@data-title=\"Username\"]").nth(i)).toHaveText(String(vars["SearchedUserName"]));
      }
      await page.locator("//button[@aria-label=\"Go to Previous Page\"  ]").click();
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    }
    vars["CreatedColumnDataBeforeClear"] = (await page.locator("//td[@data-title=\"Created\"]").allTextContents()).join(', ');
    await page.locator("//button[contains(@class, 'search-cancel-btn')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["CreatedColumnDataAfterClear"] = (await page.locator("//td[@data-title=\"Created\"]").allTextContents()).join(', ');
    expect(String(vars["CreatedColumnDataBeforeClear"])).toBe(vars["CreatedColumnDataAfterClear"]);
  });
});
