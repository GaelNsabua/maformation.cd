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
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-6" data-aos = "fade-up">
             ${data.images.map(image => `
                <div class="w-full">
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
    `;
}