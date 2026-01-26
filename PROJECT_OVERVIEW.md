# 📊 Personal Finance Tracker - Project Overview

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    USER'S BROWSER                           │
│                 (http://localhost:5173)                      │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Dashboard  │  │   Expenses   │  │    Budgets   │  ... │
│  │   (Charts)   │  │   (CRUD)     │  │  (Settings)  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  [React 18] [Vite] [Tailwind CSS] [Chart.js]               │
└────────────────────┬───────────────────────────────────────┘
                     │ API Calls (Axios)
                     ↓
┌─────────────────────────────────────────────────────────────┐
│              BACKEND API SERVER                              │
│          (http://localhost:4000)                             │
│                                                               │
│  [Express.js] [Node.js]                                      │
│                                                               │
│  ┌────────────────────────────────────────────────────┐    │
│  │         API Routes (15+ endpoints)                 │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐          │    │
│  │  │  Auth    │ │ Expenses │ │ Budgets  │  ...     │    │
│  │  │ Routes   │ │ Routes   │ │ Routes   │          │    │
│  │  └──────────┘ └──────────┘ └──────────┘          │    │
│  └────────────────────────────────────────────────────┘    │
│                       ↓                                      │
│  ┌────────────────────────────────────────────────────┐    │
│  │      Middleware & Controllers                       │    │
│  │  ├─ Authentication (JWT)                           │    │
│  │  ├─ Error Handling                                 │    │
│  │  ├─ Input Validation                               │    │
│  │  └─ CORS, Logging                                  │    │
│  └────────────────────────────────────────────────────┘    │
│                       ↓                                      │
│  ┌────────────────────────────────────────────────────┐    │
│  │         Mongoose ODM & Models                       │    │
│  │  ├─ User (auth, categories, budgets)              │    │
│  │  ├─ Expense (transactions)                        │    │
│  │  └─ Indexed queries for performance                │    │
│  └────────────────────────────────────────────────────┘    │
└────────────────────┬───────────────────────────────────────┘
                     │ Database Connection
                     ↓
┌─────────────────────────────────────────────────────────────┐
│              MONGODB DATABASE                                │
│          (mongodb://localhost:27017/pft)                     │
│                                                             │
│  Collections:                                                │
│  ├─ users (authentication, categories, budgets)             │
│  └─ expenses (all financial transactions)                   │
│                                                               │
│  Indices: user+date, category, text search                  │
└─────────────────────────────────────────────────────────────┘
```

## 📱 Frontend Structure

```
Frontend (React + Vite)
├── Pages (5 full-featured pages)
│   ├── Login.jsx          → User authentication
│   ├── Signup.jsx         → New user registration
│   ├── Dashboard.jsx      → Overview, stats, charts
│   ├── Expenses.jsx       → Full expense management
│   ├── Budgets.jsx        → Budget settings & tracking
│   ├── Categories.jsx     → Custom category management
│   └── Export.jsx         → CSV data export
│
├── Components (Reusable UI)
│   ├── Header.jsx         → Navigation & user info
│   ├── Sidebar.jsx        → Main menu
│   ├── Modal.jsx          → Dialog boxes
│   ├── Toast.jsx          → Notifications
│   ├── StatCard.jsx       → Statistics display
│   └── (Chart components integrated)
│
├── Services
│   ├── api.js             → Axios configuration & methods
│   └── auth.jsx           → Authentication context
│
├── Styles
│   ├── styles.css         → Global Tailwind CSS
│   └── tailwind.config.cjs → Customization
│
└── Build Output (npm run build)
    └── dist/              → Optimized production build
```

## 🔌 API Endpoints (15+)

```
Authentication (3)
├── POST   /api/auth/signup      → Register new user
├── POST   /api/auth/login       → User login (returns JWT)
└── GET    /api/auth/me          → Current user profile (protected)

Expenses (5)
├── GET    /api/expenses         → List all (with filters/pagination)
├── POST   /api/expenses         → Create expense
├── PUT    /api/expenses/:id     → Update expense
├── DELETE /api/expenses/:id     → Delete expense
└── GET    /api/expenses/summary → Category breakdown

Budgets (3)
├── GET    /api/budgets          → Get all budgets
├── POST   /api/budgets          → Set budget
└── GET    /api/budgets/alerts   → Get budget alerts

Categories (3)
├── GET    /api/categories       → Get all categories
├── POST   /api/categories       → Add category
└── DELETE /api/categories/:name → Delete category

Export (1)
└── GET    /api/export/csv       → Download CSV file
```

## 🗄️ Database Schema

```
MongoDB Collections

users {
  _id: ObjectId
  name: String
  email: String (unique)
  passwordHash: String (bcrypt hashed)
  categories: [String]     # Custom categories
  budgets: [{              # Budget per category
    category: String
    limit: Number
  }]
  alerts: [{               # Budget alert notifications
    message: String
    createdAt: Date
  }]
  createdAt: Date
  updatedAt: Date
}

expenses {
  _id: ObjectId
  user: ObjectId           # Reference to user
  amount: Number
  category: String         # Indexed for filtering
  description: String      # Text indexed for search
  paymentMode: String      # cash | card | online | other
  date: Date              # Indexed for range queries
  createdAt: Date
  updatedAt: Date
  
  Indices:
  - (user, date) for efficient user expense queries
  - (description, category) for text search
}
```

## 🔐 Security Flow

```
User Login Request
        ↓
  ┌─────────────────┐
  │ Express Server  │
  └────────┬────────┘
           ↓
    Email + Password
           ↓
  ┌─────────────────────┐
  │ Find user by email  │
  │ (MongoDB query)     │
  └────────┬────────────┘
           ↓
    ┌──────────────────────┐
    │ Compare password     │
    │ with bcrypt hash     │
    │ (using bcrypt)       │
    └─────────┬────────────┘
              ↓
    ┌──────────────────────┐
    │ If match:            │
    │ Generate JWT token   │
    │ (7 day expiry)       │
    └─────────┬────────────┘
              ↓
    Return token to client
              ↓
    Client stores in localStorage
              ↓
    Send with every API request:
    Authorization: Bearer <token>
              ↓
    Server verifies token
    with JWT middleware
```

## 📊 Data Flow Examples

### Adding an Expense

```
User fills expense form
        ↓
Frontend validates input
        ↓
Sends POST /api/expenses
        ↓
Backend validates again
        ↓
Checks category exists
        ↓
Checks budget limit (if set)
        ↓
Creates expense in DB
        ↓
Checks budget exceeded
        ↓
If exceeded: Creates alert
        ↓
Returns expense + warning (if any)
        ↓
Frontend shows success toast
        ↓
Refreshes expense list
        ↓
Updates charts
```

### Getting Dashboard Data

```
Dashboard page loads
        ↓
useEffect hook triggers
        ↓
Calls GET /api/expenses
        ↓
Backend returns 10 recent expenses
        ↓
Calls GET /api/expenses/summary
        ↓
Backend aggregates by category
        ↓
Frontend receives both
        ↓
Calculates stats:
├─ Total (sum all)
├─ This month
└─ This week
        ↓
Updates state
        ↓
Renders charts with data
        ↓
Displays recent expenses list
```

## 🚀 Request/Response Cycle

### Successful Request

```
Frontend (Client)          Backend (Server)
        │                        │
        │─ POST /api/expenses   │
        │ {                     │
        │   amount: 25.50,      │
        │   category: "Food",   │
        │   date: "2026-01-26"  │
        │ }                     │
        │─────────────────────→ │
        │                       │ ✓ Validate input
        │                       │ ✓ Check auth
        │                       │ ✓ Save to DB
        │                       │
        │← 201 {expense data}  │
        │                       │
    ✓ Show toast
    ✓ Update list
```

### Error Request

```
Frontend (Client)          Backend (Server)
        │                        │
        │─ POST /api/expenses   │
        │ {                     │
        │   amount: "",         │ ✗ Empty!
        │   category: "Food"    │
        │ }                     │
        │─────────────────────→ │
        │                       │ ✗ Validation fails
        │                       │
        │← 400 {error msg}     │
        │                       │
    ✗ Show error toast
    ✗ Form stays open
```

## 📈 Performance Optimizations

```
Database
├─ Indexed queries (user, date, category)
├─ Lean queries for exports
├─ Pagination (limit 25 by default)
└─ Text search indices

Frontend
├─ Code splitting (Vite)
├─ Lazy loading components
├─ Chart.js with large datasets
└─ Tailwind CSS (minimal bundle)

Network
├─ Gzip compression
├─ CDN ready (frontend build)
└─ Efficient API pagination

Rendering
├─ React memo for charts
├─ Virtual scrolling (for large lists)
└─ CSS transitions
```

## 🔄 State Management

```
Frontend State (React Context)

AuthContext
├─ user: { name, email, _id }
├─ signin(email, password)
├─ signup(name, email, password)
├─ signout()
└─ Auto-restore from localStorage

Page States (useState)
├─ Expenses page
│  ├─ expenses: []
│  ├─ filters: { category, min, max }
│  ├─ loading: boolean
│  └─ showModal: boolean
│
├─ Budgets page
│  ├─ budgets: []
│  ├─ formData: { category, limit }
│  └─ loading: boolean
│
└─ ... (similar for each page)
```

## 📦 Build & Deployment

```
Development
├─ npm run dev (frontend) → Vite dev server
├─ npm run dev (backend) → Nodemon with auto-restart
└─ MongoDB Atlas/Local

Production
├─ npm run build (frontend) → Optimized dist/
├─ npm start (backend) → Production Node server
├─ Docker containerization
└─ Cloud platform deployment
```

---

## 🎯 Complete Feature Matrix

| Feature | Frontend | Backend | Database | Status |
|---------|----------|---------|----------|--------|
| User Auth | ✅ | ✅ | ✅ | ✅ |
| Add Expense | ✅ | ✅ | ✅ | ✅ |
| Edit Expense | ✅ | ✅ | ✅ | ✅ |
| Delete Expense | ✅ | ✅ | ✅ | ✅ |
| Filter Expenses | ✅ | ✅ | ✅ | ✅ |
| Search Expenses | ✅ | ✅ | ✅ | ✅ |
| Category CRUD | ✅ | ✅ | ✅ | ✅ |
| Budget Management | ✅ | ✅ | ✅ | ✅ |
| Expense Summary | ✅ | ✅ | ✅ | ✅ |
| Charts/Graphs | ✅ | - | ✅ | ✅ |
| CSV Export | ✅ | ✅ | ✅ | ✅ |
| Responsive Design | ✅ | - | - | ✅ |
| Dark Mode | ✅ | - | - | ✅ |
| Error Handling | ✅ | ✅ | ✅ | ✅ |
| Input Validation | ✅ | ✅ | ✅ | ✅ |

---

Created: January 26, 2026  
Version: 1.0.0  
Status: ✅ COMPLETE
