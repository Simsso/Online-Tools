(() => {
    // notes
    const notes = ['c', 'd', 'e', 'f', 'g', 'a', 'b']

    function configToNote(bass, notePos) {
        // bass is true or false
        // note pos is in {0, ..., 18}
        // returns a string from the notes array

        const notePosBottomUp = 18 - notePos;
        const shiftedPos = notePosBottomUp + (bass ? 6 : 4);
        const idx = shiftedPos % notes.length;

        return notes[idx];
    }

    // state
    let clef = null, 
        notePos = null, 
        bassEnabled = true,
        trebleEnabled = true;

    // dom elements
    const noteUserInput = $('#note-user-input'),
        genericNote = $('#note-generic'),
        nextNoteButton = $('#next-input'),
        showSolutionButton = $('#show-solution'),
        bassEnabledCheckbox = $('#bass-clef-enabled'),
        trebleEnabledCheckbox = $('#treble-clef-enabled'),
        inputInfoBox = $('#input-info-box');

    // events
    noteUserInput.on('keypress', function(event) {
        if (event.which == 13) {
            validateInput();
        }
    });
    nextNoteButton.on('click', showRandomNote);
    showSolutionButton.on('click', showSolution);
	bassEnabledCheckbox.on('change', function() { bassEnabled = $(this).is(':checked'); showRandomNote(); });
	trebleEnabledCheckbox.on('change', function() { trebleEnabled = $(this).is(':checked'); showRandomNote(); });

    function showRandomNote() {
        if (bassEnabled && trebleEnabled || !bassEnabled && !trebleEnabled) {
            clef = (Math.random() < 0.5) ? 'bass' : 'treble';
        }
        else {
            clef = bassEnabled ? 'bass' : 'treble';
        }
        
        notePos = Math.floor(Math.random() * 19);

        genericNote.attr('data-note-pos', notePos);
        genericNote.attr('data-clef', clef);
    }

    function validateInput() {
        const val = noteUserInput.val();
        if (val.length === 0) return;

        const correct = configToNote(clef === 'bass', notePos);

        if (val.toLowerCase().trim() === correct) {
            showCorrectMsg();
            noteUserInput.val('');
            showRandomNote();
        }
        else {
            showWrongMsg();
        }
    }

    function showCorrectMsg() {
        setInputInfoBox('bg-success', 'Correct!')
    }

    function showWrongMsg() {
        setInputInfoBox('bg-error', 'The entered note name is wrong.');
    }

    function showSolution() {
        const correct = configToNote(clef === 'bass', notePos);
        setInputInfoBox('bg-warn', `The correct solution is <b>${correct}</b>.`);
        noteUserInput.focus();
    }

    function setInputInfoBox(bgClass, text) {
        inputInfoBox.removeClass('bg-info bg-warn bg-error bg-success').addClass(bgClass).html(text);
    }

    // start up
    showRandomNote();
})();