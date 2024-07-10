const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Universite = require('../models/universite'); // Assurez-vous que le chemin est correct

// Ajouter un avis
router.post('/universite/:id/avis', [
    body('utilisateur').isString().withMessage('Le nom de l\'utilisateur est requis.'),
    body('email').isEmail().withMessage('Un email valide est requis.'),
    body('note').isInt({ min: 1, max: 5 }).withMessage('La note doit être entre 1 et 5.'),
    body('commentaire').isString().withMessage('Le commentaire est requis.')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { utilisateur, email, note, commentaire } = req.body;

    try {
        const universite = await Universite.findById(id);
        if (!universite) {
            return res.status(404).json({ error: 'Université non trouvée.' });
        }

        universite.avis.push({ utilisateur, email, note, commentaire });
        await universite.save();

        res.status(201).json({ message: 'Avis ajouté avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'avis.' });
    }
});

// Récupérer les avis d'une université
router.get('/universite/:id/avis', async (req, res) => {
    const { id } = req.params;

    try {
        const universite = await Universite.findById(id).select('avis');
        if (!universite) {
            return res.status(404).json({ error: 'Université non trouvée.' });
        }

        res.status(200).json(universite.avis);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des avis.' });
    }
});

// Mettre à jour la propriété display d'une université
router.put('/universite/:id/display', [
    body('display').isBoolean().withMessage('La propriété display doit être un booléen.')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { display } = req.body;

    try {
        const universite = await Universite.findByIdAndUpdate(id, { display }, { new: true });
        if (!universite) {
            return res.status(404).json({ error: 'Université non trouvée.' });
        }

        res.status(200).json(universite);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'affichage de l\'université.' });
    }
});

module.exports = router;
