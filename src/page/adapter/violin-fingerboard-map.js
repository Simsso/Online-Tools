(function() {
    const keyButtons = $('div.key-row > div > img');
    const fingerboard = $('#fbd');

    keyButtons.on('click', function(event) {
        const key = $(event.target).attr('alt');
        fingerboard.attr('class', `key-${key}`)
    });
})();