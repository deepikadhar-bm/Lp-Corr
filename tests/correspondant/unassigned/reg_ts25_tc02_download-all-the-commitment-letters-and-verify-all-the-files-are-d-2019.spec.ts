import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';
import * as fileHelper from '../../../src/helpers/file-helpers';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS25_TC02_Download all the commitment letters and verify all the files are downloaded', async ({ page }) => {
    // Set up download handler
    page.on('download', async (download) => {
      const filePath = path.join('test-results', 'downloads', download.suggestedFilename());
      await download.saveAs(filePath);
      vars['_lastDownloadPath'] = filePath;
    });

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//div[normalize-space()=\"Closed List\"]").click();
    await page.locator("(//td[@data-title=\"Comm. Letter\"]//span)[2]").click();
    // [DISABLED] Click on Commitment Letter
    // await page.locator("//td[@data-title=\"Comm. Letter\"]//span").click();
    await page.locator("//button[text()=\" ALL \"]").click();
    await page.waitForTimeout(1000);
    vars["AllFilesFileNameUI"] = await page.locator("(//td[@data-title=\"File Name\"])[last()]").textContent() || '';
    vars[""] = vars['_lastDownloadPath'] ? require('path').basename(vars['_lastDownloadPath']) : '';
    vars[""] = fileHelper.getZipFileNames(vars['_lastDownloadPath'] || '');
    await page.waitForTimeout(5000);
    vars[""] = fileHelper.unzip(vars['_lastDownloadPath'] || '');
    vars["count"] = "1";
    vars["FilesCount"] = String(await page.locator("//div[@id='modalBody']//td[@data-title='File Name' and contains(text(), '.xlsx')]").count());
    expect(String(vars["DownloadedFileName"])).toBe(vars["AllFilesFileNameUI"]);
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["FilesCount"]))) {
      vars["IndividualFileName1"] = await page.locator("(//div[@id='modalBody']//td[@data-title='File Name' and contains(text(), '.xlsx')])[$|count|]").textContent() || '';
      expect(require('fs').existsSync(require('path').join(String(''), String('')))).toBeTruthy();
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
  });
});
