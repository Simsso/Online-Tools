(function() {
	$('#text-input').on('change keyup', function() {
		$('#morse-output').html(textToMorseCode($(this).val()));
	}).trigger('change');
})();