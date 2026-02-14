import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('2228_c458acc7201b4cc2bfdf1c68453aed9a_aftertest', async ({ page }) => {
    if (true) /* Test Case Result is Failed */ {
      await stepGroups.stepGroup_Navigating_To_Bid_Request_Config(page, vars);
      if (true) /* Verify that the element Loan Duplicate Toggle displays Light */ {
        await page.locator("(//*[@class=\"slider round\"])[2]").click();
      }
      await page.waitForLoadState('networkidle');
      await expect(page.locator("(//*[@class=\"slider round\"])[2]")).toHaveCSS('border', vars["BrightBlueColor"]);
      if (true) /* Element Save Changes Button is enabled */ {
        await page.locator("//button[text()=\"Save Changes\"]").click();
      }
    }
  });
});
