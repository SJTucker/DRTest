class ChangeCostModifierDataType < ActiveRecord::Migration
  def change
  	change_column :rules, :cost_modifier, :string
  end
end
