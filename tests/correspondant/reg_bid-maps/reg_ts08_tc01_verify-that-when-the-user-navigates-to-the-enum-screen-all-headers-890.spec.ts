import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS08_TC01_Verify that when the user navigates to the enum screen, all headers of type enum are fetched, and if the uploaded file contains any values, then the corresponding matched records should ', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile
    const testDataSets: Record<string, string>[] = []; // TODO: Load test data sets

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Smart_Mapper_from_Off_to_On(page, vars);
    await stepGroups.stepGroup_Creation_Of_Bid_Map_Upto_Header_Mapping(page, vars);
    vars["URl bids"] = page.url();
    vars["Count"] = "2";
    // Loop over test data sets in "Enum Type Values." from set1 to set18
for (const testDataSet of testDataSets) {
      await page.reload();
      await page.waitForLoadState('networkidle');
      await page.locator("//span[text()='Enumeration Mapping']").waitFor({ state: 'visible' });
      if (true) /* Element Headers Mapping Field is visible */ {
        vars["Count"] = (parseFloat(String("1")) + parseFloat(String(vars["Count"]))).toFixed(0);
        vars["Enum + vars[Count]"] = await page.locator("//div[@class='flex-grow-1'][contains(.,'@|\nEnum Type|')]").textContent() || '';
      }
    }
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await expect(page.locator("//p[text()[normalize-space() = \"You have unidentified fields do you want to proceed further.\"]]")).toBeVisible();
    await expect(page.locator("//i[contains(@class, 'fa-lg') and contains(@class, 'color-primary') and contains(@class, 'fa-times')]")).toBeVisible();
    await expect(page.locator("//span[text()[normalize-space() = \"Yes, Proceed\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Yes, Proceed\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["BidSampleField"] = "1";
    vars["count"] = String(await page.locator("(//div[@class=\"field-pair col-3\" and not(text()=\"Chase Value\") and not(text()=\"Chase Field\")][1])").count());
    while (parseFloat(String(vars["BidSampleField"])) <= parseFloat(String(vars["count"]))) {
      vars["Bid Sample Names"] = await page.locator("(//div[@class=\"col-2\" and not(text()=\"Bid Sample Field Name\") and not(text()=\"Chase Field\")][1])[$|BidSampleField|]").textContent() || '';
      vars["BidSampleField"] = (parseFloat(String(vars["BidSampleField"])) + parseFloat(String("1"))).toFixed(0);
    }
  });
});
