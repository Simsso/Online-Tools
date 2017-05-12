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

	for (var i = points.length - 1; i >= 0; i--) {
		points[i].x = parseFloat(points[i].x);
		points[i].y = parseFloat(points[i].y);
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

// cubic spline interpolation
// @param p The points. An array of objects with x and y coordinate.
// @param type The interpolation boundary condition ("quadratic", "notaknot", "natural"). "natural" is the default value.
function cubicSplineInterpolation(p, boundary) {
	var row = 0;
	var solutionIndex = (p.length - 1) * 4;

	// initialize matrix
	var m = []; // rows
	for (var i = 0; i < (p.length - 1) * 4; i++) {
		// columns (rows + 1)
		m.push([]);
		for (var j = 0; j <= (p.length - 1) * 4; j++) {
			m[i].push(0); // fill with zeros
		}
	}

	// splines through p equations
	for (var functionNr = 0; functionNr < p.length-1; functionNr++, row++) {
		var p0 = p[functionNr], p1 = p[functionNr+1];
		m[row][functionNr*4+0] = Math.pow(p0.x, 3);
		m[row][functionNr*4+1] = Math.pow(p0.x, 2); 
		m[row][functionNr*4+2] = p0.x;
		m[row][functionNr*4+3] = 1; 
		m[row][solutionIndex] = p0.y;

		m[++row][functionNr*4+0] = Math.pow(p1.x, 3);
		m[row][functionNr*4+1] = Math.pow(p1.x, 2); 
		m[row][functionNr*4+2] = p1.x;
		m[row][functionNr*4+3] = 1; 
		m[row][solutionIndex] = p1.y;
	}

	// first derivative
	for (var functionNr = 0; functionNr < p.length - 2; functionNr++, row++) {
		var p1 = p[functionNr+1];
		m[row][functionNr*4+0] = 3*Math.pow(p1.x, 2);
		m[row][functionNr*4+1] = 2*p1.x;
		m[row][functionNr*4+2] = 1;
		m[row][functionNr*4+4] = -3*Math.pow(p1.x, 2);
		m[row][functionNr*4+5] = -2*p1.x;
		m[row][functionNr*4+6] = -1;
	}

	// second derivative
	for (var functionNr = 0; functionNr < p.length - 2; functionNr++, row++) {
		var p1 = p[functionNr+1];
		m[row][functionNr*4+0] = 6*p1.x;
		m[row][functionNr*4+1] = 2;
		m[row][functionNr*4+4] = -6*p1.x;
		m[row][functionNr*4+5] = -2;
	}

	// boundary conditions
	switch (boundary) {
		case "quadratic":
			// first and last spline quadratic
			m[row++][0] = 1;
			m[row++][solutionIndex-4+0] = 1;
			break;

		case "notaknot":
			// Not-a-knot spline
			m[row][0+0] = 1;
			m[row++][0+4] = -1;
			m[row][solutionIndex-8+0] = 1;
			m[row][solutionIndex-4+0] = -1;
			break;

		default:
			// natural spline
			m[row][0+0] = 6*p[0].x;
			m[row++][0+1] = 2;
			m[row][solutionIndex-4+0] = 6*p[p.length-1].x;
			m[row][solutionIndex-4+1] = 2;
			break;
	}


	var reducedRowEchelonForm = rref(m);
	var coefficients = [];
	for (var i = 0; i < reducedRowEchelonForm.length; i++) {
		coefficients.push(reducedRowEchelonForm[i][reducedRowEchelonForm[i].length - 1]);
	}

	var functions = [];
	for (var i = 0; i < coefficients.length; i += 4) {
		functions.push({
			a: coefficients[i],
			b: coefficients[i+1],
			c: coefficients[i+2],
			d: coefficients[i+3],
			range: { xmin: p[i/4].x, xmax: p[i/4+1].x }
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


// taken from https://rosettacode.org/wiki/Reduced_row_echelon_form
function rref(mat) {
    var lead = 0;
    for (var r = 0; r < mat.length; r++) {
        if (mat[0].length <= lead) {
            return;
        }
        var i = r;
        while (mat[i][lead] == 0) {
            i++;
            if (mat.length == i) {
                i = r;
                lead++;
                if (mat[0].length == lead) {
                    return;
                }
            }
        }
 
        var tmp = mat[i];
        mat[i] = mat[r];
        mat[r] = tmp;
 
        var val = mat[r][lead];
        for (var j = 0; j < mat[0].length; j++) {
            mat[r][j] /= val;
        }
 
        for (var i = 0; i < mat.length; i++) {
            if (i == r) continue;
            val = mat[i][lead];
            for (var j = 0; j < mat[0].length; j++) {
                mat[i][j] -= val * mat[r][j];
            }
        }
        lead++;
    }
    return mat;
}