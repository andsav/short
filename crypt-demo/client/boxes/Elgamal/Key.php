<!--
<div class="row" id="elgamal_version_choose">
    <div class="col-sm-6 text-center">
        <button class="btn btn-lg btn-default" data-target="#elgamal_exp">Modular Exponentiation</button>
    </div>
    <div class="col-sm-6 text-center">
        <button class="btn btn-lg btn-default" data-target="#elgamal_elliptic">Elliptic Curve</button>
    </div>
</div>
-->

<div class="elgamal_version" id="elgamal_exp">
    <div class="row text-center">
        <button class="btn btn-default" id="elgamal_pg">Generate <i>p</i> and <i>g</i></button>
    </div>

    <div class="row">
        <div class="col-sm-6">
            <input class="form-control" type="text" id="elgamal_p" placeholder="p" disabled readonly>
        </div>
        <div class="col-sm-6">
            <input class="form-control" type="text" id="elgamal_g" placeholder="g large Integer mod p" disabled readonly>
        </div>
    </div>

    <div class="row text-center">
        <button class="btn btn-default" id="elgamal_xgen" disabled>Choose <i>x</i></button>
    </div>

    <div class="row">
        <div class="col-sm-12">
            <input class="form-control" type="text" id="elgamal_x" placeholder="x Integer 1 &lt;= x &lt;= p - 1" disabled readonly>
        </div>
    </div>

    <div class="row text-center">
        <button class="btn btn-default" id="elgamal_keygen" disabled>Generate Keypair (g<sup>x</sup> mod p and x)</button>
    </div>



    <div id="elgamal_output" style="display:none">
        <hr>

        <div class="row">
            <div class="col-sm-6">
                <input class="form-control" type="text" id="elgamal_k_pub" placeholder="k_pub = g^x" disabled readonly>
            </div>
            <div class="col-sm-6">
                <input class="form-control" type="text" id="elgamal_k_sec" placeholder="k_sec = x" disabled readonly>
            </div>
        </div>
    </div>
</div>
<div class="elgamal_version"  id="elgamal_elliptic" style="display:none">
</div>