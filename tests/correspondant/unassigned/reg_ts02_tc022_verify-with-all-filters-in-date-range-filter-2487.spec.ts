import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS02_TC02.2_Verify With All Filters In Date Range Filter', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await expect(page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Filter\"]]").click();
    await page.waitForLoadState('networkidle');
    await page.locator("//label[text()=\"Select Date Range\"]/..//button").click();
    await page.locator("//span[text()[normalize-space() = \"Last One Month\"]]").click();
    vars["Last One Month Name"] = await page.locator("//button[@class=\"form-control text-dark text-start d-flex align-items-center dropdown-toggle\"]").textContent() || '';
    await expect(page.locator("//button[@class=\"form-control text-dark text-start d-flex align-items-center dropdown-toggle\"]")).toContainText(testData["Last One Month"]);
    await page.locator("//div[contains(@class, \"justify-content-end\")]//button[text()=\"Apply Filters\"]").click();
    if (true) /* Element No result (Bid requests) is visible */ {
      await expect(page.getByText("No result")).toBeVisible();
    } else {
      await stepGroups.stepGroup_Getting_Last_Month_From_Current_Month(page, vars);
      vars["count"] = "1";
      vars["All Uploaded Date Count"] = String(await page.locator("//div[contains(@aria-label,\"Uploaded Date:\")]").count());
      while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["All Uploaded Date Count"]))) {
        vars["IndividualDate"] = await page.locator("(//div[contains(@aria-label,\"Uploaded Date:\")])[$|count|]").textContent() || '';
        expect(new Date(String('')).getMonth()).toBe(new Date(String('')).getMonth());
        vars["count"] = (parseFloat(String(vars["count"])) + parseFloat(String("1"))).toFixed(0);
      }
    }
    await page.locator("//span[text()[normalize-space() = \"Filter\"]]").click();
    await page.locator("//label[text()=\"Select Date Range\"]/..//button").click();
    await page.locator("//button[@class=\"btn btn-link p-0 text-decoration-none fs-10\"]//span[text()='This Calendar Month']").click();
    vars["This Calendar Month"] = await page.locator("//button[@class=\"form-control text-dark text-start d-flex align-items-center dropdown-toggle\"]").textContent() || '';
    await expect(page.locator("//button[@class=\"form-control text-dark text-start d-flex align-items-center dropdown-toggle\"]")).toContainText(testData["This Calendar Month"]);
    await page.locator("//div[contains(@class, \"justify-content-end\")]//button[text()=\"Apply Filters\"]").click();
    await page.waitForLoadState('networkidle');
    if (true) /* Element No result (Bid requests) is visible */ {
      await expect(page.getByText("No result")).toBeVisible();
    } else {
      vars["count"] = "1";
      vars["DateCount"] = String(await page.locator("//div[contains(@aria-label,\"Uploaded Date:\")]").count());
      while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["DateCount"]))) {
        vars["IndividualDate"] = await page.locator("(//div[contains(@aria-label,\"Uploaded Date:\")])[$|count|]").textContent() || '';
        expect(new Date(String('')).getMonth()).toBe(new Date(String('')).getMonth());
        vars["count"] = (parseFloat(String(vars["count"])) + parseFloat(String("1"))).toFixed(0);
      }
    }
    await page.locator("//span[text()[normalize-space() = \"Filter\"]]").click();
    await page.locator("//label[text()=\"Select Date Range\"]/..//button").click();
    await page.locator("//button[contains(@class, 'fa-times-circle') and contains(@class, 'popover-close') and contains(@class, 'btn-link')]/following-sibling::ul//span[text()[normalize-space() = \"This Quarter\"]]").click();
    vars["This Quarter Button"] = await page.locator("//button[@class=\"form-control text-dark text-start d-flex align-items-center dropdown-toggle\"]").textContent() || '';
    await expect(page.locator("//button[@class=\"form-control text-dark text-start d-flex align-items-center dropdown-toggle\"]")).toContainText(testData["This Quarter"]);
    await page.locator("//div[contains(@class, \"justify-content-end\")]//button[text()=\"Apply Filters\"]").click();
    if (true) /* Verify if Last Month == 01 */ {
      // [DISABLED] Store 12 in Month Before Last Month
      // vars["Month Before Last Month"] = "12";
    } else {
      // [DISABLED] Perform subtraction on Last Month and 1 and store the result inside a Month Before Last Month considering 0 decimal places
      // vars["Month Before Last Month"] = (parseFloat(String(vars["Last Month"])) - parseFloat(String("1"))).toFixed(0);
    }
    if (true) /* Verify if 1,2,3,4,5,6,7,8,9 contains Month Before Last Month */ {
      // [DISABLED] concate 0 and Month Before Last Month and store the new string into a Month Before Last Month
      // vars["Month Before Last Month"] = String('') + String('');
    }
    // [DISABLED] Concate Current Month and Last Month with SpecialCharacter , and store into a variable Current And Last Month
    // vars["Current And Last Month"] = String(vars["Current Month"]) + "," + String(vars["Last Month"]);
    // [DISABLED] Concate Current And Last Month and Month Before Last Month with SpecialCharacter , and store into a variable QuarterMonths
    // vars["QuarterMonths"] = String(vars["Current And Last Month"]) + "," + String(vars["Month Before Last Month"]);
    await page.waitForLoadState('networkidle');
    if (true) /* Element No result (Bid requests) is visible */ {
      await expect(page.getByText("No result")).toBeVisible();
    } else {
      vars["Quarter1"] = "01,02,03";
      vars["Quarter2"] = "04,05,06";
      vars["Quarter3"] = "07,08,09";
      vars["Quarter4"] = "10,11,12";
      vars["count"] = "1";
      vars["DatesCount"] = String(await page.locator("//div[contains(@aria-label,\"Uploaded Date:\")]").count());
      if (String(vars["Quarter1"]).includes(String(vars["Current Month"]))) {
        while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["DatesCount"]))) {
          vars["IndividualQuarterDate"] = await page.locator("(//div[contains(@aria-label,\"Uploaded Date:\")])[$|count|]").textContent() || '';
          vars["IndividualQuarterDate"] = String(vars["IndividualQuarterDate"]).substring(0, String(vars["IndividualQuarterDate"]).length - 9);
          expect(String(vars["Quarter1"])).toBe(vars["IndividualQuarterDate"]);
          vars["count"] = (parseFloat(String(vars["count"])) + parseFloat(String("1"))).toFixed(0);
        }
      } else if (String(vars["Quarter2"]).includes(String(vars["Current Month"]))) {
        while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["DatesCount"]))) {
          vars["IndividualQuarterDate"] = await page.locator("(//div[contains(@aria-label,\"Uploaded Date:\")])[$|count|]").textContent() || '';
          vars["IndividualQuarterDate"] = String(vars["IndividualQuarterDate"]).substring(0, String(vars["IndividualQuarterDate"]).length - 9);
          expect(String(vars["Quarter2"])).toBe(vars["IndividualQuarterDate"]);
          vars["count"] = (parseFloat(String(vars["count"])) + parseFloat(String("1"))).toFixed(0);
        }
      } else if (String(vars["Quarter3"]).includes(String(vars["Current Month"]))) {
        while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["DatesCount"]))) {
          vars["IndividualQuarterDate"] = await page.locator("(//div[contains(@aria-label,\"Uploaded Date:\")])[$|count|]").textContent() || '';
          vars["IndividualQuarterDate"] = String(vars["IndividualQuarterDate"]).substring(0, String(vars["IndividualQuarterDate"]).length - 9);
          expect(String(vars["Quarter3"])).toBe(vars["IndividualQuarterDate"]);
          vars["count"] = (parseFloat(String(vars["count"])) + parseFloat(String("1"))).toFixed(0);
        }
      } else {
        while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["DatesCount"]))) {
          vars["IndividualQuarterDate"] = await page.locator("(//div[contains(@aria-label,\"Uploaded Date:\")])[$|count|]").textContent() || '';
          vars["IndividualQuarterDate"] = String(vars["IndividualQuarterDate"]).substring(0, String(vars["IndividualQuarterDate"]).length - 9);
          expect(String(vars["Quarter4"])).toBe(vars["IndividualQuarterDate"]);
          vars["count"] = (parseFloat(String(vars["count"])) + parseFloat(String("1"))).toFixed(0);
        }
      }
    }
    await page.locator("//span[text()[normalize-space() = \"Filter\"]]").click();
    await page.locator("//label[text()=\"Select Date Range\"]/..//button").click();
    await page.locator("//button[contains(@class, 'fa-times-circle') and contains(@class, 'popover-close') and contains(@class, 'btn-link')]/following-sibling::ul//span[text()[normalize-space() = \"This Year\"]]").click();
    vars["This Year Button"] = await page.locator("//button[@class=\"form-control text-dark text-start d-flex align-items-center dropdown-toggle\"]").textContent() || '';
    await expect(page.locator("//button[@class=\"form-control text-dark text-start d-flex align-items-center dropdown-toggle\"]")).toContainText(testData["This Year"]);
    await page.locator("//div[contains(@class, \"justify-content-end\")]//button[text()=\"Apply Filters\"]").click();
    await page.waitForLoadState('networkidle');
    vars["Current Year"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "Asia/Kolkata" };
      const fmt = "yyyy";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    vars["count"] = "1";
    vars["Date Count"] = String(await page.locator("//div[contains(@aria-label,\"Uploaded Date:\")]").count());
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["Date Count"]))) {
      vars["DateInList"] = await page.locator("(//div[contains(@aria-label,\"Uploaded Date:\")])[$|count|]").textContent() || '';
    }
  });
});
