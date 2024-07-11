<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php require_once '../components/general-comps/head.php'; ?>
    <title>universitie-details</title>
</head>
<body class="bg-gray-100">
    <?php require_once '../components/general-comps/navbar.php'; ?>
    <?php require_once '../components/univ-comps/banner.php'; ?>
    <?php //echo "<h1>{$_GET['id']}</h1>" ?>

    <main class="mt-2 p-4 container mx-auto">
        <div id="universityDetails" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        </div>
    </main>

    <?php require_once '../components/general-comps/footer.php'; ?>

    <script src="./js/univ-details.js"></script>
    <script src="../app.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</body>
</html>
