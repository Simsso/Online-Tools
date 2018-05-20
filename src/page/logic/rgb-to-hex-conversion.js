function byteToHex(b) {
    var hex = b.toString(16);
    return (hex.length == 1) ? ('0' + hex) : (hex);
}

function rgbToHex(r, g, b) {
    return ("#" + byteToHex(r) + byteToHex(g) + byteToHex(b)).toUpperCase();
}