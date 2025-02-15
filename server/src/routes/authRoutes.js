const express = require('express');
const { signup, login, logout } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.get('/dashboard', authenticateToken, (req, res) => {
  res.json({ message: 'Welcome to your dashboard!', user: req.user });
});

module.exports = router;
