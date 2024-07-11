const express = require('express');
const router = express.Router();
const Faculty = require('../models/faculte');
const auth = require('../middleware/auth');

router.post('/:id', auth, async (req, res) => {
    try {
        const { feedback } = req.body;
        const faculty = await Faculty.findById(req.params.id);

        if (!faculty) {
            return res.status(404).json({ error: 'Faculté non trouvée' });
        }

        // Ajout des feedback à la faculté
        faculty.feedbacks.push({ feedback });
        await faculty.save();

        res.status(200).json({ message: 'Feedback enregistré avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
