import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS14_TC03_Verify that when the user performs the \\\"Save Draft and Exit\\\" action on each screen, a draft version is saved, and the user is redirected to the bid map list screen.[Rules and Actions]]', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Smart_Mapper_from_Off_to_On(page, vars);
    await stepGroups.stepGroup_Creation_Of_Bid_Map_Upto_Header_Mapping(page, vars);
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await page.locator("(//button[@type=\"button\"])[last()]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    await page.locator("//button[@aria-label=\"Yes, Proceed\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Adding_Rules_In_Rules_and_Actions_Screen(page, vars);
    await stepGroups.stepGroup_Add_Actions_in_Rules_and_Actions(page, vars);
    await stepGroups.stepGroup_Save_Draft_exit_and_Navigating_To_Rules_And_Actions(page, vars);
    await expect(page.locator("//input[@placeholder=\"Enter a Rule Name\"]")).toHaveValue(vars["Rule Name"]);
    await page.locator("//div[text()[normalize-space() = \"Selected (1)\"]]").click();
    await expect(page.locator("//input[contains(@aria-label,\"$|CategoryName|\")]")).toBeVisible();
    await page.locator("//button[contains(normalize-space(),\"Apply Selected 1\")]").click();
    await expect(page.locator("(//div[@class=\"rules-conditions\"]//button//div[contains(@class,\"flex-grow-1\")])[1]")).toContainText(vars["RuleBidField"]);
    await expect(page.locator("//select[contains(normalize-space(),\"Select = != > < >= <= contains\")]")).toHaveValue(vars["RuleCondition"]);
    await expect(page.locator("(//div[@class=\"rules-conditions\"]//button//div[contains(@class,\"flex-grow-1\")])[2]")).toContainText(vars["RuleBidTapeValue"]);
    await expect(page.locator("(//label[normalize-space(text())='Chase Field Name']//..//select[@class=\"form-select\"])[1]")).toHaveValue(vars["ActionChaseFieldName"]);
    await expect(page.locator("(//label[normalize-space(text())='Chase Value']//..//select[@class=\"form-select\"])[1]")).toHaveValue(vars["ActionChaseValue"]);
    await stepGroups.stepGroup_Editing_of_Add_Conditions_and_Add_Actions(page, vars);
    await page.locator("//input[@placeholder=\"Enter a Rule Name\"]").clear();
    await page.locator("//input[@placeholder=\"Enter a Rule Name\"]").fill(testData["New Rule Name"]);
    await expect(page.locator("//input[@placeholder=\"Enter a Rule Name\"]")).toHaveValue(testData["New Rule Name"]);
    await page.locator("//div[text()[normalize-space() = \"Select Category\"]]").click();
    vars["EditedCategory"] = await page.locator("(//div[@class=\"cursor-pointer py-3 text-wrap\"])[3]").textContent() || '';
    await page.locator("((//div[@class=\"cursor-pointer py-3 text-wrap\"])/..//input)[3]").check();
    await page.locator("//button[contains(normalize-space(),\"Apply Selected 1\")]").click();
    await page.locator("//select[contains(normalize-space(),\"Select = != > < >= <= contains\")]").selectOption({ label: testData["Operation2"] });
    await expect(page.locator("//select[contains(normalize-space(),\"Select = != > < >= <= contains\")]")).toHaveValue(testData["Operation2"]);
    await page.locator("(//div[@class=\"row rules-actions\"]//div[@class=\"col-4\"]//select)[1]").selectOption({ index: parseInt("17") });
    vars["EditedActionChaseFieldName"] = await page.locator("(//div[@class=\"row rules-actions\"]//div[@class=\"col-4\"]//select)[1]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
    await page.locator("//div[@class=\"row rules-actions\"]//label[text()=\"Chase Value\"]/..//select").selectOption({ index: parseInt("1") });
    vars["EditedActionChaseValue"] = await page.locator("//label[text()=\"Chase Value\"]/..//div[@class=\"d-flex\"]//select").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
    await page.locator("(//span[text()[normalize-space() = \"Duplicate/Copy\"]])[1]").click();
    await expect(page.locator("(//div[@class=\"block\"])[2]")).toBeVisible();
    await page.locator("(//input[@placeholder=\"Enter a Rule Name\"])[2]").clear();
    await page.locator("(//input[@placeholder=\"Enter a Rule Name\"])[2]").fill(testData["Duplicated Rule Name"]);
    await expect(page.locator("(//input[@placeholder=\"Enter a Rule Name\"])[2]")).toHaveValue(testData["Duplicated Rule Name"]);
    await page.waitForLoadState('networkidle');
    await page.locator("//span[text()[normalize-space() = \"Save Draft & Exit\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Map Name\"]//button[text()=\" $|Create New Map| \"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText(vars["Create New Map"])).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Map Headers\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await expect(page.locator("//h5[text()[normalize-space() = \"Save and Move to Next Page\"]]")).toBeVisible();
    await page.locator("(//button[@type=\"button\"])[last()]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    await expect(page.locator("//h5[text()[normalize-space() = \"Save and Move to Next Page\"]]")).toBeVisible();
    await page.locator("(//button[@type=\"button\"])[last()]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//div[@class=\"block\"]")).toBeVisible();
    vars["BlocksCount"] = String(await page.locator("//div[@class=\"block\"]").count());
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["BlocksCount"]))) {
      await page.locator("(//button[@id=\"multiSelectDropDown\"])[$|count|]").evaluate(el => (el as HTMLElement).click());
      if (String(vars["count"]) === String("1")) {
        vars["count1"] = "2";
        await expect(page.locator("(//input[contains(@aria-label,\"$|EditedCategory|\")])[$|count1|]")).toBeVisible();
      }
      if (String(vars["count"]) === String("2")) {
        vars["count1"] = "2";
        await expect(page.locator("(//input[contains(@aria-label,\"$|EditedCategory|\")])[$|count1|]")).toBeVisible();
      }
      await page.locator("(//button[@id=\"multiSelectDropDown\"])[$|count|]").evaluate(el => (el as HTMLElement).click());
      await expect(page.locator("(//div[@class=\"rules-conditions\"]//label[text()=\" When Bid Field \"]/..//div[@class=\"flex-grow-1 text-start text-truncate\"])[$|count|]")).toContainText(vars["EditedRuleBidField[RulesAndActions]"]);
      await expect(page.locator("(//div[@class=\"rules-conditions\"]//button//div[contains(@class,\"flex-grow-1\")])[2]")).toContainText(vars["EditedRuleBidTape[RulesAndActions]"]);
      await expect(page.locator("(//select[contains(normalize-space(),\"Select = != > < >= <= contains\")])[$|count|]")).toHaveValue(testData["Operation2"]);
      await expect(page.locator("(//label[normalize-space(text())='Chase Field Name']//..//select[@class=\"form-select\"])[$|count|]")).toHaveValue(vars["EditedActionChaseFieldName"]);
      await expect(page.locator("(//div[@class=\"row rules-actions\"]//label[text()=\"Chase Value\"]/..//select)[$|count|]")).toHaveValue(vars["EditedActionChaseValue"]);
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    await expect(page.locator("//input[@placeholder=\"Enter a Rule Name\"]")).toHaveValue(testData["New Rule Name"]);
    await expect(page.locator("(//input[@placeholder=\"Enter a Rule Name\"])[2]")).toHaveValue(testData["Duplicated Rule Name"]);
    await stepGroups.stepGroup_Deleting_the_Rule_in_Rules_and_Actions_Page(page, vars);
    await stepGroups.stepGroup_Save_Draft_exit_and_Navigating_To_Rules_And_Actions(page, vars);
    await expect(page.getByText(testData["Duplicated Rule Name"])).not.toBeVisible();
    await expect(page.locator("(//div[@class=\"block\"])[2]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Save and Publish\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
  });
});
