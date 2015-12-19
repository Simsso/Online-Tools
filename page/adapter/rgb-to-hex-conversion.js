(function() {
	var rgb, hex;

	var updateColorPreview = function(val) {
		$('#color-preview').css('background-color', val);
	};

	// listen for user input
	$('#input-r, #input-b, #input-g').on('change keyup', function() {
		var r = $('#input-r').val(), g = $('#input-g').val(), b = $('#input-b').val();

		var result = rgbToHex(parseInt(r), parseInt(g), parseInt(b));

		// check if the value is a number
		if (result && r.length !== 0 && g.length !== 0 && b.length !== 0) { 
			hex = result;
			rgb = '(' + r + ',' + g + ',' + b + ')';
			$('#hex-output').html(hex);
			$('#add-to-history').removeAttr('disabled', 'disabled');
			updateColorPreview(hex);
		}
		else {
			$('#hex-output').html('&nbsp;');
			$('#add-to-history').attr('disabled', 'disabled');
			updateColorPreview('transparent');
		}
	}).trigger('keyup');;

	// history
	$('#add-to-history').on('click', function() {
		$('#history-table').removeClass('hide');
		$('#history').prepend('<tr><td style="background-color: ' + hex + ';"></td><td>' + rgb + '</td><td>' + hex + '</td></tr>');
	});
})();