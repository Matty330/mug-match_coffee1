import express from 'express';
import shopController from '../controllers/shopController.js';
import authenticateJWT from '../middleware/authenticateJWT.js';

const router = express.Router();

router.get('/mapAPI', authenticateJWT, shopController.retrievePlaces);
router.get('/searchCafes', authenticateJWT, shopController.searchCafes);
router.post('/postCafes', authenticateJWT, shopController.postCafes);

export default router;
