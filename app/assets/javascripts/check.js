$(document).ready(function(){

    container_height();

    $('.checkbox').iCheck({
        checkboxClass: 'custom-checkbox'
    });
    $('.checkbox').iCheck('disable');
    $('.current-stage .checkbox').iCheck('enable');
    $('li.checked .checkbox').iCheck('check');

    $(document.body).on('ifClicked', '.current-stage .checkbox', function(event){

        var product_total = $(this).closest('.product-container').find('.product-total').text();

        var product_used = $(this).closest('.product-container').find('.product-used').text();
        product_used = Number(product_used.replace(/[^\d.-]/g, ''));

        var product_left = $(this).closest('.product-container').find('.product-left').text();
        product_left = Number(product_left.replace(/[^\d.-]/g, ''));

        var amount = $(this).parent().next().find('.amount').text();
        amount = Number(amount.replace(/[^\d.-]/g, ''));

        var flag = 0;
        if( !$(this).parent().hasClass('checked')){
            product_left = product_left - amount;
            product_used = product_used + amount;
            flag = 1;
        } else{
            product_left = product_left + amount;
            product_used = product_used - amount;
        }

        var sand_id = $(this).closest('li').attr('sand_id');
        var job_id = $('#job-stages').attr('job_id');
        var stage_no = $(this).closest('.job-stage').attr('stage_no');

        data = {job_id: job_id, stage_no: stage_no, sand_id: sand_id, flag: flag};

        $.ajax({
            type:'PUT',
            url: '/jobs/add_sand',
            data: data,
            beforeSend: function(request) { request.setRequestHeader("Accept", "text/javascript"); },
            success: function(res) {}
        })

        $(this).closest('.product-container').find('.product-left').html(numberWithCommas(product_left));
        $(this).closest('.product-container').find('.product-used').html(numberWithCommas(product_used));
    });
});