<h1>Possible Matches</h1>
<ul>
    <?php foreach($matches as $match): ?>
    <li>
        <?= htmlentities($match['zip']) ?>
        <?= htmlentities($match['state']) ?>
    </li>
    <?php endforeach; ?>
</ul>
