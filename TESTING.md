# 🧪 Testing Guide

## Manual Testing

### Pre-requisites
- Both servers running (Backend on 4000, Frontend on 5173)
- Demo data seeded in database

### Test Scenarios

#### 1. Authentication Flow

**Sign Up**
- [ ] Click "Sign up" link on login page
- [ ] Fill name, email, password
- [ ] Click "Sign up" button
- [ ] Should redirect to dashboard
- [ ] Name displayed in header

**Sign In**
- [ ] Go to login page
- [ ] Use demo credentials:
  - Email: `demo@local`
  - Password: `password123`
- [ ] Should redirect to dashboard
- [ ] User info shown in header

**Sign Out**
- [ ] Click logout button in header
- [ ] Should redirect to login page
- [ ] Cannot access dashboard without re-login

#### 2. Expense Management

**Add Expense**
- [ ] Go to Expenses page
- [ ] Click "+ Add Expense"
- [ ] Fill form:
  - Amount: 25.50
  - Category: Food
  - Description: Lunch
  - Payment Mode: Card
  - Date: Today
- [ ] Click "Add"
- [ ] Expense appears in list
- [ ] Toast notification shows success

**Edit Expense**
- [ ] On Expenses page, click "Edit" on any expense
- [ ] Modal opens with pre-filled data
- [ ] Change amount to 30.00
- [ ] Click "Update"
- [ ] List updates with new amount
- [ ] Toast shows success

**Delete Expense**
- [ ] Click "Delete" on an expense
- [ ] Confirm in dialog
- [ ] Expense removed from list
- [ ] Toast shows success

**Filter Expenses**
- [ ] Use filter dropdowns:
  - Category filter: Select "Food"
  - Min Amount: 0
  - Max Amount: 100
- [ ] List updates to show only matching expenses
- [ ] Clear filters: Select "All Categories"

#### 3. Budget Management

**Set Budget**
- [ ] Go to Budgets page
- [ ] Click "+ Set Budget"
- [ ] Select Category: "Food"
- [ ] Enter Limit: 100
- [ ] Click "Save"
- [ ] Card appears showing Food budget
- [ ] Amount shows $100.00

**View Multiple Budgets**
- [ ] Add budgets for multiple categories
- [ ] Should display as grid of cards
- [ ] Each card shows category and limit

#### 4. Category Management

**Add Category**
- [ ] Go to Categories page
- [ ] Click "+ Add Category"
- [ ] Enter: "Shopping"
- [ ] Click "Add"
- [ ] New category appears in grid
- [ ] Toast shows success

**Delete Category**
- [ ] Click X on a category card
- [ ] Confirm in dialog
- [ ] Category removed
- [ ] Toast shows success

**Use Category in Expense**
- [ ] Go to Expenses, add new expense
- [ ] Category dropdown should show new custom category
- [ ] Select it and save

#### 5. Analytics & Dashboard

**Dashboard Stats**
- [ ] Dashboard shows:
  - Total Spent (sum of all expenses)
  - This Month (expenses from 1st to today)
  - This Week (expenses from last 7 days)
- [ ] Stats update after adding expenses

**Charts**
- [ ] Bar chart shows recent expenses by date
- [ ] Pie chart shows spending by category
- [ ] Charts are responsive and readable

**Recent Expenses List**
- [ ] Shows last 10 expenses
- [ ] Formatted with category, amount, date
- [ ] Hover effects work

#### 6. Export Feature

**Export to CSV**
- [ ] Go to Export page
- [ ] (Optional) Select date range
- [ ] Click "Export as CSV"
- [ ] File downloads as `expenses_*.csv`
- [ ] Can open in Excel/Sheets
- [ ] Contains columns: date, amount, category, description, paymentMode

#### 7. UI/UX Tests

**Responsive Design**
- [ ] Open app on desktop (full width)
- [ ] All layout looks good
- [ ] Open DevTools, resize to mobile (375px)
- [ ] Sidebar collapses (if mobile view added)
- [ ] Buttons/inputs remain clickable

**Dark Mode**
- [ ] Check system prefers-color-scheme
- [ ] Dark colors used on dark mode
- [ ] Text readable in both themes
- [ ] Charts visible in both themes

**Navigation**
- [ ] All sidebar links work
- [ ] Active link highlighted
- [ ] Page content changes when clicking links
- [ ] Header visible on all pages

**Form Validation**
- [ ] Try adding expense without amount
- [ ] Error shown: "Please fill all required fields"
- [ ] Try invalid email in signup
- [ ] Error shown for invalid format

#### 8. Error Scenarios

**Network Errors**
- [ ] Stop backend server
- [ ] Try to load expenses
- [ ] Error toast shown: "Failed to load expenses"
- [ ] Restart backend
- [ ] Refresh page
- [ ] Works again

**Invalid Data**
- [ ] Try to add expense with negative amount
- [ ] Add expense with empty category
- [ ] Check error handling

**Edge Cases**
- [ ] Add expense with very large amount (9999999)
- [ ] Add expense with special characters in description
- [ ] Delete last expense in list
- [ ] Edit with same values

## Automated Testing

### Setup Jest + React Testing Library

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom jest @babel/preset-react
```

### Example Test File (frontend/src/__tests__/Login.test.jsx)

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../pages/Login';

describe('Login Component', () => {
  test('renders login form', () => {
    render(<Login />);
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  test('allows user to input email', () => {
    render(<Login />);
    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });
});
```

### Backend API Tests

```bash
npm install --save-dev supertest jest
```

Example: `backend/__tests__/expenses.test.js`

```javascript
const request = require('supertest');
const app = require('../src/index');

describe('Expenses API', () => {
  test('GET /api/expenses returns expenses', async () => {
    const res = await request(app).get('/api/expenses');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
```

## Performance Testing

### Load Testing with Artillery

```bash
npm install -g artillery

# Create load-test.yml
artillery quick --count 10 --num 50 http://localhost:4000/api/expenses
```

### Browser DevTools

1. **Lighthouse**
   - Open DevTools > Lighthouse
   - Run audit
   - Check Performance, Accessibility scores

2. **Network Tab**
   - Check response times
   - Look for slow API calls
   - Verify CSS/JS bundle sizes

3. **Performance Tab**
   - Record runtime performance
   - Look for long tasks
   - Check memory usage

## Checklist Before Production

- [ ] All manual tests pass
- [ ] Automated tests pass
- [ ] No console errors
- [ ] No console warnings (besides non-critical)
- [ ] Performance score > 80
- [ ] Accessibility score > 90
- [ ] All features work on mobile
- [ ] All features work in different browsers
- [ ] Error handling works
- [ ] Loading states show properly
- [ ] No sensitive data in logs
- [ ] Database indices are optimized
- [ ] Environment variables are configured
- [ ] CORS is restricted (not `*`)
- [ ] SSL certificate is valid

## Test Data

### Sample Expenses for Testing
```javascript
[
  {
    amount: 12.50,
    category: 'Food',
    description: 'Coffee at Starbucks',
    paymentMode: 'card',
    date: '2026-01-26'
  },
  {
    amount: 45.00,
    category: 'Transport',
    description: 'Uber ride',
    paymentMode: 'card',
    date: '2026-01-25'
  },
  {
    amount: 120.00,
    category: 'Utilities',
    description: 'Electric bill',
    paymentMode: 'online',
    date: '2026-01-20'
  }
]
```

## Browser Compatibility

Test on:
- [ ] Chrome/Chromium (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Accessibility Testing

- [ ] Tab navigation works
- [ ] Forms have labels
- [ ] Colors have sufficient contrast
- [ ] Images have alt text
- [ ] Focus indicators visible
- [ ] Screen reader compatible

---

**Last Updated**: January 26, 2026
