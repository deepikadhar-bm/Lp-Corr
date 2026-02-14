import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_General Settings', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS20_TC04_Audit - Verify the Audit log info after performing Add / Edit / Delete actions then accordingly the logs should be reflected in Audit logs', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//a[@href=\"#/admin/general-settings/email-config\"]").click();
    await page.locator("//button[text()[normalize-space() = \"Add Email\"]]").waitFor({ state: 'visible' });
    await page.locator("//button[text()[normalize-space() = \"Add Email\"]]").click();
    await page.getByText("Add Internal Recipient").waitFor({ state: 'visible' });
    await page.locator("//input[@id='emailInput']").fill("testsigma2@gmail.com");
    vars["ExpectedEmail"] = "testsigma2@gmail.com";
    await page.locator("//button[@aria-label=\"Save\"]").click();
    vars["ExpectedTimeAudit"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC" };
      const fmt = "MM/dd/yyyy hh:mm a";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//button[@aria-label=\"Close\"]").click();
    await expect(page.locator("(//td[@data-title=\"Email\"])[last()]")).toContainText(vars["ExpectedEmail"]);
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[@href=\"#/admin/general-settings/audit-log\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//td[@data-title=\"Created\"]")).toContainText(vars["ExpectedTimeAudit"]);
    await expect(page.locator("//td[@data-title=\"Username\"]")).toContainText("testsigma_internal\t\r");
    await expect(page.locator("//td[@data-title=\"Config Type\"]")).toContainText("Email Config");
    await page.locator("//tbody[@role=\"rowgroup\"]/tr[1]/td[4]/div[1]/button[1]").click();
    await page.locator("//button[text()[normalize-space() = \"Side by side\"]]").waitFor({ state: 'visible' });
    await expect(page.locator("//button[text()[normalize-space() = \"Side by side\"]]")).toBeVisible();
    await expect(page.locator("//button[text()[normalize-space() = \"Line by line\"]]")).toBeVisible();
    await expect(page.locator("//div[@class=\"d2h-file-side-diff\"]//table")).toBeVisible();
    vars["SidebySideTablesCount"] = String(await page.locator("//div[@class=\"d2h-file-side-diff\"]//table").count());
    expect(String(vars["SidebySideTablesCount"])).toBe("2");
    await expect(page.locator("(//div[@class=\"d2h-file-side-diff\"]//table)[2]")).toContainText(vars["ExpectedEmail"]);
    await expect(page.locator("(//td[@class=\"d2h-del d2h-change\"]/../following-sibling::tr//td[contains(@class,\"emptyplaceholder\")])[2]")).toBeVisible();
    await page.locator("//button[text()[normalize-space() = \"Line by line\"]]").click();
    await page.locator("//button[text()[normalize-space() = \"Side by side\"]]").waitFor({ state: 'visible' });
    await expect(page.locator("//button[text()[normalize-space() = \"Line by line\"]]")).toBeVisible();
    await page.locator("//div[@class=\"d2h-file-diff\"]//table").waitFor({ state: 'visible' });
    vars["LineByLineTableCount"] = String(await page.locator("//div[@class=\"d2h-file-diff\"]//table").count());
    expect(String(vars["LineByLineTableCount"])).toBe("1");
    await expect(page.locator("(//td[@class=\"d2h-ins d2h-change\"]/../following-sibling::tr//td//span)[2]")).toContainText(vars["ExpectedEmail"]);
    // [DISABLED] Verification of see difference pop up data
    // await stepGroups.stepGroup_Verification_of_see_difference_pop_up_data(page, vars);
    await page.locator("//i[contains(@class, 'fa-lg') and contains(@class, 'color-primary') and contains(@class, 'fa-times')]").click();
    await page.locator("//a[@href=\"#/admin/general-settings/email-config\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Deleting_added_email_from_email_config(page, vars);
  });
});
