import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';
import { testDataManager } from 'testdata/TestDataManager';

test.describe('Unassigned', () => {
  let vars: Record<string, string> = {};

  const profileName = 'Select Date Range User Group Module(Dashboard)';
  const profile = testDataManager.getProfileByName(profileName);


      test('REG_TS02_TC011_Correspondent Bid Maps Menu - Verify the User can able to access', async ({ page }) => {
        // test(`REG_TS01_TC02_01_No Default Favourites are saved - User: ${dataRow.UserName} (Row ${index + 1})`, async ({ page }) => {
        await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await expect(page.locator("//h3[text()[normalize-space() ='Dashboard']]")).toBeVisible();
    // await page.locator("//span[text()[normalize-space() ='Bid Requests'] and contains(@class, 'hide-text')]").click();
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // await expect(page.locator("//h3[text()[normalize-space() ='Bid Requests']]")).toBeVisible();
    // await page.locator("//span[text()[normalize-space() ='Administration']]").click();
    // await page.locator("//span[text()[normalize-space() ='Bid Maps']]").waitFor({ state: 'visible' });
    // await page.locator("//span[text()[normalize-space() ='Bid Maps']]").click();
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    // await expect(page.locator("//h1[text()[normalize-space() ='Mappings']]")).toBeVisible();
    // await page.locator("//span[normalize-space(text())='Dashboard']").click();
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
  if (profile && profile.data) {
  // Loop through each data object in the JSON
  for (const dataRow of profile.data) {
    console.log("Testing with data: ", dataRow);
  vars['Count'] ='1';
  for (let dataIdx = parseInt(vars['Count']); dataIdx <= 4; dataIdx++) {
    vars["Date Range Filter Type"] = dataRow["Date Range Filter Type"];
    // vars["Stage2_Environment"] = dataRow["Stage2_Environment"];
    console.log(`Testing with Date Range Filter Type: ${vars["Date Range Filter Type"]}`);
         
    await page.locator("//label[text()='Select Date Range']//following::div[contains(@class,'custom')]//a[@role='button']").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    const datarange=  vars["Date Range Filter Type"];
    await expect(page.locator(`//span[normalize-space(text())='${datarange}']`)).toBeVisible();
    await page.locator(`//span[normalize-space(text())='${datarange}']`).click();
    // await expect(page.locator(`//span[normalize-space()='${vars["Date Range Filter Type"]}']`)).toBeVisible();
    // await expect(page.locator("//span[text()='page, Date Range Filter Type']")).toBeVisible();
    // await page.locator("//span[text()='@|Date Range Filter Type|']").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator(`//span[text()='${datarange}']`)).toBeVisible();
    vars['TotalCommitments'] = await page.locator("//div[contains(text(),'commitments')]//following-sibling::h5").textContent() || '';
      console.log(`Total Commitments for Date Range "${vars["Date Range Filter Type"]}": ${vars['TotalCommitments']}`);
    vars['Count'] = (parseFloat(String(vars['Count'])) + parseFloat(String("1"))).toFixed(0);
  }
  }
  } else {
      console.warn(`Profile with name "${profileName}" not found or has no data.`);   
  }
  });

});

//     await page.locator("//label[text()='Select Date Range']//following::div[contains(@class,'custom')]//a[@role='button']").click();
//     await page.locator("//input[@placeholder='Select Date']//following::button[contains(@aria-label,'Datepicker')]").waitFor({ state: 'visible' });
//     vars['CurrentDateFromDropdown'] = await page.locator("//input[@placeholder='Select Date']").inputValue() || '';
//     expect(String(vars['CurrentDateFromDropdown'])).toBe(new Date().toLocaleDateString('en-US') /* format: yyyy-MM-dd */);
//     await page.locator("//input[@placeholder='Select Date']//following::button[contains(@aria-label,'Datepicker')]").click();
//     await page.locator("//span[contains(@class,'today')]//parent::div").dblclick();
//     vars['CurrentDate'] = new Date().toLocaleDateString('en-US') /* format: d-M-yyyy */;
//     vars['FutureDate'] = (() => { const d = new Date(String(vars['CurrentDate'])); d.setDate(d.getDate() + parseInt(String("2"))); return d.toLocaleDateString('en-US'); /* format: d-M-yyyy */ })();
//     await page.locator("//div[@aria-label='$|FutureDate|']").click();
//     await page.locator("//button[text()[normalize-space() ='Apply']]").waitFor({ state: 'visible' });
//     await page.locator("//button[text()[normalize-space() ='Apply']]").click();
//     await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
//     vars['ActualSelectedDateRange'] = await page.locator("(//label[text()='Select Date Range']//following::span)[1]").textContent() || '';
//     vars['ActualSelectedDateRange'] = String(vars['ActualSelectedDateRange']).trim();
//     vars['SelectedFutureDateRange'] = (() => {
//       const d = new Date(String(vars['FutureDate']));
//       const _p = { yyyy: String(d.getFullYear()), yy: String(d.getFullYear()).slice(-2), MM: String(d.getMonth()+1).padStart(2,'0'), M: String(d.getMonth()+1), dd: String(d.getDate()).padStart(2,'0'), d: String(d.getDate()), HH: String(d.getHours()).padStart(2,'0'), hh: String(d.getHours()%12||12).toString().padStart(2,'0'), h: String(d.getHours()%12||12), mm: String(d.getMinutes()).padStart(2,'0'), ss: String(d.getSeconds()).padStart(2,'0'), a: d.getHours() >= 12 ? 'PM' : 'AM' };
//       return "yyyy/MM/dd".replace('yyyy',_p.yyyy).replace('yy',_p.yy).replace('MM',_p.MM).replace('dd',_p.dd).replace('HH',_p.HH).replace('hh',_p.hh).replace('mm',_p.mm).replace('ss',_p.ss).replace(/a/g,_p.a).replace(/M(?!M)/g,_p.M).replace(/d(?!d)/g,_p.d).replace(/h(?!h)/g,_p.h);
//     })();
//     vars['CurrentDate'] = new Date().toLocaleDateString('en-US') /* format: yyyy/MM/dd */;
//     vars['ExpectedSelectedDateRange'] = String(vars['CurrentDate']) + "-" + String(vars['SelectedFutureDateRange']);
//     expect(String(vars['ExpectedSelectedDateRange'])).toBe(vars['ActualSelectedDateRange']);
//     await page.locator("//label[text()='Select Company']//following::div[contains(@class,'dropdown')]//button[@id]").click();
//     await page.locator("//input[@id='searchBox']").waitFor({ state: 'visible' });
//     vars['CompanyName'] = await page.locator("(//div[@class='dropdown-overflow']//input[@type='checkbox'])[1]/..//span").textContent() || '';
//     await page.locator("//span[contains(text(),'$|CompanyName|'')]/../..//input[@type='checkbox']").check();
//     await page.locator("//button[text()=' Apply Selected ']").waitFor({ state: 'visible' });
//     await page.locator("//div[@class='filter-sort' and text()='Show Selected']").click();
//     await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
//     vars['TotalSelectedCompiniesCount'] = String(await page.locator("//label[text()='Select Company/CCode']/..//label[contains(@class,'checked')]//span[@title]").count());
//     vars['TotalShowedCompiniesCount'] = String(await page.locator("//div[@class='dropdown-overflow']//label[@role='option']").count());
//     expect(String(vars['TotalSelectedCompiniesCount'])).toBe(vars['TotalShowedCompiniesCount']);
//     await page.locator("//div[text()[normalize-space() ='Show All']]").click();
//     await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
//     vars['TotalCompiniesCount'] = String(await page.locator("//div[@class='dropdown-overflow']//label[@role='option']").count());
//     expect(String(vars['TotalCompiniesCount'])).toBe(vars['TotalSelectedCompiniesCount']);
//     await page.locator("//button[text()=' Apply Selected ']").click();
//     await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
//     await page.locator("//label[text()='Select Company']//following::div[contains(@class,'dropdown')]//button[@id]").click();
//     if (true) /* Checkbox Company Check Box is checked */ {
//       await page.locator("//span[contains(text(),'$|CompanyName|')]/../..//input[@type='checkbox']").uncheck();
//     }
//     await page.locator("//input[@id='searchBox']").waitFor({ state: 'visible' });
//     await page.locator("//input[@id='searchBox']").fill(vars['CompanyName']);
//     await expect(page.locator("//span[contains(text(),'$|CompanyName|'')]")).toBeVisible();
//     await page.locator("//button[@aria-label='Clear search']").click();
//     await page.locator("//input[@id='chkItemallIdundefined' and @type='checkbox']").waitFor({ state: 'visible' });
//     vars['TotalCompiniesCount'] = String(await page.locator("//div[@class='dropdown-overflow']//label[@role='option']").count());
//     await page.locator("//input[@id='chkItemallIdundefined' and @type='checkbox']").check();
//     await page.locator("//button[text()=' Apply Selected ']").waitFor({ state: 'visible' });
//     vars['TotalSelectedCompiniesCount'] = await page.locator("//button[@aria-label='Apply selected items']//span[@aria-label]").textContent() || '';
//     vars['TotalSelectedCompiniesCount'] = String(vars['TotalSelectedCompiniesCount']).trim();
//     expect(String(vars['TotalCompiniesCount'])).toBe(vars['TotalSelectedCompiniesCount']);
//         await page.locator("//button[text()=' Apply Selected ']").click();