require('dotenv').config();
const connectDB = require('../utils/db');
const User = require('../models/User');
const Expense = require('../models/Expense');
const bcrypt = require('bcrypt');

async function seed() {
  await connectDB();
  await User.deleteMany({});
  await Expense.deleteMany({});

  const passwordHash = await bcrypt.hash('password123', 12);
  const user = await User.create({ name: 'Demo User', email: 'demo@local', passwordHash, categories: ['Food','Transport','Utilities','Entertainment'] });

  const now = new Date();
  const sample = [
    { user: user._id, amount: 12.5, category: 'Food', description: 'Lunch', paymentMode: 'card', date: new Date(now.getFullYear(), now.getMonth(), 2) },
    { user: user._id, amount: 45, category: 'Transport', description: 'Fuel', paymentMode: 'cash', date: new Date(now.getFullYear(), now.getMonth(), 5) },
    { user: user._id, amount: 120, category: 'Utilities', description: 'Electric bill', paymentMode: 'online', date: new Date(now.getFullYear(), now.getMonth() - 1, 28) },
    { user: user._id, amount: 200, category: 'Entertainment', description: 'Concert', paymentMode: 'card', date: new Date(now.getFullYear(), now.getMonth() - 2, 10) },
  ];

  await Expense.insertMany(sample);
  console.log('Seed complete. Demo user credentials: demo@local / password123');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});