const pool = require ('../db');

const results = {
    A: "Caramel Macchiato - Sweet and creamy with hints of vanilla and caramel.",
    B: "Americano - A classic Italian coffee with a strong espresso base.",
    C: "Blonde Roast Drip Coffee - Light and mellow with subtle flavors.",
    D: "Cold Brew - Refreshing and smooth with a bold taste."
};

const submitQuiz = async (req, res) => {
    const { user_id, answers } = req.body;

    if (!user_id || !answers) {
       return res.status(400).json({error: 'Missing user ID or answers'});
    }

    try {
        const sortedAnswers = Object.entries(answers).sort((a, b) => b[1] -a [1]);
        const topChoice = sortedAnswers[0][0];
        const coffeeMatch = results[topChoice];

        await pool.query(
            "INSERT INTO preference (user_id, coffee_id) VALUES ($1, $2) ON CONFLICT (USER_ID DO UPDATESET coffee_id = $2",
            [user_id, coffeeMatch]
        );

        res.json({message: 'Quiz results saved!, coffeeMatch'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server error saving quiz'})
    }
};

const getQuizResults = async (req, res) => {
    const { user_id } = req.params;

    try {
        const result = await pool.query('SELECT coffee_id FROM preference WHERE user_id = $1', [user_id]);
        if (result.rows.length === 0) {
            return res.status(404).json({error: 'No quiz results found'});
        }
        res.json({ coffee_Match: result.rows[0].coffee_id});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error fetching quiz results'});
    }
};

module.exports = { submitQuiz, getQuizResults };