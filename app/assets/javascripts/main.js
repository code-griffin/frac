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

    $('.dropdown').customSelect({
        customClass:'custom-dropdown'
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
//            current_job.hide();
            current_job.removeClass('active')
//            prev_job.show();
            prev_job.addClass('active')
            prev_job.find('select.dropdown').trigger('render');
        }
    });

    $('.stage-nav .right').click(function(){
        var current_job = $(this).closest('.job-stage');
        var next_job = current_job.next();
        if (next_job.length) {
//            current_job.hide();
            current_job.removeClass('active')
//            next_job.show();
            next_job.addClass('active')
            next_job.find('select.dropdown').trigger('render');
        }
    });

	$('.current-stage .time-info').each(function() {
//		var start_time = $(this).find('.start-time').text()+' '+ $(this).find('.start-time-ampm').text();
//		var end_time = $(this).find('.end-time').text()+' '+ $(this).find('.end-time-ampm').text();
//		start_time = parseTime(start_time);
//		end_time = parseTime(end_time);
//		if (end_time - start_time <= 0) {
//			end_time.setDate(end_time.getDate() + 1);
//		}
//		$(this).append($('<input type="hidden" />').addClass('start_time').val(start_time));
//		$(this).append($('<input type="hidden" />').addClass('end_time').val(end_time));
		update_time($(this).closest('.job-stage'));
	});
	function update_time($elm) {
		var start_time = new Date($elm.find('input.start_time').val());
		var end_time = new Date($elm.find('input.end_time').val());
		
		var diff_time = (end_time - start_time)/(60*60*1000);
	    $elm.find('.status-bar p.total').html(diff_time.toFixed(2) + " <span>hrs</span>");
		
		var elapsed = $elm.find('.status-bar p.elapsed').text();
		elapsed = Number($.trim(elapsed.replace('hrs','')));

        if (diff_time < 0.01) {
            percent = 0;
        } else {
            percent = Math.min((elapsed / diff_time) * 100, 100);
        }
//		$elm.find('.status-bar .bar').css('width', percent+'%');
		
		var hours = end_time.getHours();
		var minutes = end_time.getMinutes();
		var ampm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12;
	    hours = hours ? hours : 12;
	    minutes = minutes < 10 ? '0'+minutes : minutes;
//		$elm.find('.end-time').text(hours+':'+minutes);
//		$elm.find('.end-time-ampm').text(ampm);
	}

    function update_next_stage_time(sign) {
        var current_stage = $('.current-stage');
        var next_stage = current_stage.next();
        while (next_stage.length) {
            var start_time = new Date(next_stage.find('input.start_time').val());
            var end_time = new Date(next_stage.find('input.end_time').val());
            start_time.setMinutes(start_time.getMinutes() + sign * 15);
            end_time.setMinutes(end_time.getMinutes() + sign * 15);

            var hours = start_time.getHours();
            var minutes = start_time.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0'+minutes : minutes;
            next_stage.find('.start-time').text(hours+':'+minutes);
            next_stage.find('.start-time-ampm').text(ampm);

            hours = end_time.getHours();
            minutes = end_time.getMinutes();
            ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0'+minutes : minutes;
            next_stage.find('.end-time').text(hours+':'+minutes);
            next_stage.find('.end-time-ampm').text(ampm);

            next_stage = next_stage.next();
        }
    }
//	$('.add-time').click(function(){
//        var current_stage = $(this).closest('.job-stage');
//		var start_time = new Date(current_stage.find('input.start_time').val());
//		var end_time = new Date(current_stage.find('input.end_time').val());
//		end_time.setMinutes(end_time.getMinutes() + 15);
//        current_stage.find('input.end_time').val(end_time);
//		update_time(current_stage);
//
//        update_next_stage_time(1);
//	});
//	$('.remove-time').click(function(){
//        var current_stage = $(this).closest('.job-stage');
//		var start_time = new Date(current_stage.find('input.start_time').val());
//		var end_time = new Date(current_stage.find('input.end_time').val());
//		end_time.setMinutes(end_time.getMinutes() - 15);
//		if (end_time - start_time > 0) {
//            current_stage.find('input.end_time').val(end_time);
//			update_time(current_stage);
//		}
//
//        update_next_stage_time(-1);
//	});
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