const { chromium } = require('@playwright/test');
const { LoginPage } = require('./pages/LoginPage');
const config = require('./utils/config');

module.exports = async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const loginPage = new LoginPage(page);
  await loginPage.openLoginPage();
  await loginPage.login(config.loginData.validUsername, config.loginData.validPassword);
  await page.waitForLoadState('networkidle'); // Wait for full login

  // Save storage state (cookies, localStorage, etc.)
  await context.storageState({ path: 'auth.json' });

  await browser.close();
};
