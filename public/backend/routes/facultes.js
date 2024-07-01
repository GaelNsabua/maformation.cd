const express = require('express');
const router = express.Router();
// const Universite = require('../models/universite');
const Faculty = require('../models/faculte');

// Route pour ajouter une nouvelle faculté
router.post('/', async (req, res) => {
    try {
        const faculty = req.body
        if (!Array.isArray(faculty)) {
            return res.status(400).send({ error: 'Le corps de la requête doit être un tableau de facultés' });
        }
        const result = await Faculty.insertMany(faculty);
        res.status(201).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Route pour obtenir toutes les facultés
router.get('/', async (req, res) => {
    try {
        const faculties = await Faculty.find();
        res.status(200).send(faculties);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;