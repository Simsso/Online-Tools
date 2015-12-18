function solveMatrix(m) {
	var len = m.length;

	for (var i = 0; i < len; i++) { // column
		for (var j = i+1; j < len; j++) { // row
			if (m[i][i] == 0) { // check if cell is zero
				var k = i;

				// search for an element where this cell is not zero
				while (m[k][i] == 0) k++;

				// swap rows
				var tmp = m[k].slice();
				m[k] = m[i].slice();
				m[i] = tmp.slice();
			}

			var fac = -m[j][i]/m[i][i];
			for(var k = i; k < len+1; k++) // elements in a row
			m[j][k] += fac *m[i][k];
		}
	}

	var solution = [];
	for (var i = len-1; i >= 0; i--) { // column
		solution.unshift(m[i][len]/m[i][i]);
		for (var k = i-1; k >= 0; k--) {
			m[k][len] -= m[k][i] * solution[0];
		}
	}

	return solution;
}