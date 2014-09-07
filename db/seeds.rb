# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

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
      :completed => false
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
      :completed => false
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