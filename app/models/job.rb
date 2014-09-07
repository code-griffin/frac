class Job < ActiveRecord::Base
  has_many :stages, dependent: :destroy

  def complete_stage(stage_no, status)
    stage = stages.find_by(stage_no: stage_no)
    # end_time = Time.now.change(:sec => 0)
    end_time = Time.now
    time_diff = end_time - stage.end_time
    stage.update(status_id: status, completed: true, end_time: end_time)

    next_stages = stages.where("stage_no > ?", stage_no)
    if next_stages.present?
      next_stages.each { |next_stage|
        next_stage.update(start_time: next_stage.start_time + time_diff, end_time: next_stage.end_time + time_diff)
      }
    end
  end

  def update_status(stage_no, status)
    stage = stages.find_by(stage_no: stage_no)
    stage.update_attribute('status_id', status)
  end

  def update_time(stage_no, add_time)
    stage = stages.find_by(stage_no: stage_no)
    # end_time = Time.now.change(:sec => 0)
    end_time = stage.end_time + add_time.minutes
    if stage.start_time >= end_time
      return
    end
    stage.update(end_time: end_time)

    next_stages = stages.where("stage_no > ?", stage_no)
    if next_stages.present?
      next_stages.each { |next_stage|
        next_stage.update(start_time: next_stage.start_time + add_time.minutes, end_time: next_stage.end_time + add_time.minutes)
      }
    end
  end

  def add_sand(stage_no, sand_id, flag)
    stage = stages.find_by(stage_no: stage_no)
    sands = stage.sands.split(',')

    @sands = Sand.all
    if flag == "0" #remove
      sands.delete(sand_id)
    else #add
      sands.push(sand_id) unless @sands.include?(sand_id)
    end

    stage.update(sands: sands.join(','))
  end
end