(function() {
	function showErrorMessage() {
		$('#error-msg').show();
	}
	function hideErrorMessage() {
		$('#error-msg').hide();
	}
	
	function showInvalidMessage() {
		$('#invalid-msg').show();
	}
	
	function hideInvalidMessage() {
		$('#invalid-msg').hide();
	}


	// Poker Starting Hand Picker element
	// @param element jQuery DOM element (div)
	function StartingHandPicker(element) {
		this.element = element;
		this.handCount = 2;

		this.handElements = [];

		this.startingHand = new StartingHand();


		// init HTML content
		this.element.html('');
		for (let i = 0; i < this.handCount; i++) {
			this.element.append(
				'<div class="hand-' + i + ' btn-toolbar form-group">' + 
					'<div class="rank-picker btn-group">' + 
						'<input type="button" data-rank="2" value="2" class="btn btn-default">' + 
						'<input type="button" data-rank="3" value="3" class="btn btn-default">' + 
						'<input type="button" data-rank="4" value="4" class="btn btn-default">' + 
						'<input type="button" data-rank="5" value="5" class="btn btn-default">' + 
						'<input type="button" data-rank="6" value="6" class="btn btn-default">' + 
						'<input type="button" data-rank="7" value="7" class="btn btn-default">' + 
						'<input type="button" data-rank="8" value="8" class="btn btn-default">' + 
						'<input type="button" data-rank="9" value="9" class="btn btn-default">' + 
						'<input type="button" data-rank="t" value="10" class="btn btn-default">' + 
						'<input type="button" data-rank="j" value="Jack" class="btn btn-default">' + 
						'<input type="button" data-rank="q" value="Queen" class="btn btn-default">' + 
						'<input type="button" data-rank="k" value="King" class="btn btn-default">' + 
						'<input type="button" data-rank="a" value="Ace" class="btn btn-default">' + 
				 	'</div>' + 

				 	'<div class="suit-picker btn-group">' + 
						'<input type="button" data-suit="s" value="♠" class="btn btn-default">' + 
						'<input type="button" data-suit="d" value="♦" class="btn btn-default">' + 
						'<input type="button" data-suit="c" value="♣" class="btn btn-default">' + 
						'<input type="button" data-suit="h" value="♥" class="btn btn-default">' + 
				 	'</div>' + 
			 	'</div>');

			this.handElements.push(this.element.find('.hand-' + i));
		}

		let self = this;

		// attach events
		for (let i = 0; i < this.handElements.length; i++) {
			let handElement = this.handElements[i];
			let inputs = handElement.find('input');
			handElement.on('click', 'input', function() {
				let btn = $(this);
				if (btn.attr('data-rank')) { // rank picker
					inputs.filter('[data-rank]').removeClass('btn-primary');
					btn.toggleClass('btn-primary');

					self.startingHand.cards[i].setRank(btn.data('rank'));
				}

				else if (btn.attr('data-suit')) { // suit picker
					inputs.filter('[data-suit]').removeClass('btn-primary');
					btn.toggleClass('btn-primary');

					self.startingHand.cards[i].setSuit(btn.data('suit'));
				}

				changedEvent();
			});
		};
	}

	StartingHandPicker.prototype.getStartingHand = function() {
		return this.startingHand;
	};


	let h1Picker = new StartingHandPicker($('#starting-hand-1-picker')),
		h2Picker = new StartingHandPicker($('#starting-hand-2-picker'));


	function changedEvent() {
		hideNumberOutput();
		hideErrorMessage();
		hideInvalidMessage();
		let h1 = h1Picker.startingHand, h2 = h2Picker.startingHand;
		if (h1.isDefined() && h2.isDefined()) {
			if (!StartingHand.validSituation(h1, h2)) {
				return showInvalidMessage();
			}
			getOdds(h1, h2, function(err, data) {
				if (err) {
					return showErrorMessage();
				}

				let sum = data.win + data.split + data.loss;

				let win = (data.win / sum * 100).toFixed(2) + "% (" + data.win + ")",
					split = (data.split / sum * 100).toFixed(2) + "% (" + data.split + ")",
					loss = (data.loss / sum * 100).toFixed(2) + "% (" + data.loss + ")";

				$('#out-win').html(win);
				$('#out-split').html(split);
				$('#out-loss').html(loss);
			});
		}
	}

	function hideNumberOutput() {
		$('#out-win').html("");
		$('#out-split').html("");
		$('#out-loss').html("");
	}
})();