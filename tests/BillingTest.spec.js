const { test, expect } = require('@playwright/test');
const { BillingPage } = require('../pages/BillingPage');
const config = require('../utils/config');

test.describe('Billing All Tests', () => {
  let page, billingPage ;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    billingPage = new BillingPage(page);

  });
  /*test('1.1 Create Bill with All Required Fields', async () => {
    await billingPage.openBillingPage();
    const billingData = config.BillingData();
    await billingPage.createBillWithService(
      billingData.customerName,
      billingData.customerPhone,
      billingData.billPaymentMethodSelectCard,
      billingData.serviceNameSearch,
      console.log('✅ Bill created with all required fields');
    );
  });




test('2.2 Add Multiple Services to Bill with Different Staff', async () => {
    const billingData = config.BillingData();
    await billingPage.openBillingPage();
    await billingPage.addMultipleServices(
    billingData.billPaymentMethodSelectCard,
    [billingData.serviceNameSearch, billingData.serviceName2]
    );

      console.log('✅ Multiple services added successfully');});
}
);



  test('2.3 Service Search Functionality', async () => {
    const billingData = config.BillingData();
    await billingPage.openBillingPage();
    await billingPage.testServiceSearch('Hair', billingData.serviceNameSearch);
    console.log('✅ Service search working correctly');
  });



test('2.4 Remove Service from Bill', async () => {
    const billingData = config.BillingData();
    await billingPage.openBillingPage();
    await billingPage.removeServiceFromBill(
      billingData.serviceNameSearch,
    );

    console.log('✅ Service removed successfully');
  });
*/

test('3.1 Create Bill with Cash Payment', async () => {
    const billingData = config.BillingData();
    await billingPage.openBillingPage();

    await billingPage.createBillWithPaymentMethodCash(
      billingData.serviceNameSearch,
      billingData.billPaymentMethodSelectCash,
      billingData.staffValue
    );

    console.log('✅ Bill created with Cash payment method');
  });



});