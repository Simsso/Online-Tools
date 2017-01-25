// adds leading zeros to a number
function pad(num, length) {
	var string = num + ""; // convert to string
	while (string.length < length) {
		string = "0" + string;
	}
	return string;
}

// converts a number to a binary string representing the number
function decimalToBinary(dec) {
	return parseInt(dec).toString(2);
}

// converts a binary number formatted as a string into a number
function binaryToDecimal(bin) {
	return parseInt(bin, 2);
}

// converts a double number into the IEEE representation bit string
function doubleToIEEE(f) {
    var buf = new ArrayBuffer(8);
    (new Float64Array(buf))[0] = f;
    var parts = [(new Uint32Array(buf))[0], (new Uint32Array(buf))[1]];
    return pad(decimalToBinary(parts[1]), 32) + pad(decimalToBinary(parts[0]), 32);
}

// converts a float number into the IEE representation bit string
function floatToIEEE(f) {
    var buf = new ArrayBuffer(4);
    (new Float32Array(buf))[0] = f;
    return pad(decimalToBinary((new Uint32Array(buf))[0]), 32);
}