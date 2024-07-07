<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php require_once '../../components/general-comps/head.php'; ?>
    <title>University Recommendation System</title>
</head>
<body class="bg-gray-100">

    <!-- Navbar -->
    <?php require_once '../../components/general-comps/navbar.php'; ?>

    <!-- Banner -->
    <section class="bg-cover bg-center text-white py-20" style="background-image: url('../../images/building-1.jpg');">
        <div class="container mx-auto text-center h-80 my-auto flex flex-col justify-center items-center bg-black bg-opacity-60">
            <h1 class="text-4xl font-bold mb-4">Find Your Ideal University</h1>
            <p class="text-xl mb-8">Answer a few questions and we'll recommend the best universities for you.</p>
            <button id="start-chat" class="bg-white text-blue-700 font-bold py-2 px-4 rounded">Get Started</button>
        </div>
    </section>

    <!-- Chat Bot Container -->
    <div id="chat-bot" class="fixed bottom-5 right-5 w-96 h-3/4 bg-white rounded-lg shadow-xl hidden flex-col z-50">
        <div class="chat-header flex items-center justify-between p-4 bg-blue-600 text-white rounded-t-lg">
            <div class="h-7 flex flex-row items-center space-x-2">
            <img src="./image/chat.png" alt="student" class="w-7 object-cover">
            <span class="text-md text-nowrap font-semibold">Conseiller d'orientation</span>
            </div>
            <button id="close-chat" class="close-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6" width="24" height="24">
                <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
            </svg>
            </button>
        </div>
        <div id="chat-body" class="chat-body p-4 flex-1 overflow-y-auto"></div>
        <div class="chat-footer flex items-center p-4 border-t border-gray-200">
            <input type="text" id="user-input" class="chat-input flex-grow p-2 border border-gray-300 rounded mr-2" placeholder="Type your message...">
            <button id="send-btn" class="chat-send-button bg-blue-600 text-white py-2 px-4 rounded">Send</button>
        </div>
    </div>

    <!-- Results Section -->
    <section class="container mx-auto py-10 px-14" id="results-section" style="display: none;">
        <h2 class="text-2xl font-bold mb-6">Recommended Universities</h2>
        <div id="results" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
    </section>

    <!-- Feedback Section -->
    <div class="container mx-8 mt-8 p-4 w-2/4">
        <h2 class="text-2xl font-semibold mb-4">Laissez votre Feedback</h2>
        <form id="feedbackForm" class="bg-white p-4 rounded shadow-md">
            <label for="facultyId" class="block text-gray-700 font-bold mb-2">Faculté :</label>
            <input type="text" id="facultyId" name="facultyId" class="w-full p-2 border border-gray-300 rounded mb-4">

            <label for="feedback" class="block text-gray-700 font-bold mb-2">Votre Feedback :</label>
            <textarea id="feedback" name="feedback" class="w-full p-2 border border-gray-300 rounded mb-4"></textarea>

            <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded">Envoyer</button>
        </form>
    </div>

    <?php require_once '../../components/general-comps/footer.php'; ?>

    <script src="../../app.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="https://unpkg.com/compromise"></script>
    <script src="./typed.js"></script>
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
