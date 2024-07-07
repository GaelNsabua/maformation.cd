<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php require_once '../components/general-comps/head.php'; ?>
    <title>search_universities</title>
</head>
<body class="bg-gray-100">
    <?php require_once '../components/general-comps/navbar.php'; ?>
    <?php require_once '../components/search-comps/banner.php'; ?>

    <main class="container mx-auto md:px-20 px-3 md:py-8 py-2">
        <?php require_once '../components/general-comps/search-section.php'; ?>
        <div class="bg-green-400 text-white text-center p-4 rounded-md mx-auto shadow-lg my-3 max-w-xl transform scale-0 duration-200" id="search-message"><h1 class="font-bold">Voici les resultats qui repondent aux critères de votre recherche</h1></div>
        <div id="search-results" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
        <div id="searchResults" class="grid grid-cols-1 gap-4 my-6"></div>
    </main>

    <?php require_once '../components/general-comps/footer.php'; ?>


    <script>

        document.addEventListener('DOMContentLoaded', async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const query = urlParams.get('mot_cle');
            const budget = urlParams.get('budget');

            if (query || budget) {
                await searchUniversities(query, budget);
            }else{
                const searchMessage = document.getElementById('search-message');
                searchMessage.classList.remove('scale-0','bg-green-400');
                searchMessage.classList.add('bg-red-500');
                searchMessage.textContent = "Veuillez remplir les champs du filtre";
            }
        });
       
        async function searchUniversities(query, budget) {
            try {
                const response = await fetch(`http://localhost:5000/universites/search?q=${encodeURIComponent(query)}&budget=${encodeURIComponent(budget)}`);
                if (!response.ok) {
                    const searchMessage = document.getElementById('search-message');
                    searchMessage.classList.remove('scale-0','bg-green-400');
                    searchMessage.classList.add('bg-red-500');
                    searchMessage.textContent = "Aucun résultat correspondant à votre recherche";
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                const data = await response.json();
                searchMessage();
                displayResults(data);
            } catch (error) {
                console.error('Error:', error);
            }

            //Recherche dans la collection faculté
            try {
                const response = await fetch(`http://localhost:5000/faculties/search?keyword=${encodeURIComponent(query)}`);
                const faculties =await response.json();

                const resultsContainer = document.getElementById('search-results');
                resultsContainer.innerHTML = '';

                //Affichage des universités
                faculties.forEach(faculty => {
                    const facultyDiv = document.createElement('div');
                    facultyDiv.className = 'bg-white p-4 border-b-4 border-t-4 border-blue-600 shadow-md rounded-lg';
                    facultyDiv.innerHTML = `
                        <h3 class="text-xl font-semibold">${faculty.name}</h3>
                        <p class="border-b py-3">${faculty.description}</p>
                         <h3 class="text-xl font-semibold py-3">Options disponibles</h3>
                         <ul class="list-disc ml-5 text-gray-700">
                                ${faculty.options.map(option => `<li>${option.name}</li>`).join('')}
                        </ul>
                    `;
                    resultsContainer.appendChild(facultyDiv);
                });
            } catch (error) {
                console.error('Error searching faculties:', error);
            }
        }

        function searchMessage(){
            const searchMessage = document.getElementById('search-message')
            searchMessage.classList.remove('scale-0');
            setTimeout(() => {
                searchMessage.remove();
            }, 6000);
        }


        function displayResults(data) {
            const resultsContainer = document.getElementById('searchResults');
            resultsContainer.innerHTML = '';
            if (data.length === 0) {
                resultsContainer.innerHTML = '<p class="text-red-500">Aucune université trouvée.</p>';
                return;
            }

            data.forEach(universite => {
                const universiteElement = document.createElement('div');
                universiteElement.classList.add('bg-white','md:flex', 'md:flex-row', 'items-center', 'justify-between', 'p-4', 'rounded-lg', 'shadow-lg', 'overflow-hidden', 'hover:bg-gray-200', 'cursor-pointer', 'mx-auto');

                const images = universite.images.map(image => `<img src="${image}" alt="${universite.denomination}" class="w-full object-cover mb-2">`).join('');

                universiteElement.innerHTML = `
                    <div class="md:w-1/2 rounded overflow-hidden">
                        <img src="${universite.images[2]}" alt="${universite.denomination}" class="w-full h-auto object-cover mb-2">
                    </div>
                    <div class="md:w-1/2 p-6">
                        <h2 class="text-xl font-semibold text-blue-800 uppercase">${universite.denomination}</h2>
                        <h2 class="text-green-700">${universite.territoire}</h2>
                        <p class="py-4 text-gray-500">${universite.description[0].substr(0,200)}...</p>
                        <p><strong>Frais:</strong> ${universite.prixFrais.min} - ${universite.prixFrais.max} USD</p>
                        <a href="http://localhost/maformation.cd/public/frontend/pages/univ-details.php?id=${universite._id}"><button class="bg-blue-500 text-white p-2 mt-2 rounded-lg shadow-md hover:bg-blue-700" id="${universite.denomination}">En savoir plus</button></a>
                    </div>
                `;
                resultsContainer.appendChild(universiteElement);
            });
        }
    </script>

    <script src="../app.js"></script>
</body>
</html>
