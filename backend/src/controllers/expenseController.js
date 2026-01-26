const Expense = require('../models/Expense');
const User = require('../models/User');

// Create expense
exports.createExpense = async (req, res, next) => {
  try {
    const { amount, category, description, paymentMode, date } = req.body;
    if (!amount || !category || !date) return res.status(400).json({ message: 'Missing required fields' });
    const expense = await Expense.create({
      user: req.user._id,
      amount,
      category,
      description,
      paymentMode,
      date: new Date(date)
    });
    // check budget and create alert if exceeded
    const user = await User.findById(req.user._id);
    const budget = (user.budgets || []).find(b => b.category === category);
    if (budget && expense.amount > budget.limit) {
      const message = `Expense ${expense.amount} in ${category} exceeded your budget of ${budget.limit}`;
      user.alerts = user.alerts || [];
      user.alerts.push({ message });
      await user.save();
      expense._warning = message; // attach for immediate response
    }
    res.status(201).json(expense);
  } catch (err) { next(err); }
};

// Update expense
exports.updateExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findOneAndUpdate({ _id: id, user: req.user._id }, req.body, { new: true });
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json(expense);
  } catch (err) { next(err); }
};

// Delete expense
exports.deleteExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findOneAndDelete({ _id: id, user: req.user._id });
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};

// Get expenses with filters & pagination
exports.getExpenses = async (req, res, next) => {
  try {
    const { page = 1, limit = 25, startDate, endDate, category, min, max, q } = req.query;
    const query = { user: req.user._id };
    if (startDate || endDate) query.date = {};
    if (startDate) query.date.$gte = new Date(startDate);
    if (endDate) query.date.$lte = new Date(endDate);
    if (category) query.category = category;
    if (min || max) query.amount = {};
    if (min) query.amount.$gte = Number(min);
    if (max) query.amount.$lte = Number(max);
    if (q) query.$text = { $search: q }; // requires text index if enabled

    const expenses = await Expense.find(query)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Expense.countDocuments(query);
    res.json({ data: expenses, total });
  } catch (err) { next(err); }
};

// Summary endpoints
exports.summary = async (req, res, next) => {
  try {
    const { period = 'month' } = req.query; // month | year
    const match = { user: req.user._id };
    const groupBy = period === 'year' ? { year: { $year: '$date' }, month: { $month: '$date' } } : { month: { $month: '$date' } };
    const pipeline = [
      { $match: match },
      { $group: { _id: period === 'year' ? { year: '$year', month: '$month' } : '$month', total: { $sum: '$amount' } } },
      { $sort: { '_id': 1 } }
    ];
    // Simpler monthly totals by category
    const byCategory = await Expense.aggregate([
      { $match: match },
      { $group: { _id: '$category', total: { $sum: '$amount' } } },
      { $sort: { total: -1 } }
    ]);
    res.json({ byCategory });
  } catch (err) { next(err); }
};