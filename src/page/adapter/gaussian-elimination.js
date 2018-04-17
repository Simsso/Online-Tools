(function() {
	var soultionElement = $('#solution');

	var parseMatrixInput = function() {
		var matrix = [];

		var raw = $('#user-input').val();
		var lines = raw.split("\n");
		for (var i = 0; i < lines.length; i++) {
			var columns = lines[i].split(/\ +/); // allow multiple spaces
			if (columns.length === 0) continue;
			matrix.push([]);
			for (var j = 0; j < columns.length; j++) {
				matrix[i].push(parseFloat(columns[j]));
			}
		}

		return matrix;
	};

	var showSolution = function(solution) {
		var html = '';
		for (var i = 0; i < solution.length; i++) {
			html += '<tr>';
			for (var j = 0; j < solution.length; j++) {
				html += '<td>' + ((j === i) ? '1' : '0') + '</td>';
			}
			html += '<td>' + solution[i] + '</td>';
		}
		soultionElement.html(html);
		$('#solution-title').removeClass('hide');
	};

	$('#solve').on('click', function() {
		soultionElement.html('');
		var solution = solveMatrix(parseMatrixInput());
		showSolution(solution);
	});

	$('#fill-example').on('click', function() {
		$('#user-input').val('1 2 3\n4 5 6');
		$('#solve').trigger('click');
		$('#user-input').trigger('change');
	});

	$('#user-input').on('change keyup', function() {
		if ($(this).val()) {
			$('#solve').removeAttr('disabled');
		}
		else {
			$('#solve').attr('disabled', 'disabled');
		}
	}).trigger('change');
})();