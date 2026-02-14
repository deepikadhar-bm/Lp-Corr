import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_PriceOffered', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS13_TC02_Verify that market adjuster value should be displayed as \\\"-\\\" if itdoesnot satisfy min threshold condition, but should be able to perform commit action.', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    vars["Bid ID Price Offered"] = testData["RequestIDfrom13-1"];
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["Bid ID Price Offered"]);
    await page.keyboard.press('Enter');
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // [DISABLED] Click on Bid ID
    // await page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]").click();
    await page.locator("//a[contains(text(),\"$|Bid ID Price Offered|\")]").click();
    await page.waitForLoadState('networkidle');
    await page.locator("//button[text()[normalize-space() = \"Get Price\"]]").waitFor({ state: 'visible' });
    await page.locator("//button[text()[normalize-space() = \"Get Price\"]]").click();
    await page.locator("//div[@id=\"price-offered-details-header\"]//div/div[text()=\"Remaining Time\"]").waitFor({ state: 'visible' });
    await page.locator("//td[@role=\"cell\"]//input[@type=\"checkbox\"]").click();
    await page.locator("//button[text()[normalize-space() = \"Get Price\"]]").click();
    await page.locator("//button[@id='commitdropdownMenuButton']").click();
    await page.locator("//span[text()=\"Yes, Commit\"]//parent::button").click();
    await page.locator("//div[contains(text(),\"Commitment \")]/..//span/..").waitFor({ state: 'visible' });
    await page.locator("//div[@class=\"modal-footer\"]//button[contains(text(), \"Okay\")]").click();
    await page.locator("//div[@class=\"modal-footer\"]//button[contains(text(), \"Okay\")]").waitFor({ state: 'hidden' });
    vars["MarkAdjustmentValue"] = await page.locator("//td[@data-title=\"Mark Adj\"]").textContent() || '';
    await page.waitForTimeout(3000);
    vars["InitialMarkAdjValue"] = vars["MarkAdjustmentValue"];
    vars["MarkAdjValue"] = String(vars["MarkAdjustmentValue"]).replace(/\-/g, '');
    vars["Count"] = "0";
    vars["MarkAdjValue"] = (parseFloat(String(vars["Count"])) + parseFloat(String(vars["MarkAdjValue"]))).toFixed(0);
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//a[@aria-label=\"General Settings\"]//span[text()=\"General Settings\"]").click();
    await page.locator("//a[@href=\"#/admin/general-settings/market-thresholds\"]").click();
    await page.locator("//td[@role=\"cell\"]//input[@type=\"checkbox\"]//..//..//button[contains(@aria-label,\"Edit Map\")]").click();
    vars["MinimumDisplayValue"] = await page.locator("//label[text()=\"Min Display Value\"]/..//input[contains(@aria-label,\"Enter minimum display value in percentage\")]").textContent() || '';
    vars["MaximumDisplayValue"] = await page.locator("//label[text()=\"Max Display Value\"]/..//input[contains(@aria-label,\"Enter maximum display value in percentage\")]").textContent() || '';
    await page.locator("//label[text()=\"Min Display Value\"]/..//input[contains(@aria-label,\"Enter minimum display value in percentage\")]").clear();
    vars["Number"] = String(Math.floor(Math.random() * (5 - 1 + 1)) + 1);
    vars["MinDisplayValue"] = (parseFloat(String(vars["Number"])) + parseFloat(String(vars["MarkAdjValue"]))).toFixed(0);
    await page.locator("//label[text()=\"Min Display Value\"]/..//input[contains(@aria-label,\"Enter minimum display value in percentage\")]").fill(vars["MinDisplayValue"]);
    await page.locator("//label[text()=\"Max Display Value\"]/..//input[contains(@aria-label,\"Enter maximum display value in percentage\")]").clear();
    vars["Number1"] = String(Math.floor(Math.random() * (10 - 5 + 1)) + 5);
    vars["MaxDisplayvalue"] = (parseFloat(String(vars["MarkAdjValue"])) + parseFloat(String(vars["Number1"]))).toFixed(0);
    await page.locator("//label[text()=\"Max Display Value\"]/..//input[contains(@aria-label,\"Enter maximum display value in percentage\")]").fill(vars["MaxDisplayvalue"]);
    await page.locator("//span[contains(text(),\"Update Threshold\")]").click();
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["Bid ID Price Offered"]);
    await page.keyboard.press('Enter');
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[contains(text(),\"$|Bid ID Price Offered|\")]").click();
    await page.locator("//button[text()[normalize-space() = \"Get Price\"]]").waitFor({ state: 'visible' });
    await page.locator("//button[text()[normalize-space() = \"Get Price\"]]").click();
    vars["CountofMarkAdjEnabledLoans"] = String(await page.locator("//input//ancestor::tr//td[@data-title=\"Mark Adj\"]").count());
    vars["GrossPriceValueCount"] = String(await page.locator("//div//ancestor::tr//td[@data-title=\"Gross Price\"]").count());
    vars["CommittedLoansCount"] = String(await page.locator("//span[contains(text(),\"Locked/Committed Loans\")]/following-sibling::span[contains(@class,\"counter\")]").count());
    vars["UncommittedLoansCount"] = String(await page.locator("//*[contains(@aria-label,\"Select loan\")]").count());
    vars["count"] = "1";
    vars["Count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["UncommittedLoansCount"]))) {
      vars["IndividualMarkAdjValue"] = await page.locator("(//*[contains(@aria-label,\"Select loan\")]/../..//td[@data-title=\"Mark Adj\"])[$|count|]").textContent() || '';
      vars["IndividualMarkAdjValue"] = String(vars["IndividualMarkAdjValue"]).trim();
      expect(String(vars["IndividualMarkAdjValue"])).toBe("-");
      vars["count"] = (parseFloat(String(vars["count"])) + parseFloat(String("1"))).toFixed(0);
    }
    while (parseFloat(String(vars["Count"])) <= parseFloat(String(vars["CommittedLoansCount"]))) {
      await expect(page.locator("(//*[contains(@aria-label,\"Committed loan\")]/../..//td[@data-title=\"Mark Adj\"]//div)[$|Count|]")).toContainText(vars["InitialMarkAdjValue"]);
      vars["Count"] = (parseFloat(String("1")) + parseFloat(String(vars["Count"]))).toFixed(0);
    }
    vars["CurrentMarketDiffValue"] = await page.locator("//div[contains(text(),\"Current Market Diff\")]/..//h5").textContent() || '';
    vars["HedgeRatioValue"] = await page.locator("//span[contains(@aria-label,\"Committed loan\")]/../..//div[contains(@aria-label,\"Hedge ratio:\")]").textContent() || '';
    vars["MarketAdjustorValueAfterCommitting"] = (parseFloat(String(vars["CurrentMarketDiffValue"])) * parseFloat(String(vars["HedgeRatioValue"]))).toFixed(3);
    vars["MarketAdjustorValueAfterCommitting"] = String(vars["MarketAdjustorValueAfterCommitting"]).replace(/\-/g, '');
    vars["MarketAdjustorValueAfterCommitting"] = String(vars["MarketAdjustorValueAfterCommitting"]).substring(0, String(vars["MarketAdjustorValueAfterCommitting"]).length - 2);
    vars["count1"] = "0";
    // [DISABLED] Perform addition on count1 and MarketAdjustorValueAfterCommitting and store the result inside a MarketAdjustorValueAfterCommitting considering 0 decimal places
    // vars["MarketAdjustorValueAfterCommitting"] = (parseFloat(String(vars["count1"])) + parseFloat(String(vars["MarketAdjustorValueAfterCommitting"]))).toFixed(0);
    vars["TotalLoansCount"] = String(await page.locator("//td[@data-title=\"Corr. Loan#\"]").count());
    vars["Count1"] = "1";
    while (parseFloat(String(vars["Count1"])) <= parseFloat(String(vars["TotalLoansCount"]))) {
      vars["GrossPriceValues"] = await page.locator("(//div[contains(@aria-label, \"Gross price\")])[$|Count1|]").textContent() || '';
      // [DISABLED] Store text from the element Mark Adj Values into a variable MarkAdjValues
      // vars["MarkAdjValues"] = await page.locator("(//td[contains(@data-title, \"Mark Adj\")])[$|Count|]").textContent() || '';
      vars["IndividualNewMarkAdj"] = await page.locator("(//td[@data-title=\"Mark Adj\"])[$|Count1|]").textContent() || '';
      vars["ActualCurrGrossValues"] = await page.locator("(//td[contains(@data-title, \"Curr\")])[$|Count1|]").textContent() || '';
      if (String(vars["IndividualNewMarkAdj"]) === String("-")) {
        expect(String(vars["GrossPriceValues"])).toBe(vars["ActualCurrGrossValues"]);
      } else {
        vars["GrossPriceAndMarkAdjExpected"] = (parseFloat(String(vars["GrossPriceValues"])) + parseFloat(String(vars["IndividualNewMarkAdj"]))).toFixed(3);
        expect(String(vars["ActualCurrGrossValues"])).toBe(vars["GrossPriceAndMarkAdjExpected"]);
        expect(String(vars["IndividualNewMarkAdj"])).toBe(vars["MarketAdjustorValueAfterCommitting"]);
      }
      vars["Count1"] = (parseFloat(String(vars["Count1"])) + parseFloat(String("1"))).toFixed(0);
    }
    await page.locator("//td[@role=\"cell\"]//input[@type=\"checkbox\"]").click();
    await page.locator("//button[text()[normalize-space() = \"Get Price\"]]").click();
    await page.locator("//button[@id='commitdropdownMenuButton']").click();
    await page.locator("//span[text()=\"Yes, Commit\"]//parent::button").click();
    await page.locator("//div[contains(text(),\"Commitment \")]/..//span/..").waitFor({ state: 'visible' });
    vars["ActualSuccesfullyCreatedPopup"] = await page.locator("//div[contains(text(),\"Commitment \")]/..//span/..").textContent() || '';
    vars["ActualSuccesfullyCreatedPopup_1"] = String('').split("")["0"] || '';
    vars["ActualSuccesfullyCreatedPopup_2"] = String('').split("")["2"] || '';
    vars["ActualSuccesfullyCreatedPopup_3"] = String('').split("")["3"] || '';
    vars["ActualSuccesfullyCreatedPopup_4"] = String('').split("")["4"] || '';
    vars["CommitmentIDPopup"] = await page.locator("//span[@class=\"fw-bold\"]").textContent() || '';
    vars[""] = String(vars["ActualSuccesfullyCreatedPopup_1"]) + ' ' + String(vars["CommitmentIDPopup"]);
    vars[""] = String(vars["ExpectedCreatedPopup_1"]) + ' ' + String(vars["ActualSuccesfullyCreatedPopup_2"]);
    vars[""] = String(vars["ExpectedCreatedPopup_2"]) + ' ' + String(vars["ActualSuccesfullyCreatedPopup_3"]);
    vars[""] = String(vars["ExpectedCreatedPopup_3"]) + ' ' + String(vars["ActualSuccesfullyCreatedPopup_4"]);
    expect(String(vars["ActualSuccesfullyCreatedPopup"])).toBe(vars["ExpectedCreatedPopup_4"]);
    await page.locator("//button[contains(text(),\"Okay\")]").click();
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//a[@aria-label=\"General Settings\"]//span[text()=\"General Settings\"]").click();
    await page.locator("//a[@href=\"#/admin/general-settings/market-thresholds\"]").click();
    await page.locator("//td[@role=\"cell\"]//input[@type=\"checkbox\"]//..//..//button[contains(@aria-label,\"Edit Map\")]").click();
    await page.locator("//label[text()=\"Max Display Value\"]/..//input[contains(@aria-label,\"Enter maximum display value in percentage\")]").clear();
    await page.locator("//label[text()=\"Min Display Value\"]/..//input[contains(@aria-label,\"Enter minimum display value in percentage\")]").clear();
    await page.locator("//label[text()=\"Min Display Value\"]/..//input[contains(@aria-label,\"Enter minimum display value in percentage\")]").fill("1");
    await page.locator("//label[text()=\"Max Display Value\"]/..//input[contains(@aria-label,\"Enter maximum display value in percentage\")]").fill("120");
    await page.locator("//span[contains(text(),\"Update Threshold\")]").click();
  });
});
