document.addEventListener('DOMContentLoaded', () => {
    // Ouvrir et fermer le chatbot
    document.getElementById('start-chat').addEventListener('click', () => {
        document.getElementById('chat-bot').classList.remove('hidden');
        document.getElementById('chat-bot').classList.add('flex');
        addMessageToChat('bot', "Bonjour ! Je suis votre assistant virtuel. Je suis là pour vous aider à trouver la faculté qui correspond le mieux à vos intérêts, compétences et objectifs de carrière. Répondez simplement à quelques questions et je vous fournirai des recommandations personnalisées.");
        setTimeout(askNextQuestion, 8000); // Attend 8 secondes avant de poser la première question
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
    const responses = {
        greeting: [
            "Bonjour! Comment puis-je vous aider aujourd'hui?",
            "Salut! Quels sont vos centres d'intérêt?",
            "Bonjour! Parlez-moi de vos compétences principales."
        ],
        interestsQuestion: [
            "Quels sont vos centres d'intérêt? (par exemple : sciences, arts, commerce)",
            "Quels sujets vous passionnent le plus?",
            "De quoi aimez-vous parler ou lire dans votre temps libre?"
        ],
        skillsQuestion: [
            "Quelles sont vos compétences principales? (par exemple : mathématiques, dessin, gestion)",
            "Dans quels domaines excellez-vous?",
            "Quelles compétences trouvez-vous faciles à apprendre ou à pratiquer?"
        ],
        goalsQuestion: [
            "Quels sont vos objectifs de carrière? (par exemple : ingénieur, artiste, gestionnaire)",
            "Où vous voyez-vous dans 5 à 10 ans?",
            "Quels sont vos rêves ou aspirations professionnelles?"
        ],
        previousOptionQuestion: [
            "Quelle option avez-vous suivie à l'école secondaire? (par exemple : sciences, lettres, économie)",
            "Quel était votre principal domaine d'études au lycée?",
            "Quel programme avez-vous choisi pendant vos années scolaires?"
        ]
    };

    let currentQuestionIndex = 0;
    const answers = {
        interests: [],
        skills: [],
        goals: [],
        previousOption: []
    };

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

    // Fonction pour obtenir une réponse aléatoire
    function getRandomResponse(responseArray) {
        return responseArray[Math.floor(Math.random() * responseArray.length)];
    }

    // Fonction pour poser la prochaine question
    function askNextQuestion() {
        let question;
        switch (currentQuestionIndex) {
            case 0:
                question = getRandomResponse(responses.interestsQuestion);
                break;
            case 1:
                question = getRandomResponse(responses.skillsQuestion);
                break;
            case 2:
                question = getRandomResponse(responses.goalsQuestion);
                break;
            case 3:
                question = getRandomResponse(responses.previousOptionQuestion);
                break;
            default:
                getRecommendations();
                return;
        }

        setTimeout(() => {
            addMessageToChat('bot', question);
        }, 1000);
        
        currentQuestionIndex++;
    }

    // Fonction pour envoyer le message de l'utilisateur
    async function sendMessage() {
        const userInput = document.getElementById('user-input').value;
        if (!userInput.trim()) return;

        addMessageToChat('user', userInput);
        document.getElementById('user-input').value = '';
        handleUserResponse(userInput);
    }

    // Fonction pour traiter la réponse de l'utilisateur
    function handleUserResponse(message) {
        const doc = nlp(message);
        switch (currentQuestionIndex) {
            case 1:
                answers.interests = doc.nouns().out('array');
                break;
            case 2:
                answers.skills = doc.nouns().out('array');
                break;
            case 3:
                answers.goals = doc.nouns().out('array');
                break;
            case 4:
                answers.previousOption = doc.nouns().out('array');
                break;
        }
        askNextQuestion();
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
