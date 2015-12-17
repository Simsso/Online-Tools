(function() {
	$('#request-page-source').on('click', function() {
		// show loading message
		$('#loading-message').removeClass('hide');
		$('#page-source-output').html('');

		var btn = $(this);
		btn.attr('disabled', 'disabled');
		var url = 'http://' + $('#input-url').val();
		jQuery.ajax(
			'/page/logic/website-page-source.php', 
			{
				type: 'POST',
				data: {
					'url': url
				},
				success: function(res) {
					$('#error-message').addClass('hide');
					$('#page-source-output').html(res);
				},
				error: function(res) {
					// error message
					$('#error-message').removeClass('hide');
				},
				complete: function() {
					// re-enable button
					btn.removeAttr('disabled');

					// hide loading message
					$('#loading-message').addClass('hide');
				}
			}
		);
	});

	// allow enter to request the page source
	$('#input-url').on('keyup', function(e) {
		// disable button if the input is empty
		if (!$(this).val()) {
			$('#request-page-source').attr('disabled', 'disabled');
			return;
		} 
		else {
			$('#request-page-source').removeAttr('disabled');
		}

		if (e.keyCode === 13) { // enter
			$('#request-page-source').trigger('click');
		}
	}).trigger('keyup');
})();