import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS12_TC01_Verify that the user can import a rule from the required bid map.', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Smart_Mapper_from_Off_to_On(page, vars);
    await stepGroups.stepGroup_Creation_Of_Bid_Map_Upto_Header_Mapping(page, vars);
    // Write to test data profile: "Import Rule" = vars["Create New Maps"]
    // TODO: Test data profile writes need custom implementation
    await expect(page.locator("//h1[@class=\"fw-semibold py-3\"]")).toBeVisible();
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await page.locator("//h5[text()[normalize-space() = \"Save and Move to Next Page\"]]").waitFor({ state: 'visible' });
    await page.locator("(//button[@type=\"button\"])[last()]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//h1[@class=\"fw-semibold py-3\"]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    await page.locator("//h5[text()[normalize-space() = \"Save and Move to Next Page\"]]").waitFor({ state: 'visible' });
    await stepGroups.stepGroup_IF_Condition_for_Yes_Proceed_Button(page, vars);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Adding_Rules_In_Rules_and_Actions_Screen(page, vars);
    await stepGroups.stepGroup_Add_Actions_in_Rules_and_Actions(page, vars);
    await page.locator("(//span[text()[normalize-space() = \"Duplicate/Copy\"]])[1]").click();
    await expect(page.locator("//h1[@class=\"fw-semibold py-3\"]")).toBeVisible();
    await page.locator("//input[@placeholder=\"Enter a Rule Name\"]").fill(Array.from({length: 1}, () => "a".charAt(Math.floor(Math.random() * 1))).join(''));
    vars["ActiveRuleName"] = await page.locator("//input[@placeholder=\"Enter a Rule Name\"]").inputValue() || '';
    vars["WhenBidFieldEnum"] = await page.locator("(//button[@id=\"singleSelectDropDownWithSearch\"])[2]").textContent() || '';
    await expect(page.locator("(//button[@id=\"singleSelectDropDownWithSearch\"])[2]")).toContainText(vars["WhenBidFieldEnum"]);
    await expect(page.locator("(//div[@class=\"flex-grow-1 text-start text-truncate\"])[5]")).toBeVisible();
    await expect(page.locator("(//div[@class=\"flex-grow-1 text-start text-truncate\"])[6]")).toBeVisible();
    await expect(page.locator("(//select[@class=\"form-select\"])[5]")).toBeVisible();
    await expect(page.locator("(//select[@class=\"form-select\"])[6]")).toBeVisible();
    vars["First Active Rule Name"] = await page.locator("(//input[@placeholder=\"Enter a Rule Name\"])[1]").inputValue() || '';
    vars["First Active Rule Multiselected Value"] = await page.locator("(//button[@id=\"multiSelectDropDown\"])[1]").textContent() || '';
    vars["Bid Field Selected Option From Active 1st Rule"] = await page.locator("(//label[text()=' When Bid Field '])[1]/..//button[@id=\"singleSelectDropDownWithSearch\"]").textContent() || '';
    vars[" Bid Enumerated Tape Value Selected Option From Active 1st Rule"] = await page.locator("(//label[text()=' Bid Enumerated Tape Value '])[1]/..//button[@id=\"singleSelectDropDownWithSearch\"]").textContent() || '';
    vars["Chase Field Name Selected Option From Active 1st Rule"] = await page.locator("(//label[text()='Chase Field Name'])[1]/..//select[@id=\"id\"]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
    vars["Chase Value Selected Option From Active 1st Rule"] = await page.locator("(//label[text()='Chase Value'])[1]/..//select[@id=\"id\"]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
    vars["Second Active Rule Name"] = await page.locator("(//input[@placeholder=\"Enter a Rule Name\"])[2]").inputValue() || '';
    vars["Second Active Rule Multiselected Value"] = await page.locator("(//button[@id=\"multiSelectDropDown\"])[2]").textContent() || '';
    vars["Bid Field Selected Option From Active 2nd Rule"] = await page.locator("(//label[text()=' When Bid Field '])[2]/..//button[@id=\"singleSelectDropDownWithSearch\"]").textContent() || '';
    vars[" Bid Enumerated Tape Value Selected Option From Active 2nd Rule"] = await page.locator("(//label[text()=' Bid Enumerated Tape Value '])[2]/..//button[@id=\"singleSelectDropDownWithSearch\"]").textContent() || '';
    vars["Chase Field Name Selected Option From Active 2nd Rule"] = await page.locator("(//label[text()='Chase Field Name'])[2]/..//select[@id=\"id\"]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
    vars["Chase Value Selected Option From Active 2nd Rule"] = await page.locator("(//label[text()='Chase Value'])[2]/..//select[@id=\"id\"]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
    await page.locator("//span[text()[normalize-space() = \"Save and Publish\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["Version"] = await page.locator("(//td[@data-title=\"Version\"])[1]").textContent() || '';
    await expect(page.locator("(//td[@data-title=\"Version\"])[1]")).toContainText(vars["Version"]);
    await page.locator("//button[contains(text(),\"$|BidMap|\")]").click();
    await page.locator("//span[text()[normalize-space() = \"Map Headers\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await expect(page.locator("//p[text()[normalize-space() = \"You have unidentified fields do you want to proceed further.\"]]")).toBeVisible();
    await page.locator("(//button[@type=\"button\"])[last()]").click();
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    await expect(page.locator("//p[text()[normalize-space() = \"You have unidentified fields do you want to proceed further.\"]]")).toBeVisible();
    await page.locator("(//button[@type=\"button\"])[last()]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("(//span[text()[normalize-space() = \"Duplicate/Copy\"]])[1]").click();
    await page.locator("(//input[@placeholder=\"Enter a Rule Name\"])[2]").scrollIntoViewIfNeeded();
    await page.locator("(//input[@placeholder=\"Enter a Rule Name\"])[3]").fill(Array.from({length: 1}, () => "A".charAt(Math.floor(Math.random() * 1))).join(''));
    vars["Rule_Name"] = await page.locator("(//input[@placeholder=\"Enter a Rule Name\"])[3]").inputValue() || '';
    await expect(page.locator("(//button[@id=\"singleSelectDropDownWithSearch\"])[5]")).toBeVisible();
    await expect(page.locator("(//div[@class=\"flex-grow-1 text-start text-truncate\"])[8]")).toBeVisible();
    await expect(page.locator("(//div[@class=\"flex-grow-1 text-start text-truncate\"])[9]")).toBeVisible();
    await expect(page.locator("(//*[text()=\"Chase Field Name\"]/..//select)[last()]")).toBeVisible();
    await expect(page.locator("(//*[text()=\"Chase Value\"]/..//select)[last()]")).toBeVisible();
    vars["Draft Rule Name"] = await page.locator("(//input[@placeholder=\"Enter a Rule Name\"])[3]").inputValue() || '';
    vars["Draft Rule Multiselected Value"] = await page.locator("(//button[@id=\"multiSelectDropDown\"])[3]").textContent() || '';
    vars["Bid Field Selected Option From Draft Rule"] = await page.locator("(//label[text()=' When Bid Field '])[3]/..//button[@id=\"singleSelectDropDownWithSearch\"]").textContent() || '';
    vars[" Bid Enumerated Tape Value Selected Option From Draft Rule"] = await page.locator("(//label[text()=' Bid Enumerated Tape Value '])[3]/..//button[@id=\"singleSelectDropDownWithSearch\"]").textContent() || '';
    vars["Chase Field Name Selected Option From Draft Rule"] = await page.locator("(//label[text()='Chase Field Name'])[3]/..//select[@id=\"id\"]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
    vars["Chase Value Selected Option From Draft Rule"] = await page.locator("(//label[text()='Chase Value'])[3]/..//select[@id=\"id\"]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
    await page.locator("//div[contains(@class, 'container') and contains(@class, 'd-flex')]/div[2]/button[2]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Exit\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["StatusInListScreen"] = await page.locator("//td[@data-title=\"Map Name\"]//button[text()=\" $|Create New Maps| \"]/../..//td[@data-title=\"Status\"]//*[text()=\"ACTIVE\"]/..//*[text()=\"DRAFT\"]").textContent() || '';
    await expect(page.locator("//td[@data-title=\"Map Name\"]//button[text()=\" $|Create New Maps| \"]/../..//td[@data-title=\"Status\"]//*[text()=\"ACTIVE\"]/..//*[text()=\"DRAFT\"]")).toContainText(vars["StatusInListScreen"]);
  });
});
