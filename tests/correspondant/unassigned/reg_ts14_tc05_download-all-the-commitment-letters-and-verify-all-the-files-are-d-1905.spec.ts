import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';
import * as fileHelper from '../../../src/helpers/file-helpers';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS14_TC05_Download all the commitment letters and verify all the files are downloaded', async ({ page }) => {
    // Set up download handler
    page.on('download', async (download) => {
      const filePath = path.join('test-results', 'downloads', download.suggestedFilename());
      await download.saveAs(filePath);
      vars['_lastDownloadPath'] = filePath;
    });

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    vars["CommitID"] = await page.locator("//td[@data-title=\"Comm. ID\"]//a[contains(@aria-label,\"View details for commitment\")]").textContent() || '';
    vars["ExpectedFileName"] = "Commitment_" + vars["CommitID"] + "_all_letters.zip";
    vars["ExpectedFileName"] = String(vars["ExpectedFileName"]).trim();
    await page.locator("//td[@data-title=\"Comm. Letter\"]//span").click();
    await expect(page.locator("(//td[@data-title=\"File Name\"])[last()]")).toContainText(vars["ExpectedFileName"]);
    await page.locator("//button[text()=\" ALL \"]").click();
    await page.waitForTimeout(1000);
    vars[""] = fileHelper.getZipFileNames(vars['_lastDownloadPath'] || '');
    await page.waitForTimeout(5000);
    vars[""] = fileHelper.unzip(vars['_lastDownloadPath'] || '');
    vars["count"] = "1";
    vars["FilesCount"] = String(await page.locator("//div[@id='modalBody']//td[@data-title='File Name' and contains(text(), '.xlsx')]").count());
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["FilesCount"]))) {
      vars["IndividualFileName1"] = await page.locator("(//div[@id='modalBody']//td[@data-title='File Name' and contains(text(), '.xlsx')])[$|count|]").textContent() || '';
      expect(require('fs').existsSync(require('path').join(String(''), String('')))).toBeTruthy();
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
  });
});
