<?php
$startTime = microtime(true);

// Get the requested path as an array, disregarding empty elements
define('PATH',
        array_values(array_filter(explode('/', $_SERVER['REQUEST_URI']),
                     function($e) { return !empty($e); })));

define('ENV',
        empty(PATH) || PATH[0] != 's'
            ? 'client'
            : 'server');

require 'config.php';
require 'helpers.php';

session_start();
ob_start();

require ENV . '/index.php';

ob_end_flush();
echo '<!-- Execution Time: '.round(microtime(true)-$startTime,5).'-->';
