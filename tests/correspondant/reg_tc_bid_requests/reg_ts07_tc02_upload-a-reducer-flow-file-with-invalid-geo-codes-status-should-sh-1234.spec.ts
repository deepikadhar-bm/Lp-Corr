import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';
import * as excelHelper from '../../../src/helpers/excel-helpers';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS07_TC02_Upload a reducer flow file with invalid geo codes; status should show warning in the popup and success in bid request details.', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile
    //const path = require('C:\Users\Madhuri\Downloads\GEO_scenario_1.2_Reducer (3).xlsx');
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Deleting_Early_Config_Report_If_Present(page, vars);
    await stepGroups.stepGroup_Navigating_to_Upload_New_Bid_Request(page, vars);
    await stepGroups.stepGroup_Uploading_Bid_Request(page, vars);
    if (true) /* Element Second Enabled Time is visible */ {
      await stepGroups.stepGroup_Selecting_Second_Enabled_Batch_Time_If_the_Condition_is_fail(page, vars);
      // [DISABLED] Scroll to the element Enabled Date into view
      // await page.locator("//option[@aria-disabled=\"false\"]").scrollIntoViewIfNeeded();
      // [DISABLED] Click on Enabled Date
      // await page.locator("//option[@aria-disabled=\"false\"]").click();
    } else {
      await stepGroups.stepGroup_Navigating_to_Bulk_Batch_Timing(page, vars);
      await stepGroups.stepGroup_Modifying_The_batch_Intervals_with_current_est_time(page, vars);
      await stepGroups.stepGroup_Navigating_to_Upload_New_Bid_Request(page, vars);
      await stepGroups.stepGroup_Uploading_Bid_Request(page, vars);
      await stepGroups.stepGroup_Selecting_Second_Enabled_Batch_Time_If_the_Condition_is_fail(page, vars);
      // [DISABLED] Scroll to the element Enabled Date into view
      // await page.locator("//option[@aria-disabled=\"false\"]").scrollIntoViewIfNeeded();
      // [DISABLED] Store text from the element Enabled Time into a variable EnabledTime
      // vars["EnabledTime"] = await page.locator("//option[@aria-disabled=\"false\"]").textContent() || '';
      // [DISABLED] Select option by text EnabledTime in the Pricing_Return_Time list
      // await page.locator("(//select[@aria-label=\"Dropdown selection\"])[3]").selectOption({ label: vars["EnabledTime"] });
      // [DISABLED] Click on Enabled Date
      // await page.locator("//option[@aria-disabled=\"false\"]").click();
    }
  await page
  .locator('(//input[@type="file"])[1]')
  .setInputFiles(
    path.resolve(__dirname, 'test-data', 'GEO_scenario_1.2_Reducer.xlsx')
  );

    //await page.locator("(//input[@type=\"file\"])[1]").setInputFiles(path.resolve(__dirname, 'test-data', "GEO_scenario_1.2_Reducer.xlsx,GEO_scenario_1.2_Reducer.xlsx"));
    vars["LoanNumberFromExcel"] = excelHelper.readCell(path.resolve(__dirname, 'test-data', "GEO_scenario_1.2_Reducer.xlsx,GEO_scenario_1.2_Reducer.xlsx"), "2", "1");
    await expect(page.locator("//span[text()[normalize-space() = \"Upload Bid\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Upload Bid\"]]").click();
    await page.locator("//div[@class=\"modal-header\"]/div/h5").waitFor({ state: 'visible' });
    await expect(page.locator("//div[@class=\"modal-header\"]/div/h5")).toContainText("Bid Upload Progress");
    await page.locator("//span[text()=\"Continue\"]/..").waitFor({ state: 'visible' });
    await expect(page.locator("//span[text()=\"Continue\"]/..")).toBeVisible();
    await expect(page.locator("(//td[@data-title=\"Status\"]//span)[position() >=1 and position() <=5]")).toContainText("Success");
    await expect(page.locator("//div[text()=\" Geo Coding \"]/../..//span")).toContainText("Warning");
    vars["RowsCountBelowLoanField"] = String(await page.locator("(//td[@data-title=\"Status\"])[position() >=7 and position()<=last()]").count());
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["RowsCountBelowLoanField"]))) {
      vars["StatusBelowLoanField"] = await page.locator("((//td[@data-title=\"Status\"])[position() >=7 and position()<=last()])[$|count|]").textContent() || '';
      expect(String("Success , Warning")).toBe(vars["StatusBelowLoanField"]);
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    await page.locator("//span[text()=\"Continue\"]/..").click();
    await expect(page.locator("(//td[@data-title=\"Errors\"]//div)[last()]")).toContainText(testData["Geo Coding Reducer flow(Errors Column)"]);
    await expect(page.locator("(//td[@data-title=\"Error Description\"]//div)[last()]")).toContainText(testData["Geo Coding Reducer flow(Error Description))"]);
    await expect(page.locator("(//td[@data-title=\"Loan Status\"]//div)[last()]")).toContainText(testData["Geo Coding Reducer flow(Loan Status)"]);
    await expect(page.locator("(//td[@data-title=\"Corr. Loan#\"]//button[1])[last()]")).toContainText(vars["LoanNumberFromExcel"]);
    await expect(page.locator("//button[text()=\"PQ\"]")).toBeVisible();
    await expect(page.locator("//button[text()=\"PS\"]")).toBeVisible();
  });
});
