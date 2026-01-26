const express = require('express');
const { Parser } = require('json2csv');
const Expense = require('../models/Expense');
const auth = require('../middleware/auth');
const router = express.Router();

router.use(auth);

router.get('/csv', async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    const q = { user: req.user._id };
    if (startDate || endDate) q.date = {};
    if (startDate) q.date.$gte = new Date(startDate);
    if (endDate) q.date.$lte = new Date(endDate);
    const rows = await Expense.find(q).sort({ date: -1 }).lean();
    const fields = ['date','amount','category','description','paymentMode'];
    const parser = new Parser({ fields });
    const csv = parser.parse(rows.map(r => ({ date: r.date.toISOString(), amount: r.amount, category: r.category, description: r.description, paymentMode: r.paymentMode })));
    res.header('Content-Type','text/csv');
    res.attachment(`expenses_${Date.now()}.csv`);
    res.send(csv);
  } catch (err) { next(err); }
});

module.exports = router;