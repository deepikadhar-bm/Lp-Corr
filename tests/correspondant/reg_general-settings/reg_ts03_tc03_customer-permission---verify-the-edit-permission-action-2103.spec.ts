import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_General Settings', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS03_TC03_Customer Permission - Verify the edit permission action.', async ({ page }) => {
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
    await page.locator("//tbody[@role=\"rowgroup\"]/tr[1]/td[8]/div[1]/button[1]/span[1]").click();
    await page.locator("(//label[normalize-space(text())='Standard']/parent::div//input)[2]").waitFor({ state: 'visible' });
    await stepGroups.stepGroup_Toggle_Radio_Button_Based_on_Current_State(page, vars);
    await page.locator("//div[@class=\"custom-input\"]//input").fill(String("Freedom"));
    // [DISABLED] Enter Freedom in the Search Filter Input field
    // await page.locator("//div[@class=\"custom-input\"]//input").fill("Freedom");
    await page.keyboard.press('Enter');
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("(//td[@data-title=\"Standard\"]//div)[1]")).toContainText(vars["ExpectedStandardState"]);
    await expect(page.locator("(//td[@data-title=\"Chase Direct\"]//div)[1]")).toContainText(vars["ExpectedChaseState"]);
    await page.locator("//tbody[@role=\"rowgroup\"]/tr[1]/td[8]/div[1]/button[1]/span[1]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    if (String(vars["PreviousStandardState"]) === String("Disabled")) {
      await page.locator("(//label[normalize-space(text())='Standard']/parent::div//input)[2]").check();
    } else {
      await page.locator("//input[@id='dynamicPricing-select-on']").check();
    }
    if (String(vars["PreviousChaseState"]) === String("Allowed")) {
      await page.locator("//input[@id='executionTypeFastPath-select-on']").check();
    } else {
      await page.locator("//input[@id='executionTypeFastPath-select-off']").check();
    }
    await page.locator("//button[contains(.,'Update Permissions')]").waitFor({ state: 'visible' });
    await page.locator("//button[contains(.,'Update Permissions')]").click();
    vars["CurrentLocalTime"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC" };
      const fmt = "M/d/yyyy : h:mm a";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    // [DISABLED] Verify that the element Company Name in Customer Permission displays text contains ExpectedCompanyName and With Scrollable FALSE
    // await expect(page.locator("//td[@data-title=\"Company Name\"]")).toContainText(vars["ExpectedCompanyName"]);
    // [DISABLED] Store the count of elements identified by locator Total Rows Count into a variable RowsCountBeforeClear
    // vars["RowsCountBeforeClear"] = String(await page.locator("(//tbody//tr)[position() >= 1 and position() <= last()]").count());
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("(//td[@data-title=\"Chase Direct\"]//div)[1]")).toContainText(vars["PreviousChaseState"]);
    await expect(page.locator("(//td[@data-title=\"Standard\"]//div)[1]")).toContainText(vars["PreviousStandardState"]);
    // [DISABLED] Verify if RowsCountBeforeClear == 1
    // expect(String(vars["RowsCountBeforeClear"])).toBe("1");
    // [DISABLED] Click on Clear search button(customer permissions)
    // await page.locator("//button[contains(@class, 'search-cancel-btn')]").click();
    // [DISABLED] Wait until the element Spinner is not visible
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Store the count of elements identified by locator Total Rows Count into a variable RowsCountAfterClear
    // vars["RowsCountAfterClear"] = String(await page.locator("(//tbody//tr)[position() >= 1 and position() <= last()]").count());
    // [DISABLED] Verify if RowsCountAfterClear > 1
    // expect(String(vars["RowsCountAfterClear"])).toBe("1");
  });
});
