(function() {
	// const
	var EXAMPLE_HTML = "-1.5 -1.2\n-.2 0\n1 0.5\n5 1\n10 1.2\n15 2\n20 1",
		ERROR_MSG = {
			'ParseError': 'The input could not be parsed.',
			'NotEnoughPoints': 'Not enough points given.',
			'InvalidChars': 'The input contains invalid characters.',
			'SameXDifferentY': 'Two points share the same x-value but have different y-values.'
		};

	// HTML elements
	var btnShowExample = $('#show-example'), textareaUserInput = $('#user-input'), btnInterpolate = $('#interpolate'), divEquationOutput = $('#equation-output'), divOutput = $('#output'), divPointOutput = $('#point-output'), divErrorMsg = $('#error-msg'), graphBoard, inputX = $('#input-x'), outputY = $('#y-value-output'), boundarySelect = $('#boundary-input'), outputLatex = $('#latex-output');

	var functions = [];
	var f = function(x) { return undefined; };

	var keepAspectRatio = false;

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
	}).trigger('change');

	$('#keepAspectRatioInput').on('click', function() {
		keepAspectRatio = $(this).is(':checked');
		visualize();
	});

	var lastX = undefined;
	inputX.on('change keyup', function() {
		if (!inputX.val()) {
			outputY.html('');
			return;
		}
		
		try {
			var x = parseFloat(inputX.val());

			if (lastX === x) return; // avoid unnecessary redrawing


			var fofx = f(x);
			if (typeof fofx === 'undefined') fofx = '\\text{undefined}'; // show undefined string when out of bounds
			else fofx = roundMathJax(fofx); // round to four digits

			outputY.html('$$f(' + x + ')=' + fofx + '$$');
			lastX = x;

			MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById('y-value-output')]);
		}
		catch(e) {
			outputY.html('');
		}
	});

	btnInterpolate.on('click', goInterpolate);
	boundarySelect.on('change', goInterpolate);

	function goInterpolate() {
		hideError();
		inputX.val('');

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

				var x = parseFloat(val[0].replace(String.fromCharCode(8722), '-')), 
					y = parseFloat(val[1].replace(String.fromCharCode(8722), '-'));

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

		functions = cubicSplineInterpolation(points, boundarySelect.val());

		lastX = undefined;
		outputY.html('');

		// output
		showPoints();
		showEquations();
		showLatexOutput();
		visualize();
		divOutput.removeClass('hide');
	}

	function showPoints() {
		var html = '';
		for (var i = 0; i < points.length; i++) {
			if (i !== 0) html += '; ';
			html += 'P_{' + i + '}(' + points[i].x + '|' + points[i].y + ')';
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
			html += roundMathJax(f.a) + '\\cdot x^3 + ' + roundMathJax(f.b) + '\\cdot x^2 + ' + roundMathJax(f.c) + '\\cdot x + ' + roundMathJax(f.d) + ', & \\text{if } x \\in ' + ((i == 0) ? "[" : "(") + f.range.xmin + ',' + f.range.xmax + ']' + ((i !== functions.length - 1) ? ', \\\\' : '.\\end{cases}$$');
		}
		divEquationOutput.html(html);

		// draw equation
		MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById('equation-output')]);
	}

	function showLatexOutput() {
		let plotString = "";
		// loop over splines
		for (let i = 0; i < functions.length; i++) {
			let f = functions[i];
			plotString += "\n			\\addplot[][domain=" + f.range.xmin + ":" + f.range.xmax + "]{";

			plotString += "+" + f.a + "*x^3";
			plotString += "+" + f.b + "*x^2";
			plotString += "+" + f.c + "*x^1";
			plotString += "+" + f.d + "*x^0";
			plotString += "};";
			
		}

		let pointsString = "\\addplot [only marks] table {\n";
		for (let i = 0; i < points.length; i++) {
			pointsString += points[i].x + " " + points[i].y + "\n";
		}
		pointsString += "};\n"

		let html = "\\documentclass[11pt]{article}\n\n% graphics\n\\usepackage{tikz}\n\\usepackage{pgfplots}\n\\pgfplotsset{compat=1.12}\n\\usepgfplotslibrary{fillbetween}\n\n\n\\begin{document}\n	\\begin{tikzpicture}\n\n		\\pgfplotsset{\n			scale only axis,\n		}\n\n		\\begin{axis}[\n			xlabel=$x$,\n			ylabel=$y$,\n			samples=100,\n			]" + pointsString + "\n			" + plotString + "		\\end{axis}\n\n	\\end{tikzpicture}\n\n\\end{document}";
		outputLatex.html(html);
	}


	function visualize() {
		// initialize graph board
		JXG.Options.axis.ticks.strokeColor = "#D0D0D0"; // hide grid
		var graphMinX = minX, graphMaxX = maxX, graphMinY = minY, graphMaxY = maxY;
		var maxPaddingX, maxPaddingY;

		var deltaX = Math.abs(graphMaxX - graphMinX), deltaY = Math.abs(Math.abs(graphMaxY - graphMinY));
		var maxDelta = Math.max(deltaX, deltaY), minDelta = Math.min(deltaX, deltaY);

		if (keepAspectRatio) {
			// length units to add at the axis which has the lower delta value
			var offset = (maxDelta / 2 - minDelta / 2);

			if (deltaX === maxDelta) { // y-axis has the lower delta value
				graphMinY -= offset;
				graphMaxY += offset;
			}
			else { // x-axis has the lower delta value
				graphMinX -= offset;
				graphMaxX += offset;
			}

			// same padding for both axes
			maxPaddingX = maxDelta * .2;
			maxPaddingY = maxPaddingX;
		}
		else {
			// padding
			maxPaddingX = deltaX * .2;
			maxPaddingY = deltaY * .2;
		}

		graphBoard = JXG.JSXGraph.initBoard('visualization', { boundingbox:[ graphMinX - maxPaddingX, graphMaxY + maxPaddingY, graphMaxX + maxPaddingX, graphMinY - maxPaddingY], axis: true, showCopyright: false });

		// draw points
		for (var i = 0; i < points.length; i++) {
			var point = points[i];
	 		graphBoard.create('point', [point.x, point.y], { style: 6, name: 'P' + i, fillcolor: '#3278B4', stroke: '#3278B4', strokecolor: '#3278B4' }); 
	 	}

	 	// draw functions
	 	f = function(x) {
 			for (var i = 0; i < functions.length; i++) {
 				if (functions[i].range.xmin <= x && functions[i].range.xmax >= x) {
 					return functions[i].a * x * x * x + functions[i].b * x * x + functions[i].c * x + functions[i].d;
 				}
 			}
 			return undefined;
 		};
 		graphBoard.create('functiongraph', [f], { strokewidth: 2, strokecolor: '#3278B4', strokeopacity: '0.9' });

	}

	function showError(code) {
		divErrorMsg.html(ERROR_MSG[code]).removeClass('hide');
		divOutput.addClass('hide');
	}

	function hideError() {
		divErrorMsg.addClass('hide');
	}
})();