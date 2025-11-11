const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage'); // 👈 import BasePage

class LoginPage extends BasePage { // 👈 EXTEND BasePage
    constructor(page) {
        super(page); // 👈 CALL super() to pass page to BasePage
        this.page = page;

    this.usernameInput = page.locator('input[name="login"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button:has-text("Log in")');
    this.dashboardHeading = page.locator('h2:has-text("Dashboard")');

    }

  async openLoginPage() {
    await this.goto('/login');
  }

async login(username, password) {
  // Wait for email/username field to be visible before interacting
  await this.usernameInput.waitFor({ state: 'visible' });
  await this.usernameInput.fill(username);
  // Wait for password field to be visible
  await this.passwordInput.waitFor({ state: 'visible' });
  await this.passwordInput.fill(password);
  await this.loginButton.click();
  //await expect(this.dashboardHeading).toBeVisible();
}

}

module.exports = { LoginPage };
