<div class="row">
    <div class="col-sm-2 text-right">
        <label for="1tp_m_utf8">Text (UTF-8):</label>
    </div>
    <div class="col-sm-8">
        <input class="form-control" type="text" id="1tp_m_utf8" placeholder="Text to Encrypt (UTF-8)">
    </div>
    <div class="col-sm-2">
        <button class="btn btn-default form-control" id="1tp_utf82bin">To Binary</button>
    </div>
</div>
<div class="row">
    <div class="col-sm-2 text-right">
        <label for="1tp_m_bin">Text (Binary):</label>
    </div>
    <div class="col-sm-8">
        <input class="form-control" type="text" id="1tp_m_bin" placeholder="Binary-Encoded Text" readonly disabled>
    </div>
    <div class="col-sm-2">
        <button class="btn btn-default form-control" id="1tp_gen_key" disabled>Generate Key</button>
    </div>
</div>
<div class="row">
    <div class="col-sm-2 text-right">
        <label for="1tp_k_bin">Random Key</label>
    </div>
    <div class="col-sm-8">
        <input class="form-control" type="text" id="1tp_k_bin" placeholder="Binary Key" readonly disabled>
    </div>
    <div class="col-sm-2">
        <button class="btn btn-default form-control" id="1tp_encrypt" disabled>Encrypt</button>
    </div>
</div>
<div id="1tp_output" style="display:none">
    <hr>
    <div class="row">
        <div class="col-sm-2 text-right">
            <label for="1tp_k">Key:</label>
        </div>
        <div class="col-sm-10">
            <input class="form-control enc_output" data-enc="bin" type="text" id="1tp_k" readonly>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-2 text-right">
            <label for="1tp_c">Ciphertext:</label>
        </div>
        <div class="col-sm-10">
            <input class="form-control enc_output" data-enc="bin" type="text" id="1tp_c" readonly>
        </div>
    </div>

    <?php choose_output_encoding() ?>
</div>

