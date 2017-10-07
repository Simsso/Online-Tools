function Card() {
	this.suit = ""; // possible values "c", "d", "h", "s"
	this.rank = ""; // possible values "2", "3", ..., "T", "J", "Q", "K", "A"
}


Card.possibleSuitValues = ["c", "d", "h", "s"];
Card.possibleRankValues = ["2", "3", "4", "5", "6", "7", "8", "9", "t", "j", "q", "k", "a"];


Card.prototype.setSuit = function(newSuit) {
	if (Card.possibleSuitValues.indexOf(newSuit.toString()) != -1) {
		this.suit = newSuit.toString();
	}
	else {
		throw new Error("Invalid suit value. Possible values are " + JSON.stringify(Card.possibleSuitValues));
	}
};


Card.prototype.setRank = function(newRank) {
	if (Card.possibleRankValues.indexOf(newRank.toString()) != -1) {
		this.rank = newRank.toString();
	}
	else {
		throw new Error("Invalid rank value. Possible values are " + JSON.stringify(Card.possibleRankValues));
	}
};


Card.prototype.isDefined = function() {
	return (this.suit.length === 1 && this.rank.length === 1);
};


Card.prototype.initRandomly = function() {
	this.suit = Card.possibleSuitValues[Math.floor(Card.possibleSuitValues.length * Math.random())];
	this.suit = Card.possibleRankValues[Math.floor(Card.possibleRankValues.length * Math.random())];
};


function StartingHand() {
	this.cards = [
		new Card(), 
		new Card()
	];
}

StartingHand.prototype.isDefined = function() {
	for (let i = 0; i < this.cards.length; i++) {
		if (!this.cards[i].isDefined()) {
			return false;
		}
	}
	return true;
};

StartingHand.prototype.initRandomly = function() {
	for (let i = 0; i < this.cards.length; i++) {
		this.cards[i].initRandomly();
	}
};



function getOdds(startingHand1, startingHand2, callback) {
	let query = 
		"?hand1rank1=" + startingHand1.cards[0].rank + 
		"&hand1suit1=" + startingHand1.cards[0].suit + 
		"&hand1rank2=" + startingHand1.cards[1].rank + 
		"&hand1suit2=" + startingHand1.cards[1].suit + 
		"&hand2rank1=" + startingHand2.cards[0].rank + 
		"&hand2suit1=" + startingHand2.cards[0].suit + 
		"&hand2rank2=" + startingHand2.cards[1].rank + 
		"&hand2suit2=" + startingHand2.cards[1].suit;
	jQuery.ajax('https://timodenk.com/api/poker/odds-headsup-preflop.php' + query, {
		success: function(data, textStatus, jqXHR) {
			if (typeof data === 'string') {
				data = JSON.parse(data);
			}
			callback(undefined, data);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			callback(textStatus);
		}
	});
}