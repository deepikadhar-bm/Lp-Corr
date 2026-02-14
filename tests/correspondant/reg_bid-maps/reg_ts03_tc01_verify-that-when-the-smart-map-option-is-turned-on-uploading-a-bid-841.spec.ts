import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS03_TC01_Verify that when the smart map option is turned on, uploading a bid file and navigating to the header screen will automatically select the corresponding Chase field name based on the bid', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Smart_Mapper_from_Off_to_On(page, vars);
    await expect(page.locator("//h1[text()=\"Mappings\"]")).toBeVisible();
    await page.locator("//button[text()[normalize-space() = \"Add New Mapping\"]]").click();
    await expect(page.locator("//h5[text()[normalize-space() = \"Create New Map\"]]")).toBeVisible();
    vars["Create New Map"] = new Date().toLocaleDateString('en-US') /* format: dd/MM/yyyy/HH:mm:ss */;
    vars["Create New Map"] = "Testsigma_" + vars["Create New Map"];
    await page.locator("mapName").fill(vars["Create New Map"]);
    await page.locator("//button[@aria-label=\"Create\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText(vars["Create New Map"])).toBeVisible();
    await page.locator("//div//div[@id=\"companySelect\"]//div//button[@id=\"multiSelectDropDown\"]").click();
    await page.locator("((//input[@type=\"checkbox\" and not(contains(@aria-label,\"Home Sweet Mortgage\"))])[position() > 1 and position() < last()])[1]").click();
    await page.locator("//button[contains(text(),\" Apply Selected \")]").click();
    await expect(page.locator("(//input[@type=\"file\"])[1]")).toHaveValue('');
    await expect(page.getByText(testData["Upload File Text Verification"])).toBeVisible();
    await stepGroups.stepGroup_Rename_File(page, vars);
    await page.waitForLoadState('networkidle');
    await page.locator("(//input[@type=\"file\"])[1]").setInputFiles(path.resolve(__dirname, 'test-data', "Bid Maps File,Bid Maps File.xlsx"));
    await page.locator("//span[text()[normalize-space() = \"Map Headers\"]]").click();
    await page.locator("//h5[text()[normalize-space() = \"Save and Move to Next Page\"]]").waitFor({ state: 'visible' });
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText(vars["Create New Map"])).toBeVisible();
    await page.locator("//a[text()[normalize-space() = \"Header Mapping\"]]").waitFor({ state: 'visible' });
    vars["FieldCount"] = String(await page.locator("//div[contains(@class,\"gap-2 header-grid-layout\")]//select").count());
    vars["count"] = "1";
    vars["PerfectMatchCount"] = "0";
    vars["PartialMatchCount"] = "0";
    vars["IncorrectMatchCount"] = "0";
    vars["UnMappedHeaderCount"] = "0";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["FieldCount"]))) {
      vars["Individual BidSample Name"] = await page.locator("(//div[contains(@class,\"gap-2 header-grid-layout\")]//div[@class=\"flex-grow-1\"])[$|count|]").textContent() || '';
      await page.locator("//h1[@class=\"fw-semibold py-3\"]").click();
      vars["IndividualChaseValue"] = await page.locator("(//div[contains(@class,\"gap-2 header-grid-layout\")]//select)[$|count|]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
      if (String(vars["Individual BidSample Name"]) === String(vars["IndividualChaseValue"])) {
        vars["PerfectMatchCount"] = (parseFloat(String("1")) + parseFloat(String(vars["PerfectMatchCount"]))).toFixed(0);
      } else if (String(vars["Individual BidSample Name"]).includes(String(vars["IndividualChaseValue"]))) {
        vars["PartialMatchCount"] = (parseFloat(String("1")) + parseFloat(String(vars["PartialMatchCount"]))).toFixed(0);
      } else if (String(vars["IndividualChaseValue"]) === String("Select")) {
        vars["UnMappedHeaderCount"] = (parseFloat(String("1")) + parseFloat(String(vars["UnMappedHeaderCount"]))).toFixed(0);
      } else {
        vars["IncorrectMatchCount"] = (parseFloat(String("1")) + parseFloat(String(vars["IncorrectMatchCount"]))).toFixed(0);
      }
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    await page.locator("(//input[@type=\"checkbox\"])[2]").check();
    await page.locator("(//input[@type=\"checkbox\"])[2]").uncheck();
    vars["PerfectMatch"] = vars["PerfectMatchCount"];
    vars["PartialMatch"] = vars["PartialMatchCount"];
    vars["UnmappedHeaders"] = vars["UnMappedHeaderCount"];
    vars["IncorrectMatch"] = vars["IncorrectMatchCount"];
    if (String(vars["PerfectMatchCount"]) >= String("1")) {
      expect(String(vars["PerfectMatchCount"])).toBe("1");
    } else {
      expect(String(vars["PartialMatchCount"])).toBe("1");
    }
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await page.locator("(//button[@type=\"button\"])[last()]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    await expect(page.locator("//p[text()[normalize-space() = \"You have unidentified fields do you want to proceed further.\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Yes, Proceed\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Save and Publish\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("(//td[@data-title=\"Status\"])[1]")).toContainText("ACTIVE");
    vars["Version"] = await page.locator("(//td[@data-title=\"Version\"])[1]").textContent() || '';
    await expect(page.getByText(vars["Version"])).toBeVisible();
    vars["Company"] = await page.locator("(//span[@class=\"text-nowrap\"])[1]").textContent() || '';
    await expect(page.getByText(vars["Company"])).toBeVisible();
  });
});
