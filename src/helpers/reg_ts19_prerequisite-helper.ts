import { Page, expect } from '@playwright/test';
import * as stepGroups from './step-groups';
import { TestDependencyManager } from './test-dependencies';

const PREREQUISITE_TEST_NAME = 'REG_TS19_TC01';

/**
 * TC19 Prerequisite Helper
 * Executes the full logic of REG_TS19_TC01 test
 * Used by TC20 to automatically run TC19 logic first
 */
export async function executeTC19Prerequisite(page: Page, vars: Record<string, string>): Promise<void> {
  try {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Selecting_the_multiple_Company_name_Creating_a_New_Map(page, vars);
    
    vars["CreatedOn"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC" };
      const fmt = "MM/dd/yyyy hh:mm a";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    
    vars["CreatedOnDate"] = String(vars["CreatedOn"]).substring(0, String(vars["CreatedOn"]).length - 9);
    
    vars["CreatedOnTime"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC" };
      const fmt = "hh:mm a";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    
    vars["CreatedOnTime1"] = (() => {
      const d = new Date('2000-01-01 ' + String(vars["CreatedOnTime"]));
      d.setMinutes(d.getMinutes() + parseInt(String("1")));
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }); // Format: HH:mm a
    })();
    
    vars["CreatedOnTime2"] = (() => {
      const d = new Date('2000-01-01 ' + String(vars["CreatedOnTime"]));
      d.setMinutes(d.getMinutes() + parseInt(String("2")));
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }); // Format: HH:mm a
    })();
    
    vars["space"] = "key_blank";
    vars["CreatedOn1"] = vars["CreatedOnDate"] + vars["space"] + vars["CreatedOnTime1"];
    vars["CreatedOn2"] = vars["CreatedOnDate"] + vars["space"] + vars["CreatedOnTime2"];
    
    await stepGroups.stepGroup_Uploading_the_File(page, vars);
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await expect(page.locator("//p[text()[normalize-space() = \"You have unidentified fields do you want to proceed further.\"]]")).toBeVisible();
    await page.locator("(//button[@type=\"button\"])[last()]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    
    if (true) /* Element Rules and Actions Button is visible */ {
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      await expect(page.locator("//p[text()[normalize-space() = \"You have unidentified fields do you want to proceed further.\"]]")).toBeVisible();
      await page.locator("(//button[@type=\"button\"])[last()]").click();
    } else {
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      await page.locator("//span[text()[normalize-space() = \"Save and Publish\"]]").click();
    }
    
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Save and Publish\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//div[contains(.,'$|Create New Map|')]").hover();
    
    vars["CountOfCompaniesAdded"] = await page.locator("(//button[@class=\"more-clients custom-bg-primary text-white fs-xs border-0\"])[1]").textContent() || '';
    await expect(page.locator("(//button[@class=\"more-clients custom-bg-primary text-white fs-xs border-0\"])[1]")).toContainText(vars["CountOfCompaniesAdded"]);
    
    // Mark prerequisite as passed
    TestDependencyManager.markPassed(PREREQUISITE_TEST_NAME);
  } catch (error) {
    // Mark prerequisite as failed
    TestDependencyManager.markFailed(PREREQUISITE_TEST_NAME);
    throw error;
  }
}
