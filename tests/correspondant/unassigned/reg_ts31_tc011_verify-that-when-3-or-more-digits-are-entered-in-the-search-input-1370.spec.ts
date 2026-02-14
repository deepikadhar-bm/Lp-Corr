import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';
import * as excelHelper from '../../../src/helpers/excel-helpers';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS31_TC01.1_Verify that when 3 or more digits are entered in the search input, bid map records are displayed in the popup, showing matching keywords within the categories of bid map name, column h', async ({ page }) => {
    // Prerequisite: REG_TS31_TC01_Verify that when 3 or more digits are entered in the search input, bid map records are
    // TODO: Ensure prerequisite test passes first

    // Set up download handler
    page.on('download', async (download) => {
      const filePath = path.join('test-results', 'downloads', download.suggestedFilename());
      await download.saveAs(filePath);
      vars['_lastDownloadPath'] = filePath;
    });

    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Login to CORR Portal
    // await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    // [DISABLED] Smart Mapper from Off to On
    // await stepGroups.stepGroup_Smart_Mapper_from_Off_to_On(page, vars);
    // [DISABLED] Store 1 in count
    // vars["count"] = "1";
    // [DISABLED] Store Name :: Lastname in RandomName
    // vars["RandomName"] = ['Smith','Johnson','Williams','Brown','Jones','Davis','Miller','Wilson'][Math.floor(Math.random() * 8)];
    while (true) /* Verify if count <= 5 */ {
      // [DISABLED] Creating New Bid Map
      // await stepGroups.stepGroup_Creating_New_Bid_Map(page, vars);
      // [DISABLED] Perform addition on count and 1 and store the result inside a count considering 0 decimal places
      // vars["count"] = (parseFloat(String(vars["count"])) + parseFloat(String("1"))).toFixed(0);
    }
    // [DISABLED] Create_NewMap
    // await stepGroups.stepGroup_Create_NewMap(page, vars);
    // [DISABLED] Click on Administration_Menu
    // await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    // [DISABLED] Wait until the element Bid Maps_Menu is visible
    // await page.locator("//span[text()[normalize-space() = \"Bid Maps\"]]").waitFor({ state: 'visible' });
    // [DISABLED] Click on Bid Maps_Menu
    // await page.locator("//span[text()[normalize-space() = \"Bid Maps\"]]").click();
    // [DISABLED] Wait until the element Spinner is not visible
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Wait until the element Search/Filter Input Field is visible
    // await page.locator("//input[@placeholder=\"Search/Filter\"]").waitFor({ state: 'visible' });
    // [DISABLED] Enter Common KeyWord in the Search/Filter Input Field field
    // await page.locator("//input[@placeholder=\"Search/Filter\"]").fill(vars["Common KeyWord"]);
    // [DISABLED] Wait until the element Spinner is not visible
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Click on Search/Filter Input Field
    // await page.locator("//input[@placeholder=\"Search/Filter\"]").click();
    // [DISABLED] Wait until the element BidMapTitle is visible
    // await page.locator("//h6[text()[normalize-space() = \"BidMap\"]]").waitFor({ state: 'visible' });
    // [DISABLED] Wait until the element KeyWord Related Bid Maps is visible
    // await page.locator("//span[contains(text(),'$|Common KeyWord|')]/parent::a").waitFor({ state: 'visible' });
    // [DISABLED] Mouseover the element BidMapTitle
    // await page.locator("//h6[text()[normalize-space() = \"BidMap\"]]").hover();
    // [DISABLED] Click on Show All Option
    // await page.locator("//a[text()='Show All']").click();
    // [DISABLED] Wait until the current page is loaded completely
    // await page.waitForLoadState('networkidle');
    // [DISABLED] Wait until the element Spinner is not visible
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Store the count of elements identified by locator BidMaps Count on Mappings Page into a variable BidMaps Count on Mappings Page
    // vars["BidMaps Count on Mappings Page"] = String(await page.locator("//button[contains(text(),'$|Common KeyWord|')]").count());
    await page.locator("(//input[@type=\"checkbox\"])[1]").check();
    await expect(page.locator("(//input[@type=\"checkbox\"])[1]")).toBeVisible();
    await page.locator("//button[text()=\" Export Selected \"]").waitFor({ state: 'visible' });
    await page.locator("//button[text()=\" Export Selected \"]").click();
    await expect(page.locator("//div[text()[normalize-space() = \"Export List\"]]")).toBeVisible();
    await page.locator("//div[text()[normalize-space() = \"Export List\"]]").click();
    await page.waitForTimeout(3000); // Wait for download to complete
    await page.waitForTimeout(120000);
    vars["updatedValueFromTDP"] = testData["Search Functionality BidMaps"];
    expect(String(vars["BidMaps Count on Mappings Page"])).toBe("5");
    vars["mapCount"] = "1";
    while (parseFloat(String(vars["mapCount"])) <= parseFloat(String("5"))) {
      await page.locator("//button[@role=\"button\" and contains(text(),\"Show 20\")]").click();
      for (let dataIdx = parseInt(vars["mapCount"]); dataIdx <= parseInt(vars["mapCount"]); dataIdx++) {
        while (true) /* Verify if Search Functionality BidMaps != BidMap Name */ {
          // [DISABLED] Wait for 10 seconds
          // await page.waitForTimeout(10000);
        }
        await page.waitForTimeout(90000);
        await expect(page.locator("//button[contains(@aria-label,\"Edit map\") and contains(text(),'@|Search Functionality BidMaps|')]")).toBeVisible();
        vars["mapCount"] = (parseFloat(String(vars["mapCount"])) + parseFloat(String("1"))).toFixed(0);
      }
    }
    await page.locator("//input[@aria-label=\"Select all for \" and @type=\"checkbox\"]").check();
    await page.locator("//button[text()=\" Export Selected \"]").waitFor({ state: 'visible' });
    await page.locator("//button[text()=\" Export Selected \"]").click();
    await page.waitForTimeout(3000); // Wait for download to complete
    await stepGroups.stepGroup_New_Export_List_Advance_Search(page, vars);
    // [DISABLED] Excel: Read the entire Row of the latest Excel file (.xlsx) using the Row 0 and store it in a variable named Bid Map Header
    // vars["Bid Map Header"] = excelHelper.readRow(vars['_lastDownloadPath'] || '', "0", "0");
    // [DISABLED] Excel: Read the entire Row of the latest Excel file (.xlsx) using the Row 1 and store it in a variable named 1st Row Value
    // vars["1st Row Value"] = excelHelper.readRow(vars['_lastDownloadPath'] || '', "1", "0");
    // [DISABLED] Excel: Read the entire Row of the latest Excel file (.xlsx) using the Row 2 and store it in a variable named 2nd Row Value
    // vars["2nd Row Value"] = excelHelper.readRow(vars['_lastDownloadPath'] || '', "2", "0");
    // [DISABLED] Excel: Read the entire Row of the latest Excel file (.xlsx) using the Row 3 and store it in a variable named 3rd Row Value
    // vars["3rd Row Value"] = excelHelper.readRow(vars['_lastDownloadPath'] || '', "3", "0");
    // [DISABLED] Excel: Read the entire Row of the latest Excel file (.xlsx) using the Row 4 and store it in a variable named 4th Row Value
    // vars["4th Row Value"] = excelHelper.readRow(vars['_lastDownloadPath'] || '', "4", "0");
    // [DISABLED] Excel: Read the entire Row of the latest Excel file (.xlsx) using the Row 5 and store it in a variable named 5th Row Value
    // vars["5th Row Value"] = excelHelper.readRow(vars['_lastDownloadPath'] || '', "5", "0");
    // [DISABLED] Store key_blank in space
    // vars["space"] = "key_blank";
    // [DISABLED] Store 1 in split1
    // vars["split1"] = "1";
    // [DISABLED] Store 9 in columnCount
    // vars["columnCount"] = "9";
    while (true) /* Verify if split1 <= columnCount */ {
      // [DISABLED] Click on Show 20
      // await page.locator("//button[@role=\"button\" and contains(text(),\"Show 20\")]").click();
      // [DISABLED] Split the Bid Map Header with the , and store the value from the split1 in the HeaderValue
      // vars["HeaderValue"] = String(vars["Bid Map Header"]).split(",")[parseInt(String(vars["split1"]))] || '';
      // [DISABLED] Trim the data HeaderValue and store into a runtime variable HeaderValue
      // vars["HeaderValue"] = String(vars["HeaderValue"]).trim();
      // [DISABLED] Split the 1st Row Value with the , and store the value from the split1 in the Row Value
      // vars["Row Value"] = String(vars["1st Row Value"]).split(",")[parseInt(String(vars["split1"]))] || '';
      // [DISABLED] Trim the data Row Value and store into a runtime variable Row Value
      // vars["Row Value"] = String(vars["Row Value"]).trim();
      if (true) /* Verify if Row Value == N/A */ {
        // [DISABLED] Store - in Row Value
        // vars["Row Value"] = "-";
      }
      // [DISABLED] Verify that the element Mapping_of_Header_and_1 stBidMap_Data is present and With Scrollable FALSE
      // await expect(page.locator("//div[contains(text(),'$|1st Row Value|')]/ancestor::table[@aria-label=\"Data Table\"]//*[contains(text(),\"$|Row Value|\")]")).toBeVisible();
      // [DISABLED] Perform addition on split1 and 1 and store the result inside a split1 considering 0 decimal places
      // vars["split1"] = (parseFloat(String(vars["split1"])) + parseFloat(String("1"))).toFixed(0);
    }
    // [DISABLED] Store 1 in split2
    // vars["split2"] = "1";
    while (true) /* Verify if split2 <= columnCount */ {
      // [DISABLED] Click on Show 20
      // await page.locator("//button[@role=\"button\" and contains(text(),\"Show 20\")]").click();
      // [DISABLED] Split the Bid Map Header with the , and store the value from the split2 in the HeaderValue
      // vars["HeaderValue"] = String(vars["Bid Map Header"]).split(",")[parseInt(String(vars["split2"]))] || '';
      // [DISABLED] Trim the data HeaderValue and store into a runtime variable HeaderValue
      // vars["HeaderValue"] = String(vars["HeaderValue"]).trim();
      // [DISABLED] Split the 2nd Row Value with the , and store the value from the split2 in the Row Value
      // vars["Row Value"] = String(vars["2nd Row Value"]).split(",")[parseInt(String(vars["split2"]))] || '';
      // [DISABLED] Trim the data Row Value and store into a runtime variable Row Value
      // vars["Row Value"] = String(vars["Row Value"]).trim();
      if (true) /* Verify if Row Value == N/A */ {
        // [DISABLED] Store - in Row Value
        // vars["Row Value"] = "-";
      }
      // [DISABLED] Verify that the element Mapping_of_Header_and_ 2nd_BidMap is present and With Scrollable FALSE
      // await expect(page.locator("//div[contains(text(),'$|HeaderValue|')]/ancestor::table[@aria-label=\"Data Table\"]//*[contains(text(),\"$|Row Value|\")]")).toBeVisible();
      // [DISABLED] Perform addition on split2 and 1 and store the result inside a split2 considering 0 decimal places
      // vars["split2"] = (parseFloat(String(vars["split2"])) + parseFloat(String("1"))).toFixed(0);
    }
    // [DISABLED] Store 1 in split3
    // vars["split3"] = "1";
    while (true) /* Verify if split3 <= columnCount */ {
      // [DISABLED] Click on Show 20
      // await page.locator("//button[@role=\"button\" and contains(text(),\"Show 20\")]").click();
      // [DISABLED] Split the Bid Map Header with the , and store the value from the split3 in the HeaderValue
      // vars["HeaderValue"] = String(vars["Bid Map Header"]).split(",")[parseInt(String(vars["split3"]))] || '';
      // [DISABLED] Trim the data HeaderValue and store into a runtime variable HeaderValue
      // vars["HeaderValue"] = String(vars["HeaderValue"]).trim();
      // [DISABLED] Split the 3rd Row Value with the , and store the value from the split3 in the Row Value
      // vars["Row Value"] = String(vars["3rd Row Value"]).split(",")[parseInt(String(vars["split3"]))] || '';
      // [DISABLED] Trim the data Row Value and store into a runtime variable Row Value
      // vars["Row Value"] = String(vars["Row Value"]).trim();
      if (true) /* Verify if Row Value == N/A */ {
        // [DISABLED] Store - in Row Value
        // vars["Row Value"] = "-";
      }
      // [DISABLED] Verify that the element Mapping_of_Header_and_3rd_BidMap_Data is present and With Scrollable FALSE
      // await expect(page.locator("//div[contains(text(),'$|HeaderValue|')]/ancestor::table[@aria-label=\"Data Table\"]//*[contains(text(),\"$|Row Value|\")]")).toBeVisible();
      // [DISABLED] Perform addition on split3 and 1 and store the result inside a split3 considering 0 decimal places
      // vars["split3"] = (parseFloat(String(vars["split3"])) + parseFloat(String("1"))).toFixed(0);
    }
    // [DISABLED] Store 1 in split4
    // vars["split4"] = "1";
    while (true) /* Verify if split4 <= columnCount */ {
      // [DISABLED] Click on Show 20
      // await page.locator("//button[@role=\"button\" and contains(text(),\"Show 20\")]").click();
      // [DISABLED] Split the Bid Map Header with the , and store the value from the split4 in the HeaderValue
      // vars["HeaderValue"] = String(vars["Bid Map Header"]).split(",")[parseInt(String(vars["split4"]))] || '';
      // [DISABLED] Trim the data HeaderValue and store into a runtime variable HeaderValue
      // vars["HeaderValue"] = String(vars["HeaderValue"]).trim();
      // [DISABLED] Split the 4th Row Value with the , and store the value from the split4 in the Row Value
      // vars["Row Value"] = String(vars["4th Row Value"]).split(",")[parseInt(String(vars["split4"]))] || '';
      // [DISABLED] Trim the data Row Value and store into a runtime variable Row Value
      // vars["Row Value"] = String(vars["Row Value"]).trim();
      if (true) /* Verify if Row Value == N/A */ {
        // [DISABLED] Store - in Row Value
        // vars["Row Value"] = "-";
      }
      // [DISABLED] Verify that the element Mapping_of_Header_and_4th_BidMap_Data is present and With Scrollable FALSE
      // await expect(page.locator("//div[contains(text(),'$|HeaderValue|')]/ancestor::table[@aria-label=\"Data Table\"]//*[contains(text(),\"$|Row Value|\")]")).toBeVisible();
      // [DISABLED] Perform addition on split4 and 1 and store the result inside a split4 considering 0 decimal places
      // vars["split4"] = (parseFloat(String(vars["split4"])) + parseFloat(String("1"))).toFixed(0);
    }
    // [DISABLED] Store 1 in split5
    // vars["split5"] = "1";
    while (true) /* Verify if split5 <= columnCount */ {
      // [DISABLED] Click on Show 20
      // await page.locator("//button[@role=\"button\" and contains(text(),\"Show 20\")]").click();
      // [DISABLED] Split the Bid Map Header with the , and store the value from the split5 in the HeaderValue
      // vars["HeaderValue"] = String(vars["Bid Map Header"]).split(",")[parseInt(String(vars["split5"]))] || '';
      // [DISABLED] Trim the data HeaderValue and store into a runtime variable HeaderValue
      // vars["HeaderValue"] = String(vars["HeaderValue"]).trim();
      // [DISABLED] Split the 5th Row Value with the , and store the value from the split5 in the Row Value
      // vars["Row Value"] = String(vars["5th Row Value"]).split(",")[parseInt(String(vars["split5"]))] || '';
      // [DISABLED] Trim the data Row Value and store into a runtime variable Row Value
      // vars["Row Value"] = String(vars["Row Value"]).trim();
      if (true) /* Verify if Row Value == N/A */ {
        // [DISABLED] Store - in Row Value
        // vars["Row Value"] = "-";
      }
      // [DISABLED] Verify that the element Mapping_of_Header_and_5th_BidMap_Data is present and With Scrollable FALSE
      // await expect(page.locator("//div[contains(text(),'$|HeaderValue|')]/ancestor::table[@aria-label=\"Data Table\"]//*[contains(text(),\"$|Row Value|\")]")).toBeVisible();
      // [DISABLED] Perform addition on split5 and 1 and store the result inside a split5 considering 0 decimal places
      // vars["split5"] = (parseFloat(String(vars["split5"])) + parseFloat(String("1"))).toFixed(0);
    }
    // [DISABLED] Click on element
    // await page.locator('//*').click();
    // [DISABLED] Click on Yes, Proceed Buttons.
    // await page.locator("//span[text()[normalize-space() = \"Yes, Proceed\"]]").click();
    // [DISABLED] Wait until the element Spinner is not visible
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Add New Header 
    // await stepGroups.stepGroup_Add_New_Header(page, vars);
    // [DISABLED] Click on Enumeration Mapping Button
    // await page.locator("//span[text()='Enumeration Mapping']").click();
    // [DISABLED] Verify that the element You have unidentified Fields.This action will save and Move to Next Page is displayed and With Scrollable FALSE
    // await expect(page.locator("//*[contains(text(),\"You have unidentified fields.\")]/../..//*[text()=\" This action will save the changes and Move to Next Page. \"]")).toBeVisible();
    // [DISABLED] Click on Rules and Actions Button
    // await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    // [DISABLED] Wait until the element Spinner is not visible
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Verify that the element You have unidentified fields do you want to proceed is displayed and With Scrollable FALSE
    // await expect(page.locator("//p[text()[normalize-space() = \"You have unidentified fields do you want to proceed further.\"]]")).toBeVisible();
    // [DISABLED] Click on Yes, Proceed Buttons.
    // await page.locator("//span[text()[normalize-space() = \"Yes, Proceed\"]]").click();
    // [DISABLED] Wait until the element Spinner is not visible
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Add Rule For Add Condition In Rules and Actions
    // await stepGroups.stepGroup_Add_Rule_For_Add_Condition_In_Rules_and_Actions(page, vars);
    // [DISABLED] Add_Actions_In_Rules_and_Actions
    // await stepGroups.stepGroup_Add_Actions_In_Rules_and_Actions(page, vars);
    // [DISABLED] Click on Save and Publish Button
    // await page.locator("//span[text()[normalize-space() = \"Save and Publish\"]]").click();
    // [DISABLED] Wait until the element Spinner is not visible
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Click on Search/Filter Input
    // await page.locator("//input[@placeholder=\"Search/Filter\"]").click();
    // [DISABLED] Enter SearchFieldInputMap in the Search/Filter Input field
    // await page.locator("//input[@placeholder=\"Search/Filter\"]").fill(vars["SearchFieldInputMap"]);
    // [DISABLED] Wait until the element Spinner is not visible
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Wait until the current page is loaded completely
    // await page.waitForLoadState('networkidle');
    // [DISABLED] Verify that the element BidMap is present and With Scrollable FALSE
    // await expect(page.locator("//h6[text()[normalize-space() = \"BidMap\"]]")).toBeVisible();
    // [DISABLED] Verify that the element Rule_Check_Bid Map displays text map: and With Scrollable FALSE
    // await expect(page.locator("(//i[text()[normalize-space() = \"map:\"]])[1]")).toContainText("map:");
    // [DISABLED] Mouseover the element BidMap
    // await page.locator("//h6[text()[normalize-space() = \"BidMap\"]]").hover();
    // [DISABLED] Store text from the element CCode into a variable CCode
    // vars["CCode"] = await page.locator("//td[@data-title=\"CCode\"]").textContent() || '';
    // [DISABLED] Verify that the current page displays text CCode
    // await expect(page.getByText(vars["CCode"])).toBeVisible();
    // [DISABLED] Verify that the element Enum is present and With Scrollable FALSE
    // await expect(page.locator("//h6[text()[normalize-space() = \"Enum\"]]")).toBeVisible();
    // [DISABLED] Verify that the element enum_Header_Rule displays text enum: and With Scrollable FALSE
    // await expect(page.locator("(//*[@aria-label=\"Bid Map Search and Filter\"]//*[text()=\"Enum\"]/../following-sibling::div//i)[1]")).toContainText("enum:");
    // [DISABLED] Wait until the current page is loaded completely
    // await page.waitForLoadState('networkidle');
    // [DISABLED] Mouseover the element Enum
    // await page.locator("//h6[text()[normalize-space() = \"Enum\"]]").hover();
    // [DISABLED] Wait until the element Spinner is not visible
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Store text from the element CCode into a variable CCode
    // vars["CCode"] = await page.locator("//td[@data-title=\"CCode\"]").textContent() || '';
    // [DISABLED] Verify that the current page displays text CCode
    // await expect(page.getByText(vars["CCode"])).toBeVisible();
    // [DISABLED] Verify that the element Action is present and With Scrollable FALSE
    // await expect(page.locator("//h6[text()[normalize-space() = \"Action\"]]")).toBeVisible();
    // [DISABLED] Mouseover the element Action
    // await page.locator("//h6[text()[normalize-space() = \"Action\"]]").hover();
    // [DISABLED] Verify that the element action_Rule_Header displays text act: and With Scrollable FALSE
    // await expect(page.locator("//i[text()[normalize-space() = \"act:\"]]")).toContainText("act:");
    // [DISABLED] Store text from the element CCode into a variable CCode
    // vars["CCode"] = await page.locator("//td[@data-title=\"CCode\"]").textContent() || '';
    // [DISABLED] Verify that the element CCode displays text contains CCode and With Scrollable FALSE
    // await expect(page.locator("//td[@data-title=\"CCode\"]")).toContainText(vars["CCode"]);
    // [DISABLED] Verify that the current page displays text CCode
    // await expect(page.getByText(vars["CCode"])).toBeVisible();
    // [DISABLED] Clear the text displayed in the Search/Filter Input field
    // await page.locator("//input[@placeholder=\"Search/Filter\"]").clear();
    // [DISABLED] Enter Chase Field Name in the Search/Filter Input field
    // await page.locator("//input[@placeholder=\"Search/Filter\"]").fill(testData["Chase Field Name"]);
    // [DISABLED] Wait until the element Spinner is not visible
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Verify that the element Column Header is present and With Scrollable FALSE
    // await expect(page.locator("//h6[text()[normalize-space() = \"Column Header\"]]")).toBeVisible();
    // [DISABLED] Verify that the element column_Header_Rule displays text col: and With Scrollable FALSE
    // await expect(page.locator("(//i[text()[normalize-space() = \"col:\"]])[1]")).toContainText("col:");
    // [DISABLED] Mouseover the element Column Header
    // await page.locator("//h6[text()[normalize-space() = \"Column Header\"]]").hover();
    // [DISABLED] Wait until the element Spinner is not visible
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Click on Show All_ColumnHeader
    // await page.locator("//h6[text()[normalize-space() = \"Column Header\"]]/following-sibling::a[text()[normalize-space() = \"Show All\"]]").click();
    // [DISABLED] Wait until the element Spinner is not visible
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Store text from the element CCode into a variable CCode
    // vars["CCode"] = await page.locator("//td[@data-title=\"CCode\"]").textContent() || '';
    // [DISABLED] Verify that the element CCode displays text contains CCode and With Scrollable FALSE
    // await expect(page.locator("//td[@data-title=\"CCode\"]")).toContainText(vars["CCode"]);
    await stepGroups.stepGroup_Deleting_All_Advanced_Search_Bid_Maps(page, vars);
  });
});
