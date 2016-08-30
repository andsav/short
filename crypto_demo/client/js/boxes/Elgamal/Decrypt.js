$("#elgamal_decrypt").click(function() {
    var p = $("#elgamal_p").val();
    var c = $("#elgamal_c").val();
    var x = $("#elgamal_x").val();


    var c_regex = /^\(((\d)+), ?((\d)+)\)$/;

    try {
        if(p.length == 0) throw("Empty p");
        if(c.length == 0) throw("Empty ciphertext");
        if(x.length == 0) throw("Empty private key");
        if(!c_regex.test(c)) throw("Invalid ciphertext encoding");

        var c_arr = c_regex.exec(c);
        var c1 = c_arr[1];
        var c2 = c_arr[3];

        var c1_inv = egcd(c1, p)[0];
        if(c1_inv < 0)
            c1_inv += p;

        $("#elgamal_m").val(mod_exp(c2 * mod_exp(c1_inv, x, p), 1, p));
        $("#elgamal_output").show();

    } catch(err) {
        alert(err);
        return false;
    }
});