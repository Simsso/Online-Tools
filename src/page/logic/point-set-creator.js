(function() {
	// cache dom elements
	var previewCanvas = $('#previewCanvas'),
		outputDiv = $('#output');

	// input fields
	var showIndexCheckbox = $('#input-show-point-id'),
		inParenthesesCheckbox = $('#input-in-parentheses'),
		idOffsetInput = $('#input-id-offset'),
		decimalsInput = $('#input-decimals'),
		separatorInput = $('#input-separator'),
		resetButton = $('#btn-reset');

	// drawing context
	var previewCanvasContext = previewCanvas[0].getContext("2d");

	var points = [];
	var targetWidth = 300, targetHeight = 300;

	// settings
	var settings = {
		delimiter: ";", 
		showIndex: true,
		showParentheses: true,
		indexOffset: 0,
		decimals: 5
	};


	function addPoint(point) {
		points.push(point);
		updateOutput();
	}

	function reset() {
		points = [];
		previewCanvasContext.clearRect(0, 0, targetWidth, targetHeight);
		updateOutput();
	}

	function setDelimiter(newDelimiter) {
		settings.delimiter = newDelimiter;
		updateOutput();
	}

	function setShowIndex(newShowIndex) {
		settings.showIndex = newShowIndex;
		updateOutput();
	}

	function setShowParentheses(newShowParentheses) {
		settings.showParentheses = newShowParentheses;
		updateOutput();
	}

	function setIndexOffset(newIndexOffset) {
		settings.indexOffset = newIndexOffset;
		updateOutput();
	}

	function setDecimals(newDecimals) {
		settings.decimals = newDecimals;
		updateOutput();
	}

	function updateOutput() {
		var outputHTML = "";
		for (var i = 0; i < points.length; i++) {
			outputHTML += (settings.showParentheses ? "(" : "") + (settings.showIndex ? (i + settings.indexOffset) + settings.delimiter : "") + points[i].x.toFixed(settings.decimals) + settings.delimiter + points[i].y.toFixed(settings.decimals) + (settings.showParentheses ? ")" : "") + "<br>";
		}
		outputDiv.html(outputHTML);
	}


	// events

	// canvas click (add new point)
	previewCanvas.on('click', function(eventArgs) {
		var x, y;
		if (eventArgs.pageX || eventArgs.pageY) { 
			x = eventArgs.pageX;
			y = eventArgs.pageY;
		}
		else { 
			x = eventArgs.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
			y = eventArgs.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
		} 
		x -= previewCanvas.offset().left;
		y -= previewCanvas.offset().top;

		x *= targetWidth / previewCanvas.width();
		y *= targetHeight / previewCanvas.height();

		previewCanvasContext.fillStyle = "black";
		previewCanvasContext.fillRect(x, y, 1, 1);

		var point = {
			x: x / previewCanvas.width(),
			y: y / previewCanvas.height()
		};

		addPoint(point);
	});

	// show index checkbox
	showIndexCheckbox.on('change', function() {
		setShowIndex($(this).is(':checked'));
    }).trigger('change');

	// show in parentheses checkbox
    inParenthesesCheckbox.on('change', function() {
		setShowParentheses($(this).is(':checked'));
    }).trigger('change');

    // number of decimals
    decimalsInput.on('change keyup click', function() {
    	try {
    		setDecimals(parseInt($(this).val()));
    	}
    	catch(e) {
    		console.log(e);
    	}
    }).trigger('change');

    // separator
    separatorInput.on('change keyup', function() {
    	setDelimiter($(this).val());
    }).trigger('change');

    // id offset
    idOffsetInput.on('change keyup click', function() {
    	try {
    		setIndexOffset(parseInt($(this).val()));
    	}
    	catch(e) {
    		console.log(e);
    	}
    }).trigger('change');

    // rest
    resetButton.on('click', reset);

})();