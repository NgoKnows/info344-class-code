<?php
$name = rand(0, 100);
?>

<!doctype html>
<html lang="en">
<head>
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta charset="UTF-8">
    <title>Hello <?= htmlentities($name) ?>!</title>
</head>
<body>
    <h1>Hello <?= htmlentities($name) ?>!</h1>
</body>
</html>