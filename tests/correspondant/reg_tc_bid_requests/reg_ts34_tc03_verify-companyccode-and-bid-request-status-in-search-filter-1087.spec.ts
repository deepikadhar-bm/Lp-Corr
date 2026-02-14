import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS34_TC03_Verify Company/Ccode and Bid request status In Search Filter', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await expect(page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Filter\"]]").click();
    await page.waitForLoadState('networkidle');
    await page.locator("//div[text()[normalize-space() = \"Select Company/CCode\"]]").click();
    vars["Company1"] = await page.locator("(//div[@class=\"dropdown-overflow\"]//input[@type=\"checkbox\"])[1]/..//span").textContent() || '';
    vars["ExpectedCompany"] = String(vars["Company1"]).substring(0, String(vars["Company1"]).length - 8);
    await page.locator("(//input[@type=\"checkbox\"])[2]").check();
    await page.locator("//button[contains(normalize-space(),\"Apply Selected 1\")]").click();
    await page.locator("//div[text()[normalize-space() = \"Select Bid Request Status\"]]").click();
    vars["Count"] = "2";
    vars["ExpectedStatus"] = await page.locator("((//label[text()='Select Bid Request Status']//..//div[@class=\"cursor-pointer py-3 text-wrap\"])[position() > 1 and position() <= last()])[$|Count|]").textContent() || '';
    await page.locator("((//label[text()='Select Bid Request Status']//..//div[@class=\"cursor-pointer py-3 text-wrap\"])[position() > 1 and position() <= last()])[$|Count|]").click();
    await page.locator("(//button[@aria-label=\"Apply selected items\"])[2]").click();
    await page.locator("//div[contains(@class, \"justify-content-end\")]//button[text()=\"Apply Filters\"]").click();
    await page.waitForLoadState('networkidle');
    // [DISABLED] Store the count of elements identified by locator Status On Home Page into a variable Status Count
    // vars["Status Count"] = String(await page.locator("//td[@data-title=\"Status\"]").count());
    // [DISABLED] Store toUppercase(string) in ExpectedStatus(FilterTube)
    // vars["ExpectedStatus(FilterTube)"] = String(vars["ExpectedStatus"]).toUpperCase();
    // [DISABLED] Verify that the element Status Filter Tube displays text contains ExpectedStatus(FilterTube) and With Scrollable FALSE
    // await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Status\")]")).toContainText(vars["ExpectedStatus(FilterTube)"]);
    // [DISABLED] Store 1 in count
    // vars["count"] = "1";
    // [DISABLED] Store the count of elements identified by locator Company Name Count into a variable CountOfCompanies
    // vars["CountOfCompanies"] = String(await page.locator("(//div[normalize-space(text())='Company']//..//..//..//..//..//div[@class=\"text-nowrap\"])").count());
    while (true) /* Verify if count <= CountOfCompanies */ {
      // [DISABLED] Store text from the element Company_Names1 into a variable CompanyName
      // vars["CompanyName"] = await page.locator("(//div[normalize-space(text())='Company']//..//..//..//..//..//div[@class=\"text-nowrap\"])[$|count|]").textContent() || '';
      // [DISABLED] Verify if CompanyName contains Company1
      // expect(String(vars["CompanyName"])).toBe(vars["Company1"]);
      // [DISABLED] Perform addition on count and 1 and store the result inside a count considering 0 decimal places
      // vars["count"] = (parseFloat(String(vars["count"])) + parseFloat(String("1"))).toFixed(0);
    }
    // [DISABLED] Store text from the element Status On Home Page into a variable Status
    // vars["Status"] = await page.locator("//td[@data-title=\"Status\"]").textContent() || '';
    await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Status\")]")).toBeVisible();
    await expect(page.locator("//div[@class=\"pill rounded-pill relative\" and contains(@aria-label,\"Chip Company\")]")).toContainText(vars["ExpectedCompany"]);
    if (true) /* Element No result (Bid requests) is visible */ {
      await expect(page.getByText("No result")).toBeVisible();
    } else {
      // [DISABLED] Verify that the elements with locator Bid Request Status Column Data displays text ExpectedStatus and With Scrollable FALSE
      // await expect(page.locator("//td[@data-title=\"Status\"]//span")).toContainText(vars["ExpectedStatus"]);
      for (let i = 0; i < await page.locator("//td[@data-title=\"Status\"]//span").count(); i++) {
        await expect(page.locator("//td[@data-title=\"Status\"]//span").nth(i)).toHaveText(String(vars["ExpectedStatus"]));
      }
      // [DISABLED] Verify that the elements with locator BidRequest Company Column Data displays text ExpectedCompany and With Scrollable FALSE
      // await expect(page.locator("//td[@data-title=\"Company\"]//div")).toContainText(vars["ExpectedCompany"]);
      for (let i = 0; i < await page.locator("//td[@data-title=\"Company\"]//div").count(); i++) {
        await expect(page.locator("//td[@data-title=\"Company\"]//div").nth(i)).toHaveText(String(vars["ExpectedCompany"]));
      }
    }
  });
});
