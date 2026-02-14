import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS34_TC09_Verify Clear All Feature In Search Filter Dropdown', async ({ page }) => {
    // Prerequisite: REG_TS34_TC01_Verify Date Range and Company/CCode Functionality In Search Filter
    // TODO: Ensure prerequisite test passes first

    await page.locator("//span[text()[normalize-space() = \"Filter\"]]").click();
    await page.locator("//button[text()[normalize-space() = \"Clear All\"]]/..").click();
    await page.waitForLoadState('networkidle');
    vars["count"] = "1";
    vars["Count of Uploaded Date"] = String(await page.locator("//td[@data-title=\"Uploaded\"]").count());
    vars["UnFilteredDatesCount"] = String(await page.locator("//td[@data-title=\"Uploaded\"]//div[not(starts-with(text(),\" $|Last Month|\"))]").count());
    expect(String(vars["UnFilteredDatesCount"])).toBe("1");
    vars["TotalRowCountInCompanyColumn"] = String(await page.locator("//td[@data-title=\"Company\"]").count());
    vars["TotalRowOfFilteredCompanyColumn"] = String(await page.locator("//td[@data-title=\"Company\"]//div[text()=\" @|Company Name| \"]").count());
    if (String(vars["TotalRowCountInCompanyColumn"]) === String(vars["TotalRowOfFilteredCompanyColumn"])) {
    } else {
      vars["CountOfCompaniesAfterClearAll"] = String(await page.locator("//td[@data-title=\"Company\"]//div[not(text()=\" $|ExpectedCompany| \")]").count());
      expect(String(vars["CountOfCompaniesAfterClearAll"])).toBe("1");
    }
  });
});
