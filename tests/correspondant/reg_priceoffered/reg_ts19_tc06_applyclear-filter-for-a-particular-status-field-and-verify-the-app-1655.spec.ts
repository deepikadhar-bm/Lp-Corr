import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_PriceOffered', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS19_TC06_Apply/Clear filter for a particular Status field and verify the apply filter functionality', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//span[text()[normalize-space() = \"Filter\"]]").click();
    await page.locator("//div[text()[normalize-space() = \"Select Commitments Status\"]]").click();
    await page.locator("(//input[@id=\"searchBox\"])[2]").click();
    await page.locator("(//input[@id=\"searchBox\"])[2]").fill(testData["StatusInFilters"]);
    await page.waitForTimeout(5000);
    await expect(page.locator("(//div[@class=\"dropdown-overflow\"])[2]//input[@type=\"checkbox\"]//..//div")).toContainText(testData["StatusInFilters"]);
    vars["CountOfSelectedStatusBeforeClearing"] = String(await page.locator("(//div[@class=\"dropdown-overflow\"])[2]//input[@type=\"checkbox\"]//..//div").count());
    await page.locator("//button[@aria-label=\"Clear search\"]").click();
    vars["StatusCountInFilters"] = String(await page.locator("(//div[@class=\"dropdown-overflow\"])[2]//input[@type=\"checkbox\"]\n").count());
    expect(String(vars["CountOfSelectedStatusBeforeClearing"])).toBe(vars["StatusCountInFilters"]);
    await page.locator("(//div[@class=\"dropdown-overflow\"])[2]//input[@type=\"checkbox\"]").check();
    vars["CheckedStatus"] = await page.locator("(//div[@class=\"dropdown-overflow\"])[2]//input[@type=\"checkbox\"]//..//span").textContent() || '';
    await page.locator("(//div[text()=\" Show Selected \"])[2]").click();
    vars["CountOfstatusChecked"] = await page.locator("//span[contains(@aria-label,\"items selected\")]").textContent() || '';
    expect(String("1")).toBe(vars["CountOfstatusChecked"]);
    vars["SelectedstatusInFilterCount"] = String(await page.locator("//label[@class=\"dropdown-item d-flex checked\"]").count());
    expect(String("1")).toBe(vars["SelectedstatusInFilterCount"]);
    await page.locator("//div[text()[normalize-space() = \"Show All\"]]").click();
    vars["TotalStatusCountInFilters"] = String(await page.locator("(//div[@class=\"dropdown-overflow\"])[2]//input[@type=\"checkbox\"]\n").count());
    expect(String(vars["CountOfSelectedStatusBeforeClearing"])).toBe(vars["TotalStatusCountInFilters"]);
    await expect(page.locator("(//button[contains(text(),\" Apply Selected \")])[2]")).toBeVisible();
    await page.locator("(//span[@title=\"Select All\"])[2]").click();
    vars["CountOfItemsSelected"] = await page.locator("//span[contains(@aria-label, \"items selected\")]").textContent() || '';
    expect(String(vars["CountOfSelectedStatusBeforeClearing"])).toBe(vars["CountOfItemsSelected"]);
    await page.locator("(//span[@title=\"Select All\"])[2]").click();
    await page.locator("//span[text()[normalize-space() = \"Filter\"]]").click();
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["TotalStatusCountInFilters"]))) {
      await page.locator("//span[text()[normalize-space() = \"Filter\"]]").click();
      await page.locator("//div[text()[normalize-space() = \"Select Commitments Status\"]]").waitFor({ state: 'visible' });
      await page.locator("//div[text()[normalize-space() = \"Select Commitments Status\"]]").click();
      vars["IndividualStatusInFilters"] = await page.locator("((//div[@class=\"dropdown-overflow\"])[2]//input[@type=\"checkbox\"]//..//span)[$|count|]").textContent() || '';
      vars["IndividualStatusInFilters"] = String(vars["IndividualStatusInFilters"]).trim();
      await page.locator("((//div[@class=\"dropdown-overflow\"])[2]//input[@type=\"checkbox\"]//..//span)[$|count|]").click();
      await page.locator("(//button[contains(text(),\" Apply Selected \")])[2]").click();
      await page.locator("//div[contains(@class, \"justify-content-end\")]//button[text()=\"Apply Filters\"]").click();
      await page.waitForLoadState('networkidle');
      await expect(page.locator("//div[contains(@aria-label, \"Chip Status:\")]")).toBeVisible();
      vars["RowCount"] = String(await page.locator("//tbody[@role=\"rowgroup\"]//tr").count());
      vars["Count"] = "1";
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      if (String(vars["IndividualStatusInFilters"]) === String("Commitment in Progress")) {
        while (parseFloat(String(vars["Count"])) <= parseFloat(String(vars["RowCount"]))) {
          await page.locator("//div[text()=\" #Loans \"]").click();
          if (true) /* Element Status Individual is visible */ {
            vars["IndividualStatusInScreen"] = await page.locator("(//div[@role=\"status\"]//span)[$|Count|]").textContent() || '';
            vars["IndividualStatusInScreen"] = String(vars["IndividualStatusInScreen"]).trim();
            expect(String(vars["IndividualStatusInFilters"]).toLowerCase()).toContain(String(vars["IndividualStatusInScreen"]).toLowerCase());
          } else {
            await expect(page.getByText("No result")).toBeVisible();
          }
          vars["Count"] = (parseFloat(String("1")) + parseFloat(String(vars["Count"]))).toFixed(0);
        }
      } else {
        for (let i = 0; i < await page.locator("(//div[@role=\"status\"]//span)").count(); i++) {
          await expect(page.locator("(//div[@role=\"status\"]//span)").nth(i)).toHaveText(String(vars["IndividualStatusInFilters"]));
        }
      }
      if (true) /* Element Go to Next Page Button is enabled */ {
        await page.locator("//span[contains(@class, 'dlp-icon') and contains(@class, 'fa-chevron-right')]").click();
        vars["RowCount2"] = String(await page.locator("//tbody[@role=\"rowgroup\"]//tr").count());
        vars["CCount"] = "1";
        if (String(vars["IndividualStatusInFilters"]) === String("Commitment in Progress")) {
          while (parseFloat(String(vars["CCount"])) <= parseFloat(String(vars["RowCount2"]))) {
            vars["IndividualStatusInScreen2"] = await page.locator("(//div[@role=\"status\"]//span)[$|CCount|]").textContent() || '';
            vars["IndividualStatusInScreen2"] = String(vars["IndividualStatusInScreen2"]).trim();
            vars["IndividualStatusInScreen2"] = String(vars["IndividualStatusInScreen2"]).trim();
            if (true) /* Verify if IndividualStatusInFilters contains ignore-case wit */ {
            } else {
              await expect(page.getByText("No result")).toBeVisible();
            }
            vars["CCount"] = (parseFloat(String("1")) + parseFloat(String(vars["CCount"]))).toFixed(0);
          }
        } else {
          for (let i = 0; i < await page.locator("(//div[@role=\"status\"]//span)").count(); i++) {
            await expect(page.locator("(//div[@role=\"status\"]//span)").nth(i)).toHaveText(String(vars["IndividualStatusInFilters"]));
          }
        }
      }
      await page.locator("//span[text()[normalize-space() = \"Filter\"]]").click();
      await page.locator("//button[text()=\"Clear All\"]").click();
      await expect(page.locator("//div[contains(@aria-label, \"Chip Status:\")]")).toBeVisible();
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
  });
});
