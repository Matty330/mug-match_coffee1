const express = require ('express');
const { signup, login, getProfile, updateProfile } = require ('../controllers/userController.js');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', getProfile);
router.put('/updateProfile', updateProfile);

module.exports = router;