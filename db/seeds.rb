# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Status.create!(:name => 'Pumping (No Problems)')
Status.create!(:name => 'Pumping (With Problems)')
Status.create!(:name => 'Resource Delays')
Status.create!(:name => 'Fluid Treatment')
Status.create!(:name => 'Other Problem')

4.times do |i|
  job = Job.create(:name => 'Job ' + (i+1).to_s, :current_stage => 1)
  stage_count = 20 + rand(10)
  # start_time = Time.now.change(:usec => 0)
  start_time = Time.now
  stage_count.times do |j|
    end_time = start_time + 15 * 60
    job.stages.create!(
        :stage_no => j+1,
        :status_id => 1,
        :start_time => start_time,
        :end_time => end_time,
        :completed => false
    )
    start_time = end_time
  end
end
