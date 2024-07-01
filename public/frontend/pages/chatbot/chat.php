<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>University Recommendation System</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" rel="stylesheet">
    <style>
        .chat-bot-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 350px;
            height: 500px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            flex-direction: column;
        }
        .chat-header {
            background: #1e40af;
            color: #fff;
            padding: 10px;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            flex-shrink: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .chat-body {
            padding: 10px;
            overflow-y: auto;
            flex-grow: 1;
        }
        .chat-footer {
            display: flex;
            align-items: center;
            padding: 10px;
            border-top: 1px solid #ddd;
            flex-shrink: 0;
        }
        .chat-input {
            flex-grow: 1;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        .chat-send-button {
            background: #1e40af;
            color: #fff;
            padding: 8px 12px;
            border: none;
            border-radius: 4px;
            margin-left: 8px;
            cursor: pointer;
        }
        .close-button {
            background: none;
            border: none;
            cursor: pointer;
        }
        .close-button svg {
            fill: #fff;
        }
    </style>
</head>
<body class="bg-gray-100">

    <!-- Navbar -->
    <nav class="bg-blue-600 text-white p-4">
        <div class="container mx-auto flex justify-between">
            <a href="#" class="font-bold">MaFormation.cd</a>
            <div>
                <a href="#" class="px-4">Home</a>
                <a href="#" class="px-4">Universities</a>
                <a href="#" class="px-4">About</a>
                <a href="#" class="px-4">Contact</a>
            </div>
        </div>
    </nav>

    <!-- Banner -->
    <section class="bg-blue-700 text-white py-20">
        <div class="container mx-auto text-center">
            <h1 class="text-4xl font-bold mb-4">Find Your Ideal University</h1>
            <p class="text-xl mb-8">Answer a few questions and we'll recommend the best universities for you.</p>
            <button id="start-chat" class="bg-white text-blue-700 font-bold py-2 px-4 rounded">Get Started</button>
        </div>
    </section>

    <!-- Chat Bot Container -->
    <div id="chat-bot" class="chat-bot-container hidden">
        <div class="chat-header">
            <h2>University Advisor Bot</h2>
            <button id="close-chat" class="close-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M18.364 5.636l1.414 1.414L13.414 12l6.364 6.364-1.414 1.414L12 13.414l-6.364 6.364-1.414-1.414L10.586 12 4.222 5.636l1.414-1.414L12 10.586z"/>
                </svg>
            </button>
        </div>
        <div class="chat-body" id="chat-body"></div>
        <div class="chat-footer">
            <input type="text" id="user-input" class="chat-input" placeholder="Type your message...">
            <button id="send-btn" class="chat-send-button">Send</button>
        </div>
    </div>



    <!-- Results Section -->
    <section class="container mx-auto py-10" id="results-section" style="display: none;">
        <h2 class="text-2xl font-bold mb-6">Recommended Universities</h2>
        <div id="results" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
    </section>

    <div class="container mx-auto mt-8 p-4">
        <h2 class="text-2xl font-semibold mb-4">Laissez votre Feedback</h2>
        <form id="feedbackForm" class="bg-white p-4 rounded shadow-md">
            <label for="facultyId" class="block text-gray-700 font-bold mb-2">Faculté :</label>
            <input type="text" id="facultyId" name="facultyId" class="w-full p-2 border border-gray-300 rounded mb-4">

            <label for="feedback" class="block text-gray-700 font-bold mb-2">Votre Feedback :</label>
            <textarea id="feedback" name="feedback" class="w-full p-2 border border-gray-300 rounded mb-4"></textarea>

            <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded">Envoyer</button>
        </form>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/compromise@latest/builds/compromise.min.js"></script>
    <script>
        function showFeedbackForm(facultyId) {
            document.getElementById('facultyId').value = facultyId;
        }

        document.getElementById('feedbackForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const facultyId = document.getElementById('facultyId').value;
            const feedback = document.getElementById('feedback').value;

            try {
                await axios.post(`http://localhost:5000/feedback/${facultyId}`, { feedback });
                alert('Feedback envoyé avec succès');
            } catch (error) {
                console.error('Erreur lors de l\'envoi du feedback:', error);
            }
        });
    </script>

    <script type="module" src="chatbot.js"></script>
</body>
</html>
