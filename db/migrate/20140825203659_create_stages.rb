class CreateStages < ActiveRecord::Migration
  def change
    create_table :stages do |t|
      t.integer :job_id
      t.integer :stage_no
      t.integer :status_id
      t.datetime :start_time
      t.datetime :end_time
      t.boolean :completed
    end
  end
end
