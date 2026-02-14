import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS23_TC02_Verify that user should be able to clone the required bid map and a new bid map should be created with the status draft.[Verification]', async ({ page }) => {
    // Prerequisite: REG_TS23_TC01_Verify that user should be able to clone the required bid map and a new bid map should
    // TODO: Ensure prerequisite test passes first

    await page.locator("//button[contains(text(),\"$|BidMapName|\")]/../..//button[@aria-label=\"Clone Map\"]").waitFor({ state: 'visible' });
    await page.locator("//button[contains(text(),\"$|BidMapName|\")]/../..//button[@aria-label=\"Clone Map\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("(//td[@data-title=\"Status\"])[1]")).toContainText("DRAFT");
    vars[""] = String("Copy of") + ' ' + String(vars["Create New Map"]);
    await page.locator("//td[@data-title=\"Map Name\"][contains(.,\"$|Create New Map|\")]").click();
    await expect(page.getByText(vars["Create New Map"])).toBeVisible();
    await expect(page.locator("//label[text()=\"New Map Name\"]/..//input")).toHaveValue(vars["Create New Map"]);
    await expect(page.locator("//label[text()=\"Select Company/s\"]/..//div[@class=\"pill rounded-pill relative\"]//span")).toContainText(vars["SelectedCompanyName"]);
    await expect(page.locator("//label[text()=\"Execution Type\"]/..//select")).toHaveValue(vars["ExecutionType"]);
    await expect(page.locator("//span[@aria-live=\"polite\"]")).toContainText(vars["UploadedFileName"]);
    await page.locator("//span[text()[normalize-space() = \"Map Headers\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Verification_Of_BidSampleNames_In_Header_Mapping_From_TDP(page, vars);
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.waitForLoadState('networkidle');
    await stepGroups.stepGroup_Verifying_the_bidsample_to_bidtape_mapping_in_Enumpage_from_(page, vars);
    await stepGroups.stepGroup_Verifying_the_Mapping_of_ChaseField_and_ChaseValues_in_Enum_(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Verification_of_Rules_and_Action_Values_Before_EditingActive(page, vars);
    await page.locator("(//button[@id=\"multiSelectDropDown\"])[1]").click();
    await expect(page.locator("//input[contains(@aria-label,\"$|CategoryName|\")]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Save and Publish\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
  });
});
