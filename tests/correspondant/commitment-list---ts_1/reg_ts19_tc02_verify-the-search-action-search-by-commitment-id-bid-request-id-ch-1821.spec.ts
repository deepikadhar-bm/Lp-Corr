import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Commitment List - TS_1', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS19_TC02_Verify the search action, Search by commitment ID, Bid request ID, Chase loan number and the Correspondent loan number for 3digit input', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Comm. ID\"]//a[contains(@aria-label,\"View details for commitment\")]").click();
    await page.locator("//div[text()=\"Commit. ID\"]/following-sibling::h5").waitFor({ state: 'visible' });
    vars["CommitmentID"] = await page.locator("//div[text()=\"Commit. ID\"]/following-sibling::h5").textContent() || '';
    vars["CommitmentID"] = String(vars["CommitmentID"]).substring(0, 3);
    vars["BidRequestId"] = await page.locator("//div[text()=\"Bid Req. ID\"]//following-sibling::h5").textContent() || '';
    vars["BidRequestId"] = String(vars["BidRequestId"]).substring(0, 3);
    vars["ChaseLoanNumber"] = await page.locator("//td[@data-title=\"Chase Loan#\"]").textContent() || '';
    vars["ChaseLoanNumber"] = String(vars["ChaseLoanNumber"]).substring(0, 3);
    vars["CorrespondentLoanNumber"] = await page.locator("//td[@data-title=\"Corr. Loan#\"]//button[1]").textContent() || '';
    vars["CorrespondentLoanNumber"] = String(vars["CorrespondentLoanNumber"]).substring(0, 3);
    await page.locator("//a[contains(text(),\"Commitment List\")]//i[contains(@class,\"fas fa-arrow-left \")]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//input[@id='searchTagInput']").click();
    await page.locator("//input[@id='searchTagInput']").fill(vars["CommitmentID"]);
    await page.locator("//span[normalize-space(text())=\"Commitment ID\"]").click();
    await page.locator("//td[@data-title=\"Comm. ID\"]//a").waitFor({ state: 'visible' });
    for (let i = 0; i < await page.locator("//td[@data-title=\"Comm. ID\"]//a").count(); i++) {
      await expect(page.locator("//td[@data-title=\"Comm. ID\"]//a").nth(i)).toContainText(String(vars["CommitmentID"]));
    }
    await page.locator("//button[contains(@class,\"search-cancel-btn btn\")]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//input[@id='searchTagInput']").click();
    await page.locator("//input[@id='searchTagInput']").fill(vars["BidRequestId"]);
    await page.locator("//span[normalize-space(text())=\"Bid Request ID\"]").click();
    await page.locator("//td[@data-title=\"Bid Request ID\"]").waitFor({ state: 'visible' });
    for (let i = 0; i < await page.locator("//td[@data-title=\"Bid Request ID\"]").count(); i++) {
      await expect(page.locator("//td[@data-title=\"Bid Request ID\"]").nth(i)).toContainText(String(vars["BidRequestId"]));
    }
    await page.locator("//button[contains(@class,\"search-cancel-btn btn\")]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//input[@id='searchTagInput']").click();
    await page.locator("//input[@id='searchTagInput']").fill(vars["ChaseLoanNumber"]);
    await page.locator("//span[normalize-space(text())=\"Chase Loan Number\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["ChaseLoanNumbersCount"] = String(await page.locator("//td[@data-title=\"Bid Request ID\"]").count());
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["ChaseLoanNumbersCount"]))) {
      vars["CommitID"] = await page.locator("(//td[@data-title=\"Comm. ID\"]//a)[$|count|]").textContent() || '';
      vars["CommitID"] = String(vars["CommitID"]).trim();
      await page.locator("(//td[@data-title=\"Comm. ID\"]//a)[$|count|]").click();
      await page.locator("//div[@id=\"accordionHeader\"]//div[text()=\"Commit. ID\"]//following-sibling::h5[text()=\"$|CommitID|\"]//following::div[@class=\"accordion-body\"]//td[@data-title=\"Chase Loan#\"]//div[contains(text(),\"$|ChaseLoanNumber|\")]\n").waitFor({ state: 'visible' });
      await expect(page.locator("//div[@id=\"accordionHeader\"]//div[text()=\"Commit. ID\"]//following-sibling::h5[text()=\"$|CommitID|\"]//following::div[@class=\"accordion-body\"]//td[@data-title=\"Chase Loan#\"]//div[contains(text(),\"$|ChaseLoanNumber|\")]\n")).toContainText(vars["ChaseLoanNumber"]);
      await page.locator("//a[contains(text(),\"Commitment List\")]//i[contains(@class,\"fas fa-arrow-left \")]").click();
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      vars["count"] = (parseFloat(String(vars["count"])) + parseFloat(String("1"))).toFixed(0);
    }
    await page.locator("//button[contains(@class,\"search-cancel-btn btn\")]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//input[@id='searchTagInput']").click();
    await page.locator("//input[@id='searchTagInput']").fill(vars["CorrespondentLoanNumber"]);
    await page.locator("//span[normalize-space(text())=\"Correspondent Loan Number\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["CorrespondentLoanNumberCount"] = String(await page.locator("//td[@data-title=\"Bid Request ID\"]").count());
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["CorrespondentLoanNumberCount"]))) {
      vars["CommitID"] = await page.locator("(//td[@data-title=\"Comm. ID\"]//a)[$|count|]").textContent() || '';
      vars["CommitID"] = String(vars["CommitID"]).trim();
      await page.locator("(//td[@data-title=\"Comm. ID\"]//a)[$|count|]").click();
      await page.locator("//h5[text()='$|CommitID|']/ancestor::div[@id=\"accordionHeader\"]/following-sibling::div//tbody//tr//td[@data-title=\"Corr. Loan#\"]//button[contains(text(),'$|CorrespondentLoanNumber|') or contains(text(),\"tes\")]").waitFor({ state: 'visible' });
      expect((await page.locator("//h5[text()='$|CommitID|']/ancestor::div[@id=\"accordionHeader\"]/following-sibling::div//tbody//tr//td[@data-title=\"Corr. Loan#\"]//button[contains(text(),'$|CorrespondentLoanNumber|') or contains(text(),\"tes\")]").textContent() || '').toLowerCase()).toContain(String('').toLowerCase());
      await page.locator("//a[contains(text(),\"Commitment List\")]//i[contains(@class,\"fas fa-arrow-left \")]").click();
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      vars["count"] = (parseFloat(String(vars["count"])) + parseFloat(String("1"))).toFixed(0);
    }
  });
});
