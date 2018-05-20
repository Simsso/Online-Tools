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
		startingLengthInput = $('#starting-length'),
		audioEnabledCheckbox = $('#audio-enabled');

	// digit test object
	var test = null;
	var symbolIndex = 0;
	var speed = 1000; // milliseconds between symbols
	var defaultStartingLength = 4, lastLength = 0;
	var audioEnabled = true, visualEnabled = true;

	var state = "loaded"; // possible states: ["loaded", "started", "success"]

	var audio = {};
	for (var i = 0; i < 10; i++) {
		var iStr = i + '';
		audio[iStr] = new Audio('audio/numbers/' + i + '.mp3');
	}

	function nextLength(startingLength) {
		state = "started";
		if (test === null) {
			test = new DigitSpanTest({ startingLength: startingLength});
			infoDiv.html('Test started. Try to remember the digits! Subsequently, type them into the input field.');
		}
		else {
			test.next();
		}
		lastLength = test.getSequence().length;
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
		setDisabled(repeatButton, false);
		userInput.focus();
		progress.css('width', 0);
	}

	function showNextSymbol() {
		var symbol = test.getSequence()[symbolIndex];

		// The following if statement is a trick that makes the audio playback work on Chrome on Android.
		// Only after a user interaction (click) can sound be played. Therefore all required sound objects are being created, started and paused right away.
		// That way they can be used at later callbacks and playback is not blocked.
		if (symbolIndex === 0 && audioEnabled) {
			for (var i = 0; i < test.getSequence().length; i++) {
				var loopSymbol = test.getSequence()[i];
				if (typeof audio[loopSymbol] !== 'undefined') {
					audio[loopSymbol].volume = 0;
					audio[loopSymbol].play();
				}
			}
		}

		// show visual information, if enabled
		previewDiv.html(visualEnabled ? symbol : '...');

		// play corresponding sound
		if (audioEnabled && typeof audio[symbol] !== 'undefined') {
			audio[symbol].volume = 1;
			audio[symbol].currentTime = 0;
			audio[symbol].play();
		}

		symbolIndex++;

		// update progress bar
		progress.css('width', symbolIndex / test.getSequence().length * 100 + "%");

		if (symbolIndex >= test.getSequence().length) {
			setTimeout(sequenceShown, speed);
		}
		else {
			setTimeout(showNextSymbol.bind(this), speed);
		}
	}

	function failed() {
		infoDiv.html("You have failed at a digit sequence length of " + test.getSequence().length + ". The correct sequence was " + test.getSequence().join(''));
		setDisabled(userInput, true);
		setDisabled(primaryButton, false);
		setDisabled(repeatButton, false);
		primaryButton.focus();
		state = "loaded";
		test = null;
		primaryButton.html('Restart');
		setDisabled(repeatButton, false);
	}

	function checkUserInput(input) {
		if (input == test.getSequence()[symbolIndex]) {
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
		test = null;
		nextLength(lastLength);
	});


	userInput.on('keydown', function(event) {
		if (test === null) return;
		checkUserInput(event.key);
		clearInput();
	});


	// settings
	// audio enabled or disabled
	audioEnabledCheckbox.on('change', function() {
		audioEnabled = $(this).is(':checked');
	});

	// input speed, i.e. time between two symbols in milliseconds
	speedInput.on('change', function() {
		var newVal = parseInt($(this).val());
		if (newVal > 0) {
			speed = newVal;
		}
	}).trigger('change');

	// sequence length after restart
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