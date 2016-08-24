$("#elgamal_rgen").click(function() {
    var p = $("#elgamal_p").val();
    var g = $("#elgamal_g").val();
    var m = $("#elgamal_m").val();
    var k = $("#elgamal_k_pub").val();

    try {
        if(p.length == 0 || g.length == 0 || m.length == 0 || k.length == 0) throw("Incomplete form");
        if(parseInt(p) != p) throw("Invalid p value"); // Do other checks...
        if(parseInt(g) != g) throw("Invalid g value");
        if(parseInt(m) != m) throw("Invalid m value");
        if(parseInt(k) != k) throw("Invalid k_pub value");

        $("#elgamal_r").val(random_integer(1, p-1)).prop('disabled', false);
        $("#elgamal_encrypt").prop('disabled', false);
    }
    catch(err) {
        alert(err);
        return false;
    }
});

$("#elgamal_encrypt").click(function() {
    var p = $("#elgamal_p").val();
    var g = $("#elgamal_g").val();
    var m = $("#elgamal_m").val();
    var r = $("#elgamal_r").val();
    var k = $("#elgamal_k_pub").val();


    try {
        if(p.length == 0 || g.length == 0 || m.length == 0 || k.length == 0) throw("Incomplete form");
        if(parseInt(p) != p) throw("Invalid p value"); // Do other checks...
        if(parseInt(g) != g) throw("Invalid g value");
        if(parseInt(m) != m) throw("Invalid m value");
        if(parseInt(k) != k) throw("Invalid k_pub value");

        var c = '(' + mod_exp(g, r, p) + ', ' + Big(m).mul(mod_exp(k, r, p)).toString() + ')';

        $("#elgamal_c").val(c);
        $("#elgamal_output").show();

    } catch(err) {
        alert(err);
        return false;
    }

    $("#elgamal_rgen").one('click', function() {
        $("#elgamal_encrypt").click();
    });
});