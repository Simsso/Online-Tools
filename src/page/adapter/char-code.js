(function() {
	var inputElement = $('#user-input'),
		outputElement = $('.output'),
		htmlSyntax = $('.html-syntax'),
		showExampleBtn = $('#show-example');

	inputElement.on('change keyup keydown', function() {
		var content = inputElement.val();
		var output = "";
		if (content) {
			var lastChar = content.slice(-1);
			output = getCharCode(lastChar);

			if (content !== lastChar) {
				inputElement.val(lastChar);
			}
		}
		outputElement.html(output);
		if (output) {
			htmlSyntax.removeClass('hidden');
		}
		else {
			htmlSyntax.addClass('hidden');
		}
	}).trigger('change');

	showExampleBtn.on('click', function() {
		inputElement.val('▼').trigger('change');
	});
})();