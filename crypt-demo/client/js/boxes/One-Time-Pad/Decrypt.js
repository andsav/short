$("#1tp_decrypt").click(function() {
    var c = $("#1tp_d_c").val();
    var k = $("#1tp_d_k").val();
    var enc = $("#1tp_d_c").data('enc');

    var enc_valid = function(s) {
        return (enc == 'bin' ? Bin : enc == 'hex' ? Hex : B64).valid(s);
    };
    var enc_from = function(s) {
        return (enc == 'bin') ? s : enc == 'hex' ? Hex.from(s) : B64.from(s);
    };

    try {
        if(c.length == 0) throw("Empty ciphertext");
        if(k.length == 0) throw("Empty key");
        if(!enc_valid(c)) throw("Invalid ciphertext encoding");
        if(!enc_valid(k)) throw("Invalid key encoding");

        var c_bin = enc_from(c);
        var k_bin = enc_from(k);

        if(c_bin.length != k_bin.length) throw ("Incompatible key/ciphertext length");

        var m = xor(c_bin, k_bin);

        $('#1tp_d_m').val(m);

        //console.log(m.length);
        //$('#1tp_d_m_utf8').val(Hex.to(m.pad0(m.length + m.length % 7)));

        $('#1tp_d_output').show();

    } catch(err) {
        alert(err);
        return false;
    }
});

$("input[name='input_enc']").change(function() {
    $('#1tp_d_output').hide();
});

