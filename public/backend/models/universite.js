const mongoose = require('mongoose');

// Schéma pour les personnalités importantes liées à chaque université
const PersonnaliteSchema = new mongoose.Schema({
    identite: { type: String, required: true },
    photo: { type: String, required: true },
    profession: { type: String, required: true },
    description: { type: String, required: true }
});

// Schéma pour les facultés liées à chaque université
const faculteSchema = new mongoose.Schema({
    nom: { type: String, required: true, index: true },
    options: { type: [String], required: true, index: true }
});

// Schéma pour les avis
const avisSchema = new mongoose.Schema({
    utilisateur: { type: String, required: true },
    email: { type: String, required: true },
    note: { type: Number, required: true, min: 1, max: 5 },
    commentaire: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

// Schéma pour les universités
const UniversiteSchema = new mongoose.Schema({
    sigle: { type: String, required: true },
    denomination: { type: String, required: true },
    statut: { type: String, required: true },
    territoire: { type: String, required: true },
    province: { type: String, required: true },
    description: { type: [String], required: true },
    facultes: [faculteSchema],
    images: { type: [String], required: true },
    logementDisponible: { type: Boolean, required: true },
    prixFrais: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    },
    contact: {
        email: { type: String, required: true },
        telephone: { type: String, required: true },
        adresse: { type: String, required: true },
        lien: { type: String, required: true }
    },
    personnalitesImportantes: [PersonnaliteSchema],
    dateAjout: { type: Date, default: Date.now },
    avis: [avisSchema],
    display: { type: Boolean, default: true }
});


// Index pour les recherches textuelles
UniversiteSchema.index({
    sigle: 'text',
    denomination: 'text',
    statut: 'text',
    territoire: 'text',
    province: 'text',
    description: 'text',
    'facultes.nom': 'text',
    'facultes.options': 'text',
    'contact.email': 'text',
    'contact.adresse': 'text',
    'contact.telephone': 'text',
    'personnalitesImportantes.nom': 'text',
    'personnalitesImportantes.profession': 'text'
  });
  
  // Index pour les filtres par budget
UniversiteSchema.index({ 'prixFrais.min': 1, 'prixFrais.max': 1 });

module.exports = mongoose.model('Universite', UniversiteSchema);
