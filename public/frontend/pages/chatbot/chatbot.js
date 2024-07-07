document.addEventListener('DOMContentLoaded', () => {
    // Ouvrir et fermer le chatbot
    document.getElementById('start-chat').addEventListener('click', () => {
        document.getElementById('chat-bot').classList.remove('hidden');
        document.getElementById('chat-bot').classList.add('flex');
        startConversation()
        setTimeout(getNextQuestion, 6000); // Attend 8 secondes avant de poser la première question
    });

    document.getElementById('close-chat').addEventListener('click', () => {
        document.getElementById('chat-bot').classList.remove('flex');
        document.getElementById('chat-bot').classList.add('hidden');
    });

    // Envoyer le message de l'utilisateur
    document.getElementById('send-btn').addEventListener('click', sendMessage);
    document.getElementById('user-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Questions et réponses variées
    const questions = [
        "Quels sont vos centres d'intérêt ? (par exemple : sciences, arts, commerce)",
        "Quelles sont vos compétences principales ? (par exemple : mathématiques, dessin, gestion)",
        "Quels sont vos objectifs de carrière ? (par exemple : ingénieur, artiste, gestionnaire)",
        "Quelle option avez-vous suivie à l'école secondaire ? (par exemple : sciences, lettres, économie)"
    ];

    let currentQuestionIndex = 0;
    const answers = {
        interests: [],
        skills: [],
        goals: [],
        previousOption: []
    };

    function startConversation() {
        addMessageToChat('bot', 'Bonjour! Je suis votre assistant conseiller d\'orientation virtuel. Je suis là pour vous aider à trouver la faculté qui correspond le mieux à vos intérêts et compétences.');
    }

    // Fonction pour ajouter des messages à la conversation
    function addMessageToChat(sender, message) {
        const chatBody = document.getElementById('chat-body');
        const messageElem = document.createElement('div');
        messageElem.classList.add(sender === 'user' ? 'text-right' : 'text-left', 'mb-2');
        messageElem.innerHTML = `
        ${sender === 'user' ? ' ' : `
            <div class="w-7 h-7">
            <img src="./image/chatbot.png" alt="student" class="w-full h-auto object-cover">
            </div>`}
            <span class="inline-block bg-${sender === 'user' ? 'blue-500 text-white' : 'gray-200'} rounded p-2" id="mes"></span>`;
        chatBody.appendChild(messageElem);
        typing(message)
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Fonction pour créer l'animation de saisie
    function typing(message){
        let typed = new Typed('#mes',{
            strings: [message],
            typeSpeed: 15,
          })

        const element = document.getElementById('mes')
        element.innerHTML = message
        element.removeAttribute('id')
    }

    // // Fonction pour obtenir une réponse aléatoire
    // function getRandomResponse(responseArray) {
    //     return responseArray[Math.floor(Math.random() * responseArray.length)];
    // }

    // Fonction pour poser la prochaine question
    const getNextQuestion = () => {
        if (currentQuestionIndex < questions.length) {
            addMessageToChat('bot', questions[currentQuestionIndex]);
        } else {
            getRecommendations();
        }
    };
    //     setTimeout(() => {
    //         addMessageToChat('bot', question);
    //     }, 1000);
        
    //     currentQuestionIndex++;
    // }

    // Fonction pour envoyer le message de l'utilisateur
    async function sendMessage() {
        const userInput = document.getElementById('user-input').value;
        if (!userInput.trim()) return;

        addMessageToChat('user', userInput);
        document.getElementById('user-input').value = '';
        handleUserResponse(userInput);
    }

    // Fonction pour traiter la réponse de l'utilisateur
    async function handleUserResponse(message) {
        const doc = nlp(message);
    
        // Extraire différents types de mots
        const nouns = doc.nouns().out('array');
        const adjectives = doc.adjectives().out('array');
        const verbs = doc.verbs().out('array');
    
        // Combiner les résultats
        const extractedWords = [...nouns, ...adjectives, ...verbs];
        console.log(extractedWords)
    
        switch (currentQuestionIndex) {
            case 0:
                answers.interests = extractedWords;
                break;
            case 1:
                answers.skills = extractedWords;
                break;
            case 2:
                answers.goals = extractedWords;
                break;
            case 3:
                answers.previousOption = extractedWords;
                break;
        }
    
        if (extractedWords.length === 0) {
            addMessageToChat('bot', 'Je n\'ai pas bien compris. Pouvez-vous reformuler s\'il vous plaît?');
        } else {
            currentQuestionIndex++;
            getNextQuestion();
        }
    }
    

    // Fonction pour obtenir des recommandations
    async function getRecommendations() {
        console.log(answers)
        try {
            const response = await fetch('http://localhost:5000/recommendation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(answers)
            });

            if (response.ok) {
                const data = await response.json();
                if (data.length > 0) {
                    addMessageToChat('bot', 'Voici les facultés recommandées pour vous :');
                    data.forEach(faculty => {
                        addMessageToChat('bot', `${faculty.name} : ${faculty.description}`);
                    });
                    displayRecommendations(data);
                } else {
                    addMessageToChat('bot', 'Désolé, je n\'ai aucune faculté ou filière à vous proposer pour le moment 😥');
                    addMessageToChat('bot', 'Veuillez réessayer en répondant de manière plus précise afin de me permettre de vous recommander des options adaptées à vos préférences.');
                }
            } else {
                addMessageToChat('bot', 'Erreur : Impossible de récupérer les recommandations.');
            }
        } catch (error) {
            addMessageToChat('bot', 'Erreur de connexion. Veuillez réessayer plus tard.');
        }
    }

    // Fonction pour afficher les recommandations
    function displayRecommendations(recommendations) {
        const resultsSection = document.getElementById('results-section');
        const results = document.getElementById('results');
        results.innerHTML = '';

        recommendations.forEach(faculty => {
            const facultyElem = document.createElement('div');
            facultyElem.classList.add('bg-white', 'rounded-lg', 'shadow', 'p-6');
            facultyElem.innerHTML = `
                <h3 class="text-xl font-bold mb-2">${faculty.name}</h3>
                <p class="mb-4">${faculty.description}</p>
                <button class="bg-blue-600 text-white py-2 px-4 rounded mt-2" onclick="showFeedbackForm('${faculty._id}')">En savoir plus</button>
            `;
            results.appendChild(facultyElem);
        });

        resultsSection.style.display = 'block';
    }

    // // Poser la première question (l'introduction est gérée au début)
    // askNextQuestion();
});
