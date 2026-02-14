import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_General Settings', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS06_TC03_Early Config - Verify the Select data range calnder functionality ', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Navigating_to_Bulk_Batch_Timing(page, vars);
    await page.waitForLoadState('networkidle');
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
    vars["TomorrowDateList"] = (() => {
      const d = new Date(String(vars["CurrentDateList"]));
      d.setDate(d.getDate() + parseInt(String("1")));
      const _p = { yyyy: String(d.getFullYear()), yy: String(d.getFullYear()).slice(-2), MM: String(d.getMonth()+1).padStart(2,'0'), M: String(d.getMonth()+1), dd: String(d.getDate()).padStart(2,'0'), d: String(d.getDate()), HH: String(d.getHours()).padStart(2,'0'), hh: String(d.getHours()%12||12).toString().padStart(2,'0'), h: String(d.getHours()%12||12), mm: String(d.getMinutes()).padStart(2,'0'), ss: String(d.getSeconds()).padStart(2,'0'), a: d.getHours() >= 12 ? 'PM' : 'AM' };
      return "yyyy/M/d".replace('yyyy',_p.yyyy).replace('yy',_p.yy).replace('MM',_p.MM).replace('dd',_p.dd).replace('HH',_p.HH).replace('hh',_p.hh).replace('mm',_p.mm).replace('ss',_p.ss).replace(/a/g,_p.a).replace(/M(?!M)/g,_p.M).replace(/d(?!d)/g,_p.d).replace(/h(?!h)/g,_p.h);
    })();
    vars["DayAfterTomorrowDateList"] = (() => {
      const d = new Date(String(vars["CurrentDateList"]));
      d.setDate(d.getDate() + parseInt(String("2")));
      const _p = { yyyy: String(d.getFullYear()), yy: String(d.getFullYear()).slice(-2), MM: String(d.getMonth()+1).padStart(2,'0'), M: String(d.getMonth()+1), dd: String(d.getDate()).padStart(2,'0'), d: String(d.getDate()), HH: String(d.getHours()).padStart(2,'0'), hh: String(d.getHours()%12||12).toString().padStart(2,'0'), h: String(d.getHours()%12||12), mm: String(d.getMinutes()).padStart(2,'0'), ss: String(d.getSeconds()).padStart(2,'0'), a: d.getHours() >= 12 ? 'PM' : 'AM' };
      return "yyyy/M/d".replace('yyyy',_p.yyyy).replace('yy',_p.yy).replace('MM',_p.MM).replace('dd',_p.dd).replace('HH',_p.HH).replace('hh',_p.hh).replace('mm',_p.mm).replace('ss',_p.ss).replace(/a/g,_p.a).replace(/M(?!M)/g,_p.M).replace(/d(?!d)/g,_p.d).replace(/h(?!h)/g,_p.h);
    })();
    vars["TomorrowsDateCalender"] = (() => {
      const d = new Date(String(vars["TomorrowDateList"]));
      const _p = { yyyy: String(d.getFullYear()), yy: String(d.getFullYear()).slice(-2), MM: String(d.getMonth()+1).padStart(2,'0'), M: String(d.getMonth()+1), dd: String(d.getDate()).padStart(2,'0'), d: String(d.getDate()), HH: String(d.getHours()).padStart(2,'0'), hh: String(d.getHours()%12||12).toString().padStart(2,'0'), h: String(d.getHours()%12||12), mm: String(d.getMinutes()).padStart(2,'0'), ss: String(d.getSeconds()).padStart(2,'0'), a: d.getHours() >= 12 ? 'PM' : 'AM' };
      return "d-M-yyyy".replace('yyyy',_p.yyyy).replace('yy',_p.yy).replace('MM',_p.MM).replace('dd',_p.dd).replace('HH',_p.HH).replace('hh',_p.hh).replace('mm',_p.mm).replace('ss',_p.ss).replace(/a/g,_p.a).replace(/M(?!M)/g,_p.M).replace(/d(?!d)/g,_p.d).replace(/h(?!h)/g,_p.h);
    })();
    vars["DayAfterTomorrowsDateCalender"] = (() => {
      const d = new Date(String(vars["DayAfterTomorrowDateList"]));
      const _p = { yyyy: String(d.getFullYear()), yy: String(d.getFullYear()).slice(-2), MM: String(d.getMonth()+1).padStart(2,'0'), M: String(d.getMonth()+1), dd: String(d.getDate()).padStart(2,'0'), d: String(d.getDate()), HH: String(d.getHours()).padStart(2,'0'), hh: String(d.getHours()%12||12).toString().padStart(2,'0'), h: String(d.getHours()%12||12), mm: String(d.getMinutes()).padStart(2,'0'), ss: String(d.getSeconds()).padStart(2,'0'), a: d.getHours() >= 12 ? 'PM' : 'AM' };
      return "d-M-yyyy".replace('yyyy',_p.yyyy).replace('yy',_p.yy).replace('MM',_p.MM).replace('dd',_p.dd).replace('HH',_p.HH).replace('hh',_p.hh).replace('mm',_p.mm).replace('ss',_p.ss).replace(/a/g,_p.a).replace(/M(?!M)/g,_p.M).replace(/d(?!d)/g,_p.d).replace(/h(?!h)/g,_p.h);
    })();
    // [DISABLED] Convert the date from the TomorrowDateList in d-M-yyyy to yyyy-MM-dd and store it in a runtime TomorrowDateInput
    // vars["TomorrowDateInput"] = (() => {
    //   const d = new Date(String(vars["TomorrowDateList"]));
    //   const _p = { yyyy: String(d.getFullYear()), yy: String(d.getFullYear()).slice(-2), MM: String(d.getMonth()+1).padStart(2,'0'), M: String(d.getMonth()+1), dd: String(d.getDate()).padStart(2,'0'), d: String(d.getDate()), HH: String(d.getHours()).padStart(2,'0'), hh: String(d.getHours()%12||12).toString().padStart(2,'0'), h: String(d.getHours()%12||12), mm: String(d.getMinutes()).padStart(2,'0'), ss: String(d.getSeconds()).padStart(2,'0'), a: d.getHours() >= 12 ? 'PM' : 'AM' };
    //   return "yyyy-MM-dd".replace('yyyy',_p.yyyy).replace('yy',_p.yy).replace('MM',_p.MM).replace('dd',_p.dd).replace('HH',_p.HH).replace('hh',_p.hh).replace('mm',_p.mm).replace('ss',_p.ss).replace(/a/g,_p.a).replace(/M(?!M)/g,_p.M).replace(/d(?!d)/g,_p.d).replace(/h(?!h)/g,_p.h);
    // })();
    vars["TomorrowsDateInput"] = (() => {
      const d = new Date(String(vars["CurrentDateInput"]));
      d.setDate(d.getDate() + parseInt(String("1")));
      const _p = { yyyy: String(d.getFullYear()), yy: String(d.getFullYear()).slice(-2), MM: String(d.getMonth()+1).padStart(2,'0'), M: String(d.getMonth()+1), dd: String(d.getDate()).padStart(2,'0'), d: String(d.getDate()), HH: String(d.getHours()).padStart(2,'0'), hh: String(d.getHours()%12||12).toString().padStart(2,'0'), h: String(d.getHours()%12||12), mm: String(d.getMinutes()).padStart(2,'0'), ss: String(d.getSeconds()).padStart(2,'0'), a: d.getHours() >= 12 ? 'PM' : 'AM' };
      return "yyyy-MM-dd".replace('yyyy',_p.yyyy).replace('yy',_p.yy).replace('MM',_p.MM).replace('dd',_p.dd).replace('HH',_p.HH).replace('hh',_p.hh).replace('mm',_p.mm).replace('ss',_p.ss).replace(/a/g,_p.a).replace(/M(?!M)/g,_p.M).replace(/d(?!d)/g,_p.d).replace(/h(?!h)/g,_p.h);
    })();
    vars["DayAFterTomorrowsDateInput"] = (() => {
      const d = new Date(String(vars["CurrentDateInput"]));
      d.setDate(d.getDate() + parseInt(String("2")));
      const _p = { yyyy: String(d.getFullYear()), yy: String(d.getFullYear()).slice(-2), MM: String(d.getMonth()+1).padStart(2,'0'), M: String(d.getMonth()+1), dd: String(d.getDate()).padStart(2,'0'), d: String(d.getDate()), HH: String(d.getHours()).padStart(2,'0'), hh: String(d.getHours()%12||12).toString().padStart(2,'0'), h: String(d.getHours()%12||12), mm: String(d.getMinutes()).padStart(2,'0'), ss: String(d.getSeconds()).padStart(2,'0'), a: d.getHours() >= 12 ? 'PM' : 'AM' };
      return "yyyy-MM-dd".replace('yyyy',_p.yyyy).replace('yy',_p.yy).replace('MM',_p.MM).replace('dd',_p.dd).replace('HH',_p.HH).replace('hh',_p.hh).replace('mm',_p.mm).replace('ss',_p.ss).replace(/a/g,_p.a).replace(/M(?!M)/g,_p.M).replace(/d(?!d)/g,_p.d).replace(/h(?!h)/g,_p.h);
    })();
    await page.locator("//button[text()[normalize-space() = \"Add New\"]]").click();
    await page.locator("//button[@aria-label=\"Toggle Date Picker\"]").click();
    await page.locator("//div[@aria-label=\"$|TomorrowsDateCalender|\"]").click();
    await expect(page.locator("//input[@placeholder=\"Select Date\" and @name=\"datepicker\"]")).toHaveValue(vars["TomorrowsDateInput"]);
    vars["CurrentEstTime"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC-05:00" };
      const fmt = "hh:mm a";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    vars["CurrentEst2hrPrior"] = (() => {
      const d = new Date('2000-01-01 ' + String(vars["CurrentEstTime"]));
      d.setMinutes(d.getMinutes() + parseInt(String("120")));
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }); // Format: hh:mm a
    })();
    // [DISABLED] Add 2 and 0 to date CurrentEstTime and format hh:mm a and store CurrentEst2hrPrior
    // vars[""] = (() => {
    //   const d = new Date(String(''));
    //   d.setMinutes(d.getMinutes() + parseInt(String('')));
    //   return d.toLocaleString('en-US');
    // })();
    vars["TimeHourMin"] = String('').split("")["0"] || '';
    vars["TimeUnit"] = String('').split("")["1"] || '';
    await page.locator("//input[@id='lastBatchTime']").fill(vars["TimeHourMin"]);
    if (String(vars["TimeUnit"]).includes(String("AM"))) {
      await page.locator("//input[@id='lastBatchTime']/following-sibling::div//select[@aria-label=\"Default dropdown selection\"]").selectOption({ label: "AM" });
    } else {
      await page.locator("//input[@id='lastBatchTime']/following-sibling::div//select[@aria-label=\"Default dropdown selection\"]").selectOption({ label: "PM" });
    }
    await page.locator("//button[@aria-label=\"Save Configuration\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//td[contains(text(),\" $|TomorrowDateList|\")]")).toBeVisible();
    await stepGroups.stepGroup_Creating_Early_Config_Record(page, vars);
    await page.locator("//input[@placeholder=\"Select Date\"]").click();
    await page.locator("//div[@aria-label=\"$|CurrentDateCalender|\"]").dblclick();
    await page.locator("//div[@aria-label=\"$|TomorrowsDateCalender|\"]").hover();
    await page.locator("//div[@aria-label=\"$|TomorrowsDateCalender|\"]").click();
    await page.locator("//button[text()[normalize-space() = \"Apply\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//input[@placeholder=\"Select Date\"]")).not.toHaveValue('');
    await expect(page.locator("//td[contains(text(),\" $|DayAfterTomorrowDateList|\")]")).toBeVisible();
    await expect(page.locator("//td[contains(text(),\" $|TomorrowDateList|\")]")).toBeVisible();
    await page.locator("//i[contains(@class, 'fa-times')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//input[@placeholder=\"Select Date\"]")).toHaveValue('');
    await expect(page.locator("//td[contains(text(),\" $|DayAfterTomorrowDateList|\")]")).toBeVisible();
    await expect(page.locator("//td[contains(text(),\" $|TomorrowDateList|\")]")).toBeVisible();
    // [DISABLED] Pick the current date hh:mm a by location UTC-05:00 and store into a variable CurrentEstTime
    // vars["CurrentEstTime"] = (() => {
    //   const d = new Date();
    //   const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC-05:00" };
    //   const fmt = "hh:mm a";
    //   // Map Java date format to Intl parts
    //   const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
    //   const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
    //   return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    // })();
    // [DISABLED] Add 180 minutes to the CurrentEstTime with hh:mm a , convert to hh:mm a format, and store it in a runtime variable CurrentEst2hrPrior
    // vars["CurrentEst2hrPrior"] = (() => {
    //   const d = new Date('2000-01-01 ' + String(vars["CurrentEstTime"]));
    //   d.setMinutes(d.getMinutes() + parseInt(String("180")));
    //   return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }); // Format: hh:mm a
    // })();
    // [DISABLED] Add 3 and 0 to date CurrentEstTime and format hh:mm a and store CurrentEst2hrPrior
    // vars[""] = (() => {
    //   const d = new Date(String(''));
    //   d.setMinutes(d.getMinutes() + parseInt(String('')));
    //   return d.toLocaleString('en-US');
    // })();
    // [DISABLED] Split string CurrentEst2hrPrior using space and store the 0 into a TimeHourMin
    // vars["TimeHourMin"] = String('').split("")["0"] || '';
    // [DISABLED] Split string CurrentEst2hrPrior using space and store the 1 into a TimeUnit
    // vars["TimeUnit"] = String('').split("")["1"] || '';
    // [DISABLED] Click on Edit Button(Early Close Config)
    // await page.locator("(//td[contains(text(),\"$|TimeHourMin|\")]/..//button)[1]").click();
    // [DISABLED] Clear the text displayed in the Last Batch Time Input Box field
    // await page.locator("//input[@id='lastBatchTime']").clear();
    // [DISABLED] Enter TimeHourMin in the Last Batch Time Input Box field
    // await page.locator("//input[@id='lastBatchTime']").fill(vars["TimeHourMin"]);
    if (true) /* Verify if TimeUnit contains AM */ {
      // [DISABLED] Select option using value AM in the Last Batch Time Unit Dropdown list
      // await page.locator("//input[@id='lastBatchTime']/following-sibling::div//select[@aria-label=\"Default dropdown selection\"]").selectOption({ label: "AM" });
    } else {
      // [DISABLED] Select option using value PM in the Last Batch Time Unit Dropdown list
      // await page.locator("//input[@id='lastBatchTime']/following-sibling::div//select[@aria-label=\"Default dropdown selection\"]").selectOption({ label: "PM" });
    }
    // [DISABLED] Click on UpdateConfig Button
    // await page.locator("//button[@aria-label=\"Update Configuration\"]").click();
    // [DISABLED] Wait until the element Spinner is not visible
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Store TimeHourMin in EditedTime
    // vars["EditedTime"] = vars["TimeHourMin"];
    // [DISABLED] Verify that the element Added Last Batch displays text contains EditedTime and With Scrollable FALSE
    // await expect(page.locator("//td[@data-title=\"Last Batch\" and contains(text(),\"$|TimeHourMin|\")]")).toContainText(vars["EditedTime"]);
    // [DISABLED] Verify that the current page displays text EditedTime
    // await expect(page.getByText(vars["EditedTime"])).toBeVisible();
    // [DISABLED] Mouseover the element Delete Button (early config)
    // await page.locator("(//td[contains(text(),\"$|TimeHourMin|\")]/..//button)[2]").hover();
    // [DISABLED] Verify that the current page displays text Delete
    // await expect(page.getByText("Delete")).toBeVisible();
    // [DISABLED] Click on Delete Button (early config)
    // await page.locator("(//td[contains(text(),\"$|TimeHourMin|\")]/..//button)[2]").click();
    // [DISABLED] Click on Yes, Delete Button(Early config)
    // await page.locator("//button[@aria-label=\"Yes, Delete\"]").click();
    // [DISABLED] Wait until the element Delete Button (early config) is not visible
    // await page.locator("(//td[contains(text(),\"$|TimeHourMin|\")]/..//button)[2]").waitFor({ state: 'hidden' });
    // [DISABLED] Pick the current date MM/d/yyyy : h:mm a by location UTC and store into a variable ExpectedModifiedTime
    // vars["ExpectedModifiedTime"] = (() => {
    //   const d = new Date();
    //   const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC" };
    //   const fmt = "MM/d/yyyy : h:mm a";
    //   // Map Java date format to Intl parts
    //   const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
    //   const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
    //   return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    // })();
    while (await page.locator("//td[@data-title=\"Date\" and not(contains(text(),\"$|CurrentDateList|\"))]/..//button[@aria-label=\"Delete\"]").isVisible()) {
      await page.locator("//td[@data-title=\"Date\" and not(contains(text(),\"$|CurrentDateList|\"))]/..//button[@aria-label=\"Delete\"]").hover();
      await expect(page.getByText("Delete")).toBeVisible();
      await page.locator("//td[@data-title=\"Date\" and not(contains(text(),\"$|CurrentDateList|\"))]/..//button[@aria-label=\"Delete\"]").click();
      await page.locator("//button[@aria-label=\"Yes, Delete\"]").click();
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      // [DISABLED] Wait until the element Early Conf Del Button other than today is not visible
      // await page.locator("//td[@data-title=\"Date\" and not(contains(text(),\"$|CurrentDateList|\"))]/..//button[@aria-label=\"Delete\"]").waitFor({ state: 'hidden' });
    }
    await expect(page.locator("//td[@data-title=\"Date\" and not(contains(text(),\"$|CurrentDateList|\"))]/..//button[@aria-label=\"Delete\"]")).toBeVisible();
    // [DISABLED] Delete early config
    // await stepGroups.stepGroup_Delete_early_config(page, vars);
  });
});
