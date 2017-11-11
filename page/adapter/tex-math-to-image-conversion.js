(function() {
	var samples = [
	    'e^{i\\pi }+1=0', 
	    'E=mc^2', 
	    '{ \\partial^2 u \\over \\partial t^2 } = c^2 \\nabla^2 u ', 
	    ' u(x,t) = \\int_{-\\infty}^\\infty s(\\omega) u_\\omega(x,t) d\\omega ',
	    '{\\frac {1}{81{\\sqrt {\\pi }}}}\\left({\\frac {Z}{a_{0}}}\\right)^{\\frac {3}{2}}\\left(6-{\\frac {Zr}{a_{0}}}\\right){\\frac {Zr}{a_{0}}}e^{-\\textstyle {\\frac {Zr}{3a_{0}}}}\\sin \\theta e^{\\pm i\\phi }',
	    '\\frac{\\partial}{\\partial\\theta}\\frac{1}{\\lvert\\mathcal{Y}_j\\rvert}\\sum_{y_i\\in\\mathcal{Y}_j}\\mathcal{L}\\left(f_{\\theta,j}(x_i),y_i\\right)',
	    '\\sum _{n=0}^{\\infty }{\\frac {f^{(n)}(a)}{n!}}\\,(x-a)^{n}'
	];
	var index = 0;

	$('#math-input').on('change keyup', inputChanged).trigger('change');
	$('#sample-button').on('click', showSample);

	function inputChanged() {
		var equation = $('#math-input').val();
		
		// preview
		$('#svg-output').attr('src', getURL(equation, 'svg'));

		// download buttons
		$('.download-btn').each(function() {
			if (equation.length === 0) {
				$(this).attr('disabled', 'disabled');
			}
			else {
				$(this).removeAttr('disabled')
			}
			var format = $(this).data('format');
			$(this).attr('href', getURL(equation, format));
		});
	}

	function getURL(equation, format) {
		if (equation.length === 0) {
			return '';
		}
		return 'https://timodenk.com/api/tex2img/' + encodeURI(equation) + '?format=' + format;
	}

	function showSample() {
		var sample = samples[index++ % samples.length];
		$('#math-input').val(sample);
		inputChanged();
	}
})();