import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS35_TC02_Verify the clear search functionality for Search Through Id Input', async ({ page }) => {
    // Prerequisite: REG_TS35_TC01_Verify that entering 3 or more digits in the search input displays bid records that ma
    // TODO: Ensure prerequisite test passes first

    await expect(page.locator("(//div[@aria-label=\"Pagination Controls\"]//span)[3]")).toBeVisible();
    if (true) /* Verify that the element Navigate To Page displays text conta */ {
      await expect(page.locator("(//div[@aria-label=\"Pagination Controls\"]//span)[2]")).toBeEnabled();
      await page.locator("(//div[@aria-label=\"Pagination Controls\"]//span)[2]").click();
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      await expect(page.locator("(//div[@aria-label=\"Pagination Controls\"]//span)[3]")).toContainText("Page 1");
    }
    vars["IDSearchedFor"] = await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").inputValue() || '';
    await expect(page.locator("//button[contains(@class,\"search-cancel-btn\")]//i")).toBeEnabled();
    await page.locator("//button[contains(@class,\"search-cancel-btn\")]//i").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    if (true) /* Element Bid ID Contains SearchedID is visible */ {
      vars["BidIDWithSearchIDCount"] = String(await page.locator("//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Bid Req. ID\"]//button[contains(@aria-label, \"$|IDSearchedFor|\")]").count());
      expect(String(vars["BidIDWithSearchIDCount"])).toBe("20");
    } else {
      await expect(page.locator("//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Bid Req. ID\"]//button[contains(@aria-label, \"$|IDSearchedFor|\")]")).toBeVisible();
    }
  });
});
