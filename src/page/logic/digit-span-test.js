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
	return [...this.sequence];
};

DigitSpanTest.prototype.getTargetSequence = function(mode) {
    switch (mode) {
        case DigitSpanTest.modes.DEFAULT:
            return this.getSequence();
        case DigitSpanTest.modes.REVERSED:
            return this.getSequence().reverse();
        case DigitSpanTest.modes.ORDERED:
            return this.getSequence().sort();
        default:
            throw new Error(`Invalid mode '${mode}'.`);
    }
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
};

DigitSpanTest.modes = {
    DEFAULT: 0,
    REVERSED: 1,
    ORDERED: 2
};


// sound class from https://stackoverflow.com/questions/11330917/how-to-play-a-mp3-using-javascript
function Sound(source, volume, loop) {
    this.source = source;
    this.volume = volume;
    this.loop = loop;
    var son;
    this.son = son;
    this.finish = false;

    this.stop = function() {
        document.body.removeChild(this.son);
    };

    this.start = function() {
        if (this.finish) return false;
        this.son = document.createElement("embed");
        this.son.setAttribute("src", this.source);
        this.son.setAttribute("hidden", "true");
        this.son.setAttribute("volume", this.volume);
        this.son.setAttribute("autostart", "true");
        this.son.setAttribute("loop", this.loop);
        document.body.appendChild(this.son);
    };

    this.remove = function() {
        document.body.removeChild(this.son);
        this.finish = true;
    };

    this.init = function(volume, loop) {
        this.finish = false;
        this.volume = volume;
        this.loop = loop;
    };
}
