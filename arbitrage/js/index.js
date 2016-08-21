var loaded_scripts = [];

$(function () {
    $('a.pure-button').click(function (e) {
        e.preventDefault();

        $(this).parent().find('.active').removeClass('active');
        $(this).addClass('active');

        var href = $(this).attr('href');

        $.get($(this).attr('href'), function (data) {
            var page = href.split('.')[0].split('/')[1];

            $("#page").hide().html(data);

            if (loaded_scripts.indexOf(page) == -1) {
                $.getScript("js/" + page + ".js")
                    .done(function () {
                        $("#page").show();
                        loaded_scripts.push(page);
                    });
            }
            else {
                $("#page").show();
            }
        });

        return false;
    });
});