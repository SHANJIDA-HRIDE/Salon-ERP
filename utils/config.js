function generateRandomEmail() {
  const timestamp = Date.now();
  return `user${timestamp}@example.com`;
}

function generateRandomName() {
  const firstNames = ['Shanjida', 'Ayesha', 'Tania', 'Nusrat', 'Fatima'];
  const lastNames = ['Hride', 'Akter', 'Rahman', 'Khan', 'Sultana'];
  const first = firstNames[Math.floor(Math.random() * firstNames.length)];
  const last = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${first} ${last}`;
}

function generateRandomBDPhoneNumber() {
  const secondDigit = Math.floor(Math.random() * 7) + 3; // 3–9
  const rest = Math.floor(10000000 + Math.random() * 90000000); // 8 digits
  return `01${secondDigit}${rest}`;
}

function generateRandomPosition() {
  const positions = ['Manager', 'Developer', 'Tester', 'HR', 'Support', 'Designer'];
  return positions[Math.floor(Math.random() * positions.length)];
}

function generateRandomSalary() {
  // Salary between 3000 and 10000, as string
  return (3000 + Math.floor(Math.random() * 7001)).toString();
}

function generateRandomCommissionRate() {
  // Commission rate between 5% and 20%
  return (5 + Math.floor(Math.random() * 16)).toString();
}

const config = {
  loginData: {
    validUsername: 'useradmin',
    validPassword: 'useradmin',
  },

  StaffData: () => ({
    name: generateRandomName(),
    position: generateRandomPosition(),
    phone: generateRandomBDPhoneNumber().toString(),
    salary: (Math.floor(Math.random() * 20000) + 10000).toString(), // 10,000–30,000
    commission_rate: (Math.floor(Math.random() * 10) + 1).toString(), // 1–10%
    email: generateRandomEmail(),
  }),

    CustomerData: () => ({
    name: generateRandomName(),
    phone: generateRandomBDPhoneNumber().toString(),
    email: generateRandomEmail(),
  }),

  ServicePackageData: () => ({
    serviceName: `Service ${Date.now()}`,
    packageName: `Package ${Date.now()}`,
    price: (Math.floor(Math.random() * 1000) + 100).toString(), // 100–1100
    description: 'This is a sample service package description.',
    serviceDuration: (Math.floor(Math.random() * 120) + 30).toString(), // 30–150 minutes
    packageName: `Package ${Date.now()}`,
    quantity: (Math.floor(Math.random() * 10) + 1).toString(), // 1–10
    serviceNameSearch : 'Hair', // For searching in the package creation

  }),

    BillingData: () => ({
    customerName: generateRandomName(),
    customerPhone: generateRandomBDPhoneNumber().toString(),

    billReferenceSelectWalkin: 'Walk in',
    billReferenceSelectEvent: 'Event',

    billPaymentMethodSelectCash: 'Cash',
    billPaymentMethodSelectCard: 'Card',
    billPaymentMethodSelectBkash: 'bkash',

    discountTypeSelectPercentage: 'Percentage',
    discountValuePercentage: (Math.floor(Math.random() * 20) + 1).toString(), // 1–20%

    discountTypeSelectFixedAmount: 'Fixed Amount',
    discountValueFixedAmount: (Math.floor(Math.random() * 100) + 1).toString(), // 1–100
    notes: 'This is a sample bill note.',
    staffName: 'Hafiz',
    quantity: (Math.floor(Math.random() * 5) + 1).toString(), // 1–5
    unitPrice: (Math.floor(Math.random() * 1000) + 100).toString(), // 100–1100
  }),


};

module.exports = config;
