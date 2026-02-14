import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Commitment List - TS_1', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS11_TC01_Verify the Export action ', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    vars["FirstCommitmentId"] = await page.locator("//td[@data-title=\"Comm. ID\"]//a[contains(@aria-label,\"View details for commitment\")]").textContent() || '';
    vars["FirstCommitmentId"] = String(vars["FirstCommitmentId"]).trim();
    await page.locator("//input[@id='searchTagInput']").click();
    await page.locator("//input[@id='searchTagInput']").fill(vars["FirstCommitmentId"]);
    await page.locator("//span[normalize-space(text())=\"Commitment ID\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["RowCount"] = String(await page.locator("//tbody//tr[@role=\"row\"]").count());
    vars["RowCountUI"] = "1";
    vars["RowCountExcel"] = "1";
    await page.locator("//input[contains(@aria-label,\"Select all for\") and @type=\"checkbox\"]").click();
    await page.locator("//span[text()[normalize-space() = \"Export Selected\"]]").waitFor({ state: 'visible' });
    await page.locator("//span[text()[normalize-space() = \"Export Selected\"]]").click();
    // Wait for download - handled by Playwright download events
    await page.waitForTimeout(2000);
    await stepGroups.stepGroup_Headers_Verification(page, vars);
    // [DISABLED] Verification of Data from Excel to UI - Excluding Headers(Commitments)
    // await stepGroups.stepGroup_Verification_of_Data_from_Excel_to_UI_Excluding_HeadersCommi(page, vars);
    // [DISABLED] Verification of Data from Excel to UI - Excluding Headers (Commitments) - 2
    // await stepGroups.stepGroup_Verification_of_Data_from_Excel_to_UI_Excluding_Headers_Comm(page, vars);
    await stepGroups.stepGroup_Verification_of_Data_from_Excel_to_UI_Excluding_Headers_Comm(page, vars);
  });
});
