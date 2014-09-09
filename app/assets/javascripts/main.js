function update_status(value) {
    var job_id = $('#job-stages').attr('job_id');
    var stage_no = $('.current-stage').attr('stage_no');

    data = {job_id: job_id, stage_no: stage_no, status_id: value};

    $.ajax({
        type:'PUT',
        url: '/jobs/update_status',
        data: data,
        beforeSend: function(request) { request.setRequestHeader("Accept", "text/javascript"); },
        success: function(res) {}
    })
}

$(document).ready(function(){
//    container_height();
    $('.dropdown').customSelect({
        customClass:'custom-dropdown'
    });

    $('#job-stages .job-stage li.last').on('ifCreated', function(event){
//        $('li.sand').css('visibility', 'visible');
        $('li.sand').show();
        $('.current-stage .product-container').removeClass('loading');
    });
    $('.checkbox').iCheck({
        checkboxClass: 'custom-checkbox'
    });
    $('.checkbox').iCheck('disable');
    $('.current-stage .checkbox').iCheck('enable');
    $('li.checked .checkbox').iCheck('check');

    $('.number').each(function(){
        var value = numberWithCommas($(this).html());
        $(this).html(numberWithCommas(value));
    });

    $('.checkbox').on('ifToggled', function(event){

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
        }
        else{
            product_left = product_left + amount;
            product_used = product_used - amount;
        }

        var sand_id = $(this).closest('li').attr('sand_id');
        var job_id = $('#job-stages').attr('job_id');
        var stage_no = $(this).closest('.job-stage').attr('stage_no');

        data = {job_id: job_id, stage_no: stage_no, sand_id: sand_id, flag: flag};
        console.log(data);
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

    $('.update-status, .custom-dropdownInner').click(function(){
        var dropdown;
        if($(this).hasClass('update-status')){
            dropdown = $(this).parent().find('select.dropdown');
        }
        if($(this).hasClass('custom-dropdownInner')){
            dropdown = $(this).parent().parent().find('select.dropdown');
        }
        var dropdown_options = $('#dropdown-options');
        var overlay = $('#mobile-overlay');

        dropdown_options.empty();
        dropdown.find('option').each(function()
        {
            var option_val = $(this).val();
            var option_text = $(this).text();
            if($(this).is(':selected')){
                dropdown_options.append('<li class="dropdown-option active" data-option="'+ option_val +'">' + option_text + '</li>')
            }
            else{
                dropdown_options.append('<li class="dropdown-option" data-option="'+ option_val +'">' + option_text + '</li>')
            }

        });

        overlay.fadeIn();

        var stage = $(this).closest('.job-stage');
        var stage_name = stage.find('h2').text();

        overlay.find('h4').remove();
        overlay.prepend('<h4>'+ stage_name +' Status</h4>');

        var dropdown_option = $('.dropdown-option');

        dropdown_option.click(function(){
            dropdown_option.removeClass('active');
            $(this).addClass('active');
            var option_value = $(this).data('option');
            dropdown.val(option_value);
            dropdown.trigger('render');
            overlay.fadeOut();

            update_status(option_value);
        })
    });

    $('.stage-nav .left').click(function(){
        var current_job = $(this).closest('.job-stage');
        var prev_job = current_job.prev();
        if (prev_job.length) {
            current_job.removeClass('active')
            prev_job.addClass('active')
            prev_job.find('select.dropdown').trigger('render');
        }
    });

    $('.stage-nav .right').click(function(){
        var current_job = $(this).closest('.job-stage');
        var next_job = current_job.next();
        if (next_job.length) {
            current_job.removeClass('active')
            next_job.addClass('active')
            next_job.find('select.dropdown').trigger('render');
        }
    });
//    $('.time-info').each(function() {
//        var start_time = $(this).find('.start-time').text()/*+' '+ $(this).find('.start-time-ampm').text()*/;
//        var end_time = $(this).find('.end-time').text()/*+' '+ $(this).find('.end-time-ampm').text()*/;
//        start_time = parseTime(start_time);
//        end_time = parseTime(end_time);
//        if (end_time - start_time <= 0) {
//            end_time.setDate(end_time.getDate() + 1);
//        }
//        $(this).append($('<input type="hidden" />').addClass('start_time').val(start_time));
//        $(this).append($('<input type="hidden" />').addClass('end_time').val(end_time));
//        update_time($(this).closest('.job-stage'));
//    });
//    function update_time($elm) {
//        var start_time = new Date($elm.find('input.start_time').val());
//        var end_time = new Date($elm.find('input.end_time').val());
//
//        var diff_time = (end_time - start_time)/(60*60*1000);
//        $elm.find('.status-bar p.total').html(diff_time.toFixed(2) + " <span>hrs</span>");
//
//        var elapsed = $elm.find('.status-bar p.elapsed').text();
//        elapsed = Number($.trim(elapsed.replace('hrs','')));
//
//        var percent = Math.min((elapsed/diff_time)*100,100);
//        $elm.find('.status-bar .bar').css('width', percent+'%');
//
//        var hours = end_time.getHours();
//        var minutes = end_time.getMinutes();
//        //var ampm = hours >= 12 ? 'pm' : 'am';
//        //hours = hours % 12;
//        //hours = hours ? hours : 12;
//        hours = hours < 10 ? '0'+hours : hours;
//        minutes = minutes < 10 ? '0'+minutes : minutes;
//        $elm.find('.end-time').text(hours+':'+minutes);
//        //$elm.find('.end-time-ampm').text(ampm);
//    }
//    $('.add-time').click(function(){
//        var start_time = new Date($(this).closest('.job-stage').find('input.start_time').val());
//        var end_time = new Date($(this).closest('.job-stage').find('input.end_time').val());
//        end_time.setMinutes(end_time.getMinutes() + 15);
//        $(this).closest('.job-stage').find('input.end_time').val(end_time);
//        update_time($(this).closest('.job-stage'));
//    });
//    $('.remove-time').click(function(){
//        var start_time = new Date($(this).closest('.job-stage').find('input.start_time').val());
//        var end_time = new Date($(this).closest('.job-stage').find('input.end_time').val());
//        end_time.setMinutes(end_time.getMinutes() - 15);
//        if (end_time - start_time > 0) {
//            $(this).closest('.job-stage').find('input.end_time').val(end_time);
//            update_time($(this).closest('.job-stage'));
//        }
//    });
});


function parseTime(timeStr, dt) {
    if (!dt) {
        dt = new Date();
    }
    var time = timeStr.match(/(\d+)(?::(\d\d))?\s*(p?)/i);
    if (!time) {
        return NaN;
    }
    var hours = parseInt(time[1], 10);
    if (hours == 12 && !time[3]) {
        hours = 0;
    }
    else {
        hours += (hours < 12 && time[3]) ? 12 : 0;
    }
    dt.setHours(hours);
    dt.setMinutes(parseInt(time[2], 10) || 0);
    dt.setSeconds(0, 0);
    return dt;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function container_height(){
    var window_height = $(window).height();
    var container_height = $('.container').outerHeight();

    if(window_height >= container_height){
        $('.container').css('height', window_height);
    } else{
        $('.container').css('height', 'auto');
    }
}