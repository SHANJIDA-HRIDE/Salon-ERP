const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage'); // 👈 import BasePage

class StaffPage extends BasePage { // 👈 EXTEND BasePage
    constructor(page) {
        super(page); // 👈 CALL super() to pass page to BasePage
        this.page = page;
        //Add
        this.addNewStaffButton = page.locator('button', { hasText: 'Add New Staff' });
        this.nameInput = page.locator('#staffName');
        this.positionInput = this.page.locator('#staffPosition');
        this.phoneInput = page.locator('#staffPhone');
        this.salaryInput = page.locator('#staffSalary');
        this.commissionRateInput = page.locator('#staffCommission');
        this.emailInput = page.locator('#staffEmail');
        this.addStaffButton = page.locator('button[type="submit"]', { hasText: 'Add Staff' });


        //Edit
        this.editNameInput = page.locator('#editStaffName');
        this.editCommissionRateInput = page.locator('#editStaffCommission');
        this.updateStaffButton = page.locator('button', { hasText: 'Update Staff' });

        //Delete Staff Have Bill
        this.deleteButtonHaveBill = page.locator("button[onclick=\"deleteStaff('11')\"]");



    }

  async openStaffPage() {
    await this.goto('/staff');
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

async addStaff(staffName, position, phone, salary, commission_rate, email) {
  await this.addNewStaffButton.click();
  await this.nameInput.waitFor({ state: 'visible' });
  
  // Fill in the staff details
  await this.nameInput.fill(staffName);
  await this.positionInput.fill(position);
  await this.phoneInput.fill(phone);
  await this.emailInput.fill(email);
  await this.salaryInput.fill(salary);
  await this.commissionRateInput.fill(commission_rate);
  await this.addStaffButton.click();
  await this.handleDialog('Staff member added successfully!');

}
async editLastStaff(newName, commissionRate) {
  const lastRow = this.page.locator('table tbody tr').last();
  const editButton = lastRow.locator('button:has(i.fas.fa-edit)');

  await editButton.click();
  await this.editNameInput.fill(newName);
  await this.editCommissionRateInput.fill(commissionRate);
  await this.updateStaffButton.click();
  await this.handleDialog('Staff member updated successfully!');
  }

async deleteBillHaveStaff() {
  await this.deleteButtonHaveBill.click();
  await this.handleDialog('Are you sure you want to delete this staff member? This action cannot be undone.');
  await this.handleDialog('Error deleting staff: Cannot delete staff member. They have associated bills.');
}

async deleteNoBillLastStaff() {
  const lastRow = this.page.locator('table tbody tr').last();
  const deleteButton = lastRow.locator('button:has(i.fas.fa-trash)');
  await deleteButton.click();
  await this.handleDialog('Are you sure you want to delete this staff member? This action cannot be undone.');
  await this.handleDialog('Staff member deleted successfully!');
}

}

module.exports = { StaffPage };
