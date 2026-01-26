const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

// categories stored in user document - simple endpoints to manage them
router.use(auth);

router.get('/', (req, res) => {
  res.json({ categories: req.user.categories || [] });
});

router.post('/', async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Missing name' });
    if (!req.user.categories) req.user.categories = [];
    req.user.categories.push(name);
    await req.user.save();
    res.status(201).json({ categories: req.user.categories });
  } catch (err) { next(err); }
});

router.delete('/:name', async (req, res, next) => {
  try {
    req.user.categories = (req.user.categories || []).filter(c => c !== req.params.name);
    await req.user.save();
    res.json({ categories: req.user.categories });
  } catch (err) { next(err); }
});

module.exports = router;