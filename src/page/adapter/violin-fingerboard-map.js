(function() {
    const keyButtons = $('div.key-row > div');
    const fingerboard = $('#fbd');

    const keyGroups = [
        ['0s', '0f'],
        ['6s', '6f']
    ];

    keyButtons.on('click', function(event) {
        const targetDiv = $(this);
        const key = targetDiv.children('img').attr('alt');
        fingerboard.attr('class', `key-${key}`)
        keyButtons.removeClass('active');
        targetDiv.addClass('active');

        for (const group of keyGroups) {
            if (group.includes(key)) {
                for (const alternativeKey of group) {
                    $(`div.key-row > div > img[alt="${alternativeKey}"]`).parent().addClass('active');
                }
            }
        }
    });

    $(keyButtons).first().trigger('click');
})();