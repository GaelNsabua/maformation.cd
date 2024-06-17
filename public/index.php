<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="./output.css" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js"></script>
    <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css">
    <title>MaFormation.cd</title>
</head>
<body class="bg-gray-100">
    <?php require_once 'components/general-comps/navbar.php'; ?>
    <?php require_once 'components/index-comps/banner-1.php'; ?>
    <?php require_once 'components/index-comps/stat-section.php'; ?>
    <main class="container mx-auto p-20">
    <?php require_once 'components/general-comps/search-section.php'; ?>
    <?php require_once 'components/index-comps/popular-section.php'; ?>
    <?php require_once 'components/index-comps/banner-2.php'; ?>
    <?php require_once 'components/index-comps/most-visited-univ-sect.php'; ?>
    <?php require_once 'components/index-comps/caroussel.php'; ?>
    </main>
    <?php require_once 'components/general-comps/footer.php'; ?>

    <script src="main.js"></script>

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
            //effect: 'slide', // Utiliser 'slide' pour l'effet de défilement
        });
    </script>

</body>
</html>