$(function(){
    $('#date').datepicker({
        format: 'dd-mm-yyyy',
        startDate: '-3d',
        autoclose: true,
        container: '#date'
    });
})