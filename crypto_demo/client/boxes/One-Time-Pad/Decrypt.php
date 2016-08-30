<?php choose_input_encoding() ?>

<hr>

<div class="row">
    <div class="col-sm-12">
        <input class="form-control enc_input" type="text" id="1tp_d_c" placeholder="Ciphertext" disabled>
    </div>
</div>
<div class="row">
    <div class="col-sm-12">
        <input class="form-control enc_input" type="text" id="1tp_d_k" placeholder="Key" disabled>
    </div>
</div>

<div class="row text-center">
    <button class="btn btn-default enc_input" id="1tp_decrypt" disabled>Decrypt</button>
</div>


<div id="1tp_d_output" style="display:none">
    <hr>
    <div class="row">
        <div class="col-sm-2 text-right">
            <label for="1tp_d_m">Message:</label>
        </div>
        <div class="col-sm-10">
            <input class="form-control" id="1tp_d_m" readonly>
        </div>
    </div>

    <!--
    <div class="row">
        <div class="col-sm-2 text-right">
            <label for="1tp_d_m_utf8">UTF-8:</label>
        </div>
        <div class="col-sm-10">
            <input class="form-control" id="1tp_d_m_utf8" readonly>
        </div>
    </div>
    -->
</div>