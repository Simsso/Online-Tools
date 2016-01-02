(function() {
	$('#user-input').on('change keyup', function() {
		var numberOfWords = countWords($(this).val());
		$('#output').html(numberOfWords.toString() + ' word' + ((numberOfWords === 1) ? '' : 's'));
	}).trigger('change');
})();