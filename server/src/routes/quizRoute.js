const express = require ('express');
const { submitQuiz, getQuizResults } = require('../controllers/quizController.js');
const { authenticateToken } = require('../middleware/aauthMiddleware');

const router = express.Router();

router.post('/submit', authenticateToken, submitQuiz);
router.get('/results/:user_id', authenticateToken, getQuizResults);

module.exports = router;