(function() {
	// cache dom
	var supported = $('#supported'), notSupported = $('#not-supported'), btnUpdate = $('#btn-update'), tableOutput = $('#table-output'), loadingInfo = $('#loading-info'), errorInfo = $('#error-info');

	// check for browser support
	if (geolocationSupported()) {
		supported.removeClass('hidden');
	} else {
		notSupported.removeClass('hidden');
		return;
	}

	btnUpdate.on('click', function() {
		btnUpdate.attr('disabled', 'disabled');
		loadingInfo.removeClass('hidden');
		tableOutput.html('');

		getGeoposition(function(geoposition) {
			console.log(geoposition);
			var tableHTML = '';
			for (var attr in geoposition.coords) {
				tableHTML += '<tr><td>' + attr  + '</td><td>' + geoposition.coords[attr] + '</td></tr>';
			}
			btnUpdate.removeAttr('disabled', 'disabled');
			loadingInfo.addClass('hidden');
			tableOutput.html(tableHTML);
		});
	});
})();