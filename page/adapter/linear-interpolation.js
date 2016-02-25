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
	var btnShowExample = $('#show-example'), textareaUserInput = $('#user-input'), btnInterpolate = $('#interpolate'), divEquationOutput = $('#equation-output'), divOutput = $('#output'), divPointOutput = $('#point-output'), divErrorMsg = $('#error-msg'), graphBoard;

	var functions = [];

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

		functions = linearInterpolation(points);

		// output
		showPoints();
		showEquations();
		visualize();
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
		// draw equation
		MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById('equation-output')]);
		var html = '$$f(x) = \\begin{cases}';
		for (var i = 0; i < functions.length; i++) {
			var f = functions[i];
			// approximate output
			html += round(f.a) + 'x + ' + round(f.b) + ', & \\text{if } x \\in [' + f.range.xmin + ',' + f.range.xmax + ']' + ((i !== functions.length - 1) ? ', \\\\' : '.\\end{cases}$$');
		}
		divEquationOutput.html(html);

		// draw equation
		MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById('equation-output')]);
	}

	function visualize() {
		// initialize graph board
		JXG.Options.axis.ticks.strokeColor = "transparent"; // hide grid
		// max padding
		var maxPaddingX = Math.max(Math.abs(minX), Math.abs(maxX)) * 0.25;
		var maxPaddingY = Math.max(Math.abs(minY), Math.abs(maxY)) * 0.25;
		graphBoard = JXG.JSXGraph.initBoard('visualization', { boundingbox:[ minX - maxPaddingX, maxY + maxPaddingY, maxX + maxPaddingX, minY - maxPaddingY], axis: true, showCopyright: false, grid: false, showNavigation: false });

		// draw points
		for (var i = 0; i < points.length; i++) {
			var point = points[i];
	 		graphBoard.create('point', [point.x, point.y], { style: 6, name: 'P' + i, fillcolor: '#3278B4', stroke: '#3278B4', strokecolor: '#3278B4' }); 
	 	}

	 	// draw functions
 		graphBoard.create('functiongraph', [function(x) {
 			for (var i = 0; i < functions.length; i++) {
 				if (functions[i].range.xmin <= x && functions[i].range.xmax >= x) {
 					return functions[i].a * x + functions[i].b;
 				}
 			}
 			return undefined;
 		}], { strokewidth: 2, strokecolor: '#3278B4', strokeopacity: '0.9' });

	}

	function showError(code) {
		divErrorMsg.html(ERROR_MSG[code]).removeClass('hide');
		divOutput.addClass('hide');
	}

	function hideError() {
		divErrorMsg.addClass('hide');
	}
})();