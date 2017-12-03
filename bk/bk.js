var number = generate_number();
function do_something(number_field) {
	guess = number_field.value;
	if (check_input(guess)) {
		var answers = document.getElementById('answers');
		var bk = compare_number(number, guess);
		var print = guess + " - " + bk.bikove.toString() + "B; " + bk.kravi.toString() + "K"
		if (bk.bikove == 4) {
			print = "You WON!";
			document.getElementById('number_field').setAttribute("disabled", "disabled");
		}
		console.log(print)
		answers.innerHTML += print + "<br>";
	}
	else {
		console.log("The number DOES NOT match the criteria");
	}
	document.getElementById('number_field').value = "";
	return false;
}

function check_input(number) {
	// if the input is not 4 characters long
	if (number.length != 4) {
		return false;
	}
	// if the input is not a number
	if (isNaN(Number(number)) || isNaN(parseInt(number))) {
		return false;
	}
	// if the first character is a zero
	if (number[0] == '0') {
		return false;
	}
	// if the characters are different
	for (var i = 0; i < 4; i++) {
		var count = 0;
		var current_char = number[i];
		for (var j = 0; j < 4; j++) {
			if (current_char == number[j]) {
				count++;
			}
		}
		if (count > 1) {
			return false;
		}
	}
	return true;
}

function generate_number() {
	var number = "";
	number += Math.floor(Math.random() * 9 + 1).toString();
	while (number.length < 4) {
		number_to_add = Math.floor(Math.random() * 10).toString();
		if (number.indexOf(number_to_add) > -1) {
			continue;
		}
		number += number_to_add;
	}
	console.log(number)
	return number;
}

function compare_number(number, guess) {
	var return_values = {bikove: 0, kravi: 0};
	for (var i = 0; i < 4; i++) {
		if (guess[i] == number[i]) {
			return_values.bikove++;
			return_values.kravi;
		}
		else if (number.indexOf(guess[i]) > -1) {
			return_values.kravi++;
		}
	}
	return return_values;
}