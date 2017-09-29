(function() {
	// ui elements
	var previewDiv = $('#sequence-preview'), 
		lengthDiv = $('#sequence-length'), 
		userInput = $('#primary-input'), 
		primaryButton = $('#primary-btn'),
		repeatButton = $('#repeat-btn'),
		infoDiv = $('#info-output'),
		progress = $('#primary-progress-bar'),
		speedInput = $('#speed-millis'),
		startingLengthInput = $('#starting-length');

	// digit test object
	var test = null;
	var symbolIndex = 0;
	var speed = 1000; // milliseconds between symbols
	var defaultStartingLength = 4, lastLength = 0;

	var state = "loaded"; // possible states: ["loaded", "started", "success"]

	function nextLength(startingLength) {
		state = "started";
		if (test === null) {
			test = new DigitSpanTest({ startingLength: startingLength});
			infoDiv.html('Test started. Try to remember the digits! Subsequently, type them into the input field.');
		}
		else {
			test.next();
		}
		updateSequenceLength();
		setDisabled(userInput, true);
		setDisabled(primaryButton, true);
		setDisabled(repeatButton, true);
		primaryButton.html('Next');
		symbolIndex = 0;
		showNextSymbol();
	}

	// called after the entire sequence was shown
	function sequenceShown() {
		previewDiv.html('...');
		symbolIndex = 0;
		setDisabled(userInput, false);
		userInput.focus();
		progress.css('width', 0);
	}

	function showNextSymbol() {
		previewDiv.html(test.getSequence()[symbolIndex]);
		symbolIndex++;

		// update progress bar
		progress.css('width', symbolIndex / test.getSequence().length * 100 + "%");

		if (symbolIndex >= test.getSequence().length) {
			setTimeout(sequenceShown, speed);
		}
		else {
			setTimeout(showNextSymbol, speed);
		}
	}

	function failed() {
		infoDiv.html("You have failed at a digit sequence length of " + test.getSequence().length + ". The correct sequence was " + test.getSequence().join(''));
		setDisabled(userInput, true);
		setDisabled(primaryButton, false);
		setDisabled(repeatButton, false);
		primaryButton.focus();
		state = "loaded";
		lastLength = test.getSequence().length;
		test = null;
		primaryButton.html('Restart');
		setDisabled(repeatButton, false);
	}

	function checkUserInput(input) {
		if (input === test.getSequence()[symbolIndex]) {
			symbolIndex++;

			// update progress bar
			progress.css('width', symbolIndex / test.getSequence().length * 100 + "%");
			if (symbolIndex >= test.getSequence().length) {
				state = "success";
				setDisabled(primaryButton, false);
				setDisabled(repeatButton, false);
				primaryButton.focus();
				setDisabled(userInput, true);
			}
		}
		else {
			failed();
		}
	}

	// ui events
	primaryButton.on('click', function() {
		switch (state) {
			case "loaded": 
				nextLength(defaultStartingLength);
				break;
			case "success":
				nextLength(defaultStartingLength);
				break;
		}
	});

	repeatButton.on('click', function() {
		nextLength(lastLength);
	});


	userInput.on('keyup', function() {
		if (test === null) return;
		checkUserInput($(this).val());
		clearInput();
	});


	// settings

	speedInput.on('change', function() {
		var newVal = parseInt($(this).val());
		if (newVal > 0) {
			speed = newVal;
		}
	}).trigger('change');

	startingLengthInput.on('change', function() {
		var newVal = parseInt($(this).val());
		if (newVal > 0) {
			defaultStartingLength = newVal;
		}
	}).trigger('change');

	infoDiv.html("Hit start to run the digit span test.");
	setDisabled(primaryButton, false);


	// helper functions

	function setDisabled(element, disabled) {
		if (disabled) {
			return element.attr('disabled', 'disabled');
		}
		element.removeAttr('disabled');
	}

	function updateSequenceLength() {
		if (test === null) {
			return lengthDiv.html(' ');
		}
		lengthDiv.html(test.getSequence().length + " symbols");
	}

	function clearInput() {
		userInput.val('');
	}
})();