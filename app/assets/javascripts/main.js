'use strict';

$(document).ready(init);

function init() {
	$('#change-base-wage').click(changeBaseWage);
};

var baseWage = 0;
var rules = [];

function changeBaseWage() {
	if(!rules.length){
		baseWage = $('#base-wage-input').val()*1;

		//HACK: when a non-number is input, not sure why baseWage*1 is NaN and jQuery.type(baseWage*1) returns number, so I've got to do something silly.
		//EDIT: Man I learned a bit about NaN tonight. NaN === NaN returns false. Do not like.
		if(jQuery.type(baseWage) === 'number' && !isNaN(baseWage)) {
			$('#base-wage-display').text('$' + baseWage + '/hr');
		}else{
			$('#alert').text('Rule could not be created.  Not a number.')
		}
	}else{
		recalculateBaseWage();
	}
};

function recalculateBaseWage() {

};