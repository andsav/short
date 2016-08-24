<?php

function choose_output_encoding() {
?>
    <div class="row text-center" id="choose_output_encoding">
        <div class="btn-group disabled" data-toggle="buttons">
            <label class="btn btn-default active">
                <input type="radio" name="enc" value="bin" autocomplete="off" checked> Binary
            </label>
            <label class="btn btn-default">
                <input type="radio" name="enc" value="hex" autocomplete="off"> Hex
            </label>
            <label class="btn btn-default">
                <input type="radio" name="enc" value="b64" autocomplete="off"> Base64
            </label>
        </div>
    </div>
<?php
}

function choose_input_encoding() {
    ?>
    <div class="row text-center" id="choose_input_encoding">
        <div class="btn-group disabled" data-toggle="buttons">
            <label class="btn btn-default">
                <input type="radio" name="input_enc" value="bin" autocomplete="off"> Binary Input
            </label>
            <label class="btn btn-default">
                <input type="radio" name="input_enc" value="hex" autocomplete="off"> Hex Input
            </label>
            <label class="btn btn-default">
                <input type="radio" name="input_enc" value="b64" autocomplete="off"> Base64 Input
            </label>
        </div>
    </div>
<?php
}