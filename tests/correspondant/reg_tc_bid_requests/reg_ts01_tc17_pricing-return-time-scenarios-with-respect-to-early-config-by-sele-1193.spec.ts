import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS01_TC17_Pricing return time scenarios with respect to early config By Selecting Current Date and verifying the last batch time is not present in bid requests', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Deleting_Early_Config_Report_If_Present(page, vars);
    await stepGroups.stepGroup_Navigating_to_Bulk_Batch_Timing(page, vars);
    await page.waitForLoadState('networkidle');
    await stepGroups.stepGroup_Modifying_The_Batch_Intervals(page, vars);
    vars["BufferTime"] = await page.locator("//input[@id=\"pricingReturnTimeBuffer\"]").inputValue() || '';
    vars["ThirdBatchTimeFromLast"] = await page.locator("(//div[@class=\"card-body\"]//h5)[position() = last()-2]").textContent() || '';
    vars["LastBatchTimeToEnter"] = String(vars["ThirdBatchTimeFromLast"]).substring(0, String(vars["ThirdBatchTimeFromLast"]).length - 3);
    vars["BufferedThirdBatchTimeFromLast"] = (() => {
      const d = new Date('2000-01-01 ' + String(vars["ThirdBatchTimeFromLast"]));
      d.setMinutes(d.getMinutes() + parseInt(String(vars["BufferTime"])));
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }); // Format: hh:mm a
    })();
    vars["LastBeforeBatchTime"] = await page.locator("(//h5[@class=\"mb-0\"])[position() = last()-1]").textContent() || '';
    vars["BufferedLastBeforeBatchTime"] = (() => {
      const d = new Date('2000-01-01 ' + String(vars["LastBeforeBatchTime"]));
      d.setMinutes(d.getMinutes() + parseInt(String(vars["BufferTime"])));
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }); // Format: hh:mm a
    })();
    vars["LastBatchTime"] = await page.locator("(//h5[@class=\"mb-0\"])[last()]").textContent() || '';
    vars["BufferedLastBatchTime"] = (() => {
      const d = new Date('2000-01-01 ' + String(vars["LastBatchTime"]));
      d.setMinutes(d.getMinutes() + parseInt(String(vars["BufferTime"])));
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }); // Format: hh:mm a
    })();
    await stepGroups.stepGroup_Separating_Hours_and_Minutes(page, vars);
    await page.locator("//a[@href=\"#/admin/general-settings/early-close-config\"]").click();
    vars["CurrentDateList"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC-05:00" };
      const fmt = "yyyy/M/d";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    vars["CurrentDateCalender"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC-05:00" };
      const fmt = "d-M-yyyy";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    vars["CurrentDateInput"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC-05:00" };
      const fmt = "yyyy-MM-dd";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    if (true) /* Element Early Config For Current Date is visible */ {
      await page.locator("(//td[@data-title='Date' and contains(text(), '$|CurrentDateList|')]/..//button[2])").hover();
      await expect(page.getByText("Delete")).toBeVisible();
      await page.locator("(//td[@data-title='Date' and contains(text(), '$|CurrentDateList|')]/..//button[2])").click();
      await page.locator("//button[@aria-label=\"Yes, Delete\"]").click();
      await page.locator("//td[contains(text(),\" $|CurrentDateList|\")]").waitFor({ state: 'hidden' });
    }
    await page.locator("//button[text()[normalize-space() = \"Add New\"]]").click();
    await page.locator("//button[@aria-label=\"Toggle Date Picker\"]").click();
    await page.locator("//div[@aria-label=\"$|CurrentDateCalender|\"]").click();
    await expect(page.locator("//input[@placeholder=\"Select Date\" and @name=\"datepicker\"]")).toHaveValue(vars["CurrentDateInput"]);
    await page.locator("//input[@id='lastBatchTime']").fill(vars["LastBatchTimeToEnter"]);
    if (String(vars["Time_Unit"]).includes(String("AM"))) {
      await page.locator("//input[@id='lastBatchTime']/following-sibling::div//select[@aria-label=\"Default dropdown selection\"]").selectOption({ label: "AM" });
    } else {
      await page.locator("//input[@id='lastBatchTime']/following-sibling::div//select[@aria-label=\"Default dropdown selection\"]").selectOption({ label: "PM" });
    }
    await page.locator("//button[@aria-label=\"Save Configuration\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//td[contains(text(),\" $|CurrentDateList|\")]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//button[text()[normalize-space() = \"Upload New Bid Request\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText("Bid Request Details")).toBeVisible();
    await page.locator("//*[@id=\"pricingReturnTimeDropdown\"]//select[contains(@class,\"form-select\")]").click();
    await expect(page.locator("//select[@class=\"form-select ng-pristine ng-invalid ng-touched\"] | //select[@class=\"form-select ng-untouched ng-pristine ng-invalid\"]").locator('option', { hasText: vars["BufferedThirdBatchTimeFromLast"] })).not.toBeVisible();
    await expect(page.locator("//select[@class=\"form-select ng-pristine ng-invalid ng-touched\"] | //select[@class=\"form-select ng-untouched ng-pristine ng-invalid\"]").locator('option', { hasText: vars["BufferedLastBeforeBatchTime"] })).not.toBeVisible();
    await expect(page.locator("//select[@class=\"form-select ng-pristine ng-invalid ng-touched\"] | //select[@class=\"form-select ng-untouched ng-pristine ng-invalid\"]").locator('option', { hasText: vars["BufferedLastBatchTime"] })).not.toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//*[text()[normalize-space() = \"General Settings\"]]").click();
    await page.waitForLoadState('networkidle');
    await page.locator("//a[@href=\"#/admin/general-settings/early-close-config\"]").click();
    await page.waitForLoadState('networkidle');
    await stepGroups.stepGroup_Delete_early_config(page, vars);
  });
});
