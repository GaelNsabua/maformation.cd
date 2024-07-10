const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { recommendFaculties } = require('../recommendation');

// Route de recommandation
router.post('/', auth, async (req, res) => {
    try {
        const answers = req.body;
        const faculties = await recommendFaculties(answers); //Appel à la fonction de recommendation
        res.status(200).json(faculties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
