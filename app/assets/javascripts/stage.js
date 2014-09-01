var interval = null;
$(function() {
    $(document.body).on('click', '.current-stage .stage-complete-button', function() {
        console.log('complete-button clicked');
        if($('.current-stage .add-time').hasClass('working')) return;
        if($('.current-stage .remove-time').hasClass('working')) return;
        if($(this).hasClass('working')) return;

        var job_id = $('#job-stages').attr('job_id');
        var stage_no = $(this).closest('.job-stage').attr('stage_no');
        var status_id = $('.current-stage .status-container select.dropdown').val();

        data = {job_id: job_id, stage_no: stage_no, status_id: status_id};

        $(this).addClass('working')
        $.ajax({
            type:'PUT',
            url: '/jobs/complete',
            data: data,
            beforeSend: function(request) { request.setRequestHeader("Accept", "text/javascript"); },
            success: function(res) {}
        })
    });

//    $('.current-stage .update-status, .current-stage .custom-dropdownInner').bind('click', function() {
//
//        var job_id = $('#job-stages').attr('job_id');
//        var stage_no = $(this).closest('.job-stage').attr('stage_no');
//        var status_id = $('.status-container select').val();
//
//        data = {job_id: job_id, stage_no: stage_no, status_id: status_id};
//
//        $(this).addClass('working')
//        $.ajax({
//            type:'PUT',
//            url: '/jobs/complete',
//            data: data,
//            beforeSend: function(request) { request.setRequestHeader("Accept", "text/javascript"); },
//            success: function(res) {}
//        })
//    });

    $(document.body).on('click', '.current-stage .add-time, .current-stage .remove-time', function() {

        if($('.current-stage .add-time').hasClass('working')) return;
        if($('.current-stage .remove-time').hasClass('working')) return;
        if($('.current-stage .stage-complete-button').hasClass('working')) return;

        var job_id = $('#job-stages').attr('job_id');
        var stage_no = $(this).closest('.job-stage').attr('stage_no');
        if($(this).hasClass('add-time')) {
            add_time = 15;
        } else {
            add_time = -15;
        }

        data = {job_id: job_id, stage_no: stage_no, add_time: add_time};

        $(this).addClass('working')
        $.ajax({
            type:'PUT',
            url: '/jobs/update_time',
            data: data,
            beforeSend: function(request) { request.setRequestHeader("Accept", "text/javascript"); },
            success: function(res) {}
        })
    });

    $("select.dropdown").change(function() {
        var value = this.value;
        update_status(value);
    });

    $("#new-job-button").bind('click', function() {
        $.ajax({
            type:'PUT',
            url: '/jobs/new_job',
            beforeSend: function(request) { request.setRequestHeader("Accept", "text/javascript"); },
            success: function(res) {}
        })
    })

    console.log(interval);
    if(interval == null)
        interval = setInterval(updateElapsedTime,36000);

    function updateElapsedTime(){
        elapsed_time = $('.current-stage #elapsed-time').html();
        elapsed_time = parseFloat(elapsed_time) + 0.01;
        $('.current-stage #elapsed-time').html(elapsed_time.toFixed(2));
    }
})