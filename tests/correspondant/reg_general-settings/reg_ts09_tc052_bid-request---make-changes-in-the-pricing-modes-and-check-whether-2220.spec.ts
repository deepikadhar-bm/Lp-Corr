import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_General Settings', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS09_TC05.2_Bid Request - Make Changes in the Pricing Modes, and check whether it is get reflected in the Upload bid Request Module.', async ({ page }) => {
    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[@href=\"#/admin/general-settings/bid-request\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//input[@id=\"pricingMode-0-on\"]").check();
    await page.locator("//input[@id=\"pricingMode-1-on\"]").check();
    if (true) /* Element Save Changes Button is enabled */ {
      await page.locator("//button[text()=\"Save Changes\"]").click();
    }
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Navigating_to_Bulk_Batch_Timing(page, vars);
    await stepGroups.stepGroup_Modifying_The_batch_Intervals_with_current_est_time(page, vars);
    // [DISABLED] Add 5 minutes to the CurrentTime with hh:mm a , convert to hh:mm a format, and store it in a runtime variable ExpectedBatch2Time
    // vars["ExpectedBatch2Time"] = (() => {
    //   const d = new Date('2000-01-01 ' + String(vars["CurrentTime"]));
    //   d.setMinutes(d.getMinutes() + parseInt(String("5")));
    //   return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }); // Format: hh:mm a
    // })();
    await stepGroups.stepGroup_Navigating_to_Upload_New_Bid_Request(page, vars);
    await stepGroups.stepGroup_Uploading_Bid_Request_For_both_Real_and_Differed_Options(page, vars);
    await page.locator("//form[@aria-labelledby=\"executionDetailsHeader\"]/div[4]/div[1]/div[1]/input[1]").check();
    await page.waitForLoadState('networkidle');
    await expect(page.locator("//label[text()[normalize-space() = \"Today\"]]/preceding-sibling::input[@type=\"radio\"]")).toBeVisible();
    await expect(page.locator("//label[text()[normalize-space() = \"Next Business Day\"]]/preceding-sibling::input[@type=\"radio\"]")).toBeVisible();
    await page.locator("//form[@aria-labelledby=\"executionDetailsHeader\"]/div[4]/div[1]/div[2]/input[1]").check();
    await page.waitForLoadState('networkidle');
    await page.locator("//label[text()[normalize-space() = \"Today\"]]/preceding-sibling::input[@type=\"radio\"]").waitFor({ state: 'visible' });
    await page.locator("//label[text()[normalize-space() = \"Next Business Day\"]]/preceding-sibling::input[@type=\"radio\"]").waitFor({ state: 'visible' });
    await stepGroups.stepGroup_Upload_Bid_Process_from_Batch_time_Selection_to_Bid_Upload_P(page, vars);
    await expect(page.locator("//button/span[text()=\"Submit For Pricing\"]/..")).toBeVisible();
    await page.locator("//button/span[text()=\"Submit For Pricing\"]/..").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//button[@aria-label=\"Yes Submit\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//a[@href=\"#/bid-requests\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("(//td[@data-title=\"Status\"])[1]")).toContainText("Queued");
    await stepGroups.stepGroup_Navigating_To_Bid_Request_Config(page, vars);
    await page.locator("//input[@id=\"pricingMode-0-off\"]").check();
    await page.locator("//input[@id=\"pricingMode-1-on\"]").check();
    if (true) /* Element Save Changes Button is visible */ {
      await page.locator("//button[text()=\"Save Changes\"]").click();
    }
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
  });
});
