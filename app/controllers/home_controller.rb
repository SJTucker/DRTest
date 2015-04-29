class HomeController < ApplicationController
	def index
		@rule = Rule.new
		@rules = Rule.all
	end

	def create
		@rule = Rule.new(rule_params)
		if @rule.save
			flash[:notice] = "Rule created"
			redirect_to root_path
		else
			flash[:alert] = "Rule could not be created"
			@rules = Rule.all
			render :index
		end
	end

	private

	def rule_params
		params.require(:rule).permit(:description, :cost_modifier)
	end
end