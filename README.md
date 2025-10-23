# 💇 Salon-ERP Automation

Automated test suite for the **Salon-ERP system** using **Playwright**.  
This framework validates core functionalities like billing, customer management, staff management, and service packages.

---


## 🎯 Overview

Salon-ERP automation framework tests critical workflows of a salon management system: billing, staff, services, and customer management.  
Tests are built using **Playwright** and follow the **Page Object Model (POM)** for maintainability.

---

## ✨ Features

- ✅ End-to-end automation with **Playwright**  
- ✅ Page Object Model (POM) for reusable components  
- ✅ Billing, customer, staff, and service package modules automated  
- ✅ Cross-browser support (Chromium, Firefox)  
- ✅ HTML reports with screenshots for failures  
- ✅ Easy-to-extend for new modules  

---

## 🔧 Prerequisites

- Node.js (v14+)  
- npm (comes with Node.js)  
- Playwright browsers installed  

---

## 📦 Installation

1. Clone the repository:  
```bash
git clone https://github.com/SHANJIDA-HRIDE/Salon-ERP.git
cd Salon-ERP
```
2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## 🚀 Running Tests

### Run all tests
```bash
npx playwright test
```

### Run tests in headed mode (see browser)
```bash
npx playwright test --headed
```

### Run specific test file
```bash
npx playwright test tests/Assertions.spec.js
```

### Run tests in a specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
```

### Run tests with tags
```bash
npx playwright test --grep @smoke
```

### Run tests in debug mode
```bash
npx playwright test --debug
```

### View test report
```bash
npx playwright show-report
```

### Run tests in UI mode
```bash
npx playwright test --ui
```
## 📁 Project Structure
```bash
Salon-ERP/
├── pages/                  # Page Object files
│   ├── BasePage.js
│   ├── BillingPage.js
│   ├── CustomerPage.js
│   ├── LoginPage.js
│   ├── ServicePackagePage.js
│   └── StaffPage.js
├── tests/                  # Test scripts
│   ├── BillingTest.spec.js
│   ├── CustomerTest.spec.js
│   ├── ServicePackageTest.spec.js
│   └── StaffTest.spec.js
├── utils/                 # Reusable helper functions
│   └── config.js
├── auth.json              # Authentication & environment data
├── global-setup.js        # Pre-test setup configuration
├── login.setup.js         # Login setup handling
├── playwright.config.js   # Playwright configuration
├── package.json           # Dependencies and scripts
└── README.md
```




## 🧪 Test Coverage
### 🔹 Authentication

- Validate login with valid credentials

- Verify invalid login errors

- Password field and UI validations

### 🔹 Billing Module

- BillingPage.js / BillingTest.spec.js

- Add new billing record

- Validate total amounts, taxes, discounts

- Edit and delete billing entries

- Verify UI consistency and notifications

### 🔹 Customer Management

- Add, edit, and delete customers

- Validate required fields and input formats

- Search and filter customer list

- Verify customer history and details

### 🔹 Staff Management


- Add new staff members

- Edit staff information

- Delete staff and confirm removal

- Role assignment validation

### 🔹 Service Package Management

- Add, edit, and delete service packages

- Validate pricing and service details

- Ensure proper linking with staff and billing

## 🧰 Tech Stack

- Language: JavaScript (ES6)

- Framework: Playwright

- Test Runner: Playwright Test

- Design Pattern: Page Object Model (POM)

- Reporting: Playwright HTML Reporter

## 👩‍💻 Author

#### Shanjida Hride
#### 🎯 Software Quality Assurance Engineer
#### 📧 shanjidahride1997@gmail.com


## 🏁 Future Improvements

- Add CI/CD pipeline integration

- Integrate API-level test coverage

- Add environment-based configuration support

- Include cross-browser and mobile viewport testing

