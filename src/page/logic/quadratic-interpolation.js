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
	var m = new Array(numberOfUnknowns);
	for (var i = 0; i < m.length; i++) {
		m[i] = new Array(numberOfUnknowns+1);
		for (var j = 0; j < m[i].length; j++) {
			m[i][j] = 0;
		}
	}

	// through points equations
	for (var i = 0, j = 0; j < data.length-1; i += 2, j++) {
		m[i][j*3] = Math.pow(data[j].x, 2);
		m[i][j*3+1] = data[j].x;
		m[i][j*3+2] = 1;
		m[i][numberOfUnknowns] = data[j].y;
		m[i+1][j*3] = Math.pow(data[j+1].x, 2);
		m[i+1][j*3+1] = data[j+1].x;
		m[i+1][j*3+2] = 1;
		m[i+1][numberOfUnknowns] = data[j+1].y;
	}

	// derivative equations
	for (var i = (data.length-1)*2, j = 0; i < numberOfUnknowns-1; i++, j++) {
		m[i][(j*3)] = 2*data[j+1].x;
		m[i][(j*3)+1] = 1;
		m[i][(j*3)+3] = -2*data[j+1].x;
		m[i][(j*3)+4] = -1;
	}

	// additional information / boundary condition (required)
	m[numberOfUnknowns-1][0] = 1; // make first function linear

	var reducedRowEchelonForm = rref(m);
	var coefficients = [];
	for (var i = 0; i < reducedRowEchelonForm.length; i++) {
		coefficients.push(reducedRowEchelonForm[i][reducedRowEchelonForm[i].length - 1]);
	}

	var functions = [];
	for (var i = 0; i < coefficients.length; i += 3) {
		functions.push({
			a: parseFloat(coefficients[i]),
			b: parseFloat(coefficients[i+1]),
			c: parseFloat(coefficients[i+2]),
			range: { xmin: parseFloat(data[i/3].x), xmax: parseFloat(data[i/3+1].x) }
		})
	}
	return functions;
}

// Reduced row echelon form
// Taken from https://rosettacode.org/wiki/Reduced_row_echelon_form
// Modified to work with math.js (high float precision).
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
            mat[r][j] = math.divide(mat[r][j], val);
        }
 
        for (var i = 0; i < mat.length; i++) {
            if (i == r) continue;
            val = math.bignumber(mat[i][lead]);
            for (var j = 0; j < mat[0].length; j++) {
                mat[i][j] = math.subtract(math.bignumber(mat[i][j]), math.multiply((val), math.bignumber(mat[r][j])));
            }
        }
        lead++;
    }
    return mat;
}