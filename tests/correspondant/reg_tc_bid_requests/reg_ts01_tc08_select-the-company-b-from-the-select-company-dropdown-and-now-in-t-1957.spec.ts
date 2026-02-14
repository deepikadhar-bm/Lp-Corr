import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS01_TC08_Select the Company B\\\" from the \\\'Select company\\\" dropdown and now in the \\\"Bid mapping id\\\" dropdown verify that the bid map names that are not associated with this company should not ', async ({ page }) => {
    // Prerequisite: REG_TS01_TC07_Select the Company B" from the 'Select company" dropdown and now in the "Bid mapping i
    // TODO: Ensure prerequisite test passes first

    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    // [DISABLED] Login to CORR Portal
    // await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    // [DISABLED] Create Bid Map
    // await stepGroups.stepGroup_Create_Bid_Map(page, vars);
    // [DISABLED] Wait until the element Spinner is not visible
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Click on Select Company/s Dropdown
    // await page.locator("//div//div[@id=\"companySelect\"]//div//button[@id=\"multiSelectDropDown\"]").click();
    // [DISABLED] Enter Company Name in the Search_Text field
    // await page.locator("(//div[@class=\"mb-0 overflow-hidden\"])[1]/../..//input[@placeholder=\"Search\"]").fill(testData["Company Name"]);
    // [DISABLED] Click on Select Company Names
    // await page.locator("//span[@class='pl-2'][contains(.,'@|Company name 1|')]").click();
    // [DISABLED] Click on Apply Selected
    // await page.locator("//button[contains(text(),\" Apply Selected \")]").click();
    // [DISABLED] Click on Select Company/s Dropdown
    // await page.locator("//div//div[@id=\"companySelect\"]//div//button[@id=\"multiSelectDropDown\"]").click();
    // [DISABLED] Enter Company Name. in the Search_Text field
    // await page.locator("(//div[@class=\"mb-0 overflow-hidden\"])[1]/../..//input[@placeholder=\"Search\"]").fill(testData["Company Name."]);
    // [DISABLED] Click on Select_Company_Name
    // await page.locator("//span[@class='pl-2'][contains(.,'@|Company name 2|')]").click();
    // [DISABLED] Verify that the element Apply selected  Number displays text 2 and With Scrollable FALSE
    // await expect(page.locator("//span[@class=\"counter bg-white text-primary mx-2 text-center fw-semibold small\"]")).toContainText("2");
    // [DISABLED] Click on Apply Selected
    // await page.locator("//button[contains(text(),\" Apply Selected \")]").click();
    // [DISABLED] Upload file DeepikaAugBidQA.xlsx,DeepikaAugBidQA.xlsx using the element Upload File
    // await page.locator("(//input[@type=\"file\"])[1]").setInputFiles(path.resolve(__dirname, 'test-data', "DeepikaAugBidQA.xlsx,DeepikaAugBidQA.xlsx"));
    // [DISABLED] Click on Map Headers Button
    // await page.locator("//span[text()[normalize-space() = \"Map Headers\"]]").click();
    // [DISABLED] Verify that the element This action will save the changes and Move to Next Page is displayed and With Scrollable FALSE
    // await expect(page.locator("//*[contains(text(),\"This action will save the changes and Move to Next Page\")]")).toBeVisible();
    // [DISABLED] Click on Proceed with Saving Button
    // await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    // [DISABLED] Wait until the element Spinner is not visible
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Click on Enumeration Mapping Button
    // await page.locator("//span[text()='Enumeration Mapping']").click();
    // [DISABLED] Verify that the element You have unidentified fields do you want to proceed Further. is displayed and With Scrollable FALSE
    // await expect(page.locator("//p[text()[normalize-space() = \"You have unidentified fields do you want to proceed further.\"]]")).toBeVisible();
    // [DISABLED] Click on Yes, Proceed Button.
    // await page.locator("//span[text()[normalize-space() = \"Yes, Proceed\"]]").click();
    // [DISABLED] Wait until the element Spinner is not visible
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Click on Rules and Actions Button
    // await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    // [DISABLED] Verify that the element You have unidentified fields do you want to proceed Further. is displayed and With Scrollable FALSE
    // await expect(page.locator("//p[text()[normalize-space() = \"You have unidentified fields do you want to proceed further.\"]]")).toBeVisible();
    // [DISABLED] Click on Yes, Proceed Button.
    // await page.locator("//span[text()[normalize-space() = \"Yes, Proceed\"]]").click();
    // [DISABLED] Wait until the element Spinner is not visible
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Click on Save and Publish Button
    // await page.locator("//span[text()[normalize-space() = \"Save and Publish\"]]").click();
    // [DISABLED] Wait until the element Spinner is not visible
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Click on +1more
    // await page.locator("//a[text()[normalize-space() = \"+1\"]]").click();
    // [DISABLED] Verify that the current page displays text Create Bid Map
    // await expect(page.getByText(vars["Create Bid Map"])).toBeVisible();
    // [DISABLED] Verify that the element Company1 displays text Company Name and With Scrollable FALSE
    // await expect(page.locator("(//td[@data-title='Company'][contains(.,'@|Company Name|')])[18]")).toContainText(testData["Company Name"]);
    // [DISABLED] Verify that the element Company2 displays text Company Name. and With Scrollable FALSE
    // await expect(page.locator("//td[@data-title='Company'][contains(.,'@|Company Name.|')]")).toContainText(testData["Company Name."]);
    // [DISABLED] Click on Close Button
    // await page.locator("//button[@class=\"btn bg-transparent border-0 m-0\"]").click();
    // [DISABLED] Wait until the current page is loaded completely
    // await page.waitForLoadState('networkidle');
    await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//button[text()[normalize-space() = \"Upload New Bid Request\"]]")).toBeVisible();
    await page.locator("//button[text()[normalize-space() = \"Upload New Bid Request\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["Company3"] = await page.locator("(//div[@class=\"dropdown-overflow\"]//span[not(contains(text(),\"@|Company name 1|\") or contains(text(),\"@|Company name 2|\"))])[1]").textContent() || '';
    await page.locator("//div[text()[normalize-space() = \"Select\"]]").click();
    await page.locator("(//div[@class=\"dropdown-overflow\"]//span[not(contains(text(),\"@|Company name 1|\") or contains(text(),\"@|Company name 2|\"))])[1]").click();
    // [DISABLED] Enter CompanyName3 in the Search_Text field
    // await page.locator("(//div[@class=\"mb-0 overflow-hidden\"])[1]/../..//input[@placeholder=\"Search\"]").fill(testData["CompanyName3"]);
    // [DISABLED] Click on Select_CompanyNames
    // await page.locator("//button[@class='dropdown-item d-flex'][contains(.,'@|CompanyName3|')]").click();
    vars["3rdcompany"] = await page.locator("//div[@class=\"form-control p-0\"]//button//div").textContent() || '';
    expect(String(vars["3rdcompany"])).toBe(vars["Company3"]);
    // [DISABLED] Verify that the Company Selected(Select Company Dropdwn) list has option with text Company3 selected and With Scrollable FALSE
    // await expect(page.locator("//div[@class=\"form-control p-0\"]//button//div")).toHaveValue(vars["Company3"]);
    // [DISABLED] Verify that the element Company Selected(Select Company Dropdwn) displays text contains Company3 and With Scrollable FALSE
    // await expect(page.locator("//div[@class=\"form-control p-0\"]//button//div")).toContainText(vars["Company3"]);
    await page.locator("//div[text()[normalize-space() = \"Select Mapping\"]]").click();
    await page.locator("//div[contains(@class, 'shadow') and contains(@class, 'dropdown-menu') and contains(@class, 'show')]//input[@placeholder=\"Search\"]").fill(vars["CreatedBidMap"]);
    await expect(page.locator("(//button[contains(@class, 'dropdown-item') and contains(@class, 'd-flex')])[57]")).toBeVisible();
  });
});
