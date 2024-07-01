<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ajouter une Université</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100">

    <div class="container mx-auto px-5 md:px-60 py-8">
        <h1 class="text-3xl font-bold text-center mb-8">Ajouter une Université</h1>
        <form id="universiteForm" class="bg-white w shadow-md rounded px-14 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="sigle">
                    Sigle
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="sigle" type="text" placeholder="Sigle de l'université" required>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="denomination">
                    Dénomination
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="denomination" type="text" placeholder="Dénomination de l'université" required>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="statut">
                    Statut
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="statut" type="text" placeholder="Statut de l'université (Public/Privé)" required>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="territoire">
                    Territoire
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="territoire" type="text" placeholder="Territoire" required>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="province">
                    Province
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="province" type="text" placeholder="Province" required>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
                    Description
                </label>
                <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Description de l'université" required></textarea>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="facultesOptions">
                    Facultés/Options (séparées par des virgules)
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="facultesOptions" type="text" placeholder="Facultés/Options" required>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="images">
                    Images (URLs séparées par des virgules)
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="images" type="text" placeholder="URLs des images" required>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="logementDisponible">
                    Logement Disponible
                </label>
                <select class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="logementDisponible" required>
                    <option value="true">Oui</option>
                    <option value="false">Non</option>
                </select>
            </div>
            <h2 class="text-gray-700 text-sm font-bold mb-2">Frais (USD)</h2>
            <div class="flex flex-row justify-start">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="prixMin">
                        Prix Min
                    </label>
                    <input class="shadow appearance-none border rounded w-auto mr-4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="prixMin" type="number" min="250" max="5000"  placeholder="Prix minimum des frais" required>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="prixMax">
                        Prix Max
                    </label>
                    <input class="shadow appearance-none border rounded w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="prixMax" type="number" placeholder="Prix maximum des frais" required>
                </div>
            </div>
            
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                    Email de contact
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email de contact" required>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="telephone">
                    Téléphone de contact
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="telephone" type="tel" placeholder="Téléphone de contact" required>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="adresse">
                    Adresse de contact
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adresse" type="text" placeholder="Adresse de contact" required>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="personnalitesImportantes">
                    Personnalités Importantes (identité, photo, profession, description - séparées par des points-virgules)
                </label>
                <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="personnalitesImportantes" placeholder="Personnalités Importantes (photo, profession, description - séparées par des points-virgules)" required></textarea>
            </div>
            <div class="flex items-center justify-between">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Ajouter Université
                </button>
            </div>
        </form>
    </div>

    <script>
        document.getElementById('universiteForm').addEventListener('submit', async function(event) {
            event.preventDefault();
            
            const personnalitesImportantes = document.getElementById('personnalitesImportantes').value.split(';').map(personnalite => {
                const [identite, photo, profession, description] = personnalite.split(',');
                return { identite: identite.trim(), photo: photo.trim(), profession: profession.trim(), description: description.trim() };
            });

            const universite = {
                sigle: document.getElementById('sigle').value,
                denomination: document.getElementById('denomination').value,
                statut: document.getElementById('statut').value,
                territoire: document.getElementById('territoire').value,
                province: document.getElementById('province').value,
                description: document.getElementById('description').value,
                facultesOptions: document.getElementById('facultesOptions').value.split(',').map(option => option.trim()),
                images: document.getElementById('images').value.split(',').map(image => image.trim()),
                logementDisponible: document.getElementById('logementDisponible').value === 'true',
                prixFrais: {
                    min: parseFloat(document.getElementById('prixMin').value),
                    max: parseFloat(document.getElementById('prixMax').value)
                },
                contact: {
                    email: document.getElementById('email').value,
                    telephone: document.getElementById('telephone').value,
                    adresse: document.getElementById('adresse').value
                },
                personnalitesImportantes: personnalitesImportantes
            };

            try {
                const response = await fetch('http://localhost:5000/api/universites', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(universite)
                });

                if (response.ok) {
                    alert('Université ajoutée avec succès');
                    document.getElementById('universiteForm').reset();
                } else {
                    alert('Erreur lors de l\'ajout de l\'université');
                }
            } catch (error) {
                console.error('Erreur:', error);
                alert('Erreur lors de l\'ajout de l\'université');
            }
        });
    </script>
</body>
</html>
