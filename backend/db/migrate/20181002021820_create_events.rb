class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.integer :board_id
      t.string :name
      t.string :description
      t.string :event_type
      t.integer :energy
      t.integer :IQ

      t.timestamps
    end
  end
end
