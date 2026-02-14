import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS32_TC01.4_Verify the advance search functionality, where the user should be able to perform search action based on the rules and actions.[Advance Search for both Rules and Actions]', async ({ page }) => {
    // Prerequisite: REG_TS32_TC01_Verify the advance search functionality, where the user should be able to perform sear
    // TODO: Ensure prerequisite test passes first

    // Set up download handler
    page.on('download', async (download) => {
      const filePath = path.join('test-results', 'downloads', download.suggestedFilename());
      await download.saveAs(filePath);
      vars['_lastDownloadPath'] = filePath;
    });

    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"Bid Maps\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//input[@placeholder=\"Search/Filter\"]").click();
    await page.locator("//a[text()[normalize-space() = \"Try Advanced Search and Filter option\"]]").click();
    await expect(page.locator("//*[text()[normalize-space() = \"Advanced Search/Filter\"]]")).toBeVisible();
    await page.locator("//label[text()=\"If Bid Field\"]/../..//select/ancestor::div//*[@aria-label=\"Bid Map Field\"]//select").selectOption({ label: vars["RuleBidField1"] });
    await expect(page.getByText(vars["RuleBidField1"])).toBeVisible();
    await page.locator("//div[@aria-labelledby=\"rulesGroup\"]/following-sibling::div//*[@aria-label=\"Operator\"]//select").selectOption({ label: vars["RuleOperator1"] });
    if (true) /* Element Chase Value Input box is visible */ {
      await page.locator("//div[@aria-labelledby=\"rulesGroup\"]/following-sibling::div//*[@aria-label=\"LP Field Value\"]//input").click();
      await page.locator("//div[@aria-labelledby=\"rulesGroup\"]/following-sibling::div//*[@aria-label=\"LP Field Value\"]//input").fill(vars["RuleChaseValue1"]);
    } else if (true) /* Element Chase Values Select is enabled */ {
      await page.locator("//div[@aria-labelledby=\"rulesGroup\"]/following-sibling::div//*[@aria-label=\"LP Field Value\"]//select").selectOption({ label: vars["RuleChaseValue1"] });
    }
    await expect(page.locator("(//*[text()[normalize-space() = \"Actions\"]])[2]")).toBeVisible();
    await page.locator("//label[text()=\"Chase value\"]/../..//*[@aria-label=\"LP Field Type\"]//select").selectOption({ label: vars["ActionChaseField3"] });
    await expect(page.getByText(vars["ActionChaseField3"])).toBeVisible();
    if (true) /* Element Chase Field Input box is enabled */ {
      await page.locator("//div[@aria-labelledby=\"actionsGroup\"]//label[text()=\"Chase value\"]/../..//*[@aria-label=\"LP Field Value\"]//input").fill(vars["ActionChaseValue3"]);
    } else if (true) /* Element Chase Field Select list is enabled */ {
      await page.locator("//label[text()=\"Chase value\"]/../..//*[@aria-label=\"LP Field Value\"]//select").selectOption({ label: vars["ActionChaseValue3"] });
    }
    await expect(page.locator("//span[text()[normalize-space() = \"Show Results\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Show Results\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("(//td//button[text()=\" $|BidMapName3| \"])")).toBeVisible();
    await expect(page.locator("(//td//button[text()=\" $|BidMapName2| \"])")).toBeVisible();
    await expect(page.locator("(//td//button[text()=\" $|BidMapName1| \"])")).toBeVisible();
    await page.locator("//input[@type=\"checkbox\" and contains(@class, 'custom-control-input')]").check();
    await expect(page.locator("//input[@type=\"checkbox\" and contains(@class, 'custom-control-input')]")).toBeVisible();
    await page.locator("//button[@type=\"button\" and text()=\" Export Selected \"]").waitFor({ state: 'visible' });
    await page.waitForTimeout(5000);
    await page.locator("//button[@type=\"button\" and text()=\" Export Selected \"]").click();
    await page.locator("//div[text()[normalize-space() = \"Export List\"]]").waitFor({ state: 'visible' });
    await page.locator("//div[text()[normalize-space() = \"Export List\"]]").click();
    vars[""] = vars['_lastDownloadPath'] ? require('path').basename(vars['_lastDownloadPath']) : '';
    await stepGroups.stepGroup_New_Export_List_Advance_Search(page, vars);
    await page.locator("(//i[contains(@class, 'fa-times-circle')])[1]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("(//td//button[text()=\" $|BidMapName3| \"])")).toBeVisible();
    await expect(page.locator("(//td//button[text()=\" $|BidMapName1| \"])")).toBeVisible();
    await expect(page.locator("(//td//button[text()=\" $|BidMapName2| \"])")).toBeVisible();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["BidMapsCount(AdvanceSearch)"] = String(await page.locator("(//tbody//tr)[position() >= 1 and position() <= last()]").count());
    await page.locator("//button[contains(@aria-label,\"con\")]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//button[contains(@aria-label,\"con\")]")).toBeVisible();
    await expect(page.locator("//input[@placeholder=\"Search/Filter\"]")).toBeVisible();
    vars["BidMapsCount(AllMapsList)"] = String(await page.locator("(//tbody//tr)[position() >= 1 and position() <= last()]").count());
    expect(String(vars["BidMapsCount(AdvanceSearch)"])).toBe(vars["BidMapsCount(AllMapsList)"]);
    while (await page.locator("//tbody//td[@data-title=\"Map Name\"]//*[contains(text(),\"TS_AdvanceSearch\")]/../..//button[@aria-label=\"Delete Map\"]").isVisible()) {
      await page.locator("//tbody//td[@data-title=\"Map Name\"]//*[contains(text(),\"TS_AdvanceSearch\")]/../..//button[@aria-label=\"Delete Map\"]").click();
      await page.locator("(//button[@type=\"button\"])[last()]").click();
    }
  });
});
