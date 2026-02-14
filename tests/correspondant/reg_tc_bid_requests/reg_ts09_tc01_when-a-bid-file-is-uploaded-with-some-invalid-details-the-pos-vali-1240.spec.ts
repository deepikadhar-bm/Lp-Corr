import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';
import * as excelHelper from '../../../src/helpers/excel-helpers';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS09_TC01_When a bid file is uploaded with some invalid details ,the POS Validation check status should display a warning, and the loan on the details screen should be marked with an error status', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

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
      await stepGroups.stepGroup_Modifying_batches_with_5_min_prior(page, vars);
      await stepGroups.stepGroup_Navigating_to_Upload_New_Bid_Request(page, vars);
      await stepGroups.stepGroup_Uploading_Bid_Request(page, vars);
      await stepGroups.stepGroup_Selecting_Second_Enabled_Batch_Time_If_the_Condition_is_fail(page, vars);
      // [DISABLED] Scroll to the element Enabled Date into view
      // await page.locator("//option[@aria-disabled=\"false\"]").scrollIntoViewIfNeeded();
      // [DISABLED] Click on Enabled Date
      // await page.locator("//option[@aria-disabled=\"false\"]").click();
    }
    await page.locator("(//input[@type=\"file\"])[1]").setInputFiles(path.resolve(__dirname, 'test-data', "POS_Check.xlsx,POS_Check.xlsx"));
    vars["LoanNumberFromExcel"] = excelHelper.readCell(path.resolve(__dirname, 'test-data', "POS_Check.xlsx,POS_Check.xlsx"), "2", "1");
    await expect(page.locator("//span[text()[normalize-space() = \"Upload Bid\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Upload Bid\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.getByText("Bid Upload Progress").waitFor({ state: 'visible' });
    await page.locator("//span[text()=\"Continue\"]/..").waitFor({ state: 'visible' });
    await expect(page.locator("(//td[@data-title=\"Status\"]//span)[position() >=1 and position() <=5]")).toContainText("Success");
    await expect(page.locator("//div[text()=\" POS Validation \"]/../..//span")).toContainText("Warning");
    vars["RowsCountBelowLoanField"] = String(await page.locator("(//td[@data-title=\"Status\"])[position() >=7 and position()<=last()]").count());
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["RowsCountBelowLoanField"]))) {
      vars["StatusBelowLoanField"] = await page.locator("((//td[@data-title=\"Status\"])[position() >=7 and position()<=last()])[$|count|]").textContent() || '';
      expect(String("Success , Warning")).toBe(vars["StatusBelowLoanField"]);
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    await page.locator("//span[text()=\"Continue\"]/..").click();
    vars["ErrorColumnData"] = await page.locator("(//td[@data-title=\"Errors\"]//div)[last()]").textContent() || '';
    if (String(testData["Pos Check(Errors Column)"]).includes(String(vars["ErrorColumnData"]))) {
      await expect(page.locator("(//td[@data-title=\"Errors\"]//div)[last()]")).toContainText(testData["Pos Check(Errors Column)"]);
    } else {
      await page.locator("(//td[@data-title=\"Errors\"]//div)[last()]").hover();
      await expect(page.locator("//div[text()=\"Eligibility\"]/..//div[@class=\"text-secondary\"]")).toBeVisible();
      await expect(page.locator("//div[text()=\"Eligibility\"]/..//div[@class=\"text-secondary\"]")).toContainText(testData["Pos Check(Errors Column)"]);
    }
    await expect(page.locator("(//td[@data-title=\"Error Description\"]//div)[last()]")).toContainText(testData["Pos Check(Error Description)"]);
    await expect(page.locator("(//td[@data-title=\"Loan Status\"]//div)[last()]")).toContainText(testData["Pos Check(Loan Status)"]);
    await expect(page.locator("(//td[@data-title=\"Corr. Loan#\"]//button[1])[last()]")).toContainText(vars["LoanNumberFromExcel"]);
    await expect(page.locator("//button[text()=\"PQ\"]")).toBeVisible();
    await expect(page.locator("//button[text()=\"PS\"]")).toBeVisible();
  });
});
