<?php
use Goutte\Client;

const BOOKS_COUNT = 150;

require '_.php';

if (isset($_POST['confirm'])) {
    $client = new Client;
    $crawler = $client->request('GET', 'https://www.bookdepository.com/bestsellers');

    $books = [];
    while(sizeof($books) < BOOKS_COUNT) {
        $crawler->filter('.book-item')->each(function ($node) use (&$books) {
            $book = [
                'url' => $node->filter('.title > a')->attr('href'),
                'price' => (double)explode("\n", (explode('£', $node->filter('.item-info')->text())[1]))[0]
            ];

            $node->filter('meta')->each(function ($meta) use (&$book) {
                $book[$meta->attr('itemprop')] = $meta->attr('content');
            });

            $book['isbn'] = (int)$book['isbn'];

            if ($book['price'] != 0)
                $books[] = $book;
        });
        $next = $crawler->filter('#next-top')->selectLink('»')->link();
        $crawler = $client->click($next);
    }

    $books = array_slice($books, 0, BOOKS_COUNT);

    $db->query('TRUNCATE TABLE `books`');
    $success = $db->insertMulti('books', $books);

    echo json_encode($success, JSON_PRETTY_PRINT);
    die;
}
?>

<form method="post" action="extract.php">
    <input onclick="if(!confirm('Are you sure?'))return false;" type="submit" name="confirm" value="New BD Data"
           class="pure-button pure-button-primary">
</form>


