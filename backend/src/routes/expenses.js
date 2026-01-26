const express = require('express');
const { createExpense, updateExpense, deleteExpense, getExpenses, summary } = require('../controllers/expenseController');
const auth = require('../middleware/auth');
const { body, query, validationResult } = require('express-validator');
const router = express.Router();

const validate = (checks) => async (req, res, next) => {
  await Promise.all(checks.map(c => c.run(req)));
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

router.use(auth);
router.post('/', validate([
  body('amount').isNumeric(),
  body('category').isString().notEmpty(),
  body('date').isISO8601()
]), createExpense);
router.get('/', validate([
  query('page').optional().toInt(),
  query('limit').optional().toInt()
]), getExpenses);
router.get('/summary', summary);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;