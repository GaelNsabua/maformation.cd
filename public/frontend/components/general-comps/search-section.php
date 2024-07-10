<!-- Barre de recherche et filtres -->
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8" data-aos="fade-up" data-aos-delay="200">
<h2 class="text-2xl font-medium mb-4 text-center">Filtres de recherche</h2>
<form action="http://localhost/maformation.cd/public/frontend/pages/search.php" method="get">
<div class="bg-white p-6 border-b-8 border-blue-400 rounded-lg shadow-md">
        <div class="flex flex-col md:flex-row items-center md:justify-between">
            <input type="text" name="mot_cle" id="searchQuery" placeholder="Rechercher une université..."
                class="w-full md:w-1/3 px-4 py-2 border outline-blue-400 border-gray-300 rounded-l-md mb-4 md:mb-0">
            <select class="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded mb-4 md:mb-0 md:ml-4 outline-blue-400">
                <option>Localisation</option>
                <option>Kinshasa</option>
                <option>Lubumbashi</option>
                <option>Goma</option>
            </select>
            <select class="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded mb-4 md:mb-0 md:ml-4 outline-blue-400">
                <option>Type de formation</option>
                <option>Licence</option>
                <option>Master</option>
                <option>Doctorat</option>
            </select>
            <input type="number" name="budget" min="200" max="10000" class="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded mb-4 md:mb-0 md:ml-4 outline-blue-400" id="budget" placeholder="Votre budget">
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 shadow-md hover:bg-blue-700 rounded md:ml-4 cursor-pointer">Rechercher</button>
        </div>
    </div>
</form>
</div>
