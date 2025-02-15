const express = require ('express');
const router = express.Router();
const { getProfiles, createProfile } = require ('../../controllers/profileController');

router.get('/', getProfiles);

router.post('/', createProfile);

module.exports = router;