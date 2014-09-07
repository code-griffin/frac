class AddSandsToStages < ActiveRecord::Migration
  def change
    add_column :stages, :sands, :string
  end
end
