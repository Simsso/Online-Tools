(function() {
    const keyButtons = $('div.key-row > div > img');

    keyButtons.on('click', function(event) {
        console.log($(event.target).attr('alt'));
    });
})();