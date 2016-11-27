<div class="row">
    <div class="col-sm-2 text-right">
        <label for="elgamal_p">p:</label>
    </div>

    <div class="col-sm-10">
        <input class="form-control" type="text" id="elgamal_p" placeholder="p">
    </div>
</div>

<div class="row">
    <div class="col-sm-2 text-right">
        <label for="elgamal_c">Ciphertext:</label>
    </div>

    <div class="col-sm-10">
        <input class="form-control" type="text" id="elgamal_c" placeholder="(c1, c2)">
    </div>
</div>

<div class="row">
    <div class="col-sm-2 text-right">
        <label for="elgamal_x">Private Key:</label>
    </div>

    <div class="col-sm-10">
        <input class="form-control" type="text" id="elgamal_x" placeholder="x">
    </div>
</div>

<div class="row text-center">
    <button class="btn btn-default" id="elgamal_decrypt">Decrypt</button>
</div>

<div id="elgamal_output" style="display:none">
    <hr>
    <div class="row">
        <div class="col-sm-2 text-right">
            <label for="elgamal_m">Plaintext:</label>
        </div>
        <div class="col-sm-10">
            <input class="form-control" type="text" id="elgamal_m" readonly>
        </div>
    </div>
</div>