<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php require_once '../components/general-comps/head.php'; ?>
    <title>universities-list</title>
</head>
<body class="bg-gray-100">
    <?php require_once '../components/general-comps/navbar.php'; ?>
    <?php require_once '../components/univ-comps/banner.php'; ?>

    <main class="container mx-auto md:px-20 px-3 md:py-8 py-2">
        <?php require_once '../components/general-comps/search-section.php'; ?>
        <div id="searchResults" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-6"></div>
    </main>

    <?php require_once '../components/general-comps/footer.php'; ?>

    <script>

        document.addEventListener('DOMContentLoaded', async () => {
            const query = ''
            const budget = ''

            await searchUniversities(query, budget);
        });
       
        async function searchUniversities(query, budget) {
            try {
                const response = await fetch(`http://localhost:5000/search?q=${encodeURIComponent(query)}&budget=${encodeURIComponent(budget)}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                const data = await response.json();
                displayResults(data);
            } catch (error) {
                console.error('Error:', error);
            }
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
                universiteElement.classList.add('bg-white','flex', 'flex-col', 'items-center', 'justify-between', 'p-4', 'rounded-lg', 'shadow-lg', 'overflow-hidden', 'hover:bg-gray-200', 'cursor-pointer', 'mx-auto');

                const images = universite.images.map(image => `<img src="${image}" alt="${universite.denomination}" class="w-full object-cover mb-2">`).join('');

                universiteElement.innerHTML = `
                    <div class="rounded overflow-hidden">
                        <img src="${universite.images[3]}" alt="${universite.denomination}" class="w-full h-auto object-cover mb-2">
                    </div>
                    <div class="p-2">
                        <h2 class="text-xl font-bold text-blue-600 uppercase">${universite.denomination}</h2>
                        <h2 class="font-bold text-green-400">${universite.territoire}</h2>
                        <ul class="my-2 list-none">
                            <li><b class="text-blue-600">Statut : </b><span class="text-green-400">${universite.statut}</span></li>
                            <li><b class="text-blue-600">Province : </b><span class="text-green-400">${universite.province}</span></li>
                        </ul>
                        <p class="py-4 text-gray-500">${universite.description[0].substr(0,200)}...</p>
                        <p><strong>Frais:</strong> ${universite.prixFrais.min} - ${universite.prixFrais.max} USD</p>
                        <a href="http://localhost/maformation.cd/public/frontend/pages/univ-details.php?id=${universite._id}"><button class="bg-blue-500 text-white p-2 mt-2 rounded-sm shadow-md hover:bg-blue-700 font-bold" id="${universite.denomination}">En savoir plus</button></a>
                    </div>
                `;
                resultsContainer.appendChild(universiteElement);
            });
        }
    </script>

    <script src="../app.js"></script>
</body>
</html>
