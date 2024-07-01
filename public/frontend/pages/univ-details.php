<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php require_once '../components/general-comps/head.php'; ?>
    <title>universitie-details</title>
</head>
<body class="bg-gray-100">
    <?php require_once '../components/general-comps/navbar.php'; ?>
    <?php require_once '../components/univ-comps/banner.php'; ?>
    <?php //echo "<h1>{$_GET['id']}</h1>" ?>

    <main class="mt-2 p-4 container mx-auto">
        <div id="universityDetails" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        </div>
    </main>


    <?php require_once '../components/general-comps/footer.php'; ?>


    <script>
        document.addEventListener('DOMContentLoaded', async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');

            if (id) {
                try {
                    const response = await fetch(`http://localhost:5000/universites/university/${id}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    const data = await response.json();
                    displayUniversityDetails(data);
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        });

        function displayUniversityDetails(data) {
            const detailsContainer = document.getElementById('universityDetails');

            // const images = data.images.map(image => `<img src="${image}" alt="${data.denomination}" class="w-full h-64 object-cover mb-4">`).join('');

            detailsContainer.innerHTML = `

            <h1 class="text-xl md:text-4xl font-bold mb-4 text-blue-500 text-center uppercase">${data.denomination}</h1>
               
                 <div class="border rounded shadow md:flex md:flex-row items-center justify-between container mx-auto my-4 p-4 bg-gray-200">
                            <div class="md:w-1/2">
                                <img src="${data.images[3]}" alt="${data.denomination}" class="w-full h-auto object-cover mb-2 rounded">
                            </div>

                            <div class="md:w-1/2 px-4 md:p-6 space-y-1">
                                <h1 class="text-xl md:text-3xl font-bold mb-4 text-blue-500 uppercase">${data.denomination}</h1>
                                <h3 class="text-xl font-bold text-blue-500 uppercase">Informations</h3>
                                <p><strong>Sigle : </strong> ${data.sigle}</p>
                                <p><strong>Province : </strong> ${data.province}</p>
                                <p><strong>Territoire : </strong> ${data.territoire}</p>
                                <p><strong>Adresse : </strong> ${data.contact.adresse}</p>
                                <p><strong>Frais : </strong> ${data.prixFrais.min} - ${data.prixFrais.max} USD</p>
                                <p><strong>Logement : </strong> ${data.logementDisponible ? `<span class="text-base font-bold text-green-700 ">Disponible</span>` : `<span class="text-base font-bold text-red-500 ">Indisponible</span>`}</p>
                                <p><strong>Contact : </strong> ${data.contact.email} | ${data.contact.telephone}</p>
                                <a href="${data.contact.lien}"><button class="bg-blue-500 text-white p-2 mt-4 rounded-sm shadow-md hover:bg-blue-700 font-bold">Visiter le site de l'université</button></a>
                            </div>
                </div>
                 
                <div class="bg-gray-200 p-10 rounded-lg shadow-md">
                    <h2 class="text-2xl font-bold mb-4">À propos de ${data.denomination}</h2>
                    <p>${data.description}</p>
                </div>

                <div class="bg-gray-200 p-10 rounded-lg shadow-md mt-8">
                    <h2 class="text-2xl font-bold text-green-500 mb-4 uppercase">Facultés et options disponibles</h2>
                    <ul class="flex flex-row items-center justify-center flex-wrap">
                    ${data.facultes.map(faculte => `
                        <li class="m-3 p-4 bg-white border-b-4 border-blue-600 shadow-md rounded-lg">
                        <div class="flex items-center">
                            <strong class="text-blue-700">${faculte.nom}</strong>
                        </div>
                            <ul class="list-disc ml-5 text-gray-700">
                                ${faculte.options.map(option => `<li>${option}</li>`).join('')}
                            </ul>
                        </li>
                    `).join('')}
                    </ul>
                </div>

                <h2 class="text-2xl font-bold my-4 text-center text-green-400 uppercase">Galerie</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-6">
                     ${data.images.map(image => `
                        <div class="w-full">
                            <img src="${image}" alt="${data.denomination}" class="w-full h-auto object-cover rounded">
                        </div>
                    `).join('')}
                </div>
                
                
                <h2 class="text-2xl font-bold mt-4 text-blue-500">Personnalités Importantes</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${data.personnalitesImportantes.map(personnalite => `
                        <div class="border rounded shadow flex items-center justify-between container mx-auto my-4 p-4 bg-gray-200">
                            <div class="w-1/2">
                                <img src="${personnalite.photo}" alt="${personnalite.identite}" class="w-full h-auto object-cover rounded">
                            </div>
                            <div class="w-1/2 p-4">
                               <h3 class="text-xl font-bold">${personnalite.identite}</h3>
                                <p>${personnalite.profession}</p>
                                <p>${personnalite.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <a href="${data.contact.lien}"><button class="bg-blue-500 text-white p-2 mt-2 rounded-sm shadow-md hover:bg-blue-700 font-bold">Visiter le site de l'université</button></a>
            `;
        }
        
    </script>

<script src="../app.js"></script>
</body>
</html>
