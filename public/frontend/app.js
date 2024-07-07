AOS.init({
    duration: 1200, // durée de l'animation en millisecondes
    delay: 200,     // délai d'animation en millisecondes
    once: true,     // animation seulement une fois lorsque l'élément devient visible
});


document.getElementById('mobile-menu-button').addEventListener('click', function() {
    // Script pour gérer le menu mobile
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});



