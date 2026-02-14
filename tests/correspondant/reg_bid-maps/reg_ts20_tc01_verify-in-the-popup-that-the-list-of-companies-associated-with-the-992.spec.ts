import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS20_TC01_Verify in the popup that the list of companies associated with the map is displayed along with the proper date.', async ({ page }) => {
    // Prerequisite: REG_TS19_TC01_Verify if there is more than one company associated with a map, then the count of asso
    // TODO: Ensure prerequisite test passes first

    await page.locator("(//button[contains(@class,'more-clients custom-bg-primary text-white fs-xs border-0')])[1]").click();
    await page.waitForLoadState('networkidle');
    vars["Create New Map"] = await page.locator("//h5[contains(.,'$|Create New Map|')]").textContent() || '';
    await expect(page.locator("//h5[contains(.,'$|Create New Map|')]")).toContainText(vars["Create New Map"]);
    vars["CompanyName1"] = await page.locator("//td[@data-title=\"Company\" and contains(text(),\"$|firstCompanySelected|\")]").textContent() || '';
    vars["CompanyName2"] = await page.locator("//td[@data-title=\"Company\" and contains(text(),\"$|secondCompanySelected|\")]").textContent() || '';
    vars["CompanyName3"] = await page.locator("//td[@data-title=\"Company\" and contains(text(),\"$|thirdCompanySelected|\")]").textContent() || '';
    vars["CompanyName4"] = await page.locator("//td[@data-title=\"Company\" and contains(text(),\"$|fourthCompanySelected|\")]").textContent() || '';
    await page.waitForLoadState('networkidle');
    expect(String(vars["firstCompanySelected"])).toBe(vars["CompanyName1"]);
    expect(String(vars["secondCompanySelected"])).toBe(vars["CompanyName2"]);
    expect(String(vars["thirdCompanySelected"])).toBe(vars["CompanyName3"]);
    expect(String(vars["fourthCompanySelected"])).toBe(vars["CompanyName4"]);
    vars["AddedOn"] = await page.locator("(//h5[@class=\"modal-title fw-semibold\"]/../../..//td[@data-title=\"Added On\"])[1]").textContent() || '';
    vars["AddedOn"] = await page.locator("(//h5[@class=\"modal-title fw-semibold\"]/../../..//td[@data-title=\"Added On\"])[2]").textContent() || '';
    vars["AddedOn"] = await page.locator("(//h5[@class=\"modal-title fw-semibold\"]/../../..//td[@data-title=\"Added On\"])[3]").textContent() || '';
    vars["AddedOn"] = await page.locator("(//h5[@class=\"modal-title fw-semibold\"]/../../..//td[@data-title=\"Added On\"])[4]").textContent() || '';
    if (String(vars["CreatedOn"]) === String(vars["AddedOn"])) {
    } else if (String(vars["CreatedOn1"]) === String(vars["AddedOn"])) {
    } else {
      expect(String(vars["CreatedOn2"])).toBe(vars["AddedOn"]);
    }
  });
});
