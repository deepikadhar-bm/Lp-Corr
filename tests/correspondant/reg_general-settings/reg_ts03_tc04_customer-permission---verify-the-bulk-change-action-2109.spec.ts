import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_General Settings', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS03_TC04_Customer Permission - Verify the bulk change action.', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[@href=\"#/admin/general-settings/customer-restrictions\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("(//td[@data-title=\"Company Name\" and not(contains(text(),\"Home Sweet Mortgage\"))]/preceding-sibling::td//input[@type=\"checkbox\"])[1]").check();
    await expect(page.locator("(//td[@data-title=\"Company Name\" and not(contains(text(),\"Home Sweet Mortgage\"))]/preceding-sibling::td//input[@type=\"checkbox\"])[1]")).toBeVisible();
    vars["ExpectedCompanyName1"] = await page.locator("(//td[@data-title=\"Company Name\" and not(contains(text(),\"Home Sweet Mortgage\"))])[1]").textContent() || '';
    vars["PreviousStandardStateC1"] = await page.locator("//td[@data-title=\"Company Name\" and contains(text(),\"$|ExpectedCompanyName1|\")]/following-sibling::td[@data-title=\"Standard\"]//div").textContent() || '';
    vars["PreviousChaseStateC1"] = await page.locator("//td[@data-title=\"Company Name\" and contains(text(),\"$|ExpectedCompanyName1|\")]/following-sibling::td[@data-title=\"Chase Direct\"]//div").textContent() || '';
    await page.locator("(//td[@data-title=\"Company Name\" and not(contains(text(),\"Home Sweet Mortgage\"))]/preceding-sibling::td//input[@type=\"checkbox\"])[2]").check();
    await expect(page.locator("(//td[@data-title=\"Company Name\" and not(contains(text(),\"Home Sweet Mortgage\"))]/preceding-sibling::td//input[@type=\"checkbox\"])[2]")).toBeVisible();
    vars["ExpectedCompanyName2"] = await page.locator("(//td[@data-title=\"Company Name\" and not(contains(text(),\"Home Sweet Mortgage\"))])[2]").textContent() || '';
    vars["PreviousStandardStateC2"] = await page.locator("//td[@data-title=\"Company Name\" and contains(text(),\"$|ExpectedCompanyName2|\")]/following-sibling::td[@data-title=\"Standard\"]//div").textContent() || '';
    vars["PreviousChaseStateC2"] = await page.locator("//td[@data-title=\"Company Name\" and contains(text(),\"$|ExpectedCompanyName2|\")]/following-sibling::td[@data-title=\"Chase Direct\"]//div").textContent() || '';
    await page.locator("//button[text()[normalize-space() = \"Bulk Change\"]]").waitFor({ state: 'visible' });
    await page.locator("//button[text()[normalize-space() = \"Bulk Change\"]]").click();
    await page.locator("(//label[normalize-space(text())='Standard']/parent::div//input)[2]").waitFor({ state: 'visible' });
    // [DISABLED] Verify that the element First Company(bulk change pop up) displays text contains ExpectedCompanyName1 and With Scrollable FALSE
    // await expect(page.locator("//span[@class=\"more-clients\"][1]")).toContainText(vars["ExpectedCompanyName1"]);
    vars["ActualFirstCompanyName"] = await page.locator("//span[@class=\"more-clients\"][1]").textContent() || '';
    vars["ActualFirstCompanyName"] = String(vars["ActualFirstCompanyName"]).trim();
    vars["ExpectedNameC1"] = String(vars["ExpectedCompanyName1"]).trim();
    expect(String(vars["ActualFirstCompanyName"])).toBe(vars["ExpectedNameC1"]);
    vars["ActualSecondCompanyName"] = await page.locator("//span[@class=\"more-clients\"][2]").textContent() || '';
    vars["ActualSecondCompanyName"] = String(vars["ActualSecondCompanyName"]).trim();
    vars["ExpectedNameC2"] = String(vars["ExpectedCompanyName2"]).trim();
    expect(String(vars["ActualSecondCompanyName"])).toBe(vars["ExpectedNameC2"]);
    // [DISABLED] Verify that the element Second Company(bulk change popup) displays text contains ExpectedCompanyName2 and With Scrollable FALSE
    // await expect(page.locator("//span[@class=\"more-clients\"][2]")).toContainText(vars["ExpectedCompanyName2"]);
    await stepGroups.stepGroup_Toggle_Radio_Button_Based_on_Current_State_and_Storing_the_U(page, vars);
    // [DISABLED] Split string FirstCompanyName using - and store the 1 into a ExpectedCCode
    // vars["ExpectedCCode"] = String('').split("-")["1"] || '';
    // [DISABLED] Split the FirstCompanyName with the - and store the value from the 2 in the ExpectedCCode
    // vars["ExpectedCCode"] = String(vars["FirstCompanyName"]).split("-")["2"] || '';
    // [DISABLED] Trim white space from ExpectedCCode and store it in a runtime ExpectedCCode
    // vars["ExpectedCCode"] = String(vars["ExpectedCCode"]).trim();
    await expect(page.locator("//td[@data-title=\"Company Name\" and contains(text(),\"$|ExpectedCompanyName1|\")]/following-sibling::td[@data-title=\"Standard\"]//div")).toContainText(vars["ExpectedStandardState"]);
    await expect(page.locator("//td[@data-title=\"Company Name\" and contains(text(),\"$|ExpectedCompanyName1|\")]/following-sibling::td[@data-title=\"Chase Direct\"]//div")).toContainText(vars["ExpectedChaseState"]);
    await expect(page.locator("//td[@data-title=\"Company Name\" and contains(text(),\"$|ExpectedCompanyName2|\")]/following-sibling::td[@data-title=\"Standard\"]//div")).toContainText(vars["ExpectedStandardState"]);
    await expect(page.locator("//td[@data-title=\"Company Name\" and contains(text(),\"$|ExpectedCompanyName2|\")]/following-sibling::td[@data-title=\"Chase Direct\"]//div")).toContainText(vars["ExpectedChaseState"]);
    // [DISABLED] Click on Edit Permissions Button(Company 1)
    // await page.locator("(//td[@data-title=\"Company Name\" and contains(text(),\n\"$|ExpectedCompanyName1|\")]/following-sibling::td[@data-title=\"Actions\"]//button)").click();
    await stepGroups.stepGroup_Toggling_the_Radio_Button_based_on_previous_state(page, vars);
    await stepGroups.stepGroup_Toggling_the_Radio_Button_based_on_previous_state(page, vars);
    // [DISABLED] Enter ExpectedCCode in the Search Filter Input field
    // await page.locator("//div[@class=\"custom-input\"]//input").fill(vars["ExpectedCCode"]);
    // [DISABLED] Enter Freedom in the Search Filter Input field
    // await page.locator("//div[@class=\"custom-input\"]//input").fill("Freedom");
    // [DISABLED] Verify that the element Company Name in Customer Permission displays text contains ExpectedCompanyName and With Scrollable FALSE
    // await expect(page.locator("//td[@data-title=\"Company Name\"]")).toContainText(vars["ExpectedCompanyName"]);
    // [DISABLED] Store the count of elements identified by locator Total Rows Count into a variable RowsCountBeforeClear
    // vars["RowsCountBeforeClear"] = String(await page.locator("(//tbody//tr)[position() >= 1 and position() <= last()]").count());
    // [DISABLED] Verify if RowsCountBeforeClear == 1
    // expect(String(vars["RowsCountBeforeClear"])).toBe("1");
    // [DISABLED] Click on Clear search button(customer permissions)
    // await page.locator("//button[contains(@class, 'search-cancel-btn')]").click();
    // [DISABLED] Wait until the element Spinner is not visible
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Store the count of elements identified by locator Total Rows Count into a variable RowsCountAfterClear
    // vars["RowsCountAfterClear"] = String(await page.locator("(//tbody//tr)[position() >= 1 and position() <= last()]").count());
    // [DISABLED] Verify if RowsCountAfterClear > 1
    // expect(String(vars["RowsCountAfterClear"])).toBe("1");
  });
});
