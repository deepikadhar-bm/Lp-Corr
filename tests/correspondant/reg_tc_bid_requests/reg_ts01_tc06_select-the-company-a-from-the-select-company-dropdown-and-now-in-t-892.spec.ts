import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS01_TC06_Select the \\\"Company A\\\" from the \\\'Select company\\\" dropdown and now in the \\\"Bid mapping id\\\" dropdown verify that the associated bid map names are being displayed here. [ Verify atlea', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Create_Bid_MapsCompanies_verification(page, vars);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//div//div[@id=\"companySelect\"]//div//button[@id=\"multiSelectDropDown\"]").click();
    await page.locator("//input[@placeholder=\"Search\"]").fill(testData["Company name 1"]);
    await page.locator("//span[@class='pl-2'][contains(.,'@|Company name 1|')]").click();
    await page.locator("//button[contains(text(),\" Apply Selected \")]").click();
    await page.locator("//div//div[@id=\"companySelect\"]//div//button[@id=\"multiSelectDropDown\"]").click();
    await page.locator("//input[@placeholder=\"Search\"]").fill(testData["Company name 2"]);
    await page.locator("//span[@class='pl-2'][contains(.,'@|Company name 2|')]").click();
    await expect(page.locator("//span[@class=\"counter bg-white text-primary mx-2 text-center fw-semibold small\"]")).toContainText("2");
    await page.locator("//button[contains(text(),\" Apply Selected \")]").click();
    await page.locator("(//input[@type=\"file\"])[1]").setInputFiles(path.resolve(__dirname, 'test-data', "DeepikaAugBidQA.xlsx,DeepikaAugBidQA.xlsx"));
    await page.locator("//span[text()[normalize-space() = \"Map Headers\"]]").click();
    await expect(page.locator("//*[contains(text(),\"This action will save the changes and Move to Next Page\")]")).toBeVisible();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await expect(page.locator("//p[text()[normalize-space() = \"You have unidentified fields do you want to proceed further.\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Yes, Proceed\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Wait until the element You have unidentified fields do you want to proceed Further. is visible
    // await page.locator("//p[text()[normalize-space() = \"You have unidentified fields do you want to proceed further.\"]]").waitFor({ state: 'visible' });
    // [DISABLED] Verify that the element You have unidentified fields do you want to proceed Further. displays text You have unidentified fields do you want to proceed further. and With Scrollable FALSE
    // await expect(page.locator("//p[text()[normalize-space() = \"You have unidentified fields do you want to proceed further.\"]]")).toContainText("You have unidentified fields do you want to proceed further.");
    await expect(page.locator("//p[text()[normalize-space() = \"You have unidentified fields do you want to proceed further.\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Yes, Proceed\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Save and Publish\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//button[text()[normalize-space() = \"Upload New Bid Request\"]]")).toBeVisible();
    await page.locator("//button[text()[normalize-space() = \"Upload New Bid Request\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//div[text()[normalize-space() = \"Select\"]]").click();
    await page.locator("//div[text()=\" Select \"]/../../../following-sibling::div//input[@placeholder=\"Search\"]").fill(testData["Company name 1"]);
    await page.locator("//button[@class='dropdown-item d-flex'][contains(.,'@|Company name 1|')]").click();
    await expect(page.getByText(testData["Company name 1"])).toBeVisible();
    await page.locator("//div[text()[normalize-space() = \"Select Mapping\"]]").click();
    await page.locator("//div[contains(@class, 'shadow') and contains(@class, 'dropdown-menu') and contains(@class, 'show')]//input[@placeholder=\"Search\"]").fill(vars["CreatedBidMap"]);
    await page.locator("(//div[@class=\"dropdown-overflow\"])[2]/button[@role=\"option\"]//div/span[@title=\"$|CreatedBidMap|\"]").waitFor({ state: 'visible' });
    // [DISABLED] Wait until the current page is loaded completely
    // await page.waitForLoadState('networkidle');
    // [DISABLED] Verify that the element Searched Data in List has value CreatedBidMap for title and With Scrollable FALSE
    // await expect(page.locator("(//div[@class=\"dropdown-overflow\"])[2]/button[@role=\"option\"]//div/span[@title=\"$|CreatedBidMap|\"]")).toHaveAttribute('title', vars["CreatedBidMap"]);
  });
});
