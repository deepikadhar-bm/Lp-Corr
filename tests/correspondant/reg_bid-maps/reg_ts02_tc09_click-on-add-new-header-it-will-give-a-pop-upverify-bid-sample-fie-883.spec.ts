import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS02_TC09_Click on \\\"Add New Header\\\" it will give a pop up.Verify Bid Sample Field Name cannot be blank. It should display error message.Verify add row functionality.Upon Edit.Verify CLM Field Na', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Creation_Of_Bid_Map_Upto_Header_Mapping(page, vars);
    await expect(page.locator("//button[text()[normalize-space() = \"Add New Header\"]]")).toBeVisible();
    await page.locator("//button[text()[normalize-space() = \"Add New Header\"]]").click();
    await expect(page.locator("//span[text()[normalize-space() = \"Insert Header\"]]")).toBeVisible();
    await expect(page.locator("//div[contains(@class, 'd-flex') and contains(@class, 'small')]/following-sibling::div[contains(@class, 'd-flex')]//input[contains(@class, 'form-control')]")).toHaveValue('');
    await page.locator("//span[text()[normalize-space() = \"Insert Header\"]]").click();
    await expect(page.locator("//div[text()[normalize-space() = \"Name can't be empty.\"]]")).toBeVisible();
    await expect(page.locator("//a[text()[normalize-space() = \"Add Row\"]]")).toBeVisible();
    await expect(page.locator("//div[contains(@class, 'd-flex') and contains(@class, 'small')]/following-sibling::div[contains(@class, 'd-flex')]//select[contains(@class, 'form-select')]").locator('option', { hasText: testData["Chase Field Name"] })).toBeVisible();
    await page.locator("//div[text()='Custom Header']//..//..//input[contains(@class, 'form-control')]").fill(testData["Custom Header"]);
    await page.locator("//div[contains(@class, 'd-flex') and contains(@class, 'small')]/following-sibling::div[contains(@class, 'd-flex')]//select[contains(@class, 'form-select')]").selectOption({ label: testData["Chase Field Name"] });
    await page.locator("//a[text()[normalize-space() = \"Add Row\"]]").click();
    await expect(page.locator("(//input[@class='form-control w-100'])[last()]")).toBeVisible();
    await expect(page.locator("(//a[contains(@class, 'fa-trash-alt')])[last()]")).toBeVisible();
    await page.locator("(//a[contains(@class, 'fa-trash-alt')])[last()]").click();
    await expect(page.locator("//div[text()[normalize-space() = 'You have selected to delete \"\" mapping. Do you want to proceed?']]")).toBeVisible();
    await expect(page.locator("(//i[contains(@class, 'fa-lg') and contains(@class, 'color-primary') and contains(@class, 'fa-times')])[2]")).toBeVisible();
    await page.locator("(//i[contains(@class, 'fa-lg') and contains(@class, 'color-primary') and contains(@class, 'fa-times')])[2]").click();
    await expect(page.locator("(//i[contains(@class, 'fa-lg') and contains(@class, 'color-primary') and contains(@class, 'fa-times')])[2]")).toBeVisible();
    await page.locator("(//a[contains(@class, 'fa-trash-alt')])[last()]").click();
    await expect(page.locator("//div[text()[normalize-space() = 'You have selected to delete \"\" mapping. Do you want to proceed?']]")).toBeVisible();
    await expect(page.locator("//span[text()[normalize-space() = \"Yes, Proceed\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Yes, Proceed\"]]").click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator("(//div[@class=\"d-flex gap-3 align-items-start mb-3\"])[2]")).toBeVisible();
    await expect(page.locator("//span[text()[normalize-space() = \"Insert Header\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Insert Header\"]]").click();
    vars["RGB_Yellow_Color"] = "rgba(255, 245, 192, 1)";
    vars[""] = await page.locator("(//div[contains(@class,'gap-2 header-grid-layout')][contains(.,'@|Custom Header|')])[1]").evaluate((el) => window.getComputedStyle(el as HTMLElement).backgroundColor);
    expect(String(vars["RGB_Yellow_Color"])).toBe(vars["InsertedHeaderColor"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText(testData["Custom Header"])).toBeVisible();
    await expect(page.locator("(//select[@class='form-select'])[2]")).toContainText(testData["Chase Field Name"]);
    await page.locator("//div[text()[normalize-space() = \"Appraisal Waiver\"]]/following-sibling::div[contains(@class, 'd-flex')]//i[contains(@class, 'fa-pencil-alt')]").click();
    await page.locator("//div[contains(@class, 'd-flex') and contains(@class, 'small')]/following-sibling::div[contains(@class, 'd-flex')]//select[contains(@class, 'form-select')]").selectOption({ label: testData["ChaseFieldNames"] });
    await page.locator("//div[contains(@class, 'd-flex') and contains(@class, 'small')]/following-sibling::div[contains(@class, 'd-flex')]//select[contains(@class, 'form-select')]").selectOption({ label: testData["BidFields"] });
    await expect(page.getByText(testData["BidFields"])).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Update Header\"]]").click();
    await expect(page.locator("(//div[@class=\"flex-grow-1\" and text()=\"Appraisal Waiver\"]/..//select)[1]")).toContainText(testData["BidFields"]);
    await expect(page.locator("(//div[@class=\"flex-grow-1\" and text()=\"Appraisal Waiver\"]/..//select)[1]")).toBeVisible();
    await page.locator("(//div[@class=\"flex-grow-1\"]/../..//select)[2]").click();
    vars["Chase Field name"] = await page.locator("((//div[@class=\"flex-grow-1\"]/../..//select)[2]/..//option)[4]").textContent() || '';
    await page.locator("(//div[@class=\"flex-grow-1\"]/../..//select)[2]").selectOption({ index: parseInt("3") });
    await expect(page.locator("(//div[@class=\"flex-grow-1\"]/../..//select)[2]")).toBeVisible();
    await expect(page.locator("((//div[@class=\"flex-grow-1\"]/../..//select)[2]/..//option)[4]")).toContainText(vars["Chase Field name"]);
  });
});
