class CreateSands < ActiveRecord::Migration
  def change
    create_table :sands do |t|
      t.string :detail
      t.integer :quantity
    end
  end
end
