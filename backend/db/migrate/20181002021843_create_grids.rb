class CreateGrids < ActiveRecord::Migration[5.2]
  def change
    create_table :grids do |t|
      t.integer :user_id
      t.integer :event_id

      t.timestamps
    end
  end
end
