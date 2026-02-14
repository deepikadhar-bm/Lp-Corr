import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';
import * as excelHelper from '../../../src/helpers/excel-helpers';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS31_TC01_Verify that when 3 or more digits are entered in the search input, bid map records are displayed in the popup, showing matching keywords within the categories of bid map name, column hea', async ({ page }) => {
    // Set up download handler
    page.on('download', async (download) => {
      const filePath = path.join('test-results', 'downloads', download.suggestedFilename());
      await download.saveAs(filePath);
      vars['_lastDownloadPath'] = filePath;
    });

    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Smart_Mapper_from_Off_to_On(page, vars);
    vars["Companyname"] = testData["Company Name"];
    vars["count"] = "1";
    vars["RandomName"] = ['Smith','Johnson','Williams','Brown','Jones','Davis','Miller','Wilson'][Math.floor(Math.random() * 8)];
    while (parseFloat(String(vars["count"])) <= parseFloat(String("5"))) {
      await stepGroups.stepGroup_Creating_New_Bid_Map(page, vars);
      await page.locator("//div//div[@id=\"companySelect\"]//div//button[@id=\"multiSelectDropDown\"]").click();
      await page.locator("//span[@class='pl-2'][contains(.,'$|Companyname|')]").click();
      await page.locator("//button[contains(text(),\" Apply Selected \")]").click();
      await page.locator("//span[text()[normalize-space() = \"Save Draft & Exit\"]]").click();
      vars["count"] = (parseFloat(String(vars["count"])) + parseFloat(String("1"))).toFixed(0);
    }
    // [DISABLED] Create_NewMap
    // await stepGroups.stepGroup_Create_NewMap(page, vars);
    vars["CommonKeyword"] = vars["Common KeyWord"];
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"Bid Maps\"]]").waitFor({ state: 'visible' });
    await page.locator("//span[text()[normalize-space() = \"Bid Maps\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//input[@placeholder=\"Search/Filter\"]").waitFor({ state: 'visible' });
    await page.locator("//input[@placeholder=\"Search/Filter\"]").fill(vars["Common KeyWord"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//input[@placeholder=\"Search/Filter\"]").click();
    await page.locator("//h6[text()[normalize-space() = \"BidMap\"]]").waitFor({ state: 'visible' });
    await page.locator("//span[contains(text(),'$|Common KeyWord|')]/parent::a").waitFor({ state: 'visible' });
    await page.locator("//h6[text()[normalize-space() = \"BidMap\"]]").hover();
    await page.locator("//a[text()='Show All']").click();
    await page.waitForLoadState('networkidle');
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["BidMaps Count on Mappings Page"] = String(await page.locator("//button[contains(text(),'$|Common KeyWord|')]").count());
    await page.locator("(//input[@type=\"checkbox\"])[1]").check();
    await expect(page.locator("(//input[@type=\"checkbox\"])[1]")).toBeVisible();
    await page.locator("//button[text()=\" Export Selected \"]").waitFor({ state: 'visible' });
    // [DISABLED] Click on Export Selected Button
    // await page.locator("//button[text()=\" Export Selected \"]").click();
    // [DISABLED] Verify that the element Export List is present and With Scrollable FALSE
    // await expect(page.locator("//div[text()[normalize-space() = \"Export List\"]]")).toBeVisible();
    // [DISABLED] Click on Export List
    // await page.locator("//div[text()[normalize-space() = \"Export List\"]]").click();
    // [DISABLED] Wait until all files are download in all browsers
    // await page.waitForTimeout(3000); // Wait for download to complete
    // [DISABLED] Wait for 120 seconds
    // await page.waitForTimeout(120000);
    // [DISABLED] Store Search Functionality BidMaps in updatedValueFromTDP
    // vars["updatedValueFromTDP"] = testData["Search Functionality BidMaps"];
    // [DISABLED] Verify if BidMaps Count on Mappings Page == 5
    // expect(String(vars["BidMaps Count on Mappings Page"])).toBe("5");
    // [DISABLED] Store 1 in mapCount
    // vars["mapCount"] = "1";
    while (true) /* Verify if mapCount <= 5 */ {
      for (let i = 0; i < 1; i++) /* Loop over data set in Search Functionality BidMaps from inde */ {
        while (true) /* Verify if Search Functionality BidMaps != BidMap Name */ {
          // [DISABLED] Wait for 10 seconds
          // await page.waitForTimeout(10000);
        }
        // [DISABLED] Wait for 90 seconds
        // await page.waitForTimeout(90000);
        // [DISABLED] Verify that the element Newly Created BidMap is present and With Scrollable FALSE
        // await expect(page.locator("//button[contains(@aria-label,\"Edit map\") and contains(text(),'@|Search Functionality BidMaps|')]")).toBeVisible();
        // [DISABLED] Perform addition on mapCount and 1 and store the result inside a mapCount considering 0 decimal places
        // vars["mapCount"] = (parseFloat(String(vars["mapCount"])) + parseFloat(String("1"))).toFixed(0);
      }
    }
    // [DISABLED] Check the checkbox Select All Checkbox For BidMap
    // await page.locator("//input[@aria-label=\"Select all for \" and @type=\"checkbox\"]").check();
    // [DISABLED] Wait until the element Export Selected Button is enabled
    // await page.locator("//button[text()=\" Export Selected \"]").waitFor({ state: 'visible' });
    // [DISABLED] Click on Export Selected Button
    // await page.locator("//button[text()=\" Export Selected \"]").click();
    // [DISABLED] Wait until all files are download in all browsers
    // await page.waitForTimeout(3000); // Wait for download to complete
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
    // [DISABLED] Wait until the element Spinner is not visible
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Store 1 in split2
    // vars["split2"] = "1";
    while (true) /* Verify if split2 <= columnCount */ {
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
    // [DISABLED] Add New Header 
    // await stepGroups.stepGroup_Add_New_Header(page, vars);
    // [DISABLED] Store 1 in split3
    // vars["split3"] = "1";
    while (true) /* Verify if split3 <= columnCount */ {
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
    // [DISABLED] Click on Enumeration Mapping Button
    // await page.locator("//span[text()='Enumeration Mapping']").click();
    // [DISABLED] Store 1 in split4
    // vars["split4"] = "1";
    while (true) /* Verify if split4 <= columnCount */ {
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
    }
  });
});
