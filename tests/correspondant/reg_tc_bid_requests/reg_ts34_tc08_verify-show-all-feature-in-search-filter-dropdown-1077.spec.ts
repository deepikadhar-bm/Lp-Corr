import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS34_TC08_Verify show all feature In Search Filter Dropdown', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.waitForLoadState('networkidle');
    await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Filter\"]]").click();
    await page.locator("//div[text()[normalize-space() = \"Select Company/CCode\"]]").click();
    await page.locator("(//input[contains(@class,\"mr-2 cursor\") and @type=\"checkbox\"])[2]").check();
    await page.locator("(//input[contains(@class,\"mr-2 cursor\") and @type=\"checkbox\"])[3]").check();
    vars["FirstCompanyName"] = await page.locator("(//div[@class=\"dropdown-overflow\"]//input[@type=\"checkbox\"])[1]/..//span").textContent() || '';
    vars["SecondCompanyName"] = await page.locator("(//div[@class=\"dropdown-overflow\"]//input[@type=\"checkbox\"])[2]/..//span").textContent() || '';
    await page.locator("//div[text()[normalize-space() = \"Show Selected\"]]").click();
    await expect(page.locator("(//div[@class=\"dropdown-overflow\"]//input[@type=\"checkbox\"])[1]/..//span")).toContainText(vars["FirstCompanyName"]);
    await expect(page.locator("(//div[@class=\"dropdown-overflow\"]//input[@type=\"checkbox\"])[2]/..//span")).toContainText(vars["SecondCompanyName"]);
    await expect(page.locator("(//input[contains(@class,\"mr-2 cursor\") and @type=\"checkbox\"])[2]")).toBeVisible();
    await expect(page.locator("(//input[contains(@class,\"mr-2 cursor\") and @type=\"checkbox\"])[3]")).toBeVisible();
    vars["AllCompanyNameCount"] = String(await page.locator("//label[text()=\"Select Company/CCode\"]/..//div[@class=\"dropdown-overflow\"]//input").count());
    expect(String(vars["AllCompanyNameCount"])).toBe(testData["Selected Company Count"]);
    await page.locator("//div[text()[normalize-space() = \"Show All\"]]").click();
    vars["AllCompanyNameCount"] = String(await page.locator("//label[text()=\"Select Company/CCode\"]/..//div[@class=\"dropdown-overflow\"]//input").count());
    expect(String(vars["AllCompanyNameCount"])).toBe(testData["Selected Company Count"]);
    await page.locator("//button[contains(text(),\" Apply Selected \")]").click();
    // [DISABLED] Click on Select Bid Request Status Dropdown
    // await page.locator("//div[text()[normalize-space() = \"Select Bid Request Status\"]]/..").click();
    // [DISABLED] Check the checkbox First Bid Request Checkbox
    // await page.locator("//input[@id='chkItemPROCESSINGundefined']").check();
    // [DISABLED] Check the checkbox Second Bid Request Checkbox
    // await page.locator("//input[@id='chkItemPROCESSING_FAILEDundefined']").check();
    // [DISABLED] Store text from the element First Bid Request Text into a variable FirstBidRequestText
    // vars["FirstBidRequestText"] = await page.locator("(//label[text()='Select Bid Request Status']//..//div[@class=\"cursor-pointer py-3 text-wrap\"])[2]").textContent() || '';
    // [DISABLED] Store text from the element Second Bid Request Text into a variable SecondBidRequestText
    // vars["SecondBidRequestText"] = await page.locator("(//label[text()='Select Bid Request Status']//..//div[@class=\"cursor-pointer py-3 text-wrap\"])[3]").textContent() || '';
    // [DISABLED] Click on Show Selected
    // await page.locator("//label[@for=\"chkItembidRequestStatusundefined\"]/following-sibling::div[@aria-label=\"Toggle sort selected\"]").click();
    // [DISABLED] Verify that the element First Bid Request Text displays text FirstBidRequestText and With Scrollable FALSE
    // await expect(page.locator("(//label[text()='Select Bid Request Status']//..//div[@class=\"cursor-pointer py-3 text-wrap\"])[2]")).toContainText(vars["FirstBidRequestText"]);
    // [DISABLED] Verify that the element Second Bid Request Text displays text SecondBidRequestText and With Scrollable FALSE
    // await expect(page.locator("(//label[text()='Select Bid Request Status']//..//div[@class=\"cursor-pointer py-3 text-wrap\"])[3]")).toContainText(vars["SecondBidRequestText"]);
    // [DISABLED] Verify that the element First Bid Request Checkbox is checked and With Scrollable FALSE
    // await expect(page.locator("//input[@id='chkItemPROCESSINGundefined']")).toBeVisible();
    // [DISABLED] Verify that the element Second Bid Request Checkbox is checked and With Scrollable FALSE
    // await expect(page.locator("//input[@id='chkItemPROCESSING_FAILEDundefined']")).toBeVisible();
    // [DISABLED] Store the count of elements identified by locator All Bid Request Status into a variable AllBidRequestStatus
    // vars["AllBidRequestStatus"] = String(await page.locator("(//label[contains(@class,\"dropdown-item d-flex\")])[position() >= 98 and position() <=111]").count());
    // [DISABLED] Click on Show All
    // await page.locator("//div[text()[normalize-space() = \"Show All\"]]").click();
    // [DISABLED] Store the count of elements identified by locator All Bid Request Status into a variable AllBidRequestStatus
    // vars["AllBidRequestStatus"] = String(await page.locator("(//label[contains(@class,\"dropdown-item d-flex\")])[position() >= 98 and position() <=111]").count());
    // [DISABLED] Verify if AllBidRequestStatus > 2
    // expect(String(vars["AllBidRequestStatus"])).toBe("2");
    // [DISABLED] Click on Apply Selected
    // await page.locator("//button[contains(text(),\" Apply Selected \")]").click();
  });
});
