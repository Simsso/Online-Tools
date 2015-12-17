(function() {
	var unix, normal;

	// listen for user input
	$('#user-input-unix-time').on('change keyup', function() {
		var unixTimestamp = parseInt($(this).val());

		var invalid = false;

		// check if the value is a number
		if (!isNaN(unixTimestamp)) { 
			var timeString = unixToTimeString(unixTimestamp);

			normal = timeString;
			unix = unixTimestamp;

			$('#normal-time-output').html(timeString);
			$('#add-to-history').removeAttr('disabled', 'disabled');
		}
		else {
			$('#normal-time-output').html('&nbsp;');
			$('#add-to-history').attr('disabled', 'disabled');
		}
	}).trigger('keyup');;



	// history
	$('#add-to-history').on('click', function() {
		$('#history-table').removeClass('hide');
		$('#history').prepend('<tr><td>' + unix + '</td><td>' + normal + '</td></tr>');
	});
})();