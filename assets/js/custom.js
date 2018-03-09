$('#datepicker').datepicker();
$('#datepicker').on('changeDate', function() {
    $('#hidden_date_field').val(
        $('#datepicker').datepicker('getFormattedDate')
    );
});
