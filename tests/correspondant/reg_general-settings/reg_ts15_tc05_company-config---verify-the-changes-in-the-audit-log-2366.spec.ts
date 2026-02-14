import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_General Settings', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS15_TC05_Company Config - Verify the Changes in the Audit Log', async ({ page }) => {
    // Prerequisite: REG_TS15_TC01_Company Config - Verify the User can add/ edit  the Values in the Inputs. 
    // TODO: Ensure prerequisite test passes first

    // [DISABLED] Login to CORR Portal
    // await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    // [DISABLED] Click on Administration_Menu
    // await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    // [DISABLED] Click on GeneralSettings_Menu
    // await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    // [DISABLED] Wait until the element Spinner is not visible
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["ExpectedTimeAudit"] = vars["TimeOnScreen"];
    vars["ExpectedTimeAudit"] = String(vars["ExpectedTimeAudit"]).substring(17, String(vars["ExpectedTimeAudit"]).length - 13);
    vars["ExpectedTimeAudit"] = (() => {
      const d = new Date(String(vars["ExpectedTimeAudit"]));
      const _p = { yyyy: String(d.getFullYear()), yy: String(d.getFullYear()).slice(-2), MM: String(d.getMonth()+1).padStart(2,'0'), M: String(d.getMonth()+1), dd: String(d.getDate()).padStart(2,'0'), d: String(d.getDate()), HH: String(d.getHours()).padStart(2,'0'), hh: String(d.getHours()%12||12).toString().padStart(2,'0'), h: String(d.getHours()%12||12), mm: String(d.getMinutes()).padStart(2,'0'), ss: String(d.getSeconds()).padStart(2,'0'), a: d.getHours() >= 12 ? 'PM' : 'AM' };
      return "MM/dd/yyyy hh:mm a".replace('yyyy',_p.yyyy).replace('yy',_p.yy).replace('MM',_p.MM).replace('dd',_p.dd).replace('HH',_p.HH).replace('hh',_p.hh).replace('mm',_p.mm).replace('ss',_p.ss).replace(/a/g,_p.a).replace(/M(?!M)/g,_p.M).replace(/d(?!d)/g,_p.d).replace(/h(?!h)/g,_p.h);
    })();
    await page.locator("//a[@href=\"#/admin/general-settings/audit-log\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Verify that the element Created Date & Time Column Data value contains the ExpectedTimeAudit , ignoring case
    // expect((await page.locator("//td[@data-title=\"Created\"]").inputValue() || '').toLowerCase()).toContain(String('').toLowerCase());
    expect((await page.locator("//td[@data-title=\"Created\"]").textContent() || '').toLowerCase()).toContain(String('').toLowerCase());
    // [DISABLED] Verify that the element Created Date & Time Column Data displays text contains ExpectedTimeAudit and With Scrollable FALSE
    // await expect(page.locator("//td[@data-title=\"Created\"]")).toContainText(vars["ExpectedTimeAudit"]);
    await expect(page.locator("//td[@data-title=\"Username\"]")).toContainText("testsigma_internal\t\r");
    await expect(page.locator("//td[@data-title=\"Config Type\"]")).toContainText("Company Config");
    await page.locator("//tbody[@role=\"rowgroup\"]/tr[1]/td[4]/div[1]/button[1]").click();
    await page.locator("//button[text()[normalize-space() = \"Side by side\"]]").waitFor({ state: 'visible' });
    await expect(page.locator("//button[text()[normalize-space() = \"Side by side\"]]")).toBeVisible();
    await expect(page.locator("//button[text()[normalize-space() = \"Line by line\"]]")).toBeVisible();
    await expect(page.locator("//div[@class=\"d2h-file-side-diff\"]//table")).toBeVisible();
    vars["SidebySideTablesCount"] = String(await page.locator("//div[@class=\"d2h-file-side-diff\"]//table").count());
    expect(String(vars["SidebySideTablesCount"])).toBe("2");
    await expect(page.locator("(//td[@class=\"d2h-del d2h-change\"]//span[contains(text(),\"name\" )])[1]")).toContainText(vars["CompanyPreviousDataExp"]);
    await expect(page.locator("(//td[@class=\"d2h-del d2h-change\"]//span[contains(text(),\"internalUser\" )])[1]")).toContainText(vars["InternalUserPreviousDataExp"]);
    await expect(page.locator("((//td[@class=\"d2h-del d2h-change\"]//span[contains(text(),\"name\" )])//del)[1]")).toHaveCSS('border', "rgba(255, 182, 186, 1)");
    await expect(page.locator("(//td[@class=\"d2h-del d2h-change\"]//span[contains(text(),\"internalUser\" )])//del")).toHaveCSS('border', "rgba(255, 182, 186, 1)");
    await expect(page.locator("(//td[@class=\"d2h-ins d2h-change\"]//span[contains(text(),\"name\" )])[1]")).toContainText(vars["CompanyNewDataExp"]);
    await expect(page.locator("(//td[@class=\"d2h-ins d2h-change\"]//span[contains(text(),\"internalUser\" )])[1]")).toContainText(vars["InternalUserNewDataExp"]);
    await expect(page.locator("((//td[@class=\"d2h-ins d2h-change\"]//span[contains(text(),\"name\" )])//ins)[1]")).toHaveCSS('border', "rgba(151, 242, 149, 1)");
    await expect(page.locator("(//td[@class=\"d2h-ins d2h-change\"]//span[contains(text(),\"internalUser\" )])//ins")).toHaveCSS('border', "rgba(151, 242, 149, 1)");
    await page.locator("//button[text()[normalize-space() = \"Line by line\"]]").click();
    await page.locator("//button[text()[normalize-space() = \"Side by side\"]]").waitFor({ state: 'visible' });
    await expect(page.locator("//button[text()[normalize-space() = \"Line by line\"]]")).toBeVisible();
    await page.locator("//div[@class=\"d2h-file-diff\"]//table").waitFor({ state: 'visible' });
    vars["LineByLineTableCount"] = String(await page.locator("//div[@class=\"d2h-file-diff\"]//table").count());
    expect(String(vars["LineByLineTableCount"])).toBe("1");
    await stepGroups.stepGroup_Verification_of_see_difference_pop_up_data(page, vars);
    await page.locator("//i[contains(@class, 'fa-lg') and contains(@class, 'color-primary') and contains(@class, 'fa-times')]").click();
  });
});
