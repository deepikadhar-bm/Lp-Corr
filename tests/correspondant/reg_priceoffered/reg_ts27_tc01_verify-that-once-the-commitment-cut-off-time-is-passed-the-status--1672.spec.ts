import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_PriceOffered', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS27_TC01_Verify that once the commitment cut off time is passed the status with \\\"Price offered\\\" should get updated to \\\"expired\\\"', async ({ page }) => {
    // Prerequisite: REG_TS01_TC01_Perform submit for pricing action, and then verify the status should be updated to pri
    // TODO: Ensure prerequisite test passes first

    vars["BidReqIdPriceOffered"] = vars["RequestIDDetails"];
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdPriceOffered"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["BidStatusPriceOffered"] = await page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//td[@data-title=\"Status\"]//span").textContent() || '';
    vars["BidStatusPriceOffered"] = String(vars["BidStatusPriceOffered"]).trim();
    expect(String(vars["BidStatusPriceOffered"])).toBe("Price Offered");
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//a[@href=\"#/admin/general-settings/early-close-config\"]").click();
    await page.locator("//button[text()[normalize-space() = \"Add New\"]]").click();
    await page.locator("//button[@aria-label=\"Toggle Date Picker\"]").click();
    vars["CurrentDate"] = new Date().toLocaleDateString('en-US') /* format: d-M-yyyy */;
    await page.locator("//div[@class=\"ngb-dp-month\"]//div[@aria-label=\"$|CurrentDate|\"]").click();
    vars["CurrentEstTime"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC-05:00" };
      const fmt = "hh:mma";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    vars["CurrentEstTime"] = (() => {
      const d = new Date('2000-01-01 ' + String(vars["CurrentEstTime"]));
      d.setMinutes(d.getMinutes() + parseInt(String("3")));
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }); // Format: hh:mma
    })();
    vars["TimeStandard"] = String(vars["CurrentEstTime"]).slice(-2);
    vars["CurrentEstTime"] = String(vars["CurrentEstTime"]).substring(0, String(vars["CurrentEstTime"]).length - 2);
    await page.locator("//input[@id='commitCreationCutOffTime']").fill(vars["CurrentEstTime"]);
    await page.locator("//div[text()=\"Comm. Cut Off\"]/following::select[@class=\"form-select\"]").click();
    await page.locator("//div[text()=\"Comm. Cut Off\"]/following::select[@class=\"form-select\"]").selectOption({ label: vars["TimeStandard"] });
    await page.locator("//button[@aria-label=\"Save Configuration\"]").waitFor({ state: 'visible' });
    await page.locator("//button[@aria-label=\"Save Configuration\"]").click();
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdPriceOffered"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    while (!(await page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//td[@data-title=\"Status\"]//span[text()[normalize-space() = \"Expired\"]]").isVisible())) {
      await page.reload();
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdPriceOffered"]);
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    }
    vars["BidStatusPriceOffered"] = await page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]//ancestor::tr//td[@data-title=\"Status\"]//span").textContent() || '';
    vars["BidStatusPriceOffered"] = String(vars["BidStatusPriceOffered"]).trim();
    expect(String(vars["BidStatusPriceOffered"])).toBe("Expired");
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//a[@href=\"#/admin/general-settings/early-close-config\"]").click();
    if (true) /* Element Delete Button(Early Conf) is visible */ {
      await page.locator("//button[@aria-label=\"Delete\"]//span").click();
      await page.locator("//button[@aria-label=\"Yes, Delete\"]").click();
      await page.reload();
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      await expect(page.getByText("No result")).toBeVisible();
    }
    // Write to test data profile: "RequestIDfrom27-1" = vars["BidReqIdPriceOffered"]
    // TODO: Test data profile writes need custom implementation
  });
});
