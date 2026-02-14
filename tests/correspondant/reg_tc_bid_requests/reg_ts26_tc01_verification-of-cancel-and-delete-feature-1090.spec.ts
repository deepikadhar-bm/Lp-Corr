import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_TC_Bid_Requests', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS26_TC01_Verification Of Cancel and Delete Feature', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Navigating_to_Upload_New_Bid_Request(page, vars);
    // [DISABLED] Uploading Bid Request
    // await stepGroups.stepGroup_Uploading_Bid_Request(page, vars);
    // [DISABLED] Uploading Bid Request(New)
    // await stepGroups.stepGroup_Uploading_Bid_RequestNew(page, vars);
    await stepGroups.stepGroup_Uploading_New_Bid_Request_Bid_Request_Screen(page, vars);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.getByText("Bid Upload Progress").waitFor({ state: 'visible' });
    await page.locator("//span[text()=\"Continue\"]/..").waitFor({ state: 'visible' });
    await page.locator("//span[text()=\"Continue\"]/..").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//button/span[text()=\"Submit For Pricing\"]/..").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//button[@aria-label=\"Yes Submit\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Navigating_to_Upload_New_Bid_Request(page, vars);
    await stepGroups.stepGroup_Uploading_New_Bid_Request_Bid_Request_Screen(page, vars);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.getByText("Bid Upload Progress").waitFor({ state: 'visible' });
    await page.locator("//span[text()=\"Continue\"]/..").waitFor({ state: 'visible' });
    await page.locator("//span[text()=\"Continue\"]/..").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//button/span[text()=\"Submit For Pricing\"]/..").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//button[@aria-label=\"Yes Submit\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Bid Requests\"] and contains(@class, 'hide-text')]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Filter\"]]").click();
    await page.locator("//div[text()[normalize-space() = \"Select Bid Request Status\"]]/..").click();
    await page.locator("//input[@type=\"checkbox\" and @id=\"chkItemQUEUED_NEXT_BATCHundefined\"]").check();
    await expect(page.locator("//input[@type=\"checkbox\" and @id=\"chkItemQUEUED_NEXT_BATCHundefined\"]")).toBeVisible();
    await page.locator("//button[contains(text(),\" Apply Selected \")]").click();
    await page.locator("//div[contains(@class, \"justify-content-end\")]//button[text()=\"Apply Filters\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("(//td[@data-title=\"Status\"])[1]//span")).toContainText("Queued");
    vars["CanceledBidRequestID"] = await page.locator("//td[@data-title=\"Bid Req. ID\"]").textContent() || '';
    await page.locator("((//span[contains(@class, 'fa-times')]))[1]/..").click();
    await expect(page.locator("//div[@aria-describedby=\"modalBody\"]")).toBeVisible();
    await expect(page.locator("//button[@aria-label=\"Yes, Go ahead\"]")).toBeVisible();
    await page.locator("//input[@placeholder=\"Reason for cancelling bid request...\"]").fill(testData["Reason For Cancellation"]);
    await page.locator("//button[@aria-label=\"Yes, Go ahead\"]").click();
    await page.waitForTimeout(4000);
    vars["FirstBidRequestIDAfterCancel"] = await page.locator("//td[@data-title=\"Bid Req. ID\"]").textContent() || '';
    expect(String(vars["CanceledBidRequestID"])).toBe(vars["FirstBidRequestIDAfterCancel"]);
    vars["DeletedBidRequestId"] = await page.locator("//td[@data-title=\"Bid Req. ID\"]").textContent() || '';
    await page.locator("(//td[@data-title=\"Actions\"])[1]//button[last()]").click();
    await expect(page.locator("//i[contains(@class,\"trash-alt\")]/ancestor::button")).toBeVisible();
    await page.locator("//input[@placeholder=\"Reason for deleting bid request...\"]").fill(testData["Reason For Deletion"]);
    await expect(page.locator("//i[contains(@class,\"trash-alt\")]/ancestor::button")).toBeVisible();
    await page.locator("//i[contains(@class,\"trash-alt\")]/ancestor::button").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["FirstBidRequestIdAfterDelete"] = await page.locator("//td[@data-title=\"Bid Req. ID\"]").textContent() || '';
    expect(String(vars["DeletedBidRequestId"])).toBe(vars["FirstBidRequestIdAfterDelete"]);
    await page.locator("//span[text()='Clear all']").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["CanceledBidRequestID"] = String(vars["CanceledBidRequestID"]).trim();
    vars["DeletedBidRequestId"] = String(vars["DeletedBidRequestId"]).trim();
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["CanceledBidRequestID"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//td[@data-title=\"Bid Req. ID\"]")).toContainText(vars["CanceledBidRequestID"]);
    await expect(page.locator("(//td[@data-title=\"Status\"])[1]//span")).toContainText("Cancelled");
    await page.locator("(//td[@data-title=\"Status\"])[1]//span").hover();
    await expect(page.getByText(testData["Reason For Cancellation"])).toBeVisible();
    await expect(page.locator("((//span[contains(@class, 'fa-times')]))[1]/..")).toBeVisible();
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").clear();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["DeletedBidRequestId"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//td[@data-title=\"Bid Req. ID\"]")).toContainText(vars["DeletedBidRequestId"]);
    await expect(page.locator("(//td[@data-title=\"Status\"])[1]//span")).toContainText("Deleted by testsigma_internal");
    await page.locator("(//td[@data-title=\"Bid Value\"])[1]").hover();
    await page.locator("(//td[@data-title=\"Status\"])[1]//span").hover();
    await expect(page.getByText(testData["Reason For Deletion"])).toBeVisible();
    await expect(page.locator("(//td[@data-title=\"Actions\"])[1]//button[last()]")).toBeVisible();
  });
});
