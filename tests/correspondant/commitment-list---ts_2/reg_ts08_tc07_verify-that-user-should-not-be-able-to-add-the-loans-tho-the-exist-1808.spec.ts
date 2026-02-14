import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Commitment List - TS_2', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS08_TC07_Verify that user should not be able to add the loans tho the existing commitment after the time limit is exceeded', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    vars["BidReqId"] = testData["RequestIdFrom5-1"];
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//a[@href=\"#/admin/general-settings/other-config\"]").click();
    vars["CommitCorrectionCutOffBefore"] = await page.locator("//input[@id=\"internalUserCorrectionCutOfHours\"and @type=\"number\"]").inputValue() || '';
    await page.locator("//input[@id=\"internalUserCorrectionCutOfHours\"and @type=\"number\"]").click();
    if (String(vars["CommitCorrectionCutOffBefore"]) === String("1")) {
      await page.locator("//input[@id='externalUserCreationCutOfTime']").click();
    } else {
      await page.locator("//input[@id=\"internalUserCorrectionCutOfHours\"and @type=\"number\"]").clear();
      await page.locator("//input[@id=\"internalUserCorrectionCutOfHours\"and @type=\"number\"]").click();
      await page.locator("//input[@id=\"internalUserCorrectionCutOfHours\"and @type=\"number\"]").fill("1");
      await page.locator("//button[normalize-space(text())=\"Save changes\" or contains(text(),\"Save Changes\")]").waitFor({ state: 'visible' });
      await page.locator("//button[normalize-space(text())=\"Save changes\" or contains(text(),\"Save Changes\")]").click();
    }
    await page.locator("//ul[contains(@class, 'navbar-nav') and contains(@class, 'flex-column')]/li[3]/a[1]").click();
    await page.locator("//span[text()[normalize-space() = \"Committed List\"]]").click();
    await page.locator("//input[@id='searchTagInput']").click();
    await page.locator("//input[@id='searchTagInput']").fill(vars["BidReqId"]);
    await page.locator("//span[normalize-space(text())=\"Bid Request ID\"]").waitFor({ state: 'visible' });
    await page.locator("//span[normalize-space(text())=\"Bid Request ID\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Bid Request ID\"]//div[normalize-space(text())=\"$|BidReqId|\"]//ancestor::tr//td[@data-title=\"Comm. ID\"]").click();
    vars["CommitTime"] = await page.locator("//div[text()=\"Commit. Time\"]//following-sibling::h5").textContent() || '';
    vars["CommitID"] = await page.locator("//div[text()=\"Commit. ID\"]/following-sibling::h5").textContent() || '';
    vars["CurrentTime"] = (() => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { timeZone: "UTC" };
      const fmt = "hh:mm a";
      // Map Java date format to Intl parts
      const parts = new Intl.DateTimeFormat('en-US', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({type, value}) => [type, value]));
      return fmt.replace('yyyy', p.year || '').replace('yy', (p.year||'').slice(-2)).replace('MM', p.month || '').replace('dd', p.day || '').replace('HH', String(d.getHours()).padStart(2,'0')).replace('hh', p.hour || '').replace('mm', p.minute || '').replace('ss', p.second || '').replace('a', p.dayPeriod || '').replace(/M(?!M)/g, String(parseInt(p.month||'0'))).replace(/d(?!d)/g, String(parseInt(p.day||'0'))).replace(/h(?!h)/g, String(parseInt(p.hour||'0')));
    })();
    vars["TimeDiff"] = Math.abs(new Date('2000-01-01 ' + String(vars["CommitTime"])).getTime() - new Date('2000-01-01 ' + String(vars["CurrentTime"])).getTime()) / 3600000 + '';
    if (String(vars["TimeDiff"]) > String("1")) {
      await page.locator("//div[text()[normalize-space() = \"Total Loans\"]]").click();
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      await page.locator("//td[@role=\"cell\"]//input[@type=\"checkbox\"]").check();
      await page.locator("//button[@id='commitdropdownMenuButton']").click();
      await expect(page.locator("//div[text()=\"574X3D2A\"]//preceding-sibling::div[contains(text(),\"Commitment Order\")]//parent::a[contains(@class,\"disabled\")]")).toHaveAttribute('aria-label', "disabled");
    }
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
    await page.locator("//a[@href=\"#/admin/general-settings/other-config\"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["CommitCorrectionCutOffAfter"] = await page.locator("//input[@id=\"internalUserCorrectionCutOfHours\"and @type=\"number\"]").inputValue() || '';
    if (String(vars["CommitCorrectionCutOffBefore"]) !== String(vars["CommitCorrectionCutOffAfter"])) {
      await page.locator("//input[@id=\"internalUserCorrectionCutOfHours\"and @type=\"number\"]").clear();
      await page.locator("//input[@id=\"internalUserCorrectionCutOfHours\"and @type=\"number\"]").click();
      await page.locator("//input[@id=\"internalUserCorrectionCutOfHours\"and @type=\"number\"]").fill(vars["CommitCorrectionCutOffBefore"]);
      await page.locator("//button[normalize-space(text())=\"Save changes\" or contains(text(),\"Save Changes\")]").waitFor({ state: 'visible' });
      await page.locator("//button[normalize-space(text())=\"Save changes\" or contains(text(),\"Save Changes\")]").click();
    }
  });
});
