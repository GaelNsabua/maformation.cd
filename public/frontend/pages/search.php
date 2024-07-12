<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php require_once '../components/general-comps/head.php'; ?>
    <title>search_universities</title>
</head>
<body class="bg-gray-100">
    <?php require_once '../components/general-comps/navbar.php'; ?>
    <?php require_once '../components/search-comps/banner.php'; ?>

    <main class="container mx-auto md:px-20 px-3 md:py-8 py-2">
        <?php require_once '../components/general-comps/search-section.php'; ?>
        <div class="bg-green-400 text-white text-center p-4 rounded-md mx-auto shadow-lg my-3 max-w-xl transform scale-0 duration-200" id="search-message"><h1 class="font-medium">Voici les resultats qui repondent aux critères de votre recherche</h1></div>
        <div class="my-3 text-transparent">
            <h1>maformation</h1>
        </div>
        <div id="search-results" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto"></div>
        <div id="searchResults" class="grid grid-cols-1 gap-4 my-6 mx-auto"></div>
    </main>

    <?php require_once '../components/general-comps/footer.php'; ?>

    <div id="notification-container" class="fixed top-0 right-0 m-4 z-50"></div>

    <script src="./js/search.js"></script>
    <script src="../app.js"></script>
</body>
</html>
