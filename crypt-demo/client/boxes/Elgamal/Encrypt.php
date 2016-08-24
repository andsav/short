<div class="row">
    <div class="col-sm-2 text-right">
        <label>Public Elements:</label>
    </div>

    <div class="col-sm-10">
        <div class="row">
            <div class="col-sm-6">
                <input class="form-control" type="text" id="elgamal_p" placeholder="p">
            </div>
            <div class="col-sm-6">
                <input class="form-control" type="text" id="elgamal_g" placeholder="g">
            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-sm-2 text-right">
        <label for="elgamal_m">Message (int):</label>
    </div>
    <div class="col-sm-10">
        <input class="form-control" type="text" id="elgamal_m" placeholder="m">
    </div>
</div>

<div class="row">
    <div class="col-sm-2 text-right">
        <label for="elgamal_k_pub">Public Key:</label>
    </div>
    <div class="col-sm-10">
        <input class="form-control" type="text" id="elgamal_k_pub" placeholder="k_pub">
    </div>
</div>

<div class="row text-center">
    <button class="btn btn-default" id="elgamal_rgen">Choose <i>r</i></button>
</div>

<div class="row">
    <div class="col-sm-12">
        <input class="form-control" type="text" id="elgamal_r" placeholder="r Integer 1 &lt;= x &lt;= p - 1" disabled readonly>
    </div>
</div>


<div class="row text-center">
    <button class="btn btn-default" id="elgamal_encrypt" disabled>Encrypt</button>
</div>

<div id="elgamal_output" style="display:none">
    <hr>
    <div class="row">
        <div class="col-sm-2 text-right">
            <label for="elgamal_c">Ciphertext:</label>
        </div>
        <div class="col-sm-10">
            <input class="form-control" type="text" id="elgamal_c" readonly>
        </div>
    </div>
</div>