<div class="row">
    <div class="col-sm-2 text-right">
        <label for="rsa_nd">Private Key:</label>
    </div>
    <div class="col-sm-10">
        <input class="form-control" type="text" id="rsa_nd" placeholder="(n, d)">
    </div>
</div>

<div class="row">
    <div class="col-sm-2 text-right">
        <label for="rsa_c">Ciphertext (int):</label>
    </div>
    <div class="col-sm-10">
        <input class="form-control" type="text" id="rsa_c">
    </div>
</div>

<div class="row text-center">
    <button id="rsa_decrypt" class="btn btn-default">Decrypt</button>
</div>


<div id="rsa_output" style="display:none">
    <hr>
    <div class="row">
        <div class="col-sm-2 text-right">
            <label for="rsa_m">Message:</label>
        </div>
        <div class="col-sm-10">
            <input class="form-control" type="text" id="rsa_m" readonly>
        </div>
    </div>
</div>