var cryptoObj = window.crypto || window.msCrypto;

Bin = {
    valid : function(str) {
        return /^(0|1)+$/.test(str);
    }
};

Hex = {
    from: function(str) {
        var bytes = [];
        for(var i = 0; i < str.length; ++i) {
            bytes.push(
                (parseInt(str[i], 16) >>> 0)
                    .toString(2)
                    .pad0(4));
        }
        return bytes.join('');
    },
    to: function(str) {
        var bytes = str.match(/.{1,4}/g);
        return _.map(bytes, function(e) {
            return parseInt(e, 2).toString(16);
        }).join('');
    },
    valid: function(str) {
        return /^(\d|[a-fA-F])+$/.test(str);
    }
};

B64 = {
    sub: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/",
    from: function(str) {
        var ret = "";
        for(var i = 0; i < str.length; ++i) {
            ret += B64.sub.split('').indexOf(str[i]).toString(2).pad0(6);
        }
        return ret;
    },
    to: function(str) {
        var bytes = str.match(/.{1,6}/g);
        return _.map(bytes, function(e) {
            return B64.sub[parseInt(e, 2)];
        }).join('');
    },
    valid: function(str)  {
        return /^(\w|\+|\/)+$/.test(str);
    }
};

String.prototype.pad0 = function (len) {
    return String("0".repeat(len - this.length) + this);
};
String.prototype.enc = function(from, to) {
    if(from == to) return this;

    var source = (from == 'bin') ? this
        : (from == 'hex') ? Hex.from(this)
        : B64.from(this);

    return (to == 'bin') ? source
        : (to == 'hex') ? Hex.to(source)
        : B64.to(source);
};

function string_to_utf8_array(str) {
    // Input to base64
    var raw = window.atob(btoa(str));
    var rawLength = raw.length;

    // Out
    var utf8_array = new Uint8Array(new ArrayBuffer(rawLength));
    for(var i = 0; i < raw.length; i++) {
        utf8_array[i] = raw.charCodeAt(i);
    }

    return utf8_array;
}

function int_array_to_bin_string(arr) {
    return _.map(arr, function(n) {
        return (n >>> 0).toString(2);
    }).join('');
}

function random_bin_string(length) {
    var arr = new Int8Array(length);
    cryptoObj.getRandomValues(arr);

    return _.map(arr, function(n) {
        return (n < 0) ? 0 : 1;
    }).join('')
}

function xor(a, b) {
    var ret = "";

    for(var i = 0; i < (a.length > b.length ? a : b).length; ++i) {
        ret += (a[i] == b[i]) ? "0" : "1";
    }

    return ret;
}

function random_integer(a, b) {
    return Math.floor(Math.random()*(b-a+1)+a);
}

function random_prime() {
    var p;

    do {
        p = random_integer(1048576,8388608);
    }
    while(!fermat(p));

    return p;
}

// Fast modular exponentiation
function mod_exp(a, b, n) {
    a = a % n;
    var result = 1;
    var x = a;

    while(b > 0){
        var lastBit = b % 2;
        b = Math.floor(b / 2);

        if (lastBit == 1) {
            result *= x;
            result %= n;
        }

        x = x * x;
        x = x % n;
    }
    return result;
}

// Fermat's primarity test
function fermat(n) {
    // pick 5 random i s.t. 1 < a < n
    for(var i = 0; i < 5; ++i) {
        var a = random_integer(1, n);

        // Using Big.js to dela with large integers
        if(mod_exp(a, n-1, n) != 1)
            return false;
    }
    return true;
}

function egcd(a, b) {
    if (b == 0)
        return [1, 0, a];
    else {
        var temp = egcd(b, a % b);

        var x = temp[0];
        var y = temp[1];
        var d = temp[2];

        return [y, x-y*Math.floor(a/b), d];
    }
}

function gcd(a,b) {
    return egcd(a, b)[2];
}


$(function() {
    var max = 0;
    $('.menu .col-sm-4').each(function() {
       max = Math.max(max, $(this).height());
    });
    $('.menu .col-sm-4').height(max);


    $("#implementations a").click(function(e) {
        e.preventDefault();

        var title = $(this).parent().find('strong').html();
        var operation = $(this).html();

        $("#the-modal")
            .data("box", title + "-" + operation)
            .on('change', 'input[name="enc"]', function() {
                var to = $(this).val();

                $(".enc_output").each(function() {
                    $(this).val($(this).val().enc($(this).data('enc'), to));
                    $(this).data('enc', to);
                });
            })
            .on('change', 'input[name="input_enc"]', function() {
                $(".enc_input").val('').data('enc', $(this).val()).prop('disabled', false);
            });

        $.get("/c/" + title + "/" + operation)
            .done(function(d) {
                $('#modal-title')
                    .html(title + " " + operation);

                $("#modal-body")
                    .html(d);

                $.getScript("/client/js/boxes/" + title + "/" + operation + ".js")
                    .done(function() {
                        $("#the-modal")
                            .modal('show');
                    });
            })
            .fail(function() {
                alert("Operation not yet implemented");
            });

       return false;
    });

    $(".navbar a").click(function(e) {
        e.preventDefault();

        $('.navbar li').removeClass('active');
        $(this).parent().addClass('active');

        $('.tab').hide();
        $($(this).attr('href')).show();

        return false;
    });

    $(document).on('click', 'input[type=text]', function() {
        if($(this).prop('readonly'))
            this.select();
    });
});
