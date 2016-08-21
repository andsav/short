const API_CALL_TIMEOUT = 12000;

function call(row, i) {
    if (i < row.length) {
        var isbn, title, price, url, author;
        var $this = $(row[i]);

        isbn = $this.find(".isbn").html();
        title = $this.find(".title").html();
        author = $this.find(".author").html();
        price = parseFloat($this.find(".price").html());
        url = $this.find(".url").html();

        $.get('server/details.php?url=' + url, function (d) {
            $.post('list.php', {
                list: true,
                book_isbn: isbn,
                book_title: title,
                book_author: author,
                book_price: price,
                book_description: d.description,
                book_picture: d.picture
            }, function (data) {
                console.log(data);
            }, 'json');

        }, 'json');

        setTimeout(function () {
            call(row, i + 1);
        }, API_CALL_TIMEOUT);
    }
}

$(document).on('click', '#run_list', function () {
    call($('tbody tr'), 0);
});