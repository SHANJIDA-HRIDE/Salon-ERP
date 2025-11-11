const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage'); // 👈 import BasePage

class BillingPage extends BasePage { // 👈 EXTEND BasePage
    constructor(page) {
        super(page); // 👈 CALL super() to pass page to BasePage
        this.page = page;
        this.newBillButton = page.locator('button:has-text("New Bill")');
        this.phoneInput = page.locator('#phone');
        this.customerNameInput = page.locator('#customer_name');
        this.referenceDropdown = page.locator('#reference');
        this.billPaymentMethod = page.locator('#billPaymentMethod');
        this.newDiscountTypeSelect = page.locator('form#newBillForm').getByLabel('Discount Type');
        this.newDiscountValueInput = page.locator('#newDiscountValue');    
        this.billNotesInput = page.getByRole('textbox', { name: '' }).getByPlaceholder('Add any additional notes...');
        this.addServiceButton = page.getByRole('button', { name: 'Add Service' });
        this.Service1 = page.locator('xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[2]/form[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]');
        this.Service2 = page.locator('xpath=//body/div[1]/main[1]/div[1]/div[1]/div[1]/div[2]/form[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]');
        
        this.closeBtn = 

        
        this.staffSelect = page.locator('select.form-select.staff-select[name="items[0][staff_id]"]');
        this.quantityInput = page.locator('input.form-control.quantity-input[name="items[0][quantity]"]');
        this.unitPriceInput = page.locator('input.form-control.price-input[name="items[0][unit_price]"]');
        this.taxCheckbox = page.getByRole('checkbox', { name: 'Add Tax (15%)' }); // 🔹 CHANGED: getByRole for checkbox
        this.receiveAmountInput = page.locator('#receiveAmount');
        this.createBillBtn = page.getByRole('button', { name: 'Create Bill' });
    }

    async openBillingPage() {
        await this.goto('/billing');
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

    async addNewBill(phone, customerName, billReference, paymentMethod, discountType, discountValue, notes, staffName, quantity, unitPrice) {
        await this.newBillButton.click();
        await this.phoneInput.fill(phone);
        await this.customerNameInput.fill(customerName);
        await this.referenceDropdown.selectOption(billReference);
        await this.billPaymentMethod.selectOption(paymentMethod);
        //await this.newDiscountTypeSelect.selectOption(discountType);
        //await this.newDiscountValueInput.fill(discountValue); 
        //await this.billNotesInput.fill(notes);
        await this.addServiceButton.click();

        // Select services
        await this.Service1.click();
        //await this.Service2.click();

        // Close the service selection modal
        await this.closeBtn.click();

        // Select staff
        await this.staffSelect.selectOption({ label: staffName }); // 🔹 CHANGED: use { label: staffName } to avoid undefined

        // Fill quantity and unit price
        //await this.quantityInput.fill(quantity);
        //await this.unitPriceInput.fill(unitPrice);

        // Check tax checkbox if visible
        if (await this.taxCheckbox.isVisible()) {
            await this.taxCheckbox.check();
        }

        // Wait for payableAmount to update and capture it
        await this.page.waitForSelector('#payableAmount', { state: 'visible' });
        const payableText = await this.page.locator('#payableAmount').innerText();
        const payableValue = payableText.replace('Tk', '').trim();

        // Fill receive amount with payableValue
        await this.receiveAmountInput.fill(payableValue);

        // Create bill
        await this.createBillBtn.click();
        await this.handleDialog('Bill created successfully!');
    }
}

module.exports = { BillingPage };
