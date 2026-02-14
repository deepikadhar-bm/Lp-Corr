import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS22_TC05_01.1_Perform the resubmit for pricing action for a bid with the Standard execution type, and verify the values in the resubmitted record(Target: Submit on next business day, upload expir', async ({ page }) => {
    // Prerequisite: REG_TS22_TC05_01_Perform the resubmit for pricing action for a bid with the Standard execution type,
    // TODO: Ensure prerequisite test passes first

    await page.waitForTimeout(120000);
    await page.locator("(//tbody//tr//td)[1]//button[1]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["RequestIdPopupBeforeSubmit"] = await page.locator("(//h5[@aria-labelledby=\"bidRequestIdLabel\"])[1]").textContent() || '';
    vars["LoanNumberPopUpBeforeSubmit"] = await page.locator("(//h5[@aria-labelledby=\"bidRequestIdLabel\"])[2]").textContent() || '';
    vars["ErrorsCheckPopupBeforeSubmit"] = await page.locator("//div[@class=\"flex-grow-1 d-flex gap-3\"]//div/div[@id=\"errorsCheckLabel\"]/..//h5[@aria-labelledby=\"errorsCheckLabel\"]").textContent() || '';
    vars["ChaseFieldCountPopup"] = String(await page.locator("//div[@class=\"border-bottom p-2\"]").count());
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["ChaseFieldCountPopup"]))) {
      await page.locator("(//h5[@aria-labelledby=\"bidRequestIdLabel\"])[1]").click();
      vars["ChaseFieldNameBeforeSubmit"] = await page.locator("(//div[@class=\"border-bottom p-2\"])[$|count|]").textContent() || '';
      vars["ChaseValuePopupBeforeSubmit"] = await page.locator("(//div[@class=\"border-bottom p-2\" and contains(text(),\"$|ChaseFieldNameBeforeSubmit|\")]/following-sibling::div)[1]").textContent() || '';
      if (String(vars["ChaseValuePopupBeforeSubmit"]) === String("Key_blank")) {
        vars["ChaseValuePopupBeforeSubmit"] = "Null";
      }
      for (let dataIdx = parseInt(vars["count"]); dataIdx <= parseInt(vars["count"]); dataIdx++) {
        // Write to test data profile: "ChaseFieldNameBeforeSubmit" = vars["ChaseFieldNameBeforeSubmit"]
        // TODO: Test data profile writes need custom implementation
        // Write to test data profile: "ChaseValueBeforeSubmit" = vars["ChaseValuePopupBeforeSubmit"]
        // TODO: Test data profile writes need custom implementation
      }
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    await page.waitForTimeout(120000);
    await page.locator("//button[@aria-label=\"Close\"]").click();
    vars["FooterSubmssionBeforeSubmit"] = await page.locator("//div[@id=\"page-footer\"]//span[@class=\"d-block\"]").textContent() || '';
    vars["FooterQueuedBeforeSubmit"] = await page.locator("//div[@id=\"page-footer\"]//span[contains(text(),\"Queued For\")]").textContent() || '';
    await page.locator("//button[contains(@class, 'btn-primary')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//label[text()[normalize-space() = \"Today\"]]/preceding-sibling::input[@type=\"radio\"]")).toBeVisible();
    await page.locator("//label[text()[normalize-space() = \"Next Business Day\"]]/preceding-sibling::input[@type=\"radio\"]").check();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//select[@aria-label=\"Dropdown selection\"]").click();
    await page.waitForTimeout(5000);
    if (true) /* Element Enabled Time is visible */ {
      await stepGroups.stepGroup_Selecting_Second_Enabled_Batch_Time_If_the_Condition_is_fail(page, vars);
      // [DISABLED] Scroll to the element Enabled Time into view
      // await page.locator("//option[@aria-disabled=\"false\"]").scrollIntoViewIfNeeded();
      // [DISABLED] Click on Enabled Time
      // await page.locator("//option[@aria-disabled=\"false\"]").click();
    } else {
      await page.locator("//i[contains(@class, 'fa-lg') and contains(@class, 'color-primary') and contains(@class, 'fa-times')]").click();
      await stepGroups.stepGroup_Navigating_to_Bulk_Batch_Timing(page, vars);
      await stepGroups.stepGroup_Modifying_The_Batch_Intervals_For_Next_bussiness_day_with_on(page, vars);
      await page.locator("//a[@href=\"#/bid-requests\"]").click();
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["RequestIDBeforeResubmit"]);
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      await expect(page.locator("//td[@data-title=\"Bid Req. ID\"]")).toContainText(vars["RequestIDBeforeResubmit"]);
      await page.locator("//td[@data-title=\"Bid Req. ID\"]").click();
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      await page.locator("//button[contains(@class, 'btn-primary')]").click();
      await expect(page.locator("//label[text()[normalize-space() = \"Today\"]]/preceding-sibling::input[@type=\"radio\"]")).toBeVisible();
      await page.locator("//label[text()[normalize-space() = \"Next Business Day\"]]/preceding-sibling::input[@type=\"radio\"]").check();
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      await page.locator("//select[@aria-label=\"Dropdown selection\"]").click();
      await page.waitForTimeout(5000);
      await page.locator("//option[@aria-disabled=\"false\"]").click();
    }
    vars["CurrentESTDate"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC-05:00" };
      const fmt = "MM/dd/yyyy";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    vars["CurrentEstTime"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC-05:00" };
      const fmt = "hh:mm a";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    vars["SelectedBatchTime"] = await page.locator("//select[@aria-label=\"Dropdown selection\"]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
    await page.locator("//button[contains(@class, 'btn-primary') and contains(@class, 'fw-bold')]").click();
    await page.locator("//div[@class=\"modal-header\"]/div/h5").waitFor({ state: 'visible' });
    await expect(page.locator("//div[@class=\"modal-header\"]/div/h5")).toBeVisible();
    await page.locator("//span[text()=\"Continue\"]/..").waitFor({ state: 'visible' });
    await stepGroups.stepGroup_Verify_that_the_Bid_Upload_Progress_Popup_has_All_statuses_w(page, vars);
    await page.locator("//span[text()=\"Continue\"]/..").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
  });
});
