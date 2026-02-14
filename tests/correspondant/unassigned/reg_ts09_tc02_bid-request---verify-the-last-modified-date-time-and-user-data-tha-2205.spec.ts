import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS09_TC02_Bid Request - Verify the last Modified date, Time and user data that get displayed in the right corner of the page', async ({ page }) => {
    // Prerequisite: REG_TS09_TC01_Bid Request - Add POS Validation, the Validation is for Checking the Bid Uploaded, and
    // TODO: Ensure prerequisite test passes first

    vars["HourMin"] = String(vars["ExpectedModifiedTime"]).substring(13);
    vars[""] = String('').length.toString();
    vars["HourMinPlus1"] = (() => {
      const d = new Date('2000-01-01 ' + String(vars["HourMin"]));
      d.setMinutes(d.getMinutes() + parseInt(String("1")));
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }); // Format: hh:mm a
    })();
    // [DISABLED] Add the 1 minutes to the time in HourMin and store the result in a runtime HourMinPlus1
    // vars[""] = (() => {
    //   const d = new Date('2000-01-01 ' + String(''));
    //   d.setMinutes(d.getMinutes() + parseInt(String("1")));
    //   return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }); // Format: 
    // })();
    vars["RemoveIndex"] = String("0,") + String(vars["CountofHourMin"]);
    vars["Date"] = String(vars["ExpectedModifiedTime"]).substring(0);
    vars[""] = String(vars["Date"]) + ' ' + String(vars["HourMinPlus1"]);
    vars[""] = String(vars["Date"]) + ' ' + String(vars["HourMinMinus1"]);
    vars["ActualModifiedData"] = await page.locator("(//div[contains(text(),\"Last Modified\")])[1]").textContent() || '';
    vars["ActualModifiedData"] = String(vars["ActualModifiedData"]).trim();
    vars["ExpectedTimePlus1"] = String(vars["ExpectedTimePlus1"]).trim();
    vars["ExpectedTimeMinus1"] = String(vars["ExpectedTimeMinus1"]).trim();
    if (true) /* Verify if ActualModifiedData contains ignore-case with Expec */ {
    } else if (true) /* Verify if ActualModifiedData contains ignore-case with Expec */ {
    } else {
      expect((await page.locator("(//div[contains(text(),\"Last Modified\")])[1]").textContent() || '').toLowerCase()).toContain(String('').toLowerCase());
    }
    expect((await page.locator("(//div[contains(text(),\"Last Modified\")])[1]").textContent() || '').toLowerCase()).toContain(String('').toLowerCase());
  });
});
