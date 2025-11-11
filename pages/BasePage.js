class BasePage {
  constructor(page) {
    this.page = page;
    this.baseURL = 'https://so-dev.evexia-global.com'; 
  }

  async goto(path = '') {
    await this.page.goto(this.baseURL + path);
  }


  async screenshot(name = 'screenshot') {
    await this.page.screenshot({ path: `${name}.png` });
  }
}

module.exports = { BasePage };
