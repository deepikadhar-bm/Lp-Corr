import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS26_TC02_Verify that if there are multiple versions in a bid, then user should be able to restore the required active map version.', async ({ page }) => {
    // Prerequisite: REG_TS26_TC01_Verify that if there are multiple versions in a bid, then user should be able to resto
    // TODO: Ensure prerequisite test passes first

    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    if (await page.locator("//span[text()[normalize-space() = \"Continue Editing\"]]").isVisible()) {
      await page.locator("//span[text()[normalize-space() = \"Continue Editing\"]]").click();
    }
    await page.locator("(//td[@data-title=\"Version\"])[1]").waitFor({ state: 'visible' });
    vars["Version"] = await page.locator("(//td[@data-title=\"Version\"])[1]").textContent() || '';
    await expect(page.getByText(vars["Version"])).toBeVisible();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText(vars["Create New Map"])).toBeVisible();
    await page.locator("(//button[@aria-label=\"Download Map\"])[1]").click();
    await expect(page.getByText(vars["Version"])).toBeVisible();
    await page.locator("//h5[@class=\"modal-title fw-semibold\"]").hover();
    vars["DownloadMapName"] = await page.locator("//h5[@class=\"modal-title fw-semibold\"]").textContent() || '';
    await expect(page.getByText(vars["DownloadMapName"])).toBeVisible();
    vars["ActiveVersion"] = await page.locator("(//td[@data-title=\"Version Number\"])[1]").textContent() || '';
    await expect(page.getByText(vars["ActiveVersion"])).toBeVisible();
    vars["CreatedOn"] = await page.locator("(//td[@data-title=\"Created On\"])[21]").textContent() || '';
    await expect(page.locator("//td[@data-title=\"Version Number\"][contains(.,'1')]/following-sibling::td[@data-title=\"Action\"]//a")).toBeVisible();
    await expect(page.getByText(vars["CreatedOn"])).toBeVisible();
    await page.locator("//td[@data-title=\"Version Number\"][contains(.,'1')]/following-sibling::td[@data-title=\"Action\"]//a").click();
    vars["VersionNumber"] = await page.locator("(//td[@data-title=\"Version Number\"])[1]").textContent() || '';
    await expect(page.getByText(vars["VersionNumber"])).toBeVisible();
    await page.locator("//button[@class=\"btn bg-transparent border-0 m-0\"]").click();
    await expect(page.getByText(vars["Version"])).toBeVisible();
    await page.locator("//button[contains(.,'$|Create New Map|')]").click();
    await expect(page.locator("//label[text()=\"Select Company/s\"]/..//div[@class=\"pill rounded-pill relative\"]//span")).toContainText(vars["SelectedCompanyName"]);
    await expect(page.getByText(vars["Create New Map"])).toBeVisible();
    await expect(page.locator("//span[@aria-live=\"polite\"]")).toContainText(vars["UploadedFileName"]);
    await expect(page.locator("//label[text()=\"Execution Type\"]/..//select")).toHaveValue(vars["ExecutionType"]);
    await expect(page.locator("//label[text()=\"Execution Type\"]/..//select")).not.toContainText(vars["ExecutionVersion2"]);
    await page.locator("//span[text()[normalize-space() = \"Map Headers\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//div[@class=\"gap-2 header-grid-layout custom-header\"]//div[@class=\"flex-grow-1\"]")).toBeVisible();
    vars["EditedChaseFieldNameVersion3"] = await page.locator("//div[text()=\"$|UpdatedBidSampleNameHeaderMapping|\"]/ancestor::div[@class=\"gap-2 header-grid-layout\"]//select").getAttribute('title') || '';
    expect(String(vars["EditedChaseFieldNameVersion3"])).toBe(vars["EditedChaseFieldNameVersion2"]);
    await expect(page.locator("//div[@class=\"gap-2 header-grid-layout\"]//div[text()=\"$|DeletedHeader[HeaderMapping]|\"]")).toBeVisible();
    await expect(page.locator("(//div[contains(@class,\"gap-2 header-grid-layout\")]//div[@class=\"flex-grow-1\" and text()=\"$|SecondHeaderName|\"])[1]/..//input")).toBeVisible();
    await stepGroups.stepGroup_Verification_Of_BidSampleNames_In_Header_Mapping_From_TDP(page, vars);
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await expect(page.locator("//*[contains(text(),\"You have unidentified fields.\")]/../..//*[text()=\" This action will save the changes and Move to Next Page. \"]")).toBeVisible();
    await page.locator("(//button[@type=\"button\"])[last()]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["Bid Tape Value for After Deleted\\r"] = await page.locator("(//div[@class=\"input-field-name text-truncate cursor-pointer\"]/../..//div)[1]").inputValue() || '';
    expect(String(vars["BidTapeValueforBeforeDeleted"])).toBe(vars["Bid Tape Value for After Deleted"]);
    vars["ChaseValueRestored"] = await page.locator("(//div[text()=\"$|ChaseFieldNameTobeEdited|\"]/..//following-sibling::div//div//select)[1]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
    vars["ChaseValueRestored"] = String(vars["ChaseValueRestored"]).trim();
    vars["EditedChaseValueVersion2"] = String(vars["EditedChaseValueVersion2"]).trim();
    expect(String(vars["ChaseValueRestored"])).toBe(vars["EditedChaseValueVersion2"]);
    await expect(page.locator("(//div[@class=\"field-block mb-2\"])//div[text()=\" $|BidTapeValueforBeforeDeleted| \"]")).toBeVisible();
    await stepGroups.stepGroup_Verifying_the_bidsample_to_bidtape_mapping_in_Enumpage_from_(page, vars);
    await stepGroups.stepGroup_Verifying_the_Mapping_of_ChaseField_and_ChaseValues_in_Enum_(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    await expect(page.getByText(testData["Unidentified Fields Error Message"])).toBeVisible();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("(//div[@class=\"rules-conditions\"]//button//div[contains(@class,\"flex-grow-1\")])[1]")).not.toContainText(vars["EditedBidField[RulesAndActions]"]);
    await expect(page.locator("(//div[@class=\"rules-conditions\"]//button//div[contains(@class,\"flex-grow-1\")])[2]")).not.toContainText(vars["EditedBidTape[RulesAndActions]"]);
    await expect(page.locator("//input[@placeholder=\"Enter a Rule Name\"]")).toHaveValue(vars["First Rule Name"]);
    await expect(page.getByText(vars["SecondRuleName"])).not.toBeVisible();
    await expect(page.getByText(vars["ThirdRuleName"])).not.toBeVisible();
    await stepGroups.stepGroup_Verification_of_Rules_and_Action_Values_Before_EditingActive(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Save and Publish\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
  });
});
