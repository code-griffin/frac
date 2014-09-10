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

function change_stage(direction) {
    var job_id = $('#job-stages').attr('job_id');
    var stage_no = $('.job-stage').attr('stage_no');
    if (direction == 'next') {
        stage_no = parseInt(stage_no) + 1;
    } else if (direction == 'prev') {
        stage_no = parseInt(stage_no) - 1;
    }

    data = {job_id: job_id, stage_no: stage_no};

    $.ajax({
        type:'PUT',
        url: '/jobs/change_stage',
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

    $('.number').each(function(){
        var value = numberWithCommas($(this).html());
        $(this).html(numberWithCommas(value));
    });

    $(document.body).on('click', '.update-status, .custom-dropdownInner', function() {
//    $('.update-status, .custom-dropdownInner').click(function(){
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
        dropdown.find('option').each(function() {
            var option_val = $(this).val();
            var option_text = $(this).text();
            if($(this).is(':selected')){
                dropdown_options.append('<li class="dropdown-option active" data-option="'+ option_val +'">' + option_text + '</li>')
            } else{
                dropdown_options.append('<li class="dropdown-option" data-option="'+ option_val +'">' + option_text + '</li>')
            }
        });

        overlay.fadeIn();

        var stage = $(this).closest('.job-stage');
        var stage_name = stage.find('h2').text();

        overlay.find('h4').remove();
        overlay.prepend('<h4>'+ stage_name +' Status</h4>');

        var dropdown_option = $('.dropdown-option');
        $(document.body).on('click', '.dropdown-option', function() {
//        dropdown_option.click(function(){
            dropdown_option.removeClass('active');
            $(this).addClass('active');
            var option_value = $(this).data('option');
            dropdown.val(option_value);
            dropdown.trigger('render');
            overlay.fadeOut();

            update_status(option_value);
        })
    });

    $(document.body).on('click', '.stage-nav .left', function() {
        change_stage('prev');
    });

    $(document.body).on('click', '.stage-nav .right', function() {
        change_stage('next');
    });
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
    } else {
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