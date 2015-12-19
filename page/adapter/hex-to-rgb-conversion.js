(function() {
	var hex, rgb;

	var updateColorPreview = function(val) {
		$('#color-preview').css('background-color', val);
	};

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
			updateColorPreview(hex);
		}
		else {
			$('#rgb-output').html('&nbsp;');
			$('#add-to-history').attr('disabled', 'disabled');
			updateColorPreview('transparent');
		}
	}).trigger('keyup');;

	// history
	$('#add-to-history').on('click', function() {
		$('#history-table').removeClass('hide');
		$('#history').prepend('<tr><td style="background-color: ' + hex + ';"></td><td>' + hex + '</td><td>' + rgb + '</td></tr>');
	});
})();