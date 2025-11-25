# Billing Page - Comprehensive Regression Test Plan

## Application Overview

The Billing page is a core module in the POS/ERP system that enables users to:
- Create new bills with customer information
- Add services/packages to bills
- Apply discounts (percentage or fixed amount)
- Select payment methods
- Assign staff members to transactions
- Calculate and collect payments
- View bill summaries with tax calculations
- Generate bills with various reference types

---

## Test Scenarios

### **1. Bill Creation - Basic Flow**

#### 1.1 Create Bill with All Required Fields
**Steps:**
1. Navigate to https://so-dev.evexia-global.com/billing
2. Click "New Bill" button
3. Enter phone number: "01700000000"
4. Enter customer name: "Test Customer"
5. Select reference: "Walk in"
6. Select payment method: "Cash"
7. Verify all fields are filled correctly
8. Proceed to next step

**Expected Results:**
- All input fields accept the data
- Dropdown options are selectable
- Form validates without errors
- Customer details are displayed on the bill

---

#### 1.2 Create Bill with Minimum Required Fields
**Steps:**
1. Click "New Bill"
2. Enter only phone number: "01711234567"
3. Leave customer name blank
4. Select payment method: "Cash"
5. Click "Add Service"

**Expected Results:**
- Bill can be created without customer name
- Phone number is required/validated
- Form accepts submission

---

### **2. Service Selection & Management**

#### 2.1 Add Single Service to Bill
**Steps:**
1. Click "New Bill"
2. Fill in customer phone: "01700000000"
3. Click "Add Service" button
4. Search for "Manicure Regular" in service search
5. Check the checkbox for the service
6. Click "Add Selected" button
7. Verify service appears in bill items

**Expected Results:**
- Service modal opens
- Search functionality works and filters services
- Checkbox selection works
- Service is added to the bill with correct price
- Service details display in bill summary

---

#### 2.2 Add Multiple Services to Bill
**Steps:**
1. Click "New Bill"
2. Fill customer phone
3. Click "Add Service"
4. Search and select first service (e.g., "Hair Cut")
5. Check checkbox
6. Search and select second service (e.g., "Manicure Regular")
7. Check checkbox
8. Click "Add Selected"

**Expected Results:**
- Multiple services can be selected
- All selected services appear in the bill
- Quantities can be adjusted for each service
- Total amount updates correctly

---

#### 2.3 Service Search Functionality
**Steps:**
1. Click "New Bill" → "Add Service"
2. Type partial service name: "Hair"
3. Verify results show related services
4. Clear search
5. Type exact service name: "Manicure Regular"
6. Verify exact match appears

**Expected Results:**
- Search filters services in real-time
- Partial searches return relevant results
- Exact matches are highlighted
- Search is case-insensitive (if applicable)

---

#### 2.4 Remove Service from Bill
**Steps:**
1. Add a service to the bill
2. Click remove/delete button for that service
3. Verify service is removed from bill items
4. Verify total amount updates

**Expected Results:**
- Service is removed from the bill
- Bill total recalculates automatically
- Remaining services are unaffected

---

### **3. Payment Method Handling**

#### 3.1 Create Bill with Different Payment Methods
**Steps:**
1. Test creating bills with each payment method:
   - Cash
   - Card
   - bKash
   - Any other available methods
2. Verify each method is selectable and saves

**Expected Results:**
- All payment methods are available in dropdown
- Selected payment method displays on bill
- Bill can be created with any method

---

#### 3.2 Payment Method Validation
**Steps:**
1. Create new bill
2. Leave payment method unselected
3. Try to create bill without selecting payment method

**Expected Results:**
- Error message appears if payment method is required
- Bill cannot be submitted without payment method
- Form prevents submission

---

### **4. Discount Functionality**

#### 4.1 Apply Percentage Discount
**Steps:**
1. Add service to bill (price: 1000 BDT)
2. Select discount type: "Percentage (%)"
3. Enter discount value: "10"
4. Verify calculation:
   - Original: 1000
   - Discount: 100 (10%)
   - Total: 900

**Expected Results:**
- Discount is applied correctly
- Calculation is accurate
- Display shows discount amount and percentage
- Total updates in real-time

---

#### 4.2 Apply Fixed Amount Discount
**Steps:**
1. Add service to bill (price: 1000 BDT)
2. Select discount type: "Fixed Amount"
3. Enter discount value: "150"
4. Verify calculation:
   - Original: 1000
   - Discount: 150
   - Total: 850

**Expected Results:**
- Fixed discount is applied correctly
- Calculation matches entered amount
- Total updates correctly

---

#### 4.3 Discount Cannot Exceed Bill Total
**Steps:**
1. Add service (price: 500 BDT)
2. Try to apply discount: "1000" (fixed amount)
3. Verify system prevents or handles this case

**Expected Results:**
- Error message displayed OR
- Discount is capped at bill total OR
- System shows warning about invalid discount

---

#### 4.4 Zero Discount
**Steps:**
1. Add service to bill
2. Leave discount value as "0"
3. Verify bill total equals service price

**Expected Results:**
- No discount is applied
- Bill total remains unchanged

---

### **5. Tax Calculation**

#### 5.1 Tax Checkbox Functionality
**Steps:**
1. Add service to bill (price: 1000 BDT)
2. Check "Add Tax (15%)" checkbox
3. Verify calculation:
   - Subtotal: 1000
   - Tax (15%): 150
   - Total: 1150

**Expected Results:**
- Tax calculation is accurate
- Tax percentage is correctly applied
- Payable amount updates

---

#### 5.2 Tax with Discount
**Steps:**
1. Add service (price: 1000 BDT)
2. Apply discount: 10% (100 BDT)
3. Check tax checkbox
4. Verify correct calculation order:
   - Subtotal: 1000
   - After discount: 900
   - Tax on 900: 135
   - Total: 1035

**Expected Results:**
- Tax is calculated on discounted amount
- Calculation sequence is correct
- All values are accurate

---

### **6. Staff Assignment**

#### 6.1 Select Staff Member
**Steps:**
1. Add service to bill
2. Locate staff selection dropdown
3. Select a staff member: "Hafiz"
4. Verify staff is assigned to bill

**Expected Results:**
- Staff dropdown is populated with available staff
- Selection saves correctly
- Staff name appears on bill

---

#### 6.2 Change Staff Assignment
**Steps:**
1. Select a staff member
2. Change to a different staff member
3. Verify change is reflected

**Expected Results:**
- Staff can be changed before bill creation
- New staff assignment replaces previous
- Bill reflects current staff assignment

---

### **7. Payment Amount Handling**

#### 7.1 Receive Amount Auto-filled
**Steps:**
1. Add service (price: 500 BDT)
2. Verify "Total Payable Amount" displays: 500
3. Verify "Receive Amount" field is empty or auto-filled with total
4. Enter receive amount: 500

**Expected Results:**
- Payable amount is calculated correctly
- Receive amount can be entered
- Amount matches payable total

---

#### 7.2 Receive Amount Greater Than Payable
**Steps:**
1. Bill total: 500 BDT
2. Enter receive amount: 1000
3. Verify change calculation:
   - Change: 500 BDT

**Expected Results:**
- System allows overpayment
- Change amount is calculated correctly
- Change is displayed to user

---

#### 7.3 Receive Amount Less Than Payable
**Steps:**
1. Bill total: 500 BDT
2. Enter receive amount: 300
3. Try to create bill

**Expected Results:**
- Warning/error message appears OR
- Pending balance is shown
- Bill creation is prevented or flagged

---

### **8. Bill Notes/Comments**

#### 8.1 Add Notes to Bill
**Steps:**
1. Create new bill
2. Fill in service details
3. In "Notes" field, enter: "VIP Customer - Special handling required"
4. Create bill

**Expected Results:**
- Notes field accepts text
- Notes are saved with bill
- Notes appear in bill summary

---

#### 8.2 Long Notes Handling
**Steps:**
1. Enter very long note (500+ characters)
2. Save bill
3. Retrieve bill and verify notes display

**Expected Results:**
- Long text is accepted
- Text wraps or scrolls appropriately
- All text is preserved

---

### **9. Bill Reference Types**

#### 9.1 Select Different Reference Types
**Steps:**
1. Test each reference type:
   - Walk in
   - Phone Booking
   - Online Booking
   - Referral
   - Regular Customer
   - VIP Customer
   - Corporate
   - Event
   - Promotion
   - Other
2. Verify each type saves correctly

**Expected Results:**
- All reference types are selectable
- Selected type displays on bill
- Bill can be created with any reference type

---

### **10. Form Validation & Error Handling**

#### 10.1 Submit Bill Without Phone
**Steps:**
1. Click "New Bill"
2. Leave phone number empty
3. Try to submit

**Expected Results:**
- Error message: "Phone is required" (or similar)
- Form prevents submission

---

#### 10.2 Submit Bill Without Service
**Steps:**
1. Click "New Bill"
2. Fill phone and customer details
3. Try to create bill without adding any service

**Expected Results:**
- Error message: "At least one service required"
- Bill creation is prevented

---

#### 10.3 Invalid Phone Number Format
**Steps:**
1. Enter invalid phone: "abc12345"
2. Try to proceed

**Expected Results:**
- Error message about invalid format OR
- Phone field rejects invalid input OR
- Warning is shown

---

### **11. UI/UX Behavior**

#### 11.1 Modal Opening/Closing
**Steps:**
1. Click "Add Service" button
2. Service modal opens
3. Click close button (X or Cancel)
4. Verify modal closes and no services are added

**Expected Results:**
- Modal opens and closes smoothly
- No accidental changes occur when closing
- Focus returns to main form

---

#### 11.2 Button States
**Steps:**
1. Verify "Create Bill" button is disabled when:
   - No service is added
   - Phone number is empty
   - Payment method is not selected
2. Fill all required fields
3. Verify button becomes enabled

**Expected Results:**
- Buttons change state appropriately
- Disabled buttons cannot be clicked
- Enabled buttons trigger actions

---

### **12. Data Persistence**

#### 12.1 Bill Data Retention During Session
**Steps:**
1. Create a bill with all details
2. Add multiple services
3. Apply discount
4. Navigate away and return to billing page
5. Verify bill data

**Expected Results:**
- Bill is saved to system
- All data persists correctly
- Bill can be viewed/edited

---

#### 12.2 Duplicate Bill Prevention
**Steps:**
1. Create bill successfully
2. Click "Create Bill" again immediately
3. Verify system prevents duplicate

**Expected Results:**
- Only one bill is created
- No duplicate entries in system
- Appropriate feedback is given

---

### **13. Mobile/Responsive Design (if applicable)**

#### 13.1 Billing Form on Mobile
**Steps:**
1. Open billing page on mobile device
2. Fill in all fields
3. Add service
4. Create bill

**Expected Results:**
- All elements are accessible on mobile
- Text input works smoothly
- Dropdowns are touch-friendly
- Bill is created successfully

---

### **14. Integration Tests**

#### 14.1 Bill Appears in Bill List After Creation
**Steps:**
1. Note the new bill number/timestamp
2. Create a bill with specific customer name and phone
3. Navigate to bills list/history
4. Search for bill with customer details
5. Verify bill appears

**Expected Results:**
- Bill is listed in system
- All bill details are searchable
- Bill can be accessed and viewed

---

#### 14.2 Staff Commission Calculation
**Steps:**
1. Create bill with staff assignment
2. Apply service with known commission rate
3. Verify staff commission is calculated correctly

**Expected Results:**
- Commission is calculated based on service rate
- Staff record is updated
- Commission appears in staff reports

---

### **15. Edge Cases & Boundary Testing**

#### 15.1 Special Characters in Notes
**Steps:**
1. Enter notes with special characters: "!@#$%^&*()_+-=[]{}|;:,.<>?"
2. Create bill

**Expected Results:**
- Special characters are accepted or escaped
- No system errors occur
- Bill is created successfully

---

#### 15.2 Maximum Bill Amount
**Steps:**
1. Add high-value services
2. Create bill with large total (e.g., 999,999 BDT)
3. Process payment

**Expected Results:**
- System handles large amounts
- Calculations are accurate
- No overflow or display issues

---

#### 15.3 Minimum Bill Amount
**Steps:**
1. Add service with minimum price (e.g., 1 BDT)
2. Create bill

**Expected Results:**
- Minimum amounts are accepted
- Calculations are accurate
- Bill is created

---

### **16. Concurrent User Scenarios**

#### 16.1 Multiple Staff Creating Bills Simultaneously
**Steps:**
1. User 1 creates a bill with Staff A
2. Simultaneously, User 2 creates a bill with Staff B
3. Verify both bills are created correctly
4. Verify no data conflicts

**Expected Results:**
- Both bills are created independently
- No data loss or corruption
- Each user sees their own bill

---

## Summary

This comprehensive regression test plan covers:
- ✅ Basic bill creation flows
- ✅ Service selection and management
- ✅ Payment methods and amounts
- ✅ Discount and tax calculations
- ✅ Staff assignment
- ✅ Form validation and error handling
- ✅ UI/UX behavior
- ✅ Data persistence
- ✅ Edge cases and boundary conditions
- ✅ Integration scenarios

**Total Test Cases: 50+**

These scenarios ensure the billing module functions correctly across all user interactions, edge cases, and integration points.
