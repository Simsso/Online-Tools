(() => {
	// ui elements
	let textarea = $('#main-input'),
		divRenderOutput = $('#render-output'),
		textareaHTMLOutput = $('#html-output'),
		convertBtn = $('#convert-btn'),
		sampleBtn = $('#sample-btn');

	// conversion events
	textarea.on('change keydown keyup', convert).trigger('change')
	convertBtn.on('click', convert)

	// request sample
	sampleBtn.on('click', () => {
		textarea.val('| Tables        | Are           | Cool  |\n| ------------- |:-------------:| -----:|\n| col 3 is      | right-aligned | blabl |\n| col 2 is      | centered      | X     |\n| this tool     | is neat       | !     |')
		convert()
	})

	// convert and update output
	function convert() {
		let result = mdTableToHTML(textarea.val())
		divRenderOutput.html(result.html)
		textareaHTMLOutput.val(result.htmlString)
	}
})()