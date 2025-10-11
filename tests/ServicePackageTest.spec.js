const { test, expect } = require('@playwright/test');
const { ServicePackagePage } = require('../pages/ServicePackagePage');
const config = require('../utils/config');

test.describe('Service & Package All Tests', () => {
  let page, servicePackagePage ;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    servicePackagePage = new ServicePackagePage(page);
});

  /*test('Add New Service with Valid Data', async () => {
    const service = config.ServicePackageData(); 
    await servicePackagePage.openServicesPage();
    await servicePackagePage.addService(
        service.serviceName,
        service.price,
        service.serviceDuration,
        service.description
    );
  });

  test('Edit Service with Valid Data', async () => {
    const service = config.ServicePackageData(); 
    await servicePackagePage.openServicesPage();
    await servicePackagePage.editLastService(   
        service.serviceName,
        service.price
    );
  });

    test('Try to delete a Service with No Bill', async () => {
    await servicePackagePage.openServicesPage();
    await servicePackagePage.deleteNoBillLastService();
  });

  test('Try to delete a Service with Bill', async () => {
    await servicePackagePage.openServicesPage();
    await servicePackagePage.deleteServiceHaveBill();
  });*/

 




}
);
