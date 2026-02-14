import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS08_TC08_CASE-01_ If they haven\\\'t changed any value and they have unidentified fields - Message should be \\\"You have unidentified fields do you want to proceed further\\\". - its just \\\"Yes, Proce', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Smart_Mapper_from_Off_to_On(page, vars);
    await stepGroups.stepGroup_Creation_Of_Bid_Map_Upto_Header_Mapping(page, vars);
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await expect(page.locator("(//button[@type=\"button\"])[last()]")).toBeVisible();
    await page.locator("(//button[@type=\"button\"])[last()]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["UnidentifiedFieldsCount"] = String(await page.locator("//div[@class=\"mb-2\"]//select[@title=\"\"]").count());
    expect(String(vars["UnidentifiedFieldsCount"])).toBe("1");
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    await expect(page.locator("//p[text()[normalize-space() = \"You have unidentified fields do you want to proceed further.\"]]")).toBeVisible();
    await stepGroups.stepGroup_IF_Condition_for_Yes_Proceed_Button(page, vars);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
  });
});
