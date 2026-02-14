import { Page, Locator } from '@playwright/test';

export async function waitForSpinnerToDisappear(page: Page, timeout = 30_000): Promise<void> {
  const spinner = page.locator('//div[contains(@class,"spinner")]');
  await spinner.waitFor({ state: 'hidden', timeout }).catch(() => {});
}

export async function waitForPageLoad(page: Page, timeout = 60_000): Promise<void> {
  await page.waitForLoadState('networkidle', { timeout }).catch(() => {});
}

export async function waitForElementVisible(locator: Locator, timeout = 30_000): Promise<void> {
  await locator.waitFor({ state: 'visible', timeout });
}

export async function waitForElementHidden(locator: Locator, timeout = 30_000): Promise<void> {
  await locator.waitFor({ state: 'hidden', timeout });
}
