import fetch from 'node-fetch';
import dotenv from 'dotenv';
import Cafe from '../models/coffeeModel.js'; // Import Cafe model if saving cafes

dotenv.config();

const shopController = {
    retrievePlaces: async (req, res) => {
        try {
            const token = req.header('Authorization')?.split(' ')[1];

            if (!token) {
                return res.status(401).json({ error: 'No authentication token provided' });
            }

            const { latitude, longitude } = req.query;
            if (!latitude || !longitude) {
                return res.status(400).json({ error: 'Latitude and longitude are required' });
            }

            const apiKey = process.env.GOOGLE_MAPS_API_KEY;
            const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=cafe&key=${apiKey}`;

            const response = await fetch(url);
            if (!response.ok) {
                console.error(`Error ${response.status} - ${response.statusText}`);
                return res.status(response.status).json({ error: 'Error retrieving map data, check network or API key!' });
            }

            const data = await response.json();
            return res.json(data);
        } catch (err) {
            console.error('Error retrieving map place', err);
            return res.status(500).json({ error: 'Error retrieving map place' });
        }
    },

    searchCafes: async (req, res) => {
        try {
            const token = req.header('Authorization')?.split(' ')[1];

            if (!token) {
                return res.status(401).json({ error: 'No authentication token provided' });
            }

            const { latitude, longitude } = req.query;
            if (!latitude || !longitude) {
                return res.status(400).json({ error: 'Latitude and longitude are required' });
            }

            const apiKey = process.env.GOOGLE_MAPS_API_KEY;
            const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=cafe&key=${apiKey}`;

            const response = await fetch(url);
            if (!response.ok) {
                console.error(`Error ${response.status} - ${response.statusText}`);
                return res.status(response.status).json({ error: 'Error retrieving cafe data' });
            }

            const data = await response.json();
            return res.json(data);
        } catch (err) {
            console.error('Error retrieving cafes', err);
            return res.status(500).json({ error: 'Error retrieving cafes' });
        }
    },

    postCafes: async (req, res) => {
        try {
            const token = req.header('Authorization')?.split(' ')[1];

            if (!token) {
                return res.status(401).json({ error: 'No authentication token provided' });
            }

            const cafeData = req.body;
            if (!cafeData || !cafeData.name || !cafeData.address) {
                return res.status(400).json({ error: 'Cafe name and address are required' });
            }

            // Save new cafe to database
            const newCafe = await Cafe.create(cafeData);
            return res.status(201).json({ message: 'Cafe data posted successfully', data: newCafe });
        } catch (err) {
            console.error('Error posting cafe data', err);
            return res.status(500).json({ error: 'Error posting cafe data' });
        }
    }
};

export default shopController;
