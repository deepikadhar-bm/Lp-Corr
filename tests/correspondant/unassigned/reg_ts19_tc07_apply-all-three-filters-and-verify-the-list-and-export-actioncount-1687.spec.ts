import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS19_TC07_Apply all three filters and verify the list and export action[count]', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Filter\"]]").click();
    vars["RandomNumber"] = String(Math.floor(Math.random() * (5 - 1 + 1)) + 1);
    await page.locator("//span[text()[normalize-space() = \"Select Date Range\"]]").click();
    if (String(vars["RandomNumber"]) === String("5")) {
      await page.locator("//input[@placeholder=\"Select Date\"]").click();
      vars["CurrentDate"] = new Date().toLocaleDateString('en-US') /* format: d-M-yyyy */;
      await page.locator("//div[@class=\"ngb-dp-month\"]//div[@aria-label=\"$|CurrentDate|\"]").click();
      await page.locator("//button[text()[normalize-space() = \"Apply\"]]").click();
      vars["SelectedDateRange"] = "Custom Date Range";
    } else {
      vars["SelectedDateRange"] = await page.locator("(//div[@class=\"popover-body\"]//button[contains(@class,\"btn btn-link\")])[position() >= 2 and position() <= 5][$|RandomNumber|]").textContent() || '';
      await page.locator("(//div[@class=\"popover-body\"]//button[contains(@class,\"btn btn-link\")])[position() >= 2 and position() <= 5][$|RandomNumber|]").click();
    }
    vars["space"] = "key_blank";
    if (String(vars["SelectedDateRange"]) === String("Custom Date Range")) {
      vars["CurrentDate"] = new Date().toLocaleDateString('en-US') /* format: yyyy/MM/dd */;
      vars["SelectedDateRangeText"] = "Date:" + vars["space"] + vars["CurrentDate"];
    } else {
      vars["SelectedDateRangeText"] = "Date:" + vars["space"] + vars["SelectedDateRange"];
    }
    await page.locator("//div[text()[normalize-space() = \"Select Company/CCode\"]]").click();
    vars["RandomNumberCompany"] = String(Math.floor(Math.random() * (2 - 1 + 1)) + 1);
    await page.locator("(//div[normalize-space(text())=\"Select Company/CCode\"]//following::input[@aria-label=\"Search items\"])[1]").click();
    if (String(vars["RandomNumberCompany"]) === String("1")) {
      await page.locator("(//div[normalize-space(text())=\"Select Company/CCode\"]//following::input[@aria-label=\"Search items\"])[1]").fill("Freedom");
      await page.locator("//input[@type=\"checkbox\" and contains(@aria-label,\"Select Freedom\")]").check();
    } else if (String(vars["RandomNumberCompany"]) === String("2")) {
      await page.locator("(//div[normalize-space(text())=\"Select Company/CCode\"]//following::input[@aria-label=\"Search items\"])[1]").fill("American Pacific");
      await page.locator("//input[@type=\"checkbox\" and contains(@aria-label,\"Select American Pacific\")]").check();
    }
    vars["SelectedCompanyName"] = await page.locator("//label[@class=\"dropdown-item d-flex checked\"]//span[@title]").textContent() || '';
    vars["FilteredCompanyName"] = String(vars["SelectedCompanyName"]).substring(0, String(vars["SelectedCompanyName"]).length - 8);
    await page.locator("//button[contains(text(),\" Apply Selected \")]").click();
    vars["SelectedCompanyNameText"] = "Company:" + vars["space"] + vars["SelectedCompanyName"];
    await page.locator("//div[text()[normalize-space() = \"Select Commitments Status\"]]").click();
    await page.locator("(//div[normalize-space(text())=\"Select Commitments Status\"]//ancestor::div[contains(@class,\"dropdown\")]//label[@class=\"dropdown-item d-flex\"]//input[@type=\"checkbox\"])[$|RandomNumber|]").check();
    vars["SelectedCommitmentsStatus"] = await page.locator("//div[text()[normalize-space() = \"Select Commitments Status\"]]//following::label[@class=\"dropdown-item d-flex checked\"]//span[@title]").textContent() || '';
    vars[""] = String("SelectedCommitmentsStatusText").replace("", "");
    vars["SelectedCommitmentsStatusText"] = String(vars["SelectedCommitmentsStatusText"]).toUpperCase();
    vars["SelectedCommitmentsStatusText"] = "Status:" + vars["space"] + vars["SelectedCommitmentsStatusText"];
    await page.locator("(//button[@aria-label=\"Apply selected items\"])[2]").click();
    await page.locator("//div[contains(@class, \"justify-content-end\")]//button[text()=\"Apply Filters\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["TotalChipsCount"] = String(await page.locator("//div[@role=\"listitem\" and contains(@aria-label,\"Chip\")]").count());
    expect(String(vars["TotalChipsCount"])).toBe("3");
    await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Date\")]")).toContainText(vars["SelectedDateRangeText"]);
    await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Company\")]")).toContainText(vars["SelectedCompanyNameText"]);
    await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Status\")]")).toContainText(vars["SelectedCommitmentsStatusText"]);
    if (true) /* Element Data Table No Results(Price Offered) is visible */ {
      await expect(page.getByText("No result")).toBeVisible();
    } else {
      vars["CurrentMonth"] = (() => {
        const d = new Date();
        const opts: Intl.DateTimeFormatOptions = { timeZone: "Asia/Kolkata" };
        const fmt = "MM";
        // Map Java date format to Intl parts
        const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
        const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
        return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
      })();
      if (String(vars["SelectedDateRange"]) === String("Last One Month")) {
        if (String(vars["CurrentMonth"]) === String("01")) {
          vars["LastMonth"] = "12";
        } else {
          vars["LastMonth"] = (parseFloat(String(vars["CurrentMonth"])) - parseFloat(String("1"))).toFixed(0);
        }
        if (String("1,2,3,4,5,6,7,8,9").includes(String(vars["LastMonth"]))) {
          vars["LastMonth"] = String('') + String('');
        }
        vars["count"] = "1";
        vars["RequestedDateCount"] = String(await page.locator("//div[contains(@aria-label,\"Requested Date:\")]").count());
        while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["RequestedDateCount"]))) {
          vars["LastOneMonth"] = await page.locator("(//div[contains(@aria-label,\"Requested Date:\")])[$|count|]").textContent() || '';
          expect(new Date(String('')).getMonth()).toBe(new Date(String('')).getMonth());
          vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
        }
      } else if (String(vars["SelectedDateRange"]) === String("This Calendar Month")) {
        vars["count"] = "1";
        vars["RequestedDateCount"] = String(await page.locator("//div[contains(@aria-label,\"Requested Date:\")]").count());
        while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["RequestedDateCount"]))) {
          vars["ThisCalenderMonth"] = await page.locator("(//div[contains(@aria-label,\"Requested Date:\")])[$|count|]").textContent() || '';
          expect(new Date(String('')).getMonth()).toBe(new Date(String('')).getMonth());
          vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
        }
      } else if (String(vars["SelectedDateRange"]) === String("This Quarter")) {
        vars["Quarter1"] = "01,02,03";
        vars["Quarter2"] = "04,05,06";
        vars["Quarter3"] = "07,08,09";
        vars["Quarter4"] = "10,11,12";
        vars["CurrentMonth"] = (() => {
          const d = new Date();
          const opts: Intl.DateTimeFormatOptions = { timeZone: "Asia/Kolkata" };
          const fmt = "MM";
          // Map Java date format to Intl parts
          const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
          const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
          return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
        })();
        vars["count"] = "1";
        vars["RequestedDateCount"] = String(await page.locator("//div[contains(@aria-label,\"Requested Date:\")]").count());
        if (String(vars["Quarter1"]).includes(String(vars["CurrentMonth"]))) {
          while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["RequestedDateCount"]))) {
            vars["IndividualQuarterDate"] = await page.locator("(//div[contains(@aria-label,\"Requested Date:\")])[$|count|]").textContent() || '';
            vars["IndividualQuarterDate"] = String(vars["IndividualQuarterDate"]).substring(0, String(vars["IndividualQuarterDate"]).length - 9);
            expect(String(vars["Quarter1"])).toBe(vars["IndividualQuarterDate"]);
            vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
          }
        } else if (String(vars["Quarter2"]).includes(String(vars["CurrentMonth"]))) {
          while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["RequestedDateCount"]))) {
            vars["IndividualQuarterDate"] = await page.locator("(//div[contains(@aria-label,\"Requested Date:\")])[$|count|]").textContent() || '';
            vars["IndividualQuarterDate"] = String(vars["IndividualQuarterDate"]).substring(0, String(vars["IndividualQuarterDate"]).length - 9);
            expect(String(vars["Quarter2"])).toBe(vars["IndividualQuarterDate"]);
            vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
          }
        } else if (String(vars["Quarter3"]).includes(String(vars["CurrentMonth"]))) {
          while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["RequestedDateCount"]))) {
            vars["IndividualQuarterDate"] = await page.locator("(//div[contains(@aria-label,\"Requested Date:\")])[$|count|]").textContent() || '';
            vars["IndividualQuarterDate"] = String(vars["IndividualQuarterDate"]).substring(0, String(vars["IndividualQuarterDate"]).length - 9);
            expect(String(vars["Quarter3"])).toBe(vars["IndividualQuarterDate"]);
            vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
          }
        } else if (String(vars["Quarter4"]).includes(String(vars["CurrentMonth"]))) {
        }
      }
    }
  });
});
