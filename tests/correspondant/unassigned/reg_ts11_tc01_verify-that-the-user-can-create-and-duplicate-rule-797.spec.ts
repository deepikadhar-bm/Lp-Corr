import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS11_TC01_Verify that the user can Create and Duplicate rule.', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Smart_Mapper_from_Off_to_On(page, vars);
    await stepGroups.stepGroup_Creation_Of_Bid_Map_Upto_Header_Mapping(page, vars);
    await expect(page.locator("//h1[@class=\"fw-semibold py-3\"]")).toBeVisible();
    vars["Count of the Bid Sample"] = String(await page.locator("//input[@aria-label=\"Enable or disable header\"]/../..//div[contains(@class,\"flex-grow\")]").count());
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["Count of the Bid Sample"]))) {
      vars["Bid Sample Value"] = await page.locator("(//input[@aria-label=\"Enable or disable header\"]/../..//div[contains(@class,\"flex-grow\")])[$|count|]").textContent() || '';
      for (let dataIdx = parseInt(vars["count"]); dataIdx <= parseInt(vars["count"]); dataIdx++) {
        // Write to test data profile: "HeaderMapping" = vars["Bid Sample Value"]
        // TODO: Test data profile writes need custom implementation
        vars["count"] = (parseFloat(String(vars["count"])) + parseFloat(String("1"))).toFixed(0);
        await page.locator("//h1[text()=' Header Mapping / ']").click();
      }
    }
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await expect(page.locator("//p[text()[normalize-space() = \"You have unidentified fields do you want to proceed further.\"]]")).toBeVisible();
    await page.locator("(//button[@type=\"button\"])[last()]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//h1[@class=\"fw-semibold py-3\"]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    await expect(page.locator("//p[text()[normalize-space() = \"You have unidentified fields do you want to proceed further.\"]]")).toBeVisible();
    await page.locator("(//button[@type=\"button\"])[last()]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//h1[@class=\"fw-semibold py-3\"]")).toBeVisible();
    await page.locator("//button[text()[normalize-space() = \"Add Rule\"]]").click();
    await page.locator("//label[text()=' When Bid Field ']/..//button[@id=\"singleSelectDropDownWithSearch\"]").waitFor({ state: 'visible' });
    await page.locator("//label[text()=' When Bid Field ']/..//button[@id=\"singleSelectDropDownWithSearch\"]").click();
    vars["total"] = "1";
    vars["Count of the Bid Field Options"] = String(await page.locator("//button[@class=\"dropdown-item d-flex\" and not(@aria-label=\"Select text option\")]//span[@class=\"pl-2\"]").count());
    while (parseFloat(String(vars["total"])) <= parseFloat(String(vars["Count of the Bid Field Options"]))) {
      vars["Option under When Bid Field"] = await page.locator("(//button[@class=\"dropdown-item d-flex\" and not(@aria-label=\"Select text option\")]//span[@class=\"pl-2\"])[$|total|]").textContent() || '';
      for (let dataIdx = parseInt(vars["total"]); dataIdx <= parseInt(vars["total"]); dataIdx++) {
        expect(String(vars["Option under When Bid Field"])).toBe(testData["HeaderMapping"]);
        await page.locator("//h1[text()=\" Rules and Actions / \"]").click();
        vars["total"] = (parseFloat(String(vars["total"])) + parseFloat(String("1"))).toFixed(0);
      }
    }
    await page.locator("//span[text()[normalize-space() = \"Save and Publish\"]]").click();
    await page.getByText("Rules and Actions").waitFor({ state: 'visible' });
    await page.locator("//span[text()[normalize-space() = \"Continue Editing\"]]").click();
    await page.locator("//div[text()[normalize-space() = \"Rule Name is required.\"]]").waitFor({ state: 'visible' });
    await expect(page.locator("//button[@id=\"singleSelectDropDownWithSearch\"]/parent::div[contains(@class,\"form-control p-0 danger\")]")).toBeVisible();
    await expect(page.locator("(//button[@id=\"singleSelectDropDownWithSearch\"]/parent::div[contains(@class,\"form-control p-0 danger\")])[last()]")).toBeVisible();
    await expect(page.locator("//select[@id=\"id\" and @class=\"form-select danger\"]")).toBeVisible();
    await expect(page.locator("//select[@id=\"id\" and @class=\"form-select danger\"]")).toBeVisible();
    await stepGroups.stepGroup_Reading_Column_Data_from_XLS(page, vars);
    await stepGroups.stepGroup_Fetching_Income_Value_From_XLS(page, vars);
    await page.locator("//label[text()=' When Bid Field ']/..//button[@id=\"singleSelectDropDownWithSearch\"]").click();
    await page.locator("//input[@aria-label=\"Search options\"]").waitFor({ state: 'visible' });
    await page.locator("//input[@aria-label=\"Search options\"]").fill("Income (Monthly)");
    await page.locator("//span[@title=\"Income (Monthly)\"]").click();
    await expect(page.locator("(//div[@class=\"flex-grow-1 text-start text-truncate\"])[2]")).toContainText("Income (Monthly)");
    await page.locator("//label[text()=' Bid Enumerated Tape Value ']/..//button[@id=\"singleSelectDropDownWithSearch\"]").click();
    vars["income Value From UI"] = await page.locator("//label[text()=' Bid Enumerated Tape Value ']/..//button[@id=\"singleSelectDropDownWithSearch\"]/../../..//span[@class=\"pl-2\" and not(@title=\"Select\")]").textContent() || '';
    expect(String(vars["income Value From UI"])).toBe(testData["same Income"] /* set: 02 */);
    await page.locator("//input[@placeholder=\"Enter a Rule Name\"]").fill(testData["Rule Name"]);
    vars["RuleName"] = await page.locator("//input[@placeholder=\"Enter a Rule Name\"]").inputValue() || '';
    expect(String(testData["Rule Name"])).toBe(vars["RuleName"]);
    await page.locator("//div[text()[normalize-space() = \"Select Category\"]]").click();
    vars["SelectCategory"] = await page.locator("(//div[@class=\"cursor-pointer py-3 text-wrap\"])[2]").inputValue() || '';
    await page.locator("(//input[@type=\"checkbox\"])[2]").check();
    await page.locator("//button[contains(normalize-space(),\"Apply Selected 1\")]").click();
    // [DISABLED] Verify that the current page displays text SelectCategory
    // await expect(page.getByText(vars["SelectCategory"])).toBeVisible();
    await expect(page.locator("//h6[text()[normalize-space() = \"Add Conditions\"]]")).toBeVisible();
    await page.locator("//select[contains(normalize-space(),\"Select = != > < >= <= contains\")]").selectOption({ label: "LESS" });
    await expect(page.locator("//select[contains(normalize-space(),\"Select = != > < >= <= contains\")]")).toBeVisible();
    await page.locator("//label[text()[normalize-space() = \"Bid Enumerated Tape Value\"]]/following-sibling::div[contains(@class, 'd-flex')]//div[text()[normalize-space() = \"Select\"]]").click();
    await page.locator("(//label[text()[normalize-space() = \"Bid Enumerated Tape Value\"]]/following-sibling::div[contains(@class, 'd-flex')]//div[@aria-labelledby=\"singleSelectDropDown\"]//input[@type=\"search\"])[1]").click();
    await page.locator("(//input[@type=\"search\"])[2]").fill(testData["BidEnumeratedTapeValue"]);
    await expect(page.locator("(//input[@type=\"search\"])[2]")).toHaveValue(testData["BidEnumeratedTapeValue"]);
    await page.locator("//a[text()=\"Select\"]").click();
    await expect(page.locator("(//label[text()=\" Bid Enumerated Tape Value \"]/..//div[contains(@class,\"flex-grow-1 text-start\")])[1]")).toContainText(testData["BidEnumeratedTapeValue"]);
    await expect(page.locator("//button[text()[normalize-space() = \"Add OR Block\"]]")).toBeVisible();
    await page.locator("//button[text()[normalize-space() = \"Add OR Block\"]]").click();
    await page.locator("//label[text()[normalize-space() = \"When Bid Field\"]]/following-sibling::div[contains(@class, 'd-flex')]//div[text()[normalize-space() = \"Select\"]]").click();
    await page.locator("(//input[@type=\"search\"])[3]").click();
    await page.locator("(//input[@type=\"search\"])[3]").fill(testData["Bid Field"]);
    vars["Bid Field"] = await page.locator("(//input[@type=\"search\"])[3]").inputValue() || '';
    await expect(page.locator("(//span[@title='$|Bid Field|'])[2]")).toContainText(vars["Bid Field"]);
    await page.locator("(//span[@title=\"Base Loan Amount\"])[2]").click();
    await expect(page.locator("(//div[@class=\"flex-grow-1 text-start text-truncate\"])[4]")).toContainText(vars["Bid Field"]);
    await page.locator("(//select[contains(normalize-space(),\"Select = != > < >= <= contains\")])[2]").selectOption({ label: "LESS" });
    await expect(page.locator("(//select[contains(normalize-space(),\"Select = != > < >= <= contains\")])[2]")).toBeVisible();
    await page.locator("(//div[text()[normalize-space() = \"Select\"]])[1]").click();
    await page.locator("(//button[contains(@class, 'dropdown-item') and contains(@class, 'd-flex')])[93]").click();
    await expect(page.locator("(//div[@class=\"flex-grow-1 text-start text-truncate\"])[5]")).toBeVisible();
    await expect(page.locator("(//button[text()[normalize-space() = \"Add Condition\"]])[2]")).toBeVisible();
    await page.locator("(//button[text()[normalize-space() = \"Add Condition\"]])[2]").click();
    await page.locator("(//div[text()=\" Select \"])[1]").click();
    await page.locator("(//input[@type=\"search\"])[5]").click();
    await page.locator("(//input[@type=\"search\"])[5]").fill(testData["BidFields"]);
    await expect(page.locator("(//input[@type=\"search\"])[5]")).toHaveValue(testData["BidFields"]);
    await page.locator("//a[text()=\"Select\"]").click();
    await expect(page.locator("(//div[@class=\"flex-grow-1 text-start text-truncate\"])[6]")).toContainText(testData["BidFields"]);
    await page.locator("(//div[text()=\" Select \"])").click();
    await page.locator("(//input[@type=\"search\"])[6]").click();
    await page.locator("(//input[@type=\"search\"])[6]").fill(testData["Bid Enumerated Tape Value"]);
    await expect(page.locator("(//input[@type=\"search\"])[6]")).toHaveValue(testData["Bid Enumerated Tape Value"]);
    await page.locator("//a[text()=\"Select\"]").click();
    await expect(page.locator("(//div[@class=\"flex-grow-1 text-start text-truncate\"])[7]")).toContainText(testData["Bid Enumerated Tape Value"]);
    await expect(page.locator("(//button[text()[normalize-space() = \"Add Condition\"]])[2]")).toBeVisible();
    await page.locator("(//button[text()[normalize-space() = \"Add Condition\"]])[2]").click();
    await page.locator("(//div[text()=\" Select \"])[1]").click();
    await page.locator("(//input[@type=\"search\"])[7]").click();
    await page.locator("(//input[@type=\"search\"])[7]").fill(testData["BidFields."]);
    await expect(page.locator("(//span[@title='@|BidFields.|'])[4]")).toContainText(testData["BidFields."]);
    await page.locator("(//button[contains(@class, 'dropdown-item') and contains(@class, 'd-flex')])[141]").click();
    await page.locator("(//select[contains(normalize-space(),\"Select = != > < >= <= contains\")])[4]").selectOption({ label: "LESS_OR_EQUAL" });
    await expect(page.locator("(//select[contains(normalize-space(),\"Select = != > < >= <= contains\")])[4]")).toBeVisible();
    await page.locator("(//div[text()=\" Select \"])").click();
    await page.locator("(//button[contains(@class, 'dropdown-item') and contains(@class, 'd-flex')])[184]").click();
    await expect(page.locator("//h6[text()[normalize-space() = \"Add Actions\"]]")).toBeVisible();
    vars["Chasefield_action"] = await page.locator("((//*[text()=\"Chase Field Name\"]/..//select)[1]/../..//option)[17]").textContent() || '';
    vars["Chasefield_action"] = String(vars["Chasefield_action"]).trim();
    await page.locator("(//select[@id=\"id\"])[5]").selectOption({ index: parseInt("16") });
    await expect(page.locator("(//select[@id=\"id\"])[5]")).toHaveValue(vars["Chasefield_action"]);
    await page.locator("//select[contains(normalize-space(),\"Select False True\")]").selectOption({ label: testData["Chase  Values"] });
    await expect(page.locator("//select[contains(normalize-space(),\"Select False True\")]")).toContainText("False");
    await page.locator("//button[text()[normalize-space() = \"Add Action\"]]").click();
    vars["Chase Field Name _Rule"] = await page.locator("//label[text()='Chase Field Name']/..//select[@aria-label=\"Default dropdown selection\"]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
    vars["Chase Fieldname_Rule"] = String(vars["Chase Field Name _Rule"]).trim();
    await page.locator("(//*[text()=\"Add Actions\"]/..//select)[3]").selectOption({ index: parseInt("3") });
    await expect(page.locator("(//*[text()=\"Add Actions\"]/..//select)[3]")).toContainText(vars["Chase Fieldname_Rule"]);
    await page.locator("(//*[text()=\"Add Actions\"]/..//select)[4]").selectOption({ label: "Attached" });
    await expect(page.locator("(//*[text()=\"Add Actions\"]/..//select)[4]")).toContainText("Attached");
    await page.locator("//button[text()[normalize-space() = \"Delete Block\"]]").click();
    await expect(page.locator("//button[@title=\"Income (Monthly)\"]")).toBeVisible();
    await page.locator("((//*[text()=\" Add Action \"]/..//select)/../..//button)[1]").click();
    await expect(page.locator("//select[@title=\"Ineligible\"]")).toBeVisible();
    await page.locator("//div[text()=' Base Loan Amount ']/ancestor::div[@class=\"rules-conditions\"]//button[contains(@class,\"btn bg-transparent text-danger fas fa-trash\")]").click();
    await expect(page.locator("//button[@title=\"Base Loan Amount\"]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Save and Publish\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("(//td[@data-title=\"Status\"])[1]")).toContainText("ACTIVE");
    vars["Version"] = await page.locator("(//td[@data-title=\"Version\"])[1]").textContent() || '';
    await expect(page.getByText(vars["Version"])).toBeVisible();
  });
});
