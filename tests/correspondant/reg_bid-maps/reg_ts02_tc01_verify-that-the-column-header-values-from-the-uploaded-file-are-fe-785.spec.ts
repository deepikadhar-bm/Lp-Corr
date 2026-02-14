import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS02_TC01_Verify that the column header values from the uploaded file are fetched and displayed as bid sample field names in the header mapping screen.', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Smart_Mapper_from_Off_to_On(page, vars);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Navigation_to_Customer_Permission(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"Bid Maps\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//h1[text()=\"Mappings\"]")).toBeVisible();
    await page.locator("//button[text()[normalize-space() = \"Add New Mapping\"]]").click();
    await expect(page.locator("//h5[text()[normalize-space() = \"Create New Map\"]]")).toBeVisible();
    vars["Create New Map"] = new Date().toLocaleDateString('en-US') /* format: dd/MM/yyyy/HH:mm:ss */;
    vars["Create New Map"] = "Testsigma_" + vars["Create New Map"];
    await page.locator("mapName").fill(vars["Create New Map"]);
    await page.locator("//button[@aria-label=\"Create\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//span[contains(.,' $|Create New Map|')]")).toContainText(vars["Create New Map"]);
    await page.locator("//div//div[@id=\"companySelect\"]//div//button[@id=\"multiSelectDropDown\"]").click();
    await page.locator("//span[@class='pl-2'][contains(.,'$|Companyname|')]").click();
    await page.locator("//button[contains(text(),\" Apply Selected \")]").click();
    await expect(page.locator("(//input[@type=\"file\"])[1]")).toHaveValue('');
    await expect(page.getByText(testData["Upload File Text Verification"])).toBeVisible();
    await stepGroups.stepGroup_Rename_File(page, vars);
    await page.waitForLoadState('networkidle');
    await page.locator("(//input[@type=\"file\"])[1]").setInputFiles(path.resolve(__dirname, 'test-data', "Bid Maps File QA - Bidmap_1.xlsx,Bid Maps File QA_-_Bidmap_1(xlsx).xlsx"));
    await page.locator("//span[text()[normalize-space() = \"Map Headers\"]]").click();
    await page.locator("//h5[text()[normalize-space() = \"Save and Move to Next Page\"]]").waitFor({ state: 'visible' });
    await expect(page.locator("//*[contains(text(),\"This action will save the changes and Move to Next Page\")]")).toBeVisible();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText(vars["Create New Map"])).toBeVisible();
    await page.locator("//a[text()[normalize-space() = \"Header Mapping\"]]").waitFor({ state: 'visible' });
    await expect(page.locator("//h1[@class=\"fw-semibold py-3\"]")).toBeVisible();
    vars["BidSampleFieldNameCount"] = String(await page.locator("//i[@class=\"fas fa-pencil-alt\"]").count());
    vars["count"] = "1";
    vars["Columncount"] = "0";
    vars["MappedHeaderCount"] = "0";
    vars["UnmappedHeaderCount"] = "0";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["BidSampleFieldNameCount"]))) {
      await page.reload();
      await page.waitForLoadState('networkidle');
      await page.locator("//span[text()='Enumeration Mapping']").waitFor({ state: 'visible' });
      vars["Header From UI"] = await page.locator("(//input[@type=\"checkbox\"]/../..//div[@class=\"flex-grow-1\"])[$|count|]").textContent() || '';
      vars["MappedDataValue"] = await page.locator("(//div[@class='parent']//fieldset//select[@class='form-select'])[$|count|]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
      if (String(vars["MappedDataValue"]) === String("Select")) {
        vars["UnmappedHeaderCount"] = (parseFloat(String("1")) + parseFloat(String(vars["UnmappedHeaderCount"]))).toFixed(0);
      } else {
        vars["MappedHeaderCount"] = (parseFloat(String("1")) + parseFloat(String(vars["MappedHeaderCount"]))).toFixed(0);
        if (true) /* Verify if Chase Fields Name contains with MappedDataValue */ {
        }
      }
      expect(String(vars["Total Headers From Xls"])).toBe(vars["Header From UI"]);
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
  });
});
