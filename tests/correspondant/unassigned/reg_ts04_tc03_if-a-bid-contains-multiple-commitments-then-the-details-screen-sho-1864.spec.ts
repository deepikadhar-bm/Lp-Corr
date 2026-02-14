import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS04_TC03_If a bid contains multiple commitments, then the details screen should display the list of all those commitments.', async ({ page }) => {
    // Prerequisite: REG_TS04_TC02_Create a new commitment for a bid that already has an existing commitment, and verify 
    // TODO: Ensure prerequisite test passes first

    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//input[@id='searchTagInput']").click();
    await page.locator("//input[@id='searchTagInput']").clear();
    await page.locator("//input[@id='searchTagInput']").fill(vars["BidReqId"]);
    await page.locator("//span[normalize-space(text())=\"Bid Request ID\"]").click();
    await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())=\"$|BidReqId|\"]//ancestor::tr//td[@data-title=\"Comm. ID\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["FirstCommitOrderBefore"] = await page.locator("//div[text()=\"Commit. #\"]//following-sibling::h5").textContent() || '';
    vars["FirstCommitIDBefore"] = await page.locator("//div[text()=\"Commit. ID\"]/following-sibling::h5").textContent() || '';
    vars["FirstCommitTimeBefore"] = await page.locator("//div[text()=\"Commit. Time\"]//following-sibling::h5").textContent() || '';
    vars["FirstMarketValueBefore"] = await page.locator("//div[text()=\"Market Value\"]//following-sibling::h5").textContent() || '';
    vars["FirstCurrMarketValueBefore"] = await page.locator("//ancestor::tr//td[@data-title=\"Curr Market Value\"]").textContent() || '';
    vars["FirstLockedLastName"] = await page.locator("//td[@data-title=\"Last Name\"]").textContent() || '';
    vars["FirstLockedLoanAmount"] = await page.locator("//td[@data-title=\"Loan Amount\"]").textContent() || '';
    vars["FirstLockedRefSecProd"] = await page.locator("//td[@data-title=\"Ref Sec Prod.\"]").textContent() || '';
    vars["FirstLockedRefSecPrice"] = await page.locator("//td[@data-title=\"Ref Sec Price\"]").textContent() || '';
    vars["FirstLockedGrossPrice"] = await page.locator("//td[@data-title=\"Gross Price\"]").textContent() || '';
    vars["FirstLockedHedgeRatio"] = await page.locator("//td[@data-title=\"Hedge Ratio\"]").textContent() || '';
    vars["FirstLockedMarkAdj"] = await page.locator("//td[@data-title=\"Mark Adj\"]").textContent() || '';
    vars["FirstLockedCurrGross"] = await page.locator("//td[@data-title=\"Curr Gross\"]").textContent() || '';
    vars["SecondCommitOrder"] = await page.locator("(//div[text()=\"Commit. #\"]//following-sibling::h5)[2]").textContent() || '';
    vars["SecondCommitID"] = await page.locator("(//div[text()=\"Commit. ID\"]/following-sibling::h5)[2]").textContent() || '';
    vars["SecondCommitTime"] = await page.locator("(//div[text()=\"Commit. Time\"]//following-sibling::h5)[2]").textContent() || '';
    vars["SecondMarketValue"] = await page.locator("(//div[text()=\"Market Value\"]//following-sibling::h5)[2]").textContent() || '';
    vars["SecondCurrentMarketValue"] = await page.locator("(//ancestor::tr//td[@data-title=\"Curr Market Value\"])[2]").textContent() || '';
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["BidReqId"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[contains(text(),\"$|BidReqId|\")]").click();
    await page.locator("//tbody//input[@type=\"checkbox\"]").waitFor({ state: 'visible' });
    await page.locator("//tbody//input[@type=\"checkbox\"]").check();
    await page.locator("//button[normalize-space(text())=\"Get Price\"]").waitFor({ state: 'visible' });
    await page.locator("//button[normalize-space(text())=\"Get Price\"]").click();
    await page.locator("//button[@id='commitdropdownMenuButton']").waitFor({ state: 'visible' });
    await page.locator("//button[@id='commitdropdownMenuButton']").click();
    await page.locator("//span[text()=\"Yes, Commit\"]//parent::button").click();
    vars["ThirdCommitTime"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC" };
      const fmt = "h:mm a";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    await page.locator("//button[contains(text(),\"Okay\")]").waitFor({ state: 'visible' });
    vars["ThirdCommitmentID"] = await page.locator("//div[contains(text(),'Commitment')]/span\n").textContent() || '';
    await page.locator("//button[contains(text(),\"Okay\")]").click();
    await page.locator("//div[@id=\"price-offered-list-tabs\"]/div//span[text()=\"All Loans\"]").click();
    vars["ThirdCurrentMarket"] = await page.locator("//div[contains(text(),\"Current Market\")]//following-sibling::h5").textContent() || '';
    vars["ThirdCommittedCorrLoan"] = await page.locator("((//span[@aria-label=\"Committed loan\"])[3]//ancestor::tr//td[@data-title=\"Corr. Loan#\"]//button)[1]").textContent() || '';
    vars["ThirdCommittedLastName"] = await page.locator("(//span[@aria-label=\"Committed loan\"])[3]//ancestor::tr//td[@data-title=\"Last Name\"]").textContent() || '';
    vars["ThirdCommittedLoanAmount"] = await page.locator("(//span[@aria-label=\"Committed loan\"])[3]//ancestor::tr//td[@data-title=\"Loan Amount\"]").textContent() || '';
    vars["ThirdCommittedRefSecProd"] = await page.locator("(//span[@aria-label=\"Committed loan\"])[3]//ancestor::tr//td[@data-title=\"Ref Sec Prod.\"]").textContent() || '';
    vars["ThirdCommittedRefSecPrice"] = await page.locator("(//span[@aria-label=\"Committed loan\"])[3]//ancestor::tr//td[@data-title=\"Ref Sec Price\"]").textContent() || '';
    vars["ThirdCommittedGrossPrice"] = await page.locator("(//span[@aria-label=\"Committed loan\"])[3]//ancestor::tr//td[@data-title=\"Gross Price\"]").textContent() || '';
    vars["ThirdCommittedHedgeRatio"] = await page.locator("(//span[@aria-label=\"Committed loan\"])[3]//ancestor::tr//td[@data-title=\"Hedge Ratio\"]").textContent() || '';
    vars["ThirdCommittedMarkAdj"] = await page.locator("(//span[@aria-label=\"Committed loan\"])[3]//ancestor::tr//td[@data-title=\"Mark Adj\"]").textContent() || '';
    vars["ThirdCommittedLoanCurrGross"] = await page.locator("(//span[@aria-label=\"Committed loan\"])[3]//ancestor::tr//td[@data-title=\"Curr Gross\"]").textContent() || '';
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//input[@id='searchTagInput']").click();
    await page.locator("//input[@id='searchTagInput']").fill(vars["BidReqId"]);
    await page.locator("//span[normalize-space(text())=\"Bid Request ID\"]").click();
    await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())=\"$|BidReqId|\"]//ancestor::tr//td[@data-title=\"Comm. ID\"]").click();
    await expect(page.locator("//div[text()=\"Commit. #\"]//following-sibling::h5")).toContainText(vars["FirstCommitOrderBefore"]);
    await expect(page.locator("//div[text()=\"Commit. ID\"]/following-sibling::h5")).toContainText(vars["FirstCommitIDBefore"]);
    await expect(page.locator("//div[text()=\"Commit. Time\"]//following-sibling::h5")).toContainText(vars["FirstCommitTimeBefore"]);
    await expect(page.locator("//div[text()=\"Market Value\"]//following-sibling::h5")).toContainText(vars["ThirdCurrentMarket"]);
    await expect(page.locator("//ancestor::tr//td[@data-title=\"Curr Market Value\"]")).toContainText(vars["FirstCurrMarketValueBefore"]);
    await expect(page.locator("//td[@data-title=\"Last Name\"]")).toContainText(vars["FirstLockedLastName"]);
    await expect(page.locator("//td[@data-title=\"Loan Amount\"]")).toContainText(vars["FirstLockedLoanAmount"]);
    await expect(page.locator("//td[@data-title=\"Ref Sec Prod.\"]")).toContainText(vars["FirstLockedRefSecProd"]);
    await expect(page.locator("//td[@data-title=\"Ref Sec Price\"]")).toContainText(vars["FirstLockedRefSecPrice"]);
    await expect(page.locator("//td[@data-title=\"Gross Price\"]")).toContainText(vars["FirstLockedGrossPrice"]);
    await expect(page.locator("//td[@data-title=\"Hedge Ratio\"]")).toContainText(vars["FirstLockedHedgeRatio"]);
    await expect(page.locator("//td[@data-title=\"Mark Adj\"]")).toContainText(vars["FirstLockedMarkAdj"]);
    await expect(page.locator("//td[@data-title=\"Curr Gross\"]")).toContainText(vars["FirstLockedCurrGross"]);
    await expect(page.locator("(//div[text()=\"Commit. #\"]//following-sibling::h5)[2]")).toContainText(vars["SecondCommitOrder"]);
    await expect(page.locator("(//div[text()=\"Commit. ID\"]/following-sibling::h5)[2]")).toContainText(vars["SecondCommitID"]);
    await expect(page.locator("(//div[text()=\"Commit. Time\"]//following-sibling::h5)[2]")).toContainText(vars["SecondCommitTime"]);
    await expect(page.locator("(//div[text()=\"Market Value\"]//following-sibling::h5)[2]")).toContainText(vars["ThirdCurrentMarket"]);
    await expect(page.locator("(//ancestor::tr//td[@data-title=\"Curr Market Value\"])[2]")).toContainText(vars["SecondCurrentMarketValue"]);
    await expect(page.getByText(vars["ThirdCommitmentID"])).toBeVisible();
    await expect(page.locator("(//div[text()=\"Commit. Time\"]//following-sibling::h5)[3]")).toContainText(vars["ThirdCommitTime"]);
    await expect(page.locator("(//div[text()=\"Market Value\"]//following-sibling::h5)[3]")).toContainText(vars["ThirdCurrentMarket"]);
    await expect(page.locator("(//ancestor::tr//td[@data-title=\"Curr Market Value\"])[3]")).toContainText(vars["ThirdCurrentMarket"]);
    await expect(page.locator("(//td[@data-title=\"Last Name\"])[3]")).toContainText(vars["ThirdCommittedLastName"]);
    await expect(page.locator("(//td[@data-title=\"Loan Amount\"])[3]")).toContainText(vars["ThirdCommittedLoanAmount"]);
    await expect(page.locator("(//td[@data-title=\"Ref Sec Prod.\"])[3]")).toContainText(vars["ThirdCommittedRefSecProd"]);
    await expect(page.locator("(//td[@data-title=\"Ref Sec Price\"])[3]")).toContainText(vars["ThirdCommittedRefSecPrice"]);
    await expect(page.locator("(//td[@data-title=\"Gross Price\"])[3]")).toContainText(vars["ThirdCommittedGrossPrice"]);
    await expect(page.locator("(//td[@data-title=\"Hedge Ratio\"])[3]")).toContainText(vars["ThirdCommittedHedgeRatio"]);
    await expect(page.locator("(//td[@data-title=\"Mark Adj\"])[3]")).toContainText(vars["ThirdCommittedMarkAdj"]);
    await expect(page.locator("(//td[@data-title=\"Curr Gross\"])[3]")).toContainText(vars["ThirdCommittedLoanCurrGross"]);
  });
});
