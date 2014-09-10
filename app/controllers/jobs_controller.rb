class JobsController < ApplicationController

  def index
    @jobs = Job.all.order(:id)
    @statuses = Status.all
  end

  def detail
    job_id = params[:id]

    @job = Job.find(job_id)
    @stages = @job.stages.find_by(stage_no: @job.current_stage)
    # @stages = @job.stages.order(:stage_no)
    @statuses = Status.all
    @sands = Sand.all
  end

  def new_job
    @job = Job.create(:name => 'Job #' + (Job.maximum(:id).to_i+1).to_s, :current_stage => 1)
    @stage_count = 20 + rand(10)
    # start_time = Time.now.change(:usec => 0)
    @start_time = Time.now
    @stage_count.times do |j|
      @end_time = @start_time + 15 * 60
      @job.stages.create!(
          :stage_no => j+1,
          :status_id => Status.first.id,
          :start_time => @start_time,
          :end_time => @end_time,
          :completed => false,
          :sands => ''
      )
      @start_time = @end_time
    end
    @statuses = Status.all
  end

  def change_stage
    job_id = params[:job_id]
    stage_no = params[:stage_no]

    @result = "fail"

    @job = Job.find(job_id)
    @stages = @job.stages.find_by(stage_no: stage_no)
    @statuses = Status.all
    @sands = Sand.all
    if @job.present? && @stages.present?
      @result = "success"
    end

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
      @job.complete_stage(stage_no, status_id)
      if @job.current_stage < @job.stages.count
        @job.current_stage += 1
      end
      @job.save!
      @stages = @job.stages.find_by(stage_no: stage_no.to_i+1)
      @sands = Sand.all
      @statuses = Status.all
      render 'change_stage'
    end
  end

  def update_status
    job_id = params[:job_id]
    stage_no = params[:stage_no]
    status_id = params[:status_id]

    @result = "fail"
    @job = Job.find(job_id)
    @status = Status.find(status_id)

    if @job.present? && @status.present? && @job.current_stage == stage_no.to_i
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

  def add_sand
    job_id = params[:job_id]
    stage_no = params[:stage_no]
    sand_id = params[:sand_id]
    flag = params[:flag]

    @job = Job.find(job_id)

    if @job.present? && @job.current_stage == stage_no.to_i
      @result = "success"
      @job.add_sand(stage_no, sand_id, flag)
    end
  end

  def init_data
    if Status.count == 0
      Status.create!(:name => 'Pumping In Progress')
      Status.create!(:name => 'Pumping Is Down')

      job1 = Job.create(:name => 'Ham #18081', :current_stage => 1)
      stage_count = 52
      start_time = Time.now
      stage_count.times do |j|
        end_time = start_time + 3 * 60 * 60
        job1.stages.create!(
            :stage_no => j+1,
            :status_id => 1,
            :start_time => start_time,
            :end_time => end_time,
            :completed => false,
            :sands => ""
        )
        start_time = end_time
      end

      job2 = Job.create(:name => 'University land 09', :current_stage => 1)
      stage_count = 42
      start_time = Time.now
      stage_count.times do |j|
        end_time = start_time + 3 * 60 * 60
        job2.stages.create!(
            :stage_no => j+1,
            :status_id => 1,
            :start_time => start_time,
            :end_time => end_time,
            :completed => false,
            :sands => ""
        )
        start_time = end_time
      end

      job3 = Job.create(:name => 'Halfman 1214', :current_stage => 1)
      stage_count = 55
      start_time = Time.now
      stage_count.times do |j|
        end_time = start_time + 3 * 60 * 60
        job3.stages.create!(
            :stage_no => j+1,
            :status_id => 1,
            :start_time => start_time,
            :end_time => end_time,
            :completed => false,
            :sands => ""
        )
        start_time = end_time
      end

      Sand.create(:detail => '100 Mesh - White', :quantity => 125000)
      Sand.create(:detail => '100 Mesh - White', :quantity => 35000)
      Sand.create(:detail => '100 Mesh - White', :quantity => 52500)
      Sand.create(:detail => '40-70 Mesh - Texas Brite', :quantity => 42500)
      Sand.create(:detail => '40-70 Mesh - Texas Brite', :quantity => 53000)
      Sand.create(:detail => '40-70 Mesh - Texas Brite', :quantity => 31500)
      Sand.create(:detail => '40-70 Mesh - Texas Brite', :quantity => 10000)
      Sand.create(:detail => '40-70 Mesh - Preferred RCS', :quantity => 20000)
    end
  end

end
