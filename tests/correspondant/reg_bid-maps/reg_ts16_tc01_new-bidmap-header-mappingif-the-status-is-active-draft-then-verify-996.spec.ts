import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS16_TC01_(New Bidmap & Header Mapping)If the status is active draft, then verify that user should be able to switch the view between active draft and should be able to delete the defat version if', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Smart_Mapper_from_Off_to_On(page, vars);
    await stepGroups.stepGroup_Navigating_to_Customer_Permission_For_the_Chase_Direct_Compa(page, vars);
    await stepGroups.stepGroup_EditActions_In_CustomerPermission(page, vars);
    await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"Bid Maps\"]]").click();
    await stepGroups.stepGroup_Creating_Of_Bid_Maps(page, vars);
    // [DISABLED] Creation Of Bid Map_Upto_Header Mapping
    // await stepGroups.stepGroup_Creation_Of_Bid_Map_Upto_Header_Mapping(page, vars);
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await page.locator("//span[text()[normalize-space() = \"Yes, Proceed\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"Yes, Proceed\"]]").click();
    await page.locator("//span[text()[normalize-space() = \"Save and Publish\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//td[@data-title=\"Map Name\"]//button[text()=\" $|Create New Map| \"]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await page.locator("//select[@aria-label=\"Dropdown selection\"]").selectOption({ index: parseInt("2") });
    vars["EditedExecutionType"] = await page.locator("//label[text()=\"Execution Type\"]/..//select").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
    await expect(page.locator("//div[contains(@class, 'container') and contains(@class, 'd-flex')]/div[2]/button[2]")).toBeVisible();
    await page.locator("//div[contains(@class, 'container') and contains(@class, 'd-flex')]/div[2]/button[2]").click();
    await expect(page.locator("//button[text()[normalize-space() = \"View Active Version\"]]")).toBeVisible();
    await page.locator("//button[text()[normalize-space() = \"View Active Version\"]]").click();
    await expect(page.locator("//div[contains(@class, 'container') and contains(@class, 'd-flex')]/div[2]/button[2]")).toBeVisible();
    // [DISABLED] Click on Administration_Menu
    // await page.locator("//span[text()[normalize-space() = \"Administration\"]]").click();
    // [DISABLED] Click on Bid Maps_Menu
    // await page.locator("//span[text()[normalize-space() = \"Bid Maps\"]]").click();
    // [DISABLED] Click on Bid Map Name Field In Row
    // await page.locator("//td[@data-title=\"Map Name\"]//button[text()=\" $|Create New Map| \"]").click();
    // [DISABLED] Wait until the element Spinner is not visible
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//select[@aria-label=\"Dropdown selection\"]")).toBeVisible();
    await expect(page.locator("//input[contains(@id,\"mappingName\")]")).toBeVisible();
    // [DISABLED] Verify that the element New Map Name Input has value EditedMapName and With Scrollable FALSE
    // await expect(page.locator("//input[contains(@id,\"mappingName\")]")).toHaveValue(vars["EditedMapName"]);
    // [DISABLED] Verify that the element Individual Selected Company displays text SelectedCompanyName and With Scrollable FALSE
    // await expect(page.locator("//label[text()=\"Select Company/s\"]/..//div[@class=\"pill rounded-pill relative\"]//span")).toContainText(vars["SelectedCompanyName"]);
    // [DISABLED] Verify that the element Execution Type Dropdown New display value ExecutionType and With Scrollable FALSE
    // await expect(page.locator("//label[text()=\"Execution Type\"]/..//select")).toHaveValue(vars["ExecutionType"]);
    // [DISABLED] Verify that the element Map File Name displays text UploadedFileName and With Scrollable FALSE
    // await expect(page.locator("//span[@aria-live=\"polite\"]")).toContainText(vars["UploadedFileName"]);
    // [DISABLED] Verify that the element View Active Version Button is not displayed and With Scrollable FALSE
    // await expect(page.locator("//button[text()[normalize-space() = \"View Active Version\"]]")).toBeVisible();
    // [DISABLED] Verify if Execution Type == Chase_Direct
    // expect(String(testData["Execution Type"])).toBe(vars["Chase_Direct"]);
    // [DISABLED] Wait until the element Spinner is not visible
    // await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//div[@class=\"disabled\"]")).toHaveAttribute('title', "disabled");
    await expect(page.locator("(//input[@type=\"file\"])[1]/..")).toBeVisible();
    // [DISABLED] Verify that the text EditedMapName is not displayed in the element New Map Name Input and With Scrollable FALSE
    // await expect(page.locator("//input[contains(@id,\"mappingName\")]")).not.toContainText(vars["EditedMapName"]);
    await expect(page.locator("//label[text()=\"Execution Type\"]/..//select")).not.toContainText(vars["EditedExecutionType"]);
    await page.locator("//button[text()[normalize-space() = \"View Draft\"]]").click();
    await expect(page.locator("//select[@aria-label=\"Dropdown selection\"]")).toBeVisible();
    await expect(page.locator("//input[contains(@id,\"mappingName\")]")).toBeVisible();
    await expect(page.locator("//span[text()[normalize-space() = \"Map Headers\"]]")).toBeVisible();
    await page.locator("//button[text()[normalize-space() = \"Delete Draft\"]]").click();
    await expect(page.locator(" //div[normalize-space(text())='You have selected to delete this draft map which will be permanently deleted and cannot be recovered. Do you want to proceed?']")).toBeVisible();
    await page.locator("//span[normalize-space(text())='Yes, proceed']").click();
    await page.locator("//button[normalize-space(text())='$|Create New Map|']//..//..//span[text()='ACTIVE']").waitFor({ state: 'visible' });
    await expect(page.locator("//button[normalize-space(text())='$|Create New Map|']//..//..//span[text()='ACTIVE']")).toContainText("ACTIVE");
    await page.locator("//td[@data-title=\"Map Name\"]//button[text()=\" $|Create New Map| \"]").click();
    await page.waitForLoadState('networkidle');
    // [DISABLED] Select option by index 2 in the Dropdown_selection list
    // await page.locator("//select[@aria-label=\"Dropdown selection\"]").selectOption({ index: parseInt("2") });
    // [DISABLED] Store the text of the selected option from Execution Type Dropdown New list into a variable DropDown Value
    // vars["DropDown Value"] = await page.locator("//label[text()=\"Execution Type\"]/..//select").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
    // [DISABLED] Verify that the element Save Draft Button is enabled and With Scrollable FALSE
    // await expect(page.locator("//div[contains(@class, 'container') and contains(@class, 'd-flex')]/div[2]/button[2]")).toBeVisible();
    // [DISABLED] Click on Save Draft Button
    // await page.locator("//div[contains(@class, 'container') and contains(@class, 'd-flex')]/div[2]/button[2]").click();
    // [DISABLED] Verify that the element View Active Version Button is displayed and With Scrollable FALSE
    // await expect(page.locator("//button[text()[normalize-space() = \"View Active Version\"]]")).toBeVisible();
    await page.locator("//span[text()[normalize-space() = \"Map Headers\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await stepGroups.stepGroup_Creating_New_Header_In_Header_Mapping_Screen(page, vars);
    await expect(page.locator("//div[@class=\"gap-2 header-grid-layout custom-header\"]//div[@class=\"flex-grow-1\"]")).toBeVisible();
    await stepGroups.stepGroup_Editing_Header_Mapping(page, vars);
    vars["ChaseFieldNameHeaderMapping"] = await page.locator("//div[text()=\"$|UpdatedBidSampleNameHeaderMapping|\"]/ancestor::div[@class=\"gap-2 header-grid-layout\"]//select").getAttribute('title') || '';
    expect(String(vars["ChaseFieldNameHeaderMapping"])).toBe(vars["UpdatedChaseFieldNameHeaderMapping"]);
    // [DISABLED] Verify that the element Updated BidSample Name displays text UpdatedBidSampleNameHeaderMapping and With Scrollable FALSE
    // await expect(page.locator("//div[text()=\"$|UpdatedBidSampleNameHeaderMapping|\"]/ancestor::div[@class=\"gap-2 header-grid-layout\"]//*[@class=\"flex-grow-1\"]")).toContainText(vars["UpdatedBidSampleNameHeaderMapping"]);
    vars["DeletedHeader[HeaderMapping]"] = await page.locator("(//div[contains(@class,\"gap-2 header-grid-layout\")]//div[@class=\"flex-grow-1\"])[5]").textContent() || '';
    await stepGroups.stepGroup_Delete_a_Header_In_Header_Mapping(page, vars);
    await expect(page.locator("//div[@class=\"gap-2 header-grid-layout\"]//div[text()=\"$|DeletedHeader[HeaderMapping]|\"]")).toBeVisible();
    await page.locator("(//fieldset//input[@type=\"checkbox\"])[1]").check();
    await expect(page.locator("(//fieldset//input[@type=\"checkbox\"])[1]")).toBeVisible();
    // [DISABLED] Verify that the element Header 2 is checked and With Scrollable FALSE
    // await expect(page.locator("(//div[contains(@class,\"gap-2 header-grid-layout\")]//div[@class=\"flex-grow-1\" and text()=\"$|SecondHeaderName|\"])[1]/..//input")).toBeVisible();
    // [DISABLED] Uncheck the checkbox Header 2
    // await page.locator("(//div[contains(@class,\"gap-2 header-grid-layout\")]//div[@class=\"flex-grow-1\" and text()=\"$|SecondHeaderName|\"])[1]/..//input").uncheck();
    // [DISABLED] Verify that the element Bid Sample Field Name is not displayed and With Scrollable FALSE
    // await expect(page.locator("//div[text()='$|chasefieldnames|']")).toBeVisible();
    // [DISABLED] Verify that the element Bid Sample Field Name on Enumeration Mapping is displayed and With Scrollable FALSE
    // await expect(page.locator("//div[text()='$|customheadername|']")).toBeVisible();
    // [DISABLED] Verify that the element Chase Field Name Enumeration Mapping is displayed and With Scrollable FALSE
    // await expect(page.locator("//div[text()='$|customheadername|']//..//..//select[@title=\"$|clmfieldname|\"]")).toBeVisible();
    await page.locator("//div[contains(@class, 'container') and contains(@class, 'd-flex')]/div[2]/button[2]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    vars["fieldscount"] = String(await page.locator("//fieldset//div[@class=\"flex-grow-1\"]").count());
    await expect(page.locator("//button[text()[normalize-space() = \"View Active Version\"]]")).toBeVisible();
    await page.locator("//button[text()[normalize-space() = \"View Active Version\"]]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//fieldset[@disabled]")).toHaveCount(parseInt(vars["fieldscount"]));
    // [DISABLED] Verify that the element Disabled Header Mapping Page is present and With Scrollable FALSE
    // await expect(page.locator("//fieldset[@disabled]")).toBeVisible();
    await expect(page.locator("//div[@class=\"gap-2 header-grid-layout custom-header\"]//div[@class=\"flex-grow-1\"]")).toBeVisible();
    await expect(page.locator("//div[@class=\"gap-2 header-grid-layout\"]//div[text()=\"$|DeletedHeader[HeaderMapping]|\"]")).toBeVisible();
    // [DISABLED] Verify that the text UpdatedBidSampleNameHeaderMapping is not displayed in the element Updated BidSample Name and With Scrollable FALSE
    // await expect(page.locator("//div[text()=\"$|UpdatedBidSampleNameHeaderMapping|\"]/ancestor::div[@class=\"gap-2 header-grid-layout\"]//*[@class=\"flex-grow-1\"]")).not.toContainText(vars["UpdatedBidSampleNameHeaderMapping"]);
    vars["ChaseFieldNameHeaderMapping"] = await page.locator("//div[text()=\"$|UpdatedBidSampleNameHeaderMapping|\"]/ancestor::div[@class=\"gap-2 header-grid-layout\"]//select").getAttribute('title') || '';
    expect(String(vars["ChaseFieldNameHeaderMapping"])).toBe(vars["UpdatedChaseFieldNameHeaderMapping"]);
    await expect(page.locator("(//fieldset//input[@type=\"checkbox\"])[1]")).toBeVisible();
    // [DISABLED] Verify that the element Bid Sample Field Name on Enumeration Mapping is enabled and With Scrollable FALSE
    // await expect(page.locator("//div[text()='$|customheadername|']")).toBeVisible();
    // [DISABLED] Verify that the element Chase Field Name Enumeration Mapping is disabled and With Scrollable FALSE
    // await expect(page.locator("//div[text()='$|customheadername|']//..//..//select[@title=\"$|clmfieldname|\"]")).toBeVisible();
    await page.locator("//button[text()[normalize-space() = \"View Draft\"]]").click();
    // [DISABLED] Verify that the count of elements identified by locator Disabled Headers is 0 and With Scrollable FALSE
    // await expect(page.locator("//fieldset[@disabled]")).toHaveCount(parseInt("0"));
    await expect(page.locator("//fieldset[@disabled]")).toBeVisible();
    await page.locator("//button[text()[normalize-space() = \"Delete Draft\"]]").click();
    await expect(page.locator(" //div[normalize-space(text())='You have selected to delete this draft map which will be permanently deleted and cannot be recovered. Do you want to proceed?']")).toBeVisible();
    await page.locator("//span[normalize-space(text())='Yes, proceed']").click();
    await page.locator("//button[normalize-space(text())='$|Create New Map|']//..//..//span[text()='ACTIVE']").waitFor({ state: 'visible' });
    await expect(page.locator("//button[normalize-space(text())='$|Create New Map|']//..//..//span[text()='ACTIVE']")).toContainText("ACTIVE");
  });
});
