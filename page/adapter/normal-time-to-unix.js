(function() {
	var unix, normal;

	// set to current date
	var currentDate = new Date();
	var dd = currentDate.getDate() + '';
	dd = (dd.length === 1) ? ('0' + dd) : dd; // add leading zero
	var mm = (currentDate.getMonth() + 1) + ''; // January is 0
	mm = (mm.length === 1) ? ('0' + mm) : mm; // add leading zero
	var yyyy = currentDate.getFullYear();
	$('#user-input-date').val(yyyy + '-' + mm + '-' + dd);

	// listen for user input
	$('#user-input-date, #user-input-time').on('change keyup', function() {
		var date = $('#user-input-date').val(), time = $('#user-input-time').val();

		// check if the user input is valid
		if (date) { 
			normal = date + ' ' + time;
			unix = normalTimeToUnix(normal);

			$('#unix-time-output').html(unix);
			$('#add-to-history').removeAttr('disabled', 'disabled');
		}
		else {
			$('#unix-time-output').html('&nbsp;');
			$('#add-to-history').attr('disabled', 'disabled');
		}
	}).trigger('change');;



	// history
	$('#add-to-history').on('click', function() {
		$('#history-table').removeClass('hide');
		$('#history').prepend('<tr><td>' + normal + '</td><td>' + unix + '</td></tr>');
	});


	$('#user-input-date').focus();
})();