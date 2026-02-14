import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS08_TC10_CASE-03_  They have changes and they don\\\'t have unidentified field - Message should be  \\\"Note : This action will save the changes and Move to Next Page\\\".', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Smart_Mapper_from_Off_to_On(page, vars);
    await stepGroups.stepGroup_Creation_Of_Bid_Map_Upto_Header_Mapping(page, vars);
    await page.waitForLoadState('networkidle');
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await expect(page.locator("//p[text()[normalize-space() = \"You have unidentified fields do you want to proceed further.\"]]")).toBeVisible();
    if (true) /* Element Yes, Proceed Button is visible */ {
      await page.locator("//button[@aria-label=\"Yes, Proceed\"]").click();
    } else {
      await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    }
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["count"] = "1";
    vars["ChaseValues"] = String(await page.locator("//div[@class=\"mb-2\"]//..//select[@class=\"form-select\"]").count());
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["ChaseValues"]))) {
      vars["values"] = await page.locator("(//div[@class=\"mb-2\"]//..//select[@class=\"form-select\"])[$|count|]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
      vars["value"] = String(vars["values"]).trim();
      if (String(vars["value"]) === String("Select")) {
        await page.locator("(//div[@class=\"mb-2\"]//..//select[@class=\"form-select\"])[$|count|]").selectOption({ index: parseInt("1") });
      } else {
      }
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    await expect(page.getByText(testData["Action Save message"])).toBeVisible();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"BACK\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Add_Field_in_Enumeration_Mapping(page, vars);
    await page.locator("(//div[text()=\"Loan Purpose\"]/../..//select)[2]").selectOption({ index: parseInt("1") });
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    await expect(page.getByText(testData["Action Save message"])).toBeVisible();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"BACK\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("(//div[text()=\"Attachment Type\"]/../..//select)[1]").selectOption({ index: parseInt("2") });
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    await expect(page.getByText(testData["Action Save message"])).toBeVisible();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"BACK\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Delete_In_Enumeration_Mapping(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    await expect(page.getByText(testData["Action Save message"])).toBeVisible();
    await expect(page.locator("//button[@aria-label=\"Proceed with Saving\"]")).toBeVisible();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"BACK\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("(//div[text()=\"Select\"]/../../descendant::input[@type=\"checkbox\"])[1]").check();
    await page.locator("(//div[text()=\"Select\"]/../../descendant::input[@type=\"checkbox\"])[2]").check();
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    await expect(page.getByText(testData["Action Save message"])).toBeVisible();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"BACK\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("(//div[text()=\"Select\"]/../../descendant::input[@type=\"checkbox\"])[1]").uncheck();
    await page.locator("(//div[text()=\"Select\"]/../../descendant::input[@type=\"checkbox\"])[2]").uncheck();
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    await expect(page.getByText(testData["Action Save message"])).toBeVisible();
    await page.locator("//button[@aria-label=\"Proceed with Saving\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"BACK\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
  });
});
