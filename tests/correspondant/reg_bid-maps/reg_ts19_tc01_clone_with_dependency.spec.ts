import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';
import { TestDependencyManager } from '../../../src/helpers/test-dependencies';
import { executeTC19Prerequisite } from '../../../src/helpers/reg_ts19_prerequisite-helper';

const PREREQUISITE_TEST_NAME = 'REG_TS19_TC01';

test.describe('REG_Bid Maps - TC19 (with dependency tracking)', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS19_TC01_Verify if there is more than one company associated with a map, then the count of associated company should be displayed next to the company value in the list.', async ({ page }) => {
    await executeTC19Prerequisite(page, vars);
  });
});
