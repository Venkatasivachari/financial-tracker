const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String },
  paymentMode: { type: String, enum: ['cash','card','online','other'], default: 'other' },
  date: { type: Date, required: true },
}, { timestamps: true });

ExpenseSchema.index({ user: 1, date: -1 }); // optimize queries by user and date
ExpenseSchema.index({ description: 'text', category: 'text' }); // enable text search on description & category

module.exports = mongoose.model('Expense', ExpenseSchema);
