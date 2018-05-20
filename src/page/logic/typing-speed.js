var KeyPress = function(char, date) {
	if (typeof char !== 'string') {
		throw new Error("char parameter has to be a string.");
	}
	if (!date instanceof Date) {
		throw new Error("date parameter date has to be a Date instance.");
	}

	this.char = char;
	this.date = date;
};

KeyPress.prototype.char = null;
KeyPress.prototype.date = null;



var TypingSpeedControl = function() {
	this.charBuffer = [];
	console.log("New TypingSpeedControl object created.");
};

TypingSpeedControl.prototype.charBuffer = null; // array of KeyPress objects

TypingSpeedControl.prototype.addKeypress = function(char) {
	if (typeof char !== 'string') {
		throw new Error("char parameter has to be a string.");
	}
	this.addKeypressObject(new KeyPress(char, new Date()));
};

TypingSpeedControl.prototype.addKeypressObject = function(keyPress) {
	if (!keyPress instanceof KeyPress) {
		throw new Error("keyPress parameter has to be a KeyPress instance.");
	}

	this.charBuffer.push(keyPress);
};

// @return available: boolean
TypingSpeedControl.prototype.charsPerSecondAvailable = function() {
	return (this.charBuffer.length >= 2);
}

// @return charsPerSecond: number
TypingSpeedControl.prototype.getCharsPerSecond = function() {
	if (!this.charsPerSecondAvailable()) {
		throw new Error("Chars per second not available because less than two records have been added so far.");
	}

	var numChars = this.charBuffer.length;
	var firstKeypress = this.charBuffer[0], latestKeypress = this.charBuffer[this.charBuffer.length - 1];

	// multiplication with 1000 to convert millis of Date.getTime() to seconds
	return numChars * 1000 / (latestKeypress.date.getTime() - firstKeypress.date.getTime());
};