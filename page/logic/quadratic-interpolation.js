function processPoints(points) {
	// sort array by x values
	points.sort(function(a, b) {
		if (a.x < b.x) return -1;
		if (a.x === b.x) return 0;
		return 1;
	});

	for (var i = 0; i < points.length; i++) {
		if (i < points.length - 1 && points[i].x === points[i + 1].x) {
			// two points have the same x-value

			// check if the y-value is the same
			if (points[i].y === points[i + 1].y) {
				// remove the latter
				points.splice(i, 1);
				i--;
			}
			else {
				throw Error('SameXDifferentY')
			}
		}
	}
	
	if (points.length < 2) {
		throw Error('NotEnoughPoints');
	}	

	return points;
}

function getMinMax(points) {
	// determine max and min x and y values
	minX = points[0].x;
	maxX = points[0].x;
	minY = points[0].y;
	maxY = points[0].y;

	for (var i = 1; i < points.length; i++) {
		minX = Math.min(minX, points[i].x);
		maxX = Math.max(maxX, points[i].x);
		minY = Math.min(minY, points[i].y);
		maxY = Math.max(maxY, points[i].y);
	}

	return {
		minX: minX, 
		maxX: maxX, 
		minY: minY, 
		maxY: maxY 
	}
}

function quadraticInterpolation(data) {
	// initialize matrix
	var numberOfUnknowns = 3*(data.length-1);
	var numberOfFunctions = data.length-1;
	var numberOfDerivatives = data.length-2;
	var matrix = new Array(numberOfUnknowns);
	for (var i = 0; i < matrix.length; i++) {
		matrix[i] = new Array(numberOfUnknowns+1);
		for (var j = 0; j < matrix[i].length; j++) {
			matrix[i][j] = 0;
		}
	}

	// through points equations
	for (var i = 0, j = 0; j < data.length-1; i += 2, j++) {
		matrix[i][j*3] = Math.pow(data[j].x, 2);
		matrix[i][j*3+1] = data[j].x;
		matrix[i][j*3+2] = 1;
		matrix[i][numberOfUnknowns] = data[j].y;
		matrix[i+1][j*3] = Math.pow(data[j+1].x, 2);
		matrix[i+1][j*3+1] = data[j+1].x;
		matrix[i+1][j*3+2] = 1;
		matrix[i+1][numberOfUnknowns] = data[j+1].y;
	}

	// derivative equations
	for (var i = (data.length-1)*2, j = 0; i < numberOfUnknowns-1; i++, j++) {
		matrix[i][(j*3)] = 2*data[j+1].x;
		matrix[i][(j*3)+1] = 1;
		matrix[i][(j*3)+3] = -2*data[j+1].x;
		matrix[i][(j*3)+4] = -1;
	}

	// additional information / boundary condition (required)
	matrix[numberOfUnknowns-1][0] = 1; // make first function linear
	var coefficients = solveMatrix(matrix);

	var functions = [];
	for (var i = 0; i < coefficients.length; i += 3) {
		functions.push({
			a: coefficients[i],
			b: coefficients[i+1],
			c: coefficients[i+2],
			range: { xmin: data[i/3].x, xmax: data[i/3+1].x }
		})
	}
	return functions;
}

function solveMatrix(mat) {
	var len = mat.length;
	for (var i = 0; i < len; i++) { // column
		for (var j = i+1; j < len; j++) {// row
			if (mat[i][i] == 0) { // check if cell is zero
				var k = i;
				// search for an element where this cell is not zero
				while (mat[k][i] == 0) k++;
				// swap rows
				var tmp = mat[k].slice();
				mat[k] = mat[i].slice();
				mat[i] = tmp.slice();
			}
			var fac = -mat[j][i]/mat[i][i];
			for(var k = i; k < len+1; k++) // elements in a row
			mat[j][k] += fac *mat[i][k];
		}
	}

	var solution = [];
	for (var i = len-1; i >= 0; i--) { // column
		solution.unshift(mat[i][len]/mat[i][i]);
		for (var k = i-1; k >= 0; k--) {
			mat[k][len] -= mat[k][i] * solution[0];
		}
	}

	return solution;
}