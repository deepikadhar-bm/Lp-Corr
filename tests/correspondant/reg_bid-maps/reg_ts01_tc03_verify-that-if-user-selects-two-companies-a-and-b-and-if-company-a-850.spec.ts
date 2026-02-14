import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS01_TC03_Verify that if user selects two companies \\\"A and B\\\"  and if Company A has both standard and chase execution type, and company B has only standard execution type -> Now if user select b', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Navigation_to_Customer_Permission(page, vars);
    await stepGroups.stepGroup_Store_Company_Names_from_Company_Permissions(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"Bid Maps\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//button[text()[normalize-space() = \"Add New Mapping\"]]").click();
    await expect(page.locator("//h5[text()[normalize-space() = \"Create New Map\"]]")).toBeVisible();
    vars["Create New Map"] = new Date().toLocaleDateString('en-US') /* format: dd/MM/yyyy:HH:mm:ss */;
    vars["Create New Map"] = "Testsigma_" + vars["Create New Map"];
    await page.locator("mapName").fill(vars["Create New Map"]);
    vars["BidMap"] = await page.locator("mapName").inputValue() || '';
    await page.locator("//button[@aria-label=\"Create\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//span[contains(.,' $|Create New Map|')]")).toContainText(vars["Create New Map"]);
    await page.locator("//div//div[@id=\"companySelect\"]//div//button[@id=\"multiSelectDropDown\"]").click();
    await page.locator("((//input[@type=\"checkbox\" and not(contains(@aria-label,\"Home Sweet Mortgage\"))])[position() > 1 and position() < last()])[1]").check();
    vars["SelectedCompanyName"] = await page.locator("((//input[@type=\"checkbox\" and not(contains(@aria-label,\"Home Sweet Mortgage\"))])[position() > 1 and position() < last()]/..//div)[1]").textContent() || '';
    vars["NotSelectedCompanyName"] = await page.locator("((//input[@type=\"checkbox\" and not(contains(@aria-label,\"Home Sweet Mortgage\"))])[position() > 1 and position() < last()]/..//div)[2]").textContent() || '';
    // [DISABLED] Split the NotSelectedCompanyName with the - and store the value from the 1 in the NotSelectedCompany
    // vars["NotSelectedCompany"] = String(vars["NotSelectedCompanyName"]).split("-")["1"] || '';
    // [DISABLED] Split the NotSelectedCompanyName with the - and store the value from the 2 in the NotSelectedCcode
    // vars["NotSelectedCcode"] = String(vars["NotSelectedCompanyName"]).split("-")["2"] || '';
    // [DISABLED] Remove Special char NotSelectedCompany from NotSelectedCompanyName and store it in runtime NotSelectedCcode
    // vars["NotSelectedCcode"] = String(vars["NotSelectedCompanyName"]).replace(/NotSelectedCompany/g, '');
    // [DISABLED] Store key_blank in Space
    // vars["Space"] = "key_blank";
    // [DISABLED] Store StringFunctions :: Concat in NotSelectedCompanyName
    // vars["NotSelectedCompanyName"] = vars["NotSelectedCompany"] + "," + vars["Space"] + "-" + vars["Space"] + vars["NotSelectedCcode"];
    // [DISABLED] Replace , with Space in the given text NotSelectedCompanyName and store into NotSelectedCompanyName
    // vars[""] = String("NotSelectedCompanyName").replace("", "");
    await expect(page.locator("//div[text()[normalize-space() = \"Show Selected\"]]")).toBeVisible();
    await page.locator("//div[text()[normalize-space() = \"Show Selected\"]]").click();
    await expect(page.locator("//label[@class=\"dropdown-item d-flex checked\"]/div/span")).toContainText(vars["SelectedCompanyName"]);
    await expect(page.getByText(vars["NotSelectedCompanyName"])).not.toBeVisible();
    await expect(page.locator("//div[text()[normalize-space() = \"Show All\"]]")).toBeVisible();
    await page.locator("//div[text()[normalize-space() = \"Show All\"]]").click();
    await expect(page.locator("//label[@class=\"dropdown-item d-flex checked\"]/div/span")).toContainText(vars["SelectedCompanyName"]);
    await expect(page.locator("//label//span[contains(text(),\"$|NotSelectedCompanyName|\")]")).toBeVisible();
    // [DISABLED] Verify that the Dropdown_Company_for_Selected list has option with text NotSelectedCompanyName selected and With Scrollable FALSE
    // await expect(page.locator("//label[@class=\"dropdown-item d-flex checked\"]/div/span")).toHaveValue(vars["NotSelectedCompanyName"]);
    // [DISABLED] Verify that the current page displays text NotSelectedCompanyName
    // await expect(page.getByText(vars["NotSelectedCompanyName"])).toBeVisible();
    await stepGroups.stepGroup_Enter_Company_Name_in_New_Map_Filter(page, vars);
    await expect(page.locator("//span[@class=\"counter bg-white text-primary mx-2 text-center fw-semibold small\"]")).toContainText("2");
    await page.locator("//button[contains(text(),\" Apply Selected \")]").click();
    await expect(page.locator("//select[@aria-label=\"Dropdown selection\"]")).toHaveValue("STANDARD");
    await page.locator("//select[@aria-label=\"Dropdown selection\"]").click();
    await page.locator("//span[text()[normalize-space() = \"BACK\"]]").click();
    await expect(page.locator("//div[text()[normalize-space() = \"You have unsaved changes! If you leave, your changes will be lost.\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Proceed without Saving\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//button[contains(text(),\"$|BidMap|\")]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//div//div[@id=\"companySelect\"]//div//button[@id=\"multiSelectDropDown\"]").click();
    vars["CompanyCount"] = String(await page.locator("(//label[@class='dropdown-item d-flex'])").count());
    await page.locator("//input[@id='chkItemallIdundefined']").check();
    await expect(page.locator("//span[contains(@class,\"counter bg-white text-primary mx-2 text-center fw-semibold small\")]")).toContainText(vars["CompanyCount"]);
    await page.locator("//input[@id='chkItemallIdundefined']").uncheck();
    await expect(page.locator("//input[@id='chkItemallIdundefined']")).toBeVisible();
    await expect(page.locator("//button[contains(text(),\" Apply Selected \")]")).toBeVisible();
    await expect(page.locator("//input[@placeholder=\"Search\"]")).toBeVisible();
    vars["vars[FirstCompanyName]"] = await page.locator("//input[@placeholder=\"Search\"]").textContent() || '';
    await page.locator("//input[@placeholder=\"Search\"]").fill(vars["FirstCompanyName"]);
    await page.locator("//i[contains(@class, 'fa-times')]").click();
    await page.locator("//input[@placeholder=\"Search\"]").fill(vars["SecondCompanyName"]);
    await page.locator("(//input[@type=\"checkbox\"])[1]").click();
    await page.locator("//input[@placeholder=\"Search\"]").clear();
    await expect(page.locator("//input[@placeholder=\"Search\"]")).toHaveValue('');
    await page.locator("//input[@placeholder=\"Search\"]").fill(vars["FirstCompanyName"]);
    await page.locator("(//input[@type=\"checkbox\"])[1]").check();
    await expect(page.locator("//button[contains(text(),\" Apply Selected \")]")).toBeVisible();
  });
});
