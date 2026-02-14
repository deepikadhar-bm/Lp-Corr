import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS02_TC02_Verify that the user is able to Update the Bid Sample Field Name and CLM Field Name.', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Creation_Of_Bid_Map_Upto_Header_Mapping(page, vars);
    await page.waitForLoadState('networkidle');
    await page.locator("(//i[@class=\"fas fa-pencil-alt\"])[3]").click();
    await expect(page.locator("//div[text()='Custom Header']//..//..//input[contains(@class, 'form-control')]")).toBeVisible();
    await page.locator("//div[text()='Custom Header']//..//..//input[contains(@class, 'form-control')]").clear();
    await page.locator("//span[text()[normalize-space() = \"Update Header\"]]").click();
    await expect(page.locator("//div[text()[normalize-space() = \"Name can't be empty.\"]]")).toBeVisible();
    await page.locator("//i[contains(@class, 'fa-lg') and contains(@class, 'color-primary') and contains(@class, 'fa-times')]").click();
    await page.locator("(//i[@class=\"fas fa-pencil-alt\"])[3]").click();
    await expect(page.locator("//div[text()='Custom Header']//..//..//input[contains(@class, 'form-control')]")).toBeVisible();
    await page.locator("//div[text()='Custom Header']//..//..//input[contains(@class, 'form-control')]").clear();
    await page.locator("//span[text()[normalize-space() = \"Update Header\"]]").click();
    await expect(page.locator("//div[text()[normalize-space() = \"Name can't be empty.\"]]")).toBeVisible();
    vars["CustomHeader"] = Array.from({length: 5}, () => "abc".charAt(Math.floor(Math.random() * 3))).join('');
    await page.locator("//div[text()='Custom Header']//..//..//input[contains(@class, 'form-control')]").fill(vars["CustomHeader"]);
    await page.locator("//div[contains(@class, 'd-flex') and contains(@class, 'small')]/following-sibling::div[contains(@class, 'd-flex')]//select[contains(@class, 'form-select')]").selectOption({ label: testData["ChaseFieldName"] });
    await expect(page.getByText(testData["ChaseFieldName"])).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Update Header\"]]").click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByText(vars["CustomHeader"])).toBeVisible();
    await page.locator("(//option/../..//select[@class=\"form-select\"])[3]").click();
    await page.locator("(//option/../..//select[@class=\"form-select\"])[3]").selectOption({ label: testData["ChaseFieldName"] });
    await expect(page.getByText(testData["ChaseFieldName"])).toBeVisible();
    if (true) /* Element Header_Data_Mapping_Field is visible */ {
      await page.locator("(//div[@class='parent']//fieldset)[2]//select[@id=\"id\"]").click();
      await page.locator("(//option[@value='search.criteria.propertyValuationType'])[3]").click();
      vars["UpdatedChaseFieldName"] = await page.locator("(//option[@value='search.criteria.propertyValuationType'])[3]").textContent() || '';
      await expect(page.locator("//div[@class=\"gap-2 header-grid-layout\"][contains(.,\"$|CustomHeader|\")]//select")).toContainText(vars["UpdatedChaseFieldName"]);
      vars["UpdatedchaseField"] = String(vars["UpdatedChaseFieldName"]).substring(1, String(vars["UpdatedChaseFieldName"]).length - 1);
      await expect(page.locator("//div[contains(text(),\"$|CustomHeader|\")]/../..//select")).toHaveValue(vars["UpdatedchaseField"]);
    }
    await page.locator("(//select[@aria-label=\"Default dropdown selection\"])[5]").selectOption({ label: testData["EmptyChaseFieldName"] });
    await expect(page.locator("(//select[@aria-label=\"Default dropdown selection\"])[5]")).toContainText(testData["EmptyChaseFieldName"]);
  });
});
