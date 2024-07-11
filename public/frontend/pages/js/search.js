document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        showNotification('You need to log in first.', 'error');
        window.location.href = 'http://localhost/maformation.cd/public/frontend/';
        return;
    }
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

async function searchUniversities(query, budget) {
    try {
        const response = await fetch(`http://localhost:5000/universites/search?q=${encodeURIComponent(query)}&budget=${encodeURIComponent(budget)}`, 
        {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                }
        });
        if (!response.ok) {
            const searchMessage = document.getElementById('search-message');
            searchMessage.classList.remove('scale-0','bg-green-400');
            searchMessage.classList.add('bg-red-500');
            searchMessage.textContent = "Aucun résultat correspondant à votre recherche";
            showNotification('Network response was not ok ' + response.statusText, 'error');
        }
        const data = await response.json();
        searchMessage();
        displayResults(data);
    } catch (error) {
        showNotification('Error:'+ error, 'error');
    }

    //Recherche dans la collection faculté
    try {
        const response = await fetch(`http://localhost:5000/faculties/search?keyword=${encodeURIComponent(query)}`,
        {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                }
        });
        const faculties =await response.json();

        const resultsContainer = document.getElementById('search-results');
        resultsContainer.innerHTML = '';

        //Affichage des universités
        faculties.forEach(faculty => {
            const facultyDiv = document.createElement('div');
            facultyDiv.className = 'bg-white p-4 border-b-4 border-t-4 border-blue-600 shadow-md rounded-lg mt-6';
            facultyDiv.innerHTML = `
                <h3 class="text-xl font-semibold text-blue-600">${faculty.name}</h3>
                <p class="border-b py-3">${faculty.description}</p>
                 <h3 class="text-xl font-semibold py-3">Options disponibles</h3>
                 <ul class="list-disc ml-5">
                        ${faculty.options.map(option => `<li  class="text-green-700">${option.name}</li><p class="my-2 text-blue-800">${option.description}</p>`).join('')}
                </ul>
            `;
            resultsContainer.appendChild(facultyDiv);
        });
    } catch (error) {
        showNotification('Error searching faculties:' + error, 'error');
    }
}

function searchMessage(){
    const searchMessage = document.getElementById('search-message')
    searchMessage.classList.remove('scale-0');
    setTimeout(() => {
        searchMessage.remove();
    }, 6000);
}

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
});