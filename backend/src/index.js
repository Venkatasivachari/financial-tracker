require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./utils/db');
const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expenses');
const categoryRoutes = require('./routes/categories');
const exportRoutes = require('./routes/export');
const budgetRoutes = require('./routes/budgets');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// CORS configuration - allow localhost for development, specific domain for production
// const allowedOrigins = process.env.NODE_ENV === 'production'
//   ? ['https://your-frontend-domain.com']
//   : ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'];
// app.use(cors({ origin: allowedOrigins }));


app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://financial-tracker-eta-nine.vercel.app'
  ],
  credentials: true
}));



app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/export', exportRoutes);
app.use('/api/budgets', budgetRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('Failed to connect to DB', err);
  process.exit(1);
});
