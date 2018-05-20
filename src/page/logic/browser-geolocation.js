function geolocationSupported() {
	return navigator.geolocation;
}

function getGeoposition(callback) {
	navigator.geolocation.getCurrentPosition(callback);
}