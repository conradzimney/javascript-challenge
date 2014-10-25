/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

"use strict";

document.addEventListener('DOMContentLoaded', onReady);

function onReady() {
	var stateSelect = document.getElementById('stateSelect');
	var option;
	var idx;
	for (idx = 0; idx < usStates.length; idx++) {
		option = document.createElement('option');
		option.innerHTML = usStates[idx].name;
		option.value = usStates[idx].code;
		stateSelect.appendChild(option);
	} 

	var selectList = document.getElementById('occupation');
	selectList.addEventListener('change', function() {
		if (selectList.value === "other") {
			document.getElementById('occupationOther').style.display = 'block';
		} else {
			document.getElementById('occupationOther').style.display = 'none';
			document.getElementById('occupationOther').value = '';
		}

	});

	var cancelButton = document.getElementById('cancelButton');
	cancelButton.addEventListener('click', function() {
		if (window.confirm('Are you sure you want to leave?')) {
			window.location = 'http://www.google.com';
		}
	});

	var signup = document.getElementById('signup');
	signup.addEventListener('submit', onSubmit);
}

function onSubmit(eventObject) {
	var idx;
	var fields = ['firstName', 'lastName', 'address1', 'city', 'state'];
	var formValid = true;
	for (idx = 0; idx < fields.length; idx++) {
		formValid &= validateName(signup.elements[fields[idx]]);
	}
	if (signup.elements['occupation'].value == 'other') {
		formValid &= validateName(signup.elements['occupationOther']);
	}
	formValid &= validateZip(signup.elements['zip']);
	formValid &= validateBirthdate(signup.elements['birthdate']);
	if (!formValid) {
		if(eventObject.preventDefault) {
			eventObject.preventDefault();
		}
		eventObject.returnValue = false;
		return false;
	} 
	return formValid;
}

function validateName(field) {
	if (field.value && field.value.trim() != '') {
		field.className = 'form-control';
		return true;
	} else {
		field.className = 'form-control invalid';
		field.placeholder = 'Please fill out this required field';
		return false;
	}
}

function validateZip(field) {
	var zipRegExp = new RegExp('^\\d{5}$');
	if (!zipRegExp.test(field.value)) {
		field.className = 'form-control invalid';
		field.placeholder = 'Please enter a 5 digit zip';
		return false;
	} else {
		field.className = 'form-control';
		return true;
	}
}

function validateBirthdate(field) {
	var bdMSG = document.getElementById('birthdateMessage');
	if (field.value) {
		var today = new Date();
   	 	var bDay = new Date(field.value);
    	var yearsDiff = today.getFullYear() - bDay.getUTCFullYear();
    	var monthsDiff = today.getMonth() - bDay.getUTCMonth();
    	var daysDiff = today.getDate() - bDay.getUTCDate();
    	if (monthsDiff < 0 || (0 === monthsDiff && daysDiff < 0)) {
        	yearsDiff--;
    	}
		field.className = 'form-control';
		if (yearsDiff < 13) {
			bdMSG.innerHTML = "Sorry, you must be at least 13 years old to sign up.";
			field.className = 'form-control invalid';
			return false;
		} else {
			bdMSG.innerHTML = '';
			return true;
		}
	} else {
		bdMSG.innerHTML = "Please tell me when you were born.";
		field.className = 'form-control invalid';
		return false;
	}
}
