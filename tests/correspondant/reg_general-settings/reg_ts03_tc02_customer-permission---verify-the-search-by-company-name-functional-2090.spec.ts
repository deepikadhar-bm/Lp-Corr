import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_General Settings', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS03_TC02_Customer Permission - Verify the search by Company name functionality', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[@href=\"#/admin/general-settings/customer-restrictions\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//div[@class=\"custom-input\"]//input").fill("Freedom");
    await page.keyboard.press('Enter');
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["FirstCompanyName"] = await page.locator("//tbody[@role=\"rowgroup\"]/tr[1]/td[3]").textContent() || '';
    // [DISABLED] Split string FirstCompanyName using - and store the 1 into a ExpectedCCode
    // vars["ExpectedCCode"] = String('').split("-")["1"] || '';
    // [DISABLED] Split the FirstCompanyName with the - and store the value from the 2 in the ExpectedCCode
    // vars["ExpectedCCode"] = String(vars["FirstCompanyName"]).split("-")["2"] || '';
    // [DISABLED] Trim white space from ExpectedCCode and store it in a runtime ExpectedCCode
    // vars["ExpectedCCode"] = String(vars["ExpectedCCode"]).trim();
    vars["FirstCompanyName"] = String(vars["FirstCompanyName"]).substring(1, String(vars["FirstCompanyName"]).length - 1);
    await page.locator("//div[@class=\"custom-input\"]//input").fill(String(vars["FirstCompanyName"]));
    // [DISABLED] Enter ExpectedCCode in the Search Filter Input field
    // await page.locator("//div[@class=\"custom-input\"]//input").fill(vars["ExpectedCCode"]);
    await page.keyboard.press('Enter');
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["ExpectedCompanyName"] = vars["FirstCompanyName"];
    await expect(page.locator("//td[@data-title=\"Company Name\"]")).toContainText(vars["ExpectedCompanyName"]);
    vars["RowsCountBeforeClear"] = String(await page.locator("(//tbody//tr)[position() >= 1 and position() <= last()]").count());
    expect(String(vars["RowsCountBeforeClear"])).toBe("1");
    await page.locator("//button[contains(@class, 'search-cancel-btn')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["RowsCountAfterClear"] = String(await page.locator("(//tbody//tr)[position() >= 1 and position() <= last()]").count());
    expect(String(vars["RowsCountAfterClear"])).toBe("1");
  });
});
