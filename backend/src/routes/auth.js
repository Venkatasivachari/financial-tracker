const express = require('express');
const { signup, login, me } = require('../controllers/authController');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const validate = (checks) => async (req, res, next) => {
  await Promise.all(checks.map(c => c.run(req)));
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

router.post('/signup', validate([
  body('name').isLength({ min: 2 }),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
]), signup);

router.post('/login', validate([
  body('email').isEmail(),
  body('password').exists()
]), login);

router.get('/me', auth, me);

module.exports = router;
