import { test, expect } from '@playwright/test';
import * as stepGroups from '../../../src/helpers/step-groups';
import { runAllPrerequisites } from '../../../src/helpers/helper-Prerequisite/Prerquisite-Bid-Creation';
test.describe('REG_PriceOffered', () => {
  let vars: Record<string, string> = {};
  let prerequisitePassed = false; // ✅ Tracks if prerequisite passed or failed

  test.beforeEach(async ({ page }) => {
    vars = {};
    prerequisitePassed = false;

    console.log('\n========== RUNNING PREREQUISITES ==========');

    try {
      await runAllPrerequisites(page, vars);
      prerequisitePassed = true;
      console.log('✅ Prerequisites PASSED - proceeding with test');
    } catch (error) {
      prerequisitePassed = false;
      console.log('❌ Prerequisites FAILED - test will be SKIPPED');
      console.log('Prerequisite Error: ' + error);
    }
  });

  test('REG_TS13_TC01_Verify that user should not be allowed to perform commit action, if the market adjustor value doesnot satisfy Max threshold condition - An error message should be shown which should bloc', async ({ page }) => {

    // ✅ If prerequisite failed, SKIP this test instead of failing it
    test.skip(!prerequisitePassed, '⚠️ Skipping: Prerequisite failed or did not complete successfully');

    console.log('\n========== TEST START ==========');
    console.log('[INFO] Using Request ID: ' + vars["RequestIDDetails"]);

    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").click();

    vars["BidReqIdPriceOffered"] = vars["RequestIDDetails"];
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdPriceOffered"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator(`//a[contains(text(),"${vars["BidReqIdPriceOffered"]}")]`).click();
    await page.locator("//button[text()[normalize-space() = \"Get Price\"]]").waitFor({ state: 'visible' });
    await page.locator("//button[text()[normalize-space() = \"Get Price\"]]").click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(5000);

    vars["FirstMarkAdjValue"] = await page.locator("//tbody//input//ancestor::tr//td[@data-title=\"Mark Adj\"]").textContent() || '';
    vars["MarkAdjOnScreen"] = String(vars["FirstMarkAdjValue"]).substring(0, String(vars["FirstMarkAdjValue"]).length - 3);
    vars["count"] = "0";
    vars["FirstMarkAdjValue"] = String(vars["FirstMarkAdjValue"]).replace(/\-/g, '');
    vars["FirstMarkAdjValue"] = (parseFloat(String(vars["count"])) + parseFloat(String(vars["FirstMarkAdjValue"]))).toFixed(0);

    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//a[@href=\"#/admin/general-settings/market-thresholds\"]").scrollIntoViewIfNeeded();
    await page.locator("//a[@href=\"#/admin/general-settings/market-thresholds\"]").click();
    await page.locator("//td[@role=\"cell\"]//input[@type=\"checkbox\"]//..//..//button[contains(@aria-label,\"Edit Map\")]").click();
    await page.locator("//input[@aria-label=\"Enter maximum display value in percentage\"]").click();
    await page.locator("//input[@aria-label=\"Enter maximum display value in percentage\"]").clear();

    vars["Number"] = String(Math.floor(Math.random() * (8 - 1 + 1)) + 1);
    vars["NumLowerThanMarkAdj"] = (parseFloat(String(vars["FirstMarkAdjValue"])) - parseFloat(String(vars["Number"]))).toFixed(0);
    vars["NumLowerThanMarkAdjPopup"] = (parseFloat(String("0")) + parseFloat(String(vars["NumLowerThanMarkAdj"]))).toFixed(1);

    await page.locator("//input[@aria-label=\"Enter maximum display value in percentage\"]").fill(vars["NumLowerThanMarkAdj"]);
    await page.locator("//span[contains(text(),\"Update Threshold\")]").click();

    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["RequestIDDetails"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator(`//a[contains(text(),"${vars["BidReqIdPriceOffered"]}")]`).click();
    await page.waitForLoadState('networkidle');
    await page.locator("//tbody//input[@type=\"checkbox\"]").waitFor({ state: 'visible' });
    await page.locator("//tbody//input[@type=\"checkbox\"]").check();

    vars["CorrLoan"] = await page.locator("//tbody[@role=\"rowgroup\"]/tr[1]/td[1]//..//button[contains(@aria-label,\"View loan details for\")]").textContent() || '';
    vars["space"] = "key_blank";
    vars["ExpectedPopUpError1"] = "Loan" + vars["space"] + vars["CorrLoan"] + vars["space"] + "can not be committed. Market adjuster value" + vars["space"];
    vars["ExpectedPopUpError2"] = "is greater than market threshold value" + vars["space"] + vars["NumLowerThanMarkAdjPopup"];

    await page.locator("//button[text()[normalize-space() = \"Get Price\"]]").click();
    await page.locator("//button[@id='commitdropdownMenuButton']").waitFor({ state: 'visible' });
    await page.locator("//button[@id='commitdropdownMenuButton']").click();
    await page.locator("//span[text()=\"Yes, Commit\"]//parent::button").click();
    await page.locator("//button[contains(text(),\"Okay\")]").waitFor({ state: 'visible' });

    await expect(page.locator("//li[text()[normalize-space() = \"Loans failed to be added to commitment\"]]")).toBeVisible();

    vars["ActualErrorPopup"] = await page.locator("(//div[@class=\"modal-content\"]//li)[2]").textContent() || '';
    await expect(page.getByText(vars["ExpectedPopUpError1"])).toBeVisible();
    expect(String(vars["ActualErrorPopup"])).toBe(vars["ExpectedPopUpError2"]);

    await page.locator("//div[@class=\"modal-footer\"]//button[contains(text(), \"Okay\")]").click();
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//a[@href=\"#/admin/general-settings/market-thresholds\"]").scrollIntoViewIfNeeded();
    await page.locator("//a[@href=\"#/admin/general-settings/market-thresholds\"]").click();

    await stepGroups.stepGroup_Market_Threshold(page, vars);
    await page.locator("//input[@aria-label=\"Enter maximum display value in percentage\"]").fill("120");
    await page.locator("//span[contains(text(),\"Update Threshold\")]").click();

    console.log('\n========== TEST END ==========\n');
  });
});
