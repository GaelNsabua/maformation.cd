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


    function animateValue(id, start, end, duration) {
        let range = end - start;
        let current = start;
        let increment = end > start? 1 : -1;
        let stepTime = Math.abs(Math.floor(duration / range));
        let obj = document.getElementById(id);
        let timer = setInterval(() => {
            current += increment;
            obj.innerHTML = current;
            if (current == end) {
                clearInterval(timer);
            }
        }, stepTime);
    }
    
    // Exemple de valeurs, remplacez par les données réelles chargées quelque part
    window.onload = () => {
        animateValue("count1", 0, 120, 3000); // 120 universités
        animateValue("count2", 0, 350, 3000); // 350 formations
        animateValue("count3", 0, 5000, 3000); // 5000 utilisateurs
    };

        const imagesContainer = document.getElementById('carousel-images');
        const images = document.querySelectorAll('.carousel-image');
        const totalImages = images.length;
        let currentIndex = 0;

        function updateCarousel() {
            imagesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        function showNextImage() {
            currentIndex = (currentIndex + 1) % totalImages;
            updateCarousel();
        }

        function showPrevImage() {
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            updateCarousel();
        }

        document.getElementById('next').addEventListener('click', showNextImage);
        document.getElementById('prev').addEventListener('click', showPrevImage);

        setInterval(showNextImage, 3000); // Change d'image toutes les 3 secondes

        // Initial setup
        updateCarousel();

        // Script pour le carrousel de témoignages
        var swiper = new Swiper('.swiper-container', {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });