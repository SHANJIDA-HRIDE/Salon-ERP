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
