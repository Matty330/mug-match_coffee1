const express = require ('express');
const router = express.Router();
const { getFavorites, createFavorites } = require ('../../controllers/favController.js');

router.get('/', getFavorites);

router.post('/', createFavorites);

module.exports = router;