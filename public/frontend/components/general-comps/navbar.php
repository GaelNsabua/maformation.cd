<div class="text-center px-4 bg-blue-400 hidden">
    <p>&copy; 2024 MaFormation.cd. Tous droits réservés.</p>
</div>
<nav class="bg-gradient-to-r from-blue-600 to-blue-900 text-white shadow-md fixed w-full z-50"  data-aos="fade-down" data-aos-delay="200">
        <div class="container mx-auto px-4 py-4 flex justify-between items-center">
            <div class="flex items-center">
                <img src="http://localhost/maformation.cd/public/frontend/images/logo_news.png" alt="Logo" class="h-10 mr-4">
                <span class="font-bold text-lg">MaFormation.cd</span>
            </div>
            <div class="hidden md:flex space-x-8 mx-auto text-lg">
                <a href="http://localhost/maformation.cd/public/frontend/" class="text-gray-100 transform duration-150 hover:-translate-y-1">Bienvenue</a>
                <div class="relative group">
                    <button class="text-gray-100 transform duration-150 hover:-translate-y-1 focus:outline-none">Universités</button>
                    <div class="absolute hidden group-hover:block bg-blue-400 text-white shadow-lg rounded mt-1 p-2 text-nowrap">
                        <a href="http://localhost/maformation.cd/public/frontend/pages/univ-list.php" class="block px-4 py-2 hover:bg-blue-600">Université</a>
                        <a href="#" class="block px-4 py-2 hover:bg-blue-600">Institut</a>
                        <a href="#" class="block px-4 py-2  hover:bg-blue-600">Ecole superieur</a>
                    </div>
                </div>
                <a href="http://localhost/maformation.cd/public/frontend/pages/about.php" class="text-gray-100 transform duration-150 hover:-translate-y-1">A propos</a>
                <div class="relative group">
                    <button class="text-gray-100 transform duration-150 hover:-translate-y-1 focus:outline-none">Autres</button>
                    <div class="absolute hidden group-hover:block bg-white shadow-lg rounded mt-1 px-2 text-nowrap">
                        <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-200">Lien 1</a>
                        <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-200">Lien 2</a>
                    </div>
                </div>
                <a href="#" class="text-gray-100 transform duration-150 hover:-translate-y-1">Contact</a>
            </div>
            <div class="hidden md:block transform duration-150 hover:-translate-x-2">
                <a href="#" class="bg-blue-400 text-white font-bold shadow-md px-4 py-2 rounded hover:bg-blue-600">S'INSCRIRE</a>
            </div>
            <div class="md:hidden flex items-center">
                <button id="mobile-menu-button" class="text-gray-700 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>
        </div>
        <div id="mobile-menu" class="md:hidden hidden">
            <a href="#" class="block px-4 py-2 text-white hover:bg-gray-300">Bienvenue</a>
            <a href="#" class="block px-4 py-2 text-white hover:bg-gray-300">Universités</a>
            <a href="http://localhost/maformation.cd/public/frontend/pages/about.php" class="block px-4 py-2 text-white hover:bg-gray-300">A propos</a>
            <a href="#" class="block px-4 py-2 text-white hover:bg-gray-300">Autres</a>
            <a href="#" class="block px-4 py-2 text-white hover:bg-gray-300">Contact</a>
            <a href="#" class="block px-4 py-2 text-white bg-red-500 hover:bg-red-600">S'INSCRIRE</a>
        </div>
    </nav>