const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage'); // 👈 import BasePage

class ServicePackagePage extends BasePage { // 👈 EXTEND BasePage
    constructor(page) {
        super(page); // 👈 CALL super() to pass page to BasePage
        this.page = page;

        // Add Service
        this.addNewServiceButton = page.locator('button', { hasText: 'Add New Service' });
        this.serviceNameInput = page.locator('#serviceName');
        this.servicePriceInput = page.locator('#servicePrice');
        this.serviceDurationInput = page.locator('#serviceDuration');
        this.addServiceButton = page.locator('button[type="submit"]', { hasText: 'Add Service' });
        this.serviceDescriptionInput = page.locator('#serviceDescription');

        // Edit Service
        this.editServiceNameInput = page.locator('#editServiceName');
        this.editServicePriceInput = page.locator('#editServicePrice');
        this.editServiceDurationInput = page.locator('#editServiceDuration');
        this.editServiceDescriptionInput = page.locator('#editServiceDescription');
        this.updateServiceButton = page.locator('button', { hasText: 'Update Service' });

        // Delete Service (Have Bill) - You can keep if specific ID needed
        this.deleteButtonHaveBill = page.locator("button[onclick=\"deleteService('1')\"]");


        // Add Package
        this.addNewPackageButton = page.locator('button', { hasText: 'Add New Package' });
        this.packageNameInput = page.locator('#package_name');
        this.serviceNameSearch = page.locator('#service_name');
        this.serviceDurationInput = page.locator('#serviceDuration');
        this.addServiceButton = page.locator('#addBtn');
        this.quantityInput = page.locator('input[type="number"][onchange^="update"][name="qty"], input[type="number"][onchange^="update"]');
        this.savePackageButton = page.locator('#savePackageBtn');



    }

    async openServicesPage() {
        await this.goto('/services');
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

    async addService(serviceName, servicePrice, serviceDuration, serviceDescription) {
        await this.addNewServiceButton.click();
        await this.serviceNameInput.waitFor({ state: 'visible' });

        // Fill in the service details
        await this.serviceNameInput.fill(serviceName);
        await this.servicePriceInput.fill(servicePrice);
        await this.serviceDurationInput.fill(serviceDuration);
        await this.serviceDescriptionInput.fill(serviceDescription);
        await this.addServiceButton.click();
        await this.handleDialog('Service added successfully!');
    }

    async editLastService(newName, newPrice) {
        // Scope to the first table (Services table)
        const serviceTable = this.page.locator('table').first();
        const lastRow = serviceTable.locator('tbody tr').last();
        const editButton = lastRow.locator('button:has(i.fas.fa-edit)');

        await editButton.click();

        await this.editServiceNameInput.fill(newName);
        await this.editServicePriceInput.fill(newPrice);
        await this.updateServiceButton.click();
        await this.handleDialog('Service updated successfully!');
    }

    async deleteNoBillLastService() {
        // Scope to the first table (Services table)
        const serviceTable = this.page.locator('table').first();
        const lastRow = serviceTable.locator('tbody tr').last();
        const deleteButton = lastRow.locator('button:has(i.fas.fa-trash)');

        await deleteButton.click();
        await this.handleDialog('Are you sure you want to delete this service? This action cannot be undone.');
        await this.handleDialog('Service deleted successfully.');
    }

    async deleteServiceHaveBill() {
        await this.deleteButtonHaveBill.click();
        await this.handleDialog('Are you sure you want to delete this service? This action cannot be undone.');
        await this.handleDialog('Cannot delete: This service is associated with a bill.');
    }

async addNewPackage(packageName, serviceName, serviceDuration, quantity) {
    await this.addNewPackageButton.click();
    await this.packageNameInput.waitFor({ state: 'visible' });

    // Fill in the package details
    await this.packageNameInput.fill(packageName);

    // Search and select the service from autocomplete
    await this.serviceNameSearch.fill(serviceName);
    // Wait for the dropdown option to appear and click it
    const dropdownOption = this.page.locator('.ui-autocomplete li', { hasText: serviceName }).first();
    await dropdownOption.waitFor({ state: 'visible', timeout: 5000 });
    await dropdownOption.click();

    await this.serviceDurationInput.fill(serviceDuration);
    await this.quantityInput.fill(quantity);
    await this.addServiceButton.click();
    await this.savePackageButton.click();
    await this.handleDialog('Package saved successfully!');
}

}

module.exports = { ServicePackagePage };