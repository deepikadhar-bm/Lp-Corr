import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS01_TC06_Verify that user should be able to create the bid maps using the file extenstion xlsx', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile
    const testDataSets: Record<string, string>[] = []; // TODO: Load test data sets

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Smart_Mapper_from_Off_to_On(page, vars);
    await stepGroups.stepGroup_Creation_Of_Bid_Map_Upto_Header_Mapping(page, vars);
    vars["EnumValues"] = "Loan Purpose";
    // Loop over test data sets in "Enum_Type_Values_For_Happy_Flow" from set2 to set18
for (const testDataSet of testDataSets) {
      vars["EnumValues"] = String(testData["Parameter 1"]) + "," + String(vars["EnumValues"]);
    }
    vars["MappedChaseFieldCount"] = String(await page.locator("//fieldset//div[@class=\"gap-2 header-grid-layout\"]//select").count());
    vars["count"] = "1";
    vars["ChaseEnumValue"] = "sample";
    while (parseFloat(String(vars["count"])) < parseFloat(String(vars["MappedChaseFieldCount"]))) {
      vars["ChaseName"] = await page.locator("(//fieldset//div[@class=\"gap-2 header-grid-layout\"]//select)[$|count|]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
      if (String(vars["EnumValues"]).includes(String(vars["ChaseName"]))) {
        vars["ChaseEnumValue"] = String(vars["ChaseName"]) + "," + String(vars["ChaseEnumValue"]);
        vars["CorrespondentBidName"] = await page.locator("(//fieldset//div[@class=\"gap-2 header-grid-layout\"]//select)[$|count|]/../../..//div[@class=\"flex-grow-1\"]").textContent() || '';
        await page.locator("//span[text()='Enumeration Mapping']").click();
        await page.locator("//button[@aria-label=\"Yes, Proceed\"]").click();
        await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").waitFor({ state: 'visible' });
        await expect(page.locator("(//div[@class=\"my-2\" and text()=\"$|ChaseName|\"]/../..//div)[3]")).toContainText(vars["CorrespondentBidName"]);
        await page.locator("//a[contains(text(),\"Header Mapping\")]").click();
        await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      }
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    await page.locator("//span[text()='Enumeration Mapping']").click();
    if (true) /* Element Yes Proceed Button is visible */ {
      await page.locator("//button[@aria-label=\"Yes, Proceed\"]").click();
    }
    if (true) /* Element Proceed with Saving Button is visible */ {
      await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    }
    vars["ChaseEnumNamesCount[Enumeration]"] = String(await page.locator("//div[@class=\"my-2\"]").count());
    vars["count1"] = "1";
    while (parseFloat(String(vars["count1"])) <= parseFloat(String(vars["ChaseEnumNamesCount[Enumeration]"]))) {
      vars["ChaseName"] = await page.locator("(//div[@class=\"my-2\"])[$|count1|]").inputValue() || '';
      expect(String(vars["ChaseEnumValue"])).toBe(vars["ChaseName"]);
      vars["count1"] = (parseFloat(String("1")) + parseFloat(String(vars["count1"]))).toFixed(0);
    }
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    if (true) /* Element Yes Proceed Button is visible */ {
      await page.locator("//button[@aria-label=\"Yes, Proceed\"]").click();
    }
    if (true) /* Element Proceed with Saving Button is visible */ {
      await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    }
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Add_Rule_For_Add_Condition_In_Rules_and_Actions(page, vars);
    await stepGroups.stepGroup_Add_Actions_in_Rules_and_Actions(page, vars);
    await expect(page.locator("(//div[@class=\"rules-conditions\"]//button//div[contains(@class,\"flex-grow-1\")])[1]")).toContainText(vars["RuleBidField"]);
    await expect(page.locator("(//div[@class=\"rules-conditions\"]//button//div[contains(@class,\"flex-grow-1\")])[2]")).toContainText(vars["RuleBidTapeValue"]);
    // [DISABLED] Verify that the element Action Chase Field Name 1 display value ChaseFieldNameonAddActions and With Scrollable FALSE
    // await expect(page.locator("(//div[@class=\"row rules-actions\"]//div[@class=\"col-4\"]//select)[1]")).toHaveValue(vars["ChaseFieldNameonAddActions"]);
    await expect(page.locator("(//div[@class=\"row rules-actions\"]//div[@class=\"col-4\"]//select)[1]")).toContainText(vars["ChaseFieldNameonAddActions"]);
    await page.locator("//span[text()[normalize-space() = \"Save and Publish\"]]").click();
    await expect(page.locator("//td[@data-title=\"Map Name\"]//button[text()=\" $|Create New Map| \"]")).toBeVisible();
  });
});
