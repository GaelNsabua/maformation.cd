const Faculty = require('./models/faculte');

// Fonction de recommandation des facultés
const recommendFaculties = async (answers) => {
    try {
        // Déstructuration des réponses de l'utilisateur
        const { interests, skills, goals, previousOption } = answers;

        // Poids pour chaque critère de correspondance
        const weights = {
            interests: 0.3,
            skills: 0.3,
            goals: 0.2,
            previousOption: 0.2
        };

        // Pipeline d'agrégation MongoDB pour calculer les scores de correspondance et trier les facultés
        const pipeline = [
            {
                // Ajout des champs pour les scores de correspondance
                $addFields: {
                    interestsScore: {
                        $cond: {
                            if: { $isArray: "$requirements.interests" }, // Vérifie si requirements.interests est un tableau
                            then: { $size: { $setIntersection: ["$requirements.interests", interests] } }, // Calcul de l'intersection et obtention de la taille
                            else: 0 // Si ce n'est pas un tableau, définir le score à 0
                        }
                    },
                    skillsScore: {
                        $cond: {
                            if: { $isArray: "$requirements.skills" },
                            then: { $size: { $setIntersection: ["$requirements.skills", skills] } },
                            else: 0
                        }
                    },
                    goalsScore: {
                        $cond: {
                            if: { $isArray: "$requirements.goals" },
                            then: { $size: { $setIntersection: ["$requirements.goals", goals] } },
                            else: 0
                        }
                    },
                    previousOptionScore: {
                        $cond: {
                            if: { $isArray: "$requirements.previousOption" },
                            then: { $size: { $setIntersection: ["$requirements.previousOption", previousOption] } },
                            else: 0
                        }
                    }
                }
            },
            {
                // Ajout d'un champ pour le score total
                $addFields: {
                    score: {
                        $add: [
                            { $multiply: [{ $divide: ["$interestsScore", { $size: "$requirements.interests" }] }, weights.interests] }, // Pondérer le score des intérêts
                            { $multiply: [{ $divide: ["$skillsScore", { $size: "$requirements.skills" }] }, weights.skills] }, // Pondérer le score des compétences
                            { $multiply: [{ $divide: ["$goalsScore", { $size: "$requirements.goals" }] }, weights.goals] }, // Pondérer le score des objectifs
                            { $multiply: [{ $divide: ["$previousOptionScore", { $size: "$requirements.previousOption" }] }, weights.previousOption] } // Pondérer le score des options précédentes
                        ]
                    }
                }
            },
            { $match: { score: { $gt: 0 } } }, // Filtrer les facultés avec un score > 0
            { $sort: { score: -1 } } // Trier les facultés par score décroissant
        ];

        // Exécuter le pipeline d'agrégation et obtenir les facultés recommandées
        const recommendedFaculties = await Faculty.aggregate(pipeline).exec();

        return recommendedFaculties;
    } catch (error) {
        // Gérer les erreurs et lancer une nouvelle erreur avec un message spécifique
        throw new Error('Erreur lors de la recommandation des facultés');
    }
};

module.exports = {
    recommendFaculties
};
