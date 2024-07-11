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

            const universiteId = id;
            const token = localStorage.getItem('token');

            // Vérifier la présence du token
            if (!token) {
                showNotification('You need to log in first.', 'error');
                window.location.href = 'http://localhost/maformation.cd/public/frontend/';
                return;
            }

            // Charger les avis existants
            async function fetchReviews() {
                try {
                    const response = await fetch(`http://localhost:5000/avis/universite/${universiteId}/avis`);
                    const reviews = await response.json()
                    const reviewsContainer = document.getElementById('reviews');
                    reviewsContainer.innerHTML = '';
                    
                    if (reviews && reviews.length > 0) {
                        reviews.forEach(review => {
                            const reviewElement = document.createElement('div');
                            reviewElement.classList.add('bg-white', 'p-4', 'rounded', 'shadow-md', 'my-3');
                
                            reviewElement.innerHTML = `
                                <p class="text-lg font-medium">${review.utilisateur}</p>
                                <p class="text-sm text-gray-600">${review.email}</p>
                                <p class="text-sm">${review.commentaire}</p>
                                <p class="text-sm font-medium">Note: ${review.note}/5</p>
                            `;
                
                            reviewsContainer.appendChild(reviewElement);
                        });
                    }
                } catch (error) {
                    console.error('Erreur lors de la récupération des avis:', error);
                }
            }
            

            // Charger les avis au démarrage
            fetchReviews();

            // Soumettre un avis
            document.getElementById('reviewForm').addEventListener('submit', async (e) => {
                e.preventDefault();

                const note = document.getElementById('note').value;
                const commentaire = document.getElementById('commentaire').value;

                try {
                    const userResponse = await axios.get(`http://localhost:5000/users/profile`, {
                        headers: {
                            'x-auth-token': token
                        }
                    });
                    const { email, name } = userResponse.data;

                    const avisResponse = await axios.post(`http://localhost:5000/avis/universite/${universiteId}/avis`, {
                        utilisateur: name,
                        email,
                        note,
                        commentaire
                    }, {
                        headers: {
                            'x-auth-token': token
                        }
                    });

                    if (avisResponse.status === 201) {
                        showNotification('Avis envoyé avec succès', 'success');
                        alert('Avis envoyé avec succès');
                        loadAvis();
                    }
                } catch (error) {
                    console.error('Erreur lors de l\'envoi de l\'avis:', error);
                    showNotification('AErreur lors de l\'envoi de l\'avis', 'error');
                }
            });
});

// Function to show notification
function showNotification(message, type) {
    const notificationContainer = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = `p-4 mb-4 rounded-lg shadow-md ${type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`;
    notification.textContent = message;
    notificationContainer.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function displayUniversityDetails(data) {
    const detailsContainer = document.getElementById('universityDetails');

    detailsContainer.innerHTML = `

    <h1 class="text-xl md:text-3xl my-4 font-medium mb-4 text-blue-500 text-center uppercase">${data.denomination}</h1>
       
         <div class="border rounded shadow md:flex md:flex-row items-center justify-between container mx-auto my-4 p-4 bg-gray-200" data-aos = "fade-down" data-aos-delay="400">
                    <div class="md:w-1/2" data-aos = "fade-right" data-aos-delay="500">
                        <img src="${data.images[3]}" alt="${data.denomination}" class="w-full h-auto object-cover mb-2 rounded">
                    </div>

                    <div class="md:w-1/2 px-4 md:p-6 space-y-1" data-aos = "fade-left" data-aos-delay="600">
                        <h1 class="text-xl md:text-2xl font-medium mb-4 text-blue-800 uppercase">${data.denomination}</h1>
                        <p><strong>Sigle : </strong> ${data.sigle}</p>
                        <p><strong>Province : </strong> ${data.province}</p>
                        <p><strong>Territoire : </strong> ${data.territoire}</p>
                        <p><strong>Adresse : </strong> ${data.contact.adresse}</p>
                        <p><strong>Frais : </strong> ${data.prixFrais.min} - ${data.prixFrais.max} USD</p>
                        <p><strong>Logement : </strong> ${data.logementDisponible ? `<span class="text-base font-bold text-green-700 ">Disponible</span>` : `<span class="text-base font-bold text-red-500 ">Indisponible</span>`}</p>
                        <p><strong>Contact : </strong> ${data.contact.email} | ${data.contact.telephone}</p>
                        <a href="${data.contact.lien}"><button class="bg-blue-500 text-white p-2 mt-4 rounded-lg shadow-md hover:bg-blue-700">Visiter le site de l'université</button></a>
                    </div>
        </div>
         
        <div class="bg-gray-200 p-10 rounded-lg shadow-md space-y-2" data-aos = "fade-up">
            <h2 class="text-2xl font-medium text-blue-700 mb-4 uppercase">À propos de l'${data.denomination}</h2>
            ${data.description.map(paragraph => `
                <p>${paragraph}</p>
            `).join('')}
        </div>

        <div class="bg-gray-200 p-10 rounded-lg shadow-md mt-8" data-aos = "fade-up">
            <h2 class="text-2xl font-bold text-green-500 mb-4 uppercase">Facultés et options disponibles</h2>
            <ul class="flex flex-row items-center justify-center flex-wrap">
            ${data.facultes.map(faculte => `
                <li class="m-3 p-4 bg-white border-b-4 border-blue-600 shadow-md rounded-lg" data-aos = "fade-down">
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
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-6 mx-auto" data-aos = "fade-up">
             ${data.images.map(image => `
                <div class="w-full mx-auto">
                    <img src="${image}" alt="${data.denomination}" class="w-80 h-80 object-cover transform duration-150 rounded hover:scale-105">
                </div>
            `).join('')}
        </div>
        
        
        <h2 class="text-2xl font-bold mt-4 text-blue-500">Personnalités Importantes</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-aos = "fade-left">
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
        <a href="${data.contact.lien}"><button class="bg-blue-500 text-white p-2 mt-2 rounded-sm shadow-md hover:bg-blue-700">Visiter le site de l'université</button></a>

    <section class="container mx-auto py-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Image with overlay text -->
            <div class="relative h-96">
                <img src="./chatbot/image/cartoon.png" alt="University Image" class="w-full h-full object-cover rounded shadow-md">
                <div class="absolute inset-0 bg-blue-800 bg-opacity-50 flex items-center justify-center rounded">
                    <h2 class="text-white text-3xl font-bold text-center">Partagez Votre Expérience</h2>
                </div>
            </div>
            <!-- Review Form -->
            <div class="bg-white p-6 rounded shadow-md h-96">
                <h2 class="text-2xl font-bold mb-6">Ajouter un Avis</h2>
                <form id="reviewForm">
                    <label for="note" class="block text-gray-700 font-bold mb-2">Note :</label>
                    <select id="note" name="note" class="w-full p-2 border border-gray-300 rounded mb-4">
                        <option value="1">1 - Très mauvais</option>
                        <option value="2">2 - Mauvais</option>
                        <option value="3">3 - Moyen</option>
                        <option value="4">4 - Bon</option>
                        <option value="5">5 - Excellent</option>
                    </select>

                    <label for="commentaire" class="block text-gray-700 font-bold mb-2">Commentaire :</label>
                    <textarea id="commentaire" name="commentaire" class="w-full p-2 border border-gray-300 rounded mb-4" rows="4"></textarea>

                    <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Envoyer</button>
                </form>
            </div>
        </div>
    </section>

   
    <!-- Section pour les commentaires -->
    <section class="container mx-auto py-10">
        <h2 class="text-2xl font-bold mb-6">Avis des utilisateurs</h2>
        <div id="reviews" class="bg-white p-6 rounded shadow-md"></div>
    </section>
    `;
}