import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS08_TC13_Verify that the user is able to perform UnChecked the checkbox operations in the Enumeration  mapping.', async ({ page }) => {
    // Prerequisite: REG_TS08_TC12_Verify that the user is able to perform all Checked the checkbox operations in the Enu
    // TODO: Ensure prerequisite test passes first

    if (true) /* Element Add Rule Button is visible */ {
      await page.locator("//span[text()[normalize-space() = \"BACK\"]]").click();
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      await page.locator("//a[contains(text(),\"Header Mapping\")]").click();
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      await page.waitForLoadState('networkidle');
    } else if (true) /* Element Add Rule Button is not visible */ {
      await page.locator("//span[text()[normalize-space() = \"BACK\"]]").click();
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
      await page.locator("//span[text()[normalize-space() = \"BACK\"]]").click();
      await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    }
    await page.locator("//*[text()=\"Amortization Type\"]/../..//input[@type=\"checkbox\"]").uncheck();
    await page.locator("//*[text()=\"$|EnumValues|\"]/../..//input[@type=\"checkbox\"]").uncheck();
    await page.locator("//div[contains(@class, 'container') and contains(@class, 'd-flex')]/div[2]/button[2]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await expect(page.locator("//input[contains(@aria-label,'Enable or disable field Amortization Type')]")).toBeVisible();
    await expect(page.locator("//input[contains(@aria-label,'Enable or disable field Amortization Type')]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    if (true) /* Element You have unidentified fields. This action will save  */ {
      await expect(page.locator("//*[contains(text(),\" You have unidentified fields do you want to proceed further\")]")).toBeVisible();
      await page.locator("//span[text()[normalize-space() = \"Continue Editing\"]]").click();
    }
  });
});
