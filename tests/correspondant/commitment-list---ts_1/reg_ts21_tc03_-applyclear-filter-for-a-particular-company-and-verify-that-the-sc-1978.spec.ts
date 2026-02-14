import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Commitment List - TS_1', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS21_TC03_ Apply/Clear filter for a particular company and verify that the screen should display only those company bids)', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//div[normalize-space()=\"Closed List\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Filter\"]]").click();
    await page.locator("//div[text()[normalize-space() = \"Select Company/CCode\"]]").click();
    await page.locator("//input[@aria-label=\"Search items\"]").click();
    await page.locator("//input[@aria-label=\"Search items\"]").fill(testData["CompanyNameInFilters"]);
    await expect(page.locator("(//div[@class=\"dropdown-overflow\"])[1]//input[@type=\"checkbox\"]//..//div")).toContainText(testData["CompanyNameInFilters"]);
    vars["CountOfCompanyBeforeClearing"] = String(await page.locator("(//div[@class=\"dropdown-overflow\"])[1]//input[@type=\"checkbox\"]\n").count());
    await page.locator("//button[@aria-label=\"Clear search\"]").click();
    vars["TotalCompanyCountInFilter"] = String(await page.locator("(//div[@class=\"dropdown-overflow\"])[1]//input[@type=\"checkbox\"]\n").count());
    expect(String(vars["CountOfCompanyBeforeClearing"])).toBe(vars["TotalCompanyCountInFilter"]);
    await page.locator("(//div[@class=\"dropdown-overflow\"])[1]//input[@type=\"checkbox\"]").check();
    vars["SelectedCompanyName"] = await page.locator("(//div[@class=\"dropdown-overflow\"])[1]//input[@type=\"checkbox\"]//..//span").textContent() || '';
    vars["SelectedCompanyName"] = String('').split("(")["0"] || '';
    vars["SelectedCompanyName"] = String(vars["SelectedCompanyName"]).trim();
    await page.locator("//div[text()=\" Show Selected \"]").click();
    vars["numberOfItemsSelected"] = await page.locator("//span[contains(@aria-label,\"items selected\")]").textContent() || '';
    await expect(page.locator("(//div[@class=\"dropdown-overflow\"])[1]//input[@type=\"checkbox\"]//..//div")).toContainText(vars["SelectedCompanyName"]);
    // [DISABLED] Verify multiple elements Selected Company for same xpath have the same text SelectedCompanyName
    // for (let i = 0; i < await page.locator("(//div[@class=\"dropdown-overflow\"])[1]//input[@type=\"checkbox\"]//..//div").count(); i++) {
    //   await expect(page.locator("(//div[@class=\"dropdown-overflow\"])[1]//input[@type=\"checkbox\"]//..//div").nth(i)).toHaveText(String(vars["SelectedCompanyName"]));
    // }
    vars["SelectedCompanyCountInFilters"] = String(await page.locator("//label[@class=\"dropdown-item d-flex checked\"]").count());
    expect(String("1")).toBe(vars["SelectedCompanyCountInFilters"]);
    expect(String("1")).toBe(vars["numberOfItemsSelected"]);
    await page.locator("//div[text()[normalize-space() = \"Show All\"]]").click();
    vars["CountAfterSelectingAll"] = String(await page.locator("(//div[@class=\"dropdown-overflow\"])[1]//input[@type=\"checkbox\"]\n").count());
    expect(String(vars["CountOfCompanyBeforeClearing"])).toBe(vars["CountAfterSelectingAll"]);
    await expect(page.locator("//button[contains(text(),\" Apply Selected \")]")).toBeVisible();
    await page.locator("(//span[@title=\"Select All\"])").click();
    vars["CountOfItemsSelected"] = await page.locator("//span[contains(@aria-label, \"items selected\")]").textContent() || '';
    expect(String(vars["CountOfCompanyBeforeClearing"])).toBe(vars["CountOfItemsSelected"]);
    await page.locator("(//span[@title=\"Select All\"])").click();
    await page.locator("(//div[@class=\"dropdown-overflow\"])[1]//input[@type=\"checkbox\"]").check();
    vars["CheckedName"] = await page.locator("(//div[@class=\"dropdown-overflow\"])[1]//input[@type=\"checkbox\"]//..//span").textContent() || '';
    await page.locator("//button[contains(text(),\" Apply Selected \")]").click();
    await page.locator("//div[contains(@class, \"justify-content-end\")]//button[text()=\"Apply Filters\"]").click();
    await expect(page.locator("//div[contains(@aria-label,\"Company:\")]")).toBeVisible();
    vars["SelectedCompany"] = "Company:" + "key_blank" + vars["SelectedCompanyName"];
    await expect(page.locator("//div[contains(@aria-label,\"Company:\")]")).toContainText(vars["SelectedCompany"]);
    vars["Ccount"] = "1";
    // [DISABLED] Store 1 in count
    // vars["count"] = "1";
    while (parseFloat(String(vars["Ccount"])) <= parseFloat(String("2"))) {
      await page.locator("//td[@data-title=\"Company\"]//div").waitFor({ state: 'visible' });
      for (let i = 0; i < await page.locator("//td[@data-title=\"Company\"]//div").count(); i++) {
        await expect(page.locator("//td[@data-title=\"Company\"]//div").nth(i)).toHaveText(String(vars["SelectedCompanyName"]));
      }
      if (true) /* Element Go to Next Page Button is enabled */ {
        await page.locator("//span[contains(@class, 'dlp-icon') and contains(@class, 'fa-chevron-right')]").click();
      }
      vars["Ccount"] = (parseFloat(String("1")) + parseFloat(String(vars["Ccount"]))).toFixed(0);
    }
    await page.locator("//button[@aria-label=\"Clear all filters\"]").click();
    await expect(page.locator("//div[contains(@aria-label,\"Company:\")]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//a[@href=\"#/admin/general-settings/customer-restrictions\"]").click();
    await page.waitForLoadState('networkidle');
    await page.locator("//button[contains(text(),\"Show \")]").click();
    await page.locator("//button[text()=\" 50 \"]").click();
    vars["Count"] = "1";
    vars["TotalCompanyCountCustomerPermission"] = "0";
    vars["PageCount"] = await page.locator("//div[@aria-label=\"Pagination Controls\"]//span[@aria-atomic=\"true\"]").textContent() || '';
    vars["PageCount"] = String(vars["PageCount"]).substring(10);
    while (parseFloat(String(vars["Count"])) <= parseFloat(String(vars["PageCount"]))) {
      vars["CompanyNameCount"] = String(await page.locator("//td[@data-title=\"Company Name\"]").count());
      vars["TotalCompanyCountCustomerPermission"] = (parseFloat(String(vars["TotalCompanyCountCustomerPermission"])) + parseFloat(String(vars["CompanyNameCount"]))).toFixed(0);
      if (true) /* Element Go to Next Page Button is enabled */ {
        await page.locator("//span[contains(@class, 'dlp-icon') and contains(@class, 'fa-chevron-right')]").click();
      }
      vars["Count"] = (parseFloat(String("1")) + parseFloat(String(vars["Count"]))).toFixed(0);
    }
    expect(String(vars["TotalCompanyCountCustomerPermission"])).toBe(vars["TotalCompanyCountInFilter"]);
    expect(String(vars["TotalCompanyCountCustomerPermission"])).toBe(vars["CountOfItemsSelected"]);
  });
});
