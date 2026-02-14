import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_General Settings', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS09_TC03_Bid Request - Add POS Validation, the Validation is for Checking the Bid Uploaded, and for the Verification)', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[@href=\"#/admin/general-settings/bid-request\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//button[text()[normalize-space() = \"Add POS Validation\"]]").click();
    await expect(page.locator("(//input[@formcontrolname=\"customFieldName\"])[5]")).toBeVisible();
    await page.locator("(//select[@aria-label=\"Dropdown selection\"])[5]").selectOption({ label: "Choice" });
    await expect(page.locator("(//select[@aria-label=\"Dropdown selection\"])[5]")).toHaveValue("Choice");
    await page.locator("(//input[@formcontrolname=\"customFieldName\"])[5]").fill("Text");
    await page.locator("//div[contains(@class, 'scrollable-page')]/div[1]/app-general-settings-container[1]/div[2]/div[1]/div[2]/app-bid-request-config-container[1]/app-bid-request-config[1]/div[1]/form[2]/div[1]/div[5]/button[1]/i[1]").click();
    await expect(page.locator("(//select[@aria-label=\"Dropdown selection\"])[5]")).toBeVisible();
    // [DISABLED] Select option using value Choice in the Conventional Dropdown(Bid Request Config) list
    // await page.locator("(//select[@aria-label=\"Dropdown selection\"])[3]").selectOption({ label: "Choice" });
    // [DISABLED] Verify that the Conventional Dropdown(Bid Request Config) list has option with value Choice selected and With Scrollable FALSE
    // await expect(page.locator("(//select[@aria-label=\"Dropdown selection\"])[3]")).toHaveValue("Choice");
    // [DISABLED] Wait until the element Save Changes Button is enabled
    // await page.locator("//button[normalize-space(text())=\"Save changes\" or contains(text(),\"Save Changes\")]").waitFor({ state: 'visible' });
    // [DISABLED] Click on Save Changes Button
    // await page.locator("//button[text()=\"Save Changes\"]").click();
    // [DISABLED] Wait until the element Spinner is not visible
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Navigating to Bulk Batch Timing
    // await stepGroups.stepGroup_Navigating_to_Bulk_Batch_Timing(page, vars);
    // [DISABLED] Modifying The batch Intervals with current est time
    // await stepGroups.stepGroup_Modifying_The_batch_Intervals_with_current_est_time(page, vars);
    // [DISABLED] Navigating to Upload New Bid Request
    // await stepGroups.stepGroup_Navigating_to_Upload_New_Bid_Request(page, vars);
    // [DISABLED] Uploading Bid Request
    // await stepGroups.stepGroup_Uploading_Bid_Request(page, vars);
    // [DISABLED] Upload Bid Request from batch time selection to continue button
    // await stepGroups.stepGroup_Upload_Bid_Request_from_batch_time_selection_to_continue_but(page, vars);
    // [DISABLED] Store the count of elements identified by locator Rows Count Table 1 into a variable RowsCount
    // vars["RowsCount"] = String(await page.locator("(//table)[1]//tbody//tr").count());
    // [DISABLED] Mouseover the element First error data
    // await page.locator("//td[@data-title=\"Errors\"]").hover();
    // [DISABLED] Store the count of elements identified by locator Not Approved for Conventional Error Data into a variable ConventionalErrorCount
    // vars["ConventionalErrorCount"] = String(await page.locator("//td[@data-title=\"Error Description\"]//div[contains(text(),\"not approved for [conventional]\") or contains(text(),\"Not approved for [conventional]\")]").count());
    // [DISABLED] Verify if RowsCount == ConventionalErrorCount
    // expect(String(vars["RowsCount"])).toBe(vars["ConventionalErrorCount"]);
    // [DISABLED] Navigating To Bid Request Config
    // await stepGroups.stepGroup_Navigating_To_Bid_Request_Config(page, vars);
    // [DISABLED] Select option using value Conventional in the Conventional Dropdown(Bid Request Config) list
    // await page.locator("(//select[@aria-label=\"Dropdown selection\"])[3]").selectOption({ label: "Conventional" });
    // [DISABLED] Wait until the element Save Changes Button is enabled
    // await page.locator("//button[text()=\"Save Changes\"]").waitFor({ state: 'visible' });
    // [DISABLED] Click on Save Changes Button
    // await page.locator("//button[text()=\"Save Changes\"]").click();
    // [DISABLED] Wait until the element Spinner is not visible
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Verify that the Conventional Dropdown(Bid Request Config) list has option with value Conventional selected and With Scrollable FALSE
    // await expect(page.locator("(//select[@aria-label=\"Dropdown selection\"])[3]")).toHaveValue("Conventional");
  });
});
