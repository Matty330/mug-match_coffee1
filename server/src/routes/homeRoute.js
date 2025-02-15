import express from 'express';
import Coffee from '../models/coffeeModel.js';

const router = express.Router();

router.get('/coffee', async (req, res) => {
    try {
        const coffeeData = await Coffee.findAll();
        res.json(coffeeData); 
    } catch (error) {
        console.error("Error fetching coffee data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
