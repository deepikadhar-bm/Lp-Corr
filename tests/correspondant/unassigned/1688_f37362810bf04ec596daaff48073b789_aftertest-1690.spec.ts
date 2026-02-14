import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('1688_f37362810bf04ec596daaff48073b789_aftertest', async ({ page }) => {
    if (true) /* Test Case Result is Failed */ {
      await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
      await page.locator("//span[text()[normalize-space() = \"General Settings\"]]").click();
      await page.locator("//a[@href=\"#/admin/general-settings/other-config\"]").click();
      // [DISABLED] Store text from the element Commit Creation Cut Off into a variable CommitCreationTimeBefore
      // vars["CommitCreationTimeBefore"] = await page.locator("//input[@id='externalUserCreationCutOfTime']").textContent() || '';
      // [DISABLED] Store text from the element Commit Creation Time Standard into a variable CommitCreationTimeStandard
      // vars["CommitCreationTimeStandard"] = await page.locator("//select[@aria-label=\"Dropdown selection\"]").textContent() || '';
      vars["vars[CommitCreationTimeBefore]"] = await page.locator("//input[@id='externalUserCreationCutOfTime']").inputValue() || '';
      vars["CommitCreationTimeStandard"] = await page.locator("//select[@aria-label=\"Dropdown selection\"]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
      await page.locator("//input[@id='externalUserCreationCutOfTime']").clear();
      await page.locator("//input[@id='externalUserCreationCutOfTime']").fill(vars["CommitCreationTimeBefore"]);
      await page.locator("//select[@aria-label=\"Dropdown selection\"]").click();
      await page.locator("//select[@aria-label=\"Dropdown selection\"]").selectOption({ label: vars["CommitCreationTimeStandard"] });
      await page.locator("//button[text()=\"Save Changes\"]").click();
    }
  });
});
