function is_primitive_root(n, p) {
    var o = 1;
    var k = mod_exp(n, o, p);

    while(k > 1) {
        o++;
        k *= n;
        k %= p;
    }

    return !(o === (p - 1));
}

$("#elgamal_version_choose button").click(function() {
    $(".elgamal_version").hide();
    $($(this).data('target')).show();
    $("#elgamal_version_choose").hide();
    $("#modal-title").append(" - " + $(this).html());
});

$("#elgamal_pg").click(function() {
    var p = random_prime();
    do {
        g = random_integer(1, p);
    } while(!is_primitive_root(g, p));

    $("#elgamal_p").val(p).prop('disabled', false);
    $("#elgamal_g").val(g).prop('disabled', false);

    $("#elgamal_xgen").prop('disabled', false);
});

$("#elgamal_xgen").click(function() {
    var p = parseInt($("#elgamal_p").val());

    $("#elgamal_x").val(random_integer(1, p-1)).prop('disabled', false);

    $("#elgamal_keygen").prop('disabled', false);

    $("#elgamal_pg").one('click', function() {
        $("#elgamal_xgen").click();
    });
});

$("#elgamal_keygen").click(function() {
    var p = parseInt($("#elgamal_p").val());
    var g = parseInt($("#elgamal_g").val());
    var x = parseInt($("#elgamal_x").val());

    $("#elgamal_k_pub").val(mod_exp(g, x, p)).prop('disabled', false);
    $("#elgamal_k_sec").val(x).prop('disabled', false);

    $("#elgamal_output").show();

    $("#elgamal_xgen").one('click', function() {
        $("#elgamal_keygen").click();
    });
});