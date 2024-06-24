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

    <main class="mt-16 p-4 container mx-auto">
        <div id="universityDetails" class="p-4 bg-white shadow rounded"></div>
    </main>

    <script>
        document.addEventListener('DOMContentLoaded', async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');

            if (id) {
                try {
                    const response = await fetch(`http://localhost:5000/university/${id}`);
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

            const images = data.images.map(image => `<img src="${image}" alt="${data.denomination}" class="w-full h-64 object-cover mb-4">`).join('');

            detailsContainer.innerHTML = `
                ${images}
                <h1 class="text-3xl font-bold mb-4">${data.denomination}</h1>
                <p>${data.description}</p>
                <p><strong>Frais:</strong> ${data.prixFrais.min} - ${data.prixFrais.max} USD</p>
                <p><strong>Adresse:</strong> ${data.contact.adresse}</p>
                <p><strong>Contact:</strong> ${data.contact.email} | ${data.contact.telephone}</p>
                <h2 class="text-2xl font-bold mt-4">Facultés et Options</h2>
                <ul>
                    ${data.facultes.map(faculte => `
                        <li class="mt-2">
                            <strong>${faculte.nom}</strong>
                            <ul class="list-disc ml-5">
                                ${faculte.options.map(option => `<li>${option}</li>`).join('')}
                            </ul>
                        </li>
                    `).join('')}
                </ul>
                <h2 class="text-2xl font-bold mt-4">Personnalités Importantes</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${data.personnalitesImportantes.map(personnalite => `
                        <div class="p-4 border rounded shadow">
                            <img src="${personnalite.photo}" alt="${personnalite.identite}" class="w-full h-32 object-cover mb-2">
                            <h3 class="text-xl font-bold">${personnalite.identite}</h3>
                            <p>${personnalite.profession}</p>
                            <p>${personnalite.description}</p>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    </script>

<script src="../app.js"></script>
</body>
</html>
