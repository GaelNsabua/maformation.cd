const Faculty = require('./models/faculte');

// Fonction de recommandation
const recommendFaculties = async (answers) => {
    try {
        const { interests, skills, goals, previousOption } = answers;
        const faculties = await Faculty.find();
        
        const weights = {
            interests: 0.3,
            skills: 0.3,
            goals: 0.2,
            previousOption: 0.2
        };

        const calculateScore = (faculty) => {
            let score = 0;
            score += (faculty.requirements.interests.filter(interest => interests.includes(interest)).length / faculty.requirements.interests.length) * weights.interests;
            score += (faculty.requirements.skills.filter(skill => skills.includes(skill)).length / faculty.requirements.skills.length) * weights.skills;
            score += (faculty.requirements.goals.filter(goal => goals.includes(goal)).length / faculty.requirements.goals.length) * weights.goals;
            score += (faculty.requirements.previousOption.filter(option => previousOption.includes(option)).length / faculty.requirements.previousOption.length) * weights.previousOption;
            return score;
        };

        const recommendedFaculties = faculties
            .map(faculty => ({ ...faculty.toObject(), score: calculateScore(faculty) }))
            .sort((a, b) => b.score - a.score)
            .filter(faculty => faculty.score > 0);

        return recommendedFaculties;
    } catch (error) {
        throw new Error('Erreur lors de la recommandation des facultés');
    }
};


module.exports = {
    recommendFaculties
};
