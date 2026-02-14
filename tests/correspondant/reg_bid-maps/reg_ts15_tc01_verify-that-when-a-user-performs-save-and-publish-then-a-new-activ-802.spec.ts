import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS15_TC01_Verify that when a user performs save and publish then a new active version should be created.', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Creation_Of_Bid_Map_Upto_Header_Mapping(page, vars);
    await expect(page.locator("//span[text()='Enumeration Mapping']")).toBeVisible();
    await page.locator("(//i[@class=\"fas fa-pencil-alt\"])[3]").click();
    await expect(page.locator("//h5[text()[normalize-space() = \"Update Header\"]]")).toBeVisible();
    await page.locator("//div[contains(@class, 'd-flex') and contains(@class, 'small')]/following-sibling::div[contains(@class, 'd-flex')]//select[contains(@class, 'form-select')]").selectOption({ label: testData["ChaseFieldNames"] });
    await page.locator("//span[text()[normalize-space() = \"Update Header\"]]").click();
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//h5[text()[normalize-space() = \"Save and Move to Next Page\"]]").waitFor({ state: 'visible' });
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]")).toBeVisible();
    await page.locator("(//i[@class=\"fa fas fa-trash trash-icon\"])[5]").click();
    await expect(page.locator("//h5[text()[normalize-space() = \"Delete Enumeration Pair\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Yes, Go ahead.\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    await expect(page.locator("//h5[text()[normalize-space() = \"Save and Move to Next Page\"]]")).toBeVisible();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//span[text()[normalize-space() = \"Save and Publish\"]]")).toBeVisible();
    await page.locator("//button[text()[normalize-space() = \"Import Rule\"]]").click();
    await expect(page.locator("//h5[text()[normalize-space() = \"Select Rule/s\"]]")).toBeVisible();
    await page.locator("typeahead-dropdown").fill(testData["Search Map Input"]);
    await page.locator("(//span[text()[normalize-space() = \"Deepika Aug1\"]])[1]").click();
    await page.locator("//input[@id=\"TEst - 0\"]").check();
    await page.locator("//span[contains(normalize-space(),\"Apply Selected 1\")]").click();
    await page.waitForLoadState('networkidle');
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Save and Publish\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("(//td[@data-title=\"Status\"])[1]")).toContainText("ACTIVE");
    vars["Version"] = await page.locator("(//td[@data-title=\"Version\"])[1]").textContent() || '';
    await expect(page.getByText(vars["Version"])).toBeVisible();
    await expect(page.getByText(vars["Create New Map"])).toBeVisible();
  });
});
