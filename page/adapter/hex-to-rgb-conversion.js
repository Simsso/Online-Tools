(function() {
	var hex, rgb;

	// listen for user input
	$('#input-hex').on('change keyup', function() {
		var hexInput = $(this).val();

		var result = hexToRgb(hexInput);

		// check if the value is a number
		if (result && hexInput) { 
			hex = (((hexInput.substr(0, 1) === '#') ? '' : '#') + hexInput).toUpperCase();
			rgb = '(' + result.r + ',' + result.g + ',' + result.b + ')';
			$('#rgb-output').html(rgb);
			$('#add-to-history').removeAttr('disabled', 'disabled');
		}
		else {
			$('#rgb-output').html('&nbsp;');
			$('#add-to-history').attr('disabled', 'disabled');
		}
	}).trigger('keyup');;

	// history
	$('#add-to-history').on('click', function() {
		$('#history-table').removeClass('hide');
		$('#history').prepend('<tr><td>' + hex + '</td><td>' + rgb + '</td></tr>');
	});
})();