import { test } from '@playwright/test';
import path from 'path';
import * as excelHelper from '../../../src/helpers/excel-helpers';
import { UPLOADS_PATH } from '../../../src/helpers/file-helpers';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS02_TC01_Rewrite only existing cells in first column', async () => {
    vars["File"] = path.join(
      UPLOADS_PATH,
      'Bid_file_success_error_newly_updated (10).xlsx'
    );

    console.log('📁 File path: ' + vars["File"]);
    console.log('📁 File exists: ' + require('fs').existsSync(vars["File"]));

    const totalRows = excelHelper.getRowCount(vars["File"], "0");
    console.log('📊 Total rows found: ' + totalRows);

    for (let row = 1; row < totalRows; row++) {
      const existingValue = excelHelper.readCell(
        vars["File"],
        String(row),
        "0",
        "0"
      );

      console.log(`[Row ${row}] Existing value: "${existingValue}"`);

      if (!existingValue || String(existingValue).trim() === '') {
        console.log(`[Row ${row}] ⚠️ Empty cell found - stopping loop`);
        break;
      }

      const d = new Date();
      const parts = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).formatToParts(d);
      const p = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
      const currentDate = `${p.day}-${p.month}-${p.year}`;

      const newValue =
        `TestSigma_${currentDate}_SC1_` +
        Math.random().toString(36).substring(2, 4).toUpperCase() +
        '_' +
        (Math.floor(Math.random() * 900) + 100);

      console.log(`[Row ${row}] Writing new value: "${newValue}"`);

      excelHelper.writeCell(
        vars["File"],
        String(row),
        "0",
        newValue,
        "0"
      );

      const verifyValue = excelHelper.readCell(vars["File"], String(row), "0", "0");
      console.log(`[Row ${row}] ✅ Value after write: "${verifyValue}"`);
    }

    console.log('\n✅ Done! Check file at: ' + vars["File"]);
  });
});
