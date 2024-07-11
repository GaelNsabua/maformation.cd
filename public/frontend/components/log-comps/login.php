<div class="bg-white shadow-md rounded-lg px-8 py-6 hidden" id="login-form-container">
    <h2 class="text-2xl font-bold text-center text-blue-600 mb-6">Connexion</h2>
    <form id="loginForm">
        <div class="mb-4">
            <label for="login-email" class="block text-gray-700 text-sm font-bold mb-2">Adresse e-mail</label>
            <input type="email" id="login-email" name="email" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Entrez votre e-mail" required>
        </div>
        <div class="mb-6">
            <label for="login-password" class="block text-gray-700 text-sm font-bold mb-2">Mot de passe</label>
            <input type="password" id="login-password" name="password" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="Entrez votre mot de passe" required>
        </div>
        <div class="flex items-center justify-between">
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Connexion</button>
            <a id="register-link" class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer">
                        S'inscrire</a>
        </div>
    </form>
</div>