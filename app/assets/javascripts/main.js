'use strict';

$(document).ready(init);

function init() {
	$('#change-base-wage').click(changeBaseWage);
};

var baseWage = 0;
var rules = [];

function changeBaseWage() {
	baseWage = $('#base-wage-input').val();

	if(baseWage.typeof === 'number'){
		$('#base-wage-display').text('$' + baseWage + '/hr');
	}else{
		$('#alert').text('Rule could not be created.  Not a number.')
	}
};