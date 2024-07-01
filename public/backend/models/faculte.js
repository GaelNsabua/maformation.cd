const mongoose = require('mongoose');

// Schéma pour les options
const optionSchema = new mongoose.Schema({
    name: String,
    description: String
});

// Schéma pour les feedbacks
const feedbackSchema = new mongoose.Schema({
    feedback: String,
    date: { type: Date, default: Date.now }
});

// Schéma pour les facultés
const facultySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    options: [optionSchema],
    requirements: {
        interests: [String],
        skills: [String],
        goals: [String],
        previousOption: [String]
    },
    feedbacks: [feedbackSchema] 
});

const faculte = mongoose.model('facultes', facultySchema);

module.exports = faculte;
