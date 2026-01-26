# 💰 Personal Finance Tracker

A full-stack web application for tracking expenses, managing budgets, and visualizing spending patterns with real-time charts.

## ✨ Features

### Core Features
- **User Authentication**: Secure signup/login with JWT tokens
- **Expense Tracking**: Add, edit, delete expenses with categories and payment modes
- **Budget Management**: Set and monitor budget limits per category
- **Category Management**: Create and organize custom expense categories
- **Visual Analytics**: Charts and graphs showing spending trends by category
- **Data Export**: Export expenses to CSV format for analysis
- **Responsive Design**: Works on desktop and mobile devices with dark mode support

### Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Chart.js
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: MongoDB

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ and npm
- MongoDB (local or MongoDB Atlas)

### Installation & Running

#### 1. Backend Setup
```bash
cd backend
npm install

# Create .env file with:
MONGODB_URI=mongodb://127.0.0.1:27017/pft
JWT_SECRET=your_jwt_secret_key_here
PORT=4000

# Seed database with demo data
npm run seed

# Start development server
npm run dev
```

Backend runs on `http://localhost:4000`

#### 2. Frontend Setup
```bash
cd frontend
npm install

# Create .env file (optional) with:
VITE_API_BASE=http://localhost:4000/api

# Start development server
npm run dev
```

Frontend runs on `http://localhost:5173`

### Demo Credentials
After seeding, use these credentials to test:
- **Email**: `demo@local`
- **Password**: `password123`

## 📁 Project Structure

```
personal-finance-tracker/
├── backend/
│   ├── src/
│   │   ├── controllers/       # Business logic
│   │   ├── routes/            # API endpoints
│   │   ├── models/            # Database schemas
│   │   ├── middleware/        # Auth & error handling
│   │   ├── utils/             # Database connection
│   │   ├── seed/              # Demo data seeding
│   │   └── index.js           # Express app setup
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Page components
│   │   ├── services/          # API & auth services
│   │   ├── main.jsx           # App entry point
│   │   └── styles.css         # Global styles
│   ├── vite.config.js
│   ├── tailwind.config.cjs
│   └── package.json
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Expenses
- `GET /api/expenses` - Get all expenses (with filters, pagination)
- `POST /api/expenses` - Create expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense
- `GET /api/expenses/summary` - Get expense summary by category

### Budgets
- `GET /api/budgets` - Get all budgets
- `POST /api/budgets` - Set budget for category
- `GET /api/budgets/alerts` - Get budget alerts

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Add category
- `DELETE /api/categories/:name` - Delete category

### Export
- `GET /api/export/csv` - Download expenses as CSV

## 🎨 UI Components

### Pages
- **Dashboard**: Overview with stats, recent expenses, and charts
- **Expenses**: Full expense list with filters and CRUD operations
- **Budgets**: Set and monitor category budgets
- **Categories**: Manage expense categories
- **Export**: Download data as CSV

### Components
- `Header`: Navigation and user info
- `Sidebar`: Main navigation menu
- `Modal`: Reusable modal dialogs
- `Toast`: Success/error notifications
- `StatCard`: Summary statistics display

## 🔐 Security

- Passwords hashed with bcrypt (12 rounds)
- JWT tokens for session management (7-day expiry)
- Protected routes with authentication middleware
- Input validation with express-validator
- CORS enabled for local development

**Production Notes**: 
- Change `CORS origin` from `'*'` to specific domains
- Use strong JWT_SECRET
- Enable HTTPS
- Secure MongoDB credentials

## 🧪 Testing

### Manual Testing Checklist
- [ ] Create new account (Signup)
- [ ] Login with existing account
- [ ] Add expense with all details
- [ ] Edit an expense
- [ ] Delete an expense
- [ ] Filter expenses by category/amount/date
- [ ] Create custom categories
- [ ] Set budget for category
- [ ] View charts and statistics
- [ ] Export data to CSV
- [ ] Test responsive design on mobile
- [ ] Logout

### Example Test Expense
```
Category: Food
Description: Coffee
Amount: 5.50
Payment Mode: Card
Date: 2026-01-26
```

## 📦 Production Build

### Frontend
```bash
cd frontend
npm run build
```

Creates optimized bundle in `dist/` folder.

### Backend
- Use `npm start` instead of `npm run dev`
- Run in a process manager (PM2, Docker, etc.)

### Deployment Options
- **Frontend**: Vercel, Netlify, AWS S3 + CloudFront
- **Backend**: Heroku, Railway, AWS EC2, DigitalOcean
- **Database**: MongoDB Atlas

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| `MONGODB_URI not set` | Add `MONGODB_URI` to backend `.env` |
| `Cannot connect to MongoDB` | Ensure MongoDB is running or Atlas URI is correct |
| `CORS errors` | Check backend CORS configuration |
| `API requests fail` | Verify `VITE_API_BASE` in frontend `.env` |
| `Blank charts` | Ensure expenses exist in database |

## 📝 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://127.0.0.1:27017/pft
JWT_SECRET=your_secret_key
PORT=4000
```

### Frontend (.env)
```
VITE_API_BASE=http://localhost:4000/api
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Created for personal finance management and learning full-stack development.

---

**Last Updated**: January 26, 2026
**Status**: ✅ Production Ready
