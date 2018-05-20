(function() {
	$('#user-input').on('change keyup', function() {
		var input = $(this).val();

		// word count
		var numberOfWords = countWords(input);
		$('#output-words').html(numberOfWords.toString() + ' word' + ((numberOfWords === 1) ? '' : 's'));

		// char count
		var numberOfChars = countChars(input);
		$('#output-chars').html(numberOfChars.toString() + ' character' + ((numberOfChars === 1) ? '' : 's'));

		// paragraph count
		var numberOfParagraphs = countParagraphs(input);
		$('#output-paragraphs').html(numberOfParagraphs.toString() + ' paragraph' + ((numberOfParagraphs === 1) ? '' : 's'));

		// unique word count
		var numberOfUniqueWords = countUniqueWords(input);
		$('#output-unique-words').html(numberOfUniqueWords.toString() + ' unique word' + ((numberOfUniqueWords === 1) ? '' : 's'));

		// sentences count
		var numberOfSentences = countSentences(input);
		$('#output-sentences').html(numberOfSentences.toString() + ' sentence' + ((numberOfSentences === 1) ? '' : 's'));
	}).trigger('change');
})();