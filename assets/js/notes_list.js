$(function () {

    $('#date_pick').datepicker({
        format: 'dd-mm-yyyy',
        autoclose: true,
        container: '#date_pick',
        changeMonth: true,
        changeYear: true
    });

    $('#date').datepicker({
        format: 'dd-mm-yyyy',
        autoclose: true,
        container: '#date_pick',
        changeMonth: true,
        changeYear: true
    })


    var dt_table = $('#list_table').DataTable({
        "processing": true,
        "serverSide": true,
        "paging": true,
        "dom": '<"top">lrt<"bottom"ip><"clear">',
        "ajax": {
            "contentType": "application/json",
            "url": locale_data.base_url + "notes/list",
            "type": "POST",
            "data": function (d) {
                return JSON.stringify(d);
            }
        },
        "columns": [{
                data: "title",
                searchable: false,
                orderable: false
            },
            {
                "data": "description",
                searchable: false,
                orderable: false
            },
            {
                "data": "date",
                searchable: false,
                orderable: false
            }
        ],
        "rowCallback": function (row, data, index) {

        },
    });


    $("#search_list").on('click', function () {
        var search = {};
        search.title = $("#title").val() || null;
        search.description = $('#description').val() || null;
        search.date = $("#dates").val() || null;
        dt_table.search(JSON.stringify(search)).draw();
    });

    $("#clear_list").on('click', function () {
        var clear = {};
        clear.name = null;
        dt_table.search(JSON.stringify(clear)).draw();
    })
})