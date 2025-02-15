const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');
const authenticateJWT = require('../middleware/authenticateJWT');

router.get('/mapAPI', authenticateJWT, shopController.retrievePlaces);
router.get('/searchCafes', authenticateJWT, shopController.searchCafes);
router.post('/postCafes', authenticateJWT, shopController.postCafes);

module.exports = router;