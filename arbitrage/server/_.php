<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ERROR);

require __DIR__ . '/vendor/autoload.php';
require '_config.php';

$db = new MysqliDb(DB_DOMAIN, DB_USER, DB_PSWD, DB_DB);

// Target profit/item = $2

function list_price($cost)
{
    return round(2.64 + .1482 * ($cost * USD_GBP) + $cost * USD_GBP, 2);
}