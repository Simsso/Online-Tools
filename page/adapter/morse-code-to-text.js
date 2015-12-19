(function() {
	$('#morse-input').on('change keyup', function() {
		$('#text-output').html(morseCodeToText($(this).val()));
	}).trigger('change');
})();