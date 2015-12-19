function searchAndReplace(x, search, replace) {
	var regExp = new RegExp(search, 'g');
	return x.replace(regExp, replace);
}