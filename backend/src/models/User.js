const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  // categories are customizable per user
  categories: [{ type: String }],
  budgets: [{ category: String, limit: Number }],
  alerts: [{ message: String, createdAt: { type: Date, default: Date.now }, read: { type: Boolean, default: false } }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
