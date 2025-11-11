const { test, expect } = require('@playwright/test');
const { CustomerPage } = require('../pages/CustomerPage');
const config = require('../utils/config');

test.describe('Customer All Tests', () => {
  let page, customerPage ;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    customerPage = new CustomerPage(page);

  });

  /*test('Add New Customer with Valid Data', async () => {
    const member = config.CustomerData(); 
    await customerPage.openCustomerPage();
    await customerPage.addCustomer(
        member.name,
        member.phone,
        member.email
    );
  
});


  test('Edit Customer with Valid Data', async () => {
    const member = config.CustomerData(); 
    await customerPage.openCustomerPage();
    await customerPage.editLastCustomer(   
        member.name,
        member.phone
    );
});

  test('Try to delete a Customer with Bill', async () => {
    await customerPage.openCustomerPage();
    await customerPage.deleteCustomerHaveBill();
  });

  test('Try to delete a Customer with No Bill', async () => {
    await customerPage.openCustomerPage();
    await customerPage.deleteNoBillLastCustomer();
  });*/

}

);
