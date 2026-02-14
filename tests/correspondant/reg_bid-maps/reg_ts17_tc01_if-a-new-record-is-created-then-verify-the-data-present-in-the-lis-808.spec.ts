import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS17_TC01_If a new record is created then verify the data present in the list should be displayed properly.', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Smart_Mapper_from_Off_to_On(page, vars);
    await stepGroups.stepGroup_Creation_Of_Bid_Map_Upto_Header_Mapping(page, vars);
    await expect(page.locator("//span[text()='Enumeration Mapping']")).toBeVisible();
    await page.locator("(//i[@class=\"fas fa-pencil-alt\"])[3]").click();
    await expect(page.locator("//h5[text()[normalize-space() = \"Update Header\"]]")).toBeVisible();
    await page.locator("//div[contains(@class, 'd-flex') and contains(@class, 'small')]/following-sibling::div[contains(@class, 'd-flex')]//select[contains(@class, 'form-select')]").click();
    await page.locator("//div[contains(@class, 'd-flex') and contains(@class, 'small')]/following-sibling::div[contains(@class, 'd-flex')]//select[contains(@class, 'form-select')]").selectOption({ label: testData["ChaseFieldNames"] });
    await page.locator("//span[text()[normalize-space() = \"Update Header\"]]").click();
    await page.waitForLoadState('networkidle');
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await expect(page.locator("//h5[text()[normalize-space() = \"Save and Move to Next Page\"]]")).toBeVisible();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]")).toBeVisible();
    await page.locator("(//i[@class=\"fa fas fa-trash trash-icon\"])[5]").click();
    await expect(page.locator("//h5[text()[normalize-space() = \"Delete Enumeration Pair\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Yes, Go ahead.\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    if (true) /* Element You have unidentified Fields.This action will save a */ {
      await expect(page.locator("//*[contains(text(),\"You have unidentified fields.\")]/../..//*[text()=\" This action will save the changes and Move to Next Page. \"]")).toBeVisible();
      await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    }
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//span[text()[normalize-space() = \"Save and Publish\"]]")).toBeVisible();
    await page.locator("//button[text()[normalize-space() = \"Import Rule\"]]").click();
    await expect(page.locator("//h5[text()[normalize-space() = \"Select Rule/s\"]]")).toBeVisible();
    await page.locator("typeahead-dropdown").fill(testData["Search Map Input"]);
    await page.locator("(//span[text()[normalize-space() = \"Deepika Aug1\"]])[1]").click();
    await page.locator("//input[@id=\"TEst - 0\"]").check();
    await page.locator("//span[contains(normalize-space(),\"Apply Selected 1\")]").click();
    await expect(page.locator("//h6[text()[normalize-space() = \"Add Conditions\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Save and Publish\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["CCode"] = await page.locator("//td[@data-title=\"CCode\"]").textContent() || '';
    await expect(page.getByText(vars["CCode"])).toBeVisible();
    vars["MapName"] = await page.locator("//td[@data-title=\"Map Name\"]").textContent() || '';
    await expect(page.getByText(vars["MapName"])).toBeVisible();
    vars["CompanyName"] = await page.locator("(//td[@data-title=\"Company\"])[1]").textContent() || '';
    await expect(page.locator("(//td[@data-title=\"Company\"])[1]")).toContainText(vars["CompanyName"]);
    vars["Status"] = await page.locator("(//td[@data-title=\"Status\"])[1]").textContent() || '';
    await expect(page.getByText(vars["Status"])).toBeVisible();
    vars["Version"] = await page.locator("(//td[@data-title=\"Version\"])[1]").textContent() || '';
    await expect(page.getByText(vars["Version"])).toBeVisible();
    vars["LastModified"] = await page.locator("//td[@data-title=\"Last Modified\"]").textContent() || '';
    await expect(page.getByText(vars["LastModified"])).toBeVisible();
    vars["CreatedOn"] = await page.locator("//td[@data-title=\"Created On\"]").textContent() || '';
    await expect(page.getByText(vars["CreatedOn"])).toBeVisible();
    vars["Created By"] = await page.locator("//td[@data-title=\"Created By\"]").textContent() || '';
    await expect(page.getByText(vars["Created By"])).toBeVisible();
    vars["LastModifiedBy"] = await page.locator("//td[@data-title=\"Last Modified By\"]").textContent() || '';
    await expect(page.getByText(vars["LastModifiedBy"])).toBeVisible();
  });
});
