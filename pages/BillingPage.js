const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class BillingPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;

        // Main buttons
        this.newBillButton = page.getByRole('button', { name: 'New Bill' });

        // Bill form inputs
        this.phoneInput = page.locator('#phone');
        this.customerNameInput = page.locator('#customer_name');
        this.referenceDropdown = page.locator('#reference');
        this.billPaymentMethod = page.locator('#billPaymentMethod');
        this.newDiscountTypeSelect = page.locator('#newDiscountType');
        this.newDiscountValueInput = page.locator('#newDiscountValue');
        this.billNotesInput = page.locator('#billNotes');

        // Service selection
        this.addServiceButton = page.getByRole('button', { name: 'Add Service' });
        this.serviceSearchInput = page.locator('#serviceSearchInput');
        this.addSelectedButton = page.getByRole('button', { name: 'Add Selected' });
        this.closeServiceModalButton = page.locator('button[aria-label="Close"]').first();

        // Service checkbox (dynamic)
        this.serviceCheckbox = (serviceName) =>
            page.locator('.service-item', { hasText: serviceName }).locator('input[type="checkbox"]');

        // Bill items (dynamic selectors)
        this.staffSelect = (serviceName) =>
            page.locator('.bill-item', { hasText: serviceName }).locator('select.staff-select');

        this.quantityInput = page.locator('input.quantity-input[name="items[0][quantity]"]');
        this.taxCheckbox = page.getByRole('checkbox', { name: /Tax|tax/ });
        this.removeServiceButton = (serviceName) =>
            page.locator('.bill-item', { hasText: serviceName }).locator('button').last();

        // Payment section
        this.receiveAmountInput = page.locator('#receiveAmount');
        this.payableAmountDisplay = page.locator('#payableAmount');
        this.createBillBtn = page.getByRole('button', { name: 'Create Bill' });
    }

    async openBillingPage() {
        await this.goto('/billing');
    }

    async createBillWithService(phone, customerName, paymentMethod, serviceName, staffValue = '14') {
        // Click "New Bill" button
        await this.newBillButton.click();
        await this.phoneInput.waitFor({ state: 'visible' });

        // Fill customer details
        await this.phoneInput.fill(phone);
        await this.customerNameInput.fill(customerName);

        // Select payment method
        await this.billPaymentMethod.selectOption(paymentMethod);

        // Add service
        await this.addServiceButton.click();
        await this.page.waitForTimeout(500); // Wait for modal

        // Search for service
        await this.serviceSearchInput.fill(serviceName);
        await this.page.waitForTimeout(500); // Wait for results

        // Check the matching service
        const checkbox = this.serviceCheckbox(serviceName);
        await checkbox.check();

        // Add selected service
        await this.addSelectedButton.click();
        await this.page.waitForTimeout(1000); // Wait for modal close

        // ✅ Select staff dynamically (specific service row)
        const staffDropdown = this.staffSelect(serviceName);
        await staffDropdown.waitFor({ state: 'visible' });

        // Prefer using `value` since it's stable (Dimond Sangma → value: '14')
        await staffDropdown.selectOption({ value: staffValue });

        // Fill payable/receive amount
        const payableText = await this.payableAmountDisplay.innerText();
        const payableValue = payableText.replace(/[^\d.]/g, '');
        await this.receiveAmountInput.fill(payableValue);

        // Create bill
        await this.createBillBtn.click();
        await this.page.waitForTimeout(1000); // Wait for confirmation
    }

  // ============================================
  // Scenario 2.2: Add Multiple Services to Bill
  // ============================================

async addMultipleServices(paymentMethod, serviceNames) {
    await this.newBillButton.click();
    await this.billPaymentMethod.selectOption(paymentMethod);

    // Add each service
    for (const serviceName of serviceNames) {
      await this.addServiceButton.click();
      await this.page.waitForTimeout(500);
      await this.serviceSearchInput.fill(serviceName);
      await this.page.waitForTimeout(500);
      const checkbox = this.serviceCheckbox(serviceName);
      await checkbox.check();
      await this.addSelectedButton.click();
      await this.page.waitForTimeout(1000);
    }

  }


// ============================================
  // Scenario 2.3: Service Search Functionality
  // ============================================
  async testServiceSearch(partialName, exactName) {
    await this.newBillButton.click();

    // Test partial search
    await this.addServiceButton.click();
    await this.page.waitForTimeout(500);
    await this.serviceSearchInput.fill(partialName);
    await this.page.waitForTimeout(500);

    // Verify partial search returns results
    const searchResults = this.page.locator('.service-item');
    await expect(searchResults).toHaveCount(await searchResults.count());

    // Clear and test exact search
    await this.serviceSearchInput.clear();
    await this.serviceSearchInput.fill(exactName);
    await this.page.waitForTimeout(500);

    // Verify exact match
    await expect(this.page.locator('.service-item', { hasText: exactName })).toBeVisible();
  }


 // ============================================
  // Scenario 2.4: Remove Service from Bill
  // ============================================
  async removeServiceFromBill(serviceName) {
    await this.newBillButton.click();
    // Add service
    await this.addServiceButton.click();
    await this.page.waitForTimeout(500);
    await this.serviceSearchInput.fill(serviceName);
    await this.page.waitForTimeout(500); // Wait for results

        // Check the matching service
        const checkbox = this.serviceCheckbox(serviceName);
        await checkbox.check();

        // Add selected service
        await this.addSelectedButton.click();
        await this.page.waitForTimeout(1000); // Wait for modal close

    // Verify service is added
    await expect(this.page.locator('.bill-item', { hasText: serviceName })).toBeVisible();

    // Remove service
    const removeButton = this.removeServiceButton(serviceName);
    await removeButton.click();
    await this.page.waitForTimeout(500);

    // Verify service is removed
    await expect(this.page.locator('.bill-item', { hasText: serviceName })).not.toBeVisible();
  }


 // ============================================
  // Scenario 3.1: Create Bill with Different Payment Methods
  // ============================================
  async createBillWithPaymentMethodCash(serviceName, paymentMethod, staffValue) {
    await this.newBillButton.click();
    await this.phoneInput.waitFor({ state: 'visible' });

    // Select payment method FIRST (required for form validation)
    await this.billPaymentMethod.selectOption(paymentMethod);
    await this.page.waitForTimeout(500);

    // Add service
    await this.addServiceButton.click();
    await this.page.waitForTimeout(500);
    await this.serviceSearchInput.fill(serviceName);
    await this.page.waitForTimeout(800); // Wait longer for search results

    // Click on service item (custom JS handler) instead of checkbox
    const serviceItem = this.page.locator('.service-item', { hasText: serviceName });
    await serviceItem.click();
    await this.page.waitForTimeout(300);

    // Click "Add Selected" button
    await this.addSelectedButton.click();
    await this.page.waitForTimeout(2000); // Wait longer for modal to close

    // Select staff
    const staffDropdown = this.staffSelect(serviceName);
    await staffDropdown.waitFor({ state: 'visible' });
    await staffDropdown.selectOption({ value: staffValue });

    // Fill receive amount (add 10 taka buffer, remove decimals)
    const payableText = await this.payableAmountDisplay.innerText();
    const payableValue = payableText.replace(/[$€£৳₹,]/g, '').trim();
    const receiveAmount = (parseFloat(payableValue) + 10).toString().split('.')[0]; // Add 10, remove decimals
    console.log('Payable:', payableValue, 'Receive:', receiveAmount);
    await this.receiveAmountInput.fill(receiveAmount);

    // Add a note before creating bill
    await this.billNotesInput.fill('Test bill created via automation');
    await this.page.waitForTimeout(500);

    // Create bill
    await this.createBillBtn.click();
    await this.page.waitForTimeout(1000);
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
}

module.exports = { BillingPage };