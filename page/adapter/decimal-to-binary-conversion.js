(function() {
	var dec, bin;

	// listen for user input
	$('#user-input-number').on('change keyup', function() {
		var val = $(this).val();

		var binary = decimalToBinary(val);

		// check if the value is a number
		if (!isNaN(binary)) { 
			dec = val;
			bin = binary;
			$('#binary-output').html(binary);
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
		$('#history').prepend('<tr><td>' + dec + '</td><td>' + bin + '</td></tr>');
	});
})();