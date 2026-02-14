import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS25_TC01_Verify the download file action present in the accordian of each commitment, It should display the proper committed loan details', async ({ page }) => {
    // Set up download handler
    page.on('download', async (download) => {
      const filePath = path.join('test-results', 'downloads', download.suggestedFilename());
      await download.saveAs(filePath);
      vars['_lastDownloadPath'] = filePath;
    });

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//div[normalize-space()=\"Closed List\"]").waitFor({ state: 'visible' });
    await page.locator("//div[normalize-space()=\"Closed List\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["BidReqId"] = await page.locator("(//td[@data-title=\"Bid Request ID\"])[2]").textContent() || '';
    vars["BidReqId"] = String(vars["BidReqId"]).trim();
    vars["CommitmentID"] = await page.locator("(//td[@data-title=\"Comm. ID\"])[2]").textContent() || '';
    vars["CommitmentID"] = String(vars["CommitmentID"]).trim();
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqId"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[contains(text(),\"$|BidReqId|\")]").click();
    await page.locator("//div[contains(text(),\"Sec. Month\")]//following-sibling::h5").waitFor({ state: 'visible' });
    vars["ReferenceMonth"] = await page.locator("//div[contains(text(),\"Sec. Month\")]//following-sibling::h5").textContent() || '';
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//div[normalize-space()=\"Closed List\"]").waitFor({ state: 'visible' });
    await page.locator("//div[normalize-space()=\"Closed List\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//input[@id='searchTagInput']").click();
    await page.locator("//input[@id='searchTagInput']").fill(vars["CommitmentID"]);
    await page.locator("//span[normalize-space(text())=\"Commitment ID\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["CCodeUI"] = await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())='$|BidReqId|']//ancestor::tr//td[@data-title=\"CCode\"]").textContent() || '';
    vars["CommitmentIdUI"] = await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())='$|BidReqId|']//ancestor::tr//td[@data-title=\"Comm. ID\"]").textContent() || '';
    vars["CommitmentIdUI"] = String(vars["CommitmentIdUI"]).trim();
    vars["CompanyNameUI"] = await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())='$|BidReqId|']//ancestor::tr//td[@data-title=\"Company\"]").textContent() || '';
    vars["CompanyNameUI"] = String(vars["CompanyNameUI"]).trim();
    vars["CompanyNameUI"] = String(vars["CompanyNameUI"]).replace(/\-/g, '');
    vars["CommitmentLoanAmountUI"] = await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())='$|BidReqId|']//ancestor::tr//td[@data-title=\"Comm. Amount\"]").textContent() || '';
    vars["CommittedLoansUI"] = await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())='$|BidReqId|']//ancestor::tr//td[@data-title=\"Comm. Loans\"]").textContent() || '';
    vars["CommittedDateUI"] = await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())='$|BidReqId|']//ancestor::tr//td[@data-title=\"Comm. Date\"]").textContent() || '';
    vars["ExpiredDateUI"] = await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())='$|BidReqId|']//ancestor::tr//td[@data-title=\"Expiration Date\"]").textContent() || '';
    vars["ExecutionTypeUI"] = await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())='$|BidReqId|']//ancestor::tr//td[@data-title=\"Execution Type\"]").textContent() || '';
    await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())=\"$|BidReqId|\"]//ancestor::tr//td[@data-title=\"Comm. ID\"]//a[contains(@aria-label,\"View details for commitme\")]").click();
    await page.locator("//div[text()=\"Product\"]//following-sibling::h5").waitFor({ state: 'visible' });
    vars["ProductNameUI"] = await page.locator("//div[text()=\"Product\"]//following-sibling::h5").textContent() || '';
    vars["RefSecCouponUI"] = await page.locator("//div[contains(text(),\"Coupon\")]//following-sibling::h5").textContent() || '';
    vars["CurrentMarketValueUI"] = await page.locator("//ancestor::tr//td[@data-title=\"Curr Market Value\"]").textContent() || '';
    vars["AllCoverLetterDetailsUI"] = String(vars["CommitmentIdUI"]) + ";" + String(vars["CommittedDateUI"]);
    vars["AllCoverLetterDetailsUI"] = String(vars["AllCoverLetterDetailsUI"]) + ";" + String(vars["ProductNameUI"]);
    vars["AllCoverLetterDetailsUI"] = String(vars["AllCoverLetterDetailsUI"]) + ";" + String(vars["CommitmentLoanAmountUI"]);
    vars["AllCoverLetterDetailsUI"] = String(vars["AllCoverLetterDetailsUI"]) + ";" + String(vars["ExpiredDateUI"]);
    vars["AllCoverLetterDetailsUI"] = String(vars["AllCoverLetterDetailsUI"]) + ";" + String(vars["RefSecCouponUI"]);
    vars["AllCoverLetterDetailsUI"] = String(vars["AllCoverLetterDetailsUI"]) + ";" + String(vars["CommittedLoansUI"]);
    vars["AllCoverLetterDetailsUI"] = String(vars["AllCoverLetterDetailsUI"]) + ";" + String(vars["BidReqId"]);
    vars["AllCoverLetterDetailsUI"] = String(vars["AllCoverLetterDetailsUI"]) + ";" + String(vars["ReferenceMonth"]);
    vars["AllCoverLetterDetailsUI"] = String(vars["AllCoverLetterDetailsUI"]) + ";" + String(vars["ExecutionTypeUI"]);
    vars["AllCoverLetterDetailsUI"] = String(vars["AllCoverLetterDetailsUI"]) + ";" + String(vars["CurrentMarketValueUI"]);
    vars["count"] = "1";
    for (let dataIdx = parseInt(vars["count"]); dataIdx <= 11; dataIdx++) {
      vars["IndividualCoverLetterDetailsUI"] = String(vars["AllCoverLetterDetailsUI"]).split(";")[parseInt(String(vars["count"]))] || '';
      vars["IndividualCoverLetterDetailsUI"] = String(vars["IndividualCoverLetterDetailsUI"]).trim();
      // Write to test data profile: "ChaseInfo" = vars["IndividualCoverLetterDetailsUI"]
      // TODO: Test data profile writes need custom implementation
      vars["count"] = (parseFloat(String(vars["count"])) + parseFloat(String("1"))).toFixed(0);
    }
    await page.locator("//a[contains(text(),\"Commitment List\")]//i[contains(@class,\"fas fa-arrow-left \")]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Comm. Letter\"]//span").click();
    await page.locator("//td[@data-title=\"File Name\"]").waitFor({ state: 'visible' });
    vars["FileNamePopup"] = await page.locator("//td[@data-title=\"File Name\"]").textContent() || '';
    vars["FileNamePopup"] = String(vars["FileNamePopup"]).trim();
    vars["CreationDatePopup"] = await page.locator("//td[@data-title=\"Creation Date\"]").textContent() || '';
    expect(String(vars["CommittedDateUI"])).toBe(vars["CreationDatePopup"]);
    await page.locator("//td[@data-title=\"File Name\" and contains(text(),\"$|FileNamePopup|\")]/following-sibling::td[@data-title=\"Actions\"]//button[i[contains(@class,'fa-arrow-to-bottom')]]").waitFor({ state: 'visible' });
    await page.locator("//td[@data-title=\"File Name\" and contains(text(),\"$|FileNamePopup|\")]/following-sibling::td[@data-title=\"Actions\"]//button[i[contains(@class,'fa-arrow-to-bottom')]]").hover();
    await page.locator("//td[@data-title=\"File Name\" and contains(text(),\"$|FileNamePopup|\")]/following-sibling::td[@data-title=\"Actions\"]//button[i[contains(@class,'fa-arrow-to-bottom')]]").evaluate(el => (el as HTMLElement).click());
    await page.waitForTimeout(3000); // Wait for download to complete
    vars["FilePath"] = vars['_lastDownloadPath'] || '';
    vars[""] = vars['_lastDownloadPath'] ? require('path').basename(vars['_lastDownloadPath']) : '';
    expect(String(vars["DownloadedFileName"])).toBe(vars["FileNamePopup"]);
    vars["CompanyNameWithCCodeUI"] = vars["CompanyNameUI"] + "-" + "(" + vars["CCodeUI"] + ")";
    vars["CompanyNameWithCCodeUI"] = String(vars["CompanyNameWithCCodeUI"]).trim();
  });
});
