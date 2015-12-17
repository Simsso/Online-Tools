(function() {
	var rgb, hex;

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
		}
		else {
			$('#hex-output').html('&nbsp;');
			$('#add-to-history').attr('disabled', 'disabled');
		}
	}).trigger('keyup');;

	// history
	$('#add-to-history').on('click', function() {
		$('#history-table').removeClass('hide');
		$('#history').prepend('<tr><td>' + rgb + '</td><td>' + hex + '</td></tr>');
	});
})();