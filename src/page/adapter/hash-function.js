(function() {
	$('#calculate-hash').on('click', function() {
		var btn = $(this);
		btn.attr('disabled', 'disabled');
		$('#input-algorithm').attr('disabled', 'disabled');

		$('#hash-output').html('&nbsp;');

		var value = $('#input-value').val(), algorithm = $('#input-algorithm').val();

		jQuery.ajax(
			'/page/logic/hash-function.php', 
			{
				type: 'POST',
				data: {
					'value': value,
					'algorithm': algorithm
				},
				success: function(res) {
					$('#error-message').addClass('hide');
					$('#hash-output').html(res);
				},
				error: function(res) {
					// error message
					$('#error-message').removeClass('hide');
				},
				complete: function() {
					// re-enable button
					btn.removeAttr('disabled');
					$('#input-algorithm').removeAttr('disabled');

					// hide loading message
					$('#loading-message').addClass('hide');
				}
			}
		);
	});

	$('#input-value').on('keyup', function(e) {
		if (e.keyCode === 13) { // enter
			$('#calculate-hash').trigger('click');
		}
	});

	$('#input-algorithm').on('change', function() {
		$('#calculate-hash').trigger('click');
	});
})();