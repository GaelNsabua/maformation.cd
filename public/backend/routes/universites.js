const express = require('express');
const router = express.Router();
const Universite = require('../models/universite');


//Route pour rechercher des universités par mot clé
router.get('/search', async (req, res) => {
    try {
      const query = req.query.q;
      const budget = parseFloat(req.query.budget);
  
      const matchStage = {
        $or: [
          { sigle: { $regex: query, $options: 'i' } },
          { denomination: { $regex: query, $options: 'i' } },
          { statut: { $regex: query, $options: 'i' } },
          { territoire: { $regex: query, $options: 'i' } },
          { province: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
          { 'facultes.nom': { $regex: query, $options: 'i' } },
          { 'facultes.options': { $regex: query, $options: 'i' } },
          { 'personnalites.nom': { $regex: query, $options: 'i' } },
          { 'personnalites.profession': { $regex: query, $options: 'i' } }
        ]
      };
  
      const budgetStage = (!isNaN(budget)) ? {
        $and: [
          { 'prixFrais.min': { $lte: budget } },
          { 'prixFrais.max': { $gte: budget } }
        ]
      } : {};
  
      const result = await Universite.aggregate([
        { $match: matchStage },
        { $match: budgetStage }
      ]);
  
      if (result.length === 0) {
        return res.status(404).json({ message: 'Aucune université trouvée.' });
      }
  
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
    }
  })


// Créer une ou plusieurs universités
router.post('/', async (req, res) => {
    try {
        const universites = req.body; // Le corps de la requête doit être un tableau d'universités
        if (!Array.isArray(universites)) {
            return res.status(400).send({ error: 'Le corps de la requête doit être un tableau d\'universités' });
        }
        const result = await Universite.insertMany(universites);
        res.status(201).send(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Lire toutes les universités
router.get('/', async (req, res) => {
    try {
        const universites = await Universite.find();
        res.send(universites);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Route pour récupérer les détails d'une université par ID
router.get('/university/:id', async (req, res) => {
  const { id } = req.params;
  const university = await Universite.findById(id);
  if (!university) {
      return res.status(404).send('Université non trouvée');
  }
  res.json(university);
});

// Mettre à jour une université par ID
router.patch('/:id', async (req, res) => {
    try {
        const universite = await Universite.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!universite) return res.status(404).send();
        res.send(universite);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Supprimer une université par ID
router.delete('/:id', async (req, res) => {
    try {
        const universite = await Universite.findByIdAndDelete(req.params.id);
        if (!universite) return res.status(404).send();
        res.send(universite);
    } catch (err) {
        res.status(500).send(err);
    }
});


module.exports = router;
