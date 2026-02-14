import { test, expect } from '@playwright/test';
import path from 'path';
import * as stepGroups from '../../../src/helpers/step-groups';

test.describe('REG_Bid Maps', () => {
  let vars: Record<string, string> = {};

  test.beforeEach(async () => {
    vars = {};
  });

  test('REG_TS10_TC01_Verify that when the user applies filters by selecting an enum from the dropdown, only those corresponding enum records should be displayed, and the values will be displayed based on the', async ({ page }) => {
    const testData: Record<string, string> = {}; // TODO: Load from test data profile

    await stepGroups.stepGroup_Login_to_CORR_Portal(page, vars);
    await stepGroups.stepGroup_Smart_Mapper_from_Off_to_On(page, vars);
    await stepGroups.stepGroup_Creation_Of_Bid_Map_Upto_Header_Mapping(page, vars);
    await stepGroups.stepGroup_Fetching_Enum_From_Header_Mapping_Screen_and_Verifying_the_S(page, vars);
    await page.locator("//span[text()='Enumeration Mapping']").click();
    await expect(page.locator("//p[text()[normalize-space() = \"You have unidentified fields do you want to proceed further.\"]]")).toBeVisible();
    await page.locator("(//button[@type=\"button\"])[last()]").click();
    await page.locator("//span[contains(@class,'circle')]").waitFor({ state: 'hidden' });
    await expect(page.locator("//span[text()[normalize-space() = \"Rules and Actions\"]]")).toBeVisible();
    vars["count"] = "1";
    // [DISABLED] Store the count of elements identified by locator UnIdentified Fields into a variable Unidentified Count
    // vars["Unidentified Count"] = String(await page.locator("//div[@class=\"mb-2\"]//select[@title=\"\"]").count());
    await page.locator("//select[contains(normalize-space(),\"Select Show All Enumerations Show Unidentified Enumerations (0) Show Unused Enumerations\")]").selectOption({ label: testData["Unidentified Enumerations"] });
    vars["BidSampleCount"] = String(await page.locator("//div[@class=\"mapping-card rounded-3 unchecked\"]//div[@class='col-2' ]//div[not(@class=\"my-2\")]").count());
    while (parseFloat(String(vars["count"])) <= parseFloat(String(vars["BidSampleCount"]))) {
      vars["IndividualBidSample"] = await page.locator("((//div[@class=\"mapping-card rounded-3 unchecked\"]//div[@class=\"col-2\"][1])//div)[$|count|]").textContent() || '';
      vars["UnidentifiedChaseValueCount"] = String(await page.locator("//div[text()=\"$|IndividualBidSample|\"]/ancestor::div[@class=\"mapping-card rounded-3 unchecked\"]//div[@class=\"field-pair col-3\"]//*[@title=\"\" or @title=\"[object Object]\"]").count());
      expect(String(vars["UnidentifiedChaseValueCount"])).toBe("1");
      vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    // [DISABLED] Verify that the selected option from multiple dropdown UnIdentified Fields , located using the same xpath , contains the Select .
    // expect(await page.locator("//div[@class=\"mb-2\"]//select[@title=\"\"]").textContent() || '').toContain(String("Select"));
    while (true) /* Verify if count <= Unidentified Count */ {
      // [DISABLED] Store the text of the selected option from Individual Unidentified Field list into a variable Filledfields
      // vars["Filledfields"] = await page.locator("(//div[contains(@class,\"col-2\")]/../..//select)[$|count|]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
      // [DISABLED] Verify that the Individual Unidentified Field list has option with text Select selected and With Scrollable FALSE
      // await expect(page.locator("(//div[contains(@class,\"col-2\")]/../..//select)[$|count|]")).toHaveValue("Select");
      // [DISABLED] Perform addition on 1 and count and store the result inside a count considering 0 decimal places
      // vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    // [DISABLED] Select option using value Show All Enumerations in the Dropdown: Show All Enumerations Show Unidentified Enum list
    // await page.locator("//select[contains(normalize-space(),\"Select Show All Enumerations Show Unidentified Enumerations (0) Show Unused Enumerations\")]").selectOption({ label: testData["Show All Enumerations"] });
    // [DISABLED] Store Number :: Random Number[Integer] in Number
    // vars["Number"] = String(Math.floor(Math.random() * (4 - 1 + 1)) + 1);
    // [DISABLED] Select option by index 1 in the Attachment Type for Unidentified list
    // await page.locator("(//div[text()='Attachment Type']/../..//select[@id=\"id\"])[$|count|]").selectOption({ index: parseInt("1") });
    // [DISABLED] Store 1 in count
    // vars["count"] = "1";
    // [DISABLED] Store the count of elements identified by locator Attachment Type in Enumeration Mapping into a variable AttachmentType in EnumerationMapping All field
    // vars["AttachmentType in EnumerationMapping All field"] = String(await page.locator("(//div[text()='Attachment Type']/../..//select[@id=\"id\"])").count());
    // [DISABLED] Select option using value Unidentified Enumerations in the Dropdown: Show All Enumerations Show Unidentified Enum list
    // await page.locator("//select[contains(normalize-space(),\"Select Show All Enumerations Show Unidentified Enumerations (0) Show Unused Enumerations\")]").selectOption({ label: testData["Unidentified Enumerations"] });
    while (true) /* Verify if count <= AttachmentType in EnumerationMapping All  */ {
      // [DISABLED] Store the text of the selected option from Attachment Type for Unidentified list into a variable Filledfields
      // vars["Filledfields"] = await page.locator("(//div[text()='Attachment Type']/../..//select[@id=\"id\"])[$|count|]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
      if (true) /* Verify if Filledfields == Select */ {
        // [DISABLED] Verify that the Attachment Type for Unidentified list has option with text Select selected and With Scrollable FALSE
        // await expect(page.locator("(//div[text()='Attachment Type']/../..//select[@id=\"id\"])[$|count|]")).toHaveValue("Select");
      } else if (true) /* Verify if Filledfields != Select */ {
        // [DISABLED] Store the text of the selected option from Attachment Type for Unidentified list into a variable ChaseValue
        // vars["ChaseValue"] = await page.locator("(//div[text()='Attachment Type']/../..//select[@id=\"id\"])[$|count|]").evaluate(el => { const s = el as HTMLSelectElement; return s.options[s.selectedIndex]?.text || ''; });
        // [DISABLED] Verify that the Attachment Type for Unidentified list has option with text ChaseValue selected and With Scrollable FALSE
        // await expect(page.locator("(//div[text()='Attachment Type']/../..//select[@id=\"id\"])[$|count|]")).toHaveValue(vars["ChaseValue"]);
      }
      // [DISABLED] Perform addition on 1 and count and store the result inside a count considering 0 decimal places
      // vars["count"] = (parseFloat(String("1")) + parseFloat(String(vars["count"]))).toFixed(0);
    }
    // [DISABLED] Store the count of elements identified by locator Attachment Type field have selected Count into a variable Attachment Type field have select option Count
    // vars["Attachment Type field have select option Count"] = String(await page.locator("//div[text()='Attachment Type']/../..//select[@title=\"\"]").count());
    // [DISABLED] Verify if Attachment Type field have select option Count != AttachmentType in EnumerationMapping All field
    // expect(String(vars["Attachment Type field have select option Count"])).toBe(vars["AttachmentType in EnumerationMapping All field"]);
    vars["BidFieldName"] = await page.locator("((//div[@class=\"mapping-card rounded-3 unchecked\"])[1]//*[@class=\"col-2\"])[1]//div").textContent() || '';
    await page.locator("//div[text()=\"$|BidFieldName|\"]/ancestor::div[@class=\"mapping-card rounded-3 unchecked\"]//input[@type=\"checkbox\"]").check();
    await page.locator("//*[@aria-label=\"Enumeration Status Dropdown\"]//select").selectOption({ label: testData["Unused Enumerations"] });
    await expect(page.getByText(vars["BidFieldName"])).not.toBeVisible();
    await page.locator("//button[@id='multiSelectDropDown']").click();
    await page.locator("//input[@type=\"checkbox\"]/..//input[@class=\"mr-2 cursor-pointer\"]").check();
    await expect(page.locator("//button[contains(text(),\" Apply Selected \")]")).toBeVisible();
    await page.locator("//input[@type=\"checkbox\"]/..//input[@class=\"mr-2 cursor-pointer\"]").uncheck();
    await expect(page.locator("//button[contains(text(),\" Apply Selected \")]")).toBeVisible();
    vars["CountOfBidFields"] = String(await page.locator("(//*[@aria-label=\"Filter Enumeration Dropdown\"]//*[@class=\"dropdown-item d-flex\"]//input[@type=\"checkbox\"])").count());
    vars["FirstBidField"] = await page.locator("(//*[@aria-label=\"Filter Enumeration Dropdown\"]//input[@type=\"checkbox\"])[2]/..//span").textContent() || '';
    await page.locator("//*[@aria-label=\"Filter Enumeration Dropdown\"]//input[@type=\"text\"]").fill(vars["FirstBidField"]);
    await expect(page.locator("//label[@class=\"dropdown-item d-flex\"]//*[@title=\"$|FirstBidField|\"]")).toBeVisible();
    await page.locator("//button[@class=\"search-cancel-btn btn\"]").click();
    await expect(page.locator("//*[@aria-label=\"Filter Enumeration Dropdown\"]//input[@type=\"text\"]")).toHaveValue('');
    await expect(page.locator("(//*[@aria-label=\"Filter Enumeration Dropdown\"]//*[@class=\"dropdown-item d-flex\"]//input[@type=\"checkbox\"])")).toHaveCount(parseInt(vars["CountOfBidFields"]));
    vars["checkbox count"] = String(await page.locator("(//*[@aria-label=\"Filter Enumeration Dropdown\"]//*[@class=\"dropdown-item d-flex\"]//input[@type=\"checkbox\"])").count());
    await page.locator("(//*[@aria-label=\"Filter Enumeration Dropdown\"]//*[@class=\"dropdown-item d-flex\"]//input[@type=\"checkbox\"])[1]").check();
    await page.waitForTimeout(2000);
    await page.locator("(//*[@aria-label=\"Filter Enumeration Dropdown\"]//*[@class=\"dropdown-item d-flex\"]//input[@type=\"checkbox\"])[1]").check();
    await page.locator("//div[@class=\"filter-sort\" and text()=\" Show Selected \"]").click();
    await expect(page.locator("//div[@class=\"filter-sort\" and text()=\" Show Selected \"]")).toBeVisible();
    await expect(page.locator("//div[@class=\"dropdown-overflow\"]//input")).toBeVisible();
    vars["SelectedBidInFilterEnum"] = String(await page.locator("//div[@class=\"dropdown-overflow\"]//input").count());
    expect(String(vars["SelectedBidInFilterEnum"])).toBe("2");
    await page.locator("(//*[@class=\"dropdown-item d-flex checked\"]//input)[1]").uncheck();
    await page.waitForTimeout(2000);
    await page.locator("(//*[@class=\"dropdown-item d-flex checked\"]//input)[1]").uncheck();
    await page.locator("//div[@class=\"filter-sort\" and text()=\" Show All \"]").click();
    await expect(page.locator("//div[@class=\"filter-sort\" and text()=\" Show All \"]")).toBeVisible();
    await expect(page.getByText("Select All")).toBeVisible();
    vars["count"] = String(await page.locator("//*[@aria-label=\"Filter Enumeration Dropdown\"]//*[@class=\"dropdown-overflow\"]//input").count());
    expect(String(vars["checkbox count"])).toBe(vars["count"]);
    await page.locator("(//*[@aria-label=\"Filter Enumeration Dropdown\"]//input[@type=\"checkbox\"])[2]").check();
    vars["FirstBidFieldName"] = await page.locator("(//*[@aria-label=\"Filter Enumeration Dropdown\"]//input[@type=\"checkbox\"])[2]/..//span").textContent() || '';
    vars["FirstBidFieldName"] = String(vars["FirstBidFieldName"]).split("/")["1"] || '';
    await page.locator("(//*[@aria-label=\"Filter Enumeration Dropdown\"]//input[@type=\"checkbox\"])[4]").check();
    vars["SecondBidFieldName"] = await page.locator("(//*[@aria-label=\"Filter Enumeration Dropdown\"]//input[@type=\"checkbox\"])[4]/..//span").textContent() || '';
    vars["SecondBidFieldName"] = String(vars["SecondBidFieldName"]).split("/")["1"] || '';
    await page.locator("//button[contains(text(),\" Apply Selected \")]").click();
    await expect(page.locator("//div[contains(@class,\"mapping-card rounded-3\")]")).toBeVisible();
    vars["count1"] = String(await page.locator("//div[contains(@class,\"mapping-card rounded-3\")]").count());
    expect(String(vars["count1"])).toBe("2");
    await expect(page.locator("(//div[@class='col-2']//div)[1]")).toContainText(vars["FirstBidFieldName"]);
    await expect(page.locator("(//div[@class='col-2']//div)[3]")).toContainText(vars["SecondBidFieldName"]);
  });
});
