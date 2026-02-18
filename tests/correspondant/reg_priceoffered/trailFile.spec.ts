import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';
import * as FileHelper from '../../../src/helpers/file-helpers';
import AdmZip from 'adm-zip';
import { testDataManager } from 'testdata/TestDataManager';

test.describe('REG_PriceOffered sequential workflow', () => {
  let vars: Record<string, string> = {};

    // BEHAVIOR: Run in order and stop the chain if one fails
  // test.describe.configure({ mode: 'serial', retries: 2 });s
  
  test.beforeEach(async () => {
    vars = {};
  });

// test('fetch the file names from downloaded zip file', async () => {
//   console.log('Testing file helper functions...');
//   const filePath = path.resolve(__dirname,'../../../download/Commitment_87IG723B_all_letters.zip');
//    console.log("File Path:", filePath);


//    const zip = new AdmZip(filePath);
//    console.log("zip", zip);
//    const fileNames = FileHelper.getFileNamesFromZip(filePath);
//    console.log("File Names Count:", fileNames.length);
//    console.log("File Names:", fileNames);

  
// }); 
test('fetch the details from json file', async () => {
  console.log('Testing excel helper functions...');
  const filePath = path.resolve(__dirname,'../../../upload/pricing-request-Deepika_JULY_16_11.json');
   console.log("File Path:", filePath);


   const jsonContent = FileHelper.readJson(filePath);
   console.log("JSON Content:", jsonContent);
 console.log("===============================================");
    const jsonContentWithKey = FileHelper.readJsonKey(filePath,"corrLoanNumber");
   console.log("JSON Content:", jsonContentWithKey);
}); 
});
