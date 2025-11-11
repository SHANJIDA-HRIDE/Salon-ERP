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
    
    await billingPage.createBillWithService(
      billingData.customerName,
      billingData.customerPhone,
      billingData.billPaymentMethodSelectCard,
      billingData.serviceNameSearch,
      //billingData.staffName,
    );
  });

}
);




