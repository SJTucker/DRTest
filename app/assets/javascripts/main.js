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

function changeBaseWage() {
	baseWage = $('#base-wage-input').val()*1;

	if(jQuery.type(baseWage) === 'number' && !isNaN(baseWage) && !rules.length) {
		$('#base-wage-display').text('$' + baseWage + '/hr');
	}else if(jQuery.type(baseWage) === 'number' && !isNaN(baseWage) && rules.length){
		$('#base-wage-display').text('$' + baseWage + '/hr');
		recalculateBaseWage();
  }else{
		$('#alert').text('Rule could not be created.  Not a number.')
	}
};

function recalculateBaseWage() {
	for (i = 0; i < rules.length; i++) {
		adjustedWage = baseWage + rules[i];
	}
};

function adjustWage() {
	rule.modifier_function();
	displayWage();
};

function modify() {
	if($(this).attr('id') === 'decrease'){
		modifier_function = decreaseWage;
	}else{
		modifier_function = increaseWage;
	};
};

function addRule() {
	rule.description = $('#description-input').val();
	rule.price = $('#price-input').val()*1;
	rule.modifier_function = modifier_function;

	var modifier = '';
	if(modifier_function === 'decreaseWage()'){
		modifier = '-';
	}

	$('#rule-select').append('<option class="rule-options" value="' + rule + '">' + modifier + '$' + rule.price + ' ' + rule.description + '</option>');

	rules.push(rule);
};

function increaseWage() {
	if(adjustedWage === 0){
		adjustedWage = baseWage + rule.price
	}else{
		adjustedWage += rule.price
	}
}

function decreaseWage() {
	if(adjustedWage === 0){
		adjustedWage = baseWage - rule.price
	}else{
		adjustedWage -= rule.price
	}
}

function changeRule() {
	rule = this.val();
}

function displayWage() {
	if(adjustedWage > 0){
		$('#wage-display').text('$' + adjustedWage + '/hr');
	}

	if(adjustedWage < 0){
		$('#alert').text('Cannot adjust wage.  Negative Number.')
	}
}

/*if(adjustedWage === 0){
		adjustedWage = (baseWage*1) + ((rule.modifier + rule.price)*1)
	}else{
		adjustedWage += ((rule.modifier + rule.price)*1)
	}

	if(adjustedWage > 0){
		$('#wage-display').text('$' + adjustedWage + '/hr');
	}

	if(adjustedWage < 0){
		$('#alert').text('Cannot adjust wage.  Negative Number.')
	}*/