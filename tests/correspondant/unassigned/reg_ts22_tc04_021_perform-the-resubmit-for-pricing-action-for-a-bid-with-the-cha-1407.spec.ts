import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS22_TC04_02.1_Perform the resubmit for pricing action for a bid with the Chase execution type, and validate all the values in the resubmitted record . (Target: Submit today, status :Expired)', async ({ page }) => {
    // Prerequisite: REG_TS22_TC04_02_Perform the resubmit for pricing action for a bid with the Chase execution type, an
    // TODO: Ensure prerequisite test passes first

    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await page.locator("(//tbody//tr//td)[1]//button[1]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("(//h5[@aria-labelledby=\"bidRequestIdLabel\"])[1]")).not.toContainText(vars["RequestIdPopupBeforeSubmit"]);
    await expect(page.locator("(//h5[@aria-labelledby=\"bidRequestIdLabel\"])[2]")).toContainText(vars["LoanNumberPopUpBeforeSubmit"]);
    await expect(page.locator("//div[@class=\"flex-grow-1 d-flex gap-3\"]//div/div[@id=\"errorsCheckLabel\"]/..//h5[@aria-labelledby=\"errorsCheckLabel\"]")).toContainText(vars["ErrorsCheckPopupBeforeSubmit"]);
    vars["ChaseFieldCountPopup"] = String(await page.locator("//div[@class=\"border-bottom p-2\"]").count());
    vars["count"] = "1";
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["ChaseFieldCountPopup"]))) {
      await page.locator("(//h5[@aria-labelledby=\"bidRequestIdLabel\"])[1]").click();
      vars["ChaseFieldPopupAfterSubmit"] = await page.locator("(//div[@class=\"border-bottom p-2\"])[$|count|]").textContent() || '';
      vars["ChaseValuePopupAfterSubmit"] = await page.locator("(//div[@class=\"border-bottom p-2\" and contains(text(),\"$|ChaseFieldPopupAfterSubmit|\")]/following-sibling::div)[1]").textContent() || '';
      for (let dataIdx = parseInt(vars["count"]); dataIdx <= parseInt(vars["count"]); dataIdx++) {
        await expect(page.locator("(//div[@class=\"border-bottom p-2\"])[$|count|]")).toContainText(testData["ChaseFieldNameBeforeSubmit"]);
        if (String(vars["ChaseValuePopupAfterSubmit"]) === String("Key_blank")) {
          expect(String(testData["ChaseValueBeforeSubmit"])).toBe("Null");
        } else {
          await expect(page.locator("(//div[@class=\"border-bottom p-2\" and contains(text(),\"$|ChaseFieldPopupAfterSubmit|\")]/following-sibling::div)[1]")).toContainText(testData["ChaseValueBeforeSubmit"]);
        }
      }
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    await page.locator("//button[@aria-label=\"Close\"]").click();
    await expect(page.locator("//div[@id=\"page-footer\"]//span[@class=\"d-block\"]")).not.toContainText(vars["FooterSubmssionBeforeSubmit"]);
    await expect(page.locator("//div[@id=\"page-footer\"]//span[contains(text(),\"Queued For\")]")).not.toContainText(vars["FooterQueuedBeforeSubmit"]);
    await stepGroups.stepGroup_Verify_Footer_Submission_and_Queued_Date_For_Today_in_Bid_Re(page, vars);
  });
});
