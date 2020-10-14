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

function polynomialInterpolation(p) {
	var m = []; // matrix
	var numPoints = p.length; // number of points

	// fill matrix
	for (var row = 0; row < numPoints; row++) {
		m.push([]);

		for (var col = 0; col < numPoints; col++) {
  			m[row][col] = Math.pow(p[row].x, numPoints - col - 1);
		}
		m[row][numPoints] = p[row].y; // solution
	}

	var reducedRowEchelonForm = rref(m);
	var coefficients = [];
	for (var i = 0; i < reducedRowEchelonForm.length; i++) {
		coefficients.push(reducedRowEchelonForm[i][reducedRowEchelonForm[i].length - 1]);
	}
	return coefficients;
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
