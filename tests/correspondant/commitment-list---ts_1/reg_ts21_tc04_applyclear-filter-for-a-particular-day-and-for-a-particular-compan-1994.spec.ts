import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Commitment List - TS_1', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS21_TC04_Apply/Clear filter for a particular day and for a particular company in closed list list and verify that same filter should be applied in open list)', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//div[normalize-space()=\"Closed List\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Selecting_Date_from_the_filters_by_fetching_the_first_comm_d(page, vars);
    vars["ExpectedChipDate"] = (() => {
      const d = new Date(String(vars["ExpectedCommDate"]));
      const _p = { yyyy: String(d.getFullYear()), yy: String(d.getFullYear()).slice(-2), MM: String(d.getMonth()+1).padStart(2,'0'), M: String(d.getMonth()+1), dd: String(d.getDate()).padStart(2,'0'), d: String(d.getDate()), HH: String(d.getHours()).padStart(2,'0'), hh: String(d.getHours()%12||12).toString().padStart(2,'0'), h: String(d.getHours()%12||12), mm: String(d.getMinutes()).padStart(2,'0'), ss: String(d.getSeconds()).padStart(2,'0'), a: d.getHours() >= 12 ? 'PM' : 'AM' };
      return "yyyy/MM/dd".replace('yyyy',_p.yyyy).replace('yy',_p.yy).replace('MM',_p.MM).replace('dd',_p.dd).replace('HH',_p.HH).replace('hh',_p.hh).replace('mm',_p.mm).replace('ss',_p.ss).replace(/a/g,_p.a).replace(/M(?!M)/g,_p.M).replace(/d(?!d)/g,_p.d).replace(/h(?!h)/g,_p.h);
    })();
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
    await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Company\")]")).toContainText(vars["SelectedCompanyName"]);
    await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Date\")]")).toContainText(vars["ExpectedChipDate"]);
    vars["Space"] = "key_blank";
    vars["DateWithTextDate"] = "Date:" + vars["Space"] + vars["ExpectedChipDate"];
    vars["CompanyNamewithText"] = "Company:" + vars["Space"] + vars["SelectedCompanyName"];
    await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Date\")]")).toContainText(vars["DateWithTextDate"]);
    await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Company\")]")).toContainText(vars["CompanyNamewithText"]);
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
          await expect(page.locator("//td[@data-title=\"Comm. Date\"]//div").nth(i)).toHaveText(String(vars["ExpectedCommDate"]));
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
    await page.locator("//div[text()[normalize-space() = \"Open List\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Date\")]").waitFor({ state: 'visible' });
    await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Date\")]")).toContainText(vars["ExpectedChipDate"]);
    await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Date\")]")).toContainText(vars["DateWithTextDate"]);
    await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Company\")]")).toBeVisible();
    await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Company\")]")).toContainText(vars["SelectedCompanyName"]);
    await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Company\")]")).toContainText(vars["CompanyNamewithText"]);
    if (true) /* Verify that the current page displays text No result */ {
    } else {
      if (true) /* Element Go to Next Page Button is enabled */ {
        vars["CountofPages"] = "2";
      } else {
        vars["CountofPages"] = "1";
      }
      vars["count"] = "1";
      while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["CountofPages"]))) {
        await page.locator("//td[@data-title=\"Comm. Date\"]//div").waitFor({ state: 'visible' });
        for (let i = 0; i < await page.locator("//td[@data-title=\"Comm. Date\"]//div").count(); i++) {
          await expect(page.locator("//td[@data-title=\"Comm. Date\"]//div").nth(i)).toHaveText(String(vars["ExpectedCommDate"]));
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
  });
});
