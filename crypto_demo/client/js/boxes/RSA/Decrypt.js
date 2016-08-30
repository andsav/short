$("#rsa_decrypt").click(function() {
    var nd = $("#rsa_nd").val();
    var c = $("#rsa_c").val();

    var nd_regex = /^\(((\d)+), ?((\d)+)\)$/;

    try {
        if(nd.length == 0) throw("Empty private key");
        if(c.length == 0) throw("Empty ciphertext");
        if(!nd_regex.test(nd)) throw("Invalid private key encoding");
        if(parseInt(c) != c) throw("Invalid ciphertext (must be an integer)");

        var nd_arr = nd_regex.exec(nd);
        var n = nd_arr[1];
        var d = nd_arr[3];

        var m = mod_exp(c, d, n);

        $("#rsa_m").val(m);
        $("#rsa_output").show();

    } catch(err) {
        alert(err);
        return false;
    }
});