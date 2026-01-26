const express = require('express');
const auth = require('../middleware/auth');
const { setBudget, getBudgets, getAlerts } = require('../controllers/budgetController');
const router = express.Router();

router.use(auth);
router.get('/', getBudgets);
router.post('/', setBudget);
router.get('/alerts', getAlerts);

module.exports = router;