function showLimitData (maxLength) {
    let limit = 3;
    $('#data-table tbody tr').hide();
    $('#data-table tbody tr').slice(0, limit).show();
    $('#js--load-more').on('click', function (e) {
        limit += 3;
        $('#data-table tbody tr').slice(0, limit).fadeIn();
        if (limit >= maxLength) {
            $(this).fadeOut();
        } else {
            $(this).fadeIn();
        }
        e.preventDefault();
    });
    if (limit >= maxLength) {
        $('#js--load-more').fadeOut();
    } else {
        $('#js--load-more').fadeIn();
    }
}

function filterData () {
    $('#js--search-data').on('keyup', function() {
        $('#js--load-more').fadeOut();
        let value = $(this).val().toLowerCase();
        $('#data-table tbody tr').filter(function() {
            $(this).toggle($(this).text().toLowerCase().includes(value));
        });
        let limit = 3;
        let length = $('#data-table tbody tr:visible').length;
        $('#data-table tbody tr:visible').hide().slice(0, limit).show();
        $('#js--see-more').on('click', function (e) {
            limit += 3;
            $('#data-table tbody tr:visible').slice(0, limit).fadeIn();
            if (limit >= length) {
                $(this).fadeOut();
            } else {
                $(this).fadeIn();
            }
            e.preventDefault();
        });
        if (limit >= length) {
            $('#js--see-more').fadeOut();
        } else {
            $('#js--see-more').fadeIn();
        }
    });
}

$.ajax({
    type:'GET',
    url:'http://localhost:3000/log',
    crossDomain : true,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: (json) => {
        json.sort().reverse();
        json.forEach((data, index) => {
            const htmlView = `<tr>
                                <td>${index+1}</td>
                                <td>${data.time}</td>
                                <td>${data.application_name}</td>
                                <td>${data.level}</td>
                                <td>${data.file.file_name}</td>
                                <td>${data.file.action}</td>
                                <td>${data.file.status}</td>
                            </tr>`;
            $('#data-table tbody').append(htmlView);
            $('#js--see-more').fadeOut();
            showLimitData(json.length);
            filterData();
        });
    },
    error: (e) => {
        console.log(e);
    }
});