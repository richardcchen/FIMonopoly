class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name
      t.integer :energy, :default => 1000
      t.integer :IQ, :default => 0

      t.timestamps
    end
  end
end
