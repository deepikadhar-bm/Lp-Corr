import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS06_TC01_Verify the save actions should not allow the duplicate selections for the chase field name values.', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Creation_Of_Bid_Map_Upto_Header_Mapping(page, vars);
    await expect(page.locator("//h1[@class=\"fw-semibold py-3\"]")).toBeVisible();
    await page.locator("(//select[contains(@class, 'form-select')])[2]").selectOption({ label: testData["ChaseFieldName"] });
    vars["Select Bid Sample Field Name"] = await page.locator("//div[@class=\"flex-grow-1\"]/..//div[text()=\"Amortization Term\"]").textContent() || '';
    vars["Chase Field Name"] = await page.locator("(//select[@class=\"form-select\"])[2]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
    await page.locator("//div[contains(@class, 'container') and contains(@class, 'd-flex')]/div[2]/button[2]").click();
    vars["BidSampleField"] = await page.locator("//td[text()[normalize-space() = \"Appraised Value\"]]/following-sibling::td//div[text()[normalize-space() = \"Amortization Term\"]]").textContent() || '';
    vars["Chase Field Namepopup"] = await page.locator("//td[text()[normalize-space() = \"Appraised Value\"]]/following-sibling::td//div[text()[normalize-space() = \"Appraised Value\"]]").textContent() || '';
    expect(String(vars["Select Bid Sample Field Name"])).toBe(vars["BidSampleField"]);
    expect(String(vars["Chase Field Name"])).toBe(vars["Chase Field Namepopup"]);
    await expect(page.getByText("Multiple client headers are mapped to the same Chase Field name. Please review and make changes.")).toBeVisible();
    await expect(page.locator("//div[contains(@class, 'modal-body')]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Continue Editing\"]]").waitFor({ state: 'visible' });
  });
});
