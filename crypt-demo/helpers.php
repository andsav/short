<?php

const ROOT = __DIR__ . '/';
const CLIENT_ROOT = ROOT . 'client/';
const SERVER_ROOT = ROOT . 'server/';

require CLIENT_ROOT . 'helpers.php';

function _abort(int $code, string $message):bool {
    ob_get_length() > 0 and ob_end_clean();

    if(ENV == 'server') {
        echo json_encode(['error' => ['code' => $code, 'message' => $message]]);
        die;
        return false;
    }
    ?>

    <!doctype html>
    <html>
    <head>
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet"
              integrity="sha256-7s5uDGW3AHqw6xtJmNNtr+OBRJUlgkNJEo78P4b0yRw= sha512-nNo+yCHEyn0smMxSswnf/OnX6/KwJuZTlNZBjauKhTK0c+zT+q5JOCx0UFhXQ6rJR9jg6Es8gPuD2uZcYDLqSw=="
              crossorigin="anonymous">
        <title>ERROR <?=$code?></title>
    </head>
    <body class="text-center">
    <h1>Something Bad Happened</h1>
    <div class="alert alert-danger" style="margin: 10px 100px">
        <strong>Error <?=$code .' : '. $message?></strong>
    </div>

    </body>
    </html>

    <?php
    http_response_code($code);
    die;
    return false;
}


function _403() { return _abort(403, 'Unauthorized access'); }
function _404() { return _abort(404, 'Page does not exist'); }
function _500() { return _abort(500, 'Server Error'); }


function _p(string $path):string {
    return '/client/' . $path;
}

function _controller(string $c) {
    $c = SERVER_ROOT . 'controllers/' . $c . '.php';
    file_exists($c) or _404();

    require $c;
    isset($_RETURN) or _500();

    return $_RETURN;
}