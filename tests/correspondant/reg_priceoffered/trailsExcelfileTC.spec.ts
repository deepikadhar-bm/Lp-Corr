import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';
import * as excelHelper from '../../../src/helpers/excelHelper';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS02_TC01_Updating the Loan Numbers In File', async ({ page }) => {
  const filePath = path.resolve(__dirname,'../../../upload/Bid_file_success_error_newly_updated (10).xlsx');
   console.log("Row Count:", excelHelper.getRowCount(filePath, "Sheet1"));

  const totalRows = excelHelper.getRowCount(filePath, 'Sheet1');
    console.log("Total Rows:", totalRows);



 for (let i = 0; i < totalRows; i++) {
    console.log("Processing row:", i);

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
         
    await excelHelper.updateCell({filePath, sheetName: "Sheet1", columnHeader: "Correspondent Loan Number",rowIndex: i, value: newValue});
    // Add your logic here (e.g., page.fill(), page.click())
  }



    
  });
});
