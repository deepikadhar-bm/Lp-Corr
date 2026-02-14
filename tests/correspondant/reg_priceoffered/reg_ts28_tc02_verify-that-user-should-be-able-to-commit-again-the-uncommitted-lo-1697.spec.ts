import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_PriceOffered', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS28_TC02_Verify that user should be able to commit again the uncommitted loan', async ({ page }) => {
    // Prerequisite: REG_TS01_TC01_Perform submit for pricing action, and then verify the status should be updated to pri
    // TODO: Ensure prerequisite test passes first

    // [DISABLED] Login to CORR Portal
    // await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    vars["BidReqIdPriceOffered"] = vars["RequestIDDetails"];
    // Write to test data profile: "RequestIDFrom28-2" = vars["BidReqIdPriceOffered"]
    // TODO: Test data profile writes need custom implementation
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").click();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdPriceOffered"]);
    await page.locator("//td[@data-title=\"Bid Req. ID\"]").waitFor({ state: 'visible' });
    await stepGroups.stepGroup_Commits_an_Fresh_Loan_Num(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//input[@id='searchTagInput']").click();
    await page.locator("//input[@id='searchTagInput']").fill(vars["BidReqIdPriceOffered"]);
    await page.locator("//span[normalize-space(text())=\"Bid Request ID\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//tr[td[@data-title=\"Bid Request ID\"]//div[contains(text(),\"$|BidReqIdPriceOffered|\")]]//td[@data-title=\"Comm. ID\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//tbody//input[@type=\"checkbox\"]").check();
    vars["UncommittedLoanNum"] = await page.locator("//tr[contains(@class,\"row\")]//button[contains(@class,\"btn bg-transparent text-primary\")][1]").textContent() || '';
    await page.locator("//button[@id='commitdropdownMenuButton']").waitFor({ state: 'visible' });
    await page.locator("//button[@id='commitdropdownMenuButton']").click();
    await page.locator("//span[text()[normalize-space() = \"Yes, Uncommit\"]]").click();
    await page.locator("//button[text()[normalize-space() = \"Okay\"]]").waitFor({ state: 'visible' });
    await page.locator("//button[text()[normalize-space() = \"Okay\"]]").click();
    await page.locator("//div[text()[normalize-space() = \"Total Loans\"]]").waitFor({ state: 'visible' });
    await page.locator("//span[contains(text(),\" Total Committed Loans\")]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//button[text()=\"$|UncommittedLoanNum|\"]")).toBeVisible();
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqIdPriceOffered"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[contains(text(),\"$|BidReqIdPriceOffered|\")]").click();
    await page.locator("//button[text()=\"$|UncommittedLoanNum|\"]//ancestor::tr//input[@type=\"checkbox\"]").waitFor({ state: 'visible' });
    await page.locator("//button[text()=\"$|UncommittedLoanNum|\"]//ancestor::tr//input[@type=\"checkbox\"]").check();
    await page.locator("//button[normalize-space(text())=\"Get Price\"]").click();
    await page.locator("//button[@id='commitdropdownMenuButton']").waitFor({ state: 'visible' });
    await page.locator("//button[@id='commitdropdownMenuButton']").click();
    await page.locator("//span[text()=\"Yes, Commit\"]//parent::button").click();
    await page.locator("//button[contains(text(),\"Okay\")]").waitFor({ state: 'visible' });
    await page.locator("//button[contains(text(),\"Okay\")]").click();
    await page.locator("//div[@id='price-offered-list-tabs']//span[text()[normalize-space() = \"Locked/Committed Loans\"]]").waitFor({ state: 'visible' });
    await page.locator("//button[contains(text(),\"Paste Loans\")]\n").waitFor({ state: 'hidden' });
    await expect(page.locator("//button[@id='commitdropdownMenuButton']")).toBeVisible();
    await expect(page.locator("//button[text()=\"$|UncommittedLoanNum|\"]")).toBeVisible();
    await expect(page.locator("//button[text()=\"$|UncommittedLoanNum|\"]//ancestor::tr//div[@class=\"commit-order\"]\n")).toContainText("2");
    await page.locator("//div[@id=\"price-offered-list-tabs\"]/div//span[text()=\"All Loans\"]").click();
    await page.locator("//button[contains(text(),\"Paste Loans\")]\n").waitFor({ state: 'visible' });
    await expect(page.locator("//button[@id='commitdropdownMenuButton']")).toBeVisible();
    await expect(page.locator("//button[text()=\"$|UncommittedLoanNum|\"]")).toBeVisible();
    await expect(page.locator("//button[text()=\"$|UncommittedLoanNum|\"]//ancestor::tr//span[@aria-label=\"Committed loan\"]")).toBeVisible();
    await expect(page.locator("//button[text()=\"$|UncommittedLoanNum|\"]//ancestor::tr//div[@class=\"commit-order\"]\n")).toContainText("2");
  });
});
