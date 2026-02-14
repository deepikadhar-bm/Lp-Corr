import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Commitment List - TS_1', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS21_TC05_Apply/Clear filter for a particular day and for a particular company in open list list and verify that same filter should be applied in closed list', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Filter\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"Select Date Range\"]]").click();
    await page.locator("//input[@placeholder=\"Select Date\"]").click();
    vars["CurrentDate"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC" };
      const fmt = "d-M-yyyy";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    await page.locator("//div[@class=\"ngb-dp-month\"]//div[@aria-label=\"$|CurrentDate|\"]").click();
    await page.locator("//button[text()[normalize-space() = \"Apply\"]]").click();
    await page.locator("//div[text()[normalize-space() = \"Select Company/CCode\"]]").click();
    await page.locator("//input[@aria-label=\"Search items\"]").click();
    await page.locator("//input[@aria-label=\"Search items\"]").fill(testData["CompanyNameInFilters"]);
    await page.locator("(//div[@class=\"dropdown-overflow\"])[1]//input[@type=\"checkbox\"]").click();
    vars["SelectedCompanyName"] = await page.locator("(//div[@class=\"dropdown-overflow\"])[1]//input[@type=\"checkbox\"]//..//div").textContent() || '';
    vars["SelectedCompanyName"] = String('').split("(")["0"] || '';
    vars["SelectedCompanyName"] = String(vars["SelectedCompanyName"]).trim();
    await page.locator("//button[contains(text(),\" Apply Selected \")]").click();
    await page.locator("//div[contains(@class, \"justify-content-end\")]//button[text()=\"Apply Filters\"]").click();
    await page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Date\")]").waitFor({ state: 'visible' });
    await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Company\")]")).toBeVisible();
    await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Date\")]")).toContainText(new Date().toLocaleDateString('en-US') /* format: yyyy/MM/dd */);
    await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Company\")]")).toContainText(vars["SelectedCompanyName"]);
    vars["CurrentDate"] = new Date().toLocaleDateString('en-US') /* format: yyyy/MM/dd */;
    vars["Space"] = "key_blank";
    vars["CurrentDateWithTextDate"] = "Date:" + vars["Space"] + vars["CurrentDate"];
    vars["CompanyWithText"] = "Company:" + vars["Space"] + vars["SelectedCompanyName"];
    await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Date\")]")).toContainText(vars["CurrentDateWithTextDate"]);
    await expect(page.locator("//span[@aria-label[contains(., 'Company: ')]]")).toContainText(vars["CompanyWithText"]);
    if (true) /* Element Go to Next Page Button is enabled */ {
      vars["CountofPages"] = "2";
    } else {
      vars["CountofPages"] = "1";
    }
    vars["count"] = "1";
    if (true) /* Verify that the current page displays text No result */ {
    } else {
      while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["CountofPages"]))) {
        await page.locator("//td[@data-title=\"Comm. Date\"]//div").waitFor({ state: 'visible' });
        for (let i = 0; i < await page.locator("//td[@data-title=\"Comm. Date\"]//div").count(); i++) {
          await expect(page.locator("//td[@data-title=\"Comm. Date\"]//div").nth(i)).toHaveText(String(new Date().toLocaleDateString('en-US') /* format: MM/dd/yyyy */));
        }
        for (let i = 0; i < await page.locator("//td[@data-title=\"Company\"]//div").count(); i++) {
          await expect(page.locator("//td[@data-title=\"Company\"]//div").nth(i)).toHaveText(String(vars["SelectedCompanyName"]));
        }
        if (true) /* Element Go to Next Page Button is enabled */ {
          await page.locator("//button[@aria-label=\"Go to Next Page\"]//span").click();
          await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
        }
        vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
      }
    }
    await page.locator("//div[normalize-space()=\"Closed List\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Date\")]").waitFor({ state: 'visible' });
    await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Date\")]")).toContainText(new Date().toLocaleDateString('en-US') /* format: yyyy/MM/dd */);
    await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Date\")]")).toContainText(vars["CurrentDateWithTextDate"]);
    await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Company\")]")).toBeVisible();
    await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Company\")]")).toContainText(vars["SelectedCompanyName"]);
    await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Company\")]")).toContainText(vars["CompanyWithText"]);
    if (true) /* Verify that the current page displays text No result */ {
    } else {
      await stepGroups.stepGroup_Data_Verification_After_Applying_FiltersCommitment_List(page, vars);
    }
  });
});
