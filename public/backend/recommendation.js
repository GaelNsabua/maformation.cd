const Faculty = require('./models/faculte');

const recommendFaculties = async (answers) => {
    try {
        const { interests, skills, goals, previousOption } = answers;
        
        const weights = {
            interests: 0.3,
            skills: 0.3,
            goals: 0.2,
            previousOption: 0.2
        };

        const pipeline = [
            {
                $addFields: {
                    interestsScore: {
                        $cond: {
                            if: { $isArray: "$requirements.interests" },
                            then: { $size: { $setIntersection: ["$requirements.interests", interests] } },
                            else: 0
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
                $addFields: {
                    score: {
                        $add: [
                            { $multiply: [{ $divide: ["$interestsScore", { $size: "$requirements.interests" }] }, weights.interests] },
                            { $multiply: [{ $divide: ["$skillsScore", { $size: "$requirements.skills" }] }, weights.skills] },
                            { $multiply: [{ $divide: ["$goalsScore", { $size: "$requirements.goals" }] }, weights.goals] },
                            { $multiply: [{ $divide: ["$previousOptionScore", { $size: "$requirements.previousOption" }] }, weights.previousOption] }
                        ]
                    }
                }
            },
            { $match: { score: { $gt: 0 } } },
            { $sort: { score: -1 } }
        ];

        const recommendedFaculties = await Faculty.aggregate(pipeline).exec();

        return recommendedFaculties;
    } catch (error) {
        throw new Error('Erreur lors de la recommandation des facultés');
    }
};

module.exports = {
    recommendFaculties
};
