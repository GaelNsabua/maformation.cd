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

// Toggle between forms
document.getElementById('login-link').addEventListener('click', () => {
    document.getElementById('register-form-container').classList.add('hidden');
    document.getElementById('login-form-container').classList.remove('hidden');
});

document.getElementById('register-link').addEventListener('click', () => {
    document.getElementById('login-form-container').classList.add('hidden');
    document.getElementById('register-form-container').classList.remove('hidden');
});

// Register form submission
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const city = document.getElementById('city').value;
    const province = document.getElementById('province').value;
    const birthDate = document.getElementById('dob').value;

    try {
        const response = await axios.post('http://localhost:5000/users/register', { name, email, password, city, province, birthDate });
        showNotification('Inscription réussie ! Vous pouvez maintenant vous connecter.', 'success');
        document.getElementById('registerForm').reset();
        document.getElementById('login-link').click();
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        showNotification('Erreur lors de l\'inscription. Veuillez réessayer.', 'error');
    }
});

// Login form submission
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await axios.post('http://localhost:5000/users/login', { email, password });
        const { token } = response.data;
        localStorage.setItem('token', token);
        showNotification('Connexion réussie ! Redirection en cours...', 'success');
        setTimeout(() => {
            window.location.href = 'http://localhost/maformation.cd/public/frontend/';
        }, 1500);
    } catch (error) {
        console.error('Erreur de connexion:', error);
        showNotification('Erreur de connexion. Veuillez vérifier vos informations d\'identification.', 'error');
    }
});

// Display login form if token exists
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('token')) {
        document.getElementById('register-form-container').classList.add('hidden');
        document.getElementById('login-form-container').classList.remove('hidden');
    }
});