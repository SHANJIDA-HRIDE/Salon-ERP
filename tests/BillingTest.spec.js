const { test, expect } = require('@playwright/test');
const { BillingPage } = require('../pages/BillingPage');
const config = require('../utils/config');

test.describe('Billing All Tests', () => {
  let page, billingPage ;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    billingPage = new BillingPage(page);

  });
  test('Create a new bill with all fields', async () => {
    await billingPage.openBillingPage();
    
    const billingData = config.BillingData();
    
    await billingPage.addNewBill(
      billingData.customerName,
      billingData.customerPhone,
      billingData.billReferenceSelectWalkin,
      billingData.billPaymentMethodSelectBkash,
      billingData.discountTypeSelectPercentage,
      billingData.discountValuePercentage,
      billingData.staffName,
      //billingData.quantity,
      //billingData.unitPrice
    );
  });

}
);