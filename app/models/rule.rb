class Rule < ActiveRecord::Base
	validates :description, presence: true
	validates :cost_modifier, presence: true
end
