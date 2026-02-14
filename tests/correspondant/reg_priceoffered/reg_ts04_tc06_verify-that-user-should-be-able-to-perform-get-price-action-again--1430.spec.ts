import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_PriceOffered', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS04_TC06_Verify that user should be able to perform get price action again, when the timer is active', async ({ page }) => {
    // Prerequisite: REG_TS04_TC05_After performing the 'Get Price' action, the timer starts. When the user navigates awa
    // TODO: Ensure prerequisite test passes first

    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//a[@href=\"#/admin/general-settings/commitment-timer\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["MinutesSettings"] = await page.locator("//input[@aria-label=\"Internal User Minutes\"]").inputValue() || '';
    vars["startMin"] = (parseFloat(String(vars["MinutesSettings"])) - parseFloat(String("1"))).toFixed(0);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").clear();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["RequestIDDetails"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Bid Req. ID\"]").click();
    await page.waitForLoadState('networkidle');
    await page.locator("//button[text()[normalize-space() = \"Get Price\"]]").click();
    await page.locator("//div[text()=\"Remaining Time\"]/..//h5").waitFor({ state: 'visible' });
    vars["RemainingTime"] = await page.locator("//div[text()=\"Remaining Time\"]/..//h5").textContent() || '';
    vars["RemainingTime"] = String(vars["RemainingTime"]).trim();
    vars["MinSettings"] = vars["MinutesSettings"];
    vars["startMin"] = (parseFloat(String(vars["MinSettings"])) - parseFloat(String("1"))).toFixed(0);
    vars["MinTimePriceOffered"] = String(vars["RemainingTime"]).split(":")["1"] || '';
    vars["ExpectedMinTime"] = String(vars["MinSettings"]) + String("m");
    vars["ExpectedMinTimeMinus1"] = String(vars["startMin"]) + String("m");
    vars["SecondsTimePriceOffered"] = String(vars["RemainingTime"]).split(":")["2"] || '';
    vars["FirstDigitSeconds"] = String(vars["SecondsTimePriceOffered"]).substring(0, String(vars["SecondsTimePriceOffered"]).length - 2);
    vars["SecondDigitSeconds"] = String(vars["SecondsTimePriceOffered"]).substring(1, String(vars["SecondsTimePriceOffered"]).length - 1);
    vars["CharSeconds"] = String(vars["SecondsTimePriceOffered"]).substring(2);
    if (String(vars["MinTimePriceOffered"]) === String(vars["ExpectedMinTime"])) {
      expect(String(vars["FirstDigitSeconds"])).toBe("0");
      expect(String(vars["SecondDigitSeconds"])).toBe("0");
    } else {
      expect(String(vars["MinTimePriceOffered"])).toBe(vars["ExpectedMinTimeMinus1"]);
      expect(String(vars["FirstDigitSeconds"])).toBe("5");
    }
    // TODO: Regex verification with empty pattern
    // Action: Verify if the text RemainingTime matches the pattern ^\d+m:\d{2}s$
    // [DISABLED] Wait for 60 seconds
    // await page.waitForTimeout(60000);
    await stepGroups.stepGroup_Verifying_the_Time_Count_Down_In_Price_Offered_Details_Scree(page, vars);
  });
});
