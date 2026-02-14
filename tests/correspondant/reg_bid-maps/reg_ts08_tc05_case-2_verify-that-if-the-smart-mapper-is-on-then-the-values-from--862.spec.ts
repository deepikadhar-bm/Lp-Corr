import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';
import * as excelHelper from '../../../src/helpers/excel-helpers';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS08_TC05_CASE-2_Verify that if the smart mapper is on, then the values from the file should be fetched and auto mapped. if smart mapper is off then the auto map should not work.', async ({ page }) => {
    // Set up download handler
    page.on('download', async (download) => {
      const filePath = path.join('test-results', 'downloads', download.suggestedFilename());
      await download.saveAs(filePath);
      vars['_lastDownloadPath'] = filePath;
    });

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Smart_Mapper_from_Off_to_On(page, vars);
    await stepGroups.stepGroup_Creation_Of_Bid_Map_Upto_Header_Mapping(page, vars);
    await stepGroups.stepGroup_Storing_All_Enum_TDP_Values_into_a_Variable(page, vars);
    // [DISABLED] Store the count of elements identified by locator Bid_Sample_Field_Name_in_Header_Mapping into a variable BidSampleFieldInHeader
    // vars["BidSampleFieldInHeader"] = String(await page.locator("//i[@class=\"fas fa-pencil-alt\"]").count());
    // [DISABLED] Store 1 in count
    // vars["count"] = "1";
    // [DISABLED] Store 0 in MappedHeaderCount
    // vars["MappedHeaderCount"] = "0";
    // [DISABLED] Store 0 in UnMappedHeaderCount
    // vars["UnMappedHeaderCount"] = "0";
    // [DISABLED] Store the count of elements identified by locator MappedChaseFieldName into a variable MappedFieldsCount
    // vars["MappedFieldsCount"] = String(await page.locator("//fieldset//div[@class=\"gap-2 header-grid-layout\"]//select").count());
    while (true) /* Verify if count <= MappedFieldsCount */ {
      // [DISABLED] Store the text of the selected option from Chase Field Name Drowpdown list into a variable MappedDataValue
      // vars["MappedDataValue"] = await page.locator("(//div[@class='parent']//fieldset//select[@class='form-select'])[$|count|]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
      // [DISABLED] Mouseover the element Chase Field Name Dropdown.
      // await page.locator("//option[@value=\"search.criteria.loanType\"]/..").hover();
      if (true) /* Verify if MappedDataValue == Select */ {
        // [DISABLED] Perform addition on 1 and UnMappedHeaderCount and store the result inside a UnMappedHeaderCount considering 0 decimal places
        // vars["UnMappedHeaderCount"] = (parseFloat(String("1")) + parseFloat(String(vars["UnMappedHeaderCount"]))).toFixed(0);
      } else {
        if (true) /* Verify if Chase Fields Name contains MappedDataValue */ {
        }
        // [DISABLED] Perform addition on 1 and MappedHeaderCount and store the result inside a MappedHeaderCount considering 0 decimal places
        // vars["MappedHeaderCount"] = (parseFloat(String("1")) + parseFloat(String(vars["MappedHeaderCount"]))).toFixed(0);
      }
      // [DISABLED] Perform addition on 1 and count and store the result inside a count considering 0 decimal places
      // vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    // [DISABLED] Wait until the element Spinner is not visible
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Fetching Enum from Header Mapping and verifying them at Enumeration Mapping 
    // await stepGroups.stepGroup_Fetching_Enum_from_Header_Mapping_and_verifying_them_at_Enum(page, vars);
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await page.waitForLoadState('networkidle');
    await page.locator("(//button[@type=\"button\"])[last()]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Rename_File(page, vars);
    vars["ColumnCount"] = String(excelHelper.getColumnCount("BidmapsAugQA.xlsx,BidmapsAugBidQA.xlsx", "0"));
    vars["PerfectMatch"] = "0";
    vars["PartialMatch"] = "0";
    vars["IncorrectMatch"] = "0";
    vars["UnmappedCount"] = "0";
    vars["ColumnNum"] = "0";
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["ColumnCount"]))) {
      await page.locator("(//input[@type=\"checkbox\" and @class=\"mapping-select mt-1\"])[1]").check();
      await page.locator("(//input[@type=\"checkbox\" and @class=\"mapping-select mt-1\"])[1]").uncheck();
      vars["ColumnHeader"] = excelHelper.readCell(vars['_lastDownloadPath'] || '', "0", vars["ColumnNum"], "0");
      if (true) /* Element Bid sample from file to UI is visible */ {
        vars["ChaseFieldUI"] = await page.locator("//div[text()=\"$|ColumnHeader|\" and not(@class=\"my-2\")]/../..//div[@class=\"my-2\"]").textContent() || '';
        if (String(vars["EnumValues"]).includes(String(vars["ChaseFieldUI"]))) {
          vars["UniqueBidTapeValuesFromExcel"] = excelHelper.readColumn(vars['_lastDownloadPath'] || '', vars["ColumnNum"], "1");
          vars["FirstValue"] = String(vars["UniqueBidTapeValuesFromExcel"]).split(",")["1"] || '';
          vars["UniqueBidTapeValuesFromExcel"] = String(vars["UniqueBidTapeValuesFromExcel"]).split("FirstValue")["2"] || '';
          vars["BidTapeCountUI"] = String(await page.locator("//div[text()=\"$|ColumnHeader|\" and not(@class=\"my-2\")]/../..//div[contains(@class,\"input-field-name\")]").count());
          if (String(vars["BidTapeCountUI"]) > String("1")) {
            vars["count1"] = "1";
            while (parseFloat(String(vars["count1"])) <= parseFloat(String(vars["BidTapeCountUI"]))) {
              vars["IndividualBidTapeValueFromUI"] = await page.locator("(//div[text()=\"$|ColumnHeader|\" and not(@class=\"my-2\")]/../..//div[contains(@class,\"input-field-name\")])[$|count1|]").textContent() || '';
              expect(String(vars["UniqueBidTapeValuesFromExcel"])).toBe(vars["IndividualBidTapeValueFromUI"]);
              if (true) /* Element Unmapped Chase Value 1 is not visible */ {
                vars["IndividualChaseValueUI"] = await page.locator("(//div[not(@class=\"my-2\") and text()=\"$|ColumnHeader|\"]/ancestor::div[@class=\"mapping-card rounded-3 unchecked\"]//div[@class=\"mb-2\"]//*[@class=\"form-control p-0\" or @class=\"form-select\"])[$|count1|]").textContent() || '';
                if (String(vars["IndividualChaseValueUI"]).includes(String("Select"))) {
                  vars["IndividualChaseValueUI"] = await page.locator("(//div[not(@class=\"my-2\") and text()=\"$|ColumnHeader|\"]/ancestor::div[@class=\"mapping-card rounded-3 unchecked\"]//div[@class=\"mb-2\"]//*[@class=\"form-control p-0\" or @class=\"form-select\"])[$|count1|]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
                }
              }
              if (true) /* Element Unmapped Chase Value 1 is visible */ {
                vars["UnmappedCount"] = (parseFloat(String("1")) + parseFloat(String(vars["UnmappedCount"]))).toFixed(0);
              } else if (String("N , False , FALSE , false").includes(String(vars["IndividualBidTapeValueFromUI"]))) {
                if (String("N , False , FALSE , false").includes(String(vars["IndividualChaseValueUI"]))) {
                  vars["PerfectMatch"] = (parseFloat(String("1")) + parseFloat(String(vars["PerfectMatch"]))).toFixed(0);
                } else {
                  vars["IncorrectMatch"] = (parseFloat(String("1")) + parseFloat(String(vars["IncorrectMatch"]))).toFixed(0);
                }
              } else if (String("Y , True , true , TRUE").includes(String(vars["IndividualBidTapeValueFromUI"]))) {
                if (String("Y , True , true , TRUE").includes(String(vars["IndividualChaseValueUI"]))) {
                  vars["PerfectMatch"] = (parseFloat(String("1")) + parseFloat(String(vars["PerfectMatch"]))).toFixed(0);
                } else {
                  vars["IncorrectMatch"] = (parseFloat(String("1")) + parseFloat(String(vars["IncorrectMatch"]))).toFixed(0);
                }
              } else if (String(vars["IndividualChaseValueUI"]) === String(vars["IndividualBidTapeValueFromUI"])) {
                vars["PerfectMatch"] = (parseFloat(String("1")) + parseFloat(String(vars["PerfectMatch"]))).toFixed(0);
              } else if (String(vars["IndividualChaseValueUI"]).includes(String(vars["IndividualBidTapeValueFromUI"]))) {
                vars["PartialMatch"] = (parseFloat(String("1")) + parseFloat(String(vars["PartialMatch"]))).toFixed(0);
              } else if (String(vars["IndividualBidTapeValueFromUI"]).includes(String(vars["IndividualChaseValueUI"]))) {
                vars["PartialMatch"] = (parseFloat(String("1")) + parseFloat(String(vars["PartialMatch"]))).toFixed(0);
              } else {
                vars["IncorrectMatch"] = (parseFloat(String("1")) + parseFloat(String(vars["IncorrectMatch"]))).toFixed(0);
              }
              vars["count1"] = (parseFloat(String("1")) + parseFloat(String(vars["count1"]))).toFixed(0);
            }
          } else {
            vars["BidTapeValueUI"] = await page.locator("(//div[text()=\"$|ColumnHeader|\" and not(@class=\"my-2\")]/../..//div[contains(@class,\"input-field-name\")])").textContent() || '';
            expect(String(vars["UniqueBidTapeValuesFromExcel"])).toBe(vars["BidTapeValueUI"]);
            if (true) /* Element Unmapped Chase Value is not visible */ {
              vars["ChaseValueUI"] = await page.locator("//div[not(@class=\"my-2\") and text()=\"$|ColumnHeader|\"]/ancestor::div[@class=\"mapping-card rounded-3 unchecked\"]//div[@class=\"mb-2\"]//*[@class=\"form-control p-0\" or @class=\"form-select\"]").textContent() || '';
              if (String(vars["ChaseValueUI"]).includes(String("Select"))) {
                vars["ChaseValueUI"] = await page.locator("//div[not(@class=\"my-2\") and text()=\"$|ColumnHeader|\"]/ancestor::div[@class=\"mapping-card rounded-3 unchecked\"]//div[@class=\"mb-2\"]//*[@class=\"form-control p-0\" or @class=\"form-select\"]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
              }
            }
            await stepGroups.stepGroup_Getting_PerfectPartialIncorrectUnmapped_Count_From_Enum_Mapp(page, vars);
            if (true) /* Verify if ChaseValueUI == BidTapeValueUI */ {
              // [DISABLED] Perform addition on 1 and PerfectMatch and store the result inside a PerfectMatch considering 0 decimal places
              // vars["PerfectMatch"] = (parseFloat(String("1")) + parseFloat(String(vars["PerfectMatch"]))).toFixed(0);
            } else if (true) /* Verify if ChaseValueUI contains BidTapeValueUI */ {
              // [DISABLED] Perform addition on 1 and PartialMatch and store the result inside a PartialMatch considering 0 decimal places
              // vars["PartialMatch"] = (parseFloat(String("1")) + parseFloat(String(vars["PartialMatch"]))).toFixed(0);
            } else if (true) /* Element Unmapped Chase Value is visible */ {
              // [DISABLED] Perform addition on 1 and UnmappedCount and store the result inside a UnmappedCount considering 0 decimal places
              // vars["UnmappedCount"] = (parseFloat(String("1")) + parseFloat(String(vars["UnmappedCount"]))).toFixed(0);
            } else {
              // [DISABLED] Perform addition on 1 and IncorrectMatch and store the result inside a IncorrectMatch considering 0 decimal places
              // vars["IncorrectMatch"] = (parseFloat(String("1")) + parseFloat(String(vars["IncorrectMatch"]))).toFixed(0);
            }
          }
        }
      }
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
      vars["ColumnNum"] = (parseFloat(String("1")) + parseFloat(String(vars["ColumnNum"]))).toFixed(0);
    }
    await page.locator("//span[text()[normalize-space() = \"Save Draft & Exit\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Smart_Mapper_from_On_to_Off(page, vars);
    await stepGroups.stepGroup_Navigation_to_Customer_Permission(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"Bid Maps\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//button[text()[normalize-space() = \"Add New Mapping\"]]").click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator("//h5[text()[normalize-space() = \"Create New Map\"]]")).toBeVisible();
    vars["Create New Map"] = new Date().toLocaleDateString('en-US') /* format: dd/MM/yyyy/HH:mm:ss */;
    vars["Create New Map"] = "Testsigma_" + vars["Create New Map"];
    await page.locator("mapName").fill(vars["Create New Map"]);
    await page.locator("//button[@aria-label=\"Create\"]").click();
    await page.waitForLoadState('networkidle');
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText(vars["Create New Map"])).toBeVisible();
    await page.locator("//a[text()[normalize-space() = \"New Map\"]]").click();
    await page.locator("//div//div[@id=\"companySelect\"]//div//button[@id=\"multiSelectDropDown\"]").click();
    await page.locator("//span[@class='pl-2'][contains(.,'$|Companyname|')]").click();
    await page.locator("//button[contains(text(),\" Apply Selected \")]").click();
    await page.waitForLoadState('networkidle');
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("(//button[@type=\"button\"])[last()]").click();
    await page.locator("(//input[@type=\"file\"])[1]").setInputFiles(path.resolve(__dirname, 'test-data', "Bid Maps File,Bid Maps File.xlsx"));
    await page.locator("//span[text()[normalize-space() = \"Map Headers\"]]").click();
    await expect(page.locator("//*[contains(text(),\"This action will save the changes and Move to Next Page\")]")).toBeVisible();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    expect(await page.locator("//div[contains(@class,\"gap-2 header-grid-layout\")]/..//select[@title=\"\"]").textContent() || '').toContain(String("Select"));
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await page.locator("(//button[@type=\"button\"])[last()]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.getByText("No data Found").waitFor({ state: 'visible' });
    await page.locator("//a[@href=\"#/admin/bid-maps/add-new-mapping/header-mapping\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//div[@class=\"flex-grow-1\" and text()=\"Loan Purpose\"]/..//select").selectOption({ label: "Loan Purpose" });
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//div[@class=\"my-2\" and text()=\"Loan Purpose\"]/../..//select")).toHaveValue('');
    vars["PerfectMatchCount"] = vars["PerfectMatch"];
    vars["PartialMatchCount"] = vars["PartialMatch"];
    vars["UnmappedCount"] = vars["UnmappedCount"];
    vars["IncorrectMatchCount"] = vars["IncorrectMatch"];
    if (String(vars["PerfectMatchCount"]) >= String("1")) {
    } else if (String(vars["PartialMatchCount"]) >= String("1")) {
    } else {
      expect(String(vars["IncorrectMatchCount"])).toBe("1");
    }
  });
});
