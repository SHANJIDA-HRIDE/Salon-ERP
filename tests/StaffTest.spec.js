const { test, expect } = require('@playwright/test');
const { StaffPage } = require('../pages/StaffPage');
const config = require('../utils/config');

test.describe('Staff All Tests', () => {
  let page, staffPage ;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    staffPage = new StaffPage(page);

  });

  /*test('Add New Staff with Valid Data', async () => {
    const member = config.StaffData(); 
    console.log(member);
    await staffPage.openStaffPage();
    await staffPage.addStaff(   
        member.name,
        member.position,
        member.phone,
        member.salary,
        member.commission_rate,
        member.email
    );
});


  test('Edit Staff with Valid Data', async () => {
    const member = config.StaffData(); 
    await staffPage.openStaffPage();
    await staffPage.editLastStaff(   
        member.name,
        member.commission_rate,
    );
});

test('Try to delete a Staff with Bill', async () => {
  await staffPage.openStaffPage();
  await staffPage.deleteBillHaveStaff();
});

test('Try to delete a Staff with No Bill', async () => {
  await staffPage.openStaffPage();
  await staffPage.deleteNoBillLastStaff();
});


*/



});
