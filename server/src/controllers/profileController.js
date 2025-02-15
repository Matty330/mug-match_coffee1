const Profile = require( '/models/profileModel');

const getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.findAll();
        res.json(profiles);
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
};

const createProfile = async (req, res) =>{
    const {email, username, password } = req.body;
    try {
        const newProfile = await Profile.create({ email, username, password });
        res.status(201).json(newProfile);
    } catch (error) {
        res.status(400).json({ message: 'Error creating profile'});
    }
};

module.exports = { getProfiles, createProfile }