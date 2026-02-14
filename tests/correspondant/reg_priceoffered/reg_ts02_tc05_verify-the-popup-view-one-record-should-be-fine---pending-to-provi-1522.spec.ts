import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_PriceOffered', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS02_TC05_Verify the popup view [[ one record should be fine] -> Pending to provide steps', async ({ page }) => {
    // Prerequisite: REG_TS02_TC04.1_Verify the table data
    // TODO: Ensure prerequisite test passes first

    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["RequestIDDetails"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//button[contains(text(),\"$|RequestIDDetails|\")]").click();
    vars["ExecutionTypesBidReq"] = String(await page.locator("//div[@id=\"executionTypeLabel\"]//following-sibling::h5").count());
    vars["Last Name"] = testData["Static Last Name(Pop Up Verfication)"];
    await page.locator("//div[@id=\"executionTypeLabel\"]//following-sibling::h5[(contains(text(),\"Chase Direct\"))]/ancestor::div[@class=\"accordion-item\"]//tr//td[@data-title=\"Loan Status\"]//div[not(contains(text(),\"Error\"))]/../..//td[@data-title=\"Last Name\"]//div[contains(text(),\"$|Last Name|\")]/../..//button[1]").click();
    vars["BidReqIdBidReqPageChase"] = await page.locator("//div[text()=\"Bid Request ID\"]//following-sibling::h5").textContent() || '';
    vars["BidLoanNumBidReqPageChase"] = await page.locator("//div[text()=\"Bid Loan Number\"]//following-sibling::h5").textContent() || '';
    vars["ErrorsCheckBidReqPageChase"] = await page.locator("//div[text()=\"Errors Check\"]//following-sibling::h5").textContent() || '';
    await page.locator("//button[@aria-label=\"Close\"]").click();
    await page.locator("//div[@id=\"executionTypeLabel\"]//following-sibling::h5[(contains(text(),\"Standard\"))]/ancestor::div[@class=\"accordion-item\"]//tr//td[@data-title=\"Loan Status\"]//div[not(contains(text(),\"Error\"))]/../..//td[@data-title=\"Last Name\"]//div[contains(text(),\"$|Last Name|\")]/../..//button[1]").waitFor({ state: 'visible' });
    await page.locator("//div[@id=\"executionTypeLabel\"]//following-sibling::h5[(contains(text(),\"Standard\"))]/ancestor::div[@class=\"accordion-item\"]//tr//td[@data-title=\"Loan Status\"]//div[not(contains(text(),\"Error\"))]/../..//td[@data-title=\"Last Name\"]//div[contains(text(),\"$|Last Name|\")]/../..//button[1]").click();
    vars["BidReqIdReqPageStandard"] = await page.locator("//div[text()=\"Bid Request ID\"]//following-sibling::h5").textContent() || '';
    vars["BidLoanNumBidReqPageStandard"] = await page.locator("//div[text()=\"Bid Loan Number\"]//following-sibling::h5").textContent() || '';
    vars["ErrorsCheckBidReqPageStandard"] = await page.locator("//div[text()=\"Errors Check\"]//following-sibling::h5").textContent() || '';
    await page.locator("//button[@aria-label=\"Close\"]").click();
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["RequestIDDetails"]);
    await page.keyboard.press('Enter');
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["ExecutionTypesPriceOffered"] = String(await page.locator("//td[@data-title=\"Execution Type\"]").count());
    expect(String(vars["ExecutionTypesBidReq"])).toBe(vars["ExecutionTypesPriceOffered"]);
    await page.locator("//td[@data-title=\"Execution Type\"]//div[contains(text(),\"CHASE_DIRECT\")]//ancestor::tr//td[@data-title=\"Bid Req. ID\"]//a[contains(@aria-label,\"View details for\")]").click();
    await page.locator("(//div[contains(@aria-label,\"Last name\") and contains(text(),\"$|Last Name|\")])/../..//td[@data-title=\"Corr. Loan#\"]//button[contains(@aria-label,\"View loan details\")]").waitFor({ state: 'visible' });
    await page.locator("(//div[contains(@aria-label,\"Last name\") and contains(text(),\"$|Last Name|\")])/../..//td[@data-title=\"Corr. Loan#\"]//button[contains(@aria-label,\"View loan details\")]").click();
    await expect(page.locator("//div[text()=\"Bid Request ID\"]//following-sibling::h5")).toContainText(vars["BidReqIdBidReqPageChase"]);
    await expect(page.locator("//div[text()=\"Bid Loan Number\"]//following-sibling::h5")).toContainText(vars["BidLoanNumBidReqPageChase"]);
    await expect(page.locator("//div[text()=\"Errors Check\"]//following-sibling::h5")).toContainText(vars["ErrorsCheckBidReqPageChase"]);
    vars["ChaseFieldCountPopup"] = String(await page.locator("//div[@class=\"border-bottom p-2\"]").count());
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["ChaseFieldCountPopup"]))) {
      await page.locator("//div[text()=\"Bid Loan Number\"]//following-sibling::h5").click();
      vars["ChaseFieldNamePopupExeChase"] = await page.locator("(//div[@class=\"border-bottom p-2\"])[$|count|]").textContent() || '';
      vars["ChaseValuePopupExeChase"] = await page.locator("(//div[@class=\"border-bottom p-2\" and normalize-space((text())=\"$ChaseFieldNamePopupExeChase|\")]/following-sibling::div)[1]").textContent() || '';
      for (let dataIdx = parseInt(vars["count"]); dataIdx <= parseInt(vars["count"]); dataIdx++) {
        await expect(page.locator("(//div[@class=\"border-bottom p-2\"])[$|count|]")).toContainText(testData["ChaseFieldName"]);
        if (String(vars["ChaseValuePopupExeChase"]) === String("key_blank")) {
          expect(String(testData["ChaseValue"])).toBe("Null");
        } else if (String(vars["ChaseFieldNamePopupExeChase"]) === String("Correspondent Loan Number")) {
          expect(String(vars["ChaseValuePopupExeChase"])).toBe(vars["BidLoanNumBidReqPageChase"]);
        } else {
          await expect(page.locator("(//div[@class=\"border-bottom p-2\" and normalize-space((text())=\"$ChaseFieldNamePopupExeChase|\")]/following-sibling::div)[1]")).toContainText(testData["ChaseValue"]);
        }
      }
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    await page.locator("//button[@aria-label=\"Close\"]").click();
    await page.locator("//i[contains(@class,'fa-arrow-left')]").click();
    await page.locator("//td[@data-title=\"Execution Type\"]//div[contains(text(),\"STANDARD\")]//ancestor::tr//td[@data-title=\"Bid Req. ID\"]//a[contains(@aria-label,\"View details \")]").waitFor({ state: 'visible' });
    await page.locator("//td[@data-title=\"Execution Type\"]//div[contains(text(),\"STANDARD\")]//ancestor::tr//td[@data-title=\"Bid Req. ID\"]//a[contains(@aria-label,\"View details \")]").click();
    await page.locator("(//div[contains(@aria-label,\"Last name\") and contains(text(),\"$|Last Name|\")])/../..//td[@data-title=\"Corr. Loan#\"]//button[contains(@aria-label,\"View loan details\")]").waitFor({ state: 'visible' });
    await page.locator("(//div[contains(@aria-label,\"Last name\") and contains(text(),\"$|Last Name|\")])/../..//td[@data-title=\"Corr. Loan#\"]//button[contains(@aria-label,\"View loan details\")]").click();
    await expect(page.locator("//div[text()=\"Bid Request ID\"]//following-sibling::h5")).toContainText(vars["BidReqIdReqPageStandard"]);
    await expect(page.locator("//div[text()=\"Bid Loan Number\"]//following-sibling::h5")).toContainText(vars["BidLoanNumBidReqPageStandard"]);
    await expect(page.locator("//div[text()=\"Errors Check\"]//following-sibling::h5")).toContainText(vars["ErrorsCheckBidReqPageStandard"]);
    vars["ChaseFieldCountPopup"] = String(await page.locator("//div[@class=\"border-bottom p-2\"]").count());
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["ChaseFieldCountPopup"]))) {
      await page.locator("//div[text()=\"Bid Loan Number\"]//following-sibling::h5").click();
      vars["ChaseFieldNamePopupExeStandard"] = await page.locator("(//div[@class=\"border-bottom p-2\"])[$|count|]").textContent() || '';
      vars["ChaseValuePopupExeStandard"] = await page.locator("(//div[@class=\"border-bottom p-2\" and normalize-space((text())=\"$|ChaseFieldNamePopupExeStandard|\")]/following-sibling::div)[1]").textContent() || '';
      for (let dataIdx = parseInt(vars["count"]); dataIdx <= parseInt(vars["count"]); dataIdx++) {
        await expect(page.locator("(//div[@class=\"border-bottom p-2\"])[$|count|]")).toContainText(testData["ChaseFieldName"]);
        if (String(vars["ChaseValuePopupExeStandard"]) === String("key_blank")) {
          expect(String(testData["ChaseValue"])).toBe("Null");
        } else if (String(vars["ChaseFieldNamePopupExeStandard"]) === String("Correspondent Loan Number")) {
          expect(String(vars["ChaseValuePopupExeStandard"])).toBe(vars["BidLoanNumBidReqPageStandard"]);
        } else {
          await expect(page.locator("(//div[@class=\"border-bottom p-2\" and normalize-space((text())=\"$|ChaseFieldNamePopupExeStandard|\")]/following-sibling::div)[1]")).toContainText(testData["ChaseValue"]);
        }
      }
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    await page.locator("//button[@aria-label=\"Close\"]").click();
  });
});
