import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS02_TC02.5_Verify show all  and show selected features In Search Filter Dropdown', async ({ page }) => {
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
    vars["ExpectedSelectedCompaniesCount"] = String(await page.locator("//label[text()=\"Select Company/CCode\"]/..//label[contains(@class,\"checked\")]//span[@title]").count());
    // [DISABLED] Store the count of elements identified by locator Total Companies(Bid Request Filters) into a variable TotalShowedSelectedCompiniesCount
    // vars["TotalShowedSelectedCompiniesCount"] = String(await page.locator("//label[text()=\"Select Company/CCode\"]/..//div[@class=\"dropdown-overflow\"]//label[@role=\"option\"]").count());
    vars["ActualSelectedCompaniesCount"] = await page.locator("//label[text()=\"Select Company/CCode\"]/..//span[contains(@aria-label,\"items selected\")]").textContent() || '';
    expect(String(vars["ExpectedSelectedCompaniesCount"])).toBe(vars["ActualSelectedCompaniesCount"]);
    await page.locator("//div[text()[normalize-space() = \"Show All\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["TotalCompiniesCount"] = String(await page.locator("//label[text()=\"Select Company/CCode\"]/..//div[@class=\"dropdown-overflow\"]//label[@role=\"option\"]").count());
    expect(String(vars["TotalCompiniesCount"])).toBe(vars["ExpectedSelectedCompaniesCount"]);
    await page.locator("//button[contains(text(),\" Apply Selected \")]").click();
    await page.locator("//div[text()[normalize-space() = \"Select Bid Request Status\"]]/..").click();
    await page.locator("//input[@id='chkItemPROCESSINGundefined']").check();
    await page.locator("//input[@id='chkItemPROCESSING_FAILEDundefined']").check();
    vars["FirstBidRequestText"] = await page.locator("(//label[text()='Select Bid Request Status']//..//div[@class=\"cursor-pointer py-3 text-wrap\"])[2]").textContent() || '';
    vars["SecondBidRequestText"] = await page.locator("(//label[text()='Select Bid Request Status']//..//div[@class=\"cursor-pointer py-3 text-wrap\"])[3]").textContent() || '';
    await page.locator("//label[@for=\"chkItembidRequestStatusundefined\"]/following-sibling::div[@aria-label=\"Toggle sort selected\"]").click();
    await expect(page.locator("(//label[text()='Select Bid Request Status']//..//div[@class=\"cursor-pointer py-3 text-wrap\"])[2]")).toContainText(vars["FirstBidRequestText"]);
    await expect(page.locator("(//label[text()='Select Bid Request Status']//..//div[@class=\"cursor-pointer py-3 text-wrap\"])[3]")).toContainText(vars["SecondBidRequestText"]);
    await expect(page.locator("//input[@id='chkItemPROCESSINGundefined']")).toBeVisible();
    await expect(page.locator("//input[@id='chkItemPROCESSING_FAILEDundefined']")).toBeVisible();
    vars["ExpectedSelectedBidReqStatusesCount"] = String(await page.locator("//label[text()=\"Select Bid Request Status\"]/..//label[contains(@class,\"checked\")]//span[@title]").count());
    vars["ActualSelectedBidReqStatusesCount"] = await page.locator("//label[text()=\"Select Bid Request Status\"]/..//span[contains(@aria-label,\"items selected\")]").textContent() || '';
    expect(String(vars["ExpectedSelectedBidReqStatusesCount"])).toBe(vars["ActualSelectedBidReqStatusesCount"]);
    await page.locator("//div[text()[normalize-space() = \"Show All\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["TotalBidReqStatusesCount"] = String(await page.locator("//label[text()=\"Select Bid Request Status\"]/..//div[@class=\"dropdown-overflow\"]//label[@role=\"option\"]").count());
    expect(String(vars["TotalBidReqStatusesCount"])).toBe(vars["ExpectedSelectedBidReqStatusesCount"]);
    await page.locator("(//button[@aria-label=\"Apply selected items\"])[2]").waitFor({ state: 'visible' });
    await page.locator("(//button[@aria-label=\"Apply selected items\"])[2]").click();
    await page.locator("//div[contains(@class, \"justify-content-end\")]//button[text()=\"Apply Filters\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Filter\"]]").click();
    await page.locator("//button[text()[normalize-space() = \"Clear All\"]]/..").waitFor({ state: 'visible' });
    await page.locator("//button[text()[normalize-space() = \"Clear All\"]]/..").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Filter\"]]").click();
    await page.locator("//div[text()[normalize-space() = \"Select Company/CCode\"]]").click();
    await expect(page.locator("(//input[contains(@class,\"mr-2 cursor\") and @type=\"checkbox\"])[2]")).toBeVisible();
    await expect(page.locator("(//input[contains(@class,\"mr-2 cursor\") and @type=\"checkbox\"])[3]")).toBeVisible();
    await page.locator("//div[text()[normalize-space() = \"Select Bid Request Status\"]]/..").click();
    await expect(page.locator("//input[@id='chkItemPROCESSINGundefined']")).toBeVisible();
    await expect(page.locator("//input[@id='chkItemPROCESSING_FAILEDundefined']")).toBeVisible();
  });
});
