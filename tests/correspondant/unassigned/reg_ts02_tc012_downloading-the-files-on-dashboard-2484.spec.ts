import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS02_TC01.2_Downloading the files on Dashboard', async ({ page }) => {
    // Set up download handler
    page.on('download', async (download) => {
      const filePath = path.join('test-results', 'downloads', download.suggestedFilename());
      await download.saveAs(filePath);
      vars['_lastDownloadPath'] = filePath;
    });

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//label[text()=\"Select Date Range\"]//following::div[contains(@class,\"custom\")]//a[@role=\"button\"]").click();
    await page.locator("//div[contains(@class, 'popover-body')]//span[text()[normalize-space() = \"Last Month\"]]").waitFor({ state: 'visible' });
    await page.locator("//div[contains(@class, 'popover-body')]//span[text()[normalize-space() = \"Last Month\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["TotalCountOfDownloadButtons"] = String(await page.locator("//a[contains(@class,\"download\")]").count());
    vars["Count"] = "1";
    while (parseFloat(String(vars["Count"])) <= parseFloat(String(vars["TotalCountOfDownloadButtons"]))) {
      await page.locator("(//a[contains(@class,\"download\")])[$|Count|]").scrollIntoViewIfNeeded();
      await expect(page.locator("(//a[contains(@class,\"download\")])[$|Count|]")).toBeVisible();
      vars["ExpectedFileName"] = await page.locator("(//a[contains(@class,\"download\")]/../../..//div[contains(@class,\"items\")]//h5)[$|Count|]").textContent() || '';
      vars[""] = String(vars["ExpectedFileName"]).replace(/ExpectedFileName/g, "");
      await page.locator("(//a[contains(@class,\"download\")])[$|Count|]").evaluate(el => (el as HTMLElement).click());
      await page.waitForTimeout(3000); // Wait for download to complete
      await page.waitForTimeout(10000);
      vars[""] = vars['_lastDownloadPath'] ? require('path').basename(vars['_lastDownloadPath']) : '';
      expect(String(vars["DownloadedFileName"]).toLowerCase()).toContain(String(vars["ExpectedFileName"]).toLowerCase());
      await page.locator("(//a[contains(@class,\"expand\")])[$|Count|]").click();
      await page.locator("//button[@aria-label=\"Download\"]").waitFor({ state: 'visible' });
      await page.locator("//button[@aria-label=\"Download\"]").click();
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      await page.locator("(//a[contains(@class,\"expand\")])[$|Count|]").click();
      await page.locator("//button[@aria-label=\"Cancel\"]").waitFor({ state: 'visible' });
      await page.locator("//button[@aria-label=\"Cancel\"]").click();
      await page.waitForLoadState('networkidle');
      vars["Count"] = (parseFloat(String(vars["Count"])) + parseFloat(String("1"))).toFixed(0);
    }
  });
});
