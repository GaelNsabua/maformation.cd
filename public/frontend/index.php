<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php require_once 'components/general-comps/head.php'; ?>
    <title>MaFormation.cd</title>
</head>
<body class="bg-gray-100">
    <?php require_once './components/general-comps/chat-button.php'; ?>
    <?php require_once 'components/general-comps/navbar.php'; ?>
    <?php require_once 'components/index-comps/banner-1.php'; ?>
    <?php require_once 'components/index-comps/stat-section.php'; ?>
    <main class="container mx-auto md:p-16 p-5">
    <?php require_once 'components/general-comps/search-section.php'; ?>
    <?php require_once 'components/index-comps/popular-section.php'; ?>
    <?php require_once 'components/index-comps/banner-2.php'; ?>
    <?php require_once 'components/index-comps/most-visited-univ-sect.php'; ?>
    <?php require_once 'components/index-comps/caroussel.php'; ?>
    </main>
    <?php require_once 'components/general-comps/footer.php'; ?>

    <script src="app.js"></script>

    <script>
        var swiper = new Swiper('.swiper-container', {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            //effect: 'slide',
        });

        function animateValue(id, start, end, duration) {
        let range = end - start;
        let current = start;
        let increment = end > start? 1 : -1;
        let stepTime = Math.abs(Math.floor(duration / range));
        let obj = document.getElementById(id);
        if(obj){
            let timer = setInterval(() => {
            current += increment;
            obj.innerHTML = current;
            if (current == end) {
                clearInterval(timer);
            }
        }, stepTime);
        }
        }

        window.onload = () => {
            //console.log(window.location.href);
            animateValue("count1", 0, 120, 3000); // 120 universités
            animateValue("count2", 0, 350, 3000); // 350 formations
            animateValue("count3", 0, 500, 3000); // 5000 utilisateurs
        };
    </script>

</body>
</html>