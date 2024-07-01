//const nlp = require('compromise');

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('start-chat').addEventListener('click', () => {
        document.getElementById('chat-bot').classList.remove('hidden');
        document.getElementById('chat-bot').classList.add('flex');
    });

    document.getElementById('close-chat').addEventListener('click', () => {
        document.getElementById('chat-bot').classList.remove('flex');
        document.getElementById('chat-bot').classList.add('hidden');
    });


    document.getElementById('send-btn').addEventListener('click', sendMessage);

    document.getElementById('user-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // const chatContainer = document.getElementById('chat-container');
    // const userInput = document.getElementById('user-input');
    // const sendButton = document.getElementById('send-button');

    const questions = [
        "Parlez-moi de vos centres d'intérêt. Par exemple, aimez-vous les sciences, les arts, ou le commerce ?",
        "Quelles sont vos compétences principales ? Par exemple, êtes-vous bon en mathématiques, dessin, ou gestion ?",
        "Quels sont vos objectifs de carrière ? Par exemple, voulez-vous devenir ingénieur, artiste, ou gestionnaire ?",
        "Quelle option avez-vous suivie à l'école secondaire ? Par exemple, avez-vous étudié les sciences, les lettres, ou l'économie ?"
    ];

    let currentQuestionIndex = 0;
    const answers = {
        interests: [],
        skills: [],
        goals: [],
        previousOption: []
    };

    // const appendMessage = (message, sender) => {
    //     const messageElement = document.createElement('div');
    //     messageElement.classList.add('chat-message', sender === 'user' ? 'user' : 'bot');
    //     messageElement.textContent = message;
    //     chatContainer.appendChild(messageElement);
    //     chatContainer.scrollTop = chatContainer.scrollHeight;
    // };

    function addMessageToChat(sender, message) {
        const chatBody = document.getElementById('chat-body');
        const messageElem = document.createElement('div');
        messageElem.classList.add(sender === 'user' ? 'text-right' : 'text-left', 'mb-2');
        messageElem.innerHTML = `<span class="inline-block bg-${sender === 'user' ? 'blue-500 text-white' : 'gray-200'} rounded p-2">${message}</span>`;
        chatBody.appendChild(messageElem);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    const getNextQuestion = () => {
        if (currentQuestionIndex < questions.length) {
            addMessageToChat('bot', questions[currentQuestionIndex]);
        } else {
            getRecommendations();
        }
    };

    const getRecommendations = async () => {
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
                // const recommendationsContainer = document.getElementById('recommendations');
                addMessageToChat('bot', 'Voici les facultés recommandées pour vous :');
                data.forEach(faculty => {
                    addMessageToChat('bot', `${faculty.name} : ${faculty.description}`);
                });

                displayRecommendations(data)
                
                
            } else {
                addMessageToChat('bot', 'Erreur : Impossible de récupérer les recommandations.');
            }
        } catch (error) {
            addMessageToChat('bot', 'Erreur de connexion. Veuillez réessayer plus tard.');
        }
    };

    // sendButton.addEventListener('click', () => {
    //     const message = userInput.value.trim();
    //     if (message !== '') {
    //         appendMessage(message, 'user');
    //         userInput.value = '';
    //         handleUserResponse(message);
    //     }
    // });

    // userInput.addEventListener('keypress', (event) => {
    //     if (event.key === 'Enter') {
    //         sendButton.click();
    //     }
    // });

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

    async function sendMessage() {
        const userInput = document.getElementById('user-input').value;
        if (!userInput.trim()) return;

        addMessageToChat('user', userInput);
        document.getElementById('user-input').value = '';
        handleUserResponse(userInput);
    }

    const handleUserResponse = (message) => {
        const doc = nlp(message);

        switch (currentQuestionIndex) {
            case 0:
                answers.interests = doc.nouns().out('array');
                break;
            case 1:
                answers.skills = doc.nouns().out('array');
                break;
            case 2:
                answers.goals = doc.nouns().out('array');
                break;
            case 3:
                answers.previousOption = doc.nouns().out('array');
                break;
        }
        currentQuestionIndex++;
        getNextQuestion();
    };

    getNextQuestion();
});
