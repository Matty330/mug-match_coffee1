const fetch = require('node-fetch');
const Auth = require('../utils/auth');
require('dotenv').config(); 

const retrievePlaces = async (req, res) => {
    try {
        const token = Auth.getToken(req);
        if (!token) {
            return res.status(401).json({ error: 'No authentication token found' });
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
};

const searchCafes = async (req, res) => {
    try {
        const token = Auth.getToken(req);
        if (!token) {
            return res.status(401).json({ error: 'No authentication token found' });
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
};

const postCafes = async (req, res) => {
    try {
        const token = Auth.getToken(req);
        if (!token) {
            return res.status(401).json({ error: 'No authentication token found' });
        }

        const cafeData = req.body;
        if (!cafeData || !cafeData.name || !cafeData.address) {
            return res.status(400).json({ error: 'Cafe name and address are required' });
        }

       
        const newCafe = await Cafe.create(cafeData);

        return res.status(201).json({ message: 'Cafe data posted successfully', data: newCafe });
    } catch (err) {
        console.error('Error posting cafe data', err);
        return res.status(500).json({ error: 'Error posting cafe data' });
    }
};

module.exports = {
    retrievePlaces,
    searchCafes,
    postCafes
};
