import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS26_TC01_Verify that if there are multiple versions in a bid, then user should be able to restore the required active map version.', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Smart_Mapper_from_Off_to_On(page, vars);
    vars["Companyname"] = testData["Company name 1"];
    await stepGroups.stepGroup_Creating_of_Add_New_Header(page, vars);
    await stepGroups.stepGroup_Storing_Values_from_map_header_screen(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Map Headers\"]]").click();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Fetching_Bid_Sample_Names_and_Corresponding_Chase_Values_and(page, vars);
    await page.locator("//span[text()='Enumeration Mapping']").click();
    if (true) /* Element Proceed with Saving Button is visible */ {
      await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    } else {
      await page.locator("//span[text()[normalize-space() = \"Yes, Proceed\"]]").click();
    }
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["EnumFieldsCount"] = String(await page.locator("//div[contains(@class,\"mapping-card rounded-3\")]//div[@class=\"col-2\"][1]").count());
    await stepGroups.stepGroup_Storing_BidSample_and_BidTape_Values_from_Enum_Page_with_Map(page, vars);
    await stepGroups.stepGroup_Storing_Chase_Field_and_Chase_Value_from_Enum_Page_With_Mapp(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Add_Rule_For_Add_Condition_In_Rules_and_Actions(page, vars);
    await stepGroups.stepGroup_Add_Actions_in_Rules_and_Actions(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Save and Publish\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("(//td[@data-title=\"Version\"])[1]").waitFor({ state: 'visible' });
    vars["Version"] = await page.locator("(//td[@data-title=\"Version\"])[1]").textContent() || '';
    await expect(page.getByText(vars["Version"])).toBeVisible();
    await page.locator("//button[contains(.,'$|Create New Map|')]").click();
    await expect(page.getByText(vars["Create New Map"])).toBeVisible();
    await page.locator("//label[text()=\"Execution Type\"]/..//select").selectOption({ index: parseInt("2") });
    vars["ExecutionVersion2"] = await page.locator("//label[text()=\"Execution Type\"]/..//select").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
    await page.locator("//span[text()[normalize-space() = \"Map Headers\"]]").click();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Creating_New_Header_In_Header_Mapping_Screen(page, vars);
    await stepGroups.stepGroup_Editing_Header_Mapping(page, vars);
    vars["EditedChaseFieldNameVersion2"] = vars["UpdatedChaseFieldNameHeaderMapping"];
    vars["DeletedHeader[HeaderMapping]"] = await page.locator("(//div[contains(@class,\"gap-2 header-grid-layout\")]//div[@class=\"flex-grow-1\"])[5]").textContent() || '';
    await stepGroups.stepGroup_Delete_a_Header_In_Header_Mapping(page, vars);
    await expect(page.locator("//div[@class=\"gap-2 header-grid-layout\"]//div[text()=\"$|DeletedHeader[HeaderMapping]|\"]")).toBeVisible();
    await page.locator("(//fieldset//input[@type=\"checkbox\"])[1]").check();
    vars["FirstHeaderName"] = await page.locator("(//div[contains(@class,\"gap-2 header-grid-layout\")]//div[@class=\"flex-grow-1\"])[1]").textContent() || '';
    await page.locator("(//fieldset//input[@type=\"checkbox\"])[2]").check();
    vars["SecondHeaderName"] = await page.locator("(//div[contains(@class,\"gap-2 header-grid-layout\")]//div[@class=\"flex-grow-1\"])[2]").textContent() || '';
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await expect(page.locator("//*[contains(text(),\"You have unidentified fields.\")]/../..//*[text()=\" This action will save the changes and Move to Next Page. \"]")).toBeVisible();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Adding_Field_In_Enumeration_Mapping(page, vars);
    await stepGroups.stepGroup_Editing_In_Enumeration_Mapping_Screen(page, vars);
    vars["ChaseFieldNameTobeEdited"] = await page.locator("(//div[@class=\"my-2\"])[3]").textContent() || '';
    vars["SelectedChaseValueText"] = await page.locator("(//div[text()=\"$|ChaseFieldNameTobeEdited|\"]/..//following-sibling::div//div//select)[1]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
    await page.locator("(//div[text()=\"$|ChaseFieldNameTobeEdited|\"]/..//following-sibling::div//div//select)[1]").selectOption({ index: parseInt("1") });
    vars["EditedChaseValueVersion2"] = await page.locator("(//div[text()=\"$|ChaseFieldNameTobeEdited|\"]/..//following-sibling::div//div//select)[1]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
    await stepGroups.stepGroup_Delete_In_Enumeration_Mapping(page, vars);
    await page.locator("(//input[@type=\"checkbox\" and @class=\"mapping-select mt-1\"])[1]").check();
    vars["FirstBidSampleName"] = await page.locator("((//fieldset//input[@type=\"checkbox\"])[1]/../..//div[@class=\"col-2\"]//div)[1]").textContent() || '';
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    await expect(page.locator("//*[contains(text(),\"You have unidentified fields.\")]/../..//*[text()=\" This action will save the changes and Move to Next Page. \"]")).toBeVisible();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await stepGroups.stepGroup_Editing_of_Add_Conditions_and_Add_Actions(page, vars);
    await page.locator("(//span[text()[normalize-space() = \"Duplicate/Copy\"]])[1]").click();
    await page.locator("(//span[text()[normalize-space() = \"Duplicate/Copy\"]])[1]").click();
    await expect(page.locator("//div[@class=\"block\"]")).toHaveCount(parseInt("3"));
    await page.locator("(//input[@placeholder=\"Enter a Rule Name\"])[2]").clear();
    await page.locator("(//input[@placeholder=\"Enter a Rule Name\"])[2]").fill("Rule 2");
    vars["SecondRuleName"] = await page.locator("(//input[@placeholder=\"Enter a Rule Name\"])[2]").inputValue() || '';
    await page.locator("(//input[@placeholder=\"Enter a Rule Name\"])[3]").clear();
    await page.locator("(//input[@placeholder=\"Enter a Rule Name\"])[3]").fill("Rule 3");
    vars["ThirdRuleName"] = await page.locator("(//input[@placeholder=\"Enter a Rule Name\"])[3]").inputValue() || '';
    vars["LastRuleName"] = vars["ThirdRuleName"];
    await page.locator("(//*[text()[normalize-space() = \"Delete Rule\"]]/..)[1]").scrollIntoViewIfNeeded();
    await stepGroups.stepGroup_Deleting_In_Rules_and_Actions(page, vars);
    await expect(page.getByText(testData["Rule Name"])).not.toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Save and Publish\"]]").click();
  });
});
