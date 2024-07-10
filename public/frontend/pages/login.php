<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php require_once '../components/general-comps/head.php'; ?>
    <title>Authentification</title>
</head>
<body class="bg-gray-100">
    <?php require_once '../components/general-comps/navbar.php'; ?>
    <div class="flex items-center justify-center h-screen pt-32">
        <div id="notification-container" class="fixed top-0 right-0 m-4"></div>
        <div class="w-full max-w-md py-14">
        <?php require_once '../components/log-comps/register.php'; ?>
        <?php require_once '../components/log-comps/login.php'; ?>
        </div>
    </div>
    <div class="my-8 text-transparent">
        <h1>maformation</h1>
    </div>

    <?php require_once '../components/general-comps/footer.php'; ?>

    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="../app.js"></script>
    <script src="./js/login.js"></script>
</body>
</html>
