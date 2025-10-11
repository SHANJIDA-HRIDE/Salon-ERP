import { defineConfig } from '@playwright/test';

export default defineConfig({
  globalSetup: './global-setup.js', // 👈 Add this line

  use: {
    storageState: 'auth.json',     // 👈 Use the saved login session
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
  },

  reporter: [['html', { outputFolder: 'playwright-report' }]],
});
