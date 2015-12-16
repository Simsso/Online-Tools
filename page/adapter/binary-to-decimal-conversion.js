(function() {
	var bin, dec;

	// listen for user input
	$('#user-input-number').on('change keyup', function() {
		var val = $(this).val();

		var decimal = binaryToDecimal(val);

		// check if the value is a number
		if (!isNaN(decimal)) { 
			bin = val;
			dec = decimal;
			$('#decimal-output').html(decimal);
			$('#add-to-history').removeAttr('disabled', 'disabled');
		}
		else {
			$('#decimal-output').html('&nbsp;');
			$('#add-to-history').attr('disabled', 'disabled');
		}
	});

	// history
	$('#add-to-history').on('click', function() {
		$('#history-table').removeClass('hide');
		$('#history').prepend('<tr><td>' + bin + '</td><td>' + dec + '</td></tr>');
	});
})();