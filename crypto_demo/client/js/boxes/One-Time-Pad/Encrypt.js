$("#1tp_utf82bin").click(function() {
    var input = $("#1tp_m_utf8").val();

    if(input.length == 0) {
        alert("Empty input");
        return false;
    }

    var utf8_array = string_to_utf8_array(input);
    var utf8_bin = int_array_to_bin_string(utf8_array);

    $("#1tp_m_bin").val(utf8_bin);
    $("#1tp_m_bin, #1tp_gen_key").prop('disabled', false);
});

$("#1tp_gen_key").click(function() {
    var key = random_bin_string($("#1tp_m_bin").val().length);

    $("#1tp_k_bin").val(key);
    $("#1tp_k_bin, #1tp_encrypt").prop('disabled', false);

    $("#1tp_utf82bin").one('click', function() {
        $("#1tp_gen_key").click();
    });
});

$("#1tp_encrypt").click(function() {
    var m = $("#1tp_m_bin").val();
    var k = $("#1tp_k_bin").val();
    var c = xor(m, k);
    var e =  $('input[name="enc"]:checked').val();

    $("#1tp_k").val(k.enc('bin', e));
    $("#1tp_c").val(c.enc('bin', e));

    $("#1tp_output").show();

    $("#1tp_gen_key").one('click', function() {
        $("#1tp_encrypt").click();
    });
});
