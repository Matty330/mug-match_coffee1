import express from 'express';
import shopController from '../controllers/shopController.js';
import authenticateJWT from '../middleware/authenticateJWT.js';

const router = express.Router();

router.get('/mapAPI', authenticateJWT, (req, res) => shopController.retrievePlaces(req, res));
router.get('/searchCafes', authenticateJWT, (req, res) => shopController.searchCafes(req, res));
router.post('/postCafes', authenticateJWT, (req, res) => shopController.postCafes(req, res));

export default router;
