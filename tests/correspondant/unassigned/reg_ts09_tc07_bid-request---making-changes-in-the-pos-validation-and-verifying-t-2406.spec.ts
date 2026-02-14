import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS09_TC07_Bid Request - Making Changes in the POS Validation, and Verifying the details, by Uploading the Bid in the Bid request.  ', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[@href=\"#/admin/general-settings/bid-request\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["PosConventionalTextBeforeEdit"] = await page.locator("(//app-single-select-dropdown   [.//text()[normalize-space()='Conventional']]   /following-sibling::input[@type='text'])[3]").inputValue() || '';
    vars["PosConventionalTextBeforeEdit"] = String(vars["PosConventionalTextBeforeEdit"]).trim();
    vars["UpdatedText"] = "Delegated Conventional Mandatory Testing";
    await page.locator("(//app-single-select-dropdown   [.//text()[normalize-space()='Conventional']]   /following-sibling::input[@type='text'])[3]").fill(String(vars["UpdatedText"]));
    await page.locator("//button[normalize-space(text())=\"Save changes\" or contains(text(),\"Save Changes\")]").waitFor({ state: 'visible' });
    await page.locator("//button[text()=\"Save Changes\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Navigating_to_Bulk_Batch_Timing(page, vars);
    await stepGroups.stepGroup_Modifying_The_batch_Intervals_with_current_est_time(page, vars);
    await stepGroups.stepGroup_Navigating_to_Upload_New_Bid_Request(page, vars);
    await stepGroups.stepGroup_Uploading_Bid_Request(page, vars);
    await stepGroups.stepGroup_Upload_Bid_Process_from_Batch_time_Selection_to_Bid_Upload_P(page, vars);
    vars["RowsCount"] = String(await page.locator("(//table)[1]//tbody//tr").count());
    await page.locator("//td[@data-title=\"Errors\"]").hover();
    vars["ConventionalErrorCount"] = String(await page.locator("//td[@data-title=\"Error Description\"]//div[contains(text(),\"not approved for [conventional]\") or contains(text(),\"Not approved for [conventional]\")]").count());
    expect(String(vars["RowsCount"])).toBe(vars["ConventionalErrorCount"]);
    await stepGroups.stepGroup_Navigating_To_Bid_Request_Config(page, vars);
    await page.locator("(//app-single-select-dropdown   [.//text()[normalize-space()='Conventional']]   /following-sibling::input[@type='text'])[3]").fill(String(vars["PosConventionalTextBeforeEdit"]));
    await page.locator("//button[text()=\"Save Changes\"]").waitFor({ state: 'visible' });
    await page.locator("//button[text()=\"Save Changes\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("(//app-single-select-dropdown   [.//text()[normalize-space()='Conventional']]   /following-sibling::input[@type='text'])[3]")).toHaveValue(vars["PosConventionalTextBeforeEdit"]);
  });
});
