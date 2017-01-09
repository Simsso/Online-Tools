(function() {
	// cache DOM
	var mainInput = $('#main-input'),
		speedOutput = $('#speed-output'),
		speedOutputUnit = $('#speed-output-unit');

	var control = null;

	function showOutput(val) {
		speedOutput.html(val);
		speedOutputUnit.show();
	}

	function hideOutput() {
		speedOutput.html('');
		speedOutputUnit.hide();
	}

	mainInput.on('keydown', function() {
		console.log(mainInput.val().length);
		if (control === null || mainInput.val().length === 0) {
			control = new TypingSpeedControl();
		}

		control.addKeypress(' ');

		if (control.charsPerSecondAvailable()) {
			showOutput(control.getCharsPerSecond().toFixed(4));
		}
		else {
			hideOutput();
		}
	}).on('keyup', function() {
		if (mainInput.val().length === 0) {
			hideOutput();
		}
	});
})();