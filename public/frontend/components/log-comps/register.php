<div class="bg-white shadow-md rounded-lg px-8 py-6" id="register-form-container">
            <h2 class="text-2xl font-bold text-center text-blue-600 mb-6">Inscription</h2>
            <form id="registerForm">
                <div class="mb-4">
                    <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Nom</label>
                    <input type="text" id="name" name="name" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Entrez votre nom" required>
                </div>
                <div class="mb-4">
                    <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Adresse e-mail</label>
                    <input type="email" id="email" name="email" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Entrez votre e-mail" required>
                </div>
                <div class="mb-4">
                    <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Mot de passe</label>
                    <input type="password" id="password" name="password" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Entrez votre mot de passe" required>
                </div>
                <div class="mb-4">
                    <label for="city" class="block text-gray-700 text-sm font-bold mb-2">Ville</label>
                    <input type="text" id="city" name="city" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Entrez votre ville" required>
                </div>
                <div class="mb-4">
                    <label for="province" class="block text-gray-700 text-sm font-bold mb-2">Province</label>
                    <input type="text" id="province" name="province" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Entrez votre province" required>
                </div>
                <div class="mb-6">
                    <label for="dob" class="block text-gray-700 text-sm font-bold mb-2">Date de naissance</label>
                    <input type="date" id="dob" name="dob" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                </div>
                <div class="flex items-center justify-between">
                    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        S'inscrire
                    </button>
                    <a id="login-link" class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer">
                        Se connecter
                    </a>
                </div>
            </form>
        </div>