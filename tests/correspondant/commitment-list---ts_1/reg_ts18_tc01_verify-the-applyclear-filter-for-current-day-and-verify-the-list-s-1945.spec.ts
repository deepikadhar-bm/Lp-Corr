import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Commitment List - TS_1', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS18_TC01_Verify the Apply/Clear filter for current day and verify the list should display the records from current day only', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Filter\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"Select Date Range\"]]").click();
    await page.locator("//input[@placeholder=\"Select Date\"]").click();
    vars["CurrentDate"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC-05:00" };
      const fmt = "d-M-yyyy";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    await page.locator("//div[@class=\"ngb-dp-month\"]//div[@aria-label=\"$|CurrentDate|\"]").click();
    await page.locator("//button[text()[normalize-space() = \"Apply\"]]").click();
    await page.locator("//div[contains(@class, \"justify-content-end\")]//button[text()=\"Apply Filters\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Date\")]").waitFor({ state: 'visible' });
    vars["ExpectedDateChip"] = (() => {
      const d = new Date(String(vars["CurrentDate"]));
      const _p = { yyyy: String(d.getFullYear()), yy: String(d.getFullYear()).slice(-2), MM: String(d.getMonth()+1).padStart(2,'0'), M: String(d.getMonth()+1), dd: String(d.getDate()).padStart(2,'0'), d: String(d.getDate()), HH: String(d.getHours()).padStart(2,'0'), hh: String(d.getHours()%12||12).toString().padStart(2,'0'), h: String(d.getHours()%12||12), mm: String(d.getMinutes()).padStart(2,'0'), ss: String(d.getSeconds()).padStart(2,'0'), a: d.getHours() >= 12 ? 'PM' : 'AM' };
      return "yyyy/MM/dd".replace('yyyy',_p.yyyy).replace('yy',_p.yy).replace('MM',_p.MM).replace('dd',_p.dd).replace('HH',_p.HH).replace('hh',_p.hh).replace('mm',_p.mm).replace('ss',_p.ss).replace(/a/g,_p.a).replace(/M(?!M)/g,_p.M).replace(/d(?!d)/g,_p.d).replace(/h(?!h)/g,_p.h);
    })();
    await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Date\")]")).toContainText(vars["ExpectedDateChip"]);
    if (true) /* Element Go to Next Page Button is enabled */ {
      vars["CountofPages"] = "2";
    } else {
      vars["CountofPages"] = "1";
    }
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["CountofPages"]))) {
      vars["ExpectedRequestedDate"] = (() => {
        const d = new Date(String(vars["CurrentDate"]));
        const _p = { yyyy: String(d.getFullYear()), yy: String(d.getFullYear()).slice(-2), MM: String(d.getMonth()+1).padStart(2,'0'), M: String(d.getMonth()+1), dd: String(d.getDate()).padStart(2,'0'), d: String(d.getDate()), HH: String(d.getHours()).padStart(2,'0'), hh: String(d.getHours()%12||12).toString().padStart(2,'0'), h: String(d.getHours()%12||12), mm: String(d.getMinutes()).padStart(2,'0'), ss: String(d.getSeconds()).padStart(2,'0'), a: d.getHours() >= 12 ? 'PM' : 'AM' };
        return "MM/dd/yyyy".replace('yyyy',_p.yyyy).replace('yy',_p.yy).replace('MM',_p.MM).replace('dd',_p.dd).replace('HH',_p.HH).replace('hh',_p.hh).replace('mm',_p.mm).replace('ss',_p.ss).replace(/a/g,_p.a).replace(/M(?!M)/g,_p.M).replace(/d(?!d)/g,_p.d).replace(/h(?!h)/g,_p.h);
      })();
      for (let i = 0; i < await page.locator("//div[contains(@aria-label,\"Requested Date:\")]").count(); i++) {
        await expect(page.locator("//div[contains(@aria-label,\"Requested Date:\")]").nth(i)).toHaveText(String(vars["ExpectedRequestedDate"]));
      }
      if (true) /* Element Go to Next Page Button is enabled */ {
        await page.locator("//button[@aria-label=\"Go to Next Page\"]//span").click();
        await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      }
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    await page.locator("//input[@aria-label=\"Select all for \" and @type=\"checkbox\"]").check();
    vars["ExportSelectedCountAfterApplyingFilters"] = await page.locator("//span[contains(text(),\"Export Selected\")]//following-sibling::span").textContent() || '';
    vars["ExportSelectedCountAfterApplyingFilters"] = String(vars["ExportSelectedCountAfterApplyingFilters"]).replace(/\(\)/g, '');
    await page.locator("//button[contains(@aria-label,\"Remove Date:\")]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Date\")]")).toBeVisible();
    await page.locator("//input[@aria-label=\"Select all for \" and @type=\"checkbox\"]").check();
    vars["ExportSelectedCountAfterRemovingFilters"] = await page.locator("//span[contains(text(),\"Export Selected\")]//following-sibling::span").textContent() || '';
    vars["ExportSelectedCountAfterRemovingFilters"] = String(vars["ExportSelectedCountAfterRemovingFilters"]).replace(/\(\)/g, '');
    expect(String(vars["ExportSelectedCountAfterRemovingFilters"])).toBe(vars["ExportSelectedCountAfterApplyingFilters"]);
    await page.locator("//span[text()[normalize-space() = \"Filter\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"Select Date Range\"]]").click();
    await page.locator("//input[@placeholder=\"Select Date\"]").click();
    await page.locator("//div[@class=\"ngb-dp-month\"]//div[@aria-label=\"$|CurrentDate|\"]").click();
    await page.locator("//button[text()[normalize-space() = \"Apply\"]]").click();
    await page.locator("//div[contains(@class, \"justify-content-end\")]//button[text()=\"Apply Filters\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Date\")]").waitFor({ state: 'visible' });
    vars["CurrentDate"] = (() => {
      const d = new Date(String(vars["CurrentDate"]));
      const _p = { yyyy: String(d.getFullYear()), yy: String(d.getFullYear()).slice(-2), MM: String(d.getMonth()+1).padStart(2,'0'), M: String(d.getMonth()+1), dd: String(d.getDate()).padStart(2,'0'), d: String(d.getDate()), HH: String(d.getHours()).padStart(2,'0'), hh: String(d.getHours()%12||12).toString().padStart(2,'0'), h: String(d.getHours()%12||12), mm: String(d.getMinutes()).padStart(2,'0'), ss: String(d.getSeconds()).padStart(2,'0'), a: d.getHours() >= 12 ? 'PM' : 'AM' };
      return "yyyy/MM/dd".replace('yyyy',_p.yyyy).replace('yy',_p.yy).replace('MM',_p.MM).replace('dd',_p.dd).replace('HH',_p.HH).replace('hh',_p.hh).replace('mm',_p.mm).replace('ss',_p.ss).replace(/a/g,_p.a).replace(/M(?!M)/g,_p.M).replace(/d(?!d)/g,_p.d).replace(/h(?!h)/g,_p.h);
    })();
    // [DISABLED] Store DateFunctions :: Current Date in CurrentDate
    // vars["CurrentDate"] = new Date().toLocaleDateString('en-US') /* format: yyyy/MM/dd */;
    vars["Space"] = "key_blank";
    vars["CurrentDateWithTextDate"] = "Date:" + vars["Space"] + vars["CurrentDate"];
    await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Date\")]")).toContainText(vars["CurrentDateWithTextDate"]);
    if (true) /* Element Go to Next Page Button is enabled */ {
      vars["CountofPages"] = "2";
    } else {
      vars["CountofPages"] = "1";
    }
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["CountofPages"]))) {
      for (let i = 0; i < await page.locator("//div[contains(@aria-label,\"Requested Date:\")]").count(); i++) {
        await expect(page.locator("//div[contains(@aria-label,\"Requested Date:\")]").nth(i)).toHaveText(String(vars["ExpectedRequestedDate"]));
      }
      if (true) /* Element Go to Next Page Button is enabled */ {
        await page.locator("//button[@aria-label=\"Go to Next Page\"]//span").click();
        await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      }
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    await page.locator("//input[@aria-label=\"Select all for \" and @type=\"checkbox\"]").check();
    vars["ExportSelectedCountAfterApplyingFilters"] = await page.locator("//span[contains(text(),\"Export Selected\")]//following-sibling::span").textContent() || '';
    vars["ExportSelectedCountAfterApplyingFilters"] = String(vars["ExportSelectedCountAfterApplyingFilters"]).replace(/\(\)/g, '');
    await page.locator("//button[@aria-label=\"Clear all filters\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Date\")]")).toBeVisible();
    await page.locator("//input[@aria-label=\"Select all for \" and @type=\"checkbox\"]").check();
    vars["ExportSelectedCountAfterRemovingFilters"] = await page.locator("//span[contains(text(),\"Export Selected\")]//following-sibling::span").textContent() || '';
    vars["ExportSelectedCountAfterRemovingFilters"] = String(vars["ExportSelectedCountAfterRemovingFilters"]).replace(/\(\)/g, '');
    expect(String(vars["ExportSelectedCountAfterRemovingFilters"])).toBe(vars["ExportSelectedCountAfterApplyingFilters"]);
  });
});
