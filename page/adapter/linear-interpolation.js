(function() {
	// const
	var EXAMPLE_HTML = "-1.5 -1.2\n-.2 0\n1 0.5\n5 1\n10 1.2",
		ERROR_MSG = {
			'ParseError': 'The input could not be parsed.',
			'NotEnoughPoints': 'Not enough points given.',
			'InvalidChars': 'The input contains invalid characters.',
			'SameXDifferentY': 'Two points share the same x-value but have different y-values.'
		};

	// HTML elements
	var btnShowExample = $('#show-example'), textareaUserInput = $('#user-input'), btnInterpolate = $('#interpolate'), svgVisualization = $('#visualization'), divEquationOutput = $('#equation-output'), divOutput = $('#output'), divPointOutput = $('#point-output'), divErrorMsg = $('#error-msg');

	// interpolation vars
	var points, minX, maxX, minY, maxY;

	btnShowExample.on('click', function() {
		textareaUserInput.val(EXAMPLE_HTML).trigger('change');
		btnInterpolate.trigger('click');
	});

	textareaUserInput.on('change keyup', function() {
		hideError();

		if (textareaUserInput.val().length > 0) {
			btnInterpolate.removeAttr('disabled');
		}
		else {
			btnInterpolate.attr('disabled', 'disabled');
		}
	});

	btnInterpolate.on('click', function() {
		hideError();

		var userInput = textareaUserInput.val().trim();

		// parse the user input
		var rows = userInput.split(/\s*\n+\s*/g);
		var valid = true;
		points = [];
		for (var i = 0; i < rows.length; i++) {
			var val = rows[i].split(/\s+/g);
			if (val.length !== 2) {
				valid = false;
				break;
			}
			else {
				// check if user input contains invalid chars
				// input can contain "-" "." \d
				/*if (!/^\d+$/.test(val[0]) || /^\d+$/.test(val[1])) {
					showError('InvalidChars');
					return;
				}*/

				var x = parseFloat(val[0]), y = parseFloat(val[1]);

				// check if parsing worked
				if (isNaN(x) || isNaN(y)) {
					valid = false;
					break;
				}

				// fill points array with the values which have been parsed
				points.push({
					x: x,
					y: y
				});
			}
		}

		// check for parse error
		if (!valid) {
			showError('ParseError');
			return;
		}

		try {
			points = processPoints(points);
		}
		catch(error) {
			showError(error.message);
			return;
		}

		var minMax = getMinMax(points);

		minX = minMax.minX;
		maxX = minMax.maxX;
		minY = minMax.minY;
		maxY = minMax.maxY;

		// output
		showPoints();
		showEquations();
		drawPoints();
		divOutput.removeClass('hide');
	}).trigger('change');

	function showPoints() {
		var html = '';
		for (var i = 0; i < points.length; i++) {
			if (i !== 0) html += '; ';
			html += 'P_' + i + '(' + points[i].x + '|' + points[i].y + ')';
		}
		divPointOutput.html('$$' + html + '$$');

		// draw equation
		MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById('point-output')]);
	}

	function showEquations() {
		var html = '$$f(x) = \\begin{cases}';
		for (var i = 1; i < points.length; i++) {
			var xn = points[i].x, xm = points[i-1].x, yn = points[i].y, ym = points[i-1].y;
			
			// exact output
			//html += ym + ' + (' + yn + ' - ' + ym + ') * (x - ' + xm + ') / (' + xn + ' - ' + xm + '), & \\text{if } x \\in [' + xm + ',' + xn + ']' + ((i !== points.length - 1) ? ', \\\\' : '.\\end{cases}$$');

			// approximate output
			html += (ym/(xm-xn)-yn/(xm-xn)) + 'x + ' + (xm*yn/(xm-xn)-xn*ym/(xm-xn)) + ', & \\text{if } x \\in [' + xm + ',' + xn + ']' + ((i !== points.length - 1) ? ', \\\\' : '.\\end{cases}$$');
		}
		divEquationOutput.html(html);

		// draw equation
		MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById('equation-output')]);
	}

	function drawPoints() {
		var svgHtml = '';
		for (var i = 1; i < points.length; i++) {
			var x1 = map(points[i-1].x, minX, maxX, 5, 95),
				x2 = map(points[i].x, minX, maxX, 5, 95),
				y1 = map(points[i-1].y, minX, maxY, 95, 5),
				y2 = map(points[i].y, minX, maxY, 95, 5);
			svgHtml += '<line x1="' + x1 + '%" x2="' + x2 + '%" y1="' + y1 + '%" y2="' + y2 + '%" />';
		}
		svgVisualization.html(svgHtml);
	}

	function showError(code) {
		divErrorMsg.html(ERROR_MSG[code]).removeClass('hide');
		divOutput.addClass('hide');
	}

	function hideError() {
		divErrorMsg.addClass('hide');
	}

	function map(x, inMin, inMax, outMin, outMax) { return (x-inMin) * (outMax-outMin) / (inMax-inMin) + outMin; } // maps a value
})();