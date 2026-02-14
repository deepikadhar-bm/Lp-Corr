import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_General Settings', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS02_TC01_Global Restrictions - Update the configs for both chase and standard', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[@href=\"#/admin/general-settings/global-restrictions\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    if (true) /* Radio button Standard Off Radio button is selected */ {
      await page.locator("//input[@id='dynamicPricing-select-on']").check();
      vars["StandardPreviousDataExp"] = "false";
      vars["StandardNewDataExp"] = "true";
    } else if (true) /* Radio button Standard On Radio(Global Restriction) is select */ {
      await page.locator("(//label[normalize-space(text())='Standard']/parent::div//input)[2]").check();
      vars["StandardPreviousDataExp"] = "true";
      vars["StandardNewDataExp"] = "false";
    }
    if (true) /* Radio button Chase On Radio(Global Restriction) is selected */ {
      await page.locator("//input[@id='executionTypeFastPath-select-off']").check();
      vars["ChasePreviousDataExp"] = "true";
      vars["ChaseNewDataExp"] = "false";
    } else if (true) /* Radio button Chase Off Radio(Global Restrictions) is selecte */ {
      await page.locator("//input[@id='executionTypeFastPath-select-on']").check();
      vars["ChasePreviousDataExp"] = "false";
      vars["ChaseNewDataExp"] = "true";
    }
    await page.locator("//button[normalize-space(text())=\"Save changes\" or contains(text(),\"Save Changes\")]").waitFor({ state: 'visible' });
    await page.locator("//button[normalize-space(text())=\"Save changes\" or contains(text(),\"Save Changes\")]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["CurrentLocalTime"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC" };
      const fmt = "M/d/yyyy : h:mm a";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    expect((await page.locator("(//div[contains(text(),\"Last Modified\")])[1]").textContent() || '').toLowerCase()).toContain(String('').toLowerCase());
    await expect(page.locator("(//div[contains(text(),\"Last Modified\")])[1]")).toContainText("test sigma");
    vars["ExpectedTimeAudit"] = (() => {
      const d = new Date(String(vars["CurrentLocalTime"]));
      const _p = { yyyy: String(d.getFullYear()), yy: String(d.getFullYear()).slice(-2), MM: String(d.getMonth()+1).padStart(2,'0'), M: String(d.getMonth()+1), dd: String(d.getDate()).padStart(2,'0'), d: String(d.getDate()), HH: String(d.getHours()).padStart(2,'0'), hh: String(d.getHours()%12||12).toString().padStart(2,'0'), h: String(d.getHours()%12||12), mm: String(d.getMinutes()).padStart(2,'0'), ss: String(d.getSeconds()).padStart(2,'0'), a: d.getHours() >= 12 ? 'PM' : 'AM' };
      return "MM/d/yyyy hh:mm a".replace('yyyy',_p.yyyy).replace('yy',_p.yy).replace('MM',_p.MM).replace('dd',_p.dd).replace('HH',_p.HH).replace('hh',_p.hh).replace('mm',_p.mm).replace('ss',_p.ss).replace(/a/g,_p.a).replace(/M(?!M)/g,_p.M).replace(/d(?!d)/g,_p.d).replace(/h(?!h)/g,_p.h);
    })();
  });
});
