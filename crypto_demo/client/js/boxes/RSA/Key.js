function generate_e(phi) {
    var e;

    do {
        e = random_integer(1, phi);
    }
    while(gcd(e, phi) != 1);

    return e;
}

$("#rsa_pq").click(function() {
    $("#rsa_p").val(random_prime()).prop('disabled', false);
    $("#rsa_q").val(random_prime()).prop('disabled', false);

    $("#rsa_nphi").prop('disabled', false);
});

$("#rsa_nphi").click(function() {
    var p = parseInt($("#rsa_p").val());
    var q = parseInt($("#rsa_q").val());

    $("#rsa_n").val(Big(p).mul(q).toString()).prop('disabled', false);
    $("#rsa_phi").val(Big(p-1).mul(q-1).toString()).prop('disabled', false);

    $("#rsa_ed").prop('disabled', false);

    $("#rsa_pq").one('click', function() {
        $("#rsa_nphi").click();
    });
});

$("#rsa_ed").click(function() {
    var phi = parseInt($("#rsa_phi").val());
    var n = parseInt($("#rsa_n").val());
    var e = generate_e(phi);
    var eg = egcd(e, phi);
    var d = eg[0] < 0 ? phi + eg[0] : eg[0];

    $("#rsa_e").val(e).prop('disabled', false);
    $("#rsa_d").val(d).prop('disabled', false);

    $("#rsa_pub").val("(" + n + ", " + e + ")");
    $("#rsa_sec").val("(" + n + ", " + d + ")");
    $("#rsa_output").show();

    $("#rsa_nphi").one('click', function() {
        $("#rsa_ed").click();
    });
});