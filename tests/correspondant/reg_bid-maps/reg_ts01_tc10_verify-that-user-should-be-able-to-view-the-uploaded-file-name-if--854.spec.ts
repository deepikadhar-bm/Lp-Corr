import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS01_TC10_Verify that user should be able to view the uploaded file name (if it is short then the complete file name will be displayed, if it has more than like 22characters then upon hovering on ', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Creation_Of_New_Map(page, vars);
    await page.locator("//input[@type=\"file\"]").setInputFiles(path.resolve(__dirname, 'test-data', "Bid Maps File QA(csv),Bid Maps File QA(CSV).csv"));
    vars["File"] = await page.locator("//div[@class=\"card\"]").inputValue() || '';
    await page.locator("//div[@class=\"card\"]").hover();
    await expect(page.getByText(vars["File"])).toBeVisible();
    await expect(page.locator("//div[@class=\"card\"]")).toBeVisible();
    await expect(page.locator("//i[@class=\"fas fa-trash-alt text-danger\"]/../..//button[@type=\"button\"]")).toBeVisible();
    await page.locator("//i[@class=\"fas fa-trash-alt text-danger\"]/../..//button[@type=\"button\"]").click();
    await expect(page.locator("//i[@class=\"fas fa-times-circle text-primary\"]")).toBeVisible();
    await expect(page.locator("//div[text()[normalize-space() = \"This action cannot be undone\"]]/..")).toBeVisible();
    await page.locator("//i[contains(@class, 'fa-lg') and contains(@class, 'color-primary') and contains(@class, 'fa-times')]").click();
    await expect(page.locator("//div[@class=\"card\"]")).toBeVisible();
    await page.locator("//i[@class=\"fas fa-trash-alt text-danger\"]/../..//button[@type=\"button\"]").click();
    await expect(page.locator("//span[text()[normalize-space() = \"No\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"No\"]]").click();
    await expect(page.locator("//div[@class=\"card\"]")).toBeVisible();
    await page.locator("//i[@class=\"fas fa-trash-alt text-danger\"]/../..//button[@type=\"button\"]").click();
    await expect(page.locator("(//button[@type=\"button\"])[last()]")).toBeVisible();
    await page.locator("(//button[@type=\"button\"])[last()]").click();
    await page.waitForLoadState('networkidle');
    await page.locator("//input[@type=\"file\"]").setInputFiles(path.resolve(__dirname, 'test-data', "Bid Maps File QAtfydrdydcesestrduytfydrtd.xlsx,Bid Maps File QAtfydrdydcesestrduytfydrtd(xlsx).xlsx"));
    vars["File"] = await page.locator("//div[@class=\"card\"]").inputValue() || '';
    await page.locator("//div[@class=\"card\"]").hover();
    await expect(page.getByText(vars["File"])).toBeVisible();
    await expect(page.locator("//div[@class=\"card\"]")).toBeVisible();
    await page.waitForLoadState('networkidle');
    await expect(page.locator("//span[text()[normalize-space() = \"BACK\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"BACK\"]]").click();
    await expect(page.locator("//i[contains(@class, 'fa-lg') and contains(@class, 'color-primary') and contains(@class, 'fa-times')]")).toBeVisible();
    await page.locator("//i[contains(@class, 'fa-lg') and contains(@class, 'color-primary') and contains(@class, 'fa-times')]").click();
    await expect(page.locator("//div[text()[normalize-space() = \"You have unsaved changes! If you leave, your changes will be lost.\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"BACK\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"Continue Editing\"]]").click();
    await expect(page.locator("//div[text()[normalize-space() = \"You have unsaved changes! If you leave, your changes will be lost.\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"BACK\"]]").click();
    await expect(page.locator("//div[text()[normalize-space() = \"You have unsaved changes! If you leave, your changes will be lost.\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Proceed without Saving\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("(//td[@data-title=\"Status\"])[1]")).toContainText("DRAFT");
    await page.locator("//button[contains(text(),\"$|BidMap|\")]").filter({ hasText: vars["BidMap"] }).click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//select[@aria-label=\"Dropdown selection\"]")).toHaveValue('');
    await expect(page.locator("//button[@id='multiSelectDropDown']")).toBeVisible();
    await expect(page.getByText(testData["Upload File Text Verification"])).toBeVisible();
  });
});
