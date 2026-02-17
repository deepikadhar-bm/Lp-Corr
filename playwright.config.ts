import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';


dotenv.config({ path: path.resolve(__dirname, '.env') });


export default defineConfig({
  testDir: './tests',
  testIgnore: ['**/__MACOSX/**', '**/./**'],
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],
  timeout: 120_000,
  expect: {
    timeout: 15_000,
  },
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on',
    actionTimeout: 30_000,
    navigationTimeout: 60_000,
    
  },
  projects: [
    {
      name: 'correspondant',
      testDir: './tests/correspondant',
      use: {
        ...devices['Desktop Chrome'],
      viewport: { width: 2560, height: 1440 }, // override here
      deviceScaleFactor: 1,
      baseURL: process.env.CORR_QA_URL || 'https://ext-qa.lpcorrtest.com/cp/',
      },
    },
  ],
  
});
