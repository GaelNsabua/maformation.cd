AOS.init({
    duration: 1200, // durée de l'animation en millisecondes
    delay: 200,     // délai d'animation en millisecondes
    once: true,     // animation seulement une fois lorsque l'élément devient visible
    });


    // Script pour gérer le menu mobile
    document.getElementById('mobile-menu-button').addEventListener('click', function() {
        const menu = document.getElementById('mobile-menu');
        menu.classList.toggle('hidden');
    });


    // Script pour le carrousel de témoignages
    // var swiper = new Swiper('.swiper-container', {
    //     loop: true,
    //     pagination: {
    //         el: '.swiper-pagination',
    //         clickable: true,
    //     },
    // });