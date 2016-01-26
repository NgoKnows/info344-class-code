<?php
require_once 'connection.php';
require_once 'models/message.php';

$conn = getConnection();
$messageModel = new Messages($conn);

$messages = $messageModel->getAll();
var_dump($messages)
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Chat App</title>
</head>
<body>
   <h1>Messages</h1>

    <ul>
        <?php foreach($messages as $message): ?>
        <li>
            <?= htmlentities($message['nickname']) ?>
            <?= htmlentities($message['content']) ?>
        </li>
        <?php endforeach; ?>
    </ul>
    
    <form action="" method="GET">
        <div class="form-group">
            <input type="text" 
                id="input" 
                name="input"
                class="form-control" 
                value=""
                placeholder="Put your message here!"
                required
                >
        </div>
        <div class="form-group">
            <button class="btn btn-primary" type="submit"></button>
        </div>
    </form>

</body>
</html>