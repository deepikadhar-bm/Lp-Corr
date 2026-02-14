import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS12_TC01.1_Other Config - If the Commitment time is Mentioned in the UI, Users are allowed to commit a new loans within the Mentioned time limit in the UI.', async ({ page }) => {
    // Prerequisite: REG_TS01_TC01_Perform submit for pricing action, and then verify the status should be updated to pri
    // TODO: Ensure prerequisite test passes first

    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["BidReqId"] = vars["RequestIDDetails"];
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqId"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Commits_an_Fresh_Loan_Num(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[@href=\"#/admin/general-settings/other-config\"]").click();
    await page.locator("//label[contains(text(),\"Commit Correction Cut-off\")]//following::input[contains(@id,\"CorrectionCutOfHours\")]").waitFor({ state: 'visible' });
    vars["CommitCorrCutoffBefore"] = await page.locator("//label[contains(text(),\"Commit Correction Cut-off\")]//following::input[contains(@id,\"CorrectionCutOfHours\")]").inputValue() || '';
    // Write to test data profile: "CommitCorrCutoffBefore" = vars["CommitCorrCutoffBefore"]
    // TODO: Test data profile writes need custom implementation
    vars["CommitCorrCutoffBefore"] = (parseFloat(String(vars["CommitCorrCutoffBefore"])) * parseFloat(String("60"))).toFixed(0);
    vars["ReplacingCutoffTime"] = "1";
    await page.locator("//label[contains(text(),\"Commit Correction Cut-off\")]//following::input[contains(@id,\"CorrectionCutOfHours\")]").fill(String(vars["ReplacingCutoffTime"]));
    vars["ReplacingCutoffTime"] = (parseFloat(String(vars["ReplacingCutoffTime"])) * parseFloat(String("60"))).toFixed(0);
    await page.locator("//button[normalize-space(text())=\"Save changes\" or contains(text(),\"Save Changes\")]").click();
    await stepGroups.stepGroup_Verifying_the_Last_Modified_Data_In_the_Right_corner_screen(page, vars);
    await page.locator("//a[@href=\"#/admin/general-settings/audit-log\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Verifying_the_Audit_Time_and_Date(page, vars);
    await stepGroups.stepGroup_Verifying_the_Username_and_Config_Type_in_Audit_List_Screen(page, vars);
    await stepGroups.stepGroup_Verifying_the_side_by_side_data_in_see_difference_pop_upAudi(page, vars);
    vars["Space"] = "key_blank";
    vars["PreviousData"] = "\"internalUserCorrectionCutOfMinutes\":" + vars["Space"] + vars["CommitCorrCutoffBefore"] + ",";
    await expect(page.locator("(//div[@class=\"d2h-file-side-diff\"]//table)[1]")).toContainText(vars["PreviousData"]);
    await expect(page.locator("(//td[@class=\"d2h-del d2h-change\"]//span[@class=\"d2h-code-line-ctn\"])[1]//del")).toHaveCSS('border', "rgba(255, 182, 186, 1)");
    vars["NewChangedData"] = "\"internalUserCorrectionCutOfMinutes\":" + vars["Space"] + vars["ReplacingCutoffTime"] + ",";
    await expect(page.locator("(//div[@class=\"d2h-file-side-diff\"]//table)[2]")).toContainText(vars["NewChangedData"]);
    await expect(page.locator("(//td[@class=\"d2h-ins d2h-change\"]//span[@class=\"d2h-code-line-ctn\"])[1]//ins")).toHaveCSS('border', "rgba(151, 242, 149, 1)");
    await stepGroups.stepGroup_Verifying_the_Line_by_line_data_in_see_difference_pop_upAudi(page, vars);
    await expect(page.locator("(//td[@class=\"d2h-del d2h-change\"]//span[@class=\"d2h-code-line-ctn\"])[1]")).toContainText(vars["PreviousData"]);
    await expect(page.locator("(//td[@class=\"d2h-del d2h-change\"]//span[@class=\"d2h-code-line-ctn\"])[1]//del")).toHaveCSS('border', "rgba(255, 182, 186, 1)");
    await expect(page.locator("(//td[@class=\"d2h-ins d2h-change\"]//span[@class=\"d2h-code-line-ctn\"])[1]")).toContainText(vars["NewChangedData"]);
    await expect(page.locator("(//td[@class=\"d2h-ins d2h-change\"]//span[@class=\"d2h-code-line-ctn\"])[1]//ins")).toHaveCSS('border', "rgba(151, 242, 149, 1)");
    await page.locator("//i[contains(@class, 'fa-lg') and contains(@class, 'color-primary') and contains(@class, 'fa-times')]").click();
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").waitFor({ state: 'visible' });
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//input[@id='searchTagInput']").click();
    await page.locator("//input[@id='searchTagInput']").fill(vars["BidReqId"]);
    await page.locator("//span[normalize-space(text())=\"Bid Request ID\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())=\"$|BidReqId|\"]//ancestor::tr//td[@data-title=\"Comm. ID\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Add_to_Commit_an_Loan_Num_And_Verifying_The_Committed_Loan_N(page, vars);
    // Write to test data profile: "RequestIDFrom-REG_TS12_TC01.1" = vars["BidReqId"]
    // TODO: Test data profile writes need custom implementation
  });
});
