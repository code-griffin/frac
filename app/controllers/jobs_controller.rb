class JobsController < ApplicationController

  def index
    @jobs = Job.all.order(:id)
  end

  def detail
    @job_id = params[:id]

    @job = Job.find(@job_id)
    @stages = @job.stages.order(:stage_no)
    @statuses = Status.all
  end

  def complete
    job_id = params[:job_id]
    stage_no = params[:stage_no]
    status_id = params[:status_id]

    @result = "fail"
    @job = Job.find(job_id)
    @status = Status.find(status_id)

    if @job.present? && @status.present? && @job.current_stage == stage_no.to_i
      @result = "success"
      @job.update_status(stage_no, status_id)
      if @job.current_stage < @job.stages.count
        @job.current_stage += 1
      end
      @job.save!
      @next_stages = @job.stages.where("stage_no >= ?", stage_no).order(:stage_no)
      @stage = @job.stages.find_by(stage_no: stage_no)
    end
  end

  def update_status
    job_id = params[:job_id]
    stage_no = params[:stage_no]
    status_id = params[:status_id]

    @result = "fail"
    @job = Job.find(job_id)
    @status = Status.find(status_id)

    @stage = @job.stages.find_by(stage_no: stage_no)

    if @job.present? && @stage.present? && @status.present? && @job.current_stage == stage_no.to_i
      @result = "success"
      @job.update_status(stage_no, status_id)
    end
  end

  def update_time
    job_id = params[:job_id]
    stage_no = params[:stage_no]
    add_time = params[:add_time]

    @result = "fail"
    @job = Job.find(job_id)

    if @job.present? && @job.current_stage == stage_no.to_i
      @result = "success"
      @job.update_time(stage_no, add_time.to_i)
      @next_stages = @job.stages.where("stage_no >= ?", stage_no).order(:stage_no)
      @stage = @job.stages.find_by(stage_no: stage_no)
    end
  end

end
