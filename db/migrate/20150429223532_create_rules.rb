class CreateRules < ActiveRecord::Migration
  def change
    create_table :rules do |t|
      t.string :description
      t.integer :cost_modifier

      t.timestamps null: false
    end
  end
end
