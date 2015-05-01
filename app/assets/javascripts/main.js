'use strict';

$(document).ready(init);

function init() {
	$('#add-rule').click(addRule);
	$('#change-base-wage').click(changeBaseWage);
	$('.modifier').click(modify);
	$('#adjust-wage').click(adjustWage);
	$('.rule-options').change(changeRule);
};

var modifier_function = increaseWage;
var baseWage = 0;
var adjustedWage = 0;
var rules = [];
var rule = {};
var modifier = '';

function changeBaseWage() {
	baseWage = $('#base-wage-input').val()*1;

	if(jQuery.type(baseWage) === 'number' && !isNaN(baseWage) && !rules.length) {
		$('#base-wage-display').text('$' + baseWage + '/hr');
	}else if(jQuery.type(baseWage) === 'number' && !isNaN(baseWage) && rules.length){
		$('#base-wage-display').text('$' + baseWage + '/hr');
		recalculateBaseWage();
  }else{
		$('#alert').text('Could not set base wage.  Not a number.')
	}
};

//This function will recalculate the adjusted wage when the base wage is changed after rules have been added
function recalculateBaseWage() {
	adjustedWage = 0;
	for (var i = 0; i < rules.length; i++) {
		rules[i].modifier_function();
	}
	displayWage();
};

function adjustWage() {
	rule.modifier_function();
	displayWage();
};

function modify() {
	if($(this).attr('id') === 'decrease'){
		modifier_function = decreaseWage;
		modifier = '-';
	}else{
		modifier_function = increaseWage;
	};
};

function addRule() {
	rule.description = $('#description-input').val();
	rule.price = $('#price-input').val()*1;
	rule.modifier_function = modifier_function;

	if(!rule.price || !rule.description){
		$('#alert').text('Rule could not be created.  Rule must have description and price.')
	}

	$('#rule-select').append('<option class="rule-options" value="' + rule + '">' + modifier + '$' + rule.price + ' ' + rule.description + '</option>');

	rules.push(rule);
};

function increaseWage() {
	if(adjustedWage === 0){
		adjustedWage = baseWage + rule.price;
	}else{
		adjustedWage += rule.price;
	}
	return adjustedWage;
};

function decreaseWage() {
	if(adjustedWage === 0){
		adjustedWage = baseWage - rule.price
	}else{
		adjustedWage -= rule.price
	}
	return adjustedWage;
};

function changeRule() {
	rule = this.val();
};

function displayWage() {
	if(adjustedWage > 0){
		$('#wage-display').text('$' + adjustedWage + '/hr');
	}

	if(adjustedWage < 0){
		$('#alert').text('Cannot adjust wage.  Negative Number.')
	}
};