import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS08_TC02_Audit Log - Verify the difference button in the details section  (Side by side) & (Line by Line).', async ({ page }) => {
    // Prerequisite: REG_TS08_TC01_Bid Map config - Verify the last modified and audit log info by updating the smart map
    // TODO: Ensure prerequisite test passes first

    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[@href=\"#/admin/general-settings/audit-log\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Pick the current date MM/dd/yyyy by location UTC and store into a variable ExpectedDateAudit
    // vars["ExpectedDateAudit"] = (() => {
    //   const d = new Date();
    //   const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC" };
    //   const fmt = "MM/dd/yyyy";
    //   // Map Java date format to Intl parts
    //   const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
    //   const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
    //   return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    // })();
    // [DISABLED] Pick the current date hh:mm a by location UTC and store into a variable ExpectedTimeAudit
    // vars["ExpectedTimeAudit"] = (() => {
    //   const d = new Date();
    //   const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC" };
    //   const fmt = "hh:mm a";
    //   // Map Java date format to Intl parts
    //   const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
    //   const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
    //   return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    // })();
    vars["ExpectedDateandTimeAudit"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC" };
      const fmt = "MM/dd/yyyy hh:mm a";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    // [DISABLED] Store key_blank in Space
    // vars["Space"] = "key_blank";
    // [DISABLED] Concate ExpectedDateAudit and String2 with Space and store into a variable testdata
    // vars[""] = String(vars["ExpectedDateAudit"]) + ' ' + String("String2");
    // [DISABLED] Store key_blank in Space
    // vars["Space"] = "key_blank";
    await expect(page.locator("//td[@data-title=\"Created\"]")).toContainText(vars["ExpectedDateandTimeAudit"]);
    await expect(page.locator("//td[@data-title=\"Username\"]")).toContainText("testsigma_internal\t\r");
    await expect(page.locator("//td[@data-title=\"Config Type\"]")).toContainText("Bid Map Config");
    await page.locator("//tbody[@role=\"rowgroup\"]/tr[1]/td[4]/div[1]/button[1]").click();
    await page.locator("//button[text()[normalize-space() = \"Side by side\"]]").waitFor({ state: 'visible' });
    await expect(page.locator("//button[text()[normalize-space() = \"Side by side\"]]")).toBeVisible();
    await expect(page.locator("//button[text()[normalize-space() = \"Line by line\"]]")).toBeVisible();
    await expect(page.locator("//div[@class=\"d2h-file-side-diff\"]//table")).toBeVisible();
    vars["SidebySideTablesCount"] = String(await page.locator("//div[@class=\"d2h-file-side-diff\"]//table").count());
    expect(String(vars["SidebySideTablesCount"])).toBe("2");
    await expect(page.locator("//td[@class=\"d2h-del d2h-change\"]//span[contains(@class,\"d2h-code-line-ctn\" )]")).toContainText("enableSmartMapper");
    await expect(page.locator("//td[@class=\"d2h-del d2h-change\"]//span[contains(@class,\"d2h-code-line-ctn\" )]")).toContainText(vars["ExpectedPreviousData"]);
    await expect(page.locator("//td[@class=\"d2h-ins d2h-change\"]//span[contains(@class,\"d2h-code-line-ctn\" )]")).toContainText("enableSmartMapper");
    await expect(page.locator("//td[@class=\"d2h-ins d2h-change\"]//span[contains(@class,\"d2h-code-line-ctn\" )]")).toContainText(vars["ExpectedNewData"]);
    await page.locator("//button[text()[normalize-space() = \"Line by line\"]]").click();
    await page.locator("//button[text()[normalize-space() = \"Side by side\"]]").waitFor({ state: 'visible' });
    await expect(page.locator("//button[text()[normalize-space() = \"Line by line\"]]")).toBeVisible();
    await page.locator("//div[@class=\"d2h-file-diff\"]//table").waitFor({ state: 'visible' });
    vars["LineByLineTableCount"] = String(await page.locator("//div[@class=\"d2h-file-diff\"]//table").count());
    expect(String(vars["LineByLineTableCount"])).toBe("1");
    await expect(page.locator("//td[@class=\"d2h-del d2h-change\"]//span[contains(@class,\"d2h-code-line-ctn\" )]")).toContainText("enableSmartMapper");
    await expect(page.locator("//td[@class=\"d2h-del d2h-change\"]//span[contains(@class,\"d2h-code-line-ctn\" )]")).toContainText(vars["ExpectedPreviousData"]);
    await expect(page.locator("//td[@class=\"d2h-ins d2h-change\"]//span[contains(@class,\"d2h-code-line-ctn\" )]")).toContainText("enableSmartMapper");
    await expect(page.locator("//td[@class=\"d2h-ins d2h-change\"]//span[contains(@class,\"d2h-code-line-ctn\" )]")).toContainText(vars["ExpectedNewData"]);
    await page.locator("//i[contains(@class, 'fa-lg') and contains(@class, 'color-primary') and contains(@class, 'fa-times')]").click();
  });
});
