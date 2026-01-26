const User = require('../models/User');

exports.setBudget = async (req, res, next) => {
  try {
    const { category, limit } = req.body;
    if (!category || typeof limit !== 'number') return res.status(400).json({ message: 'Missing fields' });
    const idx = req.user.budgets?.findIndex(b => b.category === category);
    if (idx === -1) {
      req.user.budgets.push({ category, limit });
    } else if (idx >= 0) {
      req.user.budgets[idx].limit = limit;
    } else {
      req.user.budgets = [{ category, limit }];
    }
    await req.user.save();
    res.json({ budgets: req.user.budgets });
  } catch (err) { next(err); }
};

exports.getBudgets = async (req, res, next) => {
  try {
    res.json({ budgets: req.user.budgets || [] });
  } catch (err) { next(err); }
};

exports.getAlerts = async (req, res, next) => {
  try {
    res.json({ alerts: req.user.alerts || [] });
  } catch (err) { next(err); }
};
