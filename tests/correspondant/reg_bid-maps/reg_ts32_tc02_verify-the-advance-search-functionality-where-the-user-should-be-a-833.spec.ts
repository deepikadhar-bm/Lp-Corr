import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';
import { testDataManager } from 'testdata/TestDataManager'; 

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS32_TC02_Verify the advance search functionality, where the user should be able to perform search action based on the rules and actions.', async ({ page }) => {
    //const testData: Record<string, string> = {}; // TODO: Load from test data profile
    //const testData: Record<string, string> = testDataManager.getTestData('REG_TS32_TC02'); // Load test data profile
      // GLOBAL LEVEL: Get the profile once 

  const profileName = "Bid_Maps"; 

    const profile = testDataManager.getProfileByName(profileName); 
  // Transfer data from JSON to the vars object used by the test 
     if (profile && profile.data && profile.data.length > 0) { 

      const dataRow = profile.data[0]; 

      console.log("Data row for '" + profileName + "': ", dataRow); 

    vars["Advanced Search"] = dataRow["Advanced Search"] ; // Example of accessing test data
    console.log("Value for 'Advanced Search': ", vars["Advanced Search"]);
    console.log("Advanced in caps " + vars["Advanced Search"].toUpperCase() );
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await expect(page.locator("//h3[text()[normalize-space() = 'Dashboard']]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = 'Administration']]").click();
    await page.locator("//span[text()[normalize-space() = 'Bid Maps']]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//input[@placeholder='Search/Filter']").click();
    await page.locator("//a[text()[normalize-space() = 'Try Advanced Search and Filter option']]").click();
    await expect(page.locator("//*[text()[normalize-space() = 'Advanced Search/Filter']]")).toBeVisible();
    // await page.locator("//label[text()='If Bid Field']/../..//select/ancestor::div//*[@aria-label='Bid Map Field']//select").click();
    //const selectLocator = page.locator("//app-single-select-dropdown[@aria-label='Bid Map Field']//select");
    // await selectLocator.getByLabel
    //await selectLocator.selectOption({ label: vars["Advanced Search"].toUpperCase()  });

    // await page.locator("//label[text()='If Bid Field']/../..//select/ancestor::div//*[@aria-label='Bid Map Field']//select").selectOption({ label: vars["Advanced Search"].toUpperCase()  });

    // 1. Locate the select element
    const dropdown = page.locator('//app-single-select-dropdown[@aria-label="Bid Map Field"]//select');

// 2. Select by the 'value' attribute (even if the menu looks weird or invisible)
    await dropdown.selectOption({ value: vars["Advanced Search"].toUpperCase()  });

// 3. Verify it worked (this confirms the value changed in the background)
    await expect(dropdown).toHaveValue(vars["Advanced Search"].toUpperCase());
    await page.locator("//div[@aria-labelledby='rulesGroup']/following-sibling::div//*[@aria-label='LP Field Value']//input").fill(Array.from({length: 5}, () => "ab".charAt(Math.floor(Math.random() * 2))).join(''));
    console.log("Selected value for 'If Bid Field': ", vars["Advanced Search"].toUpperCase());
    //await page.locator("//label[text()='Chase value']/../..//*[@aria-label='LP Field Type']//select").selectOption({  value: vars["Advanced Search"].toUpperCase() });
    const dropdown1 = page.locator('//app-single-select-dropdown[@aria-label="LP Field Type"]//select');

// 2. Select by the 'value' attribute (even if the menu looks weird or invisible)
    await dropdown1.selectOption({ label: vars["Advanced Search"]  });
    console.log("Selected value for 'LP Field Type': ", vars["Advanced Search"]);

// 3. Verify it worked (this confirms the value changed in the background)
    //await expect(dropdown1).toHaveValue(vars["Advanced Search"].toUpperCase());
    await page.locator("(//label[text()='Chase value'])[2]/../..//*[@aria-label='LP Field Value']//input").fill(Array.from({length: 5}, () => "ab".charAt(Math.floor(Math.random() * 2))).join(''));
    await page.locator("//span[text()[normalize-space() = 'Show Results']]").click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator("//td[text()[normalize-space() = 'No result']]")).toBeVisible();
     }
  });

});
