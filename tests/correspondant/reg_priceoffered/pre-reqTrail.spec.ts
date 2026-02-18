import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';
import * as excelHelper from '../../../src/helpers/excelHelper';
import { testDataManager } from 'testdata/TestDataManager';

test.describe('REG_PriceOffered sequential workflow', () => {
  let vars: Record<string, string> = {};

    // BEHAVIOR: Run in order and stop the chain if one fails
  // test.describe.configure({ mode: 'serial', retries: 2 });s
  
  test.beforeEach(async () => {
    vars = {};
  });

test('try excel', async () => {
  console.log('Testing excel helper functions...');
  const filePath = path.resolve(__dirname,'../../../upload/Bid_file_success_error_newly_updated (10).xlsx');
  console.log("Row Count:", excelHelper.getRowCount(filePath, "Sheet1"));
  console.log("Sheet Names:", excelHelper.getSheetNames(filePath));
  console.log("Sheet Count:", excelHelper.getSheetCount(filePath));
  console.log("Sheet Count:", excelHelper.readRow(filePath, 0, "Sheet1"));
  console.log("getCellByPosition:", excelHelper.getCellByPosition(filePath, 0, 2, 9));
  await excelHelper.updateCell({filePath, sheetName: "Sheet1", columnHeader: "Correspondent Loan Number",rowIndex: 1, value: "wecan do it"});
  console.log("===============================================");
  console.log("Row date: 0", excelHelper.getRowDataWithCommaSeperator(filePath, 0, "Sheet1"));
  console.log("===============================================");
  console.log("Row date: 1", excelHelper.getRowDataWithCommaSeperator(filePath, 1, "Sheet1"));
}); 
});
