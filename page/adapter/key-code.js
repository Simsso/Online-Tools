(function() {
	var inputElement = $('#user-input'),
		keyCodeOutput = $('.key-code'),
		keyOutput = $('.key');

	inputElement.on('change keyup keydown', function(event) {
		var keyCode = getKeyCode(event);
		keyCodeOutput.html(keyCode);

		var key = getKey(event);
		keyOutput.html(key);
	});
})();