import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_General Settings', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS01_TC02_Audit log - Verify the select config type functionality', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//button[@aria-label=\"Toggle dropdown\"]//div[contains(text(),\"Select Config Type\")]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["OptionsCountBeforeSearch"] = String(await page.locator("//div[@class=\"dropdown-overflow\"]//button").count());
    vars["FirstConfigOptionDrpdwn"] = await page.locator("//div[@role=\"listbox\"]/div[2]/button[2]").textContent() || '';
    vars["FirstConfigOptionDrpdwn"] = String(vars["FirstConfigOptionDrpdwn"]).trim();
    vars[""] = String('').length.toString();
    vars["CharCount"] = (parseFloat(String(vars["CharCount"])) - parseFloat(String("3"))).toFixed(0);
    vars["IndexCount"] = String("0") + "," + String(vars["CharCount"]);
    vars["ConfigOption3Dig"] = String(vars["FirstConfigOptionDrpdwn"]).substring(0);
    await page.locator("//input[@placeholder=\"Search\"]").fill(vars["ConfigOption3Dig"]);
    await page.keyboard.press('Enter');
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["FirstConfigOptionAfterSearch"] = await page.locator("//div[@role=\"listbox\"]/div[2]/button").textContent() || '';
    expect(String(vars["FirstConfigOptionAfterSearch"])).toBe(vars["ConfigOption3Dig"]);
    vars["OptionsCountAfterSearch"] = String(await page.locator("//div[@class=\"dropdown-overflow\"]//button").count());
    expect(String(vars["OptionsCountAfterSearch"])).toBe(vars["OptionsCountBeforeSearch"]);
    await page.locator("//button[contains(@aria-label, 'Clear search')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["OptionsCountAfterClearSearch"] = String(await page.locator("//div[@class=\"dropdown-overflow\"]//button").count());
    expect(String(vars["OptionsCountAfterClearSearch"])).toBe(vars["OptionsCountBeforeSearch"]);
  });
});
