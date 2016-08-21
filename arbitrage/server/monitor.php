<?php

require '_.php';

$books = $db->query('SELECT l.id, b.name, l.price, b.price AS cost, ROUND(l.price - b.price * 1.3 - .3 - .129*l.price, 2) AS margin
                      FROM `books` b 
                      INNER JOIN `listings` l ON l.`isbn` = b.`isbn`
                      ORDER BY margin');

?>

<center>
    <table class="pure-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Margin</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach($books as $b): ?>
                <tr>
                    <td><?=$b['id']?></td>
                    <td><?=$b['name']?></td>
                    <td><?=$b['margin']?></td>
                </tr>
            <?php endforeach ?>
        </tbody>
    </table>
</center>
