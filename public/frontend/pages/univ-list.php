<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php require_once '../components/general-comps/head.php'; ?>
    <title>universities-list</title>
</head>
<body class="bg-gray-100">
    <?php require_once '../components/general-comps/navbar.php'; ?>
    <?php require_once '../components/univ-comps/banner.php'; ?>
    <?php require_once '../components/general-comps/chat-button.php'; ?>

    <main class="container mx-auto md:px-10 px-3 md:py-8 py-2">
        <?php require_once '../components/general-comps/search-section.php'; ?>
        <div id="searchResults" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-6" data-aos="fade-up" data-aos-delay="200"></div>
    </main>

    <?php require_once '../components/general-comps/footer.php'; ?>

    <script src="./js/univ-list.js"></script>
    <script src="../app.js"></script>
</body>
</html>
