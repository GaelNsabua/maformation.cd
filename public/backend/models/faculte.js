const mongoose = require('mongoose');

// Schéma pour les options
const optionSchema = new mongoose.Schema({
    name: { type: String, index: true },
    description: { type: String, index: true }
});

// Schéma pour les feedbacks
const feedbackSchema = new mongoose.Schema({
    feedback: { type: String, index: true },
    date: { type: Date, default: Date.now}
});

// Schéma pour les facultés
const facultySchema = new mongoose.Schema({
    name: { type: String, required: true, index: true },
    description: { type: String, required: true, index: true },
    options: [optionSchema],
    requirements: {
        interests: { type: [String], index: true },
        skills: { type: [String], index: true },
        goals: { type: [String], index: true },
        previousOption: { type: [String], index: true }
    },
    feedbacks: [feedbackSchema]
});

// index texte pour les champs de recherche
facultySchema.index({
    name: 'text',
    description: 'text',
    'options.name': 'text',
    'options.description': 'text',
    'feedbacks.feedback': 'text',
    'requirements.interests': 'text',
    'requirements.skills': 'text',
    'requirements.goals': 'text',
    'requirements.previousOption': 'text'
});

const faculte = mongoose.model('facultes', facultySchema);

module.exports = faculte;
