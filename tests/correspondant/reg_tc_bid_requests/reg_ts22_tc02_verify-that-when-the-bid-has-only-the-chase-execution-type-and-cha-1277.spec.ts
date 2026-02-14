import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS22_TC02_Verify that when the bid has only the Chase execution type and Chase is disabled in the configuration for the company, the system prevents submission.', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Deleting_Early_Config_Report_If_Present(page, vars);
    await stepGroups.stepGroup_Navigating_to_Customer_Permissions_and_disabling_the_chase_e(page, vars);
    vars["ExecutionType"] = "Chase Direct";
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String("3"))) {
      if (String(vars["count"]) === String("1")) {
        vars["StatusToBeSelected"] = "Price Offered";
      } else if (String(vars["count"]) === String("2")) {
        vars["StatusToBeSelected"] = "Upload Expired";
      } else {
        vars["StatusToBeSelected"] = "Expired";
      }
      await page.locator("//a[@href=\"#/bid-requests\"]").click();
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      if (true) /* Element Clear all Button1 is visible */ {
        await page.locator("//span[@role=\"button\"]").click();
        await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      }
      await page.locator("//span[text()[normalize-space() = \"Filter\"]]").click();
      await page.locator("//div[text()[normalize-space() = \"Select Company/CCode\"]]").click();
      await page.locator("//input[@type=\"checkbox\" and contains(@aria-label,\"@|Company Name|\")]").check();
      await page.locator("//button[contains(normalize-space(),\"Apply Selected 1\")]").click();
      await page.locator("//div[text()[normalize-space() = \"Select Bid Request Status\"]]").click();
      await page.locator("//input[@type=\"checkbox\" and @aria-label=\"Select $|StatusToBeSelected|\"]").check();
      await expect(page.locator("//button[contains(normalize-space(),\"Apply Selected 1\")]")).toBeVisible();
      await page.locator("(//button[contains(normalize-space(),\"Apply Selected 1\")])[2]").click();
      await page.locator("//div[contains(@class, \"justify-content-end\")]//button[text()=\"Apply Filters\"]").click();
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      await stepGroups.stepGroup_Traversing_to_the_next_screens_until_the_bid_is_visible(page, vars);
      await expect(page.locator("(//td[@data-title=\"Status\"])[1]")).toContainText(vars["StatusToBeSelected"]);
      await page.locator("//td[@data-title=\"Execution Type\"]//div[text()=\" Chase Direct \"]/../..//td[@data-title=\"Status\"]//span[contains(text(),\"$|StatusToBeSelected|\")]/../../..//td[@data-title=\"Bid Req. ID\"]").click();
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      await page.locator("//button[contains(@class, 'btn-primary')]").click();
      await expect(page.locator("//label[text()[normalize-space() = \"Today\"]]/preceding-sibling::input[@type=\"radio\"]")).toBeVisible();
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
        await stepGroups.stepGroup_Filtering_Status_and_Navigating_to_Filtered_Status_Bid_Reque(page, vars);
        await page.locator("//button[contains(@class, 'btn-primary')]").click();
        await expect(page.locator("//label[text()[normalize-space() = \"Today\"]]/preceding-sibling::input[@type=\"radio\"]")).toBeVisible();
        await page.locator("//select[@aria-label=\"Dropdown selection\"]").click();
        await page.locator("//option[@aria-disabled=\"false\"]").click();
      }
      await page.locator("//button[contains(@class, 'btn-primary') and contains(@class, 'fw-bold')]").click();
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      await page.getByText(testData["Resubmit Pricing Error Chase Direct"]).waitFor({ state: 'visible' });
      await page.getByText(testData["Resubmit Pricing Error Chase Direct"]).waitFor({ state: 'hidden' });
      await page.locator("//button[contains(@class, 'btn-primary')]").click();
      await page.locator("//label[text()[normalize-space() = \"Next Business Day\"]]/preceding-sibling::input[@type=\"radio\"]").check();
      await expect(page.locator("//label[text()[normalize-space() = \"Next Business Day\"]]/preceding-sibling::input[@type=\"radio\"]")).toBeVisible();
      await page.locator("//select[@aria-label=\"Dropdown selection\"]").click();
      await page.locator("//option[@aria-disabled=\"false\"]").click();
      await page.locator("//button[contains(@class, 'btn-primary') and contains(@class, 'fw-bold')]").click();
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      await page.getByText(testData["Resubmit Pricing Error Chase Direct"]).waitFor({ state: 'visible' });
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    await stepGroups.stepGroup_Navigating_To_Customer_Permissions_and_enabling_the_chase_ty(page, vars);
  });
});
