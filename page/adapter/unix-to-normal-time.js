(function() {
	// listen for user input
	$('#user-input-unix-time').on('change keyup', function() {
		var unixTimestamp = parseInt($(this).val());

		var invalid = false;

		// check if the value is a number
		if (!isNaN(unixTimestamp)) { 
			var timeString = unixToTimeString(unixTimestamp);
				$('#normal-time-output').html(timeString);
		}
		else {
			$('#normal-time-output').html('');
		}
	});
})();