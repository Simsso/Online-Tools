(() => {
    // notes
    const notes = ['c', 'd', 'e', 'f', 'g', 'a', 'b']
    const minNotePos = 3, maxNotePos = 16;

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
    nextNoteButton.on('click', () => {
        showInitialMsg();
        showRandomNote();
    });
    showSolutionButton.on('click', showSolution);
	bassEnabledCheckbox.on('change', function() { bassEnabled = $(this).is(':checked'); showInitialMsg(); showRandomNote(); });
	trebleEnabledCheckbox.on('change', function() { trebleEnabled = $(this).is(':checked'); showInitialMsg(); showRandomNote(); });

    function showRandomNote() {
        const prevClef = clef, prevNotePos = notePos;

        if (bassEnabled && trebleEnabled) {
            clef = (Math.random() < 0.5) ? 'bass' : 'treble';
        }
        else if (!bassEnabled && !trebleEnabled) {
            clef = 'blank';
            showSelectClef();
        }
        else {
            clef = bassEnabled ? 'bass' : 'treble';
        }
        
        if (prevClef === clef) {
            // prevent the same note from being shown twice in a row
            notePos = Math.floor(Math.random() * (maxNotePos - minNotePos)) + minNotePos;
            if (notePos >= prevNotePos) {
                notePos += 1;
            }
        }
        else {
            notePos = Math.floor(Math.random() * (maxNotePos + 1 - minNotePos)) + minNotePos;
        }

        genericNote.attr('data-note-pos', notePos);
        genericNote.attr('data-clef', clef);
    }

    function validateInput() {
        if (['bass', 'treble'].indexOf(clef) === -1) return; // blank clef

        const val = noteUserInput.val();
        if (val.length === 0) return;

        const correct = configToNote(clef === 'bass', notePos);

        let valParsed = val.toLowerCase().trim();
        valParsed = valParsed.replace('h', 'b');  // some European countries use 'h' instead of 'b'
        if (valParsed === correct) {
            showCorrectMsg();
            noteUserInput.val('');
            showRandomNote();
        }
        else {
            showWrongMsg();
        }
    }

    function showCorrectMsg() { setInputInfoBox('bg-success', 'Correct!') }
    function showWrongMsg() { setInputInfoBox('bg-danger', 'The entered note name is wrong.'); }
    function showInitialMsg() { setInputInfoBox('bg-info', 'Enter the name of the note.'); }
    function showSelectClef() { setInputInfoBox('bg-warning', 'Select either bass, treble, or both, to continue.')}
    function showSolution() {
        if (['bass', 'treble'].indexOf(clef) === -1) return; // blank clef

        const correct = configToNote(clef === 'bass', notePos);
        setInputInfoBox('bg-warning', `The correct solution is <b>${correct}</b>.`);
        noteUserInput.focus();
    }

    function setInputInfoBox(bgClass, text) {
        inputInfoBox.removeClass('bg-info bg-warning bg-danger bg-success').addClass(bgClass).html(text);
    }

    // start up
    showInitialMsg();
    showRandomNote();
})();