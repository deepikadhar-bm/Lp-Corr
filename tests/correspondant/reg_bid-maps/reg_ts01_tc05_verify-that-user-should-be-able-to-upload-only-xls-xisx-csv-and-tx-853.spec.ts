import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS01_TC05_Verify that user should be able to upload only \\\"xls, xIsx, csv and txt files and we should not allow the user to upload any other file if tried uploading then it should display the erro', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"Bid Maps\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//button[text()[normalize-space() = \"Add New Mapping\"]]").click();
    await expect(page.locator("//h5[text()[normalize-space() = \"Create New Map\"]]")).toBeVisible();
    vars["Create New Map"] = new Date().toLocaleDateString('en-US') /* format: dd/MM/yyyy/HH:mm:ss */;
    vars["Create New Map"] = "Testsigma_" + vars["Create New Map"];
    await page.locator("mapName").fill(vars["Create New Map"]);
    vars["BidMap"] = await page.locator("mapName").inputValue() || '';
    await page.locator("//button[@aria-label=\"Create\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//span[contains(.,' $|Create New Map|')]")).toContainText(vars["Create New Map"]);
    await page.locator("//div//div[@id=\"companySelect\"]//div//button[@id=\"multiSelectDropDown\"]").click();
    await expect(page.locator("//button[contains(text(),\" Apply Selected \")]")).toBeVisible();
    vars["CompanyCount"] = String(await page.locator("(//label[@class='dropdown-item d-flex'])").count());
    await page.locator("//input[@id='chkItemallIdundefined']").check();
    await expect(page.locator("//span[@class=\"counter bg-white text-primary mx-2 text-center fw-semibold small\"]")).toContainText(vars["CompanyCount"]);
    await page.locator("//button[contains(text(),\" Apply Selected \")]").click();
    await expect(page.locator("//select[@aria-label=\"Dropdown selection\"]")).toHaveValue('');
    await page.locator("(//input[@type=\"file\"])[1]").setInputFiles(path.resolve(__dirname, 'test-data', "Bid Maps File,Bid Maps File.xlsx"));
    await expect(page.locator("//i[@class=\"fas fa-trash-alt text-danger\"]/../..//button[@type=\"button\"]")).toBeVisible();
    await page.locator("//i[@class=\"fas fa-trash-alt text-danger\"]/../..//button[@type=\"button\"]").click();
    await expect(page.locator("//i[contains(@class, 'fa-lg') and contains(@class, 'color-primary') and contains(@class, 'fa-times')]")).toBeVisible();
    await expect(page.locator("//div[text()[normalize-space() = \"This action cannot be undone\"]]/..")).toBeVisible();
    await expect(page.locator("(//button[@type=\"button\"])[last()]")).toBeVisible();
    await page.locator("(//button[@type=\"button\"])[last()]").click();
    await page.waitForLoadState('networkidle');
    await page.locator("//input[@type=\"file\"]").setInputFiles(path.resolve(__dirname, 'test-data', "Bid Maps File CSV,Bid Maps File CSV.csv"));
    await expect(page.locator("//i[@class=\"fas fa-trash-alt text-danger\"]/../..//button[@type=\"button\"]")).toBeVisible();
    await page.locator("//i[@class=\"fas fa-trash-alt text-danger\"]/../..//button[@type=\"button\"]").click();
    await expect(page.locator("//div[text()[normalize-space() = \"This action cannot be undone\"]]/..")).toBeVisible();
    await page.locator("//i[contains(@class, 'fa-lg') and contains(@class, 'color-primary') and contains(@class, 'fa-times')]").click();
    await page.waitForLoadState('networkidle');
    await page.locator("//i[@class=\"fas fa-trash-alt text-danger\"]/../..//button[@type=\"button\"]").click();
    await expect(page.locator("//div[text()[normalize-space() = \"This action cannot be undone\"]]/..")).toBeVisible();
    await page.locator("(//button[@type=\"button\"])[last()]").click();
    await page.waitForLoadState('networkidle');
    await page.locator("(//input[@type=\"file\"])[1]").setInputFiles(path.resolve(__dirname, 'test-data', "Bid Maps File XLS,Bid Maps File XLS.xls"));
    await expect(page.locator("//i[@class=\"fas fa-trash-alt text-danger\"]/../..//button[@type=\"button\"]")).toBeVisible();
    await page.locator("//i[@class=\"fas fa-trash-alt text-danger\"]/../..//button[@type=\"button\"]").click();
    await expect(page.locator("//div[text()[normalize-space() = \"This action cannot be undone\"]]/..")).toBeVisible();
    await page.locator("(//button[@type=\"button\"])[last()]").click();
    await page.waitForLoadState('networkidle');
    await page.locator("(//input[@type=\"file\"])[1]").setInputFiles(path.resolve(__dirname, 'test-data', "Bid Maps File txt,Bid Maps File Txt.txt"));
    await expect(page.locator("//i[@class=\"fas fa-trash-alt text-danger\"]/../..//button[@type=\"button\"]")).toBeVisible();
    await page.locator("//i[@class=\"fas fa-trash-alt text-danger\"]/../..//button[@type=\"button\"]").click();
    await expect(page.locator("//div[text()[normalize-space() = \"This action cannot be undone\"]]/..")).toBeVisible();
    await page.locator("(//button[@type=\"button\"])[last()]").click();
    await page.waitForLoadState('networkidle');
    await page.locator("(//input[@type=\"file\"])[1]").setInputFiles(path.resolve(__dirname, 'test-data', "Bid Maps File PDF,Bid Maps File Pdf.pdf"));
    await expect(page.locator("//div[@class=\"error-message\"]")).toBeVisible();
  });
});
