(function() {
	// cache DOM
	var floatInput = $('#input-float'), 
		rawBinaryOutput = $('#raw-binary-output'),
		floatOutputRow = $('#float-output-row'),
		doubleOutputRow = $('#double-output-row'),
		specialInputValueSelect = $('#special-input-value'),
		stringOutputHeading = $('#string-output');

	var val = NaN;

	function updateOutput() {
		try {
			var f = val;

			stringOutputHeading.html(f.toString());

			// float
			var floatBitString = floatToIEEE(f);
			for (var i = 0; i < 4; i++) {
				var byteString = floatBitString.substring(i * 8, i * 8 + 8),
					cellHTML = "";
				for (var j = 0; j < 8; j++) {
					var className = "mantissa"; // default
					if (i === 0 && j === 0) {
						className = "sign";
					}
					else if (i === 0 || i === 1 && j < 1) {
						className = "exponent";
					}
					cellHTML += "<span class=\"" + className + "\">" + byteString.substring(j, j + 1) + "</span>";
				}
				floatOutputRow.children().eq(i).html(cellHTML);
			}

			// double
			doubleBitString = doubleToIEEE(f)
			for (var i = 0; i < 8; i++) {
				var byteString = doubleBitString.substring(i * 8, i * 8 + 8),
					cellHTML = "";
				for (var j = 0; j < 8; j++) {
					var className = "mantissa"; // default
					if (i === 0 && j === 0) {
						className = "sign";
					}
					else if (i === 0 || i === 1 && j < 4) {
						className = "exponent";
					}
					cellHTML += "<span class=\"" + className + "\">" + byteString.substring(j, j + 1) + "</span>";
				}
				doubleOutputRow.children().eq(i).html(cellHTML);
			}
		}
		catch (e) {
			console.log(e);
			// TODO: show error
		}
	}

	floatInput.on('change keyup', function() {
		try {
			val = parseFloat(floatInput.val());
			if (isNaN(val)) {
				specialInputValueSelect.val('nan');
			}
			else if (Object.is(val, +0)) {
				specialInputValueSelect.val('positive-0');
			}
			else if (Object.is(val, -0)) {
				specialInputValueSelect.val('negative-0');
			}
			else if (val === +Infinity) {
				specialInputValueSelect.val('positive-inf');
			}
			else if (val === -Infinity) {
				specialInputValueSelect.val('negative-inf');
			}
			else {
				specialInputValueSelect.val('number');
			}
		}
		catch (e) {
			val = NaN;
		}
		updateOutput();
	}).trigger('change');

	specialInputValueSelect.on('change', function() {
		switch (specialInputValueSelect.val()) {
			case "number":
				floatInput.trigger('change');
				break;
			case "positive-0":
				val = +0;
				break;
			case "negative-0":
				val = -0;
				break;
			case "positive-inf":
				val = +Infinity;
				break;
			case "negative-inf":
				val = -Infinity
				break;
			default:
				val = NaN
				break;
		}
		updateOutput();
	})
})();