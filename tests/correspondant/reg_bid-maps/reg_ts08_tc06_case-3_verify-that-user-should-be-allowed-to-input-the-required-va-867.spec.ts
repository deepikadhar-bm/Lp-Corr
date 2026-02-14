import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS08_TC06_CASE-3_Verify that user should be allowed to input the required value for the chase value in the dropdown ( for now verify for product code value, loan term - later we can addon).', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Smart_Mapper_from_Off_to_On(page, vars);
    await stepGroups.stepGroup_Creation_Of_New_Map(page, vars);
    await page.locator("//input[@type=\"file\"]").setInputFiles(path.resolve(__dirname, 'test-data', "Bid Maps File,Bid Maps File.xlsx"));
    await page.locator("//div[@class=\"card\"]").hover();
    await page.locator("//span[text()[normalize-space() = \"Map Headers\"]]").click();
    await expect(page.locator("//*[contains(text(),\"This action will save the changes and Move to Next Page\")]")).toBeVisible();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.waitForLoadState('networkidle');
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await expect(page.locator("//p[text()[normalize-space() = \"You have unidentified fields do you want to proceed further.\"]]")).toBeVisible();
    await page.locator("(//button[@type=\"button\"])[last()]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//div[@class='flex-grow-1 text-start text-truncate'][contains(.,'214_25/30 Yr Freddie Mac Fixed')]").click();
    await expect(page.locator("(//input[contains(@placeholder,'Search')])[3]")).toBeVisible();
    await page.locator("(//input[contains(@placeholder,'Search')])[3]").fill("Hii");
    await page.locator("//a[text()[normalize-space() = \"Select\"]]").click();
    await expect(page.locator("//div[@class='flex-grow-1 text-start text-truncate'][contains(.,'Hii')]")).toContainText("Hii");
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    await expect(page.locator("//*[contains(text(),\"You have unidentified fields.\")]/../..//*[text()=\" This action will save the changes and Move to Next Page. \"]")).toBeVisible();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"BACK\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//div[@class='flex-grow-1 text-start text-truncate'][contains(.,'360')]").click();
    await expect(page.locator("(//input[contains(@placeholder,'Search')])[2]")).toBeVisible();
    await page.locator("(//input[contains(@placeholder,'Search')])[2]").fill("hey");
    await page.locator("//a[@role='button'][contains(.,'Select')]").click();
    await expect(page.locator("//div[@class='flex-grow-1 text-start text-truncate'][contains(.,'hey')]")).toContainText("hey");
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    await expect(page.locator("//*[contains(text(),\"You have unidentified fields.\")]/../..//*[text()=\" This action will save the changes and Move to Next Page. \"]")).toBeVisible();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"BACK\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//div[@class='flex-grow-1 text-start text-truncate'][contains(.,'hey')]")).toBeVisible();
  });
});
