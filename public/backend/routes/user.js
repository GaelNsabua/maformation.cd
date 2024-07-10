const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const User = require('../models/user'); 

const router = express.Router();
const secretKey = process.env.JWT_SECRET; 

// Route pour l'enregistrement des utilisateurs
router.post('/register', [
    check('name').notEmpty().withMessage('Le nom est requis'),
    check('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
    check('email').isEmail().withMessage('Email invalide'),
    check('city').notEmpty().withMessage('La ville est requise'),
    check('province').notEmpty().withMessage('La province est requise'),
    check('birthDate').isDate().withMessage('Date de naissance invalide')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, password, email, city, province, birthDate } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email déjà utilisé' });
        }

        const newUser = new User({ name, password, email, city, province, birthDate });
        await newUser.save();

        res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// Route pour l'authentification des utilisateurs
router.post('/login', [
    check('email').isEmail().withMessage('Email invalide'),
    check('password').notEmpty().withMessage('Le mot de passe est requis')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
        }

        const payload = { id: user._id, email: user.email };
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

module.exports = router;
