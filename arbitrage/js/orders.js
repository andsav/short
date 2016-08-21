const CONTROLER_URL = 'server/orders.php';

$("#totals").prependTo($('center'));
$("#opened_count").appendTo("#filter");

$(document).on('click', '#run_orders', function () {
    $.post(CONTROLER_URL, {list: true});
})
    .on('click', '.tr_open td:first-child', function () {
        $(this).parent().removeClass('tr_open').addClass('tr_ordered');
        $.post(CONTROLER_URL, {transaction_id: $(this).parent().data('id'), status: 'ordered'})
    })
    .on('click', '.tr_ordered td:first-child', function () {
        $(this).parent().removeClass('tr_ordered').addClass('tr_dispatched');
        $.post(CONTROLER_URL, {transaction_id: $(this).parent().data('id'), status: 'dispatched'})
    })
    .on('submit', '.update_bd_id', function (e) {
        e.preventDefault();

        var data = $(this).serializeArray().reduce(function (obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});

        $.post(CONTROLER_URL, data);

        $(this)[0].innerHTML = data.bd_id;

        return false;
    });