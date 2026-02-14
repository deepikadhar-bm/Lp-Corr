import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS23_TC01_Verify that user should be able to clone the required bid map and a new bid map should be created with the status draft.', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Smart_Mapper_from_Off_to_On(page, vars);
    await stepGroups.stepGroup_Creating_New_BidMap_Upto_Upload_File(page, vars);
    vars["SelectedCompanyCount"] = String(await page.locator("//label[text()=\"Select Company/s\"]/..//div[@class=\"pill rounded-pill relative\"]").count());
    vars["SelectedCompanyName"] = await page.locator("//label[text()=\"Select Company/s\"]/..//div[@class=\"pill rounded-pill relative\"]//span").textContent() || '';
    vars["BidMapName"] = vars["BidMap"];
    vars["ExecutionType"] = await page.locator("//label[text()=\"Execution Type\"]/..//select").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
    vars["UploadedFileName"] = await page.locator("//label[text()=\"Upload File\"]/..//div[contains(@class,\"text-truncate flex-grow-1\")]").textContent() || '';
    await page.waitForLoadState('networkidle');
    await page.locator("//span[text()[normalize-space() = \"Map Headers\"]]").click();
    await expect(page.locator("//*[contains(text(),\"This action will save the changes and Move to Next Page\")]")).toBeVisible();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Editing_Header_Mapping(page, vars);
    await stepGroups.stepGroup_Fetching_Bid_Sample_Names_and_Corresponding_Chase_Values_and(page, vars);
    await page.locator("//span[text()='Enumeration Mapping']").click();
    if (true) /* Element Yes, Proceed Button. is visible */ {
      await page.locator("//span[text()[normalize-space() = \"Yes, Proceed\"]]").click();
    } else {
      await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    }
    await page.locator("//h1[@class=\"fw-semibold py-3\"]").waitFor({ state: 'visible' });
    await page.getByText("No data Found").waitFor({ state: 'hidden' });
    vars["count1"] = "1";
    vars["EnumFieldsCount"] = String(await page.locator("//div[@class=\"my-2\"]").count());
    await page.locator("(//input[@type=\"checkbox\" and @class=\"mapping-select mt-1\"])[1]").check();
    await page.locator("(//input[@type=\"checkbox\" and @class=\"mapping-select mt-1\"])[1]").uncheck();
    while (parseFloat(String(vars["count1"])) <= parseFloat(String(vars["EnumFieldsCount"]))) {
      vars["IndividualBidSampleName"] = await page.locator("(//div[@class=\"my-2\"])[$|count1|]/ancestor::div[contains(@class,\"mapping-card\")]//div[@class=\"col-2\"]//div[not(contains(@class,\"my-2\"))]").textContent() || '';
      vars["ColumnHeader"] = vars["IndividualBidSampleName"];
      for (let dataIdx = parseInt(vars["count1"]); dataIdx <= parseInt(vars["count1"]); dataIdx++) {
        // Write to test data profile: "EnumBidSampleNames" = vars["IndividualBidSampleName"]
        // TODO: Test data profile writes need custom implementation
        if (true) /* Element BidTapeFieldCountForBidField is not visible */ {
          vars["IndividualBidTapeValue"] = "No BidTape";
        } else {
          vars["IndividualBidTapeValue"] = "Sample";
          vars["BidTapeCount"] = String(await page.locator("//div[text()=\"$|ColumnHeader|\" and not(@class=\"my-2\")]/../..//div[contains(@class,\"input-field-name\")]").count());
          vars["count2"] = "1";
          while (parseFloat(String(vars["count2"])) <= parseFloat(String(vars["BidTapeCount"]))) {
            vars["BidTapeValue"] = await page.locator("(//div[text()=\"$|ColumnHeader|\" and not(@class=\"my-2\")]/../..//div[contains(@class,\"input-field-name\")])[$|count2|]").textContent() || '';
            vars["IndividualBidTapeValue"] = String(vars["BidTapeValue"]) + "," + String(vars["IndividualBidTapeValue"]);
            vars["count2"] = (parseFloat(String("1")) + parseFloat(String(vars["count2"]))).toFixed(0);
          }
        }
        // Write to test data profile: "EnumBidTapeValues" = vars["IndividualBidTapeValue"]
        // TODO: Test data profile writes need custom implementation
        vars["count1"] = (parseFloat(String("1")) + parseFloat(String(vars["count1"]))).toFixed(0);
      }
    }
    vars["count1"] = "1";
    vars["ChaseFieldsCountEnum"] = String(await page.locator("//div[@class=\"my-2\"]").count());
    while (parseFloat(String(vars["count1"])) <= parseFloat(String(vars["ChaseFieldsCountEnum"]))) {
      await page.locator("(//input[@type=\"checkbox\" and @class=\"mapping-select mt-1\"])[1]").check();
      await page.locator("(//input[@type=\"checkbox\" and @class=\"mapping-select mt-1\"])[1]").uncheck();
      for (let dataIdx = parseInt(vars["count1"]); dataIdx <= parseInt(vars["count1"]); dataIdx++) {
        vars["IndividualChaseFieldName"] = await page.locator("(//div[@class=\"my-2\"])[$|count1|]").textContent() || '';
        // Write to test data profile: "ChaseFieldName" = vars["IndividualChaseFieldName"]
        // TODO: Test data profile writes need custom implementation
        if (true) /* Element ChaseValues Corresponding to Chase Field is not visi */ {
          // Write to test data profile: "Chase Value" = "No ChaseValue"
          // TODO: Test data profile writes need custom implementation
        } else {
          vars["IndividualChaseValueofChaseField"] = "Sample";
          vars["ChaseValuesOfChaseFieldCount"] = String(await page.locator("(//div[@class=\"my-2\" and text()=\"$|IndividualChaseFieldName|\"]/..//following-sibling::div)//div[@class=\"mb-2\"]").count());
          vars["count2"] = "1";
          vars["TagName"] = await page.locator("((//div[@class=\"my-2\" and text()=\"$|IndividualChaseFieldName|\"]/..//following-sibling::div)//div[@class=\"mb-2\"]//*[contains(@class,\"form-control p-0\") or contains(@class,\"form-select\")])[$|count2|]").evaluate(el => (el as HTMLElement).tagName);
          while (parseFloat(String(vars["count2"])) <= parseFloat(String(vars["ChaseValuesOfChaseFieldCount"]))) {
            if (String(vars["TagName"]).includes(String("select"))) {
              vars["ChaseValue"] = await page.locator("((//div[@class=\"my-2\" and text()=\"$|IndividualChaseFieldName|\"]/..//following-sibling::div)//div[@class=\"mb-2\"]//*[contains(@class,\"form-control p-0\") or contains(@class,\"form-select\")])[$|count2|]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
            } else {
              vars["ChaseValue"] = await page.locator("((//div[@class=\"my-2\" and text()=\"$|IndividualChaseFieldName|\"]/..//following-sibling::div)//div[@class=\"mb-2\"]//*[contains(@class,\"form-control p-0\") or contains(@class,\"form-select\")])[$|count2|]").textContent() || '';
            }
            vars["IndividualChaseValueofChaseField"] = String(vars["ChaseValue"]) + "," + String(vars["IndividualChaseValueofChaseField"]);
            vars["count2"] = (parseFloat(String("1")) + parseFloat(String(vars["count2"]))).toFixed(0);
          }
          // Write to test data profile: "Chase Value" = vars["IndividualChaseValueofChaseField"]
          // TODO: Test data profile writes need custom implementation
        }
      }
      vars["count1"] = (parseFloat(String("1")) + parseFloat(String(vars["count1"]))).toFixed(0);
    }
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.waitForLoadState('networkidle');
    await stepGroups.stepGroup_Add_Rule_For_Add_Condition_In_Rules_and_Actions(page, vars);
    await stepGroups.stepGroup_Add_Actions_in_Rules_and_Actions(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Save and Publish\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
  });
});
