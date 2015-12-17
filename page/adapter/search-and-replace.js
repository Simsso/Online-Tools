$('#user-input, #user-input-search, #user-input-replace').on('change keyup', function() {
	var input = $('#user-input').val(), search = $('#user-input-search').val(), replace = $('#user-input-replace').val();
	$('#output').html(searchAndReplace(input, search, replace));
});