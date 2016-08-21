<?php
use Goutte\Client;

require '_.php';

$client = new Client;
$crawler = $client->request('GET', $_GET['url']);
$picture = $crawler->filter('.book-img')->attr('src');
$description = trim($crawler->filter('p[itemprop="description"]')->html());

echo json_encode([
    'picture' => $picture,
    'description' => $description
]);