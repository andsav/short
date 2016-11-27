<?php


if(!empty(PATH) && PATH[0] == 'c' && sizeof(PATH) > 2) {
    $path = CLIENT_ROOT . 'boxes/' . PATH[1] . '/' . PATH[2] . '.php';
    if(file_exists($path)) require $path;
    else _404();
    die;
}
elseif(!empty(PATH)) _404();

?>
<!doctype html>
<html>
<head>
    <meta charset="utf-8">

    <title>CO487 Implementations</title>

    <link rel="stylesheet" href="/client/css/main.css">
    <link rel="stylesheet" href="/client/bower_components/bootstrap/dist/css/bootstrap.min.css">

    <!--[if lt IE 9]>
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
</head>
<body>
    <div id="the-modal" class="modal" role="dialog" data-backdrop="static">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 id="modal-title" class="modal-title"></h4>
                </div>
                <div id="modal-body" class="modal-body"></div>
            </div>

        </div>
    </div>

    <div id="links" style="border: 0; background: none; margin-bottom: 25px">
        <center>
            <h1 style="text-decoration: underline">CO487 Implementations</h1>
        </center>
    </div>
    <div id="wrap">
        <div class="tab" id="implementations">
            <div class="row menu">
                <div class="col-md-4 col-sm-6">
                    <h3>Stream Ciphers</h3>
                    <ul>
                        <li><strong>One-Time-Pad</strong> [ <a href>Encrypt</a> | <a href>Decrypt</a> ]</li>
                    </ul>
                </div>
                <div class="col-md-4 col-sm-6">
                    <h3>Hash Functions</h3>
                    <ul>
                        <li><strong>MD5</strong> [ <a href>Hash</a> | <a href>Verify</a> ]</li>
                    </ul>
                </div>
                <div class="col-md-4 col-sm-6">
                    <h3>Public-Key Schemes</h3>
                    <ul>
                        <li><strong>RSA</strong> [ <a href>Key</a> | <a href>Encrypt</a> | <a href>Decrypt</a> ]</li>
                        <li><strong>Elgamal</strong> [ <a href>Key</a> | <a href>Encrypt</a> | <a href>Decrypt</a> ]</li>
                    </ul>
                </div>
            </div>
            <hr>
            <div class="row menu">
                <div class="col-md-4 col-sm-6">
                    <h3>Block Ciphers</h3>
                    <ul>
                        <li><strong>DES</strong> [ <a href>Encrypt</a> | <a href>Decrypt</a> ]</li>
                    </ul>
                </div>
                <div class="col-md-4 col-sm-6">
                    <h3>Message Authentication Codes</h3>
                    <ul>
                        <li><strong>HMAC</strong> [ <a href>Hash</a> | <a href>Verify</a> ]</li>
                    </ul>
                </div>
                <div class="col-md-4 col-sm-6">
                    <h3>Digital Signatures</h3>
                    <ul>
                        <li><strong>DSA</strong> [ <a href>Sign</a> | <a href>Verify</a> ]</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <script src="/client/bower_components/big.js/big.min.js"></script>

    <script src="/client/bower_components/jquery/dist/jquery.min.js"></script>

    <script src="/client/bower_components/lodash/dist/lodash.min.js"></script>

    <script src="/client/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>

    <script src="/client/js/main.js"></script>
</body>
</html>
