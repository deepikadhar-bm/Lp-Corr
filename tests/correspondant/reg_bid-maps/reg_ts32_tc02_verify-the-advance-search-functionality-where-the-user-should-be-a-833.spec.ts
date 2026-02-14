import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS32_TC02_Verify the advance search functionality, where the user should be able to perform search action based on the rules and actions.', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await expect(page.locator("//h3[text()[normalize-space() = \"Dashboard\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"Bid Maps\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//input[@placeholder=\"Search/Filter\"]").click();
    await page.locator("//a[text()[normalize-space() = \"Try Advanced Search and Filter option\"]]").click();
    await expect(page.locator("//*[text()[normalize-space() = \"Advanced Search/Filter\"]]")).toBeVisible();
    await page.locator("//label[text()=\"If Bid Field\"]/../..//select/ancestor::div//*[@aria-label=\"Bid Map Field\"]//select").selectOption({ label: testData["Advanced Search"] });
    await page.locator("//div[@aria-labelledby=\"rulesGroup\"]/following-sibling::div//*[@aria-label=\"LP Field Value\"]//input").fill(Array.from({length: 5}, () => "ab".charAt(Math.floor(Math.random() * 2))).join(''));
    await page.locator("//label[text()=\"Chase value\"]/../..//*[@aria-label=\"LP Field Type\"]//select").selectOption({ label: testData["Advanced Search"] });
    await page.locator("(//label[text()=\"Chase value\"])[2]/../..//*[@aria-label=\"LP Field Value\"]//input").fill(Array.from({length: 5}, () => "ab".charAt(Math.floor(Math.random() * 2))).join(''));
    await page.locator("//span[text()[normalize-space() = \"Show Results\"]]").click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator("//td[text()[normalize-space() = \"No result\"]]")).toBeVisible();
  });
});
