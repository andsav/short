$("#rsa_encrypt").click(function() {
    var ne = $("#rsa_ne").val();
    var m = $("#rsa_m").val();

    var ne_regex = /^\(((\d)+), ?((\d)+)\)$/;

    try {
        if(ne.length == 0) throw("Empty public key");
        if(m.length == 0) throw("Empty message");
        if(!ne_regex.test(ne)) throw("Invalid public key encoding");
        if(parseInt(m) != m) throw("Invalid message (must be an integer)");

        var ne_arr = ne_regex.exec(ne);
        var n = ne_arr[1];
        var e = ne_arr[3];

        var c = mod_exp(m, e, n);

        $("#rsa_c").val(c);
        $("#rsa_output").show();

    } catch(err) {
        alert(err);
        return false;
    }
});