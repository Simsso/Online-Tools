(function() {
	// listen for user input
	$('#user-input-unix-time').on('change keyup', function() {
		$('#normal-time-output').html(unixToTimeString(parseInt($(this).val())));
	});
})();