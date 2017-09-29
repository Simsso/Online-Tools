function DigitSpanTest(options) {
	// check whether valid options parameter was passed
	if (typeof options !== 'object') options = {};

	// set current length to starting value
	this.length = (typeof options.startingLength === 'undefined') ? 4 : options.startingLength;

	// set available symbols that compose the sequences
	this.symbols = (typeof options.symbols === 'undefined') ? 
		['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] : // default symbols
		options.symbols; // settings

	// generate new sequence
	this.length--;
	this.next();
}

DigitSpanTest.prototype.getSequence = function() {
	return this.sequence;
};

DigitSpanTest.prototype.next = function() {
	this.length++;
	this.sequence = this.generateSequence();
};

// generates a new sequence using the available symbols and returns it
DigitSpanTest.prototype.generateSequence = function() {
	var sequence = [];
	for (var i = 0; i < this.length; i++) {
		var index = Math.floor(Math.random() * this.symbols.length);
		sequence.push(this.symbols[index])
	}
	return sequence;
}