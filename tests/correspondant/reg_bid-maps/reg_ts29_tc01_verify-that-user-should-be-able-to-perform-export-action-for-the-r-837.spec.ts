import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';
import * as excelHelper from '../../../src/helpers/excel-helpers';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS29_TC01_Verify that user should be able to perform export action for the required bids i.e exporting the list and the map details file.', async ({ page }) => {
    // Set up download handler
    page.on('download', async (download) => {
      const filePath = path.join('test-results', 'downloads', download.suggestedFilename());
      await download.saveAs(filePath);
      vars['_lastDownloadPath'] = filePath;
    });

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"Bid Maps\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("(//button[@class=\"text-primary pointer border-0 bg-transparent\"])[1]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()=\"Map Headers\"]/ancestor::button").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("(//button[@aria-label=\"Delete Header\"])[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Yes, Proceed\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await expect(page.locator("//*[contains(text(),\"You have unidentified fields.\")]/../..//*[text()=\" This action will save the changes and Move to Next Page. \"]")).toBeVisible();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Exit\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("(//input[@type=\"checkbox\"])[2]").click();
    await expect(page.locator("//button[@id='exportdropdownMenuButton']")).toBeVisible();
    await page.locator("//button[@id='exportdropdownMenuButton']").click();
    await page.locator("//div[text()[normalize-space() = \"Export List\"]]").click();
    vars["Bid Mapping"] = excelHelper.readRow(vars['_lastDownloadPath'] || '', "0", "0");
    vars["Bid Mapping Values"] = excelHelper.readRow(vars['_lastDownloadPath'] || '', "1", "0");
    vars["MapNameFromUI"] = await page.locator("//div[contains(text(),'Map Name')]/ancestor::table[@aria-label=\"Data Table\"]//td//button").textContent() || '';
    vars["split"] = "1";
    vars["split1"] = "6";
    vars["columnCount"] = "9";
    while (parseFloat(String(vars["split"])) <= parseFloat(String(vars["columnCount"]))) {
      if (String(vars["split"]) === String("6")) {
        if (String(vars["Bid Mapping Values"]).includes(String("ACTIVE, DRAFT"))) {
          vars["split"] = "5";
          await page.locator("//h1[text()[normalize-space() = \"Mappings\"]]").click();
          // [DISABLED] Store 10 in columnCount
          // vars["columnCount"] = "10";
          vars["TableHeadersFromFile"] = String(vars["Bid Mapping"]).split(",")[parseInt(String(vars["split"]))] || '';
          vars["TableHeadersFromFile"] = String(vars["TableHeadersFromFile"]).trim();
          vars["split"] = "6";
          vars["RowDataFromBidMap"] = String(vars["Bid Mapping Values"]).split(",")[parseInt(String(vars["split"]))] || '';
          vars["RowDataFromBidMap"] = String(vars["RowDataFromBidMap"]).trim();
        }
      } else {
        await page.locator("//h1[text()[normalize-space() = \"Mappings\"]]").click();
        if (String(vars["split"]) === String("10")) {
          vars["split"] = (parseFloat(String(vars["split"])) - parseFloat(String("1"))).toFixed(0);
          vars["TableHeadersFromFile"] = String(vars["Bid Mapping"]).split(",")[parseInt(String(vars["split"]))] || '';
          vars["TableHeadersFromFile"] = String(vars["TableHeadersFromFile"]).trim();
          vars["split"] = (parseFloat(String(vars["split"])) + parseFloat(String("1"))).toFixed(0);
          if (String(vars["TableHeadersFromFile"]) === String("Last Modified By")) {
            vars["split"] = (parseFloat(String(vars["split"])) - parseFloat(String("1"))).toFixed(0);
          }
        }
        if (String(vars["split"]) === String("11")) {
          vars["split"] = "10";
          vars["RowDataFromBidMap"] = String(vars["Bid Mapping Values"]).split(",")[parseInt(String(vars["split"]))] || '';
          vars["RowDataFromBidMap"] = String(vars["RowDataFromBidMap"]).trim();
          vars["split"] = "9";
          vars["TableHeadersFromFile"] = String(vars["Bid Mapping"]).split(",")[parseInt(String(vars["split"]))] || '';
          vars["TableHeadersFromFile"] = String(vars["TableHeadersFromFile"]).trim();
          vars["split"] = "11";
        } else {
          vars["TableHeadersFromFile"] = String(vars["Bid Mapping"]).split(",")[parseInt(String(vars["split"]))] || '';
          vars["TableHeadersFromFile"] = String(vars["TableHeadersFromFile"]).trim();
        }
        if (String(vars["split"]) === String("7")) {
          await page.locator("//h1[text()[normalize-space() = \"Mappings\"]]").click();
          if (String(vars["Bid Mapping Values"]).includes(String("ACTIVE, DRAFT"))) {
            vars["split"] = "6";
            vars["TableHeadersFromFile"] = String(vars["Bid Mapping"]).split(",")[parseInt(String(vars["split"]))] || '';
            vars["TableHeadersFromFile"] = String(vars["TableHeadersFromFile"]).trim();
            vars["split"] = "7";
            vars["RowDataFromBidMap"] = String(vars["Bid Mapping Values"]).split(",")[parseInt(String(vars["split"]))] || '';
            vars["RowDataFromBidMap"] = String(vars["RowDataFromBidMap"]).trim();
          }
        }
        if (String(vars["split"]) === String("8")) {
          if (String(vars["Bid Mapping Values"]).includes(String("ACTIVE, DRAFT"))) {
            vars["split"] = "7";
            vars["TableHeadersFromFile"] = String(vars["Bid Mapping"]).split(",")[parseInt(String(vars["split"]))] || '';
            vars["TableHeadersFromFile"] = String(vars["TableHeadersFromFile"]).trim();
            vars["split"] = "8";
            vars["RowDataFromBidMap"] = String(vars["Bid Mapping Values"]).split(",")[parseInt(String(vars["split"]))] || '';
            vars["RowDataFromBidMap"] = String(vars["RowDataFromBidMap"]).trim();
            // [DISABLED] Perform subtraction on split and 1 and store the result inside a split considering 0 decimal places
            // vars["split"] = (parseFloat(String(vars["split"])) - parseFloat(String("1"))).toFixed(0);
          }
        } else {
          if (String(vars["split"]) === String("11")) {
          } else {
            vars["RowDataFromBidMap"] = String(vars["Bid Mapping Values"]).split(",")[parseInt(String(vars["split"]))] || '';
            vars["RowDataFromBidMap"] = String(vars["RowDataFromBidMap"]).trim();
          }
        }
      }
      if (String(vars["split"]) === String("9")) {
        if (String(vars["Bid Mapping Values"]).includes(String("ACTIVE, DRAFT"))) {
          vars["split"] = "8";
          vars["TableHeadersFromFile"] = String(vars["Bid Mapping"]).split(",")[parseInt(String(vars["split"]))] || '';
          vars["TableHeadersFromFile"] = String(vars["TableHeadersFromFile"]).trim();
          vars["split"] = "9";
          vars["RowDataFromBidMap"] = String(vars["Bid Mapping Values"]).split(",")[parseInt(String(vars["split"]))] || '';
          vars["RowDataFromBidMap"] = String(vars["RowDataFromBidMap"]).trim();
          if (String(vars["Bid Mapping Values"]).includes(String("ACTIVE, DRAFT"))) {
            vars["split"] = "10";
            vars["columnCount"] = "11";
          }
          // [DISABLED] Perform subtraction on split and 1 and store the result inside a split considering 0 decimal places
          // vars["split"] = (parseFloat(String(vars["split"])) - parseFloat(String("1"))).toFixed(0);
        }
      } else {
        if (String(vars["split"]) === String("11")) {
        } else {
          vars["RowDataFromBidMap"] = String(vars["Bid Mapping Values"]).split(",")[parseInt(String(vars["split"]))] || '';
          vars["RowDataFromBidMap"] = String(vars["RowDataFromBidMap"]).trim();
        }
      }
      if (String(vars["TableHeadersFromFile"]) === String("Ccode")) {
        vars["TableHeadersFromFile"] = "CCode";
      }
    }
  });
});
