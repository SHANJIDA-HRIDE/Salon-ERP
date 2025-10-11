const { BasePage } = require('./BasePage');

class CustomerPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // Add Customer
    this.addNewCustomerButton = page.getByRole('button', { name: 'Add New Customer' });
    this.customerNameInput = page.locator('#customerName');
    this.phoneInput = page.locator('#customerPhone');
    this.emailInput = page.locator('#customerEmail');
    this.addCustomerButton = page.getByRole('button', { name: 'Add Customer' });

    // Edit Customer
    this.editNameInput = page.locator('#editCustomerName');
    this.editPhoneInput = page.locator('#editCustomerPhone');
    this.updateCustomerButton = page.getByRole('button', { name: 'Update Customer' });

    // Delete Customer
    this.deleteButtonHaveBill = page.locator("button[onclick=\"deleteCustomer('4')\"]");
  }

  async openCustomerPage() {
    await this.goto('/customers');
  }

  async handleDialog(expectedMessage, action = 'accept') {
    this.page.once('dialog', async dialog => {
      console.log('Dialog message:', dialog.message());
      if (dialog.message() === expectedMessage) {
        await dialog[action]();
      } else {
        await dialog.dismiss();
      }
    });
  }

  async addCustomer(name, phone, email) {
    await this.addNewCustomerButton.click();
    await this.customerNameInput.waitFor({ state: 'visible' });

    await this.customerNameInput.fill(name);
    await this.phoneInput.fill(phone);
    await this.emailInput.fill(email);

    await this.handleDialog('Customer added successfully!');
    await this.addCustomerButton.click();
  }

  async editLastCustomer(newName, newPhone) {
        const lastRow = this.page.locator('table tbody tr').last();
        const editButton = lastRow.locator('button:has(i.fas.fa-edit)');

        await editButton.click();
        await this.editNameInput.fill(newName);
        await this.editPhoneInput.fill(newPhone);

    await this.handleDialog('Customer updated successfully!');
    await this.updateCustomerButton.click();
  }

  async deleteCustomerHaveBill() {
    await this.deleteButtonHaveBill.click();
    await this.handleDialog('Are you sure you want to delete this customer? This action cannot be undone.');
    await this.handleDialog('Error deleting customer: Cannot delete customer. They have associated bills.');
  }

async deleteNoBillLastCustomer() {
        const lastRow = this.page.locator('table tbody tr').last();
        const deleteButton = lastRow.locator('button:has(i.fas.fa-trash)');

        await deleteButton.click();

    await this.handleDialog('Are you sure you want to delete this customer? This action cannot be undone.');
    await this.handleDialog('Customer deleted successfully!');
  }
}

module.exports = { CustomerPage };
