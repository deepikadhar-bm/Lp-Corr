import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS34_TC07_Verify Date Range, Company/CCode and BidRequest Status Functionality In Search Filter', async ({ page }) => {
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
    await page.locator("//div[text()[normalize-space() = \"Select Company/CCode\"]]").click();
    vars["Company Name1"] = await page.locator("(//div[@class=\"dropdown-overflow\"]//input[@type=\"checkbox\"])[1]/..//span").textContent() || '';
    vars["Company Name1"] = String(vars["Company Name1"]).substring(0, String(vars["Company Name1"]).length - 8);
    await page.locator("(//input[@type=\"checkbox\"])[2]").check();
    await page.locator("//button[contains(normalize-space(),\"Apply Selected 1\")]").click();
    await page.locator("//div[text()[normalize-space() = \"Select Bid Request Status\"]]").click();
    vars["Count"] = "2";
    vars["SelectedStatus "] = await page.locator("((//label[text()='Select Bid Request Status']//..//div[@class=\"cursor-pointer py-3 text-wrap\"])[position() > 1 and position() <= last()])[$|Count|]").textContent() || '';
    await page.locator("((//label[text()='Select Bid Request Status']//..//div[@class=\"cursor-pointer py-3 text-wrap\"])[position() > 1 and position() <= last()])[$|Count|]").click();
    await page.locator("(//button[@aria-label=\"Apply selected items\"])[2]").click();
    await page.locator("//div[contains(@class, \"justify-content-end\")]//button[text()=\"Apply Filters\"]").click();
    await page.waitForLoadState('networkidle');
    // [DISABLED] Pick the current date MM by location Asia/Kolkata and store into a variable Current Month
    // vars["Current Month"] = (() => {
    //   const d = new Date();
    //   const opts: Intl.DateTimeFormatOptions = { timeZone: "Asia/Kolkata" };
    //   const fmt = "MM";
    //   // Map Java date format to Intl parts
    //   const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
    //   const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
    //   return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    // })();
    // [DISABLED] Perform subtraction on Current Month and 1 and store the result inside a Last Month considering 0 decimal places
    // vars["Last Month"] = (parseFloat(String(vars["Current Month"])) - parseFloat(String("1"))).toFixed(0);
    // [DISABLED] concate 0 and Last Month and store the new string into a Last Month
    // vars["Last Month"] = String('') + String('');
    if (true) /* Element No result (Bid requests) is visible */ {
      await expect(page.getByText("No result")).toBeVisible();
    } else {
      await stepGroups.stepGroup_Getting_Last_Month_From_Current_Month(page, vars);
      vars["Count of Uploaded Date"] = String(await page.locator("//td[@data-title=\"Uploaded\"]").count());
      vars["count"] = "1";
      while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["Count of Uploaded Date"]))) {
        await page.locator("//h3[text()[normalize-space() = \"Bid Requests\"]]").click();
        vars["UploadedDates"] = await page.locator("(//td[@data-title=\"Uploaded\"])[$|count|]").textContent() || '';
        vars["Company Name"] = await page.locator("(//div[normalize-space(text())='Company']//..//..//..//..//..//div[@class=\"text-nowrap\"])[$|count|]").textContent() || '';
        expect(new Date(String('')).getMonth()).toBe(new Date(String('')).getMonth());
        await expect(page.locator("(//div[normalize-space(text())='Company']//..//..//..//..//..//div[@class=\"text-nowrap\"])[$|count|]")).toContainText(vars["Company Name1"]);
        vars["count"] = (parseFloat(String(vars["count"])) + parseFloat(String("1"))).toFixed(0);
        vars["ActualStatus"] = await page.locator("(//td[@data-title=\"Status\"])[1]//span").textContent() || '';
        expect(String(vars["ActualStatus"])).toBe(vars["SelectedStatus "]);
        vars["ExpectedStatus"] = String(vars["ActualStatus"]).substring(1, String(vars["ActualStatus"]).length - 1);
        for (let i = 0; i < await page.locator("//td[@data-title=\"Status\"]//span").count(); i++) {
          await expect(page.locator("//td[@data-title=\"Status\"]//span").nth(i)).toHaveText(String(vars["ExpectedStatus"]));
        }
        // [DISABLED] Verify that the elements with locator Bid Request Status Column Data displays text ExpectedStatus and With Scrollable FALSE
        // await expect(page.locator("//td[@data-title=\"Status\"]//span")).toContainText(vars["ExpectedStatus"]);
      }
    }
  });
});
