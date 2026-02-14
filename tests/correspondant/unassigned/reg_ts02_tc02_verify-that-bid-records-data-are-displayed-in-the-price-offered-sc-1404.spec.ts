import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS02_TC02_Verify that bid records data are displayed in the Price Offered screen once their status is updated to \\\"Price Offered\\\"', async ({ page }) => {
    // Prerequisite: REG_TS02_TC01.1_Perform submit for pricing action, and then verify the status should be updated to p
    // TODO: Ensure prerequisite test passes first

    await expect(page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]")).toBeVisible();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["RequestIDDetails"]);
    // Write to test data profile: "RequestIDCreated2ndScenario" = vars["RequestIDDetails"]
    // TODO: Test data profile writes need custom implementation
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["RequestedDate(bid requests)"] = await page.locator("(//td[@data-title=\"Requested\"])[1]").textContent() || '';
    await page.locator("//td[@data-title=\"Bid Req. ID\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.getByText("Bid Request Details\r")).toBeVisible();
    vars["CCode(bid request details)"] = await page.locator("//div[text()=\"CCode\"]/..//h5").textContent() || '';
    vars["Company(bid request details)"] = await page.locator("//div[text()=\"Company\"]/..//h5").textContent() || '';
    vars["Company(bid request details"] = String(vars["Company(bid request details)"]).substring(1, String(vars["Company(bid request details)"]).length - 1);
    vars["RequestID(bid request details)"] = await page.locator("//div[text()=\"Request ID\"]/..//h5").textContent() || '';
    vars["Status(bid request details)"] = await page.locator("//div[text()=\"Status\"]/..//h5").textContent() || '';
    vars["count"] = "1";
    vars["TotalRows"] = String(await page.locator("//div[@id=\"accordionHeader\"]").count());
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["TotalRows"]))) {
      vars["ExecutionType"] = await page.locator("(//div[text()=\" Execution Type \"]/..//h5)[$|count|]").textContent() || '';
      if (String(vars["ExecutionType"]).includes(String("Chase"))) {
        vars["SuccessLoan(CD)"] = await page.locator(" //div[@aria-labelledby=\"executionHeader\"]//div/h5[text()=\"Chase Direct\"]/../..//div[text()='Total Loan Rows']/..//span[contains(@aria-label,\"Successful Loan\")]").textContent() || '';
        vars["count1"] = "1";
        vars["total"] = "0";
        vars["TotalSuccessLoanAmountCount"] = String(await page.locator("(//tbody)[2]//td[@data-title=\"Loan Status\"]//div[contains(text(),\"Success\")]/../..//td[@data-title=\"Loan Amount\"]").count());
        while (parseFloat(String(vars["count1"])) <= parseFloat(String(vars["TotalSuccessLoanAmountCount"]))) {
          vars["SuccessLoanAmount"] = await page.locator("((//tbody)[1]//td[@data-title=\"Loan Status\"]//div[contains(text(),\"Success\")]/../..//td[@data-title=\"Loan Amount\"])[$|count1|]").textContent() || '';
          vars["SuccessLoanAmount"] = String(vars["SuccessLoanAmount"]).replace(/\$/g, '');
          vars["SuccessLoanAmount"] = String(vars["SuccessLoanAmount"]).replace(/\,/g, '');
          vars["total"] = (parseFloat(String(vars["total"])) + parseFloat(String(vars["SuccessLoanAmount"]))).toFixed(0);
          vars["count1"] = (parseFloat(String("1")) + parseFloat(String(vars["count1"]))).toFixed(0);
        }
        vars["TotalSumOfSuccessLoanAmount(chase bid request details)"] = vars["total"];
      } else if (String(vars["ExecutionType"]).includes(String("Standard"))) {
        vars["SuccessLoan(SFL)"] = await page.locator(" //div[@aria-labelledby=\"executionHeader\"]//div/h5[text()=\"Standard Flow Loans\"]/../..//div[text()='Total Loan Rows']/..//span[contains(@aria-label,\"Successful Loan\")]").textContent() || '';
        vars["count1"] = "1";
        vars["total"] = "0";
        vars["TotalSuccessLoanAmountCount"] = String(await page.locator("(//tbody)[1]//td[@data-title=\"Loan Status\"]//div[contains(text(),\"Success\")]/../..//td[@data-title=\"Loan Amount\"]").count());
        while (parseFloat(String(vars["count1"])) <= parseFloat(String(vars["TotalSuccessLoanAmountCount"]))) {
          vars["SuccessLoanAmount"] = await page.locator("((//tbody)[1]//td[@data-title=\"Loan Status\"]//div[contains(text(),\"Success\")]/../..//td[@data-title=\"Loan Amount\"])[$|count1|]").textContent() || '';
          vars["SuccessLoanAmount"] = String(vars["SuccessLoanAmount"]).replace(/\$/g, '');
          vars["SuccessLoanAmount"] = String(vars["SuccessLoanAmount"]).replace(/\,/g, '');
          vars["total"] = (parseFloat(String(vars["total"])) + parseFloat(String(vars["SuccessLoanAmount"]))).toFixed(0);
          vars["count1"] = (parseFloat(String("1")) + parseFloat(String(vars["count1"]))).toFixed(0);
        }
        vars["TotalSumOfSuccessLoanAmount(standard bid requests details)"] = vars["total"];
      }
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//a[@href=\"#/commitments/price-offered\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]")).toBeVisible();
    await page.locator("//div//input[@placeholder=\"Search By Bid Request ID\"]").fill(vars["RequestIDDetails"]);
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["count"] = "1";
    vars["AllRowsCount"] = String(await page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"])[position() >=2 and position()<=last()]").count());
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["AllRowsCount"]))) {
      vars["ExecutionType1(price offered screen)"] = await page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Execution Type\"]/div)[$|count|]").textContent() || '';
      if (String(vars["ExecutionType1(price offered screen)"]).includes(String("CHASE"))) {
        await expect(page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"CCode\"]/div)[$|count|]")).toContainText(vars["CCode(bid request details)"]);
        await expect(page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Bid Req. ID\"]/a)[$|count|]")).toContainText(vars["RequestID(bid request details)"]);
        await expect(page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Company\"]/div)[$|count|]")).toContainText(vars["Company(bid request details)"]);
        // [DISABLED] Verify that the element Company1(price offered) displays text Company(bid request details) and With Scrollable FALSE
        // await expect(page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Company\"]/div)[$|count|]")).toContainText(vars["Company(bid request details)"]);
        await expect(page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Date Price Offered\"]/div)[$|count|]")).toContainText(vars["RequestedDate(bid requests)"]);
        vars["TotalLoanAmountChase"] = await page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Bid Value\"]/div)[$|count|]").textContent() || '';
        vars["TotalLoanAmountChasePriceOffered"] = String(vars["TotalLoanAmountChase"]).replace(/\$/g, '');
        vars["TotalLoanAmountChasePriceOffered"] = String(vars["TotalLoanAmountChasePriceOffered"]).replace(/\,/g, '');
        expect(String(vars["TotalLoanAmountChasePriceOffered"])).toBe(vars["TotalSumOfSuccessLoanAmount(chase bid request details)"]);
        await expect(page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"#Loans\"]/div)[$|count|]")).toContainText(vars["SuccessLoan(CD)"]);
        await expect(page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Status\"])[$|count|]")).toContainText(vars["Status(bid request details)"]);
      } else if (String(vars["ExecutionType1(price offered screen)"]).includes(String("STANDARD"))) {
        await expect(page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"CCode\"]/div)[$|count|]")).toContainText(vars["CCode(bid request details)"]);
        await expect(page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Bid Req. ID\"]/a)[$|count|]")).toContainText(vars["RequestID(bid request details)"]);
        await expect(page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Company\"]/div)[$|count|]")).toContainText(vars["Company(bid request details)"]);
        await expect(page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Date Price Offered\"]/div)[$|count|]")).toContainText(vars["RequestedDate(bid requests)"]);
        vars["TotalLoanAmountStandard"] = await page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Bid Value\"]/div)[$|count|]").textContent() || '';
        vars["TotalLoanAmountStandardPriceOffered"] = String(vars["TotalLoanAmountStandard"]).replace(/\$/g, '');
        vars["TotalLoanAmountStandardPriceOffered"] = String(vars["TotalLoanAmountStandardPriceOffered"]).replace(/\,/g, '');
        expect(String(vars["TotalLoanAmountStandardPriceOffered"])).toBe(vars["TotalSumOfSuccessLoanAmount(standard bid requests details)"]);
        await expect(page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"#Loans\"]/div)[$|count|]")).toContainText(vars["SuccessLoan(SFL)"]);
        await expect(page.locator("(//table[@aria-label=\"Data Table\"]//tr[@role=\"row\"]//td[@data-title=\"Status\"])[$|count|]")).toContainText(vars["Status(bid request details)"]);
      }
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
  });
});
